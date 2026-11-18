import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CreditCard, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  ArrowUpRight, 
  FileText, 
  Sparkles, 
  Building2,
  AlertCircle
} from 'lucide-react';

export const SettlementStudio: React.FC = () => {
  const { jobs, setSelectedJobId, releaseEscrowPayment, setGstModalOpen, setActiveTab } = useApp();

  const settledJobs = jobs.filter(j => j.settlement);
  const pendingJobs = jobs.filter(j => j.status === 'returned' || j.status === 'reconciled');

  const totalDisbursed = settledJobs
    .filter(j => j.settlement?.escrowStatus === 'released_to_bank')
    .reduce((acc, curr) => acc + (curr.settlement?.netPayableToKarigar || 0), 0);

  const totalHeldInEscrow = settledJobs
    .filter(j => j.settlement?.escrowStatus === 'held_in_escrow')
    .reduce((acc, curr) => acc + (curr.settlement?.netPayableToKarigar || 0), 0);

  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-[#121A2B] to-[#121A2B] border border-emerald-500/30 rounded-2xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-emerald-400">
            <CreditCard className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Module 4 • Financial Trust</span>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
            Escrow & Tax Engine
          </span>
        </div>
        <h2 className="text-lg font-bold text-slate-100 mt-1">Transparent Settlement & Conditional Payouts</h2>
        <p className="text-xs text-slate-300 mt-1">
          Automated itemized statements factoring making charges, advance deductions, and fine-gold adjustments. Smart escrow release upon mutual approval.
        </p>
      </div>

      {/* Financial Metrics Cards */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="bg-[#121A2B] border border-amber-500/20 rounded-2xl p-3.5 space-y-1">
          <span className="text-[10px] text-slate-400 block font-medium">Funds Held in Smart Escrow</span>
          <span className="text-xl font-mono font-black text-amber-300 block">
            ₹{totalHeldInEscrow.toLocaleString('en-IN')}
          </span>
          <span className="text-[9px] text-amber-400/80 flex items-center gap-1">
            <Lock className="w-2.5 h-2.5" />
            <span>Conditional Release on Sign-off</span>
          </span>
        </div>

        <div className="bg-[#121A2B] border border-emerald-500/20 rounded-2xl p-3.5 space-y-1">
          <span className="text-[10px] text-slate-400 block font-medium">Total Lifetime Disbursed</span>
          <span className="text-xl font-mono font-black text-emerald-400 block">
            ₹{totalDisbursed.toLocaleString('en-IN')}
          </span>
          <span className="text-[9px] text-emerald-400/80 flex items-center gap-1">
            <ShieldCheck className="w-2.5 h-2.5" />
            <span>100% On-Time Artisan Pay</span>
          </span>
        </div>
      </div>

      {/* Active Settlements List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-200">Settlement Statements & Escrow Records</span>
          <span className="text-[10px] text-slate-400">{settledJobs.length} Statements</span>
        </div>

        {settledJobs.length === 0 ? (
          <div className="p-6 bg-[#121A2B] rounded-2xl border border-slate-800 text-center">
            <AlertCircle className="w-8 h-8 text-slate-500 mx-auto mb-2" />
            <p className="text-xs text-slate-300">No settled jobs yet</p>
            <p className="text-[10px] text-slate-500 mt-1">Complete a job reconciliation to trigger a settlement statement</p>
          </div>
        ) : (
          settledJobs.map((job) => {
            const settl = job.settlement!;
            const isHeld = settl.escrowStatus === 'held_in_escrow';

            return (
              <div
                key={job.id}
                className="bg-[#121A2B] border border-amber-500/20 rounded-2xl p-4 space-y-3 shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-amber-400 font-bold">{settl.id}</span>
                    <h4 className="text-sm font-bold text-slate-100 mt-0.5">{job.title}</h4>
                    <p className="text-[10px] text-slate-400">{job.karigarName} • {settl.calculatedAt}</p>
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                    isHeld
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    {settl.escrowStatus.replace(/_/g, ' ')}
                  </span>
                </div>

                {/* Line Item Breakdown */}
                <div className="bg-black/40 rounded-xl p-2.5 border border-slate-800 space-y-1.5 text-[11px] font-mono">
                  <div className="flex justify-between text-slate-400">
                    <span>Labour Charges ({job.targetOrnamentWeight}g @ ₹{job.makingChargePerGram}):</span>
                    <span className="text-slate-200">₹{settl.grossLabourCharges.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Advance Deducted:</span>
                    <span className="text-rose-400">-₹{settl.advanceDeducted.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Gold Variance Adjustment:</span>
                    <span className="text-slate-200">₹{settl.goldAdjustmentRupees.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-amber-300 font-bold border-t border-slate-800 pt-1 text-xs">
                    <span>Net Amount Payable:</span>
                    <span>₹{settl.netPayableToKarigar.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => {
                      setSelectedJobId(job.id);
                      setGstModalOpen(true);
                    }}
                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                    <span>View GST ITC-04</span>
                  </button>

                  {isHeld && (
                    <button
                      onClick={() => releaseEscrowPayment(job.id)}
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20 active:scale-98 transition-transform"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Release Payment (₹{settl.netPayableToKarigar.toLocaleString('en-IN')})</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
