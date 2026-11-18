import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { JobCard } from '../../types';
import { soundEffects } from '../../utils/goldMath';
import { 
  ArrowLeft, 
  Camera, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  AlertTriangle, 
  CreditCard, 
  FileText, 
  Sparkles, 
  Share2, 
  UserCheck, 
  Layers, 
  ChevronRight,
  Printer
} from 'lucide-react';

interface JobDetailViewProps {
  job: JobCard;
  onBack: () => void;
}

export const JobDetailView: React.FC<JobDetailViewProps> = ({ job, onBack }) => {
  const { 
    persona, 
    signDualParty, 
    setCameraModalOpen, 
    setDisputeModalOpen, 
    setGstModalOpen,
    releaseEscrowPayment,
    setActiveTab
  } = useApp();

  const [otpSent, setOtpSent] = useState(false);

  const handleDualSign = () => {
    soundEffects.playTareBeep();
    signDualParty(job.id, persona);
    setOtpSent(true);
  };

  const hasAnomaly = job.returnData?.anomalyFlagged;

  return (
    <div className="space-y-4 pb-6">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white bg-[#121A2B] px-3 py-1.5 rounded-xl border border-slate-800 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Jobs</span>
        </button>

        <div className="flex items-center gap-2">
          {job.settlement && (
            <button
              onClick={() => setGstModalOpen(true)}
              className="flex items-center gap-1 text-xs text-amber-300 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1.5 rounded-xl hover:bg-amber-500/20"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>GST Challan</span>
            </button>
          )}
          <span className="text-xs font-mono font-bold text-amber-400 bg-black/40 px-2.5 py-1.5 rounded-xl border border-slate-800">
            {job.id}
          </span>
        </div>
      </div>

      {/* Main Job Header Card */}
      <div className="bg-[#121A2B] border border-amber-500/20 rounded-2xl p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] bg-amber-400/10 text-amber-300 border border-amber-400/20 px-2 py-0.5 rounded-full font-mono">
              {job.purity} • {job.type}
            </span>
            <h2 className="text-lg font-bold text-slate-100 mt-1.5">{job.title}</h2>
            <p className="text-xs text-slate-400 mt-0.5">{job.orderNumber} • Order Ref</p>
          </div>
          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
            hasAnomaly
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
              : job.status === 'settled'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
          }`}>
            {hasAnomaly ? 'Anomaly Review' : job.status.replace('_', ' ')}
          </span>
        </div>

        {/* Muhurat Event Callout */}
        {job.muhuratEvent && (
          <div className="bg-amber-950/30 border border-amber-500/30 rounded-xl p-2.5 flex items-center justify-between text-xs">
            <span className="text-amber-200 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>{job.muhuratEvent}</span>
            </span>
            <span className="font-mono text-amber-400 font-bold">{job.deadline}</span>
          </div>
        )}

        {/* Stakeholder Details */}
        <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-800">
          <div>
            <span className="text-[10px] text-slate-400 block">Retail Jeweller:</span>
            <span className="font-semibold text-slate-200">{job.jewellerName}</span>
            <span className="text-[10px] text-slate-400 block">{job.jewellerFirm}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block">Assigned Goldsmith:</span>
            <span className="font-semibold text-amber-300">{job.karigarName}</span>
            <span className="text-[10px] text-slate-400 block">{job.karigarWorkshop}</span>
          </div>
        </div>
      </div>

      {/* Module 1: Photo-Verified Gold Weighing Section */}
      <div className="bg-[#121A2B] border border-amber-500/20 rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Photo-Verified Weighing Evidence
            </h3>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            Dual-OCR Calibrated
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {/* Issuance Scale */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-2.5 space-y-2">
            <div className="flex justify-between text-[10px]">
              <span className="text-slate-400 font-medium">1. Issuance Weighing</span>
              <span className="text-emerald-400 font-mono">Logged</span>
            </div>
            <div className="h-28 bg-slate-900 rounded-lg overflow-hidden relative border border-slate-800 flex items-center justify-center">
              <img
                src={job.issuedScalePhoto}
                alt="Issuance Scale"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-2">
                <span className="text-[10px] font-mono font-bold text-amber-300">
                  {job.issuedGrossWeight.toFixed(3)}g
                </span>
                <span className="text-[8px] text-slate-300 font-mono">Mettler Toledo • 14 Nov</span>
              </div>
            </div>
            <div className="text-[10px] text-slate-400 flex justify-between">
              <span>Agreed Ghat:</span>
              <span className="font-mono text-slate-200">{job.agreedGhatLimitPct}%</span>
            </div>
          </div>

          {/* Return Scale */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-2.5 space-y-2">
            <div className="flex justify-between text-[10px]">
              <span className="text-slate-400 font-medium">2. Return Weighing</span>
              <span className={job.returnData ? 'text-emerald-400 font-mono' : 'text-amber-400 font-mono'}>
                {job.returnData ? 'Delivered' : 'Pending Return'}
              </span>
            </div>

            {job.returnData ? (
              <div className="h-28 bg-slate-900 rounded-lg overflow-hidden relative border border-slate-800 flex items-center justify-center">
                <img
                  src={job.returnData.scalePhoto || 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&q=80&w=480'}
                  alt="Return Scale"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-2">
                  <span className="text-[10px] font-mono font-bold text-amber-300">
                    {job.returnData.finishedWeight.toFixed(3)}g
                  </span>
                  <span className="text-[8px] text-slate-300 font-mono">Scrap: {job.returnData.scrapWeight.toFixed(3)}g</span>
                </div>
              </div>
            ) : (
              <div className="h-28 bg-slate-900/60 rounded-lg border border-dashed border-amber-500/40 flex flex-col items-center justify-center p-2 text-center">
                <Camera className="w-5 h-5 text-amber-400 mb-1" />
                <span className="text-[10px] text-slate-300">No return photo yet</span>
                <button
                  onClick={() => setCameraModalOpen(true)}
                  className="mt-1 text-[10px] bg-amber-500 text-slate-950 font-bold px-2 py-0.5 rounded shadow active:scale-95"
                >
                  Weigh Scale
                </button>
              </div>
            )}

            <div className="text-[10px] text-slate-400 flex justify-between">
              <span>Custody:</span>
              <span className="font-mono text-slate-200 truncate max-w-[80px]">{job.custodyHolder.split(' ')[0]}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Module 1: Dual-Party Verification Status */}
      <div className="bg-[#121A2B] border border-amber-500/20 rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Dual-Party Mutual Approval
            </h3>
          </div>
          <span className="text-[10px] text-slate-400">Neither party can commit unilaterally</span>
        </div>

        <div className="space-y-2">
          {/* Jeweller Signature */}
          <div className="flex items-center justify-between p-2.5 bg-black/40 rounded-xl border border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${job.signatures.jewellerSigned ? 'bg-emerald-400' : 'bg-slate-600'}`}></span>
              <div>
                <span className="font-semibold text-slate-200 block">{job.jewellerName} (Jeweller)</span>
                <span className="text-[10px] text-slate-400">{job.signatures.jewellerTimestamp || 'Pending sign-off'}</span>
              </div>
            </div>
            {job.signatures.jewellerSigned ? (
              <span className="text-emerald-400 font-mono text-[11px] flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> OTP Verified
              </span>
            ) : persona === 'jeweller' ? (
              <button
                onClick={handleDualSign}
                className="bg-amber-500 text-slate-950 font-bold px-3 py-1 rounded-lg text-xs"
              >
                Sign with OTP
              </button>
            ) : (
              <span className="text-slate-500 text-xs">Awaiting Jeweller</span>
            )}
          </div>

          {/* Karigar Signature */}
          <div className="flex items-center justify-between p-2.5 bg-black/40 rounded-xl border border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${job.signatures.karigarSigned ? 'bg-emerald-400' : 'bg-slate-600'}`}></span>
              <div>
                <span className="font-semibold text-slate-200 block">{job.karigarName} (Karigar)</span>
                <span className="text-[10px] text-slate-400">{job.signatures.karigarTimestamp || 'Pending sign-off'}</span>
              </div>
            </div>
            {job.signatures.karigarSigned ? (
              <span className="text-emerald-400 font-mono text-[11px] flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> OTP Verified
              </span>
            ) : persona === 'karigar' ? (
              <button
                onClick={handleDualSign}
                className="bg-amber-500 text-slate-950 font-bold px-3 py-1 rounded-lg text-xs"
              >
                Sign with OTP
              </button>
            ) : (
              <span className="text-slate-500 text-xs">Awaiting Karigar</span>
            )}
          </div>
        </div>
      </div>

      {/* Module 2: Anomaly & Investigation Alert */}
      {hasAnomaly && (
        <div className="bg-rose-950/60 border border-rose-500/50 rounded-2xl p-4 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-rose-300 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              Wastage Anomaly Flagged (2.10% vs 1.10%)
            </span>
            <span className="text-[10px] bg-rose-500/20 text-rose-200 px-2 py-0.5 rounded font-mono">
              Action Required
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Wastage of 1.310g exceeds agreed limit by 0.624g (₹4,773). SonaSetu AI detected this deviates from Ramesh's typical 0.80%–1.25% range.
          </p>
          <button
            onClick={() => setDisputeModalOpen(true)}
            className="w-full bg-gradient-to-r from-rose-500 to-amber-500 text-slate-950 font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-98 transition-transform"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Launch AI Discrepancy Investigation</span>
          </button>
        </div>
      )}

      {/* Module 4: Settlement Breakdown (If Reconciled or Settled) */}
      {job.settlement && (
        <div className="bg-[#121A2B] border border-emerald-500/30 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Itemized Settlement Proposal
              </h3>
            </div>
            <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/20">
              {job.settlement.escrowStatus.replace('_', ' ')}
            </span>
          </div>

          <div className="bg-black/40 rounded-xl p-3 border border-slate-800 space-y-2 text-xs font-mono">
            <div className="flex justify-between text-slate-400">
              <span>Gross Labour Charges ({job.returnData?.finishedWeight.toFixed(3)}g @ ₹{job.makingChargePerGram}):</span>
              <span className="text-slate-200">₹{job.settlement.grossLabourCharges.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Advance Deducted:</span>
              <span className="text-rose-400">-₹{job.settlement.advanceDeducted.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Gold Variance Adjustment:</span>
              <span className="text-slate-200">₹{job.settlement.goldAdjustmentRupees.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-amber-300 font-bold border-t border-slate-800 pt-2 text-sm">
              <span>Net Payable to Artisan:</span>
              <span>₹{job.settlement.netPayableToKarigar.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {job.settlement.escrowStatus === 'held_in_escrow' ? (
            <button
              onClick={() => releaseEscrowPayment(job.id)}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-98 transition-transform text-xs"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Release Smart Escrow Payout (₹{job.settlement.netPayableToKarigar.toLocaleString('en-IN')})</span>
            </button>
          ) : (
            <div className="p-2.5 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Funds Disbursed to Artisan SBI Account</span>
              </span>
              <span className="font-mono text-[10px]">IMPS Success</span>
            </div>
          )}
        </div>
      )}

      {/* Audit Event Timeline */}
      <div className="bg-[#121A2B] border border-amber-500/20 rounded-2xl p-4 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
          Chain of Custody & Evidence Audit Log
        </h3>
        <div className="space-y-3 border-l-2 border-slate-800 ml-2 pl-4">
          {job.timeline.map((event, idx) => (
            <div key={idx} className="relative text-xs">
              <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-amber-400 ring-4 ring-[#121A2B]"></span>
              <div className="flex justify-between items-baseline text-[10px] text-slate-400">
                <span className="font-semibold text-slate-300">{event.actor}</span>
                <span className="font-mono">{event.timestamp}</span>
              </div>
              <p className="font-bold text-slate-200 mt-0.5">{event.event}</p>
              {event.note && (
                <p className="text-[11px] text-slate-400 italic mt-0.5 bg-black/30 p-1.5 rounded border border-slate-800/80">
                  {event.note}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
