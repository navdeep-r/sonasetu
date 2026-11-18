import React, { createContext, useContext, useState, useEffect } from 'react';
import { JobCard, KarigarProfile, ScrapBatch, Persona, ReturnData, SettlementBreakdown } from '../types';
import { INITIAL_JOB_CARDS, INITIAL_KARIGAR_PROFILE, INITIAL_SCRAP_BATCHES } from '../data/mockData';
import { computeJobReconciliation, evaluateWastageAnomaly, soundEffects, CURRENT_24K_GOLD_RATE_INR } from '../utils/goldMath';
import confetti from 'canvas-confetti';

interface OfflineAction {
  id: string;
  type: string;
  jobId: string;
  timestamp: string;
  payload: any;
}

interface AppContextType {
  persona: Persona;
  setPersona: (p: Persona) => void;
  language: 'English' | 'Gujarati' | 'Hindi';
  setLanguage: (l: 'English' | 'Gujarati' | 'Hindi') => void;
  isOnline: boolean;
  toggleOnline: () => void;
  pendingSyncCount: number;
  syncOfflineQueue: () => void;
  
  jobs: JobCard[];
  karigarProfile: KarigarProfile;
  scrapBatches: ScrapBatch[];
  
  selectedJobId: string | null;
  setSelectedJobId: (id: string | null) => void;
  selectedJob: JobCard | null;

  activeTab: 'jobs' | 'reconciliation' | 'voice_agent' | 'settlement' | 'passport' | 'scrap';
  setActiveTab: (tab: 'jobs' | 'reconciliation' | 'voice_agent' | 'settlement' | 'passport' | 'scrap') => void;

  // Actions
  createJob: (job: Omit<JobCard, 'id' | 'signatures' | 'timeline' | 'status' | 'orderNumber' | 'daysRemaining'>) => void;
  signDualParty: (jobId: string, role: 'jeweller' | 'karigar') => void;
  submitReturnWithEvidence: (jobId: string, returnData: Omit<ReturnData, 'actualLoss' | 'actualLossPct' | 'fineGoldLoss' | 'anomalyFlagged'>) => void;
  resolveAnomalyAndApprove: (jobId: string, resolutionNote: string, adjustedLossGrams?: number) => void;
  releaseEscrowPayment: (jobId: string) => void;
  
  // Modals & triggers
  cameraModalOpen: boolean;
  setCameraModalOpen: (open: boolean) => void;
  voiceModalOpen: boolean;
  setVoiceModalOpen: (open: boolean) => void;
  passportModalOpen: boolean;
  setPassportModalOpen: (open: boolean) => void;
  newJobModalOpen: boolean;
  setNewJobModalOpen: (open: boolean) => void;
  disputeModalOpen: boolean;
  setDisputeModalOpen: (open: boolean) => void;
  gstModalOpen: boolean;
  setGstModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [persona, setPersona] = useState<Persona>('jeweller');
  const [language, setLanguage] = useState<'English' | 'Gujarati' | 'Hindi'>('English');
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [offlineQueue, setOfflineQueue] = useState<OfflineAction[]>([]);
  
  const [jobs, setJobs] = useState<JobCard[]>(() => {
    const saved = localStorage.getItem('sonasetu_jobs');
    return saved ? JSON.parse(saved) : INITIAL_JOB_CARDS;
  });

  const [karigarProfile, setKarigarProfile] = useState<KarigarProfile>(() => {
    const saved = localStorage.getItem('sonasetu_karigar');
    return saved ? JSON.parse(saved) : INITIAL_KARIGAR_PROFILE;
  });

  const [scrapBatches, setScrapBatches] = useState<ScrapBatch[]>(() => {
    const saved = localStorage.getItem('sonasetu_scrap');
    return saved ? JSON.parse(saved) : INITIAL_SCRAP_BATCHES;
  });

  const [selectedJobId, setSelectedJobId] = useState<string | null>('JOB-2026-079');
  const [activeTab, setActiveTab] = useState<'jobs' | 'reconciliation' | 'voice_agent' | 'settlement' | 'passport' | 'scrap'>('jobs');

