//server/models/Session.js
const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sessionDate: { type: Date, default: Date.now },
  moodBefore: { type: Number, required: true },
  moodAfter: { type: Number, required: true },
  focusLevel: { type: Number, required: true },
  stressLevel: { type: Number, required: true },
  breathingDepth: { type: Number, required: true },
  calmnessScore: { type: Number, required: true },
  distractionCount: { type: Number, default: 0 },
  timeOfDay: { type: String, required: true },
  noiseLevel: { type: String, required: true },
  sessionLength: { type: Number, required: true },
  cycles: { type: Number, required: true },
  notes: { type: String }
});

module.exports = mongoose.model('Session', sessionSchema);