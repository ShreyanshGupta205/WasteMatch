import { create } from 'zustand';
import {
  ChemicalParameterItem,
  INITIAL_50_PARAMETERS,
  FacilityInfo,
  ACTIVE_FACILITY,
  LaboratoryCard,
  NABL_LABORATORIES,
  CarrierInfo,
  CARRIER_DIRECTORY,
} from '../mock/saasData';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'action_required' | 'info' | 'success' | 'alert';
  read: boolean;
  link?: string;
}

export interface ReviewAuditPayload {
  parameterId: string;
  revisedValue: string;
  auditJustification: string;
  revisedBy: string;
}

export interface CostScenarioState {
  commercialModel: 'sale' | 'fee'; // 'sale' = Byproduct Sale (receives ₹), 'fee' = Co-Processing Treatment Fee (pays ₹)
  quantityTonnes: number;
  ratePerTonne: number; // e.g. +1250 for sale or -3000 for fee
  distanceKm: number;
  freightPerKm: number;
  testingFeeInr: number;
  packagingHandlingInr: number;
  hasDocumentedBaseline: boolean; // Strictly enforces ₹0 baseline if false!
  baselineDisposalRatePerTonne: number; // default ₹4,000/T
}

interface SaasStore {
  // Facility context
  facility: FacilityInfo;

  // 50-Parameter Characterization
  parameters: ChemicalParameterItem[];
  selectedCategory: string;
  searchParamQuery: string;
  setSelectedCategory: (cat: string) => void;
  setSearchParamQuery: (q: string) => void;
  reviewParameter: (payload: ReviewAuditPayload) => void;
  resetParameters: () => void;

  // Labs & Enquiries
  laboratories: LaboratoryCard[];
  labSearchQuery: string;
  selectedCorridor: string;
  selectedLabForEnquiry: LaboratoryCard | null;
  isLabEnquiryModalOpen: boolean;
  setLabSearchQuery: (q: string) => void;
  setSelectedCorridor: (c: string) => void;
  openLabEnquiryModal: (lab?: LaboratoryCard) => void;
  closeLabEnquiryModal: () => void;

  // Cost Analysis
  costState: CostScenarioState;
  updateCostState: (partial: Partial<CostScenarioState>) => void;
  applyPresetScenario: (preset: 'hero_bundle' | 'local_neutralization' | 'custom') => void;

  // Transport
  dealConfirmedGate: boolean;
  toggleDealConfirmedGate: () => void;
  selectedCarrierForManifest: CarrierInfo | null;
  isTransportEnquiryModalOpen: boolean;
  openTransportEnquiryModal: (carrier?: CarrierInfo) => void;
  closeTransportEnquiryModal: () => void;

  // Global Search Modal
  isGlobalSearchOpen: boolean;
  openGlobalSearch: () => void;
  closeGlobalSearch: () => void;

  // Notification Center
  notifications: NotificationItem[];
  isNotificationsOpen: boolean;
  toggleNotifications: () => void;
  markAllNotificationsRead: () => void;

  // SPCB Compliance modal
  isSpcbModalOpen: boolean;
  openSpcbModal: () => void;
  closeSpcbModal: () => void;

  // Review modal for parameter
  editingParameter: ChemicalParameterItem | null;
  setEditingParameter: (param: ChemicalParameterItem | null) => void;
}

