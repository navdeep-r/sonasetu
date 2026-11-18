import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { JewelleryType, GoldPurity } from '../../types';
import { soundEffects } from '../../utils/goldMath';
import { 
  X, 
  Plus, 
  Camera, 
  Sparkles, 
  Scale, 
  Calendar, 
  User, 
  Clock, 
  DollarSign,
  CheckCircle2
} from 'lucide-react';

export const NewJobModal: React.FC = () => {
  const { newJobModalOpen, setNewJobModalOpen, createJob, karigarProfile } = useApp();

  const [title, setTitle] = useState('22K Royal Peacock Kundan Choker');
  const [type, setType] = useState<JewelleryType>('Bridal Choker');
  const [purity, setPurity] = useState<GoldPurity>('22K (91.6%)');
  const [issuedWeight, setIssuedWeight] = useState<number>(42.500);
  const [targetWeight, setTargetWeight] = useState<number>(36.000);
  const [ghatLimit, setGhatLimit] = useState<number>(1.20);
  const [makingCharge, setMakingCharge] = useState<number>(550);
  const [advance, setAdvance] = useState<number>(5000);
  const [deadline, setDeadline] = useState('28 Nov 2026');
  const [muhuratEvent, setMuhuratEvent] = useState('Ananya Wedding Reception (30 Nov)');

  if (!newJobModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEffects.playShutterClick();

    createJob({
      title,
      type,
      purity,
      jewellerId: 'JWL-01',
      jewellerName: 'Rajesh Zaveri',
      jewellerFirm: 'Zaveri & Sons Jewellers',
      jewellerCity: 'Zaveri Bazaar, Mumbai',
      karigarId: karigarProfile.id,
      karigarName: karigarProfile.fullName,
      karigarWorkshop: karigarProfile.workshopName,
      karigarCity: karigarProfile.city,
      issuedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      deadline,
      muhuratEvent,
      urgency: 'high',
      issuedGrossWeight: issuedWeight,
      targetOrnamentWeight: targetWeight,
      agreedGhatLimitPct: ghatLimit,
      makingChargePerGram: makingCharge,
      advancePaid: advance,
      issuedScalePhoto: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&q=80&w=480',
      issuedScaleReading: issuedWeight,
      custodyHolder: `${karigarProfile.fullName} (${karigarProfile.workshopName})`,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-[#0D121F] border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 bg-[#121A2B] border-b border-amber-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-100">Create Digital Job Card</h3>
              <p className="text-[10px] text-amber-400/80">Issue Gold with Photo Scale Evidence</p>
            </div>
          </div>
          <button
            onClick={() => setNewJobModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 space-y-3.5 overflow-y-auto">
          {/* Title */}
          <div>
            <label className="text-[11px] font-medium text-slate-300 block mb-1">Ornament Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full bg-[#121A2B] border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Type & Purity */}
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="text-[11px] font-medium text-slate-300 block mb-1">Jewellery Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as JewelleryType)}
                className="w-full bg-[#121A2B] border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
              >
                <option value="Bridal Choker">Bridal Choker</option>
                <option value="Antique Temple Haram">Antique Temple Haram</option>
                <option value="Kundan Bangles">Kundan Bangles</option>
                <option value="Solitaire Diamond Ring">Solitaire Diamond Ring</option>
                <option value="Traditional Mangalsutra">Traditional Mangalsutra</option>
                <option value="Handcrafted Kada">Handcrafted Kada</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-medium text-slate-300 block mb-1">Gold Purity</label>
              <select
                value={purity}
                onChange={(e) => setPurity(e.target.value as GoldPurity)}
                className="w-full bg-[#121A2B] border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-400 font-mono"
              >
                <option value="24K (99.9%)">24K (99.9%) Bullion</option>
                <option value="22K (91.6%)">22K (91.6%) Hallmarked</option>
                <option value="18K (75.0%)">18K (75.0%) Diamond Alloy</option>
                <option value="14K (58.5%)">14K (58.5%) Export</option>
              </select>
            </div>
          </div>

          {/* Weights */}
          <div className="grid grid-cols-2 gap-2.5 bg-black/40 p-3 rounded-2xl border border-slate-800">
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Issued Gross Weight (g)</label>
              <input
                type="number"
                step="0.001"
                value={issuedWeight}
                onChange={(e) => setIssuedWeight(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold text-amber-300 focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Target Net Weight (g)</label>
              <input
                type="number"
                step="0.001"
                value={targetWeight}
                onChange={(e) => setTargetWeight(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold text-slate-200 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Agreed Terms: Ghat limit & Making charge */}
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Agreed Ghat (%)</label>
              <input
                type="number"
                step="0.05"
                value={ghatLimit}
                onChange={(e) => setGhatLimit(parseFloat(e.target.value) || 0)}
                className="w-full bg-[#121A2B] border border-slate-700 rounded-lg px-2 py-1.5 text-xs font-mono text-emerald-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Making (₹/g)</label>
              <input
                type="number"
                value={makingCharge}
                onChange={(e) => setMakingCharge(parseFloat(e.target.value) || 0)}
                className="w-full bg-[#121A2B] border border-slate-700 rounded-lg px-2 py-1.5 text-xs font-mono text-slate-200 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Advance (₹)</label>
              <input
                type="number"
                value={advance}
                onChange={(e) => setAdvance(parseFloat(e.target.value) || 0)}
                className="w-full bg-[#121A2B] border border-slate-700 rounded-lg px-2 py-1.5 text-xs font-mono text-amber-300 focus:outline-none"
              />
            </div>
          </div>

          {/* Muhurat Deadline */}
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Delivery Deadline</label>
              <input
                type="text"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full bg-[#121A2B] border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Muhurat Occasion</label>
              <input
                type="text"
                value={muhuratEvent}
                onChange={(e) => setMuhuratEvent(e.target.value)}
                className="w-full bg-[#121A2B] border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none"
              />
            </div>
          </div>

          {/* Assigned Karigar preview */}
          <div className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <img
                src={karigarProfile.avatarUrl}
                alt="Karigar"
                className="w-7 h-7 rounded-full object-cover border border-amber-500/40"
              />
              <div>
                <span className="font-semibold text-slate-200 block">{karigarProfile.fullName}</span>
                <span className="text-[10px] text-emerald-400">Trust Passport 98/100 • Zero Default</span>
              </div>
            </div>
            <span className="text-[10px] text-amber-400 font-mono">Assigned</span>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 active:scale-98 transition-transform text-xs sm:text-sm"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Generate Digital Job Card & Issue Gold</span>
          </button>
        </form>
      </div>
    </div>
  );
};
