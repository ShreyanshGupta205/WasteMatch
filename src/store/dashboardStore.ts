import { create } from 'zustand';

export type UserRole = 'seller' | 'buyer' | 'admin';

export interface UserSession {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  businessName: string;
  pincode?: string;
  city?: string;
  state?: string;
  spcbAuthNo?: string;
  verificationStatus: 'Pending' | 'Verified' | 'Suspended';
}

export interface WasteStreamItem {
  id: string;
  sellerId: string;
  name: string;
  sourceProcess: string;
  physicalForm: 'solid' | 'liquid' | 'sludge' | 'oily';
  estimatedMonthlyQuantityTonnes: number;
  locationAddress: string;
  pincode: string;
  hazardClass: string;
  unNumber: string;
  hasLabReport: boolean;
  labReportUrl: string | null;
  labReportUploadedAt?: string;
  fingerprint: {
    pH: number;
    chloridePpm: number;
    ironPpm?: number;
    calciumCarbonatePct?: number;
    silicaPct?: number;
    densityGcm3?: number;
    calorificValueMjKg?: number;
    moisturePct: number;
    hazardClass: string;
  };
  confidenceScores: {
    pH?: 'High' | 'Medium' | 'Low';
    chloride?: 'High' | 'Medium' | 'Low';
    metals?: 'High' | 'Medium' | 'Low';
    calorificValue?: 'High' | 'Medium' | 'Low';
    moisture?: 'High' | 'Medium' | 'Low';
    hazardClass?: 'High' | 'Medium' | 'Low';
    leachateToxicity?: 'High' | 'Medium' | 'Low';
  };
  status: 'Draft' | 'Listed' | 'Matched';
}

export interface MatchOfferItem {
  id: string;
  listingId: string;
  wasteStreamId: string;
  wasteStreamName: string;
  sellerId: string;
  sellerName: string;
  buyerId: string;
  buyerName: string;
  buyerLocation: string;
  offeredPricePerTonne: number;
  quantityTonnes: number;
  distanceKm: number;
  estimatedTransportCost: number;
  netEconomicGain: number;
  co2eAvoidedTonnes: number;
  status: 'Quoted' | 'Countered' | 'Accepted' | 'Declined' | 'Completed';
  counterTerms: string | null;
}

export interface ShipmentItem {
  id: string;
  matchId: string;
  sellerId: string;
  sellerName: string;
  buyerId: string;
  buyerName: string;
  transporterId: string;
  transporterName: string;
  scheduledDispatchDate: string;
  status: 'Scheduled' | 'Picked Up' | 'In Transit' | 'Delivered';
  manifestForm10No: string;
  manifestData: {
    senderAuthNo: string;
    receiverAuthNo: string;
    transporterPermitNo: string;
    vehicleRegistrationNo: string;
    wasteDescription: string;
    quantityTonnes: number;
    packagingType: string;
  };
  tremCardData: {
    unNumber: string;
    cargoName: string;
    hazardClass: string;
    ppeRequirement: string;
    spillProtocol: string;
    emergencyPhone: string;
  };
  form10Copy4Url: string | null;
  qcResult: 'Pending' | 'Passed' | 'Failed';
  qcNotes: string | null;
  escrowStatus: 'Held' | 'Released' | 'Disputed' | 'Refunded';
  escrowAmountInr: number;
  diversionCertificateUrl: string | null;
  invoiceUrl: string | null;
}

export interface LabCard {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  distanceKm: number;
  contactPhone: string;
  contactEmail: string;
  nablRegNo: string;
  testTypes: string;
  indicativePricing: string;
  turnaroundDays: number;
  rating: number;
}

export interface TransporterCard {
  id: string;
  name: string;
  baseCity: string;
  coverageStates: string;
  vehicleTypes: string;
  capacityTonnes: number;
  authorizedHazardous: boolean;
  spcbPermitNo: string;
  contactPhone: string;
  contactEmail?: string;
  pricePerKm: number;
}

export interface BuyerProfileData {
  buyerId: string;
  facilityName: string;
  spcbAuthNo: string;
  spcbValidTill: string;
  monthlyQuotaTonnes: number;
  minPh: number;
  maxPh: number;
  maxChloridePpm: number;
  maxMetalsPpm: number;
  maxMoisturePct: number;
  prohibitedContaminants: string;
  acceptedCategories: string[];
  serviceRadiusKm: number;
  indicativePriceRange: string;
}

