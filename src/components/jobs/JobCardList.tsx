import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { JobCard, JobStatus } from '../../types';
import { 
  Sparkles, 
  Clock, 
  MapPin, 
  ChevronRight, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Calendar,
  Flame,
  Search,
  Filter
} from 'lucide-react';

export const JobCardList: React.FC<{ onSelectJob: (job: JobCard) => void }> = ({ onSelectJob }) => {
  const { jobs, persona, setSelectedJobId, setNewJobModalOpen } = useApp();
  const [filter, setFilter] = useState<'all' | 'in_progress' | 'returned' | 'settled'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredJobs = jobs.filter((job) => {
    const matchesFilter = filter === 'all' ? true : job.status === filter;
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.karigarName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-3.5">
      {/* Search and Action Bar */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search job ID, ornament, artisan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#121A2B] border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs">
        {(['all', 'in_progress', 'returned', 'settled'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap capitalize transition-all ${
              filter === tab
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm shadow-amber-500/30'
                : 'bg-[#121A2B] text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            {tab === 'all' ? 'All Active Jobs' : tab.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Job Card List */}
      <div className="space-y-3">
        {filteredJobs.length === 0 ? (
          <div className="text-center py-10 bg-[#121A2B] rounded-2xl border border-slate-800 p-6">
            <AlertCircle className="w-8 h-8 text-slate-500 mx-auto mb-2" />
            <p className="text-xs text-slate-300 font-semibold">No matching jobs found</p>
            <p className="text-[11px] text-slate-500 mt-1">Try changing filters or create a new job card</p>
          </div>
        ) : (
          filteredJobs.map((job) => {
            const hasAnomaly = job.returnData?.anomalyFlagged;
            return (
              <div
                key={job.id}
                onClick={() => {
                  setSelectedJobId(job.id);
                  onSelectJob(job);
                }}
                className={`group bg-gradient-to-b from-[#131B2D] to-[#0E1524] rounded-2xl p-4 border transition-all duration-200 cursor-pointer active:scale-[0.99] relative overflow-hidden ${
                  hasAnomaly
                    ? 'border-rose-500/40 hover:border-rose-500 shadow-md shadow-rose-950/40'
                    : 'border-amber-500/20 hover:border-amber-500/40 hover:shadow-lg hover:shadow-amber-500/10'
                }`}
              >
                {/* Urgent Muhurat Banner */}
                {job.muhuratEvent && (
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80 text-[10px]">
                    <span className="flex items-center gap-1 text-amber-400 font-medium">
                      <Flame className="w-3 h-3 text-amber-500" />
                      <span>{job.muhuratEvent}</span>
                    </span>
                    <span className={`px-2 py-0.5 rounded font-mono font-bold ${
                      job.daysRemaining <= 2
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : 'bg-amber-500/10 text-amber-300'
                    }`}>
                      {job.daysRemaining === 0 ? 'Due Today' : `${job.daysRemaining} days left`}
                    </span>
                  </div>
                )}

                {/* Title & Status */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-amber-400">{job.id}</span>
                      <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-mono">
                        {job.purity}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-100 mt-1 group-hover:text-amber-300 transition-colors">
                      {job.title}
                    </h3>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${
                    hasAnomaly
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                      : job.status === 'settled'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : job.status === 'returned'
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {hasAnomaly ? 'Wastage Anomaly' : job.status.replace('_', ' ')}
                  </span>
                </div>

                {/* Weights Grid */}
                <div className="grid grid-cols-3 gap-2 my-3 p-2.5 bg-black/40 rounded-xl border border-slate-800 text-center">
                  <div>
                    <span className="text-[9px] text-slate-400 block">Issued Gross</span>
                    <span className="text-xs font-mono font-bold text-amber-300">{job.issuedGrossWeight.toFixed(3)}g</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block">Target Wt</span>
                    <span className="text-xs font-mono font-bold text-slate-200">{job.targetOrnamentWeight.toFixed(3)}g</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block">Agreed Ghat</span>
                    <span className="text-xs font-mono font-bold text-emerald-400">{job.agreedGhatLimitPct}%</span>
                  </div>
                </div>

                {/* Footer: Custody & Dual Signatures */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
                  <div className="flex items-center gap-1.5 truncate max-w-[200px]">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">{job.custodyHolder}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Dual signature indicator */}
                    <span className="text-[10px] text-slate-400">Dual-Sign:</span>
                    <span
                      title="Jeweller Signoff"
                      className={`w-2.5 h-2.5 rounded-full ${job.signatures.jewellerSigned ? 'bg-emerald-400' : 'bg-slate-600'}`}
                    />
                    <span
                      title="Karigar Signoff"
                      className={`w-2.5 h-2.5 rounded-full ${job.signatures.karigarSigned ? 'bg-emerald-400' : 'bg-slate-600'}`}
                    />
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors ml-1" />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
