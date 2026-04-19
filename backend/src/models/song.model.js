// src/models/songModel.js

const mongoose = require('mongoose');

const songSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Song title is required"],
            trim: true,
        },

        artist: {
            type: String,
            required: [true, "Artist name is required"],
            trim: true,
        },

        mood: {
            type: String,
            required: true,
            enum: {
                values: ["happy", "sad", "angry", "neutral", "surprised"],
                message: "Invalid mood value"
            }
        },

        duration: {
            type: Number,
            required: true,
            min: 1
        },

        audioUrl: {
            type: String,
            required: [true, "Audio URL is required"]
        },
        fileId: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Song", songSchema);