import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';

// In-Memory Seed Storage for API persistence during server runtime
export let SELLER_WASTE_STREAMS = [
  {
    id: 'ws-01',
    sellerId: 'usr-seller-01',
    name: 'Spent Hydrochloric Acid (Pickle Liquor)',
    sourceProcess: 'Mild Steel Wire & Structural Descaling Vat 2',
    physicalForm: 'liquid',
    estimatedMonthlyQuantityTonnes: 12.0,
    locationAddress: 'Site-4 Industrial Area, Sahibabad, Ghaziabad',
    pincode: '201010',
    hazardClass: 'Class 8 Corrosive',
    unNumber: 'UN 1789',
    hasLabReport: true,
    labReportUrl: '/docs/sample_sgs_assay_sg08.pdf',
    labReportUploadedAt: '2026-10-27T10:00:00Z',
    fingerprint: {
      pH: 0.85,
      chloridePpm: 182000,
      ironPpm: 118500,
      freeHclPct: 4.8,
      densityGcm3: 1.284,
      calorificValueMjKg: 0.4,
      moisturePct: 68.4,
      hazardClass: 'Class 8 Corrosive',
    },
    confidenceScores: {
      pH: 'High',
      chloride: 'High',
      metals: 'High',
      calorificValue: 'High',
      moisture: 'High',
      hazardClass: 'High',
    },
    status: 'Listed',
  },
  {
    id: 'ws-02',
    sellerId: 'usr-seller-02',
    name: 'Alkaline Lime/Caustic Sludge',
    sourceProcess: 'Recycled Kraft Paper Chemical Pulping Clarifier',
    physicalForm: 'sludge',
    estimatedMonthlyQuantityTonnes: 9.0,
    locationAddress: 'Bhopa Road Industrial Corridor, Muzaffarnagar',
    pincode: '251001',
    hazardClass: 'Class 9 Miscellaneous Environmental',
    unNumber: 'UN 3077',
    hasLabReport: false, // Triggers "Find Labs Near Me" Referral Button!
    labReportUrl: null,
    fingerprint: {
      pH: 11.8,
      chloridePpm: 4500,
      calciumCarbonatePct: 48.0,
      totalAlkalinityMgL: 85000,
      moisturePct: 62.0,
      calorificValueMjKg: 0.0,
      hazardClass: 'Class 9',
    },
    confidenceScores: {
      pH: 'Medium',
      chloride: 'Low',
      metals: 'Low',
      calorificValue: 'Medium',
      moisture: 'Medium',
      hazardClass: 'Medium',
    },
    status: 'Draft',
  },
  {
    id: 'ws-03',
    sellerId: 'usr-seller-01',
    name: 'Spent Resin-Bonded Foundry Sand',
    sourceProcess: 'Hot Metal Casting Sand Core De-moulding Line',
    physicalForm: 'solid',
    estimatedMonthlyQuantityTonnes: 15.0,
    locationAddress: 'Site-4 Industrial Area, Sahibabad, Ghaziabad',
    pincode: '201010',
    hazardClass: 'Non-Hazardous Industrial Waste',
    unNumber: 'UN NA',
    hasLabReport: false, // Low confidence -> Triggers "Find Labs Near Me"!
    labReportUrl: null,
    fingerprint: {
      silicaPct: 88.5,
      phenolicResinPct: 1.8,
      lossOnIgnitionPct: 2.4,
      moisturePct: 3.2,
      hazardClass: 'Non-Hazardous',
    },
    confidenceScores: {
      metals: 'Low',
      leachateToxicity: 'Low',
      calorificValue: 'Low',
      hazardClass: 'Medium',
    },
    status: 'Draft',
  },
];

export let SELLER_LISTINGS = [
  {
    id: 'list-01',
    wasteStreamId: 'ws-01',
    sellerId: 'usr-seller-01',
    askingPricePerTonne: 1250,
    availableQuantityTonnes: 12.0,
    minimumBatchTonnes: 10.0,
    status: 'matched',
    publishedAt: '2026-10-27T08:00:00Z',
  },
];

