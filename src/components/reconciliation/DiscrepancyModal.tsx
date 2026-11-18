import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { soundEffects, CURRENT_24K_GOLD_RATE_INR } from '../../utils/goldMath';
import { 
  AlertTriangle, 
  X, 
  Scale, 
  Search, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight, 
  Layers, 
  ShieldAlert,
  Sparkles
} from 'lucide-react';

export const DiscrepancyModal: React.FC = () => {
  const { disputeModalOpen, setDisputeModalOpen, selectedJob, resolveAnomalyAndApprove } = useApp();
  const [resolutionOption, setResolutionOption] = useState<'credit_suction' | 'adjust_making' | 'goodwill'>('credit_suction');
  const [suctionGrams, setSuctionGrams] = useState<number>(0.450);
  const [customNote, setCustomNote] = useState<string>('');

  if (!disputeModalOpen || !selectedJob || !selectedJob.returnData) return null;

  const returnData = selectedJob.returnData;
  const issuedWeight = selectedJob.issuedGrossWeight;
  const allowableLoss = (selectedJob.agreedGhatLimitPct / 100) * issuedWeight;
  const excessWastageGrams = Math.max(0, returnData.actualLoss - allowableLoss);
  const excessRupees = Math.round(excessWastageGrams * (CURRENT_24K_GOLD_RATE_INR * 0.916));

  const handleResolve = () => {
    soundEffects.playCoinChime();
    let note = '';
    if (resolutionOption === 'credit_suction') {
      note = `Resolved via Polish Filter Silt: ${suctionGrams.toFixed(3)}g recovery logged to scrap ledger. Net variance within acceptable limit.`;
    } else if (resolutionOption === 'adjust_making') {
      note = `Mutual Gold Adjustment: ₹${excessRupees.toLocaleString('en-IN')} excess variance deducted from labour charges.`;
    } else {
      note = `Goodwill settlement approved by Rajesh Zaveri for Diwali order deadline completion.`;
    }

    resolveAnomalyAndApprove(selectedJob.id, customNote || note);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-[#0D121F] border border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-rose-950/80 via-[#121A2B] to-[#121A2B] border-b border-rose-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                <span>AI Discrepancy Investigation</span>
                <span className="text-[10px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded-full font-mono">
                  {selectedJob.id}
                </span>
              </h3>
              <p className="text-[11px] text-slate-300">Wastage Anomaly & Neutral Mediation Engine</p>
            </div>
          </div>
          <button
            onClick={() => setDisputeModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-4 overflow-y-auto">
          {/* Anomaly Summary Alert */}
          <div className="bg-rose-950/40 border border-rose-500/40 rounded-2xl p-3.5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-rose-300 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                Wastage Anomaly Detected (2.10% vs 1.10% Limit)
              </span>
              <span className="text-[10px] text-rose-300 font-mono">Deviation: +0.85%</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Ramesh Soni's historical benchmark for <strong className="text-amber-300">{selectedJob.type}</strong> is <span className="font-mono text-emerald-400">0.80% – 1.25%</span> across 28 past jobs. This job logged <span className="font-mono text-rose-300 font-bold">2.10% (1.310g loss)</span>.
            </p>
            <div className="bg-black/40 p-2.5 rounded-xl border border-rose-500/20 text-[11px] text-slate-300">
              <span className="text-amber-400 font-semibold">AI Explainer: </span>
              Ramesh maintains a 99.2% joint reconciliation score. Because this job involves deep Lakshmi antique die-stamping, fine polish dust ("rada") often stays trapped in the suction vacuum filter rather than being lost gold.
            </div>
          </div>

          {/* Side-by-Side Photographic Evidence Comparison */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span>Photo Weighing Evidence Audit:</span>
              <span className="text-[10px] text-slate-400">Captured at calibrated scales</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {/* Issuance Scale */}
              <div className="bg-[#121A2B] border border-slate-800 rounded-xl p-2.5 space-y-1.5">
                <span className="text-[10px] text-slate-400 block font-medium">1. Issuance (08 Nov)</span>
                <div className="h-24 bg-slate-950 rounded-lg overflow-hidden relative flex items-center justify-center border border-slate-800">
                  <img
                    src={selectedJob.issuedScalePhoto}
                    alt="Issued Scale"
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-1">
                    <span className="text-[9px] text-emerald-400 font-mono">OCR: VERIFIED</span>
                    <span className="text-sm font-mono font-bold text-white">{selectedJob.issuedGrossWeight.toFixed(3)}g</span>
                  </div>
                </div>
                <div className="text-[10px] text-slate-400 flex justify-between">
                  <span>Gross 22K</span>
                  <span className="text-emerald-400 font-bold">Signed ✓</span>
                </div>
              </div>

              {/* Return Scale */}
              <div className="bg-[#121A2B] border border-slate-800 rounded-xl p-2.5 space-y-1.5">
                <span className="text-[10px] text-slate-400 block font-medium">2. Return (17 Nov)</span>
                <div className="h-24 bg-slate-950 rounded-lg overflow-hidden relative flex items-center justify-center border border-slate-800">
                  <img
                    src={returnData.scalePhoto || 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&q=80&w=480'}
                    alt="Return Scale"
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-1">
                    <span className="text-[9px] text-amber-400 font-mono">FINISHED WT</span>
                    <span className="text-sm font-mono font-bold text-amber-300">{returnData.finishedWeight.toFixed(3)}g</span>
                  </div>
                </div>
                <div className="text-[10px] text-slate-400 flex justify-between">
                  <span>Scrap: {returnData.scrapWeight.toFixed(3)}g</span>
                  <span className="text-amber-400 font-bold">Review</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mathematical Variance Table */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 space-y-2 text-xs font-mono">
            <div className="flex justify-between text-slate-400">
              <span>Gold Issued:</span>
              <span className="text-slate-200">{issuedWeight.toFixed(3)}g</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Accounted (Finished + Unused + Scrap):</span>
              <span className="text-slate-200">
                {(returnData.finishedWeight + returnData.unusedGoldWeight + returnData.scrapWeight).toFixed(3)}g
              </span>
            </div>
            <div className="flex justify-between text-slate-400 border-t border-slate-800 pt-1">
              <span>Actual Process Loss:</span>
              <span className="text-rose-400 font-bold">{returnData.actualLoss.toFixed(3)}g ({returnData.actualLossPct}%)</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Agreed Loss Limit ({selectedJob.agreedGhatLimitPct}%):</span>
              <span className="text-emerald-400">{allowableLoss.toFixed(3)}g</span>
            </div>
            <div className="flex justify-between text-amber-300 font-bold border-t border-slate-800 pt-1">
              <span>Excess Unreconciled Variance:</span>
              <span>{excessWastageGrams.toFixed(3)}g (₹{excessRupees.toLocaleString('en-IN')})</span>
            </div>
          </div>

          {/* Resolution Options */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Select AI Recommended Resolution:</span>
            </label>
            <div className="space-y-2">
              <label
                onClick={() => setResolutionOption('credit_suction')}
                className={`p-3 rounded-xl border flex items-start gap-2.5 cursor-pointer transition-all ${
                  resolutionOption === 'credit_suction'
                    ? 'bg-amber-500/15 border-amber-400 text-slate-100'
                    : 'bg-[#121A2B] border-slate-800 text-slate-400'
                }`}
              >
                <input
                  type="radio"
                  name="resolution"
                  checked={resolutionOption === 'credit_suction'}
                  onChange={() => setResolutionOption('credit_suction')}
                  className="mt-1 accent-amber-500"
                />
                <div className="text-xs flex-1">
                  <span className="font-bold text-slate-200 block">
                    Verify & Credit Suction Filter Silt (Recommended)
                  </span>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Recover approximately 0.450g fine gold dust from polishing filter. Log batch as Scrap Silt in vault.
                  </p>
                </div>
              </label>

              <label
                onClick={() => setResolutionOption('adjust_making')}
                className={`p-3 rounded-xl border flex items-start gap-2.5 cursor-pointer transition-all ${
                  resolutionOption === 'adjust_making'
                    ? 'bg-amber-500/15 border-amber-400 text-slate-100'
                    : 'bg-[#121A2B] border-slate-800 text-slate-400'
                }`}
              >
                <input
                  type="radio"
                  name="resolution"
                  checked={resolutionOption === 'adjust_making'}
                  onChange={() => setResolutionOption('adjust_making')}
                  className="mt-1 accent-amber-500"
                />
                <div className="text-xs flex-1">
                  <span className="font-bold text-slate-200 block">
                    Debit Variance from Labour Settlement (₹{excessRupees.toLocaleString('en-IN')})
                  </span>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Deduct excess {excessWastageGrams.toFixed(3)}g at current 22K market rate from final making charges.
                  </p>
                </div>
              </label>

              <label
                onClick={() => setResolutionOption('goodwill')}
                className={`p-3 rounded-xl border flex items-start gap-2.5 cursor-pointer transition-all ${
                  resolutionOption === 'goodwill'
                    ? 'bg-amber-500/15 border-amber-400 text-slate-100'
                    : 'bg-[#121A2B] border-slate-800 text-slate-400'
                }`}
              >
                <input
                  type="radio"
                  name="resolution"
                  checked={resolutionOption === 'goodwill'}
                  onChange={() => setResolutionOption('goodwill')}
                  className="mt-1 accent-amber-500"
                />
                <div className="text-xs flex-1">
                  <span className="font-bold text-slate-200 block">
                    Approve as Exceptional Process Loss (Goodwill)
                  </span>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Accept variance due to intricate one-off handmade die requirements for wedding deadline.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleResolve}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 active:scale-98 transition-transform text-xs sm:text-sm"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Apply Joint Resolution & Generate Settlement</span>
          </button>
        </div>
      </div>
    </div>
  );
};
