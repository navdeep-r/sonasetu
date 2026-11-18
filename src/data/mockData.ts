import { JobCard, KarigarProfile, ScrapBatch, VoiceSimulationSample } from '../types';

export const INITIAL_KARIGAR_PROFILE: KarigarProfile = {
  id: 'KRG-9021',
  fullName: 'Ramesh Babubhai Soni',
  workshopName: 'Shreeji Fine Art Goldsmiths',
  city: 'Rajkot',
  state: 'Gujarat',
  phone: '+91 98250 44129',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=240',
  experienceYears: 24,
  primarySpecialty: 'Master Hand-Filigree & Kundan Setting',
  badges: [
    'Verified Master Artisan',
    'Zero-Default Custodian',
    'Zaveri Guild Certified 2026',
    'Micro-Tolerance Craftsmanship',
    'Muhurat Reliable'
  ],
  metrics: {
    totalJobsCompleted: 126,
    lifetimeFineGoldGrams: 4892.45,
    onTimeDeliveryRate: 96.8,
    jointReconciliationRate: 99.2,
    avgWastageVariancePct: 0.03,
    trustScore: 98,
  },
  jewellerNetwork: [
    {
      firmName: 'Zaveri & Sons Jewellers',
      city: 'Zaveri Bazaar, Mumbai',
      activeJobsCount: 2,
      completedJobsCount: 64,
      lifetimeDisbursed: 1420500,
      pendingPayout: 18500,
      status: 'Preferred Master',
    },
    {
      firmName: 'Tanishq Heritage Atelier',
      city: 'Bandra, Mumbai',
      activeJobsCount: 1,
      completedJobsCount: 42,
      lifetimeDisbursed: 980000,
      pendingPayout: 32000,
      status: 'Verified Partner',
    },
    {
      firmName: 'Kalyan Jewellers Craft Division',
      city: 'Rajkot Main Market',
      activeJobsCount: 0,
      completedJobsCount: 20,
      lifetimeDisbursed: 450000,
      pendingPayout: 0,
      status: 'Verified Partner',
    }
  ],
  historicalWastageBenchmarks: {
    'Bridal Choker': { min: 0.90, max: 1.30, avg: 1.10 },
    'Antique Temple Haram': { min: 0.80, max: 1.25, avg: 1.02 },
    'Kundan Bangles': { min: 1.10, max: 1.60, avg: 1.35 },
    'Solitaire Diamond Ring': { min: 0.40, max: 0.75, avg: 0.55 },
    'Traditional Mangalsutra': { min: 0.50, max: 0.90, avg: 0.68 },
    'Filigree Earrings': { min: 1.20, max: 1.80, avg: 1.48 },
    'Handcrafted Kada': { min: 0.70, max: 1.10, avg: 0.88 },
  }
};