export let SELLER_OFFERS = [
  {
    id: 'match-hero-01',
    listingId: 'list-01',
    wasteStreamId: 'ws-01',
    wasteStreamName: 'Spent Hydrochloric Acid (Pickle Liquor)',
    sellerId: 'usr-seller-01',
    buyerId: 'usr-buyer-01',
    buyerName: 'Aravali Cement Works (AFR Kiln)',
    buyerLocation: 'Nimbahera, Rajasthan',
    offeredPricePerTonne: 1250,
    quantityTonnes: 12.0,
    distanceKm: 820,
    estimatedTransportCost: 69700,
    netEconomicGain: 40550,
    co2eAvoidedTonnes: 1.6,
    status: 'Accepted',
    counterTerms: null,
  },
];

export let SELLER_SHIPMENTS = [
  {
    id: 'ship-01',
    matchId: 'match-hero-01',
    sellerId: 'usr-seller-01',
    buyerId: 'usr-buyer-01',
    buyerName: 'Aravali Cement Works',
    transporterId: 'trans-01',
    transporterName: 'SafeChem Dedicated Liquid Logistics',
    scheduledDispatchDate: '2026-10-28',
    status: 'In Transit', // Scheduled -> Picked Up -> In Transit -> Delivered
    manifestForm10No: 'FORM10-UP-2026-9042',
    manifestData: {
      senderAuthNo: 'UPPCB/HW/GZB/2024/7741',
      receiverAuthNo: 'RSPCB/HW/AFR/2023/11',
      transporterPermitNo: 'UPPCB/HAZ/TR/2023/1108',
      vehicleRegistrationNo: 'UP14-BT-8902',
      wasteDescription: 'Spent Hydrochloric Acid (Class 8 UN 1789)',
      quantityTonnes: 12.0,
      packagingType: 'Rubber-Lined Tanker (Type 31HA1)',
    },
    tremCardData: {
      unNumber: 'UN 1789',
      cargoName: 'Hydrochloric Acid Aqueous Solution',
      hazardClass: 'Class 8 Corrosive Liquid',
      ppeRequirement: 'Full acid rubber suit, neoprene gloves, face shield, SCBA respirator',
      spillProtocol: 'Isolate 50m. Neutralize with dry sodium carbonate or lime slurry. Do not wash into storm drains.',
      emergencyPhone: '1800-180-1111 (HazChem Desk)',
    },
    escrowStatus: 'Held',
    escrowAmountInr: 15000,
    qcResult: 'Pending',
    diversionCertificateUrl: null,
    invoiceUrl: '/docs/invoice_inv_2026_0941.pdf',
  },
];

// Reference Labs for Referral Near Me
export const LABS_DIRECTORY = [
  {
    id: 'lab-01',
    name: 'Shriram Institute for Industrial Research',
    address: '19, University Road, Timarpur',
    city: 'Delhi',
    state: 'Delhi NCR',
    pincode: '110007',
    distanceKm: 24,
    contactPhone: '+91 11 2766 7267',
    contactEmail: 'hazmat-testing@shriraminstitute.org',
    nablRegNo: 'NABL TC-5012',
    testTypes: 'Targeted Heavy Metals (Pb, Hg, Cd, As), TCLP Leachate, Bomb Calorimetry, Flash Point',
    indicativePricing: '₹3,800 - ₹4,200',
    turnaroundDays: 2,
    rating: 4.9,
  },
  {
    id: 'lab-02',
    name: 'SGS India Pvt. Ltd. (Environmental Testing Hub)',
    address: 'Plot 250, Udyog Vihar Phase IV',
    city: 'Gurugram',
    state: 'Haryana',
    pincode: '122016',
    distanceKm: 38,
    contactPhone: '+91 124 677 6300',
    contactEmail: 'env.gurgaon@sgs.com',
    nablRegNo: 'NABL TC-5482',
    testTypes: 'Full CPCB Co-Processing Panel, Cold-Vapor AAS for Mercury, Total Chlorides, Fluorides',
    indicativePricing: '₹4,200 - ₹4,800',
    turnaroundDays: 2,
    rating: 4.8,
  },
];

