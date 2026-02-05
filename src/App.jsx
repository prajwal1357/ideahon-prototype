import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, CheckCircle2, XCircle, MapPin, 
  Clock, Bell, PhoneCall, Waves, Wind, 
  Navigation, Thermometer, Droplets, Info, Loader2, Wifi, WifiOff, MessageSquare
} from 'lucide-react';

const KadalSathi = () => {
  // --- STATE MANAGEMENT ---
  const [isMalayalam, setIsMalayalam] = useState(false);
  const [status, setStatus] = useState('safe'); 
  const [isOnlineManual, setIsOnlineManual] = useState(true); // MANUAL TOGGLE FOR DEMO
  const [isSendingSos, setIsSendingSos] = useState(false);
  const [coords, setCoords] = useState({ lat: "9.9312", lng: "76.2673" });

  const content = {
    en: {
      name: "KadalSathi",
      sos: "EMERGENCY SOS",
      onlineMode: "Satellite Link Active",
      offlineMode: "SMS Mode (No Internet)",
      onlineDesc: "Sending live GPS tracking to rescue server.",
      offlineDesc: "Sending coordinates via Emergency SMS.",
      location: "Current Location",
      safe: "SAFE FOR FISHING",
      danger: "STAY ASHORE",
      updated: "Last Update",
      tides: "Tide Times",
      alerts: "Alerts",
      contact: "Coastal Police"
    },
    ml: {
      name: "കടൽസാഥി",
      sos: "അടിയന്തര സഹായം",
      onlineMode: "സാറ്റലൈറ്റ് ലിങ്ക് ലഭ്യമാണ്",
      offlineMode: "SMS മോഡ് (ഇന്റർനെറ്റ് ഇല്ല)",
      onlineDesc: "ലൈവ് ലൊക്കേഷൻ സെർവറിലേക്ക് അയക്കുന്നു.",
      offlineDesc: "ലൊക്കേഷൻ SMS വഴി അയക്കുന്നു.",
      location: "നിങ്ങളുടെ സ്ഥാനം",
      safe: "കടലിൽ പോകാൻ അനുയോജ്യം",
      danger: "കടലിൽ പോകരുത്",
      updated: "അവസാനം പുതുക്കിയത്",
      tides: "വേലിയേറ്റം/ഇറക്കം",
      alerts: "അറിയിപ്പുകൾ",
      contact: "കോസ്റ്റൽ പോലീസ്"
    }
  };

  const t = isMalayalam ? content.ml : content.en;

  // --- SOS LOGIC ---
  const handleSos = () => {
    setIsSendingSos(true);
    setTimeout(() => {
      if (isOnlineManual) {
        console.log("API CALL: Sending JSON to rescue.kerala.gov.in");
      } else {
        const smsMsg = `EMERGENCY! Boat KadalSathi needs rescue at Lat: ${coords.lat}, Lng: ${coords.lng}. View: https://maps.google.com/?q=${coords.lat},${coords.lng}`;
        window.location.href = `sms:1554?body=${encodeURIComponent(smsMsg)}`;
      }
      setIsSendingSos(false);
    }, 2000);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 flex flex-col font-sans antialiased pb-8 border-x border-slate-200">
      
      {/* 1. DEMO CONTROL PANEL (Manual Toggles) */}
      <div className="bg-slate-900 p-2 flex flex-col gap-2">
        <div className="flex justify-between items-center px-2">
          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Demo Controls</span>
          <span className="text-[9px] text-slate-500 font-bold tracking-widest uppercase">Last Sync: 12:40 PM</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {/* Network Toggle */}
          <button 
            onClick={() => setIsOnlineManual(!isOnlineManual)}
            className={`flex items-center justify-center gap-2 py-1.5 rounded-lg text-[10px] font-black transition-all ${isOnlineManual ? 'bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/50' : 'bg-red-500/20 text-red-400 ring-1 ring-red-500/50'}`}
          >
            {isOnlineManual ? <><Wifi size={12}/> ONLINE</> : <><WifiOff size={12}/> OFFLINE (SMS)</>}
          </button>
          {/* Safety Toggle */}
          <button 
            onClick={() => setStatus(status === 'safe' ? 'danger' : 'safe')}
            className={`flex items-center justify-center gap-2 py-1.5 rounded-lg text-[10px] font-black transition-all ${status === 'safe' ? 'bg-blue-500/20 text-blue-300 ring-1 ring-blue-500/50' : 'bg-orange-500/20 text-orange-300 ring-1 ring-orange-500/50'}`}
          >
            {status === 'safe' ? 'SWITCH TO DANGER' : 'SWITCH TO SAFE'}
          </button>
        </div>
      </div>

      {/* 2. HEADER */}
      <header className="bg-white p-4 flex justify-between items-center border-b sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="bg-blue-700 p-2 rounded-xl"><Navigation size={24} color="white" fill="white" /></div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tighter">{t.name}</h1>
        </div>
        <button onClick={() => setIsMalayalam(!isMalayalam)} className="bg-slate-900 text-white px-3 py-1.5 rounded-lg font-black text-xs">
          {isMalayalam ? "EN" : "മലയാളം"}
        </button>
      </header>

      {/* 3. HERO STATUS */}
      <section className={`m-4 rounded-[2.5rem] p-8 shadow-2xl flex flex-col items-center text-white transition-all duration-700 ${status === 'safe' ? 'bg-emerald-600' : 'bg-red-600'}`}>
        <div className="bg-white/20 p-4 rounded-full backdrop-blur-md mb-4 animate-pulse">
          {status === 'safe' ? <CheckCircle2 size={64} /> : <XCircle size={64} />}
        </div>
        <h2 className={`font-black text-center leading-tight ${isMalayalam ? 'text-4xl' : 'text-2xl'}`}>
          {status === 'safe' ? t.safe : t.danger}
        </h2>
      </section>

      {/* 4. SOS PAYLOAD PREVIEW (Dynamic Card) */}
      <div className="px-4 mb-4">
        <div className={`rounded-2xl p-4 border-2 flex items-center gap-4 ${isOnlineManual ? 'bg-emerald-50 border-emerald-100' : 'bg-amber-50 border-amber-100'}`}>
          <div className={`p-3 rounded-full ${isOnlineManual ? 'bg-emerald-500' : 'bg-amber-500'} text-white`}>
            {isOnlineManual ? <Wifi size={20} /> : <MessageSquare size={20} />}
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-black text-slate-800 uppercase">{isOnlineManual ? t.onlineMode : t.offlineMode}</h4>
            <p className="text-[11px] text-slate-500 font-medium leading-tight">{isOnlineManual ? t.onlineDesc : t.offlineDesc}</p>
          </div>
        </div>
      </div>

      {/* 5. METRICS & CONTENT */}
      <main className="px-4 space-y-4 flex-grow">
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          <MetricTile icon={<Wind size={16}/>} label="Wind" value="14 km/h" />
          <MetricTile icon={<Waves size={16}/>} label="Wave" value="1.5 m" />
          <MetricTile icon={<Thermometer size={16}/>} label="Temp" value="30°C" />
        </div>

        {/* Tide Tracker */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
          <h3 className="text-[10px] font-black text-slate-400 uppercase mb-3 flex items-center gap-2">
            <Clock size={14}/> {t.tides}
          </h3>
          <div className="flex justify-between text-center">
            <div><p className="text-[10px] font-bold text-blue-500 uppercase">High</p><p className="text-lg font-black italic">12:30 PM</p></div>
            <div className="w-[1px] bg-slate-100"></div>
            <div><p className="text-[10px] font-bold text-slate-400 uppercase">Low</p><p className="text-lg font-black italic">06:45 PM</p></div>
          </div>
        </div>
      </main>

      {/* 6. SOS OVERLAY */}
      {isSendingSos && (
        <div className="fixed inset-0 bg-slate-900/95 z-50 flex flex-col items-center justify-center text-white p-6 text-center">
          <Loader2 className="animate-spin mb-6" size={64} />
          {isOnlineManual ? (
            <div className="animate-pulse">
              <Wifi size={80} className="text-emerald-400 mx-auto mb-4" />
              <p className="text-2xl font-black uppercase tracking-tight">Broadcasting Live Coordinates</p>
            </div>
          ) : (
            <div className="animate-bounce">
              <MessageSquare size={80} className="text-amber-500 mx-auto mb-4" />
              <p className="text-2xl font-black uppercase tracking-tight">Generating Rescue SMS</p>
              <p className="text-slate-400 mt-2 text-sm uppercase">Automatic failover triggered</p>
            </div>
          )}
        </div>
      )}

      {/* 7. ACTION FOOTER */}
      <footer className="mt-auto px-4 space-y-3 pt-4 bg-white border-t border-slate-100 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 py-4 bg-white border-2 border-slate-900 rounded-2xl font-black text-slate-900 active:bg-slate-50">
            <Bell size={20} /> {t.alerts}
          </button>
          <button className="flex items-center justify-center gap-2 py-4 bg-white border-2 border-slate-900 rounded-2xl font-black text-slate-900 active:bg-slate-50">
            <Info size={20} /> {t.contact}
          </button>
        </div>
        <button 
          onClick={handleSos}
          className="w-full flex flex-col items-center justify-center gap-0.5 py-5 bg-red-600 rounded-[2rem] font-black text-white shadow-xl shadow-red-200 active:bg-red-900 transition-all hover:scale-[1.02]"
        >
          <div className="flex items-center gap-3">
            <PhoneCall size={28} fill="white" />
            <span className="text-2xl uppercase tracking-tighter">{t.sos}</span>
          </div>
          <span className="text-[9px] font-bold opacity-70 uppercase tracking-widest italic">
            {isOnlineManual ? "via Satellite Link" : "via Emergency SMS"}
          </span>
        </button>
      </footer>
    </div>
  );
};

const MetricTile = ({ icon, label, value }) => (
  <div className="bg-white min-w-[100px] p-3 rounded-xl border border-slate-100 shadow-sm flex flex-col items-center">
    <div className="text-blue-600 mb-1">{icon}</div>
    <span className="text-[10px] text-slate-400 font-bold uppercase">{label}</span>
    <span className="font-black text-slate-800">{value}</span>
  </div>
);

export default KadalSathi;