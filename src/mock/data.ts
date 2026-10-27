import {
  Party,
  WasteFingerprint,
  MatchOption,
  Deal,
  IngestedFile,
  ReceiverProfile,
} from './types';
import {
  DERIVED_MATCH_OPTIONS,
  ESCROW_HERO_DEAL,
  CO2_ESTIMATED_TONNES,
} from './economics';

// ==========================================
// 1. GENERATOR & RECEIVER PARTIES
// ==========================================

export const GENERATORS: Party[] = [
  {
    id: 'gen-1',
    name: 'Shree Ganesh Galvanizers',
    type: 'generator',
    city: 'Ghaziabad',
    state: 'Uttar Pradesh',
    lat: 28.6692,
    lng: 77.4538,
    industry: 'Steel Hot-Dip Galvanizing & Surface Finishing',
    capacityTonnesPerMonth: 12,
    acceptedMaterials: ['Spent pickle liquor (HCl)'],
  },
  {
    id: 'gen-2',
    name: 'Bharat Paper & Board Mills',
    type: 'generator',
    city: 'Muzaffarnagar',
    state: 'Uttar Pradesh',
    lat: 29.4727,
    lng: 77.7085,
    industry: 'Kraft Pulp & Recycled Paper Processing',
    capacityTonnesPerMonth: 9,
    acceptedMaterials: ['Alkaline caustic sludge'],
  },
  {
    id: 'gen-3',
    name: 'Rana Plastics Ltd.',
    type: 'generator',
    city: 'Faridabad',
    state: 'Haryana',
    lat: 28.4089,
    lng: 77.3178,
    industry: 'Automotive Injection Moulding',
    capacityTonnesPerMonth: 15,
    acceptedMaterials: ['Mixed polyolefin scrap'],
  },
  {
    id: 'gen-4',
    name: 'Krishna Textile Processing',
    type: 'generator',
    city: 'Panipat',
    state: 'Haryana',
    lat: 29.3909,
    lng: 76.9635,
    industry: 'Textile Yarn Dyeing & Washing',
    capacityTonnesPerMonth: 7,
    acceptedMaterials: ['Dye-house wastewater sludge'],
  },
  {
    id: 'gen-5',
    name: 'Singh Foundry Works',
    type: 'generator',
    city: 'Ludhiana',
    state: 'Punjab',
    lat: 30.9010,
    lng: 75.8573,
    industry: 'Grey Iron Casting & Moulding',
    capacityTonnesPerMonth: 20,
    acceptedMaterials: ['Spent resin-bonded foundry sand'],
  },
];