// Transporter reference directory
export const TRANSPORTERS_DIRECTORY = [
  {
    id: 'trans-01',
    name: 'SafeChem Dedicated Liquid Logistics',
    baseCity: 'Ghaziabad',
    coverageStates: 'Uttar Pradesh, Delhi NCR, Haryana, Rajasthan',
    vehicleTypes: 'Acid-Resistant Rubber-Lined (Ebonite) ISO Tank Container (Class 8 Approved)',
    capacityTonnes: 24.0,
    authorizedHazardous: true,
    spcbPermitNo: 'UPPCB/HAZ/TR/2023/1108',
    contactPhone: '+91 98110 44219',
    pricePerKm: 85,
  },
  {
    id: 'trans-02',
    name: 'North-West HazChem Heavy Tankers',
    baseCity: 'Ghaziabad',
    coverageStates: 'Delhi NCR, Uttar Pradesh, Rajasthan, Madhya Pradesh',
    vehicleTypes: 'Dual-Compartment Vinyl-Ester FRP Acid Road Tanker (Class 8 & 9 Approved)',
    capacityTonnes: 26.0,
    authorizedHazardous: true,
    spcbPermitNo: 'CPCB/TRANS/HAZ/2024/9021',
    contactPhone: '+91 97170 33812',
    pricePerKm: 88,
  },
];

// --- SELLER CONTROLLER HANDLERS ---

export const getSellerStreams = (req: AuthenticatedRequest, res: Response) => {
  const sellerId = req.user?.id || 'usr-seller-01';
  const streams = SELLER_WASTE_STREAMS.filter((s) => s.sellerId === sellerId);
  return res.json({ wasteStreams: streams });
};

export const createWasteStream = (req: AuthenticatedRequest, res: Response) => {
  const sellerId = req.user?.id || 'usr-seller-01';
  const { name, sourceProcess, physicalForm, estimatedMonthlyQuantityTonnes, locationAddress, pincode, hasLabReport } = req.body;

  const newStream = {
    id: `ws-${Date.now()}`,
    sellerId,
    name: name || 'New Byproduct Stream',
    sourceProcess: sourceProcess || 'Manufacturing Line Descaling',
    physicalForm: physicalForm || 'liquid',
    estimatedMonthlyQuantityTonnes: Number(estimatedMonthlyQuantityTonnes) || 10.0,
    locationAddress: locationAddress || 'Industrial Area',
    pincode: pincode || '201010',
    hazardClass: 'Class 8 Corrosive',
    unNumber: 'UN 1789',
    hasLabReport: Boolean(hasLabReport),
    labReportUrl: hasLabReport ? '/docs/sample_report.pdf' : null,
    fingerprint: {
      pH: 1.2,
      chloridePpm: 145000,
      ironPpm: 92000,
      densityGcm3: 1.25,
      calorificValueMjKg: 0.5,
      moisturePct: 70.0,
      hazardClass: 'Class 8',
    },
    confidenceScores: hasLabReport
      ? { pH: 'High', chloride: 'High', metals: 'High', calorificValue: 'High', moisture: 'High', hazardClass: 'High' }
      : { pH: 'Medium', chloride: 'Low', metals: 'Low', calorificValue: 'Low', moisture: 'Medium', hazardClass: 'Medium' },
    status: 'Draft',
  };

  SELLER_WASTE_STREAMS.unshift(newStream);
  return res.status(201).json({ message: 'Waste stream created', wasteStream: newStream });
};

export const uploadLabReportForStream = (req: AuthenticatedRequest, res: Response) => {
  const { streamId } = req.params;
  const stream = SELLER_WASTE_STREAMS.find((s) => s.id === streamId);
  if (!stream) {
    return res.status(404).json({ error: 'Waste stream not found' });
  }

  stream.hasLabReport = true;
  stream.labReportUrl = `/docs/uploaded_lab_report_${streamId}.pdf`;
  stream.confidenceScores = {
    pH: 'High',
    chloride: 'High',
    metals: 'High',
    calorificValue: 'High',
    moisture: 'High',
    hazardClass: 'High',
  };

  return res.json({
    message: 'Lab report uploaded successfully. AI Chemical Fingerprint reprocessed to High confidence.',
    wasteStream: stream,
  });
};

