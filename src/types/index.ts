export type Persona = 'jeweller' | 'karigar';

export type JewelleryType =
  | 'Bridal Choker'
  | 'Antique Temple Haram'
  | 'Kundan Bangles'
  | 'Solitaire Diamond Ring'
  | 'Traditional Mangalsutra'
  | 'Filigree Earrings'
  | 'Handcrafted Kada';

export type GoldPurity = '24K (99.9%)' | '22K (91.6%)' | '18K (75.0%)' | '14K (58.5%)';

export type JobStatus =
  | 'issued'
  | 'in_progress'
  | 'returned'
  | 'reconciled'
  | 'settled'
  | 'disputed';

export interface DualSignature {
  jewellerSigned: boolean;
  jewellerTimestamp?: string;
  jewellerOtpVerified?: boolean;
  karigarSigned: boolean;
  karigarTimestamp?: string;
  karigarOtpVerified?: boolean;
}

export interface ReturnData {
  finishedWeight: number;       // Grams
  unusedGoldWeight: number;     // Grams
  scrapWeight: number;          // Grams
  actualLoss: number;           // Grams (Calculated: Issued - Finished - Unused - Scrap)
  actualLossPct: number;        // % of issued gold
  fineGoldLoss: number;         // Fine 24K equivalent loss
  scalePhoto?: string;
  voiceNoteId?: string;
  karigarRemarks?: string;
  anomalyFlagged: boolean;
  anomalyDetails?: {
    recordedWastagePct: number;
    historicalRange: string;
    deviationMessage: string;
    aiRecommendation: string;
    confidenceScore: number;
  };
}

export interface SettlementBreakdown {
  id: string;
  calculatedAt: string;
  grossLabourCharges: number;   // Making charges based on finished weight
  goldVarianceGrams: number;     // Extra loss or surplus vs agreed limit
  goldAdjustmentRupees: number;  // Adjusted at current MCX gold rate
  advanceDeducted: number;       // Advance already taken
  netPayableToKarigar: number;   // Final amount
  escrowStatus: 'held_in_escrow' | 'released_to_bank' | 'disputed_hold';
  gstVoucherNo: string;
  hsnCode: string;               // e.g., 7113
}

export interface JobCard {
  id: string;
  orderNumber: string;
  title: string;
  type: JewelleryType;
  purity: GoldPurity;
  jewellerId: string;
  jewellerName: string;
  jewellerFirm: string;
  jewellerCity: string;
  karigarId: string;
  karigarName: string;
  karigarWorkshop: string;
  karigarCity: string;
  issuedDate: string;
  deadline: string;
  muhuratEvent?: string;
  daysRemaining: number;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  
  // Weights (all in grams with 3 decimal precision)
  issuedGrossWeight: number;
  targetOrnamentWeight: number;
  agreedGhatLimitPct: number;     // Max allowable process loss % (e.g. 1.20%)
  makingChargePerGram: number;    // In INR (₹)
  advancePaid: number;            // In INR (₹)
  
  issuedScalePhoto: string;
  issuedScaleReading: number;
  custodyHolder: string;          // Current location / holder
  status: JobStatus;
  
  signatures: DualSignature;
  returnData?: ReturnData;
  settlement?: SettlementBreakdown;
  
  timeline: Array<{
    timestamp: string;
    event: string;
    actor: string;
    evidenceType?: 'scale_photo' | 'voice_note' | 'digital_sign' | 'escrow_release';
    note?: string;
  }>;
}

export interface KarigarProfile {
  id: string;
  fullName: string;
  workshopName: string;
  city: string;
  state: string;
  phone: string;
  avatarUrl: string;
  experienceYears: number;
  primarySpecialty: string;
  badges: string[];
  metrics: {
    totalJobsCompleted: number;
    lifetimeFineGoldGrams: number;
    onTimeDeliveryRate: number;     // Percentage (e.g., 96.4%)
    jointReconciliationRate: number;// Percentage (e.g., 99.2%)
    avgWastageVariancePct: number;  // Avg difference from expected (+/- 0.04%)
    trustScore: number;             // Out of 100
  };
  jewellerNetwork: Array<{
    firmName: string;
    city: string;
    activeJobsCount: number;
    completedJobsCount: number;
    lifetimeDisbursed: number;
    pendingPayout: number;
    status: 'Verified Partner' | 'Preferred Master';
  }>;
  historicalWastageBenchmarks: Record<string, { min: number; max: number; avg: number }>;
}

export interface ScrapBatch {
  id: string;
  karigarId: string;
  karigarName: string;
  scrapType: 'Solid Cutting (Tukda)' | 'Filing Dust (Chhol)' | 'Acid/Buffing Silt (Rada)';
  weightGrams: number;
  estimatedPurityPct: number;
  fineGoldEquivalentGrams: number;
  collectedDate: string;
  refinerStatus: 'In Vault' | 'Batched for Assay' | 'With Refiner' | 'Melted & Credited';
  batchReference: string;
}

export interface VoiceSimulationSample {
  id: string;
  language: 'Gujarati' | 'Hindi' | 'English';
  audioTitle: string;
  speaker: string;
  duration: string;
  transcription: string;
  englishTranslation: string;
  extractedDraft: {
    jobId: string;
    finishedWeight: number;
    unusedGoldWeight: number;
    scrapWeight: number;
    karigarRemarks: string;
  };
}