// 8 Fictional Receivers for Registry & SPCB Seed
export const RECEIVER_PROFILES: ReceiverProfile[] = [
  {
    id: 'rec-1',
    name: 'Aravali Cement Works (Co-processing Kiln)',
    city: 'Nimbahera',
    state: 'Rajasthan',
    lat: 24.6225,
    lng: 74.6869,
    industry: 'Cement Clinker Manufacturing (Co-processing AFR)',
    authorisedCategories: ['Acidic Spent Liquor', 'Alkaline Sludge', 'Solid Recovered Fuel (SRF)', 'Paint Sludge'],
    monthlyCapacityTonnes: 450,
    sourceBadge: 'SPCB authorisation list (sample)',
    status: 'Verified',
    limits: {
      chlorideMaxPct: 0.10,
      minCalorificMjKg: 1.5,
      metalLimitsPpm: 100,
      acceptedHours: '06:00 - 22:00 Daily',
    },
    contactEmail: 'afr-intake@aravalicement.demo',
    authorisationPdfAttached: true,
  },
  {
    id: 'rec-2',
    name: 'GreenBrick Eco-Industries',
    city: 'Meerut',
    state: 'Uttar Pradesh',
    lat: 28.9845,
    lng: 77.7064,
    industry: 'Fly Ash & Geopolymer Bricks Manufacturing',
    authorisedCategories: ['Foundry Sand', 'Inorganic Industrial Sludge', 'Fly Ash'],
    monthlyCapacityTonnes: 120,
    sourceBadge: 'SPCB authorisation list (sample)',
    status: 'Claimed',
    limits: {
      chlorideMaxPct: 0.05,
      minCalorificMjKg: 0.0,
      metalLimitsPpm: 50,
      acceptedHours: '08:00 - 18:00 Mon-Sat',
    },
    contactEmail: 'operations@greenbrick.demo',
    authorisationPdfAttached: true,
  },
  {
    id: 'rec-3',
    name: 'EcoPoly Advanced Recyclers',
    city: 'Rewari',
    state: 'Haryana',
    lat: 28.1834,
    lng: 76.6191,
    industry: 'Mechanical & Chemical Polymer Compounding',
    authorisedCategories: ['HDPE/PP Rigid Scrap', 'Industrial Polymer Purge'],
    monthlyCapacityTonnes: 80,
    sourceBadge: 'SPCB authorisation list (sample)',
    status: 'Claimed',
    limits: {
      chlorideMaxPct: 0.01,
      minCalorificMjKg: 30.0,
      metalLimitsPpm: 10,
      acceptedHours: '24/7 Gate Delivery',
    },
    contactEmail: 'rawmaterials@ecopoly.demo',
    authorisationPdfAttached: true,
  },
  {
    id: 'rec-4',
    name: 'NeutraChem Solutions',
    city: 'Dahej',
    state: 'Gujarat',
    lat: 21.6264,
    lng: 73.0152,
    industry: 'Hydrochloric Acid Regeneration & Ferric Chloride Synthesis',
    authorisedCategories: ['Spent Pickle Liquor (HCl)', 'Ferrous Chloride Solution'],
    monthlyCapacityTonnes: 200,
    sourceBadge: 'SPCB authorisation list (sample)',
    status: 'Unverified',
    limits: {
      chlorideMaxPct: 22.0,
      minCalorificMjKg: 0.0,
      metalLimitsPpm: 500,
      acceptedHours: '09:00 - 18:00 Mon-Fri',
    },
  },
  {
    id: 'rec-5',
    name: 'Marwar Calcining & Clinker Ltd.',
    city: 'Beawar',
    state: 'Rajasthan',
    lat: 26.1013,
    lng: 74.3218,
    industry: 'Lime & Secondary Clinker Burning',
    authorisedCategories: ['Spent Solvents', 'Carbon Black Slurry', 'High-CV Plastic Fluff'],
    monthlyCapacityTonnes: 320,
    sourceBadge: 'SPCB authorisation list (sample)',
    status: 'Unverified',
  },
  {
    id: 'rec-6',
    name: 'IndoSolv Recovery & Distillation',
    city: 'Greater Noida',
    state: 'Uttar Pradesh',
    lat: 28.4744,
    lng: 77.5040,
    industry: 'Spent Solvent Fractional Distillation',
    authorisedCategories: ['Contaminated Thinners', 'Isopropanol Wash', 'Spent Toluene'],
    monthlyCapacityTonnes: 90,
    sourceBadge: 'SPCB authorisation list (sample)',
    status: 'Claimed',
  },
  {
    id: 'rec-7',
    name: 'Apex Hazardous Waste TSDF',
    city: 'Pithampur',
    state: 'Madhya Pradesh',
    lat: 22.6142,
    lng: 75.6822,
    industry: 'Centralized Hazmat Treatment & Stabilization',
    authorisedCategories: ['Heavy Metal Sludge', 'Organic Incinerable Waste', 'Contaminated Ash'],
    monthlyCapacityTonnes: 600,
    sourceBadge: 'SPCB authorisation list (sample)',
    status: 'Verified',
  },
  {
    id: 'rec-8',
    name: 'Pragati Pre-Processors & AFR Blending',
    city: 'Alwar',
    state: 'Rajasthan',
    lat: 27.5530,
    lng: 76.6346,
    industry: 'Refuse Derived Fuel (RDF) & Hazmat Co-processing Pre-treatment',
    authorisedCategories: ['Multi-stream Hazardous Sludges', 'Automotive Paint Sludge', 'Textile ETP Cake'],
    monthlyCapacityTonnes: 280,
    sourceBadge: 'SPCB authorisation list (sample)',
    status: 'Unverified',
  },
];

export const RECEIVERS: Party[] = RECEIVER_PROFILES.map((p) => ({
  id: p.id,
  name: p.name,
  type: 'receiver',
  city: p.city,
  state: p.state,
  lat: p.lat,
  lng: p.lng,
  industry: p.industry,
  capacityTonnesPerMonth: p.monthlyCapacityTonnes,
  acceptedMaterials: p.authorisedCategories,
  status: p.status,
}));

// ==========================================
// 2. HERO SAMPLE INGESTION FILES
// ==========================================

