import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import { LABS_DIRECTORY, TRANSPORTERS_DIRECTORY, SELLER_SHIPMENTS, SELLER_OFFERS } from './sellerController';

export let ADMIN_USERS_LIST = [
  {
    id: 'usr-seller-01',
    role: 'seller',
    businessName: 'Shree Ganesh Galvanizers Plant #2',
    gstin: '09AAACS1234F1Z5',
    pan: 'AAACS1234F',
    city: 'Ghaziabad',
    state: 'Uttar Pradesh',
    spcbAuthNo: 'UPPCB/HW/GZB/2024/7741',
    validTill: '2027-12-31',
    authorizedCategories: 'Schedule I #26.1 (Spent Acid)',
    verificationStatus: 'Verified',
    documents: [
      { name: 'GST Certificate', url: '/docs/gst_shreeganesh.pdf', verified: true },
      { name: 'PAN Card', url: '/docs/pan_shreeganesh.pdf', verified: true },
      { name: 'SPCB CTO Consent', url: '/docs/cto_shreeganesh.pdf', verified: true },
      { name: 'SPCB Hazardous Waste Authorization', url: '/docs/hw_auth_shreeganesh.pdf', verified: true },
    ],
  },
  {
    id: 'usr-seller-02',
    role: 'seller',
    businessName: 'Bharat Paper & Board Mills',
    gstin: '09BBBCB5678G2Z6',
    pan: 'BBBCB5678G',
    city: 'Muzaffarnagar',
    state: 'Uttar Pradesh',
    spcbAuthNo: 'UPPCB/HW/MZF/2023/3412',
    validTill: '2026-11-30',
    authorizedCategories: 'Schedule I #33.2 (Alkaline Sludge)',
    verificationStatus: 'Verified',
    documents: [
      { name: 'GST Certificate', url: '/docs/gst_bharatpaper.pdf', verified: true },
      { name: 'SPCB HW Auth', url: '/docs/hw_bharatpaper.pdf', verified: true },
    ],
  },
  {
    id: 'usr-buyer-01',
    role: 'buyer',
    businessName: 'Aravali Cement Works (AFR Co-Processing Kiln)',
    gstin: '08AAACA9876H1Z1',
    pan: 'AAACA9876H',
    city: 'Nimbahera',
    state: 'Rajasthan',
    spcbAuthNo: 'RSPCB/HW/AFR/2023/11',
    validTill: '2028-06-30',
    authorizedCategories: 'Acidic Spent Liquor, Alkaline Sludge, Paint Sludge, RDF',
    verificationStatus: 'Verified',
    documents: [
      { name: 'CPCB Recycler Registration', url: '/docs/cpcb_aravali.pdf', verified: true },
      { name: 'RSPCB Co-Processing Consent', url: '/docs/rspcb_aravali.pdf', verified: true },
    ],
  },
  {
    id: 'usr-buyer-02',
    role: 'buyer',
    businessName: 'GreenBrick Eco-Industries',
    gstin: '09DDDCG4321K3Z9',
    pan: 'DDDCG4321K',
    city: 'Meerut',
    state: 'Uttar Pradesh',
    spcbAuthNo: 'UPPCB/HW/MRT/2022/9901',
    validTill: '2027-04-15',
    authorizedCategories: 'Foundry Sand, Fly Ash, Inorganic Sludge',
    verificationStatus: 'Verified',
    documents: [
      { name: 'Factory License', url: '/docs/factory_greenbrick.pdf', verified: true },
      { name: 'SPCB Consent to Operate', url: '/docs/cto_greenbrick.pdf', verified: true },
    ],
  },
  {
    id: 'usr-seller-03-pending',
    role: 'seller',
    businessName: 'Apex Electroplaters & Anodizers',
    gstin: '07EEEEA1111B1Z2',
    pan: 'EEEEA1111B',
    city: 'Faridabad',
    state: 'Haryana',
    spcbAuthNo: 'HSPCB/HW/FBD/2024/901',
    validTill: '2027-01-31',
    authorizedCategories: 'Schedule I #12.1 (Cyanide / Chromium Sludge)',
    verificationStatus: 'Pending',
    documents: [
      { name: 'GST Certificate', url: '/docs/gst_apex.pdf', verified: false },
      { name: 'HSPCB Authorization Pending Review', url: '/docs/hw_apex.pdf', verified: false },
    ],
  },
];

