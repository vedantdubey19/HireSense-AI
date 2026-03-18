const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  role: { type: String },
  resumeText: { type: String },
  skills: [{ type: String }],
  matchScore: { type: Number, default: 0 },
  rank: { type: Number },
  embedding: [{ type: Number }], // Vector representation
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Candidate', candidateSchema);