export const SAMPLE_INPUT_FILES: IngestedFile[] = [
  {
    id: 'file-lab',
    type: 'lab_pdf',
    title: 'SGS Lab Report - Batch #SG-2026-08',
    fileName: 'SGS_Chemical_Assay_Batch_SG08.pdf',
    size: '1.4 MB',
    extractedSnippet: 'pH: 0.85 (Strong Acid) | Free HCl: 4.8% | Fe Total: 118,500 ppm | Chloride: 182,000 ppm',
    timestamp: '2 hours ago',
  },
  {
    id: 'file-photo',
    type: 'photo',
    title: 'Storage IBC Tank & Vat Visual Inspection',
    fileName: 'IBC_Tanks_Vat_Inspection_Aug.jpg',
    size: '3.8 MB',
    extractedSnippet: 'Clear greenish-dark liquid | Low turbidity | No visible sediment cake | Density est: 1.28 g/cm³',
    timestamp: 'Yesterday',
  },
  {
    id: 'file-nir',
    type: 'nir_scan',
    title: 'Handheld NIR Spectroscopy Array',
    fileName: 'MicroNIR_Scan_Point_04.csv',
    size: '420 KB',
    extractedSnippet: 'Peak absorption at 1440nm & 1940nm (aqueous HCl hydrate) | Hydrocarbon traces < 12 ppm',
    timestamp: 'Today, 09:15 AM',
  },
  {
    id: 'file-voice',
    type: 'voice_note',
    title: 'Plant Shift Supervisor Voice Log',
    fileName: 'Shift_Foreman_Ramesh_PickleTank4.m4a',
    size: '2.1 MB',
    extractedSnippet: '"We cleared 12 tonnes from line 2 after mild steel descaling. Temperature was around 32°C, no oil skimmings added."',
    timestamp: 'Today, 10:30 AM',
  },
];

// ==========================================
// 3. 50-PARAMETER FINGERPRINT (Hero: Spent Pickle Liquor)
// ==========================================

