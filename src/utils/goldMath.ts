import { GoldPurity } from '../types';

export const GOLD_PURITY_MAP: Record<GoldPurity, number> = {
  '24K (99.9%)': 0.999,
  '22K (91.6%)': 0.916,
  '18K (75.0%)': 0.750,
  '14K (58.5%)': 0.585,
};

// Current reference gold rate per gram in INR (24K fine bullion)
export const CURRENT_24K_GOLD_RATE_INR = 8350;

/**
 * Normalizes gross weight of an alloy to 24K Fine Gold Equivalent (FGE)
 */
export function toFineGold(grossGrams: number, purity: GoldPurity): number {
  const factor = GOLD_PURITY_MAP[purity] || 0.916;
  return Number((grossGrams * factor).toFixed(3));
}

export interface ReconciliationResult {
  issuedGross: number;
  finishedWeight: number;
  unusedWeight: number;
  scrapWeight: number;
  totalAccounted: number;
  actualProcessLoss: number;
  actualProcessLossPct: number;
  allowableLossGrams: number;
  varianceGrams: number;
  isWithinLimit: boolean;
  fineGoldLossGrams: number;
  goldAdjustmentRupees: number;
  explanation: string;
}

export function computeJobReconciliation(
  issuedGross: number,
  finished: number,
  unused: number,
  scrap: number,
  agreedLimitPct: number,
  purity: GoldPurity
): ReconciliationResult {
  const totalAccounted = Number((finished + unused + scrap).toFixed(3));
  const actualProcessLoss = Number((issuedGross - totalAccounted).toFixed(3));
  const actualProcessLossPct = issuedGross > 0 ? Number(((actualProcessLoss / issuedGross) * 100).toFixed(2)) : 0;
  
  const allowableLossGrams = Number(((agreedLimitPct / 100) * issuedGross).toFixed(3));
  const varianceGrams = Number((actualProcessLoss - allowableLossGrams).toFixed(3));
  const isWithinLimit = varianceGrams <= 0.005; // 5mg rounding tolerance

  const fineGoldLossGrams = toFineGold(actualProcessLoss, purity);
  
  // Financial adjustment based on variance: if variance > 0, artisan pays or gold is debited
  const purityFactor = GOLD_PURITY_MAP[purity] || 0.916;
  const effectiveRate = CURRENT_24K_GOLD_RATE_INR * purityFactor;
  const goldAdjustmentRupees = Math.round(varianceGrams * effectiveRate);

  let explanation = '';
  if (isWithinLimit) {
    explanation = `Clean reconciliation: Actual process loss of ${actualProcessLoss.toFixed(3)}g (${actualProcessLossPct}%) is well within agreed limit of ${agreedLimitPct}% (${allowableLossGrams.toFixed(3)}g).`;
  } else {
    explanation = `Discrepancy alert: Actual process loss of ${actualProcessLoss.toFixed(3)}g (${actualProcessLossPct}%) exceeds agreed limit of ${agreedLimitPct}% by ${varianceGrams.toFixed(3)}g (₹${Math.abs(goldAdjustmentRupees).toLocaleString('en-IN')}).`;
  }

  return {
    issuedGross,
    finishedWeight: finished,
    unusedWeight: unused,
    scrapWeight: scrap,
    totalAccounted,
    actualProcessLoss,
    actualProcessLossPct,
    allowableLossGrams,
    varianceGrams,
    isWithinLimit,
    fineGoldLossGrams,
    goldAdjustmentRupees,
    explanation,
  };
}

/**
 * Evaluates whether wastage is an anomaly compared to this specific artisan's historical craft range
 */
export function evaluateWastageAnomaly(
  recordedWastagePct: number,
  jewelleryType: string,
  benchmarkRange: { min: number; max: number; avg: number }
) {
  const isAboveRange = recordedWastagePct > benchmarkRange.max;
  const isBelowRange = recordedWastagePct < benchmarkRange.min;
  const isAbnormal = isAboveRange;

  return {
    isAnomaly: isAbnormal,
    recordedWastagePct,
    historicalRange: `${benchmarkRange.min.toFixed(2)}% – ${benchmarkRange.max.toFixed(2)}% (Avg: ${benchmarkRange.avg.toFixed(2)}%)`,
    deviation: isAboveRange
      ? `+${(recordedWastagePct - benchmarkRange.max).toFixed(2)}% higher than typical range for ${jewelleryType}`
      : `Within expected craftsmanship tolerance`,
    aiRecommendation: isAboveRange
      ? `AI Suggestion: Before approving final settlement, review scrap recovery breakdown (Tukda vs. Chhol dust) and verify weighing scale tare snapshot.`
      : `AI Suggestion: Metrics match artisan's proven craftsmanship. Safe to approve dual-party settlement.`,
    confidenceScore: 94,
  };
}

// Audio UI synthesizer using Web Audio API
class AudioSynthesizer {
  private ctx: AudioContext | null = null;

  private getContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  playTareBeep() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch {
      // Audio not supported or blocked
    }
  }

  playShutterClick() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // Audio not supported
    }
  }

  playCoinChime() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const freqs = [880, 1320, 1760];
      freqs.forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, ctx.currentTime + idx * 0.06);
        gain.gain.setValueAtTime(0.08, ctx.currentTime + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.06 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.06);
        osc.stop(ctx.currentTime + idx * 0.06 + 0.35);
      });
    } catch {
      // Audio not supported
    }
  }

  playScanBlip() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1040, ctx.currentTime + 0.07);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.07);
    } catch {
      // Audio not supported
    }
  }
}

export const soundEffects = new AudioSynthesizer();
