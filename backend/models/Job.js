const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  experienceLevel: { type: String, enum: ['BEGINNER', 'INTERMEDIATE', 'EXPERT'], required: true },
  candidates: [{ type: String }],
  endDate: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
