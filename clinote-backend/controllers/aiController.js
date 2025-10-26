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
You are a professional medical assistant. Based on the following transcript and template type "${templateType}", generate a SOAP note.

Transcript:
---
${transcript}
---

Please respond in **JSON only** with these 4 keys: 

1. "subjective": concise patient complaints or history in 1-2 sentences.
2. "objective": key measurable signs, vitals, or test results in bullet points.
3. "assessment": main diagnosis or evaluation in 1 sentence.
4. "plan": clear action steps or treatment plan in bullet points.

Format example:
{
  "subjective": "Patient complains of mild headache and dizziness for 2 days.",
  "objective": [
    "- Blood pressure: 120/80 mmHg",
    "- Temperature: 98.6°F"
  ],
  "assessment": "Likely tension headache.",
  "plan": [
    "- Advise hydration and rest",
    "- Prescribe acetaminophen 500mg as needed",
    "- Follow up in 3 days"
  ]
}

Ensure:
- JSON is properly formatted and parseable.
- Keep all fields short, clear, and medically relevant.
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

    // Save or atomically upsert note to avoid duplicate key race conditions
    const update = {
      templateType,
      transcript,
      aiGeneratedNote: sanitizedAIGeneratedNote,
      status: "completed",
    };

    if (audioUrl) update.audioUrl = audioUrl;

    note = await Note.findOneAndUpdate(
      { patientId, userId: req.user._id },
      { $set: update, $setOnInsert: { userId: req.user._id, patientId } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

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
