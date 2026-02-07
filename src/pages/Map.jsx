import React, { useState, useEffect } from 'react';
import { 
  MapPin, Navigation, Compass, Anchor, Ship, 
  ArrowLeft, Info, ZoomIn, ZoomOut, Maximize2, 
  Waves, Target, Map as MapIcon, Globe, Wind,
  PhoneCall, Loader2, Wifi, WifiOff, MessageSquare,
  ChevronRight, AlertCircle, Fish, History, Clock
} from 'lucide-react';

/**
 * KADALSATHI - MARITIME NAVIGATION (Calicut Edition)
 * Feature: Last Recorded Location toolkit for offline mode.
 * Fixed: Offline SOS logic and Emergency Land Navigation visibility.
 */

const App = () => {
  // --- UI STATE ---
  const [activeTab, setActiveTab] = useState('land'); // 'spot' or 'land'
  const [isMalayalam, setIsMalayalam] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [isSendingSos, setIsSendingSos] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  // --- SIMULATION DATA ---
  const boatPos = { x: 180, y: 350 };
  const landPos = { x: 340, y: 200 }; // Beypore Harbour
  const hotspotPos = { x: 80, y: 150 }; // Chaliyam North Reef
  const coords = { lat: "11.2588", lng: "75.7804" };

  const t = {
    name: isMalayalam ? "നാവിഗേഷൻ" : "Navigation",
    spot: isMalayalam ? "മത്സ്യബന്ധന സ്ഥലം" : "Fishing Spot",
    land: isMalayalam ? "അടുത്തുള്ള തീരം" : "Nearest Land",
    dist: isMalayalam ? "ദൂരം" : "Distance",
    bearing: isMalayalam ? "ദിശ" : "Bearing",
    sos: isMalayalam ? "അടിയന്തര സഹായം" : "EMERGENCY SOS",
    harbour: isMalayalam ? "ബേപ്പൂർ തുറമുഖം" : "Beypore Harbour",
    reef: isMalayalam ? "ചാലിയം റീഫ്" : "Chaliyam Reef",
    depth: isMalayalam ? "ആഴം" : "Depth",
    emergencyNav: isMalayalam ? "അടിയന്തര തിരിച്ചുവരവ് പാത" : "Emergency Return Path",
    offlineWarning: isMalayalam ? "ഓഫ്‌ലൈൻ: അവസാനമായി രേഖപ്പെടുത്തിയ സ്ഥാനം കാണിക്കുന്നു" : "Offline: Showing last live location recorded",
    lastSync: isMalayalam ? "അവസാനം പുതുക്കിയത്: 12 മിനിറ്റ് മുൻപ്" : "Last Sync: 12 mins ago"
  };

  // --- SOS HANDLER ---
  const handleSos = () => {
    setActiveTab('land'); 
    setIsSendingSos(true);
    
    setTimeout(() => {
      if (!isOnline) {
        const smsMsg = `SOS EMERGENCY: KadalSathi Boat at Calicut. Lat: ${coords.lat}, Lng: ${coords.lng}. Needs immediate SAR support.`;
        window.location.href = `sms:1554?body=${encodeURIComponent(smsMsg)}`;
      }
      setTimeout(() => setIsSendingSos(false), 2000);
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-950 flex flex-col font-sans antialiased text-white relative overflow-hidden">
      
      {/* 1. HEADER & DATA TOGGLE */}
      <header className="bg-slate-900 border-b border-white/10 p-4 sticky top-0 z-50 shadow-xl">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg shadow-blue-900/20"><Compass size={20}/></div>
            <h1 className="font-black text-lg tracking-tighter uppercase">{t.name}</h1>
          </div>
          <button 
            onClick={() => setIsOnline(!isOnline)}
            className={`text-[9px] font-black px-3 py-1 rounded-full border transition-all ${isOnline ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'bg-red-500/10 border-red-500 text-red-400'}`}
          >
            {isOnline ? '📡 DATA: ON' : '📵 DATA: OFF'}
          </button>
        </div>

        {/* 2. DUAL TAB NAVIGATION */}
        <div className="flex bg-slate-800 p-1 rounded-2xl border border-white/5">
           <button 
            onClick={() => setActiveTab('spot')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black uppercase transition-all ${activeTab === 'spot' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400'}`}
           >
             <Target size={16} /> {t.spot}
           </button>
           <button 
            onClick={() => setActiveTab('land')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black uppercase transition-all ${activeTab === 'land' ? 'bg-amber-600 text-white shadow-lg' : 'text-slate-400'}`}
           >
             <Anchor size={16} /> {t.land}
           </button>
        </div>

        {/* 3. OFFLINE TOOLKIT BOX (New Feature) */}
        {!isOnline && (
          <div className="mt-3 bg-amber-500/20 border border-amber-500/30 p-2 rounded-xl flex items-center gap-3 animate-in slide-in-from-top duration-300">
             <div className="bg-amber-500 p-1.5 rounded-lg">
                <History size={16} className="text-white" />
             </div>
             <div className="flex-1">
                <p className="text-[10px] font-black text-amber-200 leading-tight">
                  {t.offlineWarning}
                </p>
                <div className="flex items-center gap-1 mt-0.5 opacity-60">
                   <Clock size={10} />
                   <span className="text-[8px] font-bold uppercase">{t.lastSync}</span>
                </div>
             </div>
          </div>
        )}
      </header>

      {/* 4. MAP HUD OVERLAY */}
      <div className="absolute top-48 left-4 right-4 z-40 pointer-events-none">
        <div className={`transition-all duration-500 transform ${activeTab === 'land' ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-4 opacity-0 scale-95 hidden'}`}>
           <div className="bg-amber-600/90 backdrop-blur-xl border border-white/20 p-4 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex justify-between items-center pointer-events-auto">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-xl text-white shadow-inner"><MapPin size={22}/></div>
                <div>
                   <p className="text-[10px] font-black text-white/70 uppercase leading-none mb-1">{t.land}</p>
                   <p className="font-black text-sm uppercase tracking-tight">{t.harbour}</p>
                </div>
              </div>
              <div className="text-right">
                 <p className="text-[10px] font-bold text-white/70 uppercase leading-none mb-1">{t.dist}</p>
                 <p className="text-xl font-black text-white tracking-tighter">14.2 km</p>
              </div>
           </div>
        </div>

        <div className={`transition-all duration-500 transform ${activeTab === 'spot' ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-4 opacity-0 scale-95 hidden'}`}>
           <div className="bg-blue-600/90 backdrop-blur-xl border border-white/20 p-4 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex justify-between items-center pointer-events-auto">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-xl text-white shadow-inner"><Fish size={22}/></div>
                <div>
                   <p className="text-[10px] font-black text-white/70 uppercase leading-none mb-1">{t.spot}</p>
                   <p className="font-black text-sm uppercase tracking-tight">{t.reef}</p>
                </div>
              </div>
              <div className="text-right">
                 <p className="text-[10px] font-bold text-white/70 uppercase leading-none mb-1">{t.dist}</p>
                 <p className="text-xl font-black text-white tracking-tighter">3.8 km</p>
              </div>
           </div>
        </div>
      </div>

      {/* 5. MAP ENGINE */}
      <div className="flex-grow relative bg-[#050a14] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
           <div className="w-[400px] h-[400px] border border-white rounded-full animate-pulse"></div>
           <div className="absolute w-full h-[1px] bg-white"></div>
           <div className="absolute w-[1px] h-full bg-white"></div>
        </div>

        <svg 
          viewBox="0 0 400 600" 
          className="w-full h-full transform transition-all duration-700 ease-out"
          style={{ transform: `scale(${zoom})` }}
        >
          <path d="M 350 0 Q 380 300 350 600 L 400 600 L 400 0 Z" fill="#1e293b" stroke="#334155" strokeWidth="3" />
          {activeTab === 'spot' ? (
            <line x1={boatPos.x} y1={boatPos.y} x2={hotspotPos.x} y2={hotspotPos.y} stroke="#3b82f6" strokeWidth="2" strokeDasharray="8 4" className="animate-pulse" />
          ) : (
            <line x1={boatPos.x} y1={boatPos.y} x2={landPos.x} y2={landPos.y} stroke="#f59e0b" strokeWidth="3" strokeDasharray="8 4" className="animate-pulse" />
          )}
          <g transform={`translate(${landPos.x}, ${landPos.y})`}><circle r="15" fill="rgba(245, 158, 11, 0.2)" className="animate-ping" /><circle r="6" fill="#f59e0b" stroke="white" strokeWidth="1" /></g>
          <g transform={`translate(${hotspotPos.x}, ${hotspotPos.y})`}><circle r="20" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4 4" /><circle r="6" fill="#3b82f6" stroke="white" strokeWidth="1" /></g>
          <g transform={`translate(${boatPos.x}, ${boatPos.y}) rotate(-45)`}><path d="M 0 -18 L 12 12 L 0 6 L -12 12 Z" fill="#10b981" stroke="white" strokeWidth="1.5" /><circle r="35" fill="none" stroke="#10b981" strokeWidth="0.5" opacity="0.3" /></g>
        </svg>

        <div className="absolute right-4 bottom-32 flex flex-col gap-3 z-40">
           <button onClick={() => setZoom(z => Math.min(z + 0.5, 3))} className="w-14 h-14 bg-slate-800/90 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 shadow-2xl active:bg-slate-700"><ZoomIn size={24}/></button>
           <button onClick={() => setZoom(z => Math.max(z - 0.5, 1))} className="w-14 h-14 bg-slate-800/90 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 shadow-2xl active:bg-slate-700"><ZoomOut size={24}/></button>
           <button onClick={() => setIsMalayalam(!isMalayalam)} className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center border border-white/20 shadow-2xl text-xs font-black uppercase">{isMalayalam ? 'EN' : 'മല'}</button>
        </div>
      </div>

      {/* 6. TELEMETRY BAR */}
      <footer className="bg-slate-900 border-t border-white/10 p-4 grid grid-cols-3 gap-2">
         <div className="text-center bg-white/5 py-3 rounded-2xl border border-white/5">
            <p className="text-[8px] font-black text-slate-500 uppercase leading-none mb-1">{t.depth}</p>
            <p className="text-sm font-black text-blue-400">18.5 m</p>
         </div>
         <div className="text-center bg-white/5 py-3 rounded-2xl border border-white/5">
            <p className="text-[8px] font-black text-slate-500 uppercase leading-none mb-1">{t.bearing}</p>
            <p className="text-sm font-black text-emerald-400">045° NE</p>
         </div>
         <div className="text-center bg-white/5 py-3 rounded-2xl border border-emerald-500/20">
            <p className="text-[8px] font-black text-slate-500 uppercase leading-none mb-1">Status</p>
            <p className="text-[10px] font-black text-emerald-500 uppercase animate-pulse">{isOnline ? 'Live' : 'Cached'}</p>
         </div>
      </footer>

      {/* 7. SOS TRIGGER */}
      <div className="p-4 bg-slate-900 pb-8 z-50">
        <button 
          onClick={handleSos}
          className="w-full bg-red-600 h-16 rounded-[2rem] shadow-[0_10px_40px_rgba(220,38,38,0.4)] flex items-center justify-center gap-4 active:scale-95 transition-all border-b-4 border-red-800 hover:bg-red-500"
        >
          <PhoneCall size={32} fill="white" />
          <span className="text-2xl font-black uppercase tracking-tighter">{t.sos}</span>
        </button>
      </div>

      {/* 8. SOS OVERLAY */}
      {isSendingSos && (
        <div className="fixed inset-0 bg-slate-950/95 z-[100] flex flex-col items-center justify-center text-white p-8 text-center animate-in fade-in duration-300">
          <Loader2 className="animate-spin mb-8 text-blue-500" size={64} />
          {isOnline ? (
            <div className="flex flex-col items-center">
              <Wifi size={80} className="text-emerald-400 mb-6 drop-shadow-[0_0_20px_rgba(52,211,153,0.3)]" />
              <p className="text-2xl font-black tracking-tight uppercase">Transmitting Coordinates</p>
              <p className="text-slate-500 mt-2 font-mono text-sm tracking-widest uppercase">{coords.lat}N, {coords.lng}E</p>
            </div>
          ) : (
            <div className="flex flex-col items-center animate-bounce">
              <MessageSquare size={80} className="text-amber-500 mb-6 drop-shadow-[0_0_20px_rgba(245,158,11,0.3)]" />
              <p className="text-2xl font-black uppercase italic">No Data: Preparing Rescue SMS</p>
              <p className="text-amber-200 mt-2 text-sm font-bold uppercase tracking-widest">Automatic Failover: Coast Guard (1554)</p>
            </div>
          )}

          <div className="mt-12 w-full bg-amber-600 rounded-3xl p-6 shadow-2xl border border-white/20 animate-in slide-in-from-bottom-4 duration-500">
             <div className="flex items-center gap-3 mb-4 border-b border-white/20 pb-3">
                <AlertCircle className="text-white" size={24} />
                <h4 className="text-lg font-black uppercase tracking-tight">{t.emergencyNav}</h4>
             </div>
             <div className="flex justify-between items-center">
                <div className="text-left">
                   <p className="text-[10px] font-black text-white/60 uppercase">{t.land}</p>
                   <p className="font-black text-xl">{t.harbour}</p>
                </div>
                <div className="text-right">
                   <p className="text-[10px] font-black text-white/60 uppercase">Dist / Bearing</p>
                   <p className="font-black text-2xl tracking-tighter">14.2 km / 092°</p>
                </div>
             </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default App;