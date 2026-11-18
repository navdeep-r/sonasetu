import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { VOICE_SAMPLES } from '../../data/mockData';
import { soundEffects } from '../../utils/goldMath';
import { VoiceSimulationSample } from '../../types';
import { 
  Play, 
  Pause, 
  Sparkles, 
  Check, 
  ArrowRight, 
  MessageSquare, 
  FileText, 
  Headphones, 
  Languages,
  Scale
} from 'lucide-react';

export const VoiceAgentStudio: React.FC = () => {
  const { submitReturnWithEvidence, setSelectedJobId, setActiveTab } = useApp();
  
  const [selectedSample, setSelectedSample] = useState<VoiceSimulationSample>(VOICE_SAMPLES[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [isTranscribed, setIsTranscribed] = useState<boolean>(true);
  const [draftApplied, setDraftApplied] = useState<boolean>(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            soundEffects.playScanBlip();
            return 0;
          }
          return prev + 6;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlayback = () => {
    if (!isPlaying) {
      soundEffects.playTareBeep();
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  const handleApplyDraft = () => {
    soundEffects.playCoinChime();
    setDraftApplied(true);
    
    // Automatically submit to the referenced job
    submitReturnWithEvidence(selectedSample.extractedDraft.jobId, {
      finishedWeight: selectedSample.extractedDraft.finishedWeight,
      unusedGoldWeight: selectedSample.extractedDraft.unusedGoldWeight,
      scrapWeight: selectedSample.extractedDraft.scrapWeight,
      scalePhoto: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&q=80&w=480',
      voiceNoteId: selectedSample.id,
      karigarRemarks: `Voice Note (${selectedSample.language}): "${selectedSample.transcription}"`
    });

    setSelectedJobId(selectedSample.extractedDraft.jobId);
    setTimeout(() => {
      setActiveTab('reconciliation');
    }, 900);
  };

  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-[#121A2B] to-[#121A2B] border border-emerald-500/30 rounded-2xl p-4">
        <div className="flex items-center gap-2 text-emerald-400 mb-1">
          <Sparkles className="w-4 h-4 animate-spin" />
          <span className="text-xs font-bold uppercase tracking-wider">Agentic AI & Conversational Automation</span>
        </div>
        <h2 className="text-lg font-bold text-slate-100">WhatsApp & Regional Voice Note Parser</h2>
        <p className="text-xs text-slate-300 mt-1">
          Artisans in Rajkot, Zaveri Bazaar & Thrissur send voice notes in their native language. SonaSetu's AI extracts weights, checks agreements, and creates verified return drafts.
        </p>
      </div>

      {/* Voice Sample Selector Pills */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
          <Languages className="w-3.5 h-3.5 text-amber-400" />
          <span>Select Incoming Regional Voice Note:</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {VOICE_SAMPLES.map((sample) => (
            <button
              key={sample.id}
              onClick={() => {
                setSelectedSample(sample);
                setIsPlaying(false);
                setProgress(0);
                setDraftApplied(false);
                soundEffects.playTareBeep();
              }}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                selectedSample.id === sample.id
                  ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-md shadow-amber-500/10'
                  : 'bg-[#121A2B] border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200">{sample.language}</span>
                <span className="text-[10px] font-mono text-amber-400">{sample.duration}</span>
              </div>
              <p className="text-[11px] truncate mt-0.5 text-slate-300">{sample.speaker}</p>
            </button>
          ))}
        </div>
      </div>

      {/* WhatsApp Style Audio Player Card */}
      <div className="bg-[#121A2B] border border-amber-500/20 rounded-2xl p-4 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white shadow-md">
              <Headphones className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-200">{selectedSample.audioTitle}</h4>
              <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                <span>Received via WhatsApp</span>
                <span>•</span>
                <span className="font-mono">{selectedSample.duration}</span>
              </p>
            </div>
          </div>
          <span className="bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-[10px] font-semibold px-2 py-0.5 rounded-full">
            {selectedSample.language}
          </span>
        </div>

        {/* Audio Waveform Visualizer */}
        <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 flex items-center gap-3">
          <button
            onClick={togglePlayback}
            className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/25 active:scale-95 transition-transform"
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
          </button>

          {/* Animated Waveform bars */}
          <div className="flex-1 flex items-center gap-1 h-9 px-2 overflow-hidden">
            {[40, 75, 90, 60, 30, 85, 100, 45, 95, 60, 35, 70, 85, 40, 65, 90, 50, 80, 40, 95, 70, 30, 85, 55].map((h, i) => {
              const active = (i / 24) * 100 <= progress;
              return (
                <div
                  key={i}
                  style={{ height: `${isPlaying ? Math.max(15, (h * Math.sin((progress + i * 10) / 10) + 100) / 2) : h * 0.7}%` }}
                  className={`flex-1 rounded-full transition-all duration-100 ${
                    active ? 'bg-amber-400 shadow-sm shadow-amber-400/50' : 'bg-slate-700'
                  }`}
                />
              );
            })}
          </div>

          <span className="text-[10px] font-mono text-slate-400">
            {isPlaying ? `${Math.floor(progress / 7)}s` : selectedSample.duration}
          </span>
        </div>

        {/* Regional Audio Transcription */}
        <div className="bg-slate-900/60 rounded-xl p-3 border border-slate-800/70 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400">
            <span className="flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
              Regional Speech Transcript
            </span>
            <span className="text-emerald-400 text-[10px] font-mono">Whisper AI Indian Accent v3</span>
          </div>
          <p className="text-xs text-slate-200 italic font-serif leading-relaxed bg-black/40 p-2.5 rounded-lg border border-slate-800">
            "{selectedSample.transcription}"
          </p>
          <div className="text-[11px] text-slate-400">
            <span className="text-amber-400/80 font-medium">English Translation: </span>
            <span>{selectedSample.englishTranslation}</span>
          </div>
        </div>

        {/* Agentic Extraction JSON Preview */}
        <div className="bg-[#0B101D] border border-amber-500/30 rounded-xl p-3 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 font-bold text-amber-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Extracted Material Quantities</span>
            </div>
            <span className="text-[10px] font-mono bg-amber-400/10 text-amber-400 px-2 py-0.5 rounded border border-amber-400/30">
              Target Job: {selectedSample.extractedDraft.jobId}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Finished Ornament</span>
              <span className="text-sm font-mono font-bold text-amber-300">
                {selectedSample.extractedDraft.finishedWeight.toFixed(3)}g
              </span>
            </div>
            <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Unused Pure Gold</span>
              <span className="text-sm font-mono font-bold text-slate-200">
                {selectedSample.extractedDraft.unusedGoldWeight.toFixed(3)}g
              </span>
            </div>
            <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Recovered Scrap</span>
              <span className="text-sm font-mono font-bold text-emerald-400">
                {selectedSample.extractedDraft.scrapWeight.toFixed(3)}g
              </span>
            </div>
          </div>

          <p className="text-[10px] text-slate-400 italic">
            Remarks: "{selectedSample.extractedDraft.karigarRemarks}"
          </p>

          <button
            onClick={handleApplyDraft}
            disabled={draftApplied}
            className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg ${
              draftApplied
                ? 'bg-emerald-600 text-white'
                : 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 shadow-amber-500/20 active:scale-98'
            }`}
          >
            {draftApplied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Return Draft Created & Applied! Opening Recon...</span>
              </>
            ) : (
              <>
                <FileText className="w-4 h-4" />
                <span>Generate Verified Return Draft from Voice Note</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
