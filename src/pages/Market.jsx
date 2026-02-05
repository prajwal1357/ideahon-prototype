import React, { useState, useMemo } from 'react';
import { 
  ShoppingBasket, PlusCircle, History, Tag, Ship, 
  ChevronRight, Handshake, Users, Trash2, Fish, 
  Scale, Clock, CheckCircle2, AlertCircle, ArrowLeft, Info,
  Search, Phone, Filter, TrendingUp, Sparkles, X
} from 'lucide-react';

/**
 * KADALSATHI MARKETPLACE - PRODUCTION VERSION
 * Features: Catch Posting, Dynamic Pricing, Search, Live Buy Requests, Freshness Tracking.
 */

const App = () => {
  // --- STATE ---
  const [isMalayalam, setIsMalayalam] = useState(false);
  const [marketTab, setMarketTab] = useState('sell'); // 'sell' or 'browse'
  const [searchQuery, setSearchQuery] = useState("");
  
  // Simulation Data: Live Market
  const [marketListings, setMarketListings] = useState([
    { id: 1, fish: "King Fish (Neymeen)", weight: "15", time: new Date(Date.now() - 3600000), seller: "Boat: Sagar", price: "450", unit: "kg" },
    { id: 2, fish: "Sardines (Mathi)", weight: "60", time: new Date(Date.now() - 7200000), seller: "Boat: Meena", price: "120", unit: "kg" },
    { id: 3, fish: "Prawns (Chemmeen)", weight: "8", time: new Date(), seller: "Boat: BlueWave", price: "550", unit: "kg" }
  ]);

  // Simulation Data: Special Orders (Public Requests)
  const [publicOrders, setPublicOrders] = useState([
    { id: 101, client: "Beach Resort Calicut", item: "Mackerel (Ayala)", qty: "10kg", status: "Open", urgent: true },
    { id: 102, client: "Central Fish Market", item: "Tuna (Choora)", qty: "120kg", status: "Open", urgent: false }
  ]);

  // Form State
  const [fishName, setFishName] = useState("");
  const [weight, setWeight] = useState("");
  const [price, setPrice] = useState("");

  // --- LOGIC ---
  const handlePostCatch = (e) => {
    e.preventDefault();
    if (!fishName || !weight || !price) return;

    const newListing = {
      id: Date.now(),
      fish: fishName,
      weight: weight,
      time: new Date(),
      seller: "My Boat (KDL-88)",
      price: price,
      unit: "kg"
    };

    setMarketListings([newListing, ...marketListings]);
    setFishName("");
    setWeight("");
    setPrice("");
    setMarketTab('browse'); 
  };

  const claimOrder = (id) => {
    setPublicOrders(publicOrders.map(order => 
      order.id === id ? { ...order, status: "Claimed" } : order
    ));
  };

  const filteredListings = useMemo(() => {
    return marketListings.filter(item => 
      item.fish.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [marketListings, searchQuery]);

  const totalMarketWeight = useMemo(() => {
    return marketListings.reduce((acc, curr) => acc + parseFloat(curr.weight), 0);
  }, [marketListings]);

  const getFreshnessTag = (time) => {
    const mins = Math.floor((new Date() - new Date(time)) / 60000);
    if (mins < 30) return { label: "Just Caught", color: "bg-emerald-500" };
    if (mins < 120) return { label: "Fresh", color: "bg-blue-500" };
    return { label: "Logged Today", color: "bg-slate-400" };
  };

  const t = {
    title: isMalayalam ? "കടൽസാഥി ചന്ത" : "KadalSathi Market",
    sell: isMalayalam ? "മത്സ്യം വിൽക്കുക" : "Sell My Catch",
    browse: isMalayalam ? "വിപണി കാണുക" : "Live Market",
    fishLabel: isMalayalam ? "മത്സ്യത്തിന്റെ പേര്" : "Fish Species",
    weightLabel: isMalayalam ? "അളവ് (kg)" : "Weight (kg)",
    priceLabel: isMalayalam ? "വില (₹/kg)" : "Price (₹/kg)",
    submit: isMalayalam ? "ചന്തയിൽ ചേർക്കുക" : "Post to Market",
    specialTitle: isMalayalam ? "പ്രത്യേക ഓർഡറുകൾ" : "Public Buy Requests",
    specialSub: isMalayalam ? "ആർക്കും ഈ ഓർഡറുകൾ എടുക്കാം" : "Available for any boat to claim",
    claim: isMalayalam ? "ഏറ്റെടുക്കുക" : "Claim Order",
    claimed: isMalayalam ? "ഏറ്റെടുത്തു" : "Claimed",
    searchPlaceholder: isMalayalam ? "മത്സ്യം തിരയുക..." : "Search species...",
    contact: isMalayalam ? "വിളിക്കുക" : "Contact"
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 flex flex-col font-sans antialiased border-x border-slate-200 shadow-2xl relative pb-8">
      
      {/* HEADER */}
      <header className="bg-white p-5 flex justify-between items-center border-b sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-200">
            <ShoppingBasket size={24} />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 leading-none">{t.title}</h1>
            <div className="flex items-center gap-1 mt-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Live: Kozhikode Harbour</p>
            </div>
          </div>
        </div>
        <button 
          onClick={() => setIsMalayalam(!isMalayalam)}
          className="bg-slate-100 border-2 border-slate-900 text-slate-900 px-3 py-1.5 rounded-lg font-black text-[10px] uppercase"
        >
          {isMalayalam ? "EN" : "മലയാളം"}
        </button>
      </header>

      {/* DASHBOARD STATS (New Feature) */}
      <div className="px-4 py-3 bg-white border-b flex gap-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-xl shrink-0">
          <TrendingUp size={14} className="text-blue-600" />
          <span className="text-[10px] font-black text-blue-900 uppercase">{totalMarketWeight}kg Market Total</span>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 px-3 py-2 rounded-xl shrink-0">
          <Sparkles size={14} className="text-emerald-600" />
          <span className="text-[10px] font-black text-emerald-900 uppercase">3 Urgent Orders</span>
        </div>
      </div>

      {/* TABS */}
      <div className="flex px-4 pt-4 gap-2">
        <button 
          onClick={() => setMarketTab('sell')}
          className={`flex-1 py-4 rounded-2xl font-black text-xs uppercase tracking-wider transition-all border-b-4 ${marketTab === 'sell' ? 'bg-blue-600 text-white border-blue-800 shadow-lg' : 'bg-white text-slate-400 border-slate-200'}`}
        >
          {t.sell}
        </button>
        <button 
          onClick={() => setMarketTab('browse')}
          className={`flex-1 py-4 rounded-2xl font-black text-xs uppercase tracking-wider transition-all border-b-4 ${marketTab === 'browse' ? 'bg-blue-600 text-white border-blue-800 shadow-lg' : 'bg-white text-slate-400 border-slate-200'}`}
        >
          {t.browse}
        </button>
      </div>

      {/* CONTENT */}
      <main className="p-4 flex-grow space-y-6">
        
        {marketTab === 'sell' ? (
          <div className="animate-in fade-in slide-in-from-bottom duration-500">
            <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-xl"><PlusCircle size={24}/></div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">{t.sell}</h2>
              </div>

              <form onSubmit={handlePostCatch} className="space-y-5">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">{t.fishLabel}</label>
                  <input 
                    type="text"
                    value={fishName}
                    onChange={(e) => setFishName(e.target.value)}
                    placeholder="e.g. Seer Fish / Neymeen"
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-bold focus:border-blue-500 outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">{t.weightLabel}</label>
                    <input 
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="0.00"
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-bold focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">{t.priceLabel}</label>
                    <input 
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="₹0"
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-bold focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-5 bg-blue-600 text-white rounded-[1.5rem] font-black uppercase text-base shadow-xl shadow-blue-100 active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  <Sparkles size={20} />
                  {t.submit}
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom duration-500">
            
            {/* SEARCH BAR (New Feature) */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 font-bold shadow-sm focus:border-blue-500 outline-none"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <X size={18} />
                </button>
              )}
            </div>

            {/* LIVE LISTINGS */}
            <div className="space-y-3">
              <div className="flex justify-between items-center px-2">
                <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div> Live Listings
                </h3>
              </div>

              {filteredListings.length === 0 ? (
                <div className="text-center py-10 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                  <Fish size={48} className="mx-auto text-slate-200 mb-2" />
                  <p className="text-slate-400 font-bold uppercase text-[10px]">No species found</p>
                </div>
              ) : (
                filteredListings.map(item => {
                  const freshness = getFreshnessTag(item.time);
                  return (
                    <div key={item.id} className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-4 group active:bg-slate-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="bg-slate-100 p-3 rounded-2xl text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-600 transition-all">
                            <Ship size={24} />
                          </div>
                          <div>
                            <h4 className="font-black text-slate-900 leading-tight">{item.fish}</h4>
                            <p className="text-[10px] font-bold text-slate-400 mt-0.5 uppercase tracking-tighter">{item.seller}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`text-[8px] font-black text-white px-2 py-0.5 rounded-full uppercase ${freshness.color}`}>
                            {freshness.label}
                          </span>
                          <p className="text-lg font-black text-blue-600 mt-1">₹{item.price}<span className="text-[10px] text-slate-400">/{item.unit}</span></p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between border-t pt-3">
                        <div className="flex items-center gap-2">
                           <Scale size={14} className="text-slate-400" />
                           <span className="text-xs font-black text-slate-700">{item.weight} kg available</span>
                        </div>
                        <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase active:scale-95 transition-all">
                          <Phone size={12} fill="white" />
                          {t.contact}
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* THE "SPECIAL SPACE": PUBLIC ORDERS */}
            <div className="bg-slate-900 rounded-[2.5rem] p-6 shadow-2xl text-white relative overflow-hidden">
              <Handshake className="absolute -right-6 -top-6 w-36 h-36 opacity-10 rotate-12" />
              
              <div className="relative z-10 mb-5">
                <div className="flex items-center gap-2 mb-1">
                  <Users size={18} className="text-blue-400" />
                  <h3 className="text-xl font-black uppercase tracking-tight italic">{t.ordersTitle}</h3>
                </div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t.specialSub}</p>
              </div>

              <div className="space-y-3 relative z-10">
                {publicOrders.map(order => (
                  <div key={order.id} className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between border border-white/10 hover:bg-white/15 transition-all">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-500/20 p-2 rounded-lg text-blue-400 mt-0.5">
                        <Tag size={16} />
                      </div>
                      <div>
                        <p className="font-black text-sm flex items-center gap-2">
                          {order.item} 
                          {order.urgent && <span className="bg-red-500 text-[8px] px-1.5 py-0.5 rounded text-white animate-pulse">URGENT</span>}
                        </p>
                        <p className="text-[10px] font-bold text-blue-400 uppercase tracking-wide">{order.qty} • {order.client}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => claimOrder(order.id)}
                      disabled={order.status === 'Claimed'}
                      className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all shadow-lg ${order.status === 'Claimed' ? 'bg-emerald-500 text-white cursor-default' : 'bg-white text-slate-900 active:scale-95'}`}
                    >
                      {order.status === 'Claimed' ? (
                        <span className="flex items-center gap-1"><CheckCircle2 size={12}/> {t.claimed}</span>
                      ) : t.claim}
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </main>

      
    </div>
  );
};

export default App;