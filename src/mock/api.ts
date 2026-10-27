import {
  HERO_FINGERPRINT,
  HERO_MATCH_OPTIONS,
  HERO_INITIAL_DEAL,
  SAMPLE_INPUT_FILES,
  ARAVALI_INCOMING_OFFERS,
  RECEIVER_PROFILES,
  ReceiverOfferItem,
} from './data';
import {
  WasteFingerprint,
  MatchOption,
  Deal,
  IngestedFile,
  ReceiverProfile,
} from './types';

// Helper for simulating async server latency
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// In-memory mutable states for current session
let currentFingerprint: WasteFingerprint = JSON.parse(JSON.stringify(HERO_FINGERPRINT));
let currentOffers: ReceiverOfferItem[] = JSON.parse(JSON.stringify(ARAVALI_INCOMING_OFFERS));
let currentProfiles: ReceiverProfile[] = JSON.parse(JSON.stringify(RECEIVER_PROFILES));
let currentDeal: Deal = JSON.parse(JSON.stringify(HERO_INITIAL_DEAL));

/**
 * Simulates uploading or loading a sample input file
 */
export async function getSampleFiles(): Promise<IngestedFile[]> {
  await delay(300);
  return [...SAMPLE_INPUT_FILES];
}

/**
 * Simulates AI ingestion & chemical feature extraction across multimodal inputs
 */
export async function extractFingerprint(
  _files: string[],
  onProgress?: (step: string, pct: number) => void
): Promise<WasteFingerprint> {
  const steps = [
    { label: 'Ingesting lab PDF & OCR parsing chemical assay...', pct: 20 },
    { label: 'Computer vision analysis of IBC storage vat liquid sample...', pct: 45 },
    { label: 'Deconvoluting handheld NIR absorption spectrum peaks...', pct: 70 },
    { label: 'Transcribing shift supervisor voice note & telemetry...', pct: 88 },
    { label: 'Synthesizing 50-parameter verified fingerprint...', pct: 100 },
  ];

  for (const step of steps) {
    if (onProgress) {
      onProgress(step.label, step.pct);
    }
    await delay(500);
  }

  return JSON.parse(JSON.stringify(currentFingerprint));
}

/**
 * Sets data completeness status to Provisional
 */
export async function requestPartnerLabTest(): Promise<WasteFingerprint> {
  await delay(300);
  currentFingerprint.status = 'Provisional';
  return { ...currentFingerprint };
}

/**
 * Simulates lab result arrival, flipping status to Confirmed
 */
export async function simulateLabResult(): Promise<WasteFingerprint> {
  await delay(400);
  currentFingerprint.status = 'Confirmed';
  return { ...currentFingerprint };
}

/**
 * Human-in-the-loop manual verification / parameter override
 */
export async function updateFingerprintParam(
  paramKey: string,
  newValue: number | string
): Promise<WasteFingerprint> {
  await delay(250);
  if (currentFingerprint.params[paramKey]) {
    currentFingerprint.params[paramKey].value = newValue;
    currentFingerprint.params[paramKey].confidence = 0.99;
    currentFingerprint.params[paramKey].isFlagged = false;
  }
  return { ...currentFingerprint };
}

/**
 * CP-SAT Constraint Solver simulation
 */
export async function runOptimizer(
  _wasteId: string,
  onStep?: (msg: string, progressPct: number) => void
): Promise<MatchOption[]> {
  const steps = [
    { label: 'Querying spatial receiver index within 1,000 km radius...', pct: 25 },
    { label: 'Evaluating rule engine: sample rule set across CPCB & EU BREF...', pct: 55 },
    { label: 'Solving multi-stop vehicle sequence (Muzaffarnagar → Ghaziabad → Nimbahera)...', pct: 85 },
    { label: 'Best feasible bundle found · 3 configurations evaluated', pct: 100 },
  ];

  for (const step of steps) {
    if (onStep) {
      onStep(step.label, step.pct);
    }
    await delay(550);
  }

  return JSON.parse(JSON.stringify(HERO_MATCH_OPTIONS));
}

/**
 * Receiver dashboard: accept or decline an incoming material offer
 */
export async function updateReceiverOfferStatus(
  offerId: string,
  status: 'Accepted' | 'Declined'
): Promise<ReceiverOfferItem[]> {
  await delay(300);
  currentOffers = currentOffers.map((item) =>
    item.id === offerId ? { ...item, status } : item
  );
  return [...currentOffers];
}

export async function getReceiverOffers(): Promise<ReceiverOfferItem[]> {
  await delay(200);
  return [...currentOffers];
}

/**
 * Receiver Registry (Task 5)
 */
export async function getReceiverProfiles(): Promise<ReceiverProfile[]> {
  await delay(200);
  return [...currentProfiles];
}

