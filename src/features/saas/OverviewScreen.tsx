import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileText,
  FlaskConical,
  Calculator,
  Truck,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  Building2,
  ShieldCheck,
  Clock,
  Layers,
  ChevronRight,
  FileCheck,
} from 'lucide-react';
import { useSaasStore } from '../../store/saasStore';

export const OverviewScreen: React.FC = () => {
  const navigate = useNavigate();
  const {
    facility,
    parameters,
    laboratories,
    costState,
    openLabEnquiryModal,
    dealConfirmedGate,
  } = useSaasStore();

  const missingParamsCount = parameters.filter((p) => p.isMissing || p.status === 'Not Available').length;
  const verifiedParamsCount = parameters.filter((p) => p.status === 'Verified').length;

  return (
    <div className="space-y-6">
      {/* Page Title & Facility Context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E2E4DC]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-[#0B0F19]">
              Industrial Operations Overview
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#DCFCE7] text-[#16A34A] border border-[#16A34A]/20">
              Live Operations
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-0.5">
            Active Byproduct: Spent Hydrochloric Acid (12 MT) · Generated at {facility.name} {facility.unit}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/app/analysis"
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[#1E293B] bg-surface hover:bg-surface-subtle border border-[#E2E4DC] transition-colors shadow-subtle flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-[#64748B]" />
            <span>View 50-Param Passport</span>
          </Link>
          <Link
            to="/app/costs"
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-[#D1343A] hover:bg-[#A81818] transition-colors shadow-subtle flex items-center gap-1.5"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Review Cost Scenarios</span>
          </Link>
        </div>
      </div>

      {/* 1. Next Recommended Action Banner */}
      <div className="relative overflow-hidden p-5 rounded-2xl bg-gradient-to-r from-[#FFF5F5] via-[#FFF9F6] to-[#FEF3C7]/40 border border-[#D1343A]/30 shadow-subtle">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#D1343A] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#D1343A] text-white">
                  RECOMMENDED NEXT ACTION · STEP 2
                </span>
                <span className="text-xs font-bold text-[#D97706] flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {missingParamsCount} Critical Heavy Metals Missing
                </span>
              </div>
              <h3 className="text-base font-bold text-[#0B0F19]">
                Verify Missing Heavy Metals via NABL Lab (Lead Pb & Mercury Hg)
              </h3>
              <p className="text-xs text-[#1E293B] max-w-3xl leading-relaxed">
                Aravali Cement Works kiln co-processing specification mandates certified trace assays for <strong className="font-semibold text-[#0B0F19]">Lead (Pb)</strong> and <strong className="font-semibold text-[#0B0F19]">Mercury (Hg)</strong> before issuing final gate intake authorization. Save <strong className="text-[#16A34A] font-semibold">₹10,800 (72%)</strong> by ordering a targeted ICP-OES trace assay package instead of a redundant full panel.
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2 self-start md:self-center">
            <button
              onClick={() => navigate('/app/laboratories')}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#D1343A] hover:bg-[#A81818] transition-all shadow-sm flex items-center gap-2 active:scale-95 cursor-pointer"
            >
              <span>Order Targeted Lab Assay</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Four Capability Cards with Live Counts & Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Material Analysis */}
        <Link
          to="/app/analysis"
          className="p-4 rounded-xl bg-surface border border-[#E2E4DC] hover:border-[#D1343A]/40 transition-all shadow-subtle group hover:shadow-card"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-lg bg-[#FDF2F2] text-[#D1343A] flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-mono font-bold text-[#16A34A] bg-[#DCFCE7] px-2 py-0.5 rounded">
              {verifiedParamsCount}/50 Verified
            </span>
          </div>
          <h4 className="text-sm font-bold text-[#0B0F19] group-hover:text-[#D1343A] transition-colors">
            Material Analysis
          </h4>
          <p className="text-xs text-[#64748B] mt-1 line-clamp-2">
            50-parameter characterization. 3 evidence files ingested (SGS PDF, Hydrometer, MicroNIR).
          </p>
          <div className="mt-3 pt-3 border-t border-[#E2E4DC] flex items-center justify-between text-xs font-semibold text-[#D1343A]">
            <span>Inspect Table</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Card 2: Find a Laboratory */}
        <Link
          to="/app/laboratories"
          className="p-4 rounded-xl bg-surface border border-[#E2E4DC] hover:border-[#D1343A]/40 transition-all shadow-subtle group hover:shadow-card"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-lg bg-[#FEF3C7] text-[#D97706] flex items-center justify-center">
              <FlaskConical className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-mono font-bold text-[#1E293B] bg-surface-subtle px-2 py-0.5 rounded">
              {laboratories.length} NABL Labs
            </span>
          </div>
          <h4 className="text-sm font-bold text-[#0B0F19] group-hover:text-[#D1343A] transition-colors">
            Find a Laboratory
          </h4>
          <p className="text-xs text-[#64748B] mt-1 line-clamp-2">
            1 targeted package recommended: ₹3,800–₹4,500 trace assay with 24–48h express TAT.
          </p>
          <div className="mt-3 pt-3 border-t border-[#E2E4DC] flex items-center justify-between text-xs font-semibold text-[#D1343A]">
            <span>Explore Labs</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Card 3: Cost Analysis */}
        <Link
          to="/app/costs"
          className="p-4 rounded-xl bg-surface border border-[#E2E4DC] hover:border-[#D1343A]/40 transition-all shadow-subtle group hover:shadow-card"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-lg bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center">
              <Calculator className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-mono font-bold text-[#16A34A] bg-[#DCFCE7] px-2 py-0.5 rounded">
              +₹40,550 Net
            </span>
          </div>
          <h4 className="text-sm font-bold text-[#0B0F19] group-hover:text-[#D1343A] transition-colors">
            Cost Analysis
          </h4>
          <p className="text-xs text-[#64748B] mt-1 line-clamp-2">
            Avoids -₹48,000 status quo landfill disposal cost. 3 commercial models compared.
          </p>
          <div className="mt-3 pt-3 border-t border-[#E2E4DC] flex items-center justify-between text-xs font-semibold text-[#D1343A]">
            <span>Adjust Parameters</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Card 4: Transport Recommendations */}
        <Link
          to="/app/transport"
          className="p-4 rounded-xl bg-surface border border-[#E2E4DC] hover:border-[#D1343A]/40 transition-all shadow-subtle group hover:shadow-card"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-lg bg-[#F1F5F9] text-[#1E293B] flex items-center justify-center">
              <Truck className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-mono font-bold text-[#D1343A] bg-[#FDF2F2] px-2 py-0.5 rounded">
              Class 8 UN 1789
            </span>
          </div>
          <h4 className="text-sm font-bold text-[#0B0F19] group-hover:text-[#D1343A] transition-colors">
            Transport Fleet
          </h4>
          <p className="text-xs text-[#64748B] mt-1 line-clamp-2">
            Acid-resistant rubber-lined tankers. Strictly excludes non-compliant cargo trucks.
          </p>
          <div className="mt-3 pt-3 border-t border-[#E2E4DC] flex items-center justify-between text-xs font-semibold text-[#D1343A]">
            <span>Review Carriers</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      {/* 3. Dual-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Active Material Summary & Open Lab Enquiries */}
        <div className="space-y-6">
          {/* Active Material Summary Card */}
          <div className="p-5 rounded-2xl bg-surface border border-[#E2E4DC] shadow-subtle space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E4DC]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#FDF2F2] text-[#D1343A] flex items-center justify-center">
                  <FileCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0B0F19]">
                    Active Stream: Spent Hydrochloric Acid
                  </h3>
                  <p className="text-[11px] text-[#64748B]">
                    Batch #SG-2026-08 · Steel Descaling Acidic Liquor
                  </p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-[#FDF2F2] text-[#D1343A] border border-[#D1343A]/20">
                UN 1789 · Class 8
              </span>
            </div>

            {/* Chemical & Physical Specifications Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-2.5 rounded-xl bg-surface-subtle border border-[#E2E4DC]">
                <div className="text-[10px] text-[#64748B] font-semibold">Quantity</div>
                <div className="text-sm font-mono font-bold text-[#0B0F19]">12.0 MT</div>
                <div className="text-[9px] text-[#64748B]">Liquid @ 32°C</div>
              </div>
              <div className="p-2.5 rounded-xl bg-surface-subtle border border-[#E2E4DC]">
                <div className="text-[10px] text-[#64748B] font-semibold">pH Level</div>
                <div className="text-sm font-mono font-bold text-[#D1343A]">0.85</div>
                <div className="text-[9px] text-[#64748B]">Strong Acid</div>
              </div>
              <div className="p-2.5 rounded-xl bg-surface-subtle border border-[#E2E4DC]">
                <div className="text-[10px] text-[#64748B] font-semibold">Dissolved Fe</div>
                <div className="text-sm font-mono font-bold text-[#16A34A]">118,500 ppm</div>
                <div className="text-[9px] text-[#64748B]">11.85% (Iron Asset)</div>
              </div>
              <div className="p-2.5 rounded-xl bg-surface-subtle border border-[#E2E4DC]">
                <div className="text-[10px] text-[#64748B] font-semibold">Chloride (Cl⁻)</div>
                <div className="text-sm font-mono font-bold text-[#0B0F19]">182,000 ppm</div>
                <div className="text-[9px] text-[#64748B]">18.2% Total</div>
              </div>
            </div>

            {/* Ingestion Sources List */}
            <div className="pt-2 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                Ingested Assay Evidence Cards
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between p-2 rounded-lg bg-surface-subtle border border-[#E2E4DC]">
                  <span className="font-medium text-[#1E293B]">📄 SGS_Chemical_Assay_Batch_SG08.pdf</span>
                  <span className="text-[10px] font-mono text-[#16A34A] font-semibold">98% Verified</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-surface-subtle border border-[#E2E4DC]">
                  <span className="font-medium text-[#1E293B]">📷 IBC_Tanks_Vat_Inspection_Aug.jpg</span>
                  <span className="text-[10px] font-mono text-[#16A34A] font-semibold">94% Density Certified</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-surface-subtle border border-[#E2E4DC]">
                  <span className="font-medium text-[#1E293B]">📊 MicroNIR_Scan_Point_04.csv</span>
                  <span className="text-[10px] font-mono text-[#D97706] font-semibold">Zn 840 ppm (Review)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Open Lab Enquiries Card */}
          <div className="p-5 rounded-2xl bg-surface border border-[#E2E4DC] shadow-subtle space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E4DC]">
              <div className="flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-[#D1343A]" />
                <h3 className="text-sm font-bold text-[#0B0F19]">
                  Open Lab Testing Enquiries
                </h3>
              </div>
              <button
                onClick={() => openLabEnquiryModal()}
                className="text-xs font-semibold text-[#D1343A] hover:underline"
              >
                + Prepare Enquiry
              </button>
            </div>

            <div className="p-3.5 rounded-xl border border-[#E2E4DC] bg-surface-subtle/50 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#0B0F19]">
                      Shriram Institute for Industrial Research
                    </span>
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-[#FEF3C7] text-[#D97706]">
                      Draft Generated
                    </span>
                  </div>
                  <p className="text-[11px] text-[#64748B] mt-0.5">
                    Targeted ICP-OES Trace Assay (Lead Pb & Mercury Hg) · Delhi NCR
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-[#1E293B]">
                  ₹3,800
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-[#E2E4DC] text-[11px]">
                <span className="text-[#64748B]">TAT: 24–48 Hours</span>
                <button
                  onClick={() => openLabEnquiryModal()}
                  className="font-semibold text-[#D1343A] hover:underline"
                >
                  View Formal CoC Document →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Saved Cost Scenarios & Confirmed Deal Status */}
        <div className="space-y-6">
          {/* Saved Cost Scenarios Card */}
          <div className="p-5 rounded-2xl bg-surface border border-[#E2E4DC] shadow-subtle space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E4DC]">
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-[#16A34A]" />
                <h3 className="text-sm font-bold text-[#0B0F19]">
                  Saved Commercial Cost Scenarios
                </h3>
              </div>
              <Link
                to="/app/costs"
                className="text-xs font-semibold text-[#D1343A] hover:underline"
              >
                Full Ledger →
              </Link>
            </div>

            <div className="space-y-2.5">
              {/* Scenario 1: Hero Bundle */}
              <div className="p-3 rounded-xl border border-[#16A34A]/30 bg-[#DCFCE7]/20 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#0B0F19]">
                      Hero Milk-Run Shared Tanker (21 MT)
                    </span>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#16A34A] text-white">
                      Best Outcome
                    </span>
                  </div>
                  <p className="text-[11px] text-[#64748B]">
                    Muzaffarnagar (9t) + Ghaziabad (12t) → Aravali Cement Kiln (820 km)
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-mono font-bold text-[#16A34A]">
                    +₹40,550
                  </span>
                  <div className="text-[10px] text-[#64748B]">Net Benefit</div>
                </div>
              </div>

              {/* Scenario 2: Local Neutralization */}
              <div className="p-3 rounded-xl border border-[#E2E4DC] bg-surface flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#0B0F19]">
                    Local Neutralization at Meerut Bricks (12 MT)
                  </div>
                  <p className="text-[11px] text-[#64748B]">
                    65 km · ₹3,000/t Gate Treatment Fee · 52% Tanker Fill
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-mono font-bold text-[#1E293B]">
                    +₹6,475
                  </span>
                  <div className="text-[10px] text-[#64748B]">Net Benefit</div>
                </div>
              </div>

              {/* Scenario 3: Status Quo Landfill Disposal */}
              <div className="p-3 rounded-xl border border-[#DC2626]/20 bg-[#FEE2E2]/20 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#0B0F19]">
                    Status Quo Baseline TSDF Disposal
                  </div>
                  <p className="text-[11px] text-[#64748B]">
                    12 MT × ₹4,000/MT TSDF Landfill Neutralization Fee
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-mono font-bold text-[#DC2626]">
                    -₹48,000
                  </span>
                  <div className="text-[10px] text-[#64748B]">Net Cash Drain</div>
                </div>
              </div>
            </div>
          </div>

          {/* Confirmed Deal Status Card */}
          <div className="p-5 rounded-2xl bg-surface border border-[#E2E4DC] shadow-subtle space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E4DC]">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#D1343A]" />
                <h3 className="text-sm font-bold text-[#0B0F19]">
                  Confirmed Deal Corridor Status
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#DCFCE7] text-[#16A34A] border border-[#16A34A]/30">
                Corridor Verified
              </span>
            </div>

            <div className="p-4 rounded-xl bg-surface-subtle/80 border border-[#E2E4DC] space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                    RECEIVING CO-PROCESSOR
                  </span>
                  <h4 className="text-sm font-bold text-[#0B0F19]">
                    Aravali Cement Works (Co-Processing Kiln)
                  </h4>
                  <p className="text-xs text-[#64748B]">
                    Nimbahera, Chittorgarh, Rajasthan · SPCB Authorized AFR Facility
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-[#16A34A]">
                  94% Match
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#E2E4DC] text-center">
                <div className="p-2 rounded-lg bg-surface">
                  <div className="text-[10px] text-[#64748B]">Corridor Route</div>
                  <div className="text-xs font-mono font-bold text-[#0B0F19]">820 km</div>
                </div>
                <div className="p-2 rounded-lg bg-surface">
                  <div className="text-[10px] text-[#64748B]">Tanker Fill</div>
                  <div className="text-xs font-mono font-bold text-[#16A34A]">91% (21 MT)</div>
                </div>
                <div className="p-2 rounded-lg bg-surface">
                  <div className="text-[10px] text-[#64748B]">CO₂e Offset</div>
                  <div className="text-xs font-mono font-bold text-[#16A34A]">1.6 t CO₂e</div>
                </div>
              </div>

              <div className="pt-1 flex items-center justify-between text-xs">
                <span className="text-[#64748B]">
                  Gate Condition: Lab trace assay submission (Lead/Hg)
                </span>
                <Link
                  to="/app/transport"
                  className="font-bold text-[#D1343A] hover:underline flex items-center gap-1"
                >
                  <span>Dispatch Tanker</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
