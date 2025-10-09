// server/server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require('path');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

console.log("DEBUG: connecting to", MONGO_URI);

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// routes
const sessionsRouter = require('./routes/sessions');
const statsRouter = require('./routes/stats');

app.use('/api/sessions', sessionsRouter);
app.use('/api/stats', statsRouter);

// test
app.get('/', (req, res) => {
  res.send('🌬️ Breathe server is running and connected to MongoDB!');
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