export async function claimReceiverProfile(
  id: string,
  email: string,
  limits?: ReceiverProfile['limits']
): Promise<ReceiverProfile[]> {
  await delay(400);
  currentProfiles = currentProfiles.map((p) => {
    if (p.id === id) {
      return {
        ...p,
        status: 'Verified',
        contactEmail: email,
        authorisationPdfAttached: true,
        limits: limits || p.limits || {
          chlorideMaxPct: 0.10,
          minCalorificMjKg: 1.5,
          metalLimitsPpm: 100,
          acceptedHours: '08:00 - 20:00 Daily',
        },
      };
    }
    return p;
  });
  return [...currentProfiles];
}

/**
 * Settle Engine: initialize or fetch active escrow deal
 */
export async function fetchCurrentDeal(): Promise<Deal> {
  await delay(200);
  return JSON.parse(JSON.stringify(currentDeal));
}

export async function advanceDealStage(nextStage: Deal['stage']): Promise<Deal> {
  await delay(300);
  currentDeal.stage = nextStage;
  return JSON.parse(JSON.stringify(currentDeal));
}

/**
 * Gate check verification (pH, chloride, density) with optional fail condition
 */
export async function verifyDelivery(forceFail: boolean = false): Promise<Deal> {
  await delay(800);

  if (forceFail) {
    currentDeal.stage = 'Gate verified';
    currentDeal.disputeActive = true;
    currentDeal.verification = {
      result: 'FAIL',
      timestamp: '22 Oct 2026, 02:15 IST',
      operator: 'Automated In-Line Sensor Array (Gate #4)',
      rejectionReason: 'Chloride threshold exceeded batch limit (Measured 242,000 ppm vs Max 200,000 ppm). Funds held. Re-test or return load.',
      checks: [
        {
          name: 'pH Range (Acidic Compartment)',
          expected: 'pH 0.5 - 1.2',
          measured: 'pH 0.88',
          pass: true,
          margin: 'Within 5% variance tolerance',
        },
        {
          name: 'Chloride Max Cap (< 200,000 ppm)',
          expected: '< 200,000 ppm',
          measured: '242,000 ppm [ANOMALY]',
          pass: false,
          margin: 'Exceeds kiln acceptance limit',
        },
        {
          name: 'Visual & Density Pattern Match',
          expected: 'Dark olive liquid (1.25 - 1.32 g/cm³)',
          measured: 'Dark olive green, 1.282 g/cm³',
          pass: true,
          margin: 'Optical pattern match confirmed',
        },
        {
          name: 'Trace Heavy Metals (Pb, Cd, Hg) — Lab ICP-OES',
          expected: 'Pb < 10, Cd < 1, Hg < 0.1 ppm',
          measured: 'Pending 24-48h analysis',
          pass: false,
          margin: 'Awaiting lab validation',
        },
      ],
    };
  } else {
    currentDeal.stage = 'Gate verified';
    currentDeal.disputeActive = false;
    currentDeal.verification = JSON.parse(JSON.stringify(HERO_INITIAL_DEAL.verification!));
  }

  return JSON.parse(JSON.stringify(currentDeal));
}

/**
 * Stage 1 Release: 80% (₹21,000) upon Gate Verification PASS
 */
export async function releaseStage1Payment(): Promise<Deal> {
  await delay(500);
  currentDeal.stage1Released = true;
  return JSON.parse(JSON.stringify(currentDeal));
}

/**
 * Simulate 24-48h lab report completion
 */
export async function simulateLabReportPass(): Promise<Deal> {
  await delay(600);
  currentDeal.labReportStatus = 'passed';
  if (currentDeal.verification) {
    const metalCheck = currentDeal.verification.checks.find((c) =>
      c.name.includes('Heavy Metals')
    );
    if (metalCheck) {
      metalCheck.measured = 'Pb 4.6, Cd 0.11, Hg 0.01 ppm';
      metalCheck.pass = true;
      metalCheck.margin = 'All trace elements compliant';
    }
  }
  return JSON.parse(JSON.stringify(currentDeal));
}

/**
 * Stage 2 Release: 20% (₹5,250) upon Lab Report PASS
 */
export async function releaseStage2Payment(): Promise<Deal> {
  await delay(500);
  currentDeal.stage2Released = true;
  currentDeal.stage = 'Funds released';
  return JSON.parse(JSON.stringify(currentDeal));
}

/**
 * Reset demo state back to pristine
 */
export function resetDemoMockState() {
  currentFingerprint = JSON.parse(JSON.stringify(HERO_FINGERPRINT));
  currentOffers = JSON.parse(JSON.stringify(ARAVALI_INCOMING_OFFERS));
  currentProfiles = JSON.parse(JSON.stringify(RECEIVER_PROFILES));
  currentDeal = JSON.parse(JSON.stringify(HERO_INITIAL_DEAL));
}