export const HERO_FINGERPRINT: WasteFingerprint = {
  id: 'fp-hero-01',
  generatorId: 'gen-1',
  material: 'Spent pickle liquor (HCl aqueous solution)',
  quantityTonnes: 12.0,
  physicalState: 'Liquid',
  hazardClass: 'Corrosive',
  confidence: 0.94,
  status: 'Confirmed',
  completenessTier: 'Tier 1',
  params: {
    pH: {
      name: 'pH Level',
      category: 'Physicochemical',
      value: 0.85,
      unit: 'pH',
      confidence: 0.98,
      source: 'lab_pdf',
      benchmark: '< 2.0 (Extreme Acidic)',
      isFlagged: false,
    },
    chloride: {
      name: 'Total Chloride (Cl⁻)',
      category: 'Physicochemical',
      value: 182000,
      unit: 'ppm',
      confidence: 0.96,
      source: 'lab_pdf',
      benchmark: '150,000 - 210,000 ppm',
      isFlagged: false,
    },
    calorificValue: {
      name: 'Net Calorific Value (NCV)',
      category: 'Combustion / Co-Processing',
      value: 0.4,
      unit: 'MJ/kg',
      confidence: 0.92,
      source: 'lab_pdf',
      benchmark: '< 2.0 MJ/kg (Non-combustible)',
      isFlagged: false,
    },
    moisture: {
      name: 'Moisture / Water Content',
      category: 'Physicochemical',
      value: 68.4,
      unit: '%',
      confidence: 0.95,
      source: 'lab_pdf',
      benchmark: '65 - 75 %',
      isFlagged: false,
    },
    fe: {
      name: 'Dissolved Iron (Fe²⁺/Fe³⁺)',
      category: 'Heavy Metals',
      value: 118500,
      unit: 'ppm',
      confidence: 0.97,
      source: 'lab_pdf',
      benchmark: '100,000 - 130,000 ppm',
      isFlagged: false,
    },
    zn: {
      name: 'Zinc (Zn)',
      category: 'Heavy Metals',
      value: 840,
      unit: 'ppm',
      confidence: 0.74,
      source: 'nir_scan',
      benchmark: '< 1,200 ppm (Galv dragout)',
      isFlagged: true,
    },
    pb: {
      name: 'Lead (Pb)',
      category: 'Heavy Metals',
      value: 4.8,
      unit: 'ppm',
      confidence: 0.91,
      source: 'lab_pdf',
      benchmark: '< 10 ppm permissible',
      isFlagged: false,
    },
    cr: {
      name: 'Total Chromium (Cr)',
      category: 'Heavy Metals',
      value: 2.1,
      unit: 'ppm',
      confidence: 0.89,
      source: 'lab_pdf',
      benchmark: '< 5 ppm permissible',
      isFlagged: false,
    },
    viscosity: {
      name: 'Kinematic Viscosity @ 25°C',
      category: 'Physicochemical',
      value: 2.45,
      unit: 'cP',
      confidence: 0.88,
      source: 'photo',
      benchmark: '2.0 - 3.2 cP',
      isFlagged: false,
    },
    flashPoint: {
      name: 'Closed Cup Flash Point',
      category: 'Hazmat & Safety',
      value: '> 100',
      unit: '°C',
      confidence: 0.99,
      source: 'lab_pdf',
      benchmark: 'Non-flammable',
      isFlagged: false,
    },
    density: {
      name: 'Specific Gravity / Density',
      category: 'Physicochemical',
      value: 1.284,
      unit: 'g/cm³',
      confidence: 0.94,
      source: 'photo',
      benchmark: '1.25 - 1.32 g/cm³',
      isFlagged: false,
    },
    hazardClass: {
      name: 'UN Hazard Classification',
      category: 'Hazmat & Safety',
      value: 'Class 8 (Corrosive Liquid)',
      unit: 'UN 1789',
      confidence: 0.99,
      source: 'voice_note',
      benchmark: 'CPCB HazCat Schedule I #26.1',
      isFlagged: false,
    },
    freeHcl: { name: 'Free Hydrochloric Acid', category: 'Physicochemical', value: 4.8, unit: '% w/w', confidence: 0.96, source: 'lab_pdf', benchmark: '3 - 7%' },
    totalDissolvedSolids: { name: 'Total Dissolved Solids (TDS)', category: 'Physicochemical', value: 312000, unit: 'ppm', confidence: 0.93, source: 'lab_pdf', benchmark: '< 350,000 ppm' },
    totalSuspendedSolids: { name: 'Total Suspended Solids (TSS)', category: 'Physicochemical', value: 450, unit: 'ppm', confidence: 0.85, source: 'photo', benchmark: '< 1000 ppm' },
    temperature: { name: 'Discharge Temperature', category: 'Physicochemical', value: 32, unit: '°C', confidence: 0.92, source: 'voice_note', benchmark: 'Ambient (25-40°C)' },
    redoxPotential: { name: 'Oxidation-Reduction Potential (ORP)', category: 'Physicochemical', value: +480, unit: 'mV', confidence: 0.91, source: 'lab_pdf', benchmark: '+400 to +600 mV' },
    surfaceTension: { name: 'Surface Tension', category: 'Physicochemical', value: 71.2, unit: 'mN/m', confidence: 0.82, source: 'nir_scan', benchmark: '68 - 75 mN/m' },
    sulfate: { name: 'Sulfate (SO₄²⁻)', category: 'Physicochemical', value: 420, unit: 'ppm', confidence: 0.89, source: 'lab_pdf', benchmark: '< 1000 ppm' },
    nitrate: { name: 'Nitrate (NO₃⁻)', category: 'Physicochemical', value: 35, unit: 'ppm', confidence: 0.87, source: 'lab_pdf', benchmark: '< 100 ppm' },
    phosphate: { name: 'Phosphate (PO₄³⁻)', category: 'Physicochemical', value: 12, unit: 'ppm', confidence: 0.84, source: 'lab_pdf', benchmark: '< 50 ppm' },
    cadmium: { name: 'Cadmium (Cd)', category: 'Heavy Metals', value: 0.12, unit: 'ppm', confidence: 0.95, source: 'lab_pdf', benchmark: '< 0.5 ppm' },
    nickel: { name: 'Nickel (Ni)', category: 'Heavy Metals', value: 18.5, unit: 'ppm', confidence: 0.92, source: 'lab_pdf', benchmark: '< 50 ppm' },
    copper: { name: 'Copper (Cu)', category: 'Heavy Metals', value: 24.0, unit: 'ppm', confidence: 0.90, source: 'lab_pdf', benchmark: '< 50 ppm' },
    arsenic: { name: 'Arsenic (As)', category: 'Heavy Metals', value: 0.08, unit: 'ppm', confidence: 0.94, source: 'lab_pdf', benchmark: '< 1.0 ppm' },
    mercury: { name: 'Mercury (Hg)', category: 'Heavy Metals', value: 0.015, unit: 'ppm', confidence: 0.97, source: 'lab_pdf', benchmark: '< 0.05 ppm' },
    manganese: { name: 'Manganese (Mn)', category: 'Heavy Metals', value: 680, unit: 'ppm', confidence: 0.91, source: 'lab_pdf', benchmark: '< 1,200 ppm' },
    aluminum: { name: 'Aluminum (Al)', category: 'Heavy Metals', value: 145, unit: 'ppm', confidence: 0.88, source: 'lab_pdf', benchmark: '< 300 ppm' },
    tin: { name: 'Tin (Sn)', category: 'Heavy Metals', value: 3.2, unit: 'ppm', confidence: 0.86, source: 'lab_pdf', benchmark: '< 20 ppm' },
    cobalt: { name: 'Cobalt (Co)', category: 'Heavy Metals', value: 1.4, unit: 'ppm', confidence: 0.89, source: 'lab_pdf', benchmark: '< 10 ppm' },
    barium: { name: 'Barium (Ba)', category: 'Heavy Metals', value: 5.6, unit: 'ppm', confidence: 0.88, source: 'lab_pdf', benchmark: '< 50 ppm' },
    antimony: { name: 'Antimony (Sb)', category: 'Heavy Metals', value: 0.45, unit: 'ppm', confidence: 0.85, source: 'lab_pdf', benchmark: '< 5 ppm' },
    toc: { name: 'Total Organic Carbon (TOC)', category: 'Combustion / Co-Processing', value: 180, unit: 'ppm', confidence: 0.89, source: 'lab_pdf', benchmark: '< 500 ppm' },
    cod: { name: 'Chemical Oxygen Demand (COD)', category: 'Combustion / Co-Processing', value: 620, unit: 'mg/L', confidence: 0.87, source: 'lab_pdf', benchmark: '< 1500 mg/L' },
    bod: { name: 'Biochemical Oxygen Demand (BOD5)', category: 'Combustion / Co-Processing', value: 45, unit: 'mg/L', confidence: 0.82, source: 'lab_pdf', benchmark: '< 100 mg/L' },
    ashContent: { name: 'Inorganic Ash Residue @ 850°C', category: 'Combustion / Co-Processing', value: 15.2, unit: '% w/w', confidence: 0.93, source: 'lab_pdf', benchmark: '12 - 18%' },
    volatileMatter: { name: 'Volatile Compounds', category: 'Combustion / Co-Processing', value: 16.8, unit: '% w/w', confidence: 0.90, source: 'nir_scan', benchmark: '15 - 20%' },
    sulfurTotal: { name: 'Total Sulfur (S)', category: 'Combustion / Co-Processing', value: 0.04, unit: '%', confidence: 0.92, source: 'lab_pdf', benchmark: '< 0.5% kiln limit' },
    fluorine: { name: 'Total Fluorine (F⁻)', category: 'Combustion / Co-Processing', value: 14, unit: 'ppm', confidence: 0.89, source: 'lab_pdf', benchmark: '< 50 ppm kiln limit' },
    alkaliTotal: { name: 'Equivalent Alkali (Na₂O + 0.658 K₂O)', category: 'Combustion / Co-Processing', value: 0.22, unit: '%', confidence: 0.86, source: 'lab_pdf', benchmark: '< 0.6% kiln limit' },
    polychlorinatedBiphenyls: { name: 'PCB / POPs Screening', category: 'Hazmat & Safety', value: '< 0.5', unit: 'ppb', confidence: 0.98, source: 'lab_pdf', benchmark: 'Zero tolerance' },
    radioactivity: { name: 'Gross Alpha / Beta Radioactivity', category: 'Hazmat & Safety', value: '< 0.1', unit: 'Bq/g', confidence: 0.99, source: 'lab_pdf', benchmark: 'Background only' },
    corrosivityRate: { name: 'Steel Corrosion Rate (SAE 1020)', category: 'Hazmat & Safety', value: 6.8, unit: 'mm/yr', confidence: 0.94, source: 'lab_pdf', benchmark: '> 6.25 mm/yr (Class 8)' },
    vaporPressure: { name: 'Vapor Pressure @ 20°C', category: 'Hazmat & Safety', value: 16, unit: 'hPa', confidence: 0.85, source: 'nir_scan', benchmark: '< 30 hPa' },
    inhalationToxicity: { name: 'LC50 Inhalation (Rat equiv)', category: 'Hazmat & Safety', value: 3124, unit: 'ppm/1h', confidence: 0.92, source: 'lab_pdf', benchmark: 'CPCB Haz Class' },
    odorThreshold: { name: 'Pungent Acrid Odor Intensity', category: 'Hazmat & Safety', value: 'Moderate Pungent', unit: 'scale', confidence: 0.80, source: 'voice_note', benchmark: 'Pungent HCl fumes' },
    ibcCompatibility: { name: 'HDPE / FRP Container Compatibility', category: 'Logistics', value: 'Approved (Type 31HA1)', unit: 'cert', confidence: 0.96, source: 'photo', benchmark: 'Acid-resistant composite' },
    pumpabilityRating: { name: 'Positive Displacement Pumpability', category: 'Logistics', value: 'High / Standard Diaphragm', unit: 'rating', confidence: 0.93, source: 'photo', benchmark: 'No solid suspension risk' },
    ambientCrystallizationPoint: { name: 'Freezing / Crystallization Temp', category: 'Logistics', value: -18, unit: '°C', confidence: 0.91, source: 'lab_pdf', benchmark: 'No freezing risk in North India' },
    co2FootprintVirgin: { name: 'Virgin HCl Offset Factor', category: 'Logistics', value: 1.42, unit: 'kg CO₂e/kg', confidence: 0.95, source: 'lab_pdf', benchmark: 'Life Cycle Assessment' },
  },
};

