import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { MobileShell } from './components/layout/MobileShell';
import { JobCardList } from './components/jobs/JobCardList';
import { JobDetailView } from './components/jobs/JobDetailView';
import { NewJobModal } from './components/jobs/NewJobModal';
import { ScaleCameraScannerModal } from './components/ai/ScaleCameraScannerModal';
import { VoiceAgentStudio } from './components/ai/VoiceAgentStudio';
import { DeadlineRiskRadar } from './components/ai/DeadlineRiskRadar';
import { ReconciliationStudio } from './components/reconciliation/ReconciliationStudio';
import { DiscrepancyModal } from './components/reconciliation/DiscrepancyModal';
import { SettlementStudio } from './components/settlement/SettlementStudio';
import { GSTVoucherModal } from './components/settlement/GSTVoucherModal';
import { TrustPassportModal } from './components/passport/TrustPassportModal';
import { ScrapLifecycleStudio } from './components/scrap/ScrapLifecycleStudio';
import { JobCard } from './types';
import { 
  Sparkles, 
  Coins, 
  ShieldCheck, 
  Plus, 
  Flame, 
  Scale, 
  CreditCard, 
  Award,
  Layers
} from 'lucide-react';

export const AppContent: React.FC = () => {
  const { 
    activeTab, 
    jobs, 
    persona, 
    setNewJobModalOpen, 
    setCameraModalOpen, 
    setPassportModalOpen, 
    selectedJob 
  } = useApp();

  const [activeJobDetail, setActiveJobDetail] = useState<JobCard | null>(null);

  // Compute overall gold custody stats
  const totalGoldInCustody = jobs
    .filter(j => j.status !== 'settled')
    .reduce((acc, curr) => acc + curr.issuedGrossWeight, 0);

  const activeOrdersCount = jobs.filter(j => j.status !== 'settled').length;
  const anomaliesCount = jobs.filter(j => j.returnData?.anomalyFlagged).length;

  return (
    <MobileShell>
      {/* Tab: Jobs */}
      {activeTab === 'jobs' && (
        <div className="space-y-4">
          {activeJobDetail ? (
            <JobDetailView 
              job={activeJobDetail} 
              onBack={() => setActiveJobDetail(null)} 
            />
          ) : (
            <>
              {/* Custody Overview Hero Card */}
              <div className="bg-gradient-to-br from-[#1A2338] via-[#121A2B] to-[#0D121F] border border-amber-500/30 rounded-2xl p-4 shadow-xl relative overflow-hidden">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
                      {persona === 'jeweller' ? 'Jeweller Gold Custody Overview' : 'Karigar Workshop Custody'}
                    </span>
                    <h2 className="text-xl font-black font-mono text-white mt-0.5">
                      {totalGoldInCustody.toFixed(3)} <span className="text-sm font-sans font-medium text-amber-300">grams</span>
                    </h2>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Active Gold in Circulation Across {activeOrdersCount} Manufacturing Jobs
                    </p>
                  </div>

                  <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-inner">
                    <Coins className="w-5 h-5" />
                  </div>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-800 text-center">
                  <div className="bg-black/30 p-1.5 rounded-lg">
                    <span className="text-[9px] text-slate-400 block">Active Jobs</span>
                    <span className="text-xs font-mono font-bold text-slate-200">{activeOrdersCount}</span>
                  </div>
                  <div className="bg-black/30 p-1.5 rounded-lg">
                    <span className="text-[9px] text-slate-400 block">Anomaly Flags</span>
                    <span className={`text-xs font-mono font-bold ${anomaliesCount > 0 ? 'text-rose-400 animate-pulse' : 'text-emerald-400'}`}>
                      {anomaliesCount} {anomaliesCount > 0 ? 'Alert' : 'None'}
                    </span>
                  </div>
                  <div className="bg-black/30 p-1.5 rounded-lg">
                    <span className="text-[9px] text-slate-400 block">Dual Signoffs</span>
                    <span className="text-xs font-mono font-bold text-emerald-400">99.2%</span>
                  </div>
                </div>

                {/* Quick Action Bar for Scale OCR and New Job */}
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => setCameraModalOpen(true)}
                    className="flex-1 bg-slate-800/90 hover:bg-slate-700 text-slate-200 text-xs font-semibold py-2 px-3 rounded-xl border border-slate-700 flex items-center justify-center gap-1.5 transition-colors active:scale-98"
                  >
                    <Scale className="w-3.5 h-3.5 text-amber-400" />
                    <span>Quick Scale OCR</span>
                  </button>
                  <button
                    onClick={() => setNewJobModalOpen(true)}
                    className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 text-xs font-bold py-2 px-3 rounded-xl shadow-md shadow-amber-500/20 flex items-center justify-center gap-1.5 active:scale-98 transition-transform"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Issue Job & Gold</span>
                  </button>
                </div>
              </div>

              {/* Deadline Risk Radar */}
              <DeadlineRiskRadar />

              {/* Job Card List */}
              <JobCardList onSelectJob={(job) => setActiveJobDetail(job)} />
            </>
          )}
        </div>
      )}

      {/* Tab: Reconciliation */}
      {activeTab === 'reconciliation' && <ReconciliationStudio />}

      {/* Tab: AI Voice & Agentic */}
      {activeTab === 'voice_agent' && <VoiceAgentStudio />}

      {/* Tab: Settlement */}
      {activeTab === 'settlement' && <SettlementStudio />}

      {/* Tab: Karigar Passport / Artisan Profile */}
      {activeTab === 'passport' && (
        <div className="space-y-4">
          <TrustPassportModal />
          {/* Also render inline card if modal is closed */}
          <div className="bg-[#121A2B] border border-amber-500/30 rounded-2xl p-4 text-center space-y-3">
            <Award className="w-10 h-10 text-amber-400 mx-auto" />
            <h3 className="font-bold text-sm text-slate-100">Portable Karigar Trust Passport</h3>
            <p className="text-xs text-slate-300 max-w-xs mx-auto">
              Verifiable artisan identity unlocking financial inclusion, dignity, and zero-dispute partnerships.
            </p>
            <button
              onClick={() => setPassportModalOpen(true)}
              className="bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs shadow-md shadow-amber-500/20 active:scale-98"
            >
              Open Verified Passport & QR Token
            </button>
          </div>
        </div>
      )}

      {/* Tab: Scrap Lifecycle */}
      {activeTab === 'scrap' && <ScrapLifecycleStudio />}

      {/* Global Modals */}
      <NewJobModal />
      <ScaleCameraScannerModal />
      <DiscrepancyModal />
      <GSTVoucherModal />
      <TrustPassportModal />
    </MobileShell>
  );
};

export default function App() {
  return <AppContent />;
}
