const express = require('express');
const router = express.Router();
const { generateAndSaveSOAPNote } = require('../controllers/aiController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/generate-soap-and-save', protect, generateAndSaveSOAPNote);

module.exports = router;
