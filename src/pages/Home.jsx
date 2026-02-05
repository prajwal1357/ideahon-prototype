import React, { useState, useEffect } from "react";
import {
    AlertTriangle,
    CheckCircle2,
    XCircle,
    MapPin,
    Clock,
    Bell,
    PhoneCall,
    Waves,
    Wind,
    Navigation,
    Thermometer,
    Droplets,
    Info,
    Loader2,
    Wifi,
    WifiOff,
    MessageSquare,
    Compass,
    Zap,
    Anchor,
} from "lucide-react";
import { Link } from "react-router-dom";

const App = () => {
    // --- STATE ---
    const [isMalayalam, setIsMalayalam] = useState(false);
    const [status, setStatus] = useState("safe");
    const [isOnlineManual, setIsOnlineManual] = useState(true);
    const [isSendingSos, setIsSendingSos] = useState(false);
    const [coords, setCoords] = useState({ lat: "11.2588", lng: "75.7804" }); // Calicut Coordinates

    const content = {
        en: {
            name: "KadalSathi",
            sos: "EMERGENCY SOS",
            onlineMode: "Satellite Link Active",
            offlineMode: "SMS Mode (No Internet)",
            location: "Calicut Coast",
            safe: "SAFE FOR FISHING",
            danger: "STAY ASHORE",
            calicutFocus: "Calicut Fishing Intelligence",
            hotspotTitle: "Top Spot: Chaliyam Reefs",
            hotspotDetail:
                "12km West from Beypore Harbour. High Tuna activity reported.",
            waitTitle: "Wait for Safety Window",
            waitDetail: "Weather clearing expected by:",
            resumeTime: "Tomorrow, 06:00 AM",
            riskTitle: "Danger Factors",
            riskDesc: "Rough seas at Puthiyappa. Wave height > 3.5m.",
            alerts: "Alerts",
            contact: "Police",
        },
        ml: {
            name: "കടൽസാഥി",
            sos: "അടിയന്തര സഹായം",
            onlineMode: "സാറ്റലൈറ്റ് ലിങ്ക്",
            offlineMode: "SMS മോഡ്",
            location: "കോഴിക്കോട് തീരം",
            safe: "കടലിൽ പോകാം",
            danger: "കടലിൽ പോകരുത്",
            calicutFocus: "കോഴിക്കോട് ഫിഷിംഗ് ഇൻ്റലിജൻസ്",
            hotspotTitle: "ചാലിയം കടൽത്തീരം",
            hotspotDetail:
                "ബേപ്പൂർ തുറമുഖത്ത് നിന്ന് 12 കിലോമീറ്റർ പടിഞ്ഞാറ്. ട്യൂണ ലഭിക്കാൻ സാധ്യത.",
            waitTitle: "സുരക്ഷിത സമയത്തിനായി കാത്തിരിക്കുക",
            waitDetail: "കാലാവസ്ഥ മെച്ചപ്പെടാൻ സാധ്യതയുള്ള സമയം:",
            resumeTime: "നാളെ രാവിലെ 06:00",
            riskTitle: "അപകട കാരണം",
            riskDesc: "പുതിയപ്പയിൽ കടൽ പ്രക്ഷുബ്ധമാണ്. തിരമാലകൾ 3.5 മീറ്ററിൽ കൂടുതൽ.",
            alerts: "അറിയിപ്പുകൾ",
            contact: "പോലീസ്",
        },
    };

    const t = isMalayalam ? content.ml : content.en;

    const handleSos = () => {
        setIsSendingSos(true);
        setTimeout(() => {
            if (!isOnlineManual) {
                const smsMsg = `SOS: Calicut Boat at ${coords.lat}, ${coords.lng}`;
                window.location.href = `sms:1554?body=${encodeURIComponent(smsMsg)}`;
            }
            setIsSendingSos(false);
        }, 2000);
    };

    return (
        <div className="max-w-md mx-auto min-h-screen bg-slate-50 flex flex-col font-sans antialiased pb-8 border-x border-slate-200 shadow-2xl relative overflow-x-hidden">
            {/* 1. DEMO OVERRIDE PANEL */}
            <div className="bg-slate-900 rounded-xl p-3 flex flex-col gap-3 shadow-lg ring-1 ring-slate-800">
                {/* Header */}
                <div className="flex justify-between items-center px-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                        Region: Kozhikode / Calicut
                    </span>

                    <span className="text-[10px] text-emerald-400 font-bold uppercase flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        IMD Verified
                    </span>
                </div>

                {/* Control Buttons */}
                <div className="grid grid-cols-2 gap-2">
                    {/* Connectivity Toggle */}
                    <button
                        onClick={() => setIsOnlineManual(!isOnlineManual)}
                        className={`
        flex items-center justify-center gap-2
        py-2 rounded-xl text-[11px] font-black uppercase
        transition-all duration-300
        ${isOnlineManual
                                ? "bg-emerald-500/20 text-emerald-300 ring-2 ring-emerald-500/50"
                                : "bg-red-500/20 text-red-300 ring-2 ring-red-500/50"
                            }
      `}
                    >
                        {isOnlineManual ? "📶 Online Mode" : "📡 SMS Mode"}
                    </button>

                    {/* Status Simulation */}
                    <button
                        onClick={() => setStatus(status === "safe" ? "danger" : "safe")}
                        className={`
        flex items-center justify-center gap-2
        py-2 rounded-xl text-[11px] font-black uppercase
        transition-all duration-300
        ${status === "safe"
                                ? "bg-blue-500/20 text-blue-300 ring-2 ring-blue-500/50"
                                : "bg-orange-500/20 text-orange-300 ring-2 ring-orange-500/50"
                            }
      `}
                    >
                        {status === "safe" ? "⚠ Simulate Danger" : "✅ Simulate Safe"}
                    </button>
                </div>

                {/* Market Button */}
                <Link to="/market">
                <button
                    className="
      mt-1 py-3 rounded-xl
      bg-indigo-600 hover:bg-indigo-500 active:scale-95
      text-white text-sm font-extrabold uppercase tracking-wide
      transition-all shadow-md
    "
                >
                    🐟 View Fish Market Prices
                </button>
                </Link>
            </div>

            {/* 2. HEADER */}
            <header className="bg-white p-4 flex justify-between items-center border-b shadow-sm sticky top-0 z-20">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-800 p-2 rounded-xl shadow-lg shadow-blue-100">
                        <Anchor size={22} color="white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-black text-slate-900 tracking-tighter leading-none">
                            {t.name}
                        </h1>
                        <p className="text-[9px] font-bold text-blue-600 uppercase mt-0.5 tracking-wider">
                            Kozhikode SAR Zone
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => setIsMalayalam(!isMalayalam)}
                    className="bg-slate-100 border-2 border-slate-900 text-slate-900 px-3 py-1 rounded-lg font-black text-[10px] active:scale-95 transition-transform uppercase tracking-tighter"
                >
                    {isMalayalam ? "ENGLISH" : "മലയാളം"}
                </button>
            </header>

            {/* 3. HERO STATUS */}
            <section
                className={`m-4 rounded-[2.5rem] p-6 shadow-xl flex flex-col items-center text-white transition-all duration-700 relative overflow-hidden ${status === "safe" ? "bg-emerald-600" : "bg-red-600"}`}
            >
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Waves size={120} />
                </div>
                <div className="bg-white/20 p-4 rounded-full backdrop-blur-md mb-3 ring-8 ring-white/10 z-10">
                    {status === "safe" ? (
                        <CheckCircle2 size={56} strokeWidth={3} />
                    ) : (
                        <XCircle size={56} strokeWidth={3} />
                    )}
                </div>
                <h2
                    className={`font-black text-center leading-tight z-10 ${isMalayalam ? "text-3xl" : "text-2xl"}`}
                >
                    {status === "safe" ? t.safe : t.danger}
                </h2>
            </section>

            {/* 4. MAIN TAG - HYPER LOCAL CALICUT INTELLIGENCE */}
            <main className="px-4 flex-grow space-y-4">
                <div className="flex items-center gap-2 px-1">
                    <div className="h-[2px] flex-grow bg-slate-200"></div>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                        {t.calicutFocus}
                    </span>
                    <div className="h-[2px] flex-grow bg-slate-200"></div>
                </div>

                {status === "safe" ? (
                    /* CALICUT HOTSPOT CARD */
                    <div className="bg-slate-900 text-white rounded-3xl p-5 shadow-lg relative overflow-hidden group">
                        <Compass className="absolute -right-4 -bottom-4 opacity-10 w-28 h-28 rotate-12 group-hover:rotate-45 transition-transform duration-1000" />
                        <div className="flex items-start gap-4">
                            <div className="bg-blue-600 p-3 rounded-2xl shadow-inner">
                                <MapPin size={24} fill="white" />
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black uppercase text-blue-400 tracking-widest mb-1">
                                    {t.hotspotTitle}
                                </h4>
                                <p
                                    className={`font-black leading-tight ${isMalayalam ? "text-lg" : "text-xl"}`}
                                >
                                    {t.hotspotLoc}
                                </p>
                                <p className="text-[11px] text-slate-400 mt-2 font-medium">
                                    {t.hotspotDetail}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* RESUME FISHING CARD */
                    <div className="bg-white border-2 border-red-100 rounded-3xl p-5 shadow-sm space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="bg-red-100 p-3 rounded-2xl text-red-600">
                                <Clock size={24} strokeWidth={3} />
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black uppercase text-red-500 tracking-widest mb-1">
                                    {t.waitTitle}
                                </h4>
                                <p className="text-[11px] text-slate-500 font-bold mb-2">
                                    {t.waitDetail}
                                </p>
                                <div className="bg-red-50 px-4 py-2 rounded-xl inline-block">
                                    <p className="text-xl font-black text-red-600 tracking-tighter">
                                        {t.resumeTime}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                            <h5 className="text-[9px] font-black text-slate-400 uppercase mb-2 flex items-center gap-2">
                                <AlertTriangle size={12} className="text-orange-500" />{" "}
                                {t.riskTitle}
                            </h5>
                            <p className="text-xs font-bold text-slate-700 leading-snug">
                                {t.riskDesc}
                            </p>
                        </div>
                    </div>
                )}

                {/* METRICS ROW */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col items-center">
                        <Wind
                            size={20}
                            className={status === "safe" ? "text-blue-500" : "text-red-500"}
                        />
                        <span className="text-[9px] font-black text-slate-400 uppercase mt-2">
                            Wind Speed
                        </span>
                        <span className="text-lg font-black text-slate-900">
                            {status === "safe" ? "12 km/h" : "52 km/h"}
                        </span>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col items-center">
                        <Waves
                            size={20}
                            className={status === "safe" ? "text-blue-500" : "text-red-500"}
                        />
                        <span className="text-[9px] font-black text-slate-400 uppercase mt-2">
                            Wave Height
                        </span>
                        <span className="text-lg font-black text-slate-900">
                            {status === "safe" ? "0.8 m" : "3.8 m"}
                        </span>
                    </div>
                </div>
            </main>

            {/* 5. ACTION FOOTER */}
            <footer className="mt-auto px-4 space-y-3 pt-4 bg-white border-t border-slate-100 shadow-[0_-10px_30px_rgba(0,0,0,0.03)] z-10">
                <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center gap-2 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl font-black text-[11px] text-slate-600 uppercase tracking-tighter">
                        <Bell size={18} /> {t.alerts}
                    </button>
                    <button className="flex items-center justify-center gap-2 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl font-black text-[11px] text-slate-600 uppercase tracking-tighter">
                        <Info size={18} /> {t.contact}
                    </button>
                </div>

                <button
                    onClick={handleSos}
                    className="w-full flex flex-col items-center justify-center py-5 bg-red-600 rounded-[2.5rem] font-black text-white shadow-xl shadow-red-200 active:bg-red-800 active:scale-95 transition-all"
                >
                    <div className="flex items-center gap-4">
                        <PhoneCall size={32} fill="white" />
                        <span className="text-3xl tracking-tighter uppercase">{t.sos}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1 opacity-80">
                        {isOnlineManual ? <Wifi size={12} /> : <WifiOff size={12} />}
                        <span className="text-[9px] font-bold uppercase tracking-widest italic">
                            {isOnlineManual
                                ? "Satellite Broadcast Active"
                                : "Emergency SMS Protocol"}
                        </span>
                    </div>
                </button>
            </footer>

            {/* SOS OVERLAY */}
            {isSendingSos && (
                <div className="fixed inset-0 bg-slate-900/95 z-[100] flex flex-col items-center justify-center text-white p-8 text-center animate-in fade-in duration-300">
                    <Loader2 className="animate-spin mb-8 text-blue-500" size={64} />
                    {isOnlineManual ? (
                        <div className="flex flex-col items-center">
                            <Wifi
                                size={80}
                                className="text-emerald-400 mb-6 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]"
                            />
                            <p className="text-2xl font-black tracking-tight">
                                TRANSMITTING COORDINATES
                            </p>
                            <p className="text-slate-400 mt-2 font-mono text-sm tracking-widest">
                                {coords.lat}N, {coords.lng}E
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center animate-bounce">
                            <MessageSquare size={80} className="text-amber-500 mb-6" />
                            <p className="text-2xl font-black tracking-tight uppercase">
                                No Network: Sending SMS
                            </p>
                            <p className="text-amber-200 mt-2 text-sm font-bold tracking-widest uppercase">
                                Target: SAR HQ (1554)
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default App;