export const INITIAL_JOB_CARDS: JobCard[] = [
  {
    id: 'JOB-2026-081',
    orderNumber: 'ORD-ZS-8891',
    title: '22K Floral Meenakari Bridal Choker',
    type: 'Bridal Choker',
    purity: '22K (91.6%)',
    jewellerId: 'JWL-01',
    jewellerName: 'Rajesh Zaveri',
    jewellerFirm: 'Zaveri & Sons Jewellers',
    jewellerCity: 'Zaveri Bazaar, Mumbai',
    karigarId: 'KRG-9021',
    karigarName: 'Ramesh Babubhai Soni',
    karigarWorkshop: 'Shreeji Fine Art Goldsmiths',
    karigarCity: 'Rajkot, Gujarat',
    issuedDate: '14 Nov 2026',
    deadline: '22 Nov 2026',
    muhuratEvent: 'Pooja & Sameer Wedding Muhurat (24 Nov)',
    daysRemaining: 4,
    urgency: 'high',
    issuedGrossWeight: 45.250,
    targetOrnamentWeight: 38.500,
    agreedGhatLimitPct: 1.20,
    makingChargePerGram: 520,
    advancePaid: 8000,
    issuedScalePhoto: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&q=80&w=480',
    issuedScaleReading: 45.250,
    custodyHolder: 'Ramesh B. Soni (Rajkot Workshop)',
    status: 'in_progress',
    signatures: {
      jewellerSigned: true,
      jewellerTimestamp: '14 Nov 2026, 11:32 AM',
      jewellerOtpVerified: true,
      karigarSigned: true,
      karigarTimestamp: '14 Nov 2026, 03:15 PM',
      karigarOtpVerified: true,
    },
    timeline: [
      {
        timestamp: '14 Nov 2026, 11:30 AM',
        event: 'Gold Bar Weighed & Photo-Logged',
        actor: 'Rajesh Zaveri (Jeweller)',
        evidenceType: 'scale_photo',
        note: 'Mettler Toledo Scale Reading: 45.250g (22K 916 Hallmarked bar).'
      },
      {
        timestamp: '14 Nov 2026, 03:15 PM',
        event: 'Physical Delivery & Dual Signature Confirmed',
        actor: 'Ramesh Soni (Karigar)',
        evidenceType: 'digital_sign',
        note: 'Karigar received 45.250g in sealed security pouch with QR token.'
      },
      {
        timestamp: '16 Nov 2026, 05:40 PM',
        event: 'Enamel & Stone Cavities Prepared',
        actor: 'Ramesh Soni (Karigar)',
        evidenceType: 'voice_note',
        note: 'Voice update via WhatsApp: Meenakari base framed. Ready for assembly.'
      }
    ]
  },
  {
    id: 'JOB-2026-079',
    orderNumber: 'ORD-ZS-8874',
    title: '22K Antique Temple Haram with Lakshmi Pendant',
    type: 'Antique Temple Haram',
    purity: '22K (91.6%)',
    jewellerId: 'JWL-01',
    jewellerName: 'Rajesh Zaveri',
    jewellerFirm: 'Zaveri & Sons Jewellers',
    jewellerCity: 'Zaveri Bazaar, Mumbai',
    karigarId: 'KRG-9021',
    karigarName: 'Ramesh Babubhai Soni',
    karigarWorkshop: 'Shreeji Fine Art Goldsmiths',
    karigarCity: 'Rajkot, Gujarat',
    issuedDate: '08 Nov 2026',
    deadline: '17 Nov 2026',
    muhuratEvent: 'Diwali Dhanteras Special Commission',
    daysRemaining: 0,
    urgency: 'critical',
    issuedGrossWeight: 62.400,
    targetOrnamentWeight: 54.000,
    agreedGhatLimitPct: 1.10,
    makingChargePerGram: 640,
    advancePaid: 12000,
    issuedScalePhoto: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=480',
    issuedScaleReading: 62.400,
    custodyHolder: 'Returned to Vault (Pending Anomaly Review)',
    status: 'returned',
    signatures: {
      jewellerSigned: true,
      jewellerTimestamp: '08 Nov 2026, 10:14 AM',
      jewellerOtpVerified: true,
      karigarSigned: true,
      karigarTimestamp: '08 Nov 2026, 01:20 PM',
      karigarOtpVerified: true,
    },
    returnData: {
      finishedWeight: 53.850,
      unusedGoldWeight: 4.800,
      scrapWeight: 2.440,
      actualLoss: 1.310,
      actualLossPct: 2.10,
      fineGoldLoss: 1.200,
      scalePhoto: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&q=80&w=480',
      karigarRemarks: 'Intricate temple die carving generated finer polish dust (rada) trapped in suction filter.',
      anomalyFlagged: true,
      anomalyDetails: {
        recordedWastagePct: 2.10,
        historicalRange: '0.80% – 1.25% (Ramesh avg: 1.02%)',
        deviationMessage: '+0.85% above Ramesh\'s proven 24-month benchmark range for Temple Haram',
        aiRecommendation: 'Review required: Inspect suction filter silt recovery records before approving settlement. Ramesh has 99.2% joint reconciliation score; anomaly is likely recoverable polishing dust.',
        confidenceScore: 94
      }
    },
    timeline: [
      {
        timestamp: '08 Nov 2026, 10:14 AM',
        event: 'Gold Issued (62.400g 22K)',
        actor: 'Rajesh Zaveri',
        evidenceType: 'scale_photo'
      },
      {
        timestamp: '17 Nov 2026, 02:20 PM',
        event: 'Finished Haram & Scrap Delivered',
        actor: 'Ramesh Soni',
        evidenceType: 'scale_photo',
        note: 'Finished 53.850g + Unused 4.800g + Scrap 2.440g = 61.090g'
      },
      {
        timestamp: '17 Nov 2026, 02:22 PM',
        event: 'Agentic AI Wastage Anomaly Flagged',
        actor: 'SonaSetu Intelligence',
        evidenceType: 'digital_sign',
        note: 'Calculated wastage is 2.10% (1.310g) vs contract 1.10% (0.686g).'
      }
    ]
  },
  {
    id: 'JOB-2026-085',
    orderNumber: 'ORD-ZS-8910',
    title: '18K Solitaire Pavé Diamond Ring',
    type: 'Solitaire Diamond Ring',
    purity: '18K (75.0%)',
    jewellerId: 'JWL-01',
    jewellerName: 'Rajesh Zaveri',
    jewellerFirm: 'Zaveri & Sons Jewellers',
    jewellerCity: 'Zaveri Bazaar, Mumbai',
    karigarId: 'KRG-9021',
    karigarName: 'Ramesh Babubhai Soni',
    karigarWorkshop: 'Shreeji Fine Art Goldsmiths',
    karigarCity: 'Rajkot, Gujarat',
    issuedDate: '17 Nov 2026',
    deadline: '20 Nov 2026',
    muhuratEvent: 'Engagement Ceremony (21 Nov)',
    daysRemaining: 2,
    urgency: 'critical',
    issuedGrossWeight: 14.800,
    targetOrnamentWeight: 11.200,
    agreedGhatLimitPct: 0.60,
    makingChargePerGram: 850,
    advancePaid: 3000,
    issuedScalePhoto: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=480',
    issuedScaleReading: 14.800,
    custodyHolder: 'Sub-Karigar (Micro-Prong Diamond Setter)',
    status: 'in_progress',
    signatures: {
      jewellerSigned: true,
      jewellerTimestamp: '17 Nov 2026, 09:30 AM',
      jewellerOtpVerified: true,
      karigarSigned: true,
      karigarTimestamp: '17 Nov 2026, 11:45 AM',
      karigarOtpVerified: true,
    },
    timeline: [
      {
        timestamp: '17 Nov 2026, 09:30 AM',
        event: 'Issued 14.800g 18K White Gold Granules',
        actor: 'Rajesh Zaveri',
        evidenceType: 'scale_photo'
      },
      {
        timestamp: '17 Nov 2026, 04:00 PM',
        event: 'Sub-Custody Transferred to Diamond Setter',
        actor: 'Ramesh Soni',
        evidenceType: 'digital_sign',
        note: 'Ring shank cast at 11.450g; handed to setter Vijaybhai.'
      }
    ]
  },
  {
    id: 'JOB-2026-072',
    orderNumber: 'ORD-ZS-8840',
    title: '22K Handcrafted Calcutta Filigree Bangles (Pair)',
    type: 'Handcrafted Kada',
    purity: '22K (91.6%)',
    jewellerId: 'JWL-01',
    jewellerName: 'Rajesh Zaveri',
    jewellerFirm: 'Zaveri & Sons Jewellers',
    jewellerCity: 'Zaveri Bazaar, Mumbai',
    karigarId: 'KRG-9021',
    karigarName: 'Ramesh Babubhai Soni',
    karigarWorkshop: 'Shreeji Fine Art Goldsmiths',
    karigarCity: 'Rajkot, Gujarat',
    issuedDate: '28 Oct 2026',
    deadline: '06 Nov 2026',
    muhuratEvent: 'Delivered for Karwa Chauth',
    daysRemaining: 0,
    urgency: 'low',
    issuedGrossWeight: 52.600,
    targetOrnamentWeight: 46.000,
    agreedGhatLimitPct: 0.95,
    makingChargePerGram: 580,
    advancePaid: 10000,
    issuedScalePhoto: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=480',
    issuedScaleReading: 52.600,
    custodyHolder: 'Showroom Finished Inventory (Safe #4)',
    status: 'settled',
    signatures: {
      jewellerSigned: true,
      jewellerTimestamp: '28 Oct 2026',
      jewellerOtpVerified: true,
      karigarSigned: true,
      karigarTimestamp: '28 Oct 2026',
      karigarOtpVerified: true,
    },
    returnData: {
      finishedWeight: 45.920,
      unusedGoldWeight: 5.120,
      scrapWeight: 1.080,
      actualLoss: 0.480,
      actualLossPct: 0.91,
      fineGoldLoss: 0.440,
      karigarRemarks: 'Flawless filigree wire drawing. Minimal filing dust.',
      anomalyFlagged: false,
    },
    settlement: {
      id: 'SETTL-2026-072',
      calculatedAt: '06 Nov 2026, 04:30 PM',
      grossLabourCharges: 26633, // 45.920g * ₹580
      goldVarianceGrams: -0.020, // 0.020g saved!
      goldAdjustmentRupees: 0,
      advanceDeducted: 10000,
      netPayableToKarigar: 16633,
      escrowStatus: 'released_to_bank',
      gstVoucherNo: 'GST-JW-2026-1109',
      hsnCode: '71131910'
    },
    timeline: [
      {
        timestamp: '06 Nov 2026, 04:30 PM',
        event: 'Joint Reconciliation Approved (0.91% loss vs 0.95% limit)',
        actor: 'Dual Sign-off',
        evidenceType: 'digital_sign'
      },
      {
        timestamp: '06 Nov 2026, 04:35 PM',
        event: 'Escrow Conditional Release Executed (₹16,633)',
        actor: 'ICICI Smart Escrow Gateway',
        evidenceType: 'escrow_release',
        note: 'Direct IMPS payout credited to Ramesh Soni SBI A/c 3099xxxx412'
      }
    ]
  }
];

