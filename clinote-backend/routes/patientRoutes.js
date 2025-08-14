const express = require('express');
const router = express.Router();
const {
  createPatient,
  getAllPatients,
  getPatientById,
  deletePatient
} = require('../controllers/patientController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/')
  .post(protect, createPatient)
  .get(protect, getAllPatients);

router.route('/:id')
  .get(protect, getPatientById)
  .delete(protect, deletePatient);

module.exports = router;
