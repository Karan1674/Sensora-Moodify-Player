import { Play, MoreVertical, Edit3, Trash2 } from "lucide-react";
import { useState } from "react";

export default function SongsTable({
    Songs,
    loading,
    selectedSong,
    setSelectedSong,
    currentMood,
    onEdit,
    onDelete
}) {
    const [openMenu, setOpenMenu] = useState(null);

    return (
        <section>
            <h3 className="text-xl font-bold mb-6 my-10 text-slate-800 text-left">
                Your Soundtrack
            </h3>

            <div className="bg-white rounded-md mb-30 shadow-sm border border-slate-100">
                <table className="w-full text-left border-collapse">

                    <thead>
                        <tr className="text-slate-400 text-xs uppercase tracking-widest border-bottom border-slate-50">
                            <th className="px-8 py-5 font-semibold"># Title</th>
                            <th className="px-8 py-5 font-semibold">Artist</th>
                            <th className="px-8 py-5 font-semibold">Mood Tag</th>
                            <th className="px-8 py-5 font-semibold text-right">Time</th>
                            <th className="px-4"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="py-6">
                                    <div className="animate-pulse space-y-2">
                                        <div className="h-4 bg-slate-200 rounded w-1/3 mx-auto"></div>
                                    </div>
                                </td>
                            </tr>
                        ) : Songs.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-6 text-slate-400">
                                    No songs available
                                </td>
                            </tr>
                        ) : (
                            Songs.map((song, index) => (
                                <tr
                                    key={song._id}
                                    onClick={() => setSelectedSong(song)}
                                    className={`group cursor-pointer transition-colors ${selectedSong?._id === song._id
                                        ? 'bg-green-50/50'
                                        : 'hover:bg-slate-50'
                                        }`}
                                >
                                    <td className="px-8 py-4 flex items-center gap-4 text-left">
                                        <span className="text-slate-300 w-4">{index + 1}</span>

                                        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                                            <Play
                                                size={14}
                                                fill="currentColor"
                                                className={
                                                    selectedSong?._id === song._id
                                                        ? 'text-green-600'
                                                        : 'text-slate-400'
                                                }
                                            />
                                        </div>

                                        <span className={`font-semibold ${selectedSong?._id === song._id
                                            ? 'text-green-700'
                                            : 'text-slate-700'
                                            }`}>
                                            {song.title}
                                        </span>
                                    </td>

                                    <td className="px-8 py-4 text-slate-500 text-sm">
                                        {song.artist}
                                    </td>

                                    <td className="px-8 py-4">
                                        <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase border ${song.mood === currentMood
                                            ? 'bg-green-600 border-green-600 text-white'
                                            : 'border-slate-200 text-slate-400'
                                            }`}>
                                            {song.mood}
                                        </span>
                                    </td>

                                    <td className="px-8 py-4 text-slate-400 text-sm text-right font-medium">
                                        {Math.floor(song.duration / 60)}:
                                        {(song.duration % 60).toString().padStart(2, "0")}
                                    </td>


                                    <td className="px-4 relative">
                                        <button
                                            className={`p-2 rounded-full transition-all active:scale-90 ${openMenu === song._id
                                                ? 'bg-slate-100 text-slate-900'
                                                : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                                                }`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setOpenMenu(openMenu === song._id ? null : song._id);
                                            }}
                                        >
                                            <MoreVertical size={20} />
                                        </button>

                                        {openMenu === song._id && (
                                            <>

                                                <div
                                                    className="fixed inset-0 z-40"
                                                    onClick={() => setOpenMenu(null)}
                                                />

                                                <div className="absolute right-0 mt-2 w-40 bg-white/80 backdrop-blur-xl border border-slate-100 shadow-2xl shadow-slate-200 rounded-2xl z-50 overflow-hidden py-1 animate-in fade-in slide-in-from-top-2 duration-200">


                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            onEdit(song);
                                                            setOpenMenu(null);
                                                        }}
                                                        className="flex items-center gap-3 w-full px-4 py-2.5 text-slate-600 hover:bg-green-50 hover:text-green-700 transition-colors text-sm font-medium"
                                                    >
                                                        <Edit3 size={16} />
                                                        Edit Track
                                                    </button>


                                                    <div className="h-1 bg-slate-100 my-1 mx-2" />

                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            onDelete(song._id);
                                                            setOpenMenu(null);
                                                        }}
                                                        className="flex items-center gap-3 w-full px-4 py-2.5 text-red-500 hover:bg-red-50 transition-colors text-sm font-bold"
                                                    >
                                                        <Trash2 size={16} />
                                                        Delete
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </td>

                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}