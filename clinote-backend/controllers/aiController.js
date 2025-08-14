const genAI = require('../config/gemini');
const Note = require('../models/Note');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/responseHelper');

// Retry helper
async function retryGeminiCall(apiCall, retries = 3, delay = 2000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await apiCall();
    } catch (err) {
      const isOverloaded = err.message?.includes("503") || err.message?.includes("overloaded");
      if (isOverloaded && attempt < retries) {
        console.warn(`Gemini overloaded. Retrying in ${delay}ms... (Attempt ${attempt}/${retries})`);
        await new Promise(res => setTimeout(res, delay));
        delay *= 2; // exponential backoff
      } else {
        throw err;
      }
    }
  }
}

exports.generateAndSaveSOAPNote = async (req, res) => {
  const { transcript, templateType, patientId, audioUrl } = req.body;

  if (!transcript || !templateType || !patientId) {
    return sendErrorResponse(res, 400, 'Transcript, templateType, and patientId are required');
  }

  try {
    const model = genAI.getGenerativeModel({
      model: 'models/gemini-1.5-flash',
      generationConfig: {
        responseMimeType: 'application/json'
      }
    });

    const prompt = `
You are a medical assistant. Based on the following transcript and templateType "${templateType}", generate a SOAP note.

Transcript:
---
${transcript}
---

Respond ONLY in JSON with 4 keys: subjective, objective, assessment, plan. Keep values concise and medically relevant.
`;

    // Retry Gemini request if overloaded
    const result = await retryGeminiCall(() => model.generateContent(prompt), 3, 2000);
    const jsonText = result.response.text();

    let aiGeneratedNote;
    try {
      aiGeneratedNote = JSON.parse(jsonText);
    } catch (err) {
      return sendErrorResponse(res, 500, 'AI response was not valid JSON', err);
    }

    // Save or update note
    let note = await Note.findOne({ patientId, userId: req.user._id });

    if (note) {
      note.templateType = templateType;
      note.transcript = transcript;
      note.aiGeneratedNote = aiGeneratedNote;
      note.audioUrl = audioUrl || note.audioUrl;
      note.status = 'completed';
      await note.save();
    } else {
      note = await Note.create({
        userId: req.user._id,
        patientId,
        templateType,
        transcript,
        aiGeneratedNote,
        audioUrl,
        status: 'completed'
      });
    }

    return sendSuccessResponse(res, 201, 'SOAP note generated and saved successfully', note);
  } catch (err) {
    console.error('Gemini save note error:', err.message);
    return sendErrorResponse(res, 500, 'Failed to generate and save SOAP note', err);
  }
};