// ==========================================
// 4. MATCH OPTIONS (Derived from economics.ts)
// ==========================================

const opt1 = DERIVED_MATCH_OPTIONS[0]; // Shared bundle
const opt3 = DERIVED_MATCH_OPTIONS[1]; // GreenBrick Meerut
const opt2 = DERIVED_MATCH_OPTIONS[2]; // NeutraChem

export const HERO_MATCH_OPTIONS: MatchOption[] = [
  // 1. Shared bundle to Aravali Cement Works (Muzaffarnagar -> Ghaziabad -> kiln)
  {
    id: opt1.id,
    receiverId: 'rec-1',
    wasteIds: ['fp-hero-01', 'gen-2-waste-alkali'],
    title: opt1.title,
    description: 'Muzaffarnagar → Ghaziabad → kiln (two segregated compartments or two ADR vehicles on one milk-run).',
    compatibilityScore: 94,
    rulesPassed: 6,
    rulesTotal: 6,
    distanceKm: opt1.distanceKm, // 820 km (verify on Google Maps)
    truckFillPct: opt1.truckFillPct, // 91%
    revenuePerTonne: opt1.receiverPaymentPerTonne, // 1250
    disposalCostAvoided: opt1.disposalCostAvoidedTotal, // 84000
    netBenefit: opt1.netBenefit, // 40550
    co2SavedTonnes: CO2_ESTIMATED_TONNES, // 1.6 t CO2e (estimated)
    recommended: true,
    isViable: true,
    notes: opt1.notes,
    bundledParties: opt1.parties,
    formulaBreakdown: '(21 t × ₹4,000 baseline disposal avoided) − (820 km × ₹85 freight) + (21 t × ₹1,250 receiver payment) = ₹40,550 net benefit',
    rulesChecked: [
      {
        rule: 'EU BREF (Cement & Lime): Raw Material Clinker Substitute',
        source: 'EU BREF',
        status: 'pass',
        note: 'High Fe (11.8%) serves as beneficial iron flux in raw mix calcination; replaces mined bauxite/hematite additive.',
      },
      {
        rule: 'CPCB Guidelines: Co-processing of Hazardous Wastes in Cement Kilns',
        source: 'CPCB',
        status: 'pass',
        note: 'Heavy metals (Pb 4.8 ppm, Cr 2.1 ppm) are far below maximum trace threshold limits (< 100 ppm).',
      },
      {
        rule: 'Kiln Chloride Loading Constraint (< 0.10% total feed)',
        source: 'CPCB',
        status: 'pass',
        note: 'Chloride is within safe envelope when blended with high-alkaline sludge buffer.',
      },
      {
        rule: 'Segregated Compartment Hazmat Transport (PESO Safety Rules)',
        source: 'CPCB',
        status: 'pass',
        note: 'Two segregated compartments prevent cross-mixing during transit.',
      },
      {
        rule: 'EPA RCRA Waste Minimization / Subpart CC Volatiles Standards',
        source: 'EPA',
        status: 'pass',
        note: 'Zero VOC release detected; vapor recovery couplings verified for loading and unloading manifolds.',
      },
      {
        rule: 'Receiver Capacity & Pre-calciner Temperature Retention (> 1100°C for 2s)',
        source: 'EU BREF',
        status: 'pass',
        note: 'Thermal breakdown of acidic chlorides guaranteed without dioxin/furan synthesis.',
      },
    ],
  },

  // 2. Local neutralization at GreenBrick Meerut (12 t, acid only)
  {
    id: opt3.id,
    receiverId: 'rec-2',
    wasteIds: ['fp-hero-01'],
    title: opt3.title,
    description: opt3.subtitle,
    compatibilityScore: 68,
    rulesPassed: 3,
    rulesTotal: 3,
    distanceKm: opt3.distanceKm, // 65 km (verify on Google Maps)
    truckFillPct: opt3.truckFillPct, // 52%
    revenuePerTonne: opt3.receiverPaymentPerTonne, // -3000
    disposalCostAvoided: opt3.disposalCostAvoidedTotal, // 48000
    netBenefit: opt3.netBenefit, // 6475
    co2SavedTonnes: CO2_ESTIMATED_TONNES,
    recommended: false,
    isViable: true,
    notes: opt3.notes,
    bundledParties: opt3.parties,
    formulaBreakdown: '(12 t × ₹4,000 baseline disposal avoided) − (65 km × ₹85 freight) − (12 t × ₹3,000 acceptance fee) = ₹6,475 net benefit',
    rulesChecked: [
      {
        rule: 'CPCB TCLP Leaching Toxicity Test for Construction Products',
        source: 'CPCB',
        status: 'pass',
        note: 'Requires stoichiometric lime buffering to prevent leaching in outdoor rain exposure.',
      },
      {
        rule: 'Heavy Metal Immobilization In Silicate Matrix',
        source: 'EU BREF',
        status: 'pass',
        note: 'Meets non-load bearing compressive strength criteria (Class 7.5 MPa).',
      },
      {
        rule: 'Local Air Quality Regulations (UPPCB Meerut Industrial Cluster)',
        source: 'CPCB',
        status: 'pass',
        note: 'Wet scrubber operates within emission parameters.',
      },
    ],
  },

  // 3. Direct acid route to NeutraChem (12 t, acid only)
  {
    id: opt2.id,
    receiverId: 'rec-4',
    wasteIds: ['fp-hero-01'],
    title: opt2.title,
    description: opt2.subtitle,
    compatibilityScore: 82,
    rulesPassed: 3,
    rulesTotal: 3,
    distanceKm: opt2.distanceKm, // 890 km (verify on Google Maps)
    truckFillPct: opt2.truckFillPct, // 52%
    revenuePerTonne: opt2.receiverPaymentPerTonne, // 1500
    disposalCostAvoided: opt2.disposalCostAvoidedTotal, // 48000
    netBenefit: opt2.netBenefit, // -9650
    co2SavedTonnes: CO2_ESTIMATED_TONNES,
    recommended: false,
    isViable: false,
    notes: opt2.notes,
    bundledParties: opt2.parties,
    formulaBreakdown: '(12 t × ₹4,000 baseline disposal avoided) − (890 km × ₹85 freight) + (12 t × ₹1,500 receiver payment) = −₹9,650 (unviable alone)',
    rulesChecked: [
      {
        rule: 'Chemical Re-synthesis Assay Fe Level (> 100,000 ppm)',
        source: 'CPCB',
        status: 'pass',
        note: 'Ideal Fe content for ferric chloride coagulant conversion.',
      },
      {
        rule: 'Interstate Hazmat Transit Clearance (MoEFCC Schedule III)',
        source: 'CPCB',
        status: 'pass',
        note: 'Compliant with interstate transit documentation.',
      },
      {
        rule: 'Minimum Freight Fill Threshold (Economic Viability Constraint)',
        source: 'EPA',
        status: 'warn',
        note: 'Deadhead / half-capacity penalty: 48% unutilized container space makes single run economically negative.',
      },
    ],
  },
];