export interface AdminUserRecord {
  id: string;
  role: 'seller' | 'buyer';
  businessName: string;
  gstin: string;
  pan: string;
  city: string;
  state: string;
  spcbAuthNo: string;
  validTill: string;
  authorizedCategories: string;
  verificationStatus: 'Pending' | 'Verified' | 'Suspended';
  documents: Array<{ name: string; url: string; verified: boolean }>;
}

interface DashboardState {
  // Current active role & user
  currentUser: UserSession;
  setCurrentUser: (user: UserSession) => void;
  switchRole: (role: UserRole) => void;

  // Seller State
  wasteStreams: WasteStreamItem[];
  offers: MatchOfferItem[];
  shipments: ShipmentItem[];
  labsDirectory: LabCard[];
  transportersDirectory: TransporterCard[];
  selectedStreamForLabReferral: WasteStreamItem | null;
  isLabReferralModalOpen: boolean;
  openLabReferralModal: (stream?: WasteStreamItem) => void;
  closeLabReferralModal: () => void;

  // Mobile Navigation Drawer State
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;

  createWasteStream: (streamData: Partial<WasteStreamItem>) => void;
  uploadLabReport: (streamId: string) => void;
  publishListing: (streamId: string, askingPrice: number) => void;
  respondOffer: (offerId: string, action: 'Accept' | 'Reject' | 'Counter', counterPrice?: number) => void;
  updateShipmentStatus: (shipmentId: string, status: ShipmentItem['status']) => void;

  // Buyer State
  buyerProfile: BuyerProfileData;
  updateBuyerProfile: (profile: Partial<BuyerProfileData>) => void;
  markDeliveryReceived: (shipmentId: string) => void;
  performQcCheck: (shipmentId: string, result: 'Passed' | 'Failed', notes?: string) => void;
  issueDiversionCertificate: (shipmentId: string) => void;

  // Admin State
  adminUsers: AdminUserRecord[];
  verifyUserAccount: (userId: string, status: 'Verified' | 'Suspended', reason?: string) => void;
  resolveDispute: (shipmentId: string, resolution: 'ReleaseToSeller' | 'RefundToBuyer') => void;
  addLab: (lab: LabCard) => void;
  addTransporter: (transporter: TransporterCard) => void;
}

// Initial Seed Users
export const SEED_USERS: Record<UserRole, UserSession> = {
  seller: {
    id: 'usr-seller-01',
    email: 'seller@shreeganesh.com',
    role: 'seller',
    name: 'Rajesh Kumar',
    businessName: 'Shree Ganesh Galvanizers Plant #2',
    pincode: '201010',
    city: 'Ghaziabad',
    state: 'Uttar Pradesh',
    spcbAuthNo: 'UPPCB/HW/GZB/2024/7741',
    verificationStatus: 'Verified',
  },
  buyer: {
    id: 'usr-buyer-01',
    email: 'buyer@aravalicement.com',
    role: 'buyer',
    name: 'Vikramaditya Rathore',
    businessName: 'Aravali Cement Works (AFR Kiln)',
    pincode: '312601',
    city: 'Nimbahera',
    state: 'Rajasthan',
    spcbAuthNo: 'RSPCB/HW/AFR/2023/11',
    verificationStatus: 'Verified',
  },
  admin: {
    id: 'usr-admin-01',
    email: 'admin@wastematch.com',
    role: 'admin',
    name: 'Admin',
    businessName: 'WasteMatch Central Compliance Admin',
    verificationStatus: 'Verified',
  },
};

