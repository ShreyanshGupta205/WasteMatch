import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import { SELLER_SHIPMENTS, SELLER_OFFERS } from './sellerController';

export let BUYER_PROFILE = {
  buyerId: 'usr-buyer-01',
  facilityName: 'Aravali Cement Works (AFR Co-Processing Kiln)',
  spcbAuthNo: 'RSPCB/HW/AFR/2023/11',
  spcbValidTill: '2028-06-30',
  monthlyQuotaTonnes: 450.0,
  minPh: 0.5,
  maxPh: 12.5,
  maxChloridePpm: 200000.0,
  maxMetalsPpm: 100.0,
  maxMoisturePct: 75.0,
  prohibitedContaminants: 'Radioactive isotopes, PCB/POPs > 0.5 ppb, Dioxins',
  acceptedCategories: ['Spent Acidic Liquor (HCl)', 'Alkaline Sludge', 'Paint Sludge', 'Solid Recovered Fuel'],
  serviceRadiusKm: 1000,
  indicativePriceRange: '₹1,000 - ₹1,500/MT',
};

export const getBuyerProfile = (req: AuthenticatedRequest, res: Response) => {
  return res.json({ profile: BUYER_PROFILE });
};

export const updateBuyerProfile = (req: AuthenticatedRequest, res: Response) => {
  BUYER_PROFILE = { ...BUYER_PROFILE, ...req.body };
  return res.json({ message: 'Receiver profile and acceptance limits updated', profile: BUYER_PROFILE });
};

export const getIncomingMatchesForBuyer = (req: AuthenticatedRequest, res: Response) => {
  // Feed of generator listings matching acceptance limits
  const matches = [
    {
      id: 'match-feed-01',
      streamId: 'ws-01',
      sellerName: 'Shree Ganesh Galvanizers Plant #2',
      sellerLocation: 'Ghaziabad, UP (820 km via NH48)',
      material: 'Spent Hydrochloric Acid (UN 1789)',
      quantityTonnes: 12.0,
      askingPricePerTonne: 1250,
      transportCostEstimate: 69700,
      netEconomicGain: 40550,
      fingerprint: {
        pH: 0.85,
        chloridePpm: 182000,
        ironPpm: 118500,
        moisturePct: 68.4,
        hazardClass: 'Class 8 Corrosive',
      },
      confidenceScores: {
        pH: 'High',
        chloride: 'High',
        metals: 'High',
        moisture: 'High',
      },
      compatibilityScore: 94,
      status: 'Open for Counter / Acceptance',
    },
    {
      id: 'match-feed-02',
      streamId: 'ws-02',
      sellerName: 'Bharat Paper & Board Mills',
      sellerLocation: 'Muzaffarnagar, UP (780 km)',
      material: 'Alkaline Lime/Caustic Sludge',
      quantityTonnes: 9.0,
      askingPricePerTonne: 800,
      transportCostEstimate: 54000,
      netEconomicGain: 28000,
      fingerprint: {
        pH: 11.8,
        calciumCarbonatePct: 48.0,
        moisturePct: 62.0,
        hazardClass: 'Class 9',
      },
      confidenceScores: {
        pH: 'Medium',
        chloride: 'Low',
        metals: 'Low',
      },
      compatibilityScore: 82,
      status: 'Open for Counter / Acceptance',
    },
  ];

  return res.json({ matches });
};

export const buyerRespondOffer = (req: AuthenticatedRequest, res: Response) => {
  const { matchId } = req.params;
  const { action, counterPrice, counterTerms } = req.body; // 'Accept' | 'Decline' | 'Counter'

  return res.json({
    message: `Buyer successfully responded to match ${matchId} with action ${action}`,
    matchId,
    status: action === 'Accept' ? 'Accepted & Escrow Reserved' : action === 'Counter' ? 'Counter-Offer Sent' : 'Declined',
    counterPrice,
  });
};

export const getBuyerDeliveries = (req: AuthenticatedRequest, res: Response) => {
  // Accepted shipments incoming to Aravali Cement kiln
  return res.json({
    deliveries: SELLER_SHIPMENTS,
  });
};

export const markDeliveryReceivedAndUploadCopy4 = (req: AuthenticatedRequest, res: Response) => {
  const { shipmentId } = req.params;
  const shipment = SELLER_SHIPMENTS.find((s) => s.id === shipmentId);
  if (!shipment) {
    return res.status(404).json({ error: 'Shipment not found' });
  }

  shipment.status = 'Delivered';
  shipment.form10Copy4Url = `/docs/form10_signed_copy4_${shipmentId}.pdf`;

  return res.json({
    message: 'Delivery marked as Received. Signed Form 10 Copy 4 uploaded as proof of receipt.',
    shipment,
  });
};

export const performQcCheck = (req: AuthenticatedRequest, res: Response) => {
  const { shipmentId } = req.params;
  const { qcResult, qcNotes } = req.body; // 'Passed' | 'Failed'

  const shipment = SELLER_SHIPMENTS.find((s) => s.id === shipmentId);
  if (!shipment) {
    return res.status(404).json({ error: 'Shipment not found' });
  }

  shipment.qcResult = qcResult;
  shipment.qcNotes = qcNotes || (qcResult === 'Passed' ? 'pH 0.88, Cl 180k ppm verified at Gate #4' : 'Chloride out of spec');

  if (qcResult === 'Passed') {
    // Triggers Escrow Release!
    shipment.escrowStatus = 'Released';
  } else {
    // Triggers Escrow Dispute!
    shipment.escrowStatus = 'Disputed';
  }

  return res.json({
    message: `QC Check ${qcResult}. Escrow status updated to ${shipment.escrowStatus}.`,
    shipment,
  });
};

export const issueDiversionCertificate = (req: AuthenticatedRequest, res: Response) => {
  const { shipmentId } = req.params;
  const shipment = SELLER_SHIPMENTS.find((s) => s.id === shipmentId);
  if (!shipment) {
    return res.status(404).json({ error: 'Shipment not found' });
  }

  const certificate = {
    certificateNo: `DIV-ARAVALI-2026-${Date.now().toString().slice(-4)}`,
    issuedBy: 'Aravali Cement Works Kiln (AFR Division)',
    beneficiaryGenerator: 'Shree Ganesh Galvanizers Plant #2',
    tonnesDiverted: 12.0,
    co2eAvoidedTonnes: 1.6,
    endUse: 'Cement Clinker Fe Corrective Additive (replaces virgin bauxite/iron ore)',
    issuedAt: new Date().toISOString(),
    pdfUrl: `/docs/diversion_certificate_${shipmentId}.pdf`,
  };

  shipment.diversionCertificateUrl = certificate.pdfUrl;

  return res.json({
    message: 'Official Waste Diversion Certificate issued to generator.',
    certificate,
  });
};

export const depositEscrowFunds = (req: AuthenticatedRequest, res: Response) => {
  const { matchId, amount } = req.body;
  return res.json({
    message: `₹${amount || 15000} successfully deposited and locked in smart escrow account.`,
    matchId,
    escrowStatus: 'Held',
  });
};
