const Note = require('../models/Note');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/responseHelper');

// Create a new note for a patient
exports.createNote = async (req, res) => {
  const { patientId, templateType, transcript, aiGeneratedNote, audioUrl } = req.body;

  if (!patientId || !templateType || !transcript) {
    return sendErrorResponse(res, 400, 'PatientId, templateType, and transcript are required');
  }

  try {
    // Create new note (Multiple notes allowed now)
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
  } catch (err) {
    return sendErrorResponse(res, 500, 'Failed to create note', err);
  }
};

// Get ALL notes for a specific patient
exports.getNotesByPatient = async (req, res) => {
  try {
    const notes = await Note.find({
      userId: req.user._id,
      patientId: req.params.patientId
    })
      .populate('patientId', 'name age gender')
      .sort({ createdAt: -1 }); // Newest first

    return sendSuccessResponse(res, 200, 'Notes retrieved successfully', notes);
  } catch (err) {
    return sendErrorResponse(res, 500, 'Failed to retrieve notes', err);
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
    }).populate('patientId', 'name age gender');

    if (!note) {
      return sendErrorResponse(res, 404, 'Note not found');
    }

    return sendSuccessResponse(res, 200, 'Note retrieved successfully', note);
  } catch (err) {
    return sendErrorResponse(res, 500, 'Failed to retrieve note', err);
  }
};

// Update a specific note by ID
exports.updateNoteById = async (req, res) => {
  const { transcript, aiGeneratedNote, templateType, audioUrl, status } = req.body;
  const { id } = req.params;

  try {
    const updateData = {};
    if (transcript) updateData.transcript = transcript;
    if (aiGeneratedNote) updateData.aiGeneratedNote = aiGeneratedNote;
    if (templateType) updateData.templateType = templateType;
    if (audioUrl) updateData.audioUrl = audioUrl;
    if (status) updateData.status = status;

    const note = await Note.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      updateData,
      { new: true, runValidators: true }
    ).populate('patientId', 'name age gender');

    if (!note) {
      return sendErrorResponse(res, 404, 'Note not found');
    }

    return sendSuccessResponse(res, 200, 'Note updated successfully', note);
  } catch (err) {
    return sendErrorResponse(res, 500, 'Failed to update note', err);
  }
};

// Delete a note by ID
exports.deleteNoteById = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!note) {
      return sendErrorResponse(res, 404, 'Note not found');
    }

    return sendSuccessResponse(res, 200, 'Note deleted successfully');
  } catch (err) {
    return sendErrorResponse(res, 500, 'Failed to delete note', err);
  }
};



