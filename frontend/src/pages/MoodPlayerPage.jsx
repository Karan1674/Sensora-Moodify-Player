import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { toast } from "sonner";

import TopBar from "../components/TopBar";
import FacialExpression from "../components/FacialExpression";
import { CameraOff } from "lucide-react";
import SongsTable from "../components/SongsTable";
import PlayerBar from "../components/PlayerBar";
import SongForm from "../components/SongForm";

export default function MoodPlayerPage() {
    const videoRef = useRef();

    const [allSongs, setAllSongs] = useState([]);
    const [songs, setSongs] = useState([]);

    const [currentMood, setCurrentMood] = useState(null);
    const [isDetecting, setIsDetecting] = useState(false);
    const [message, setMessage] = useState("");
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [selectedSong, setSelectedSong] = useState(null);

    const [modelsLoaded, setModelsLoaded] = useState(false);

    const [showForm, setShowForm] = useState(false);
    const [editingSong, setEditingSong] = useState(null);
    const [loading, setLoading] = useState(true);



    const loadModels = async () => {
        const MODEL_URL = "/models";
        await Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
            faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
        ]);
        setModelsLoaded(true);
    };


    const startVideo = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true
            });

            if (videoRef.current) {
                videoRef.current.srcObject = stream;

                // ✅ wait until video is ready
                videoRef.current.onloadedmetadata = () => {
                    videoRef.current.play();
                };
            }

            setIsCameraOn(true);

        } catch (err) {
            console.error("Camera error:", err);
            alert("Camera not working or blocked");
        }
    };


    const stopVideo = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
            setIsCameraOn(false);
        }
    };


    const detectMood = async () => {
        if (!isCameraOn || !modelsLoaded) return;

        setIsDetecting(true);

        const detections = await faceapi
            .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
            .withFaceExpressions();

        if (!detections || detections.length === 0) {
            setMessage("No face detected");
            setCurrentMood(null);
            setTimeout(() => {
                setMessage("");
            }, 2000);

            setIsDetecting(false);
            return;
        }

        setMessage("");

        const expressions = detections[0].expressions;

        const bestMatch = Object.keys(expressions).reduce((a, b) =>
            expressions[a] > expressions[b] ? a : b
        );

        setCurrentMood(bestMatch);

        // await fetchSongsByMood(bestMatch);
        prioritizeMoodSongs(bestMatch);
        setIsDetecting(false);
    };


    const fetchAllSongs = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${import.meta.env.VITE_API_URL}/songs`);
            const data = await res.json();

            const fetchedSongs = data.data || [];

            setAllSongs(fetchedSongs);
            setSongs(fetchedSongs);


            if (fetchedSongs.length > 0) {
                setSelectedSong(fetchedSongs[0]);
            }

        } catch (err) {
            console.error("Error fetching songs", err);
        }
        finally {
            setLoading(false);
        }
    };

    const fetchSongsByMood = async (mood) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/songs/mood/${mood}`)
            const data = await res.json();

            const moodSongs = data.data || [];

            setSongs(moodSongs);


            if (moodSongs.length > 0) {
                setSelectedSong(moodSongs[0]);
            }

        } catch (err) {
            console.error("Error fetching mood songs", err);
        }
    };


    const prioritizeMoodSongs = (mood) => {
        const matched = allSongs.filter(s => s.mood === mood);
        const others = allSongs.filter(s => s.mood !== mood);

        const sorted = [...matched, ...others];

        setSongs(sorted);
        

        if (matched.length > 0) {
            setSelectedSong(matched[0]);
        }

        if (matched.length === 0) {
    toast.error(`No songs found for mood: ${mood}`);
    return;
}
    };

    const handleAddSong = () => {
        setEditingSong(null);
        setShowForm(true);
    };

    const handleEditSong = (song) => {
        setEditingSong(song);
        setShowForm(true);
    };

    const handleDeleteSong = async (id) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/songs/${id}`, {
                method: "DELETE"
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message);

            toast.success(data.message || "Song deleted Sucessfully");

            fetchAllSongs();

        } catch (err) {
            toast.error(err.data.message || "Delete failed");
        }
    };

    const handleSuccess = () => {
        fetchAllSongs();
    };

    useEffect(() => {
        loadModels();
        fetchAllSongs();
    }, []);

    return (
        <div className="min-h-screen bg-[#f8faf9] flex flex-col font-sans text-slate-900">

            <main className="grow p-6 lg:p-10 max-w-7xl mx-auto w-full space-y-8">

                <TopBar
                    isCameraOn={isCameraOn}
                    startVideo={startVideo}
                    stopVideo={stopVideo}
                    onAddSong={handleAddSong}
                />

                <FacialExpression
                    videoRef={videoRef}
                    isCameraOn={isCameraOn}
                    detectMood={detectMood}
                    isDetecting={isDetecting}
                    currentMood={currentMood}
                />

                <SongsTable
                    Songs={songs}
                    loading={loading}
                    selectedSong={selectedSong}
                    setSelectedSong={setSelectedSong}
                    currentMood={currentMood}
                    onEdit={handleEditSong}
                    onDelete={handleDeleteSong}
                />


            </main>

            {showForm && (

                <SongForm
                    onClose={() => setShowForm(false)}
                    onSuccess={handleSuccess}
                    editingSong={editingSong}
                />
            )}
            <PlayerBar selectedSong={selectedSong}
                songs={songs}
                setSelectedSong={setSelectedSong} />

            {message && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white text-red-500 px-8 py-2 rounded-full shadow flex items-center gap-2">
                    <CameraOff size={16} />
                    <span className="text-sm font-medium">{message}</span>
                </div>
            )}
        </div>
    );
}