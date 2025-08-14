const Patient = require('../models/Patient');
const Note = require('../models/Note');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/responseHelper');

// @POST /api/patients - Create a patient
exports.createPatient = async (req, res) => {
  const { name, age, gender } = req.body;
  try {
    const newPatient = await Patient.create({
      userId: req.user._id,
      name,
      age,
      gender
    });
    return sendSuccessResponse(res, 201, 'Patient created successfully', newPatient);
  } catch (err) {
    return sendErrorResponse(res, 500, 'Failed to create patient', err);
  }
};

// @GET /api/patients - Get all patients for current user
exports.getAllPatients = async (req, res) => {
  try {
    const includeNotes = req.query.includeNotes === 'true';
    
    let query = Patient.find({ userId: req.user._id }).sort({ createdAt: -1 });
    
    if (includeNotes) {
      query = query.populate('note');
    }
    
    const patients = await query;
    return sendSuccessResponse(res, 200, 'Patients retrieved successfully', patients);
  } catch (err) {
    return sendErrorResponse(res, 500, 'Failed to retrieve patients', err);
  }
};

// @GET /api/patients/:id - Get a single patient
exports.getPatientById = async (req, res) => {
  try {
    const includeNote = req.query.includeNote === 'true';
    
    let query = Patient.findOne({ _id: req.params.id, userId: req.user._id });
    
    if (includeNote) {
      query = query.populate('note');
    }
    
    const patient = await query;
    if (!patient) {
      return sendErrorResponse(res, 404, 'Patient not found');
    }
    return sendSuccessResponse(res, 200, 'Patient retrieved successfully', patient);
  } catch (err) {
    return sendErrorResponse(res, 500, 'Failed to retrieve patient', err);
  }
};

// @DELETE /api/patients/:id - Delete a patient
exports.deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!patient) {
      return sendErrorResponse(res, 404, 'Patient not found');
    }
    
    // Also delete the associated note
    await Note.findOneAndDelete({ patientId: req.params.id, userId: req.user._id });
    
    return sendSuccessResponse(res, 200, 'Patient and associated note deleted successfully');
  } catch (err) {
    return sendErrorResponse(res, 500, 'Failed to delete patient', err);
  }
};