  // Modals
  const [cameraModalOpen, setCameraModalOpen] = useState(false);
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const [passportModalOpen, setPassportModalOpen] = useState(false);
  const [newJobModalOpen, setNewJobModalOpen] = useState(false);
  const [disputeModalOpen, setDisputeModalOpen] = useState(false);
  const [gstModalOpen, setGstModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('sonasetu_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('sonasetu_karigar', JSON.stringify(karigarProfile));
  }, [karigarProfile]);

  useEffect(() => {
    localStorage.setItem('sonasetu_scrap', JSON.stringify(scrapBatches));
  }, [scrapBatches]);

  const selectedJob = jobs.find(j => j.id === selectedJobId) || jobs[0] || null;

  const toggleOnline = () => {
    setIsOnline(prev => {
      const next = !prev;
      if (next && offlineQueue.length > 0) {
        soundEffects.playScanBlip();
        // Sync queue when reconnecting
        setOfflineQueue([]);
      }
      return next;
    });
  };

  const syncOfflineQueue = () => {
    soundEffects.playScanBlip();
    setOfflineQueue([]);
  };

  // 1. Create a new digital job card
  const createJob: AppContextType['createJob'] = (newJobData) => {
    const newId = `JOB-2026-${String(Math.floor(100 + Math.random() * 900))}`;
    const newJob: JobCard = {
      ...newJobData,
      id: newId,
      orderNumber: `ORD-ZS-${Math.floor(8000 + Math.random() * 1000)}`,
      daysRemaining: 7,
      status: 'issued',
      signatures: {
        jewellerSigned: true,
        jewellerTimestamp: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        jewellerOtpVerified: true,
        karigarSigned: false,
      },
      timeline: [
        {
          timestamp: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
          event: `Gold Issued & Scale Logged (${newJobData.issuedGrossWeight}g)`,
          actor: `${newJobData.jewellerName} (Jeweller)`,
          evidenceType: 'scale_photo' as const,
          note: `Digital scale reading verified with OCR snapshot.`
        }
      ]
    };

    setJobs(prev => [newJob, ...prev]);
    setSelectedJobId(newId);
    soundEffects.playShutterClick();
    setNewJobModalOpen(false);
  };

  // 2. Dual Party Mutual Signature
  const signDualParty = (jobId: string, role: 'jeweller' | 'karigar') => {
    soundEffects.playTareBeep();
    setJobs(prev => prev.map(job => {
      if (job.id !== jobId) return job;
      const nowStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
      const updatedSigs = { ...job.signatures };
      const updatedTimeline = [...job.timeline];

      if (role === 'karigar') {
        updatedSigs.karigarSigned = true;
        updatedSigs.karigarTimestamp = nowStr;
        updatedSigs.karigarOtpVerified = true;
        updatedTimeline.push({
          timestamp: nowStr,
          event: 'Karigar Dual-Confirmation OTP Verified',
          actor: `${job.karigarName} (Karigar)`,
          evidenceType: 'digital_sign' as const,
          note: 'Physical gold received and verified on workshop scale.'
        });
      } else {
        updatedSigs.jewellerSigned = true;
        updatedSigs.jewellerTimestamp = nowStr;
        updatedSigs.jewellerOtpVerified = true;
        updatedTimeline.push({
          timestamp: nowStr,
          event: 'Jeweller Counter-Signoff Confirmed',
          actor: `${job.jewellerName} (Jeweller)`,
          evidenceType: 'digital_sign'
        });
      }

      return {
        ...job,
        status: job.status === 'issued' && updatedSigs.karigarSigned ? 'in_progress' : job.status,
        signatures: updatedSigs,
        timeline: updatedTimeline
      };
    }));
  };

