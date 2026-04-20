
import { Music, CameraOff, Smile, Frown, Zap, Ghost, Meh } from "lucide-react";


const MoodIcon = ({ mood }) => {
    switch (mood) {
        case "happy": return <Smile size={48} className="text-white" />;
        case "sad": return <Frown size={48} className="text-white" />;
        case "angry": return <Zap size={48} className="text-white" />;
        case "surprised": return <Ghost size={48} className="text-white" />;
        default: return <Meh size={48} className="text-white" />;
    }
};

export default function FacialExpression({ isCameraOn, videoRef, detectMood, isDetecting, currentMood }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">


            <div className="lg:col-span-7 bg-slate-900 rounded-md shadow-md overflow-hidden border border-white relative group h-100">
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    className={`w-full h-full object-cover scale-x-[-1] ${isCameraOn ? "block" : "hidden"
                        }`}
                />

                {!isCameraOn && (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 absolute inset-0">
                        <CameraOff size={48} className="mb-4 opacity-20" />
                        <p className="font-bold tracking-widest uppercase text-xs">
                            Camera Offline
                        </p>
                    </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
                    <div className="text-white text-left">
                        <p className="text-xs font-medium opacity-80 uppercase tracking-widest">AI Vision</p>
                        <h3 className="text-lg font-semibold">{isCameraOn ? "Tracking Active" : "Waiting for start"}</h3>
                    </div>
                    {isCameraOn && (
                        <button
                            onClick={detectMood}
                            className="bg-green-500 hover:bg-green-400 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg active:scale-95"
                        >
                            {isDetecting ? "Analyzing..." : "Capture Mood"}
                        </button>
                    )}
                </div>
            </div>

            <div className="lg:col-span-5 bg-green-600 rounded-md p-8 text-white flex flex-col justify-between shadow-md shadow-green-900/20 h-100 text-left">

                <div className="flex justify-between items-start">
                    <div className="bg-white/20 p-4 rounded-3xl backdrop-blur-md">
                        <Music size={32} />
                    </div>
                    <span className="bg-black/10 px-4 py-2 rounded-full text-xs font-bold border border-white/10 uppercase tracking-tighter">
                        AI Synthesis
                    </span>
                </div>

                <div className="flex flex-col gap-5">

                    <h2 className="text-sm font-bold opacity-70 uppercase tracking-widest">
                        Current Vibe
                    </h2>

                    <div className="flex items-center gap-6">

                        <div className="p-4 rounded-full bg-white/10 border-2 border-white/30 shadow-2xl">
                            {currentMood ? (
                                <MoodIcon mood={currentMood} />
                            ) : (
                                <Music size={48} className="text-white opacity-40" />
                            )}
                        </div>

                        <h1 className="text-4xl font-black capitalize tracking-tighter">
                            {currentMood
                                ? currentMood
                                : !isCameraOn
                                    ? "Camera Off"
                                    : "No Detection"}
                        </h1>

                    </div>

                    <p className="mt-4 text-green-50 font-medium leading-relaxed opacity-90 max-w-70">
                        {currentMood
                            ? <>Your expression feels <b>{currentMood}</b>. We've updated your library to match.</>
                            : !isCameraOn
                                ? "Start the camera to detect your mood."
                                : "We couldn't detect a face. Try adjusting your position."}
                    </p>

                </div>
            </div>
        </div>


    );
}