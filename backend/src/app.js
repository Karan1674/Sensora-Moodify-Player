const express = require('express');
const cors = require('cors');
const songRoutes = require('./routes/song.route.js');

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true
}));

app.use(express.json());


app.use('/api/songs', songRoutes);

module.exports = app;