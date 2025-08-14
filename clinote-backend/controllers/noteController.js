const Note = require('../models/Note');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/responseHelper');

// Create or update note for a patient (since 1 patient = 1 note)
exports.createOrUpdateNote = async (req, res) => {
  const { patientId, templateType, transcript, aiGeneratedNote, audioUrl } = req.body;
  
  if (!patientId || !templateType || !transcript) {
    return sendErrorResponse(res, 400, 'PatientId, templateType, and transcript are required');
  }

  try {
    // Check if note already exists for this patient
    let note = await Note.findOne({ patientId, userId: req.user._id });
    
    if (note) {
      // Update existing note
      note.templateType = templateType;
      note.transcript = transcript;
      note.aiGeneratedNote = aiGeneratedNote || note.aiGeneratedNote;
      note.audioUrl = audioUrl || note.audioUrl;
      note.status = aiGeneratedNote ? 'completed' : 'processing';
      
      await note.save();
      return sendSuccessResponse(res, 200, 'Note updated successfully', note);
    } else {
      // Create new note
      const newNote = await Note.create({
        userId: req.user._id,
        patientId,
        templateType,
        transcript,
        aiGeneratedNote,
        audioUrl,
        status: aiGeneratedNote ? 'completed' : 'draft'
      });
      return sendSuccessResponse(res, 201, 'Note created successfully', newNote);
    }
  } catch (err) {
    if (err.code === 11000) {
      return sendErrorResponse(res, 409, 'Note already exists for this patient');
    }
    return sendErrorResponse(res, 500, 'Failed to create/update note', err);
  }
};

// Get note for a specific patient (since there's only one note per patient)
exports.getNoteByPatient = async (req, res) => {
  try {
    const note = await Note.findOne({
      userId: req.user._id,
      patientId: req.params.patientId
    }).populate('patientId', 'name age gender');

    if (!note) {
      return sendErrorResponse(res, 404, 'Note not found for this patient');
    }

    return sendSuccessResponse(res, 200, 'Note retrieved successfully', note);
  } catch (err) {
    return sendErrorResponse(res, 500, 'Failed to retrieve note', err);
  }
};

// Get all notes for the current doctor
exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user._id })
      .populate('patientId', 'name age gender')
      .sort({ updatedAt: -1 });

    return sendSuccessResponse(res, 200, 'All notes retrieved successfully', notes);
  } catch (err) {
    return sendErrorResponse(res, 500, 'Failed to retrieve notes', err);
  }
};

// Get a single note by ID
exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!note) {
      return sendErrorResponse(res, 404, 'Note not found');
    }

    return sendSuccessResponse(res, 200, 'Note retrieved successfully', note);
  } catch (err) {
    return sendErrorResponse(res, 500, 'Failed to retrieve note', err);
  }
};

// Update a note by patient ID (more intuitive for 1 patient = 1 note)
exports.updateNoteByPatient = async (req, res) => {
  const { transcript, aiGeneratedNote, templateType, audioUrl, status } = req.body;
  const { patientId } = req.params;

  try {
    const updateData = {};
    if (transcript) updateData.transcript = transcript;
    if (aiGeneratedNote) updateData.aiGeneratedNote = aiGeneratedNote;
    if (templateType) updateData.templateType = templateType;
    if (audioUrl) updateData.audioUrl = audioUrl;
    if (status) updateData.status = status;

    const note = await Note.findOneAndUpdate(
      { patientId, userId: req.user._id },
      updateData,
      { new: true, runValidators: true }
    ).populate('patientId', 'name age gender');

    if (!note) {
      return sendErrorResponse(res, 404, 'Note not found for this patient');
    }

    return sendSuccessResponse(res, 200, 'Note updated successfully', note);
  } catch (err) {
    return sendErrorResponse(res, 500, 'Failed to update note', err);
  }
};

// Delete a note by patient ID
exports.deleteNoteByPatient = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      patientId: req.params.patientId,
      userId: req.user._id
    });

    if (!note) {
      return sendErrorResponse(res, 404, 'Note not found for this patient');
    }

    return sendSuccessResponse(res, 200, 'Note deleted successfully');
  } catch (err) {
    return sendErrorResponse(res, 500, 'Failed to delete note', err);
  }
};

// Legacy function for backward compatibility
exports.createNote = exports.createOrUpdateNote;
exports.getNotesByPatient = exports.getNoteByPatient;
exports.updateNote = exports.updateNoteByPatient;
exports.deleteNote = exports.deleteNoteByPatient;