export const useDashboardStore = create<DashboardState>((set, get) => ({
  currentUser: SEED_USERS.seller,
  setCurrentUser: (user) => set({ currentUser: user }),
  switchRole: (role) => set({ currentUser: SEED_USERS[role] }),

  // 3 Realistic Waste Streams
  wasteStreams: [
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
      labReportUploadedAt: '27-Oct-2026',
      fingerprint: {
        pH: 0.85,
        chloridePpm: 182000,
        ironPpm: 118500,
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
      sellerId: 'usr-seller-01',
      name: 'Alkaline Lime/Caustic Sludge',
      sourceProcess: 'Recycled Kraft Paper Chemical Pulping Clarifier',
      physicalForm: 'sludge',
      estimatedMonthlyQuantityTonnes: 9.0,
      locationAddress: 'Bhopa Road Industrial Corridor, Muzaffarnagar',
      pincode: '251001',
      hazardClass: 'Class 9 Miscellaneous Environmental',
      unNumber: 'UN 3077',
      hasLabReport: false, // NO LAB REPORT -> SHOWS "Find Labs Near Me" BUTTON!
      labReportUrl: null,
      fingerprint: {
        pH: 11.8,
        chloridePpm: 4500,
        calciumCarbonatePct: 48.0,
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
      hasLabReport: false, // LOW CONFIDENCE -> SHOWS "Find Labs Near Me" BUTTON!
      labReportUrl: null,
      fingerprint: {
        pH: 7.2,
        chloridePpm: 120,
        silicaPct: 88.5,
        moisturePct: 3.2,
        calorificValueMjKg: 0.2,
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
  ],

  // Market Offers
  offers: [
    {
      id: 'match-hero-01',
      listingId: 'list-01',
      wasteStreamId: 'ws-01',
      wasteStreamName: 'Spent Hydrochloric Acid (Pickle Liquor)',
      sellerId: 'usr-seller-01',
      sellerName: 'Shree Ganesh Galvanizers Plant #2',
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
  ],

  // Live Shipments with Form 10 manifests
  shipments: [
    {
      id: 'ship-01',
      matchId: 'match-hero-01',
      sellerId: 'usr-seller-01',
      sellerName: 'Shree Ganesh Galvanizers Plant #2',
      buyerId: 'usr-buyer-01',
      buyerName: 'Aravali Cement Works',
      transporterId: 'trans-01',
      transporterName: 'SafeChem Dedicated Liquid Logistics',
      scheduledDispatchDate: '28-Oct-2026',
      status: 'In Transit', // 'Scheduled' | 'Picked Up' | 'In Transit' | 'Delivered'
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
      form10Copy4Url: null,
      qcResult: 'Pending',
      qcNotes: null,
      escrowStatus: 'Held',
      escrowAmountInr: 15000,
      diversionCertificateUrl: null,
      invoiceUrl: '/docs/invoice_inv_2026_0941.pdf',
    },
  ],

  // Reference NABL Labs Directory (2 labs)
  labsDirectory: [
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
      testTypes: 'Targeted ICP-OES Heavy Metals (Pb, Hg, Cd, As), TCLP Leachate, Bomb Calorimetry, Flash Point',
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
  ],

  // Reference Transporters Directory (2 transporters)
  transportersDirectory: [
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
  ],

  // Lab Referral Modal State
  selectedStreamForLabReferral: null,
  isLabReferralModalOpen: false,
  openLabReferralModal: (stream) => {
    const targetStream = stream || get().wasteStreams.find((s) => !s.hasLabReport) || get().wasteStreams[0];
    set({
      selectedStreamForLabReferral: targetStream,
      isLabReferralModalOpen: true,
    });
  },
  closeLabReferralModal: () => set({ isLabReferralModalOpen: false, selectedStreamForLabReferral: null }),

  // Mobile Navigation Drawer State
  isMobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),

  // Actions
  createWasteStream: (streamData) => {
    const user = get().currentUser;
    const newStream: WasteStreamItem = {
      id: `ws-${Date.now()}`,
      sellerId: user.id,
      name: streamData.name || 'New Industrial Byproduct',
      sourceProcess: streamData.sourceProcess || 'Metal Pickling / Surface Finishing',
      physicalForm: streamData.physicalForm || 'liquid',
      estimatedMonthlyQuantityTonnes: Number(streamData.estimatedMonthlyQuantityTonnes) || 10.0,
      locationAddress: streamData.locationAddress || 'Industrial Area',
      pincode: streamData.pincode || '201010',
      hazardClass: streamData.hazardClass || 'Class 8 Corrosive',
      unNumber: 'UN 1789',
      hasLabReport: Boolean(streamData.hasLabReport),
      labReportUrl: streamData.hasLabReport ? '/docs/sample_report.pdf' : null,
      fingerprint: {
        pH: 1.1,
        chloridePpm: 140000,
        ironPpm: 95000,
        densityGcm3: 1.26,
        moisturePct: 69.0,
        calorificValueMjKg: 0.4,
        hazardClass: 'Class 8 Corrosive',
      },
      confidenceScores: streamData.hasLabReport
        ? { pH: 'High', chloride: 'High', metals: 'High', calorificValue: 'High', moisture: 'High', hazardClass: 'High' }
        : { pH: 'Medium', chloride: 'Low', metals: 'Low', calorificValue: 'Low', moisture: 'Medium', hazardClass: 'Medium' },
      status: 'Draft',
    };

    set((state) => ({ wasteStreams: [newStream, ...state.wasteStreams] }));
  },

  uploadLabReport: (streamId) => {
    set((state) => ({
      wasteStreams: state.wasteStreams.map((s) => {
        if (s.id === streamId) {
          return {
            ...s,
            hasLabReport: true,
            labReportUrl: `/docs/uploaded_report_${streamId}.pdf`,
            labReportUploadedAt: 'Just Now',
            confidenceScores: {
              pH: 'High',
              chloride: 'High',
              metals: 'High',
              calorificValue: 'High',
              moisture: 'High',
              hazardClass: 'High',
            },
          };
        }
        return s;
      }),
    }));
  },

  publishListing: (streamId, askingPrice) => {
    set((state) => ({
      wasteStreams: state.wasteStreams.map((s) => (s.id === streamId ? { ...s, status: 'Listed' } : s)),
    }));
  },

  respondOffer: (offerId, action, counterPrice) => {
    set((state) => ({
      offers: state.offers.map((o) => {
        if (o.id === offerId) {
          if (action === 'Accept') return { ...o, status: 'Accepted' };
          if (action === 'Reject') return { ...o, status: 'Declined' };
          if (action === 'Counter') {
            return {
              ...o,
              status: 'Countered',
              offeredPricePerTonne: counterPrice || o.offeredPricePerTonne,
              counterTerms: `Seller counter-offer: ₹${counterPrice}/MT`,
            };
          }
        }
        return o;
      }),
    }));
  },

  updateShipmentStatus: (shipmentId, status) => {
    set((state) => ({
      shipments: state.shipments.map((s) => (s.id === shipmentId ? { ...s, status } : s)),
    }));
  },

  // Buyer Profile & State
  buyerProfile: {
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
  },

  updateBuyerProfile: (profile) => {
    set((state) => ({ buyerProfile: { ...state.buyerProfile, ...profile } }));
  },

  markDeliveryReceived: (shipmentId) => {
    set((state) => ({
      shipments: state.shipments.map((s) =>
        s.id === shipmentId
          ? {
              ...s,
              status: 'Delivered',
              form10Copy4Url: `/docs/form10_signed_copy4_${shipmentId}.pdf`,
            }
          : s
      ),
    }));
  },

  performQcCheck: (shipmentId, result, notes) => {
    set((state) => ({
      shipments: state.shipments.map((s) =>
        s.id === shipmentId
          ? {
              ...s,
              qcResult: result,
              qcNotes: notes || (result === 'Passed' ? 'pH 0.88, Cl 180k ppm verified at Gate #4' : 'Chloride loading out of envelope'),
              escrowStatus: result === 'Passed' ? 'Released' : 'Disputed',
            }
          : s
      ),
    }));
  },

  issueDiversionCertificate: (shipmentId) => {
    set((state) => ({
      shipments: state.shipments.map((s) =>
        s.id === shipmentId
          ? {
              ...s,
              diversionCertificateUrl: `/docs/diversion_certificate_${shipmentId}.pdf`,
            }
          : s
      ),
    }));
  },

  // Admin State
  adminUsers: [
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
  ],

  verifyUserAccount: (userId, status, reason) => {
    set((state) => ({
      adminUsers: state.adminUsers.map((u) => (u.id === userId ? { ...u, verificationStatus: status } : u)),
    }));
  },

  resolveDispute: (shipmentId, resolution) => {
    set((state) => ({
      shipments: state.shipments.map((s) =>
        s.id === shipmentId
          ? {
              ...s,
              escrowStatus: resolution === 'ReleaseToSeller' ? 'Released' : 'Refunded',
            }
          : s
      ),
    }));
  },

  addLab: (lab) => {
    set((state) => ({ labsDirectory: [lab, ...state.labsDirectory] }));
  },

  addTransporter: (transporter) => {
    set((state) => ({ transportersDirectory: [transporter, ...state.transportersDirectory] }));
  },
}));