export const INITIAL_SCRAP_BATCHES: ScrapBatch[] = [
  {
    id: 'SCRAP-2026-091',
    karigarId: 'KRG-9021',
    karigarName: 'Ramesh Babubhai Soni',
    scrapType: 'Solid Cutting (Tukda)',
    weightGrams: 28.450,
    estimatedPurityPct: 91.6,
    fineGoldEquivalentGrams: 26.060,
    collectedDate: '15 Nov 2026',
    refinerStatus: 'Batched for Assay',
    batchReference: 'BATCH-TK-44',
  },
  {
    id: 'SCRAP-2026-089',
    karigarId: 'KRG-9021',
    karigarName: 'Ramesh Babubhai Soni',
    scrapType: 'Filing Dust (Chhol)',
    weightGrams: 14.820,
    estimatedPurityPct: 88.5,
    fineGoldEquivalentGrams: 13.116,
    collectedDate: '12 Nov 2026',
    refinerStatus: 'With Refiner',
    batchReference: 'REFINER-VAL-819',
  },
  {
    id: 'SCRAP-2026-074',
    karigarId: 'KRG-9021',
    karigarName: 'Ramesh Babubhai Soni',
    scrapType: 'Acid/Buffing Silt (Rada)',
    weightGrams: 9.350,
    estimatedPurityPct: 78.0,
    fineGoldEquivalentGrams: 7.293,
    collectedDate: '02 Nov 2026',
    refinerStatus: 'Melted & Credited',
    batchReference: 'CREDIT-MCX-901',
  }
];

