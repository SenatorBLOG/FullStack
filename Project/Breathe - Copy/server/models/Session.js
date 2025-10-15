// server/models/Session.js
const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },   // ISO date
  time: { type: Number, default: 0 },        // seconds (as in your front-end)
  cycles: { type: Number, default: 0 },
  duration: { type: Number, default: 4 },    // seconds per phase usually
  mood: { type: String, default: '' },
  notes: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Session', sessionSchema);
