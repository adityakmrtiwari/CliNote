const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: true
    }
  },
  { timestamps: true }
);

// Virtual to get the note for this patient
patientSchema.virtual('note', {
  ref: 'Note',
  localField: '_id',
  foreignField: 'patientId',
  justOne: true // Since there's only one note per patient
});

// Ensure virtual fields are serialized
patientSchema.set('toJSON', { virtuals: true });
patientSchema.set('toObject', { virtuals: true });

// Create indexes for better performance and security
patientSchema.index({ userId: 1 });
patientSchema.index({ userId: 1, createdAt: -1 });
patientSchema.index({ userId: 1, name: 1 });

module.exports = mongoose.model('Patient', patientSchema);