export const VOICE_SAMPLES: VoiceSimulationSample[] = [
  {
    id: 'VOICE-GUJ-01',
    language: 'Gujarati',
    audioTitle: 'Ramesh Soni - Return Update (Choker Job #081)',
    speaker: 'Ramesh Babubhai Soni (Rajkot)',
    duration: '0:14',
    transcription: 'રાજેશભાઈ, ચોકરનું કામ પૂરું થઈ ગયું છે. ફિનિશ્ડ નેકલેસનું વજન ૧૮.૯૦ ગ્રામ આવ્યું છે. ૪૦૦ મિલિગ્રામ વધેલું ચોખ્ખું સોનું અને ૩૦૦ મિલિગ્રામ છોલ સાથે રવાના કરું છું.',
    englishTranslation: 'Rajeshbhai, choker work is complete. Finished necklace weight is 18.90 grams. I am returning 400 milligrams unused pure gold and 300 milligrams filing dust.',
    extractedDraft: {
      jobId: 'JOB-2026-081',
      finishedWeight: 18.900,
      unusedGoldWeight: 0.400,
      scrapWeight: 0.300,
      karigarRemarks: 'Delivered via Angadia courier with tamper-evident scale seal #891'
    }
  },
  {
    id: 'VOICE-HIN-02',
    language: 'Hindi',
    audioTitle: 'Mohammad Aslam - Kada Stage Progress & Weight Confirmation',
    speaker: 'Mohammad Aslam (Zaveri Workshop)',
    duration: '0:18',
    transcription: 'सेठजी, कड़े की ढलाई हो गई है। नेट डाई वेट 34.200 ग्राम आया है। 1.800 ग्राम कटिंग टुकड़ा अलग डिब्बे में सील कर दिया है। शाम तक पोलिश करके भेजता हूँ।',
    englishTranslation: 'Sethji, casting of kada is complete. Net die weight is 34.200 grams. 1.800 grams of solid cutting scrap has been sealed in separate box. Sending after polishing by evening.',
    extractedDraft: {
      jobId: 'JOB-2026-085',
      finishedWeight: 34.200,
      unusedGoldWeight: 0.000,
      scrapWeight: 1.800,
      karigarRemarks: 'Die casting verified on Sartorius digital scale'
    }
  },
  {
    id: 'VOICE-ENG-03',
    language: 'English',
    audioTitle: 'Kolkata Filigree Unit - Final Return Voucher Submission',
    speaker: 'Subhash Dey (Filigree Master)',
    duration: '0:12',
    transcription: 'Order 79 temple haram finished. Scale weight is fifty-three point eight five zero grams. Unused gold four point eight zero grams. Scrap two point four four zero grams.',
    englishTranslation: 'Order 79 temple haram finished. Scale weight is 53.850g. Unused gold 4.800g. Scrap 2.440g.',
    extractedDraft: {
      jobId: 'JOB-2026-079',
      finishedWeight: 53.850,
      unusedGoldWeight: 4.800,
      scrapWeight: 2.440,
      karigarRemarks: 'Intricate filigree wire drawing requires fine silt recovery'
    }
  }
];
