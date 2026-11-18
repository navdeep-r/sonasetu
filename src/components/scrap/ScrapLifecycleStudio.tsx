import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ScrapBatch } from '../../types';
import { soundEffects } from '../../utils/goldMath';
import { 
  Flame, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Building, 
  ShieldCheck, 
  Info,
  Plus
} from 'lucide-react';

export const ScrapLifecycleStudio: React.FC = () => {
  const { scrapBatches, karigarProfile } = useApp();
  const [batches, setBatches] = useState<ScrapBatch[]>(scrapBatches);

  const totalScrapGrams = batches.reduce((acc, curr) => acc + curr.weightGrams, 0);
  const totalFineGoldGrams = batches.reduce((acc, curr) => acc + curr.fineGoldEquivalentGrams, 0);

  const handleUpdateStatus = (id: string) => {
    soundEffects.playTareBeep();
    setBatches(prev => prev.map(b => {
      if (b.id !== id) return b;
      const nextStatus: ScrapBatch['refinerStatus'] = 
        b.refinerStatus === 'In Vault' ? 'Batched for Assay' :
        b.refinerStatus === 'Batched for Assay' ? 'With Refiner' :
        b.refinerStatus === 'With Refiner' ? 'Melted & Credited' : 'In Vault';
      return { ...b, refinerStatus: nextStatus };
    }));
  };

  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950/60 via-[#121A2B] to-[#121A2B] border border-amber-500/30 rounded-2xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-400">
            <Flame className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Module 2 • Feature 6</span>
          </div>
          <span className="text-[10px] font-mono bg-amber-400/10 text-amber-300 px-2 py-0.5 rounded border border-amber-400/20">
            Zero-Waste Ledger
          </span>
        </div>
        <h2 className="text-lg font-bold text-slate-100 mt-1">Separate Scrap Lifecycle & Assay Recovery</h2>
        <p className="text-xs text-slate-300 mt-1">
          Scrap is <strong className="text-amber-300">never automatically classified as lost gold</strong>. Tracks solid cut-offs (Tukda), bench filings (Chhol), and buffing silt (Rada) until assayed and melted.
        </p>
      </div>

      {/* Aggregate Scrap Metrics */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="bg-[#121A2B] border border-amber-500/20 rounded-2xl p-3.5 space-y-1">
          <span className="text-[10px] text-slate-400 block font-medium">Total Recovered Scrap</span>
          <span className="text-xl font-mono font-black text-amber-300 block">
            {totalScrapGrams.toFixed(3)} <span className="text-xs font-sans text-slate-400">g</span>
          </span>
          <span className="text-[9px] text-slate-400">Across 3 workshop batches</span>
        </div>

        <div className="bg-[#121A2B] border border-emerald-500/20 rounded-2xl p-3.5 space-y-1">
          <span className="text-[10px] text-slate-400 block font-medium">Fine Gold Equivalent (24K FGE)</span>
          <span className="text-xl font-mono font-black text-emerald-400 block">
            {totalFineGoldGrams.toFixed(3)} <span className="text-xs font-sans text-slate-400">g</span>
          </span>
          <span className="text-[9px] text-emerald-400/80 flex items-center gap-1">
            <ShieldCheck className="w-2.5 h-2.5" />
            <span>Assay Certified</span>
          </span>
        </div>
      </div>

      {/* 3 Scrap Classifications Explainer */}
      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="bg-[#121A2B] p-2.5 rounded-xl border border-slate-800">
          <span className="text-amber-400 font-bold block text-[11px]">Tukda (टुकड़ा)</span>
          <span className="text-[9px] text-slate-400">Solid Cut-offs</span>
          <span className="text-[10px] font-mono text-slate-200 block mt-1 font-bold">~91.6% Pure</span>
        </div>
        <div className="bg-[#121A2B] p-2.5 rounded-xl border border-slate-800">
          <span className="text-amber-400 font-bold block text-[11px]">Chhol (छोल)</span>
          <span className="text-[9px] text-slate-400">Filing Dust</span>
          <span className="text-[10px] font-mono text-slate-200 block mt-1 font-bold">~88.5% Pure</span>
        </div>
        <div className="bg-[#121A2B] p-2.5 rounded-xl border border-slate-800">
          <span className="text-amber-400 font-bold block text-[11px]">Rada (रादा)</span>
          <span className="text-[9px] text-slate-400">Buffing Silt</span>
          <span className="text-[10px] font-mono text-slate-200 block mt-1 font-bold">~78.0% Pure</span>
        </div>
      </div>

      {/* Scrap Batches List */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-200">Active Scrap Batches & Refiner Pipeline</span>
          <span className="text-[10px] text-slate-400">Tap status to advance workflow</span>
        </div>

        {batches.map((batch) => (
          <div
            key={batch.id}
            className="bg-[#121A2B] border border-slate-800 rounded-2xl p-3.5 space-y-2.5"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-400">{batch.id}</span>
                <h4 className="text-xs font-bold text-slate-100">{batch.scrapType}</h4>
                <p className="text-[10px] text-slate-400">{batch.karigarName} • Collected {batch.collectedDate}</p>
              </div>

              {/* Status Pill with Click to Transition */}
              <button
                onClick={() => handleUpdateStatus(batch.id)}
                title="Click to advance refiner state"
                className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border transition-all active:scale-95 ${
                  batch.refinerStatus === 'Melted & Credited'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    : batch.refinerStatus === 'With Refiner'
                    ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                }`}
              >
                {batch.refinerStatus} ↻
              </button>
            </div>

            {/* Weights and Conversion */}
            <div className="bg-black/40 p-2 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs font-mono">
              <div>
                <span className="text-[9px] text-slate-400 block font-sans">Gross Weight</span>
                <span className="font-bold text-slate-200">{batch.weightGrams.toFixed(3)}g</span>
              </div>
              <div className="text-center">
                <span className="text-[9px] text-slate-400 block font-sans">Assayed Purity</span>
                <span className="text-amber-400">{batch.estimatedPurityPct}%</span>
              </div>
              <div className="text-right">
                <span className="text-[9px] text-slate-400 block font-sans">24K Fine Equivalent</span>
                <span className="font-bold text-emerald-400">{batch.fineGoldEquivalentGrams.toFixed(3)}g</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
