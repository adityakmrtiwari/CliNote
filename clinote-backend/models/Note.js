const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
    // unique index is created below with noteSchema.index({ patientId: 1 }, { unique: true })
  },
  templateType: {
    type: String,
    required: true,
    enum: ['SOAP', 'PROGRESS', 'CONSULTATION', 'DISCHARGE','General Medicine'] // Define allowed template types
  },
  transcript: {
    type: String,
    required: true,
  },
  aiGeneratedNote: {
    subjective: { type: String, default: '' },
    objective: { type: String, default: '' },
    assessment: { type: String, default: '' },
    plan: { type: String, default: '' }
  },
  audioUrl: {
    type: String
  },
  status: {
    type: String,
    enum: ['draft', 'processing', 'completed'],
    default: 'draft'
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Middleware to update lastUpdated on save
noteSchema.pre('save', function(next) {
  this.lastUpdated = new Date();
  next();
});

// Create indexes for better performance and security
noteSchema.index({ userId: 1 });
noteSchema.index({ patientId: 1 }); // Removed unique: true to allow multiple notes per patient
noteSchema.index({ userId: 1, patientId: 1 });
noteSchema.index({ userId: 1, createdAt: -1 });
noteSchema.index({ templateType: 1 });
noteSchema.index({ status: 1 });

module.exports = mongoose.model('Note', noteSchema);
