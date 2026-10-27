/**
 * Single Source of Truth for WasteMatch Economics & Logistics
 * All costs, distances, tonnages, and net benefits are derived from here.
 */

// Global Economic Constants
export const BASELINE_DISPOSAL_PER_T = 4000; // ₹4,000 status-quo disposal cost per tonne, incl. transport
export const FREIGHT_PER_KM = 85; // ₹85 full hazmat tanker, one trip. Illustrative
export const TANKER_CAPACITY_T = 23; // Max capacity in tonnes
export const RECEIVER_PAYMENT_PER_T = 1250; // Kiln payment per tonne for hero waste

// CO2 Estimation Constants (Illustrative factors; replace with sourced values before making claims)
export const CO2_ESTIMATED_TONNES = 1.6; // 1.6 t CO2e (estimated)
export const CO2_ESTIMATION_METHOD = {
  summary: '1.6 t CO₂e (estimated)',
  methodology: 'Avoided neutralization chemicals + avoided mined iron corrective − transport emissions',
  factors: [
    { label: 'Avoided mined iron ore / bauxite corrective', value: '+2.1 t CO₂e' },
    { label: 'Avoided virgin neutralizing reagents (lime/caustic)', value: '+0.4 t CO₂e' },
    { label: 'Tanker transport emissions (820 km roundtrip)', value: '−0.9 t CO₂e' },
  ],
  note: 'Illustrative factors; replace with sourced values before making claims.',
};

export interface EconomicOption {
  id: string;
  title: string;
  subtitle: string;
  tonnes: number;
  distanceKm: number; // Placeholder; verify on Google Maps
  receiverPaymentPerTonne: number; // Negative if acceptance fee
  receiverPaymentTotal: number;
  freightCostTotal: number;
  disposalCostAvoidedTotal: number;
  netBenefit: number;
  truckFillPct: number;
  recommended: boolean;
  notes?: string;
  isViable: boolean;
  parties: string[];
}

/**
 * Derives net benefit and truck fill percentage
 * netBenefit = (tonnes × BASELINE_DISPOSAL_PER_T) − (km × FREIGHT_PER_KM) + receiverPayment
 * truckFillPct = round(tonnes / TANKER_CAPACITY_T × 100)
 */
export function calculateEconomics(
  tonnes: number,
  distanceKm: number,
  receiverPaymentPerTonne: number
): {
  freightCostTotal: number;
  disposalCostAvoidedTotal: number;
  receiverPaymentTotal: number;
  netBenefit: number;
  truckFillPct: number;
} {
  const freightCostTotal = Math.round(distanceKm * FREIGHT_PER_KM);
  const disposalCostAvoidedTotal = Math.round(tonnes * BASELINE_DISPOSAL_PER_T);
  const receiverPaymentTotal = Math.round(tonnes * receiverPaymentPerTonne);
  const netBenefit = disposalCostAvoidedTotal - freightCostTotal + receiverPaymentTotal;
  const truckFillPct = Math.min(100, Math.round((tonnes / TANKER_CAPACITY_T) * 100));

  return {
    freightCostTotal,
    disposalCostAvoidedTotal,
    receiverPaymentTotal,
    netBenefit,
    truckFillPct,
  };
}

// Option 1: Shared bundle to Aravali Cement Works (Muzaffarnagar -> Ghaziabad -> kiln)
// 21 t, 820 km (verify on Google Maps)
// Freight: 820 * 85 = ₹69,700
// Receiver payment: 21 * 1250 = +₹26,250
// Disposal avoided: 21 * 4000 = ₹84,000
// Net benefit: 84,000 - 69,700 + 26,250 = ₹40,550
// Fill: round(21 / 23 * 100) = 91%
const OPTION_1_CALC = calculateEconomics(21, 820, RECEIVER_PAYMENT_PER_T);

// Option 2: Direct acid route to NeutraChem (12 t, acid only)
// 12 t, 890 km (verify on Google Maps)
// Freight: 890 * 85 = ₹75,650
// Receiver payment: 12 * 1500 = +₹18,000
// Disposal avoided: 12 * 4000 = ₹48,000
// Net benefit: 48,000 - 75,650 + 18,000 = -₹9,650
// Fill: round(12 / 23 * 100) = 52%
const OPTION_2_CALC = calculateEconomics(12, 890, 1500);

// Option 3: Local neutralization at GreenBrick Meerut (12 t, acid only)
// 12 t, 65 km (verify on Google Maps)
// Freight: 65 * 85 = ₹5,525
// Receiver payment: 12 * -3000 = -₹36,000 (acceptance fee)
// Disposal avoided: 12 * 4000 = ₹48,000
// Net benefit: 48,000 - 5,525 - 36,000 = ₹6,475
// Fill: round(12 / 23 * 100) = 52%
const OPTION_3_CALC = calculateEconomics(12, 65, -3000);