// --- ADMIN HANDLERS ---

export const getAdminUsers = (req: AuthenticatedRequest, res: Response) => {
  return res.json({ users: ADMIN_USERS_LIST });
};

export const verifyUserAccount = (req: AuthenticatedRequest, res: Response) => {
  const { userId } = req.params;
  const { status, rejectionReason } = req.body; // 'Verified' | 'Rejected' | 'Suspended'

  const user = ADMIN_USERS_LIST.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: 'User account not found' });
  }

  user.verificationStatus = status;
  return res.json({
    message: `Account status for ${user.businessName} updated to ${status}`,
    user,
    rejectionReason,
  });
};

export const getAdminTransactions = (req: AuthenticatedRequest, res: Response) => {
  return res.json({
    matches: SELLER_OFFERS,
    shipments: SELLER_SHIPMENTS,
    escrowMonitor: [
      {
        id: 'esc-01',
        dealId: 'match-hero-01',
        buyer: 'Aravali Cement Works',
        seller: 'Shree Ganesh Galvanizers',
        amount: 15000,
        status: SELLER_SHIPMENTS[0]?.escrowStatus || 'Held',
        heldDate: '2026-10-27',
      },
    ],
    disputeQueue: SELLER_SHIPMENTS.filter((s) => s.escrowStatus === 'Disputed').map((s) => ({
      shipmentId: s.id,
      manifestNo: s.manifestForm10No,
      reason: s.qcNotes || 'QC Check Failed at Kiln Gate #4',
      amountInr: s.escrowAmountInr,
    })),
  });
};

export const resolveDispute = (req: AuthenticatedRequest, res: Response) => {
  const { shipmentId } = req.params;
  const { resolution } = req.body; // 'ReleaseToSeller' | 'RefundToBuyer'

  const shipment = SELLER_SHIPMENTS.find((s) => s.id === shipmentId);
  if (shipment) {
    shipment.escrowStatus = resolution === 'ReleaseToSeller' ? 'Released' : 'Refunded';
  }

  return res.json({
    message: `Dispute resolved by Admin. Escrow funds ${resolution === 'ReleaseToSeller' ? 'released to seller' : 'refunded to buyer'}.`,
    shipment,
  });
};

export const getComplianceAlertsAndMetrics = (req: AuthenticatedRequest, res: Response) => {
  return res.json({
    metrics: {
      totalTonnesDiverted: 148.5,
      totalCo2eAvoidedTonnes: 19.8,
      totalTransactionValueInr: 185600,
      activeMatches: SELLER_OFFERS.length,
      verifiedEntities: ADMIN_USERS_LIST.filter((u) => u.verificationStatus === 'Verified').length,
    },
    complianceAlerts: [
      {
        id: 'alt-01',
        severity: 'high',
        type: 'Interstate Hazardous Waste Movement',
        title: 'Interstate Movement (UP to Rajasthan) under Rule 18',
        details: '12 MT Spent HCl shipment from Ghaziabad (UPPCB) to Nimbahera (RSPCB). Intimation letters served to both SPCBs.',
      },
      {
        id: 'alt-02',
        severity: 'medium',
        type: 'Authorization Expiry Warning',
        title: 'Bharat Paper SPCB HW Auth Expiry in 33 Days',
        details: 'Authorization UPPCB/HW/MZF/2023/3412 expires on 30-Nov-2026. Renewal application pending.',
      },
    ],
  });
};

// Labs Directory CRUD (Reference Data Only)
export const addLabPartner = (req: AuthenticatedRequest, res: Response) => {
  const newLab = {
    id: `lab-${Date.now()}`,
    ...req.body,
    rating: 4.8,
  };
  LABS_DIRECTORY.push(newLab);
  return res.status(201).json({ message: 'NABL Lab added to reference directory', lab: newLab });
};

// Transporters Directory CRUD (Reference Data Only)
export const addTransporterPartner = (req: AuthenticatedRequest, res: Response) => {
  const newTrans = {
    id: `trans-${Date.now()}`,
    ...req.body,
  };
  TRANSPORTERS_DIRECTORY.push(newTrans);
  return res.status(201).json({ message: 'Authorized Transporter added to reference directory', transporter: newTrans });
};
