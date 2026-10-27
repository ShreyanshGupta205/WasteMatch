export type HazardClass = 'Non-hazardous' | 'Corrosive' | 'Flammable' | 'Toxic' | 'Mixed';

export type PhysicalState = 'Solid' | 'Liquid' | 'Sludge' | 'Powder';

export type SourceType = 'photo' | 'lab_pdf' | 'nir_scan' | 'voice_note';

export interface ParameterData {
  name?: string;
  formula?: string;
  category?: 'Physicochemical' | 'Heavy Metals' | 'Hazmat & Safety' | 'Combustion / Co-Processing' | 'Logistics';
  value: number | string;
  unit?: string;
  confidence: number;
  source: SourceType;
  benchmark?: string;
  isFlagged?: boolean;
  status?: 'Verified' | 'Provisional' | 'Needs Review' | 'Not Available';
  citation?: string;
  auditNote?: string;
  lastUpdated?: string;
  isMissing?: boolean;
}

export interface WasteFingerprint {
  id: string;
  generatorId: string;
  material: string;            // e.g. "Spent pickle liquor (HCl)"
  quantityTonnes: number;
  physicalState: PhysicalState;
  hazardClass: HazardClass;
  confidence: number;          // 0-1 overall extraction confidence
  params: Record<string, ParameterData>;
  status?: 'Confirmed' | 'Provisional';
  completenessTier?: 'Tier 0' | 'Tier 1' | 'Tier 2';
}

export type ReceiverStatus = 'Unverified' | 'Claimed' | 'Verified';

export interface ReceiverProfile {
  id: string;
  name: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  industry: string;
  authorisedCategories: string[];
  monthlyCapacityTonnes: number;
  sourceBadge: string; // e.g. "SPCB authorisation list (sample)"
  status: ReceiverStatus;
  limits?: {
    chlorideMaxPct: number;
    minCalorificMjKg: number;
    metalLimitsPpm: number;
    acceptedHours: string;
  };
  contactEmail?: string;
  authorisationPdfAttached?: boolean;
}

export interface Party {
  id: string;
  name: string;
  type: 'generator' | 'receiver';
  city: string;
  state: string;
  lat: number;
  lng: number;
  industry: string;
  capacityTonnesPerMonth?: number;
  acceptedMaterials?: string[];
  status?: ReceiverStatus;
}

export interface RuleCheck {
  rule: string;
  source: 'EU BREF' | 'EPA' | 'CPCB';
  status: 'pass' | 'warn' | 'fail';
  note: string;
}

export interface MatchOption {
  id: string;
  receiverId: string;
  wasteIds: string[];
  title: string;
  description: string;
  compatibilityScore: number;       // 0-100
  rulesPassed: number;
  rulesTotal: number;
  rulesChecked: RuleCheck[];
  distanceKm: number;
  truckFillPct: number;
  revenuePerTonne: number;          // INR, can be negative (disposal fee avoided)
  disposalCostAvoided: number;
  netBenefit: number;
  co2SavedTonnes: number;
  recommended: boolean;
  transitCostSavedInr?: number;
  bundledParties?: string[];
  isViable?: boolean;
  notes?: string;
  formulaBreakdown?: string;
}

export type EscrowStage = 'Locked' | 'In transit' | 'Gate verified' | 'Funds released';

export interface VerificationCheck {
  name: string;
  expected: string;
  measured: string;
  pass: boolean;
  margin?: string;
}

export interface VerificationResult {
  result: 'PASS' | 'FAIL';
  timestamp: string;
  operator: string;
  checks: VerificationCheck[];
  rejectionReason?: string;
}

export interface CreditCertificate {
  id: string;
  type: 'Carbon' | 'Plastic';
  tonnes: number;
  standard: string;
  issuedAt: string;
  txHash: string;
  issuer: string;
  beneficiary: string;
  co2eAvoidedTonnes: number;
  registryUrl?: string;
}

export interface Deal {
  id: string;
  matchId: string;
  amountInr: number;
  stage: EscrowStage;
  verification?: VerificationResult;
  certificate?: CreditCertificate;
  contractAddress?: string;
  chainName?: string;
  escrowLockedAt?: string;
  generatorName?: string;
  partnerGeneratorName?: string;
  receiverName?: string;
  materialsSummary?: string;
  totalTonnes?: number;
  stage1Released?: boolean;
  stage2Released?: boolean;
  labReportStatus?: 'pending' | 'passed' | 'failed';
  disputeActive?: boolean;
}

export interface IngestedFile {
  id: string;
  type: SourceType;
  title: string;
  fileName: string;
  size: string;
  extractedSnippet: string;
  timestamp: string;
}
