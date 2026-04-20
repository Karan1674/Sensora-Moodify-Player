import { useState } from "react";
import { X, Upload, Music, Save, User } from "lucide-react";
import { toast } from "sonner";

export default function SongForm({ onClose, onSuccess, editingSong }) {
    const [title, setTitle] = useState(editingSong?.title || "");
    const [artist, setArtist] = useState(editingSong?.artist || "");
    const [mood, setMood] = useState(editingSong?.mood || "happy");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("artist", artist);
        formData.append("mood", mood);
        if (file) formData.append("audio", file);

        const url = editingSong
            ? `${import.meta.env.VITE_API_URL}/songs/${editingSong._id}`
            : `${import.meta.env.VITE_API_URL}/songs/add`;

        const method = editingSong ? "PUT" : "POST";

        try {
            const res = await fetch(url, {
                method,
                body: formData
            });

            const data = await res.json();
            console.log(data)

            if (!res.ok) {
                throw new Error(data.message || "Something went wrong");
            }

            toast.success(data.message || "Song saved successfully");

            onSuccess();
            onClose();

        } catch (error) {
            console.error("Failed to save song", error);


            toast.error(error.data.message || "Failed to save song");
        } finally {
            setLoading(false);
        }
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-200 p-4"
            onClick={handleBackdropClick}
        >
            <div className="bg-white rounded-md w-full max-w-2xl shadow-2xl border border-white overflow-hidden animate-in fade-in zoom-in duration-200">

           
                <div className="bg-green-600 p-5 flex justify-between items-center text-white">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-xl">
                            <Music size={18} />
                        </div>
                        <h2 className="text-lg font-bold">
                            {editingSong ? "Update Track" : "Add New Track"}
                        </h2>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-black/10 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">

                  
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1 text-left">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Song Title</label>
                            <div className="relative">
                                <Music className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                                <input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g. Summer High"
                                    className="w-full bg-slate-50 border border-slate-100 pl-11 pr-4 py-2 rounded-md focus:ring-2 focus:ring-green-500 focus:bg-white outline-none transition-all font-medium"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1 text-left">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Artist Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                                <input
                                    value={artist}
                                    onChange={(e) => setArtist(e.target.value)}
                                    placeholder="e.g. Modern Vibe"
                                    className="w-full bg-slate-50 border border-slate-100 pl-11 pr-4 py-2 rounded-md focus:ring-2 focus:ring-green-500 focus:bg-white outline-none transition-all font-medium"
                                    required
                                />
                            </div>
                        </div>
                    </div>

               
                    <div className="flex flex-col gap-1 text-left">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Vibe Category</label>
                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                            {['happy', 'sad', 'neutral', 'angry', 'surprised'].map((m) => (
                                <button
                                    key={m}
                                    type="button"
                                    onClick={() => setMood(m)}
                                    className={`py-2 px-3 rounded-xl text-xs font-bold capitalize transition-all border ${mood === m
                                            ? 'bg-green-600 border-green-600 text-white shadow-md shadow-green-100'
                                            : 'bg-slate-50 border-slate-100 text-slate-500 hover:border-green-200'
                                        }`}
                                >
                                    {m}
                                </button>
                            ))}
                        </div>
                    </div>

           
                    <div className="flex flex-col gap-1 text-left">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Audio Source</label>
                        <label className="flex flex-col items-center justify-center w-full h-24 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:bg-green-50 hover:border-green-200 transition-all group">
                            <div className="flex items-center gap-3">
                                <Upload size={18} className="text-slate-400 group-hover:text-green-600 transition-colors" />
                                <p className="text-sm text-slate-500 group-hover:text-green-700 font-medium truncate max-w-50">
                                    {file ? file.name : "Select audio file"}
                                </p>
                            </div>
                            <input type="file" accept="audio/*" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
                        </label>
                    </div>

          
                    <div className="flex gap-3 justify-end pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-8 py-3 rounded-2xl font-bold text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            disabled={loading}
                            className="bg-green-600 hover:bg-green-700 text-white px-10 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-green-100 transition-all active:scale-95 disabled:opacity-50"
                        >
                            {loading ? "Saving..." : <><Save size={18} /> Save Track</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}