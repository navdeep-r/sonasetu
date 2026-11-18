import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Award, 
  X, 
  QrCode, 
  ShieldCheck, 
  Star, 
  CheckCircle2, 
  Briefcase, 
  Building2, 
  Share2, 
  Lock, 
  Download,
  ExternalLink
} from 'lucide-react';

export const TrustPassportModal: React.FC = () => {
  const { passportModalOpen, setPassportModalOpen, karigarProfile } = useApp();
  const [showQrVerification, setShowQrVerification] = useState(false);

  if (!passportModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-[#0D121F] border border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-amber-950/80 via-[#121A2B] to-[#121A2B] border-b border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-100 flex items-center gap-1.5">
                <span>Portable Karigar Trust Passport</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-mono">
                  Verified
                </span>
              </h3>
              <p className="text-[11px] text-amber-400/80">Decentralized Professional Artisan Credential</p>
            </div>
          </div>
          <button
            onClick={() => setPassportModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-4 overflow-y-auto">
          {/* Main Artisan Identity Card */}
          <div className="bg-gradient-to-br from-[#1E293B] via-[#141C2E] to-[#0A0E17] border-2 border-amber-500/40 rounded-2xl p-4 shadow-xl relative overflow-hidden">
            {/* Shimmer Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={karigarProfile.avatarUrl}
                  alt={karigarProfile.fullName}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-400 shadow-md"
                />
                <div>
                  <h3 className="font-bold text-base text-slate-100 flex items-center gap-1.5">
                    <span>{karigarProfile.fullName}</span>
                    <ShieldCheck className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                  </h3>
                  <p className="text-xs text-slate-400">{karigarProfile.workshopName}</p>
                  <p className="text-[11px] text-amber-400 font-medium">
                    {karigarProfile.city}, {karigarProfile.state} • {karigarProfile.experienceYears} Years Master Craft
                  </p>
                </div>
              </div>

              {/* Trust Score Badge */}
              <div className="bg-gradient-to-br from-amber-500 to-yellow-400 text-slate-950 p-2.5 rounded-2xl shadow-md text-center min-w-[68px]">
                <span className="text-[9px] font-bold block uppercase tracking-wider">Trust Score</span>
                <span className="text-xl font-black font-mono leading-none">
                  {karigarProfile.metrics.trustScore}
                </span>
                <span className="text-[8px] font-bold block opacity-80">/ 100</span>
              </div>
            </div>

            {/* Badges Carousel / Pills */}
            <div className="flex flex-wrap gap-1.5 mt-3.5 pt-3 border-t border-slate-700/60">
              {karigarProfile.badges.map((b, idx) => (
                <span
                  key={idx}
                  className="text-[10px] bg-amber-400/10 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-full flex items-center gap-1 font-medium"
                >
                  <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Explainable Performance Metrics (Not an arbitrary black box score!) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-200">Explainable Verified Track Record:</span>
              <span className="text-[10px] text-slate-400 flex items-center gap-1">
                <Lock className="w-3 h-3 text-emerald-400" />
                Dual-Party Joint Signed History
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div className="bg-[#121A2B] border border-slate-800 rounded-xl p-2.5">
                <span className="text-[10px] text-slate-400 block">Completed Jobs</span>
                <span className="text-base font-mono font-bold text-amber-300">
                  {karigarProfile.metrics.totalJobsCompleted}
                </span>
                <span className="text-[9px] text-emerald-400 block mt-0.5">100% Verified</span>
              </div>
              <div className="bg-[#121A2B] border border-slate-800 rounded-xl p-2.5">
                <span className="text-[10px] text-slate-400 block">On-Time Delivery</span>
                <span className="text-base font-mono font-bold text-slate-200">
                  {karigarProfile.metrics.onTimeDeliveryRate}%
                </span>
                <span className="text-[9px] text-slate-400 block mt-0.5">Muhurat Reliable</span>
              </div>
              <div className="bg-[#121A2B] border border-slate-800 rounded-xl p-2.5">
                <span className="text-[10px] text-slate-400 block">Reconciliation Rate</span>
                <span className="text-base font-mono font-bold text-emerald-400">
                  {karigarProfile.metrics.jointReconciliationRate}%
                </span>
                <span className="text-[9px] text-slate-400 block mt-0.5">Mutual Signoff</span>
              </div>
              <div className="bg-[#121A2B] border border-slate-800 rounded-xl p-2.5">
                <span className="text-[10px] text-slate-400 block">Avg Variance</span>
                <span className="text-base font-mono font-bold text-amber-400">
                  ±{karigarProfile.metrics.avgWastageVariancePct}%
                </span>
                <span className="text-[9px] text-slate-400 block mt-0.5">Micro-Tolerance</span>
              </div>
            </div>
          </div>

          {/* Unified Multi-Jeweller Dashboard (Module 5 Feature 17) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Multi-Jeweller Consolidated Portfolio</span>
              </span>
              <span className="text-[10px] text-slate-400">Confidential to Artisan</span>
            </div>

            <div className="space-y-2">
              {karigarProfile.jewellerNetwork.map((jwl, i) => (
                <div
                  key={i}
                  className="bg-[#121A2B] border border-slate-800 rounded-xl p-3 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-200">{jwl.firmName}</span>
                      <span className="text-[9px] bg-slate-800 text-amber-400 px-1.5 py-0.5 rounded font-mono">
                        {jwl.status}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5">{jwl.city}</p>
                    <div className="flex items-center gap-3 mt-1 text-[10px] text-slate-400">
                      <span>Active Jobs: <strong className="text-amber-300 font-mono">{jwl.activeJobsCount}</strong></span>
                      <span>Settled: <strong className="text-slate-200 font-mono">{jwl.completedJobsCount}</strong></span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">Pending Payout</span>
                    <span className="font-mono font-bold text-emerald-400">
                      ₹{jwl.pendingPayout.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* QR Verification Modal Switcher */}
          <div className="p-3 bg-black/40 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <QrCode className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-200">Shareable QR Verification Token</p>
                <p className="text-[10px] text-slate-400">
                  Prospective jewellers scan to verify work history without seeing client rates
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowQrVerification(!showQrVerification)}
              className="bg-amber-500 text-slate-950 font-bold px-3 py-1.5 rounded-xl text-xs hover:bg-amber-400 transition-colors"
            >
              {showQrVerification ? 'Hide QR' : 'Show QR'}
            </button>
          </div>

          {/* Expanded QR Modal View */}
          {showQrVerification && (
            <div className="bg-[#121A2B] border border-amber-500/40 rounded-2xl p-4 flex flex-col items-center justify-center text-center space-y-3 animate-in zoom-in-95 duration-150">
              <div className="p-3 bg-white rounded-2xl shadow-xl">
                {/* SVG QR Code representation */}
                <svg className="w-36 h-36" viewBox="0 0 100 100">
                  <rect width="100" height="100" fill="white" />
                  {/* Outer corner squares */}
                  <rect x="10" y="10" width="25" height="25" fill="#0F172A" />
                  <rect x="15" y="15" width="15" height="15" fill="white" />
                  <rect x="18" y="18" width="9" height="9" fill="#D4AF37" />

                  <rect x="65" y="10" width="25" height="25" fill="#0F172A" />
                  <rect x="70" y="15" width="15" height="15" fill="white" />
                  <rect x="73" y="18" width="9" height="9" fill="#D4AF37" />

                  <rect x="10" y="65" width="25" height="25" fill="#0F172A" />
                  <rect x="15" y="70" width="15" height="15" fill="white" />
                  <rect x="18" y="73" width="9" height="9" fill="#D4AF37" />

                  {/* Inner data blocks */}
                  <rect x="42" y="15" width="6" height="6" fill="#0F172A" />
                  <rect x="52" y="25" width="6" height="6" fill="#0F172A" />
                  <rect x="42" y="42" width="16" height="16" fill="#0F172A" />
                  <rect x="46" y="46" width="8" height="8" fill="#D4AF37" />
                  <rect x="15" y="45" width="6" height="6" fill="#0F172A" />
                  <rect x="25" y="52" width="6" height="6" fill="#0F172A" />
                  <rect x="68" y="45" width="8" height="6" fill="#0F172A" />
                  <rect x="80" y="55" width="6" height="8" fill="#0F172A" />
                  <rect x="45" y="70" width="8" height="6" fill="#0F172A" />
                  <rect x="65" y="75" width="10" height="8" fill="#0F172A" />
                </svg>
              </div>

              <div>
                <p className="text-xs font-mono font-bold text-amber-400">
                  DID:SONASETU:IN:GJ:9021:RAMESH_SONI
                </p>
                <p className="text-[10px] text-slate-400 mt-1">
                  Cryptographically anchored on SonaSetu Trust Ledger. Valid through Nov 2027.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
