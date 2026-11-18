import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BottomNavigation } from './BottomNavigation';
import { 
  Wifi, 
  WifiOff, 
  BatteryMedium, 
  UserCheck, 
  Smartphone, 
  Monitor, 
  Plus, 
  ShieldCheck, 
  Sparkles,
  RefreshCw,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';

interface MobileShellProps {
  children: React.ReactNode;
}

export const MobileShell: React.FC<MobileShellProps> = ({ children }) => {
  const { 
    persona, 
    setPersona, 
    language, 
    setLanguage, 
    isOnline, 
    toggleOnline, 
    pendingSyncCount,
    syncOfflineQueue,
    setNewJobModalOpen,
    setPassportModalOpen
  } = useApp();

  const [isDeviceFrame, setIsDeviceFrame] = useState(true);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#06080F] text-slate-100 flex flex-col items-center justify-start pb-8">
      {/* Top Universal Control Bar (Desktop Helper) */}
      <header className="w-full bg-[#0D121F]/90 border-b border-amber-500/20 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs z-50 sticky top-0 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-600 to-yellow-300 p-0.5 flex items-center justify-center shadow-md shadow-amber-500/20">
            <span className="text-black font-extrabold text-xs">SS</span>
          </div>
          <div>
            <h1 className="font-bold text-sm tracking-wide bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
              SonaSetu <span className="text-amber-500 font-normal text-xs">(सोनासेतु)</span>
            </h1>
            <p className="text-[10px] text-slate-400">Agentic Gold Job-Work & Trust Ledger</p>
          </div>
        </div>

        {/* Persona Switcher Pill */}
        <div className="flex items-center gap-2 bg-[#141C2E] p-1 rounded-full border border-slate-700/60">
          <button
            onClick={() => setPersona('jeweller')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all text-xs ${
              persona === 'jeweller'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm shadow-amber-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>👑 Jeweller Mode</span>
            <span className="text-[9px] opacity-75 hidden sm:inline">(Rajesh Zaveri)</span>
          </button>
          <button
            onClick={() => setPersona('karigar')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all text-xs ${
              persona === 'karigar'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm shadow-amber-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>🔨 Karigar Mode</span>
            <span className="text-[9px] opacity-75 hidden sm:inline">(Ramesh Soni)</span>
          </button>
        </div>

        {/* Right Tools: Connectivity, Language, Device Toggle */}
        <div className="flex items-center gap-2">
          {/* Offline/Online Toggle Simulator */}
          <button
            onClick={toggleOnline}
            title="Click to toggle network connectivity simulation"
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all ${
              isOnline
                ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400'
                : 'bg-rose-950/50 border-rose-500/40 text-rose-300 animate-pulse'
            }`}
          >
            {isOnline ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
            <span className="font-mono text-[11px]">{isOnline ? 'Online' : 'Offline'}</span>
            {pendingSyncCount > 0 && (
              <span className="bg-amber-500 text-black text-[10px] font-bold px-1.5 rounded-full ml-1">
                {pendingSyncCount}
              </span>
            )}
          </button>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1 bg-[#141C2E] border border-slate-700/60 px-2 py-1 rounded-lg text-slate-300 hover:text-white"
            >
              <span>{language === 'English' ? '🇬🇧 EN' : language === 'Gujarati' ? '🇮🇳 ગુજ' : '🇮🇳 हिं'}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
            {langDropdownOpen && (
              <div className="absolute right-0 mt-1 w-28 bg-[#141C2E] border border-amber-500/30 rounded-lg shadow-xl py-1 z-50">
                {(['English', 'Gujarati', 'Hindi'] as const).map(l => (
                  <button
                    key={l}
                    onClick={() => {
                      setLanguage(l);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs hover:bg-amber-500/10 ${
                      language === l ? 'text-amber-400 font-bold' : 'text-slate-300'
                    }`}
                  >
                    {l === 'English' ? 'English' : l === 'Gujarati' ? 'ગુજરાતી' : 'हिन्दी'}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Device Mockup Toggle */}
          <button
            onClick={() => setIsDeviceFrame(!isDeviceFrame)}
            title={isDeviceFrame ? 'Switch to responsive view' : 'Switch to mobile phone frame'}
            className="p-1.5 bg-[#141C2E] border border-slate-700/60 rounded-lg text-slate-400 hover:text-amber-300"
          >
            {isDeviceFrame ? <Monitor className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="w-full flex-1 flex justify-center py-2 sm:py-4 px-2 sm:px-4">
        <div
          className={`w-full transition-all duration-300 relative ${
            isDeviceFrame
              ? 'max-w-[420px] bg-[#0A0E17] rounded-[44px] border-[6px] border-slate-800 shadow-[0_0_50px_rgba(212,175,55,0.15)] overflow-hidden flex flex-col min-h-[860px]'
              : 'max-w-4xl bg-[#0A0E17] rounded-2xl border border-slate-800 shadow-2xl p-4'
          }`}
        >
          {/* Mobile Device Status Bar & Dynamic Island */}
          {isDeviceFrame && (
            <div className="sticky top-0 bg-[#0A0E17]/95 backdrop-blur-md z-30 pt-3 px-6 pb-2 border-b border-slate-800/40">
              <div className="flex items-center justify-between text-[11px] font-medium text-slate-300 tracking-tight">
                <span>09:41</span>
                {/* Dynamic Island */}
                <div className="w-24 h-5 bg-black rounded-full flex items-center justify-center px-2 gap-1.5 border border-slate-800/80 shadow-inner">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[9px] text-amber-300 font-mono">SonaSetu</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <span className="text-[10px] font-mono">5G</span>
                  <Wifi className="w-3 h-3 text-slate-300" />
                  <BatteryMedium className="w-3.5 h-3.5 text-amber-400" />
                </div>
              </div>

              {/* Persona Quick Indicator Bar */}
              <div className="mt-2.5 flex items-center justify-between bg-gradient-to-r from-[#121A2B] to-[#172238] border border-amber-500/20 px-3 py-1.5 rounded-xl">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${persona === 'jeweller' ? 'bg-amber-400' : 'bg-emerald-400'}`}></div>
                  <span className="text-xs font-semibold text-slate-200">
                    {persona === 'jeweller' ? 'Rajesh Zaveri' : 'Ramesh B. Soni'}
                  </span>
                  <span className="text-[10px] text-amber-400/90 font-mono bg-amber-400/10 px-1.5 py-0.5 rounded">
                    {persona === 'jeweller' ? 'Jeweller' : 'Master Karigar'}
                  </span>
                </div>
                {persona === 'karigar' ? (
                  <button 
                    onClick={() => setPassportModalOpen(true)}
                    className="flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 font-medium"
                  >
                    <ShieldCheck className="w-3 h-3" />
                    <span>Trust 98/100</span>
                  </button>
                ) : (
                  <button 
                    onClick={() => setNewJobModalOpen(true)}
                    className="flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 font-medium"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>New Job</span>
                  </button>
                )}
              </div>

              {/* Offline Warning Banner if Offline */}
              {!isOnline && (
                <div className="mt-2 bg-amber-950/80 border border-amber-500/40 text-amber-200 text-[11px] px-3 py-1.5 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <WifiOff className="w-3.5 h-3.5 text-amber-400" />
                    <span>Offline Mode Enabled. Changes cached locally.</span>
                  </div>
                  {pendingSyncCount > 0 && (
                    <button
                      onClick={syncOfflineQueue}
                      className="bg-amber-500 text-black font-bold px-2 py-0.5 rounded text-[10px] flex items-center gap-1"
                    >
                      <RefreshCw className="w-2.5 h-2.5" />
                      <span>Sync ({pendingSyncCount})</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Child Viewport Content */}
          <div className="flex-1 pb-24 overflow-y-auto px-4 pt-3">
            {children}
          </div>

          {/* Bottom Bar Navigation */}
          <BottomNavigation />
        </div>
      </main>
    </div>
  );
};
