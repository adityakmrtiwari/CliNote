const express = require('express');
const router = express.Router();
const upload = require('../utils/upload');
const { protect } = require('../middlewares/authMiddleware');
const { uploadAudio } = require('../controllers/audioController');

// Route: POST /api/audio/upload
router.post('/upload', protect, upload.single('audio'), uploadAudio);

// Transcribe audio (mock or Gemini)
// router.post('/transcribe', protect, transcribeAudio);
module.exports = router;
