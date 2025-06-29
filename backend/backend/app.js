const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');

app.use('/api/auth', authRoutes);  // All auth-related routes

// Health check / Root
app.get('/', (req, res) => {
  res.send('RFT Auth API is running...');
});

module.exports = app;
