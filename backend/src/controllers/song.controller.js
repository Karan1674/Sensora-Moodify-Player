const Song = require("../models/song.model");
const mm = require("music-metadata");
const { uploadToImageKit, deleteFromImageKit } = require("../services/imagekitService.service");


exports.addSong = async (req, res) => {
    try {
        const { title, artist, mood } = req.body;

        if (!title || !artist || !mood) {
            return res.status(400).json({
                message: "Title, artist and mood are required"
            });
        }

        if (!req.file) {
            return res.status(400).json({
                message: "Audio file is required"
            });
        }

        const metadata = await mm.parseBuffer(
            req.file.buffer,
            req.file.mimetype
        );

        const duration = Math.floor(metadata.format.duration);

        const uploadRes = await uploadToImageKit(req.file);

        const song = await Song.create({
            title,
            artist,
            mood,
            duration,
            audioUrl: uploadRes.url,
            fileId: uploadRes.fileId
        });

        res.status(201).json({
            message: "Song added successfully",
            data: song,
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to add song"
        });
    }
};




exports.getAllSongs = async (req, res) => {
    try {
        const songs = await Song.find().sort({ createdAt: -1 });

        res.json({ data: songs });

    } catch {
        res.status(500).json({ message: "Failed to fetch songs" });
    }
};




exports.getSongsByMood = async (req, res) => {
    try {
        const { mood } = req.params;

        const songs = await Song.find({ mood });

        res.json({ data: songs });

    } catch {
        res.status(500).json({ message: "Failed to fetch songs" });
    }
};




exports.updateSong = async (req, res) => {
    try {
        const { id } = req.params;

        const song = await Song.findById(id);

        if (!song) {
            return res.status(404).json({ message: "Song not found" });
        }

        let updatedData = { ...req.body };

        if (req.file) {
            const metadata = await mm.parseBuffer(
                req.file.buffer,
                req.file.mimetype
            );

            const duration = Math.floor(metadata.format.duration);


            await deleteFromImageKit(song.fileId);


            const uploadRes = await uploadToImageKit(req.file);

            updatedData.audioUrl = uploadRes.url;
            updatedData.fileId = uploadRes.fileId;
            updatedData.duration = duration;
        }

        const updated = await Song.findByIdAndUpdate(id, updatedData, { new: true });

        res.json({
            message: "Song updated Successfully",
            data: updated
        });

    } catch {
        res.status(500).json({ message: "Failed to update song" });
    }
};



exports.deleteSong = async (req, res) => {
    try {
        const { id } = req.params;

        const song = await Song.findById(id);

        if (!song) {
            return res.status(404).json({ message: "Song not found" });
        }

        await deleteFromImageKit(song.fileId);

        await Song.findByIdAndDelete(id);

        res.json({
            message: "Song deleted Successfully"
        });

    } catch {
        res.status(500).json({ message: "Failed to delete song" });
    }
};