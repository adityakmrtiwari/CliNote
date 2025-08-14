const cloudinary = require('../config/cloudinary');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/responseHelper');

// @POST /api/audio/upload
exports.uploadAudio = async (req, res) => {
  try {
    if (!req.file) {
      return sendErrorResponse(res, 400, 'No file uploaded');
    }

    const base64Audio = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

    const uploadResult = await cloudinary.uploader.upload(base64Audio, {
      resource_type: 'video', // audio goes here too
      folder: 'clinote/audio'
    });

    return sendSuccessResponse(res, 200, 'Audio uploaded successfully', { audioUrl: uploadResult.secure_url });
  } catch (err) {
    return sendErrorResponse(res, 500, 'Audio upload failed', err);
  }
};

// @POST /api/audio/transcribe
// @desc Transcribe audio from Cloudinary URL (mock for now)
// exports.transcribeAudio = async (req, res) => {
//   const { audioUrl } = req.body;

//   if (!audioUrl) {
//     return res.status(400).json({ message: 'Audio URL is required' });
//   }

//   // 🧠 Replace this with real transcription later
//   const mockTranscript = "Patient reports sore throat, mild fever, and body aches for the past 2 days.";

//   res.status(200).json({ transcript: mockTranscript });
// };

