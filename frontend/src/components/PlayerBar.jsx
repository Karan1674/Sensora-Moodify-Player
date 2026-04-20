import { Play, Pause, SkipBack, SkipForward, Music, Volume2, Heart, Repeat, Shuffle } from "lucide-react";
import { useRef, useState, useEffect } from "react";

export default function PlayerBar({ selectedSong, songs = [], setSelectedSong }) {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(0.7);

    const formatTime = (sec) => {
        if (!sec) return "0:00";
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);
        return `${m}:${s.toString().padStart(2, "0")}`;
    };

    useEffect(() => {
        if (audioRef.current && selectedSong?.audioUrl) {
            audioRef.current.src = selectedSong.audioUrl;
            audioRef.current.load();
            audioRef.current.play();
            setIsPlaying(true);
        }
    }, [selectedSong]);

    useEffect(() => {
        const audio = audioRef.current;
        const update = () => setCurrentTime(audio.currentTime);
        if (audio) audio.addEventListener("timeupdate", update);
        return () => { if (audio) audio.removeEventListener("timeupdate", update); };
    }, []);

    const togglePlay = () => {
        if (!audioRef.current || !selectedSong) return;
        isPlaying ? audioRef.current.pause() : audioRef.current.play();
        setIsPlaying(!isPlaying);
    };

    const playNext = () => {
        if (!songs.length || !selectedSong) return;
        const index = songs.findIndex(s => s._id === selectedSong._id);
        setSelectedSong(songs[(index + 1) % songs.length]);
    };

    const playPrev = () => {
        if (!songs.length || !selectedSong) return;
        const index = songs.findIndex(s => s._id === selectedSong._id);
        setSelectedSong(songs[(index - 1 + songs.length) % songs.length]);
    };

    const handleVolume = (e) => {
        const val = e.target.value;
        setVolume(val);
        if (audioRef.current) audioRef.current.volume = val;
    };

    const handleSeek = (e) => {
        const val = e.target.value;
        if (audioRef.current) audioRef.current.currentTime = val;
        setCurrentTime(val);
    };

    return (
        <div className="sticky bottom-0 left-0 right-0 z-100 bg-white/80 backdrop-blur-xl border-t border-slate-100 px-6 py-4 shadow-[0_-10px_40px_rgba(0,0,0,0.04)]">
            <div className="max-w-350 mx-auto flex items-center justify-between gap-8">


                <div className="flex items-center gap-4 w-[30%] min-w-50">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-green-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition"></div>
                        <div className="relative w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg overflow-hidden">
                            {selectedSong ? <Music size={24} className="animate-pulse" /> : <Music size={24} />}
                        </div>
                    </div>

                    <div className="overflow-hidden">
                        <h4 className="font-bold text-slate-800 leading-tight truncate">
                            {selectedSong?.title || "No Track Selected"}
                        </h4>
                        <p className="text-xs text-slate-400 mt-1 font-semibold truncate">
                            {selectedSong?.artist || "Pick a vibe to start"}
                        </p>
                    </div>
                    {selectedSong && <Heart size={18} className="text-slate-300 hover:text-red-500 cursor-pointer transition ml-2 shrink-0" />}
                </div>

                <div className="flex flex-col items-center gap-3 w-[40%]">


                    <div className="flex items-center gap-6">
                        <Shuffle size={16} className="text-slate-300 cursor-pointer hover:text-green-600 transition hidden md:block" />
                        <SkipBack
                            size={22}
                            onClick={playPrev}
                            className="text-slate-600 cursor-pointer hover:text-green-600 transition fill-current"
                        />

                        <button
                            onClick={togglePlay}
                            className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white cursor-pointer hover:scale-110 transition shadow-xl shadow-green-200 active:scale-95"
                        >
                            {isPlaying ? <Pause size={22} fill="currentColor" /> : <Play size={22} className="ml-1" fill="currentColor" />}
                        </button>

                        <SkipForward
                            size={22}
                            onClick={playNext}
                            className="text-slate-600 cursor-pointer hover:text-green-600 transition fill-current"
                        />
                        <Repeat size={16} className="text-slate-300 cursor-pointer hover:text-green-600 transition hidden md:block" />
                    </div>


                    <div className="flex items-center gap-3 w-full">
                        <span className="text-[10px] text-slate-400 font-bold w-10 text-right">
                            {formatTime(currentTime)}
                        </span>

                        <div className="relative flex-1 flex items-center group">
                            <input
                                type="range"
                                min="0"
                                max={audioRef.current?.duration || 0}
                                value={currentTime}
                                onChange={handleSeek}
                                className="absolute w-full h-1.5 opacity-0 cursor-pointer z-10"
                            />

                            <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-green-500 rounded-full relative"
                                    style={{ width: `${(currentTime / (audioRef.current?.duration || 1)) * 100}%` }}
                                >
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-2 border-green-500 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                            </div>
                        </div>

                        <span className="text-[10px] text-slate-400 font-bold w-10">
                            {formatTime(audioRef.current?.duration)}
                        </span>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 w-[30%]">
                    <Volume2 size={18} className="text-slate-400" />
                    <div className="relative w-24 flex items-center group">
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={handleVolume}
                            className="absolute w-full h-1.5 opacity-0 cursor-pointer z-10"
                        />
                        <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-slate-400 group-hover:bg-green-500 rounded-full"
                                style={{ width: `${volume * 100}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>

            <audio ref={audioRef} onEnded={playNext} />
        </div>
    );
}