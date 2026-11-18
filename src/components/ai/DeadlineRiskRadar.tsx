import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Flame, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Calendar,
  Users
} from 'lucide-react';

export const DeadlineRiskRadar: React.FC = () => {
  const { jobs, setSelectedJobId, setActiveTab } = useApp();

  const urgentJobs = jobs.filter(j => j.status !== 'settled');

  return (
    <div className="bg-[#121A2B] border border-amber-500/20 rounded-2xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
            <Flame className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              AI Muhurat Deadline Risk Radar
            </h3>
            <p className="text-[10px] text-amber-400/80">Wedding & Auspicious Date Predictor</p>
          </div>
        </div>
        <span className="text-[10px] font-mono bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded border border-rose-500/30">
          2 Orders at Risk
        </span>
      </div>

      <div className="space-y-2">
        {urgentJobs.slice(0, 2).map((job) => (
          <div
            key={job.id}
            onClick={() => {
              setSelectedJobId(job.id);
            }}
            className="p-3 bg-black/40 rounded-xl border border-slate-800 space-y-2 cursor-pointer hover:border-amber-500/40 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono text-amber-400 font-bold">{job.id}</span>
                <h4 className="text-xs font-bold text-slate-100">{job.title}</h4>
                <p className="text-[10px] text-amber-300/90 flex items-center gap-1 mt-0.5">
                  <Calendar className="w-3 h-3" />
                  <span>{job.muhuratEvent || 'Wedding Order'}</span>
                </p>
              </div>

              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                job.daysRemaining <= 2
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse'
                  : 'bg-amber-500/20 text-amber-300'
              }`}>
                {job.daysRemaining === 0 ? 'Today' : `${job.daysRemaining}d left`}
              </span>
            </div>

            <div className="bg-slate-900/80 p-2 rounded-lg text-[10px] text-slate-300 border border-slate-800 flex items-center justify-between">
              <span className="flex items-center gap-1 text-amber-400">
                <Sparkles className="w-3 h-3" />
                <span>AI Recommendation: Pre-reserve hallmarking token</span>
              </span>
              <span className="text-slate-400 font-mono">92% On-Track</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