  // 3. Submit Return with Evidence (Scale photo + Scrap weights)
  const submitReturnWithEvidence = (
    jobId: string,
    returnData: Omit<ReturnData, 'actualLoss' | 'actualLossPct' | 'fineGoldLoss' | 'anomalyFlagged'>
  ) => {
    soundEffects.playShutterClick();
    setJobs(prev => prev.map(job => {
      if (job.id !== jobId) return job;
      
      const recon = computeJobReconciliation(
        job.issuedGrossWeight,
        returnData.finishedWeight,
        returnData.unusedGoldWeight,
        returnData.scrapWeight,
        job.agreedGhatLimitPct,
        job.purity
      );

      const benchmark = karigarProfile.historicalWastageBenchmarks[job.type] || { min: 0.8, max: 1.3, avg: 1.0 };
      const anomalyCheck = evaluateWastageAnomaly(recon.actualProcessLossPct, job.type, benchmark);

      const fullReturnData: ReturnData = {
        ...returnData,
        actualLoss: recon.actualProcessLoss,
        actualLossPct: recon.actualProcessLossPct,
        fineGoldLoss: recon.fineGoldLossGrams,
        anomalyFlagged: anomalyCheck.isAnomaly,
        anomalyDetails: anomalyCheck.isAnomaly ? {
          recordedWastagePct: recon.actualProcessLossPct,
          historicalRange: anomalyCheck.historicalRange,
          deviationMessage: anomalyCheck.deviation,
          aiRecommendation: anomalyCheck.aiRecommendation,
          confidenceScore: 94
        } : undefined
      };

      const nowStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
      const updatedTimeline = [
        ...job.timeline,
        {
          timestamp: nowStr,
          event: `Finished Ornament Returned (${returnData.finishedWeight.toFixed(3)}g)`,
          actor: `${job.karigarName} (Karigar)`,
          evidenceType: 'scale_photo' as const,
          note: `Scale snapshot captured. Scrap: ${returnData.scrapWeight.toFixed(3)}g, Unused: ${returnData.unusedGoldWeight.toFixed(3)}g.`
        }
      ];

      if (anomalyCheck.isAnomaly) {
        updatedTimeline.push({
          timestamp: nowStr,
          event: `Wastage Anomaly Alert (${recon.actualProcessLossPct}% recorded vs ${benchmark.max}% max)`,
          actor: 'SonaSetu Agentic Intelligence',
          evidenceType: 'digital_sign' as const,
          note: 'Flagged for review before settlement approval.'
        });
      }

      // Also add newly returned scrap to scrap inventory!
      if (returnData.scrapWeight > 0) {
        const newScrapBatch: ScrapBatch = {
          id: `SCRAP-${Date.now().toString().slice(-4)}`,
          karigarId: job.karigarId,
          karigarName: job.karigarName,
          scrapType: 'Filing Dust (Chhol)',
          weightGrams: returnData.scrapWeight,
          estimatedPurityPct: 90.0,
          fineGoldEquivalentGrams: Number((returnData.scrapWeight * 0.90).toFixed(3)),
          collectedDate: nowStr,
          refinerStatus: 'In Vault',
          batchReference: `RET-${job.id.slice(-4)}`
        };
        setScrapBatches(s => [newScrapBatch, ...s]);
      }

      return {
        ...job,
        status: 'returned',
        custodyHolder: `${job.jewellerFirm} (Vault Receipt)`,
        returnData: fullReturnData,
        timeline: updatedTimeline
      };
    }));

    if (!isOnline) {
      setOfflineQueue(q => [...q, {
        id: `offline-${Date.now()}`,
        type: 'RETURN_SUBMISSION',
        jobId,
        timestamp: new Date().toISOString(),
        payload: returnData
      }]);
    }
  };

