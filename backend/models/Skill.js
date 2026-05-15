const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  category: { type: String, required: true },
  name: { type: String, required: true },
  proficiency: { type: Number, required: true, min: 0, max: 100 }
});

module.exports = mongoose.model('Skill', skillSchema);
