import React, { useState } from 'react';
import {
  Truck,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Lock,
  Unlock,
  CheckCircle2,
  FileBadge,
  Phone,
  ArrowRight,
  Printer,
  Sparkles,
  Info,
  Radio,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import { useSaasStore } from '../../store/saasStore';
import { CARRIER_DIRECTORY } from '../../mock/saasData';
import { TransportManifestModal } from '../../components/saas/TransportManifestModal';

export const TransportWorkspace: React.FC = () => {
  const {
    dealConfirmedGate,
    toggleDealConfirmedGate,
    openTransportEnquiryModal,
  } = useSaasStore();

  const eligibleCarriers = CARRIER_DIRECTORY.filter((c) => c.isEligible);
  const ineligibleCarriers = CARRIER_DIRECTORY.filter((c) => !c.isEligible);

  return (
    <div className="space-y-6">
      {/* Page Title & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E2E4DC]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-[#0B0F19]">
              HazMat Transport Recommendations & Fleet Compliance
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#FDF2F2] text-[#D1343A] border border-[#D1343A]/20">
              Class 8 UN 1789 Corrosive Liquids
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-0.5">
            SPCB Authorized Rubber-Lined & FRP Road Tankers · PESO / CMVR Rule 129A Statutory Vetting
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => openTransportEnquiryModal(eligibleCarriers[0])}
            disabled={!dealConfirmedGate}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-subtle flex items-center gap-1.5 ${
              dealConfirmedGate
                ? 'text-white bg-[#D1343A] hover:bg-[#A81818] cursor-pointer'
                : 'text-[#64748B] bg-surface-subtle border border-[#E2E4DC] cursor-not-allowed opacity-60'
            }`}
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Prepare Form 9 Manifest</span>
          </button>
        </div>
      </div>

      {/* 1. Confirmed Deal Gate Banner */}
      <div
        className={`p-5 rounded-2xl border transition-all shadow-subtle ${
          dealConfirmedGate
            ? 'bg-gradient-to-r from-[#F0FDF4] via-surface to-[#DCFCE7]/30 border-[#16A34A]/40'
            : 'bg-gradient-to-r from-[#FFFBEB] via-surface to-[#FEF3C7]/40 border-[#D97706]/40'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm mt-0.5 ${
                dealConfirmedGate
                  ? 'bg-[#16A34A] text-white'
                  : 'bg-[#D97706] text-white'
              }`}
            >
              {dealConfirmedGate ? (
                <Unlock className="w-5 h-5" />
              ) : (
                <Lock className="w-5 h-5" />
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-white ${
                    dealConfirmedGate ? 'bg-[#16A34A]' : 'bg-[#D97706]'
                  }`}
                >
                  {dealConfirmedGate
                    ? 'CONFIRMED DEAL GATE · DISPATCH UNLOCKED'
                    : 'CONFIRMED DEAL GATE · DISPATCH LOCKED'}
                </span>
                <span className="text-xs font-semibold text-[#1E293B]">
                  Corridor: Ghaziabad (UP) → Aravali Cement Works Kiln (Rajasthan, 820 km)
                </span>
              </div>

              <h3 className="text-base font-bold text-[#0B0F19]">
                {dealConfirmedGate
                  ? 'Carrier Dispatch Recommendations Unlocked & SPCB Approved'
                  : 'Carrier Booking Gated Pending Commercial Term Sign-Off'}
              </h3>

              <p className="text-xs text-[#1E293B] max-w-3xl leading-relaxed">
                {dealConfirmedGate
                  ? 'Commercial terms (₹1,250/MT clinker credit) and receiving kiln chemical envelope sign-off are verified. Certified Class 8 rubber-lined fleet is dispatch-ready for the 820 km shared milk-run corridor.'
                  : 'Hazardous Waste Rules 2016 require that receiver intake consent and commercial terms must be agreed before carrier dispatch authorization to prevent highway strand risk.'}
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2 self-start md:self-center">
            <button
              onClick={toggleDealConfirmedGate}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer shadow-subtle flex items-center gap-2 ${
                dealConfirmedGate
                  ? 'bg-surface text-[#1E293B] border-[#E2E4DC] hover:bg-surface-subtle'
                  : 'bg-[#16A34A] text-white border-[#16A34A] hover:bg-[#15803D]'
              }`}
            >
              {dealConfirmedGate ? (
                <>
                  <Lock className="w-3.5 h-3.5 text-[#64748B]" />
                  <span>Simulate Gated State</span>
                </>
              ) : (
                <>
                  <Unlock className="w-3.5 h-3.5 text-white" />
                  <span>Confirm Deal Terms & Unlock</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Eligible HazMat Carriers Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#16A34A]" />
            <h2 className="text-base font-bold text-[#0B0F19]">
              Eligible HazMat Transport Carriers (Class 8 UN 1789)
            </h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-[#DCFCE7] text-[#16A34A]">
              {eligibleCarriers.length} Certified Fleets
            </span>
          </div>
          <span className="text-xs text-[#64748B]">
            All units equipped with live AIS-140 GPS & LoRaWAN e-seals
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {eligibleCarriers.map((carrier) => (
            <div
              key={carrier.id}
              className={`p-5 rounded-2xl bg-surface border transition-all shadow-subtle flex flex-col justify-between space-y-4 group ${
                dealConfirmedGate
                  ? 'border-[#E2E4DC] hover:border-[#16A34A]/50 hover:shadow-card'
                  : 'border-[#E2E4DC] opacity-75'
              }`}
            >
              {/* Card Header */}
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#16A34A] bg-[#DCFCE7] px-2 py-0.5 rounded border border-[#16A34A]/20">
                      {carrier.authorizationNumber}
                    </span>
                    <h3 className="text-sm font-bold text-[#0B0F19] group-hover:text-[#16A34A] transition-colors mt-1.5 leading-snug">
                      {carrier.name}
                    </h3>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#1E293B] bg-surface-subtle px-2 py-0.5 rounded">
                    ₹{carrier.pricePerKmInr}/km
                  </span>
                </div>

                <div className="flex items-center gap-1 text-xs text-[#64748B]">
                  <MapPin className="w-3.5 h-3.5 text-[#64748B] shrink-0" />
                  <span>Base: {carrier.baseLocation}</span>
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="space-y-2.5 text-xs">
                {/* Vehicle & Lining Type */}
                <div className="p-2.5 rounded-xl bg-surface-subtle border border-[#E2E4DC] space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                    Vehicle & Lining Specification
                  </div>
                  <div className="font-semibold text-[#0B0F19]">
                    {carrier.vehicleType}
                  </div>
                  <div className="text-[11px] text-[#1E293B] leading-tight">
                    {carrier.tankerLining}
                  </div>
                </div>

                {/* Safety Gear & Certification */}
                <div className="space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                    Safety Equipment & Telemetry
                  </div>
                  <ul className="text-[11px] text-[#1E293B] space-y-0.5 list-disc list-inside">
                    {carrier.safetyEquipment.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="truncate">{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Match Explanation */}
                <div className="p-2.5 rounded-lg bg-[#F0FDF4] border border-[#16A34A]/20 text-[11px] text-[#16A34A] leading-relaxed">
                  <strong>Corridor Match:</strong> {carrier.matchExplanation}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#E2E4DC] space-y-2">
                <button
                  onClick={() => openTransportEnquiryModal(carrier)}
                  disabled={!dealConfirmedGate}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all shadow-subtle flex items-center justify-center gap-1.5 ${
                    dealConfirmedGate
                      ? 'text-white bg-[#16A34A] hover:bg-[#15803D] cursor-pointer'
                      : 'text-[#64748B] bg-surface-subtle cursor-not-allowed opacity-60'
                  }`}
                >
                  <FileBadge className="w-3.5 h-3.5" />
                  <span>Prepare Form 9 Manifest</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Ineligible Carriers Section with RED Compliance Badge */}
      <div className="space-y-4 pt-4 border-t border-[#E2E4DC]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-[#DC2626]" />
            <h2 className="text-base font-bold text-[#0B0F19]">
              Ineligible & Prohibited Transport Carriers
            </h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-[#FEE2E2] text-[#DC2626]">
              {ineligibleCarriers.length} Prohibited Configurations
            </span>
          </div>
          <span className="text-xs text-[#DC2626] font-semibold">
            Strict Enforcement of Hazardous Waste Rules 2016
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {ineligibleCarriers.map((carrier) => (
            <div
              key={carrier.id}
              className="p-5 rounded-2xl bg-[#FFF8F8] border-2 border-[#DC2626]/40 shadow-subtle space-y-4"
            >
              {/* Header with Red Badge */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#DC2626] text-white">
                    <AlertTriangle className="w-3 h-3" />
                    PROHIBITED UNDER RULE 18
                  </span>
                  <h3 className="text-sm font-bold text-[#0B0F19] mt-2">
                    {carrier.name}
                  </h3>
                  <p className="text-xs text-[#64748B]">
                    Vehicle Configuration: <strong className="text-[#0B0F19]">{carrier.vehicleType}</strong>
                  </p>
                </div>
                <span className="text-xs font-mono text-[#64748B]">
                  Unlicensed
                </span>
              </div>

              {/* Statutory Violation Explanation */}
              <div className="p-3 rounded-xl bg-white border border-[#DC2626]/30 text-xs text-[#1E293B] space-y-1.5 leading-relaxed">
                <div className="font-bold text-[#DC2626] flex items-center gap-1">
                  <span>{carrier.complianceViolationRule}</span>
                </div>
                <p className="text-[11px] text-[#1E293B]">
                  {carrier.ineligibleReason}
                </p>
              </div>

              {/* Status footer */}
              <div className="pt-2 border-t border-[#DC2626]/20 flex items-center justify-between text-xs text-[#DC2626] font-semibold">
                <span>Dispatch Blocked by WasteMatch Protocol</span>
                <span className="text-[11px] text-[#64748B]">Zero Regulatory Tolerance</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Manifest Modal */}
      <TransportManifestModal />
    </div>
  );
};