// ==========================================
// 5. RECEIVER INCOMING OFFERS (Aravali Cement Works)
// ==========================================

export interface ReceiverOfferItem {
  id: string;
  sourceCompany: string;
  location: string;
  material: string;
  tonnes: number;
  hazardClass: string;
  compatibility: number;
  pricePerTonneInr: number;
  eta: string;
  status: 'Pending' | 'Accepted' | 'Declined';
  chloridePpm: number;
  calorificMjKg: number;
}

export const ARAVALI_INCOMING_OFFERS: ReceiverOfferItem[] = [
  {
    id: 'off-101',
    sourceCompany: 'Bharat Paper + Shree Ganesh (Bundled)',
    location: 'Muzaffarnagar + Ghaziabad, UP',
    material: 'Alkaline Sludge + Spent Pickle Liquor Bundle',
    tonnes: 21.0,
    hazardClass: 'Class 8 (Two Segregated Compartments)',
    compatibility: 94,
    pricePerTonneInr: 1250,
    eta: '22 Oct, 02:00', // Matches arrival time!
    status: 'Pending',
    chloridePpm: 104000,
    calorificMjKg: 1.8,
  },
  {
    id: 'off-102',
    sourceCompany: 'Krishna Textile Processing',
    location: 'Panipat, HR',
    material: 'Dye-house ETP Sludge Cake',
    tonnes: 14.5,
    hazardClass: 'Class 9 (Miscellaneous)',
    compatibility: 87,
    pricePerTonneInr: 800,
    eta: '24 Oct 2026',
    status: 'Pending',
    chloridePpm: 24000,
    calorificMjKg: 14.2,
  },
  {
    id: 'off-103',
    sourceCompany: 'Rana Plastics Ltd.',
    location: 'Faridabad, HR',
    material: 'Polyolefin Purge & Film Shreds',
    tonnes: 18.0,
    hazardClass: 'Non-hazardous',
    compatibility: 96,
    pricePerTonneInr: 3200,
    eta: '25 Oct 2026',
    status: 'Accepted',
    chloridePpm: 1200,
    calorificMjKg: 36.5,
  },
  {
    id: 'off-104',
    sourceCompany: 'Singh Foundry Works',
    location: 'Ludhiana, PB',
    material: 'Spent Phenolic Moulding Sand',
    tonnes: 32.0,
    hazardClass: 'Non-hazardous',
    compatibility: 76,
    pricePerTonneInr: 450,
    eta: '27 Oct 2026',
    status: 'Pending',
    chloridePpm: 800,
    calorificMjKg: 0.1,
  },
];

