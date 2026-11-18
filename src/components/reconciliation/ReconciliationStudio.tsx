import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { computeJobReconciliation, toFineGold, soundEffects } from '../../utils/goldMath';
import { 
  Scale, 
  AlertTriangle, 
  CheckCircle, 
  HelpCircle, 
  Sparkles, 
  Sliders, 
  ArrowRight, 
  ShieldCheck, 
  FileText,
  TrendingDown,
  Info
} from 'lucide-react';

export const ReconciliationStudio: React.FC = () => {
  const { 
    jobs, 
    selectedJobId, 
    setSelectedJobId, 
    selectedJob, 
    karigarProfile, 
    setDisputeModalOpen,
    setActiveTab
  } = useApp();

  // Interactive slider state
  const job = selectedJob || jobs[0];
  const [sliderIssued, setSliderIssued] = useState<number>(job.issuedGrossWeight);
  const [sliderFinished, setSliderFinished] = useState<number>(job.returnData?.finishedWeight || job.targetOrnamentWeight);
  const [sliderUnused, setSliderUnused] = useState<number>(job.returnData?.unusedGoldWeight || 4.800);
  const [sliderScrap, setSliderScrap] = useState<number>(job.returnData?.scrapWeight || 2.440);
  const [sliderLimitPct, setSliderLimitPct] = useState<number>(job.agreedGhatLimitPct);

  // Compute live reconciliation
  const recon = computeJobReconciliation(
    sliderIssued,
    sliderFinished,
    sliderUnused,
    sliderScrap,
    sliderLimitPct,
    job.purity
  );

  const benchmark = karigarProfile.historicalWastageBenchmarks[job.type] || { min: 0.80, max: 1.25, avg: 1.02 };
  const isAnomaly = recon.actualProcessLossPct > benchmark.max;

  const handleJobSelect = (id: string) => {
    setSelectedJobId(id);
    const target = jobs.find(j => j.id === id);
    if (target) {
      setSliderIssued(target.issuedGrossWeight);
      setSliderFinished(target.returnData?.finishedWeight || target.targetOrnamentWeight);
      setSliderUnused(target.returnData?.unusedGoldWeight || 0);
      setSliderScrap(target.returnData?.scrapWeight || 0);
      setSliderLimitPct(target.agreedGhatLimitPct);
    }
    soundEffects.playTareBeep();
  };

  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950/60 via-[#121A2B] to-[#121A2B] border border-amber-500/30 rounded-2xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-400">
            <Scale className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Module 2 • Technical Differentiator</span>
          </div>
          <span className="text-[10px] font-mono bg-amber-400/10 text-amber-300 px-2 py-0.5 rounded border border-amber-400/20">
            24K Fine-Gold Engine
          </span>
        </div>
        <h2 className="text-lg font-bold text-slate-100 mt-1">Intelligent Gold Reconciliation & Wastage Analytics</h2>
        <p className="text-xs text-slate-300 mt-1">
          Purity-normalized 24K accounting. Reconciles issued bullion against finished jewellery, recoverable scrap (Tukda/Chhol), and personalized craft baselines.
        </p>
      </div>

      {/* Select Job Card Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {jobs.map((j) => (
          <button
            key={j.id}
            onClick={() => handleJobSelect(j.id)}
            className={`px-3 py-2 rounded-xl text-left whitespace-nowrap border transition-all flex items-center gap-2 ${
              j.id === job.id
                ? 'bg-amber-500/20 border-amber-400 text-amber-200 font-semibold'
                : 'bg-[#121A2B] border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${j.returnData?.anomalyFlagged ? 'bg-rose-500 animate-ping' : 'bg-amber-400'}`}></div>
            <div>
              <span className="text-xs font-mono block">{j.id}</span>
              <span className="text-[10px] text-slate-400">{j.type}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Anomaly Alert Callout (If Detected) */}
      {(isAnomaly || job.returnData?.anomalyFlagged) && (
        <div className="bg-rose-950/60 border border-rose-500/40 rounded-2xl p-3.5 space-y-2.5 shadow-lg shadow-rose-950/50">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-rose-300 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 animate-bounce" />
              Personalized Wastage Anomaly Detected
            </span>
            <span className="text-[10px] font-mono bg-rose-500/20 text-rose-200 px-2 py-0.5 rounded">
              Deviation: +{(recon.actualProcessLossPct - benchmark.max).toFixed(2)}%
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs bg-black/40 p-2.5 rounded-xl border border-rose-500/20">
            <div>
              <span className="text-[10px] text-slate-400 block">Recorded Wastage:</span>
              <span className="font-mono font-bold text-rose-300 text-sm">{recon.actualProcessLossPct}%</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Ramesh's Proven Benchmark:</span>
              <span className="font-mono text-emerald-400 text-sm">{benchmark.min}% – {benchmark.max}%</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-300">
            AI Notice: Ramesh has a 99.2% joint reconciliation history. This is an alerting baseline, not proof of wrongdoing. Check scrap suction recovery before approving.
          </p>

          <button
            onClick={() => setDisputeModalOpen(true)}
            className="w-full bg-gradient-to-r from-rose-500 to-amber-500 text-slate-950 font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md shadow-rose-500/20 active:scale-98 transition-transform"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Investigate Discrepancy & AI Evidence Audit</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Visual Closed-Loop Material Flow Bar */}
      <div className="bg-[#121A2B] border border-amber-500/20 rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-200">Closed-Loop Gold Accountability</span>
          <span className="text-[11px] font-mono text-amber-300">
            Issued: {sliderIssued.toFixed(3)}g ({job.purity})
          </span>
        </div>

        {/* Stacked Progress Bar */}
        <div className="h-4 bg-slate-900 rounded-full overflow-hidden flex border border-slate-700">
          <div
            style={{ width: `${Math.min(100, (sliderFinished / sliderIssued) * 100)}%` }}
            className="bg-amber-400 transition-all duration-300 relative group"
            title={`Finished: ${sliderFinished.toFixed(3)}g`}
          />
          <div
            style={{ width: `${Math.min(100, (sliderUnused / sliderIssued) * 100)}%` }}
            className="bg-yellow-200 transition-all duration-300"
            title={`Unused: ${sliderUnused.toFixed(3)}g`}
          />
          <div
            style={{ width: `${Math.min(100, (sliderScrap / sliderIssued) * 100)}%` }}
            className="bg-emerald-400 transition-all duration-300"
            title={`Scrap: ${sliderScrap.toFixed(3)}g`}
          />
          <div
            style={{ width: `${Math.min(100, (recon.actualProcessLoss / sliderIssued) * 100)}%` }}
            className={`${recon.isWithinLimit ? 'bg-blue-400' : 'bg-rose-500'} transition-all duration-300`}
            title={`Process Loss: ${recon.actualProcessLoss.toFixed(3)}g`}
          />
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            <span className="text-slate-300">Finished ({sliderFinished.toFixed(3)}g)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-200"></span>
            <span className="text-slate-300">Unused ({sliderUnused.toFixed(3)}g)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span className="text-slate-300">Scrap ({sliderScrap.toFixed(3)}g)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-full ${recon.isWithinLimit ? 'bg-blue-400' : 'bg-rose-500'}`}></span>
            <span className="text-slate-300">Loss ({recon.actualProcessLoss.toFixed(3)}g)</span>
          </div>
        </div>
      </div>

      {/* 24K Fine Gold Purity Matrix Cards */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="bg-[#121A2B] border border-amber-500/20 rounded-xl p-3">
          <span className="text-[10px] text-slate-400 block font-medium">Fine Gold Issued (24K FGE)</span>
          <span className="text-base font-mono font-bold text-amber-300">
            {toFineGold(sliderIssued, job.purity).toFixed(3)}g
          </span>
          <span className="text-[9px] text-slate-400 block mt-0.5">Factor: 91.6% purity</span>
        </div>

        <div className="bg-[#121A2B] border border-amber-500/20 rounded-xl p-3">
          <span className="text-[10px] text-slate-400 block font-medium">Allowable Ghat ({sliderLimitPct}%)</span>
          <span className="text-base font-mono font-bold text-slate-200">
            {recon.allowableLossGrams.toFixed(3)}g
          </span>
          <span className="text-[9px] text-slate-400 block mt-0.5">Contractual limit</span>
        </div>
      </div>

      {/* Live Interactive Sliders to Test Any Weight Scenario */}
      <div className="bg-[#121A2B] border border-slate-800 rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-200 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            <span>Interactive Weight Simulation Sliders</span>
          </span>
          <span className="text-[10px] text-amber-400">Live Engine</span>
        </div>

        {/* Finished Weight Slider */}
        <div className="space-y-1">
          <div className="flex justify-between text-[11px]">
            <span className="text-slate-400">Finished Ornament Weight:</span>
            <span className="font-mono text-amber-300 font-bold">{sliderFinished.toFixed(3)}g</span>
          </div>
          <input
            type="range"
            min={sliderIssued * 0.7}
            max={sliderIssued * 0.98}
            step="0.05"
            value={sliderFinished}
            onChange={(e) => setSliderFinished(parseFloat(e.target.value))}
            className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
        </div>

        {/* Scrap Weight Slider */}
        <div className="space-y-1">
          <div className="flex justify-between text-[11px]">
            <span className="text-slate-400">Recovered Scrap / Filing Dust:</span>
            <span className="font-mono text-emerald-400 font-bold">{sliderScrap.toFixed(3)}g</span>
          </div>
          <input
            type="range"
            min="0"
            max={sliderIssued * 0.15}
            step="0.05"
            value={sliderScrap}
            onChange={(e) => setSliderScrap(parseFloat(e.target.value))}
            className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
        </div>

        {/* Unused Gold Slider */}
        <div className="space-y-1">
          <div className="flex justify-between text-[11px]">
            <span className="text-slate-400">Unused Pure Bullion Returned:</span>
            <span className="font-mono text-yellow-200 font-bold">{sliderUnused.toFixed(3)}g</span>
          </div>
          <input
            type="range"
            min="0"
            max={sliderIssued * 0.2}
            step="0.1"
            value={sliderUnused}
            onChange={(e) => setSliderUnused(parseFloat(e.target.value))}
            className="w-full accent-yellow-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
        </div>

        {/* Calculation Result Callout */}
        <div className={`p-3 rounded-xl border text-xs leading-relaxed ${
          recon.isWithinLimit
            ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200'
            : 'bg-rose-950/40 border-rose-500/30 text-rose-200'
        }`}>
          <div className="flex items-center gap-1.5 font-bold mb-1">
            {recon.isWithinLimit ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <AlertTriangle className="w-4 h-4 text-rose-400" />}
            <span>{recon.isWithinLimit ? 'Reconciliation Balanced' : 'Variance Exceeds Tolerance'}</span>
          </div>
          <p>{recon.explanation}</p>
        </div>
      </div>
    </div>
  );
};
