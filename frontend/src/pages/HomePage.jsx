import React from "react";
import { useNavigate } from "react-router-dom";
import {
    Sparkles,
    Music,
    Zap,
    Shield,
    Heart,
    Play,
    Disc,
    Waves,
    Activity,
    ScanFace,
    Sliders,
    Headphones,
    ArrowRight,
    ExternalLink
} from "lucide-react";


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

export default function HomePage() {
    const navigate = useNavigate();

    const moodPills = [
        { label: "High Energy", color: "bg-orange-500", icon: <Zap size={14} /> },
        { label: "Focus Mode", color: "bg-emerald-500", icon: <Waves size={14} /> },
        { label: "Deep Chill", color: "bg-blue-500", icon: <Disc size={14} /> },
        { label: "Gym Hype", color: "bg-red-500", icon: <Activity size={14} /> }
    ];

    return (
        <div className="min-h-screen bg-[#fafafa] text-slate-900 font-sans selection:bg-green-100 selection:text-green-900">


            <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-lg border-b border-slate-200/60">
                <div className="max-w-6xl mx-auto px-6 h-20 flex justify-between items-center">
                    <div className="flex items-center gap-3 group cursor-pointer">
                        <SensoraLogo className="w-9 h-9 transition-transform group-hover:rotate-12" />
                        <span className="text-xl font-bold tracking-tight">
                            Sensora<span className="text-[#1db954]">Moodify</span>
                        </span>
                    </div>

                    <button
                        onClick={() => navigate("/player")}
                        className="group flex items-center gap-2 cursor-pointer bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-[#1db954] transition-all duration-300 shadow-lg shadow-slate-200 hover:shadow-green-200 hover:-translate-y-0.5"
                    >
                        Launch Player
                        <Play size={14} className="fill-current group-hover:scale-110 transition-transform" />
                    </button>
                </div>
            </nav>


            <main className="relative max-w-6xl mx-auto px-6">
                <section className="pt-48 pb-32 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-bold uppercase tracking-widest text-slate-500 mb-8 animate-fade-in">
                        <Sparkles size={14} className="text-[#1db954]" />
                        Personalized AI Experience
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8 text-slate-900">
                        Your Mood <br />
                        <span className="bg-clip-text text-transparent bg-linear-to-r from-[#1db954] to-emerald-600">
                            Perfectly Synced
                        </span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-xl text-slate-500 leading-relaxed mb-12 font-medium">
                        Stop searching for the right playlist. Sensora uses advanced facial recognition to curate music that matches your exact emotional state in real-time.
                    </p>

                    <div className="flex flex-col items-center gap-6">
                        <button
                            onClick={() => navigate("/player")}
                            className="px-8 py-4 bg-[#1db954] cursor-pointer text-white rounded-xl font-bold text-lg hover:bg-green-600 transition-all shadow-xl shadow-green-200 hover:shadow-green-300 hover:-translate-y-1 active:scale-95"
                        >
                            Start Listening Now
                        </button>

                        <div className="mt-12 flex flex-wrap justify-center gap-3">
                            {moodPills.map((pill, i) => (
                                <div key={i} className="flex items-center gap-2.5 px-5 py-2.5 bg-white border border-slate-100 rounded-2xl text-sm font-bold text-slate-600 shadow-sm transition-all hover:border-slate-200">
                                    <span className={`p-1.5 rounded-lg text-white ${pill.color} shadow-sm`}>{pill.icon}</span>
                                    {pill.label}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>


                <section className="py-20 md:py-32 border-y border-slate-200/50">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">


                        <div className="lg:col-span-4 lg:sticky lg:top-32 text-center lg:text-left">
                            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
                                How it <span className="text-[#1db954]">works</span>
                            </h2>
                            <p className="text-slate-500 text-lg leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">
                                We've automated the vibe-check. Our engine processes emotion to sound in under 200ms.
                            </p>

                            <div className="hidden lg:block h-1.5 w-20 bg-slate-900 rounded-full" />
                        </div>


                        <div className="lg:col-span-8 space-y-6 md:space-y-12">
                            {[
                                {
                                    icon: <ScanFace size={28} />,
                                    title: "Visual Analysis",
                                    desc: "Our on-device AI maps 68 facial landmarks to identify subtle emotional cues without saving your image."
                                },
                                {
                                    icon: <Sliders size={28} />,
                                    title: "Vibe Calibration",
                                    desc: "We cross-reference your mood with over 40 sonic attributes like tempo, key, and energy levels."
                                },
                                {
                                    icon: <Headphones size={28} />,
                                    title: "Dynamic Playback",
                                    desc: "A seamless transition logic ensures your music shifts as naturally as your feelings do."
                                }
                            ].map((step, i) => (
                                <div
                                    key={i}
                                    className="group flex flex-col sm:flex-row gap-6 md:gap-8 p-6 md:p-10 bg-white rounded-lg border border-slate-100 shadow-sm transition-all hover:shadow-md hover:lg:-translate-x-2"
                                >
                                    <div className="shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-slate-50 text-[#1db954] flex items-center justify-center group-hover:bg-[#1db954] group-hover:text-white transition-colors duration-500 shadow-inner">
                                        {step.icon}
                                    </div>
                                    <div>
                                        <span className="text-[#1db954] font-mono font-bold text-xs md:text-sm tracking-widest">STEP 0{i + 1}</span>
                                        <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 text-slate-900">{step.title}</h3>
                                        <p className="text-slate-500 font-medium leading-relaxed text-sm md:text-base">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </section>


                <section className="py-32">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black tracking-tight">Built for the <span className="italic text-[#1db954]">Senses</span></h2>
                    </div>

                    <div className="grid md:grid-cols-6 md:grid-rows-2 gap-4 h-full md:h-150">

                        <div className="md:col-span-3 md:row-span-2 p-10 bg-slate-900 text-white rounded-2xl flex flex-col justify-between overflow-hidden relative group">
                            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:rotate-12 transition-transform duration-700">
                                <ScanFace size={200} />
                            </div>
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-[#1db954] flex items-center justify-center mb-6">
                                    <Zap size={24} />
                                </div>
                                <h3 className="text-4xl font-bold mb-4 leading-tight">Smart Facial <br /> Detection</h3>
                                <p className="text-slate-400 text-lg max-w-xs">Real-time emotion tracking that adjusts your queue instantly based on micro-expressions.</p>
                            </div>
                            <div className="mt-8 flex items-center gap-2 text-[#1db954] font-bold">
                                Learn about our model <ArrowRight size={18} />
                            </div>
                        </div>


                        <div className="md:col-span-3 p-8 bg-emerald-50 rounded-2xl border border-emerald-100 flex flex-col justify-center">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-white rounded-xl text-emerald-600 shadow-sm"><Music size={20} /></div>
                                <h3 className="text-2xl font-bold text-emerald-950">Adaptive Flow</h3>
                            </div>
                            <p className="text-emerald-800/70 font-medium">Cross-fade technology that maintains the beat while changing genres.</p>
                        </div>

                        <div className="md:col-span-3 p-8 bg-white rounded-2xl border border-slate-200 flex flex-col justify-center relative overflow-hidden group">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-slate-900 rounded-xl text-white"><Shield size={20} /></div>
                                <h3 className="text-2xl font-bold text-slate-900">Privacy First</h3>
                            </div>
                            <p className="text-slate-500 font-medium">Processing happens on your GPU. No camera data ever touches our servers.</p>
                        </div>
                    </div>
                </section>
            </main>


            <footer className="bg-slate-900 pt-24 pb-12 px-6   mt-20">
                <div className="max-w-4xl mx-auto text-center">

                    <div className="flex flex-col items-center mb-12">
                        <SensoraLogo className="w-16 h-16 mb-6 drop-shadow-[0_0_5px_rgba(29,185,84,0.3)]" />
                        <h2 className="text-3xl font-black text-white tracking-tighter mb-4">
                            Sensora<span className="text-[#1db954]">Moodify</span>
                        </h2>
                        <p className="text-slate-400 text-lg max-w-sm mx-auto font-medium leading-relaxed">
                            Elevating your daily soundtrack through the power of emotional intelligence.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 mb-20">
                        {[
                            { icon: <Heart size={20} />, label: "Support", color: "hover:text-red-400" },
                            { icon: <Music size={20} />, label: "Playlists", color: "hover:text-[#1db954]" },
                            { icon: <Zap size={20} />, label: "Updates", color: "hover:text-orange-400" }
                        ].map((item, i) => (
                            <button
                                key={i}
                                className={`flex items-center gap-3 px-8 py-3 bg-white/5 border border-white/10 rounded-2xl text-white font-bold transition-all hover:bg-white/10 hover:-translate-y-1 ${item.color}`}
                            >
                                {item.icon}
                                {item.label}
                            </button>
                        ))}
                    </div>


                    <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em]">
                            © {new Date().getFullYear()} Sensora Moodify Player • All Rights Reserved
                        </div>

                        <div className="flex items-center gap-8">
                            <span className="text-slate-500 hover:text-white transition-colors cursor-pointer text-sm font-bold">Privacy</span>
                            <span className="text-slate-500 hover:text-white transition-colors cursor-pointer text-sm font-bold">Terms</span>
                            <span className="text-slate-500 hover:text-white transition-colors cursor-pointer text-sm font-bold">Cookies</span>
                        </div>
                    </div>

                </div>
            </footer>
        </div>
    );
}