const express = require('express');
const router = express.Router();
const {
  createOrUpdateNote,
  getNoteByPatient,
  getAllNotes,
  getNoteById,
  updateNoteByPatient,
  deleteNoteByPatient,
  // Legacy exports for backward compatibility
  createNote,
  getNotesByPatient,
  updateNote,
  deleteNote
} = require('../controllers/noteController');

const { protect } = require('../middlewares/authMiddleware');

// Routes for the new workflow (1 patient = 1 note)
router.post('/', protect, createOrUpdateNote); // Create or update note
router.get('/all', protect, getAllNotes); // Get all notes for current doctor

// Patient-specific note routes (recommended)
router.get('/patient/:patientId', protect, getNoteByPatient); // Get note for specific patient
router.put('/patient/:patientId', protect, updateNoteByPatient); // Update note for specific patient
router.delete('/patient/:patientId', protect, deleteNoteByPatient); // Delete note for specific patient

// Legacy routes for backward compatibility
router.get('/note/:id', protect, getNoteById);
router.put('/note/:id', protect, updateNote);
router.delete('/note/:id', protect, deleteNote);
router.get('/:patientId', protect, getNotesByPatient);

module.exports = router;
