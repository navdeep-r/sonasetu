import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { soundEffects } from '../../utils/goldMath';
import { 
  Camera, 
  X, 
  CheckCircle2, 
  RotateCcw, 
  Zap, 
  Scan, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Cpu,
  Sliders
} from 'lucide-react';

interface ScaleCameraScannerModalProps {
  onCaptureComplete?: (weight: number, photoUrl: string) => void;
  targetWeightSuggestion?: number;
  title?: string;
}

export const ScaleCameraScannerModal: React.FC<ScaleCameraScannerModalProps> = ({
  onCaptureComplete,
  targetWeightSuggestion = 53.850,
  title = "Photo-Verified Scale Weighing"
}) => {
  const { cameraModalOpen, setCameraModalOpen, selectedJob, submitReturnWithEvidence } = useApp();

  const [currentScaleReading, setCurrentScaleReading] = useState<number>(targetWeightSuggestion);
  const [isScanning, setIsScanning] = useState<boolean>(true);
  const [isCaptured, setIsCaptured] = useState<boolean>(false);
  const [flashActive, setFlashActive] = useState<boolean>(false);
  const [ocrConfidence, setOcrConfidence] = useState<number>(99.8);
  const [activeTab, setActiveTab] = useState<'finished' | 'unused' | 'scrap'>('finished');
  
  // Weights state for return form
  const [weights, setWeights] = useState({
    finished: targetWeightSuggestion,
    unused: 4.800,
    scrap: 2.440
  });

  useEffect(() => {
    if (cameraModalOpen) {
      soundEffects.playTareBeep();
      setIsCaptured(false);
      setIsScanning(true);
    }
  }, [cameraModalOpen]);

  if (!cameraModalOpen) return null;

  const handleCapture = () => {
    soundEffects.playShutterClick();
    setFlashActive(true);
    setTimeout(() => setFlashActive(false), 150);
    setIsCaptured(true);
    setIsScanning(false);
  };

  const handleReset = () => {
    soundEffects.playTareBeep();
    setIsCaptured(false);
    setIsScanning(true);
  };

  const handleConfirmEvidence = () => {
    soundEffects.playScanBlip();
    if (onCaptureComplete) {
      onCaptureComplete(
        currentScaleReading,
        'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&q=80&w=480'
      );
    } else if (selectedJob) {
      // Direct return submission
      submitReturnWithEvidence(selectedJob.id, {
        finishedWeight: weights.finished,
        unusedGoldWeight: weights.unused,
        scrapWeight: weights.scrap,
        scalePhoto: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&q=80&w=480',
        karigarRemarks: 'Weight verified on calibrated Mettler Toledo digital scale.'
      });
    }
    setCameraModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#0D121F] border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-3.5 bg-[#121A2B] border-b border-amber-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-100">{title}</h3>
              <p className="text-[10px] text-amber-400/80">AI Computer Vision Scale OCR</p>
            </div>
          </div>
          <button
            onClick={() => setCameraModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Viewfinder Area */}
        <div className="relative bg-black h-64 sm:h-72 flex items-center justify-center overflow-hidden border-b border-slate-800">
          {/* Flash animation */}
          {flashActive && <div className="absolute inset-0 bg-white z-40 animate-out fade-out duration-150"></div>}

          {/* Background simulated weighing pan */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-black opacity-95 flex flex-col items-center justify-center">
            {/* Circular Stainless Steel Pan */}
            <div className="w-44 h-44 rounded-full border border-slate-700/80 bg-gradient-to-tr from-slate-800 via-slate-700 to-slate-600 shadow-2xl flex items-center justify-center relative">
              {/* Gold Bar / Ornament representation */}
              <div className="w-20 h-12 bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-300 rounded-md shadow-lg border border-yellow-200 flex flex-col items-center justify-center text-[9px] font-bold text-slate-950 uppercase tracking-wider rotate-6">
                <span>916 GOLD</span>
                <span className="text-[8px] opacity-75 font-mono">{currentScaleReading.toFixed(3)}g</span>
              </div>
            </div>
          </div>

          {/* Scanner Optical Reticle */}
          <div className="absolute inset-4 border border-dashed border-amber-500/40 rounded-2xl pointer-events-none flex flex-col justify-between p-3">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-mono text-emerald-400 bg-black/60 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                OCR READY
              </span>
              <span className="text-[10px] font-mono text-amber-400 bg-black/60 px-2 py-0.5 rounded border border-amber-500/30">
                1080p 60fps
              </span>
            </div>

            {/* Simulated 7-Segment Digital Scale LCD Indicator */}
            <div className="self-center bg-[#07130A] border-2 border-emerald-500/60 rounded-xl px-4 py-2 shadow-[0_0_20px_rgba(16,185,129,0.3)] text-center flex flex-col items-center">
              <span className="text-[9px] text-emerald-400 font-mono tracking-widest uppercase">
                METTLER TOLEDO • CALIBRATED
              </span>
              <div className="text-3xl font-mono font-black text-emerald-300 tracking-wider flex items-baseline gap-1 my-0.5">
                <span>{currentScaleReading.toFixed(3)}</span>
                <span className="text-sm font-sans font-medium text-emerald-400">g</span>
              </div>
              <span className="text-[9px] text-emerald-500/80 font-mono">TARE: 0.000g | STABLE</span>
            </div>

            <div className="flex justify-between items-end text-[9px] text-slate-400 font-mono bg-black/60 px-2 py-1 rounded">
              <div className="flex items-center gap-1">
                <MapPin className="w-2.5 h-2.5 text-amber-400" />
                <span>Zaveri Bazaar, Mumbai</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-2.5 h-2.5 text-amber-400" />
                <span>{new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* OCR Result & Manual Adjustment Controls */}
        <div className="p-4 space-y-3 overflow-y-auto">
          {/* Quick preset weight buttons */}
          <div>
            <label className="text-[11px] font-medium text-slate-300 flex items-center justify-between mb-1.5">
              <span>Simulated Scale Weight Inputs:</span>
              <span className="text-[10px] text-amber-400">Click to test presets</span>
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {[53.850, 45.250, 18.900, 62.400].map(val => (
                <button
                  key={val}
                  onClick={() => {
                    setCurrentScaleReading(val);
                    setWeights(w => ({ ...w, [activeTab]: val }));
                    soundEffects.playTareBeep();
                  }}
                  className={`py-1 px-2 text-xs font-mono rounded-lg border transition-all ${
                    currentScaleReading === val
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                      : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {val.toFixed(3)}g
                </button>
              ))}
            </div>
          </div>

          {/* Extracted Card */}
          <div className="bg-[#121A2B] border border-amber-500/20 rounded-2xl p-3 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5 text-amber-400" />
                Vision OCR Confidence
              </span>
              <span className="text-emerald-400 font-mono font-bold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                {ocrConfidence}% Verified
              </span>
            </div>

            <div className="flex items-center justify-between bg-black/40 p-2.5 rounded-xl border border-slate-800">
              <div>
                <p className="text-[10px] text-slate-400">Extracted Net Weight</p>
                <p className="text-xl font-mono font-bold text-amber-300">
                  {currentScaleReading.toFixed(3)} <span className="text-xs text-slate-400 font-normal">grams</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-400">Purity Target</p>
                <p className="text-xs font-semibold text-slate-200">{selectedJob?.purity || '22K (91.6%)'}</p>
              </div>
            </div>
          </div>

          {/* Three weight breakdown inputs (for full return submission) */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800">
              <label className="text-[9px] text-slate-400 block mb-0.5">Finished Wt (g)</label>
              <input
                type="number"
                step="0.001"
                value={weights.finished}
                onChange={(e) => setWeights({ ...weights, finished: parseFloat(e.target.value) || 0 })}
                className="w-full bg-slate-950 border border-slate-700 rounded px-1.5 py-1 text-xs font-mono text-amber-300 focus:outline-none focus:border-amber-400"
              />
            </div>
            <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800">
              <label className="text-[9px] text-slate-400 block mb-0.5">Unused Gold (g)</label>
              <input
                type="number"
                step="0.001"
                value={weights.unused}
                onChange={(e) => setWeights({ ...weights, unused: parseFloat(e.target.value) || 0 })}
                className="w-full bg-slate-950 border border-slate-700 rounded px-1.5 py-1 text-xs font-mono text-slate-200 focus:outline-none focus:border-amber-400"
              />
            </div>
            <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800">
              <label className="text-[9px] text-slate-400 block mb-0.5">Scrap / Chhol (g)</label>
              <input
                type="number"
                step="0.001"
                value={weights.scrap}
                onChange={(e) => setWeights({ ...weights, scrap: parseFloat(e.target.value) || 0 })}
                className="w-full bg-slate-950 border border-slate-700 rounded px-1.5 py-1 text-xs font-mono text-emerald-400 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-1">
            {!isCaptured ? (
              <button
                onClick={handleCapture}
                className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 active:scale-98 transition-transform"
              >
                <Camera className="w-4 h-4" />
                <span>Capture & Run Scale OCR</span>
              </button>
            ) : (
              <>
                <button
                  onClick={handleReset}
                  className="px-3.5 py-3 rounded-xl border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1.5 text-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake</span>
                </button>
                <button
                  onClick={handleConfirmEvidence}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 active:scale-98 transition-transform text-xs sm:text-sm"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Photo Evidence & Log</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
