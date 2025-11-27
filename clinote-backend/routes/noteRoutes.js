const express = require('express');
const router = express.Router();
const {
  createNote,
  getNotesByPatient,
  getAllNotes,
  getNoteById,
  updateNoteById,
  deleteNoteById
} = require('../controllers/noteController');

const { protect } = require('../middlewares/authMiddleware');

// Routes
router.post('/', protect, createNote); // Always create new note
router.get('/all', protect, getAllNotes); // Get all notes

// Patient-specific routes
router.get('/patient/:patientId', protect, getNotesByPatient); // Get ALL notes for a patient

// Note-specific routes (by Note ID)
router.get('/note/:id', protect, getNoteById);
router.put('/note/:id', protect, updateNoteById);
router.delete('/note/:id', protect, deleteNoteById);

module.exports = router;
