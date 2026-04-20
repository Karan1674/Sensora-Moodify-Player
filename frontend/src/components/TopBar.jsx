import { Camera, CameraOff, Plus, ArrowLeft, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";


const SensoraLogo = ({ className = "w-10 h-10" }) => (
    <div className={className}>
        <svg viewBox="0 0 100 100">
            <rect width="100" height="100" rx="24" fill="#0f172a" />
            <path
                d="M30 55 a20 20 0 0 1 40 0"
                stroke="#1db954"
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
            />
            <rect x="22" y="52" width="12" height="22" rx="5" fill="#1db954" />
            <rect x="66" y="52" width="12" height="22" rx="5" fill="#1db954" />
        </svg>
    </div>
);
export default function TopBar({ isCameraOn, startVideo, stopVideo, onAddSong }) {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">


            <div className="flex items-center gap-5">
                <button
                    onClick={() => navigate("/")}
                    className="group p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-green-600 hover:border-green-100 shadow-sm transition-all active:scale-90"
                    title="Back to Home"
                >
                    <ArrowLeft size={22} className="group-hover:-translate-x-1 transition-transform" />
                </button>

                <div className="max-w-6xl mx-auto px-6 h-20 flex justify-between items-center">
                    <div className="flex items-center gap-3 group cursor-pointer">
                        <SensoraLogo className="w-9 h-9 transition-transform group-hover:rotate-12" />
                        <span className="text-xl font-bold tracking-tight">
                            Sensora<span className="text-[#1db954]">Moodify</span>
                        </span>
                    </div>
                </div>

            </div>

            <div className="flex items-center gap-3">
                <button
                    onClick={isCameraOn ? stopVideo : startVideo}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl font-bold transition-all shadow-lg active:scale-95 border ${isCameraOn
                        ? 'bg-red-50 border-red-100 text-red-600 shadow-red-100/50'
                        : 'bg-slate-900 border-slate-900 text-white shadow-slate-200 hover:bg-green-600 hover:border-green-600'
                        }`}
                >
                    {isCameraOn ? (
                        <>
                            <CameraOff size={18} />
                            <span className="text-sm">Stop Scan</span>
                        </>
                    ) : (
                        <>
                            <Camera size={18} />
                            <span className="text-sm">Start Camera</span>
                        </>
                    )}
                </button>


                <button
                    onClick={onAddSong}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-white shadow-md border border-slate-100 hover:border-green-400 group transition-all active:scale-95"
                >
                    <Plus size={18} className="text-green-600 group-hover:rotate-90 transition-transform duration-300" />
                    <span className="text-sm font-bold text-slate-700">Add Track</span>
                </button>
            </div>
        </div>
    );
}