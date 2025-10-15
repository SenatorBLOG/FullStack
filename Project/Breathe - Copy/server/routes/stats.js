// server/routes/stats.js
const express = require('express');
const router = express.Router();
const Session = require('../models/Session');
const mongoose = require('mongoose');

// GET /api/stats/overview
// returns totalSessions, totalMinutes, streak, averageSession
router.get('/overview', async (req, res) => {
  try {
    const sessions = await Session.find().sort({ date: -1 }).lean();

    const totalSessions = sessions.length;
    const totalMinutes = sessions.reduce((acc, s) => acc + Math.floor((s.time || 0) / 60), 0);
    const averageSession = totalSessions > 0 ? Math.round(totalMinutes / totalSessions) : 0;

    // compute streak (consecutive days ending today)
    const days = sessions.map(s => new Date(s.date).setHours(0,0,0,0));
    let streak = 0;
    if (days.length) {
      let expected = new Date().setHours(0,0,0,0);
      for (let d of days) {
        if (d === expected) {
          streak++;
          expected = expected - 24*60*60*1000;
        } else if (d < expected) { // skip older day (we require exact consecutive)
          break;
        }
      }
    }

    res.json({ totalSessions, totalMinutes, streak, averageSession });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/stats/weekly
// returns array of last 7 days with total minutes per day
router.get('/weekly', async (req, res) => {
  try {
    const today = new Date();
    const start = new Date(today);
    start.setHours(0,0,0,0);
    start.setDate(start.getDate() - 6); // 7-day window: start .. today

    // Aggregation: group by date (day) and sum 'time'
    const data = await Session.aggregate([
      { $match: { date: { $gte: start } } },
      {
        $project: {
          day: {
            $dateToString: { format: "%Y-%m-%d", date: "$date" }
          },
          minutes: { $divide: ["$time", 60] },
          sessions: 1
        }
      },
      {
        $group: {
          _id: "$day",
          totalMinutes: { $sum: "$minutes" },
          sessionCount: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Build last 7 days map with day names
    const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const result = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const key = d.toISOString().slice(0,10);
      const found = data.find(x => x._id === key);
      result.push({
        date: key,
        day: dayNames[d.getDay()],
        minutes: found ? Math.round(found.totalMinutes) : 0,
        sessions: found ? found.sessionCount : 0
      });
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/stats/monthly
// returns monthly data for the last 12 months
router.get('/monthly', async (req, res) => {
  try {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth() - 11, 1);

    const data = await Session.aggregate([
      { $match: { date: { $gte: start } } },
      {
        $project: {
          year: { $year: "$date" },
          month: { $month: "$date" },
          minutes: { $divide: ["$time", 60] },
          cycles: "$cycles"
        }
      },
      {
        $group: {
          _id: { year: "$year", month: "$month" },
          totalMinutes: { $sum: "$minutes" },
          totalSessions: { $sum: 1 },
          totalCycles: { $sum: "$cycles" }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    // Build last 12 months map
    const result = [];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    for (let i = 0; i < 12; i++) {
      const d = new Date(today.getFullYear(), today.getMonth() - 11 + i, 1);
      const found = data.find(x => x._id.year === d.getFullYear() && x._id.month === d.getMonth() + 1);
      result.push({
        month: monthNames[d.getMonth()],
        year: d.getFullYear(),
        minutes: found ? Math.round(found.totalMinutes) : 0,
        sessions: found ? found.totalSessions : 0,
        cycles: found ? found.totalCycles : 0
      });
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/stats/mood
// returns mood distribution from sessions
router.get('/mood', async (req, res) => {
  try {
    const data = await Session.aggregate([
      { $match: { mood: { $ne: '' } } },
      {
        $group: {
          _id: "$mood",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    // Categorize moods into positive, neutral, negative
    const positiveWords = ['happy', 'calm', 'peaceful', 'relaxed', 'good', 'great', 'excellent', 'wonderful', 'amazing', 'joyful'];
    const negativeWords = ['stressed', 'anxious', 'tired', 'sad', 'angry', 'frustrated', 'overwhelmed', 'bad', 'terrible', 'awful'];

    let positive = 0, neutral = 0, negative = 0;

    data.forEach(item => {
      const mood = item._id.toLowerCase();
      if (positiveWords.some(word => mood.includes(word))) {
        positive += item.count;
      } else if (negativeWords.some(word => mood.includes(word))) {
        negative += item.count;
      } else {
        neutral += item.count;
      }
    });

    const total = positive + neutral + negative;

    res.json({
      positive: { count: positive, percentage: total > 0 ? Math.round((positive / total) * 100) : 0 },
      neutral: { count: neutral, percentage: total > 0 ? Math.round((neutral / total) * 100) : 0 },
      negative: { count: negative, percentage: total > 0 ? Math.round((negative / total) * 100) : 0 },
      total
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/stats/sessions-breakdown
// returns session data breakdown by duration ranges
router.get('/sessions-breakdown', async (req, res) => {
  try {
    const sessions = await Session.find().lean();

    const breakdown = {
      short: 0,     // 0-5 minutes
      medium: 0,    // 5-15 minutes
      long: 0,      // 15-30 minutes
      extended: 0   // 30+ minutes
    };

    sessions.forEach(session => {
      const minutes = Math.floor(session.time / 60);
      if (minutes <= 5) breakdown.short++;
      else if (minutes <= 15) breakdown.medium++;
      else if (minutes <= 30) breakdown.long++;
      else breakdown.extended++;
    });

    const total = sessions.length;

    res.json([
      { name: 'Short (0-5min)', value: breakdown.short, percentage: total > 0 ? Math.round((breakdown.short / total) * 100) : 0 },
      { name: 'Medium (5-15min)', value: breakdown.medium, percentage: total > 0 ? Math.round((breakdown.medium / total) * 100) : 0 },
      { name: 'Long (15-30min)', value: breakdown.long, percentage: total > 0 ? Math.round((breakdown.long / total) * 100) : 0 },
      { name: 'Extended (30min+)', value: breakdown.extended, percentage: total > 0 ? Math.round((breakdown.extended / total) * 100) : 0 }
    ]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/stats/progress
// returns progress data showing improvement over time
router.get('/progress', async (req, res) => {
  try {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const data = await Session.aggregate([
      { $match: { date: { $gte: sixMonthsAgo } } },
      {
        $project: {
          year: { $year: "$date" },
          month: { $month: "$date" },
          minutes: { $divide: ["$time", 60] }
        }
      },
      {
        $group: {
          _id: { year: "$year", month: "$month" },
          avgSessionLength: { $avg: "$minutes" },
          totalMinutes: { $sum: "$minutes" },
          sessionCount: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const result = data.map(item => ({
      month: monthNames[item._id.month - 1],
      year: item._id.year,
      avgSessionLength: Math.round(item.avgSessionLength * 10) / 10,
      totalMinutes: Math.round(item.totalMinutes),
      sessionCount: item.sessionCount
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