export const DERIVED_MATCH_OPTIONS: EconomicOption[] = [
  // Ranked by Net Benefit descending: Option 1, Option 3, Option 2
  {
    id: 'match-opt-1',
    title: 'Shared bundle to Aravali Cement Works',
    subtitle: 'Muzaffarnagar → Ghaziabad → kiln (two segregated compartments)',
    tonnes: 21,
    distanceKm: 820, // verify on Google Maps
    receiverPaymentPerTonne: 1250,
    receiverPaymentTotal: OPTION_1_CALC.receiverPaymentTotal, // +₹26,250
    freightCostTotal: OPTION_1_CALC.freightCostTotal, // ₹69,700
    disposalCostAvoidedTotal: OPTION_1_CALC.disposalCostAvoidedTotal, // ₹84,000
    netBenefit: OPTION_1_CALC.netBenefit, // ₹40,550
    truckFillPct: OPTION_1_CALC.truckFillPct, // 91%
    recommended: true,
    isViable: true,
    notes: 'Two half-empty loads become one 91% full tanker.',
    parties: ['Bharat Paper & Board Mills (Muzaffarnagar)', 'Shree Ganesh Galvanizers (Ghaziabad)'],
  },
  {
    id: 'match-opt-3',
    title: 'Local neutralization at GreenBrick Meerut',
    subtitle: '12 t acid only to local brick works (65 km)',
    tonnes: 12,
    distanceKm: 65, // verify on Google Maps
    receiverPaymentPerTonne: -3000,
    receiverPaymentTotal: OPTION_3_CALC.receiverPaymentTotal, // -₹36,000 (acceptance fee)
    freightCostTotal: OPTION_3_CALC.freightCostTotal, // ₹5,525
    disposalCostAvoidedTotal: OPTION_3_CALC.disposalCostAvoidedTotal, // ₹48,000
    netBenefit: OPTION_3_CALC.netBenefit, // ₹6,475
    truckFillPct: OPTION_3_CALC.truckFillPct, // 52%
    recommended: false,
    isViable: true,
    notes: 'Low freight, but receiver charges ₹3,000/t treatment fee.',
    parties: ['Shree Ganesh Galvanizers only'],
  },
  {
    id: 'match-opt-2',
    title: 'Direct acid route to NeutraChem',
    subtitle: '12 t acid only to chemical recovery plant (890 km)',
    tonnes: 12,
    distanceKm: 890, // verify on Google Maps
    receiverPaymentPerTonne: 1500,
    receiverPaymentTotal: OPTION_2_CALC.receiverPaymentTotal, // +₹18,000
    freightCostTotal: OPTION_2_CALC.freightCostTotal, // ₹75,650
    disposalCostAvoidedTotal: OPTION_2_CALC.disposalCostAvoidedTotal, // ₹48,000
    netBenefit: OPTION_2_CALC.netBenefit, // -₹9,650
    truckFillPct: OPTION_2_CALC.truckFillPct, // 52%
    recommended: false,
    isViable: false,
    notes: 'Not viable alone: half-empty truck, long haul',
    parties: ['Shree Ganesh Galvanizers only'],
  },
];

// Comparison chart data: Total cost of handling 21 t per batch (values in ₹, negative = cost)
export const HANDLING_COST_COMPARISON = [
  {
    name: 'Status quo (disposal)',
    costInr: -84000, // 21 t * 4,000
    label: '-₹84,000 (TSDF Landfill fee)',
    fill: '#DC2626',
  },
  {
    name: 'Separate half-empty trips',
    costInr: -94450, // freight 120,700 - payment 26,250 = cost 94,450
    label: '-₹94,450 (Ghaziabad 720 km + Muzaffarnagar 700 km, two tankers)',
    fill: '#F59E0B',
  },
  {
    name: 'WasteMatch bundle',
    costInr: -43450, // freight 69,700 - payment 26,250 = cost 43,450
    label: '-₹43,450 (820 km shared tanker)',
    fill: '#15803D',
  },
];

export const COMPARISON_CHART_CAPTION =
  'Bundling saves ₹40,550 vs status quo and ₹51,000 vs shipping separately.';

// Escrow settlement breakdown for the Hero Deal
export const ESCROW_HERO_DEAL = {
  totalAmountInr: 26250, // 21 t * ₹1,250
  stage1AmountInr: 21000, // 80% on Gate Checks
  stage2AmountInr: 5250, // 20% on Lab Report
  generatorSplit: {
    shreeGaneshInr: 15000, // 12 t * ₹1,250
    bharatPaperInr: 11250, // 9 t * ₹1,250
  },
  freightNote: 'Freight (₹69,700) is settled separately with transporter when e-manifest closes.',
  impactSubtext: '₹84,000 disposal avoided − ₹69,700 freight + ₹26,250 receiver payment',
  netEconomicGainInr: 40550,
  divertedTonnes: 21.0,
};

