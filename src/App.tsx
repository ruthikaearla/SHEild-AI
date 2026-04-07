import React, { useState } from 'react';
import { Shield, Share2, MapPin, AlertTriangle, User, Bell, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

// --- MOBILE-FIRST STYLES ---
const App = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-slate-50 pb-20 md:pb-0 md:pl-64 flex flex-col">
      
      {/* SIDEBAR (Desktop) / TOP NAV (Mobile) */}
      <header className="fixed top-0 left-0 w-full md:w-64 h-16 md:h-full bg-white border-b md:border-r border-slate-200 z-50 p-4">
        <div className="flex items-center gap-2 mb-8">
          <Shield className="text-indigo-600 w-8 h-8" />
          <h1 className="font-bold text-xl tracking-tight text-slate-800">SHEild AI</h1>
        </div>
        
        <nav className="hidden md:flex flex-col gap-4">
          <button onClick={() => setActiveTab('home')} className={`flex items-center gap-3 p-3 rounded-xl transition ${activeTab === 'home' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-100'}`}>
            <Shield size={20} /> Dashboard
          </button>
          <button onClick={() => setActiveTab('social')} className={`flex items-center gap-3 p-3 rounded-xl transition ${activeTab === 'social' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-100'}`}>
            <Share2 size={20} /> Social Analysis
          </button>
          <button className="flex items-center gap-3 p-3 rounded-xl text-slate-500 hover:bg-slate-100">
            <MapPin size={20} /> Live Map
          </button>
        </nav>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-4 md:p-8 mt-16 md:mt-0 max-w-5xl mx-auto w-full">
        
        {/* WELCOME SECTION */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Safety Overview</h2>
          <p className="text-slate-500">AI-powered risk detection active.</p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* RISK ANALYSIS CARD */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col gap-4"
          >
            <div className="flex justify-between items-start">
              <span className="p-3 bg-red-50 text-red-600 rounded-2xl">
                <AlertTriangle size={24} />
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase">Safe Area</span>
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-800">Local Risk Level</h3>
              <p className="text-slate-500 text-sm">Based on real-time data and your social footprint.</p>
            </div>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
              <div className="bg-indigo-600 h-full w-[15%] transition-all duration-1000"></div>
            </div>
          </motion.div>

          {/* SOCIAL MEDIA INTEGRATION CARD */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-indigo-600 p-6 rounded-3xl shadow-lg text-white flex flex-col gap-4"
          >
            <div className="flex justify-between items-start">
              <span className="p-3 bg-white/20 rounded-2xl">
                <Share2 size={24} />
              </span>
            </div>
            <div>
              <h3 className="font-bold text-lg">Social Footprint Sync</h3>
              <p className="text-indigo-100 text-sm">Connect accounts to enable AI risk prediction.</p>
            </div>
            <button className="mt-2 w-full py-3 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition active:scale-95">
              Connect Instagram / X
            </button>
          </motion.div>

        </div>
      </main>

      {/* MOBILE BOTTOM NAVIGATION */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full h-18 bg-white border-t border-slate-200 px-6 py-3 flex justify-between items-center z-50">
        <button onClick={() => setActiveTab('home')} className={`p-2 ${activeTab === 'home' ? 'text-indigo-600' : 'text-slate-400'}`}>
          <Shield size={24} />
        </button>
        <button onClick={() => setActiveTab('map')} className={`p-2 ${activeTab === 'map' ? 'text-indigo-600' : 'text-slate-400'}`}>
          <MapPin size={24} />
        </button>
        <button onClick={() => setActiveTab('social')} className={`p-2 ${activeTab === 'social' ? 'text-indigo-600' : 'text-slate-400'}`}>
          <Share2 size={24} />
        </button>
        <button className="p-2 text-slate-400">
          <Settings size={24} />
        </button>
      </nav>

    </div>
  );
};

export default App;