// server/routes/sessions.js
const express = require('express');
const router = express.Router();
const Session = require('../models/Session');

// GET /api/sessions - return all sessions (sorted desc by date)
router.get('/', async (req, res) => {
  try {
    const sessions = await Session.find().sort({ date: -1 });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/sessions - create session
router.post('/', async (req, res) => {
  try {
    // allow client to send date or server will use default
    const { date, time, cycles, duration, mood, notes } = req.body;
    const session = new Session({
      date: date ? new Date(date) : undefined,
      time,
      cycles,
      duration,
      mood,
      notes
    });
    await session.save();
    console.log('✅ Saved session to DB:', session);
    res.status(201).json(session);
  } catch (err) {
    console.error('❌ Failed to save session:', err);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
