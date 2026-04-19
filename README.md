# 🎧 Sensora Moodify Player

An AI-powered music player that detects your facial expressions in real-time and dynamically curates music based on your mood.

Built with a modern full-stack architecture using React, Node.js, and real-time facial emotion detection.

---

## ✨ Overview

Sensora Moodify transforms how users interact with music by eliminating manual playlist selection.

Instead of searching for songs, the system understands your emotional state through facial expressions and instantly aligns your music experience accordingly.

The result is a seamless, intelligent, and immersive listening experience that adapts in real-time.

---

## 🚀 Features

- 🎥 Real-time facial expression detection
- 🎶 Mood-based intelligent music prioritization
- 📂 Full song management system (CRUD)
- ⚡ Instant playback with dynamic queue updates
- 🎛️ Advanced music player controls
- ☁️ Secure cloud-based audio storage
- 🧠 AI-driven user experience

---

## 🧠 How It Works

1. The camera captures your facial expressions
2. AI analyzes micro-expressions using a trained model
3. The dominant emotion is detected
4. Songs matching that mood are prioritized instantly
5. Music playback adapts without delays or reloads

---

## 🛠️ Tech Stack

### 🎨 Frontend
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-Frontend-purple?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-UI-38bdf8?style=for-the-badge&logo=tailwindcss)
![Face API](https://img.shields.io/badge/Face--API-AI-green?style=for-the-badge)
![Lucide](https://img.shields.io/badge/Lucide-Icons-black?style=for-the-badge)

### ⚙️ Backend
![Node.js](https://img.shields.io/badge/Node.js-Backend-green?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Express-API-black?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?style=for-the-badge&logo=mongodb)
![Mongoose](https://img.shields.io/badge/Mongoose-ODM-red?style=for-the-badge)

### ☁️ Storage & Tools
![ImageKit](https://img.shields.io/badge/ImageKit-Media-blue?style=for-the-badge)
![Multer](https://img.shields.io/badge/Multer-Upload-orange?style=for-the-badge)
![Music Metadata](https://img.shields.io/badge/Music--Metadata-Audio-yellow?style=for-the-badge)

---

## 🎶 Music Management System

The platform includes a fully functional backend-driven music management system designed for flexibility and scalability.

Users can upload audio files directly through the interface, where each file is processed in real-time. During upload, metadata such as duration is automatically extracted using a parsing engine, eliminating the need for manual input.

Each track is categorized by mood (happy, sad, angry, neutral, surprised), allowing the system to intelligently organize and retrieve songs.

The system supports:
- Creating new tracks with audio upload
- Updating existing tracks (including replacing audio)
- Deleting tracks with automatic cloud cleanup
- Fetching all songs or filtering by mood

All media files are securely stored using cloud storage, ensuring fast delivery and reliability.

---

## ▶️ Smart Player System

The player is designed to deliver a seamless and interactive listening experience.

When a song is selected or when a mood is detected, playback starts instantly without requiring user interaction. The player automatically syncs with the selected track and updates in real-time.

It includes:
- Play / Pause functionality
- Next / Previous navigation across the playlist
- Real-time progress tracking with seek control
- Volume adjustment with smooth transitions
- Auto-play on track selection

The player intelligently cycles through songs and ensures continuity without interruptions, creating a fluid listening experience similar to modern streaming platforms.

---

## ⚡ Performance Highlights

Performance is a core strength of Sensora Moodify.

Instead of making repeated API calls whenever a mood is detected, the system fetches all songs once and stores them in memory. When a mood is identified, songs are instantly re-ordered on the client side, prioritizing relevant tracks.

This approach results in:
- ⚡ Near-instant mood-based playlist updates
- 📉 Reduced server load and API dependency
- 🚀 Faster UI rendering and responsiveness

Additionally:
- Face detection runs efficiently using lightweight models
- UI updates are optimized to avoid unnecessary re-renders
- Audio playback is handled with minimal latency

The combination of smart data handling and optimized frontend logic ensures a smooth and real-time user experience.

---


## 🌟 Future Enhancements

- Integration with Spotify / YouTube APIs
- Advanced AI recommendation engine
- User authentication and personal playlists
- Mood history tracking and analytics
- Mobile application version

---

## 👨‍💻 Developer

Karanjit Singh

Aspiring Software and Full Stack Developer focused on building modern, responsive, and user-friendly web applications.

---



⭐ If you found this project useful, consider giving it a star!