// ==========================================
// 6. HERO DEAL (Screen 3: Settle)
// ==========================================

export const HERO_INITIAL_DEAL: Deal = {
  id: 'DEAL-WM-2026-9042',
  matchId: 'match-opt-1',
  amountInr: ESCROW_HERO_DEAL.totalAmountInr, // ₹26,250
  stage: 'Locked',
  contractAddress: '0x882E...79bA',
  chainName: 'testnet (simulated)',
  escrowLockedAt: '21 Oct 2026, 08:00 IST',
  generatorName: 'Shree Ganesh Galvanizers (Ghaziabad)',
  partnerGeneratorName: 'Bharat Paper & Board Mills (Muzaffarnagar)',
  receiverName: 'Aravali Cement Works (Kiln #3, Nimbahera)',
  materialsSummary: 'Bundled Caustic Sludge (9t) + Acidic Pickle Liquor (12t)',
  totalTonnes: 21.0,
  stage1Released: false,
  stage2Released: false,
  labReportStatus: 'pending',
  disputeActive: false,
  verification: {
    result: 'PASS',
    timestamp: '22 Oct 2026, 02:15 IST',
    operator: 'N. Sharma (Chief Chemist, Kiln QA/QC)',
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
        measured: '179,400 ppm',
        pass: true,
        margin: 'Within kiln acceptance limits',
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
        measured: 'Pb 4.6, Cd 0.11, Hg 0.01 ppm',
        pass: true,
        margin: 'All trace elements compliant',
      },
    ],
  },
  certificate: {
    id: 'CERT-WM-CO2-2026-8842',
    type: 'Carbon',
    tonnes: 21.0,
    standard: 'Verra-methodology-aligned estimate, not an issued credit.',
    issuedAt: '22 Oct 2026, 02:30 IST',
    txHash: '0x4f92c7104b28d7120a48b919d381023a9d77e481c7e92384a8b7c938472910fa',
    issuer: 'WasteMatch Settlement Engine',
    beneficiary: 'Shree Ganesh Galvanizers & Aravali Cement Co.',
    co2eAvoidedTonnes: CO2_ESTIMATED_TONNES,
    registryUrl: 'https://registry.wastematch.io/cert/WM-CO2-2026-8842',
  },
};