  // 4. Resolve Anomaly / Discrepancy Investigation
  const resolveAnomalyAndApprove = (jobId: string, resolutionNote: string, adjustedLossGrams?: number) => {
    soundEffects.playTareBeep();
    setJobs(prev => prev.map(job => {
      if (job.id !== jobId || !job.returnData) return job;

      const nowStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
      
      const finishedWt = job.returnData.finishedWeight;
      const makingCharges = Math.round(finishedWt * job.makingChargePerGram);
      
      // Calculate variance and settlement
      const recon = computeJobReconciliation(
        job.issuedGrossWeight,
        finishedWt,
        job.returnData.unusedGoldWeight,
        job.returnData.scrapWeight,
        job.agreedGhatLimitPct,
        job.purity
      );

      const netPayable = Math.max(0, makingCharges - job.advancePaid - (recon.isWithinLimit ? 0 : Math.abs(recon.goldAdjustmentRupees)));

      const settlement: SettlementBreakdown = {
        id: `SETTL-${job.id.replace('JOB-', '')}`,
        calculatedAt: nowStr,
        grossLabourCharges: makingCharges,
        goldVarianceGrams: recon.varianceGrams,
        goldAdjustmentRupees: recon.goldAdjustmentRupees,
        advanceDeducted: job.advancePaid,
        netPayableToKarigar: netPayable,
        escrowStatus: 'held_in_escrow',
        gstVoucherNo: `GST-JW-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        hsnCode: '71131910'
      };

      return {
        ...job,
        status: 'reconciled',
        returnData: {
          ...job.returnData,
          anomalyFlagged: false,
        },
        settlement,
        timeline: [
          ...job.timeline,
          {
            timestamp: nowStr,
            event: 'Anomaly Investigated & Jointly Resolved',
            actor: `${job.jewellerName} & ${job.karigarName}`,
            evidenceType: 'digital_sign' as const,
            note: resolutionNote || 'Scrap suction recovery verified. Settled under joint mutual agreement.'
          },
          {
            timestamp: nowStr,
            event: 'Itemized Settlement Proposal Generated',
            actor: 'SonaSetu Financial Engine',
            evidenceType: 'escrow_release' as const,
            note: `Net payable of ₹${netPayable.toLocaleString('en-IN')} held in smart escrow.`
          }
        ]
      };
    }));

    setDisputeModalOpen(false);
  };

  // 5. Escrow Payment Conditional Release
  const releaseEscrowPayment = (jobId: string) => {
    soundEffects.playCoinChime();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#F59E0B', '#FDE68A', '#10B981']
    });

    setJobs(prev => prev.map(job => {
      if (job.id !== jobId || !job.settlement) return job;
      const nowStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
      return {
        ...job,
        status: 'settled',
        settlement: {
          ...job.settlement,
          escrowStatus: 'released_to_bank'
        },
        timeline: [
          ...job.timeline,
          {
            timestamp: nowStr,
            event: `Escrow Released: ₹${job.settlement.netPayableToKarigar.toLocaleString('en-IN')} Paid`,
            actor: 'Escrow Banking Partner (IMPS/NEFT)',
            evidenceType: 'escrow_release' as const,
            note: `Transferred to ${job.karigarName} bank account. Job closed & added to Trust Passport.`
          }
        ]
      };
    }));

    // Update Karigar Trust Passport metrics!
    setKarigarProfile(prev => ({
      ...prev,
      metrics: {
        ...prev.metrics,
        totalJobsCompleted: prev.metrics.totalJobsCompleted + 1,
        lifetimeFineGoldGrams: Number((prev.metrics.lifetimeFineGoldGrams + (selectedJob ? selectedJob.targetOrnamentWeight : 38)).toFixed(2)),
        onTimeDeliveryRate: 97.2,
        jointReconciliationRate: 99.4,
        trustScore: Math.min(100, prev.metrics.trustScore + 1)
      }
    }));
  };

  return (
    <AppContext.Provider
      value={{
        persona,
        setPersona,
        language,
        setLanguage,
        isOnline,
        toggleOnline,
        pendingSyncCount: offlineQueue.length,
        syncOfflineQueue,
        jobs,
        karigarProfile,
        scrapBatches,
        selectedJobId,
        setSelectedJobId,
        selectedJob,
        activeTab,
        setActiveTab,
        createJob,
        signDualParty,
        submitReturnWithEvidence,
        resolveAnomalyAndApprove,
        releaseEscrowPayment,
        cameraModalOpen,
        setCameraModalOpen,
        voiceModalOpen,
        setVoiceModalOpen,
        passportModalOpen,
        setPassportModalOpen,
        newJobModalOpen,
        setNewJobModalOpen,
        disputeModalOpen,
        setDisputeModalOpen,
        gstModalOpen,
        setGstModalOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
