import React from 'react';
import { useApp } from '../../context/AppContext';
import { Briefcase, Scale, Mic, CreditCard, Award, Flame, LucideIcon } from 'lucide-react';

interface NavItem {
  id: 'jobs' | 'reconciliation' | 'voice_agent' | 'settlement' | 'passport' | 'scrap';
  label: string;
  icon: LucideIcon;
  highlight?: boolean;
}

export const BottomNavigation: React.FC = () => {
  const { activeTab, setActiveTab, persona } = useApp();

  const navItems: NavItem[] = [
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: 'reconciliation', label: 'Recon', icon: Scale },
    { id: 'voice_agent', label: 'AI Agent', icon: Mic, highlight: true },
    { id: 'settlement', label: 'Settlement', icon: CreditCard },
    { id: 'passport', label: persona === 'karigar' ? 'Passport' : 'Artisans', icon: Award },
    { id: 'scrap', label: 'Scrap', icon: Flame },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0B0F19]/95 backdrop-blur-xl border-t border-amber-500/20 px-2 py-2 max-w-md mx-auto">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200 relative ${
                isActive
                  ? 'text-amber-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {item.highlight && !isActive && (
                <span className="absolute -top-1 right-2 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
              )}
              
              <div
                className={`p-1.5 rounded-lg transition-all ${
                  isActive
                    ? 'bg-amber-500/20 text-amber-300 ring-1 ring-amber-500/40 shadow-sm shadow-amber-500/20 scale-105'
                    : 'text-slate-400'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] mt-1 tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
