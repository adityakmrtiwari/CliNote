const genAI = require("../config/gemini");
const Note = require("../models/Note");
const {
  sendSuccessResponse,
  sendErrorResponse,
} = require("../utils/responseHelper");

// Retry helper
async function retryGeminiCall(apiCall, retries = 3, delay = 2000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await apiCall();
    } catch (err) {
      const isOverloaded =
        err.message?.includes("503") || err.message?.includes("overloaded");
      if (isOverloaded && attempt < retries) {
        console.warn(
          `Gemini overloaded. Retrying in ${delay}ms... (Attempt ${attempt}/${retries})`
        );
        await new Promise((res) => setTimeout(res, delay));
        delay *= 2; // exponential backoff
      } else {
        throw err;
      }
    }
  }
}

// Normalize aiGeneratedNote fields so they match the schema (strings)
function sanitizeAIGeneratedNote(obj) {
  if (!obj || typeof obj !== 'object') return {
    summary: '',
    subjective: '',
    objective: '',
    assessment: '',
    plan: ''
  };

  const normalize = (val) => {
    if (Array.isArray(val)) return val.join('\n');
    if (val === null || val === undefined) return '';
    if (typeof val === 'object') return JSON.stringify(val);
    return String(val);
  };

  return {
    summary: normalize(obj.summary),
    subjective: normalize(obj.subjective),
    objective: normalize(obj.objective),
    assessment: normalize(obj.assessment),
    plan: normalize(obj.plan),
  };
}

exports.generateAndSaveSOAPNote = async (req, res) => {
  const { transcript, templateType, patientId, audioUrl } = req.body;

  if (!transcript || !templateType || !patientId) {
    return sendErrorResponse(
      res,
      400,
      "Transcript, templateType, and patientId are required"
    );
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "models/gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const prompt = `
You are a Senior Clinical Documentation Specialist. Your task is to generate a professional, clinically accurate, and **readable** SOAP note based on the provided transcript and template type "${templateType}".

Transcript:
---
${transcript}
---

Instructions:
1.  **Analyze** the transcript thoroughly.
2.  **Extract** relevant clinical information.
3.  **Formulate** the response in **clear, professional language**. Avoid overly dense medical jargon where simple terms suffice (e.g., "runny nose" is acceptable if clear, but maintain a professional tone).
4.  **Structure** the output into the following JSON fields:

    *   **"summary"**: A comprehensive but concise abstract of the encounter. Include the patient's demographics (if available), chief complaint, key history, major findings, and the plan.
    *   **"subjective"**: A narrative description including:
        *   **Chief Complaint (CC)**: The primary reason for the visit.
        *   **History**: Key details of the present illness (duration, severity, symptoms).
        *   **Review of Systems**: Only relevant positives and negatives.
        *   *Format*: Clear sentences.
    *   **"objective"**: Measurable, observable data including:
        *   **Vital Signs**: (if mentioned).
        *   **Physical Exam**: Key findings observed.
        *   **Diagnostics**: Labs or imaging results.
        *   *Format*: Bullet points.
    *   **"assessment"**:
        *   **Diagnosis**: Primary and potential alternative diagnoses.
        *   *Format*: Concise statement.
    *   **"plan"**:
        *   **Treatment**: Medications and therapies.
        *   **Advice**: Patient education and follow-up instructions.
        *   *Format*: Bullet points.

Constraints:
*   **JSON ONLY**: Respond with a valid JSON object containing keys: "summary", "subjective", "objective", "assessment", "plan".
*   **No Hallucinations**: If information is not present in the transcript, state "Not reported" or omit the specific detail.
*   **Clarity**: Prioritize clarity and readability over complex terminology.

Format example:
{
  "summary": "45-year-old male presenting with 3-day history of headache...",
  "subjective": "CC: Headache.\\n\\nPatient reports a 3-day history of throbbing frontal headache...",
  "objective": [
    "- BP 130/85, HR 78",
    "- Normal eye movement, no light sensitivity"
  ],
  "assessment": "Tension Headache",
  "plan": [
    "- Ibuprofen 400mg as needed",
    "- Hydration and rest",
    "- Return if worse"
  ]
}
`;

    // Retry Gemini request if overloaded
    const result = await retryGeminiCall(
      () => model.generateContent(prompt),
      3,
      2000
    );
    const jsonText = result.response.text();

    let aiGeneratedNote;
    try {
      aiGeneratedNote = JSON.parse(jsonText);
    } catch (err) {
      return sendErrorResponse(res, 500, "AI response was not valid JSON", err);
    }

    // Sanitize AI output to match schema (convert arrays -> strings, objects -> JSON)
    const sanitizedAIGeneratedNote = sanitizeAIGeneratedNote(aiGeneratedNote);

    // Create a NEW note document (do not overwrite existing ones)
    note = await Note.create({
      userId: req.user._id,
      patientId,
      templateType,
      transcript,
      aiGeneratedNote: sanitizedAIGeneratedNote,
      audioUrl: audioUrl || undefined,
      status: "completed"
    });

    return sendSuccessResponse(
      res,
      201,
      "SOAP note generated and saved successfully",
      note
    );
  } catch (err) {
    // Log full error for debugging (stack, name, code)
    console.error("Gemini save note error:", {
      message: err.message,
      name: err.name,
      code: err.code,
      stack: err.stack,
    });

    // Handle duplicate key errors explicitly
    if (err.code === 11000) {
      return sendErrorResponse(res, 409, 'A note for this patient already exists', err);
    }

    return sendErrorResponse(res, 500, "Failed to generate and save SOAP note", err);
  }
};
