const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String, required: true },
  embedding: [{ type: Number }],
  createdAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('Job', jobSchema);