export const useSaasStore = create<SaasStore>((set, get) => ({
  facility: ACTIVE_FACILITY,

  // 50 Parameters
  parameters: INITIAL_50_PARAMETERS,
  selectedCategory: 'All',
  searchParamQuery: '',
  setSelectedCategory: (cat) => set({ selectedCategory: cat }),
  setSearchParamQuery: (q) => set({ searchParamQuery: q }),
  reviewParameter: ({ parameterId, revisedValue, auditJustification, revisedBy }) => {
    set((state) => ({
      parameters: state.parameters.map((p) => {
        if (p.id === parameterId) {
          return {
            ...p,
            value: revisedValue,
            status: 'Verified',
            isMissing: false,
            confidencePct: 100,
            citation: `Human Audit / QC Recalibration: ${auditJustification}`,
            auditTrail: {
              originalValue: p.value,
              revisedValue,
              revisedBy: revisedBy || 'Rajesh Kumar (QA/QC Head)',
              revisedAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              justification: auditJustification,
            },
          };
        }
        return p;
      }),
      editingParameter: null,
    }));
  },
  resetParameters: () => set({ parameters: INITIAL_50_PARAMETERS }),

  // Labs
  laboratories: NABL_LABORATORIES,
  labSearchQuery: '',
  selectedCorridor: 'All Corridors',
  selectedLabForEnquiry: NABL_LABORATORIES[0],
  isLabEnquiryModalOpen: false,
  setLabSearchQuery: (q) => set({ labSearchQuery: q }),
  setSelectedCorridor: (c) => set({ selectedCorridor: c }),
  openLabEnquiryModal: (lab) =>
    set({
      selectedLabForEnquiry: lab || get().laboratories[0],
      isLabEnquiryModalOpen: true,
    }),
  closeLabEnquiryModal: () => set({ isLabEnquiryModalOpen: false }),

  // Cost Analysis default
  costState: {
    commercialModel: 'sale',
    quantityTonnes: 12.0,
    ratePerTonne: 1250,
    distanceKm: 820,
    freightPerKm: 85,
    testingFeeInr: 4200,
    packagingHandlingInr: 2500,
    hasDocumentedBaseline: true,
    baselineDisposalRatePerTonne: 4000,
  },
  updateCostState: (partial) =>
    set((state) => ({ costState: { ...state.costState, ...partial } })),
  applyPresetScenario: (preset) => {
    if (preset === 'hero_bundle') {
      set({
        costState: {
          commercialModel: 'sale',
          quantityTonnes: 21.0,
          ratePerTonne: 1250,
          distanceKm: 820,
          freightPerKm: 85,
          testingFeeInr: 4200,
          packagingHandlingInr: 2500,
          hasDocumentedBaseline: true,
          baselineDisposalRatePerTonne: 4000,
        },
      });
    } else if (preset === 'local_neutralization') {
      set({
        costState: {
          commercialModel: 'fee',
          quantityTonnes: 12.0,
          ratePerTonne: 3000,
          distanceKm: 65,
          freightPerKm: 85,
          testingFeeInr: 3200,
          packagingHandlingInr: 1800,
          hasDocumentedBaseline: true,
          baselineDisposalRatePerTonne: 4000,
        },
      });
    }
  },

  // Transport
  dealConfirmedGate: true, // Default to true so user can inspect both, with quick toggle
  toggleDealConfirmedGate: () =>
    set((state) => ({ dealConfirmedGate: !state.dealConfirmedGate })),
  selectedCarrierForManifest: CARRIER_DIRECTORY[0],
  isTransportEnquiryModalOpen: false,
  openTransportEnquiryModal: (carrier) =>
    set({
      selectedCarrierForManifest: carrier || CARRIER_DIRECTORY[0],
      isTransportEnquiryModalOpen: true,
    }),
  closeTransportEnquiryModal: () =>
    set({ isTransportEnquiryModalOpen: false }),

  // Global Search
  isGlobalSearchOpen: false,
  openGlobalSearch: () => set({ isGlobalSearchOpen: true }),
  closeGlobalSearch: () => set({ isGlobalSearchOpen: false }),

  // Notifications
  notifications: [
    {
      id: 'notif-1',
      title: 'Missing Heavy Metals Verification Required',
      message: 'Aravali Cement Works requires certified assays for Lead (Pb) & Mercury (Hg) prior to gate intake.',
      timestamp: '10 mins ago',
      type: 'action_required',
      read: false,
      link: '/app/laboratories',
    },
    {
      id: 'notif-2',
      title: 'Targeted Lab Package Recommendation Available',
      message: 'Shriram Institute quoted ₹3,800 for targeted ICP-OES trace assay, saving 74% vs full panel.',
      timestamp: '1 hour ago',
      type: 'info',
      read: false,
      link: '/app/laboratories',
    },
    {
      id: 'notif-3',
      title: 'SPCB Authorization Health 95%',
      message: 'Facility authorization UPPCB/HW/GZB/2024/7741 is active and valid till 31-Dec-2027.',
      timestamp: 'Yesterday',
      type: 'success',
      read: true,
      link: '/app/overview',
    },
  ],
  isNotificationsOpen: false,
  toggleNotifications: () =>
    set((state) => ({ isNotificationsOpen: !state.isNotificationsOpen })),
  markAllNotificationsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    })),

  // SPCB Compliance Modal
  isSpcbModalOpen: false,
  openSpcbModal: () => set({ isSpcbModalOpen: true }),
  closeSpcbModal: () => set({ isSpcbModalOpen: false }),

  // Parameter Edit Modal
  editingParameter: null,
  setEditingParameter: (param) => set({ editingParameter: param }),
}));
