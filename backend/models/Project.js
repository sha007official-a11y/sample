const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  featured: { type: Boolean, default: false },
  techStack: [{ type: String }],
  githubUrl: { type: String },
  liveUrl: { type: String }
});

module.exports = mongoose.model('Project', projectSchema);