export const getNearbyLabsForSeller = (req: AuthenticatedRequest, res: Response) => {
  const { pincode } = req.query;
  // Read-only reference directory for seller reference
  return res.json({
    sellerPincode: pincode || req.user?.pincode || '201010',
    partnerLabs: LABS_DIRECTORY,
    note: 'WasteMatch does not facilitate sample pickup or payment in MVP. Contact accredited labs independently.',
  });
};

export const publishListing = (req: AuthenticatedRequest, res: Response) => {
  const { streamId, askingPricePerTonne } = req.body;
  const stream = SELLER_WASTE_STREAMS.find((s) => s.id === streamId);
  if (!stream) {
    return res.status(404).json({ error: 'Stream not found' });
  }

  stream.status = 'Listed';
  const newListing = {
    id: `list-${Date.now()}`,
    wasteStreamId: stream.id,
    sellerId: stream.sellerId,
    askingPricePerTonne: Number(askingPricePerTonne) || 1250,
    availableQuantityTonnes: stream.estimatedMonthlyQuantityTonnes,
    minimumBatchTonnes: 5.0,
    status: 'active',
    publishedAt: new Date().toISOString(),
  };

  SELLER_LISTINGS.unshift(newListing);
  return res.json({ message: 'Listing published to marketplace', listing: newListing });
};

export const getSellerOffers = (req: AuthenticatedRequest, res: Response) => {
  const sellerId = req.user?.id || 'usr-seller-01';
  const offers = SELLER_OFFERS.filter((o) => o.sellerId === sellerId);
  return res.json({ offers });
};

export const handleOfferAction = (req: AuthenticatedRequest, res: Response) => {
  const { offerId } = req.params;
  const { action, counterPrice } = req.body; // 'Accept' | 'Reject' | 'Counter'

  const offer = SELLER_OFFERS.find((o) => o.id === offerId);
  if (!offer) {
    return res.status(404).json({ error: 'Offer not found' });
  }

  if (action === 'Accept') {
    offer.status = 'Accepted';
  } else if (action === 'Reject') {
    offer.status = 'Declined';
  } else if (action === 'Counter') {
    offer.status = 'Countered';
    offer.offeredPricePerTonne = Number(counterPrice) || offer.offeredPricePerTonne;
    offer.counterTerms = `Counter-offer: ₹${counterPrice}/MT`;
  }

  return res.json({ message: `Offer marked as ${offer.status}`, offer });
};

export const getSellerShipments = (req: AuthenticatedRequest, res: Response) => {
  const sellerId = req.user?.id || 'usr-seller-01';
  const shipments = SELLER_SHIPMENTS.filter((s) => s.sellerId === sellerId);
  return res.json({ shipments, recommendedTransporters: TRANSPORTERS_DIRECTORY });
};

export const updateShipmentStatus = (req: AuthenticatedRequest, res: Response) => {
  const { shipmentId } = req.params;
  const { status } = req.body; // 'Picked Up' | 'In Transit' | 'Delivered'

  const shipment = SELLER_SHIPMENTS.find((s) => s.id === shipmentId);
  if (!shipment) {
    return res.status(404).json({ error: 'Shipment not found' });
  }

  shipment.status = status;
  return res.json({ message: `Shipment status manually updated to ${status}`, shipment });
};

export const exportAuditPack = (req: AuthenticatedRequest, res: Response) => {
  return res.json({
    message: 'SPCB Form 3 Annual Compliance Audit Pack generated',
    downloadUrl: '/docs/WasteMatch_Annual_Audit_Pack_SPCB_Form3.zip',
    manifestCount: SELLER_SHIPMENTS.length,
    totalDivertedTonnes: 12.0,
  });
};
