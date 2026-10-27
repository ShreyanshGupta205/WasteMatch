import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileText,
  FlaskConical,
  Store,
  Truck,
  Receipt,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Building2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useDashboardStore } from '../../store/dashboardStore';

export const SellerOverview: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, wasteStreams, offers, shipments, openLabReferralModal } = useDashboardStore();

  const missingLabStreams = wasteStreams.filter((s) => !s.hasLabReport);
  const pendingOffers = offers.filter((o) => o.status === 'Quoted' || o.status === 'Countered');
  const activeShipments = shipments.filter((s) => s.status !== 'Delivered');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E2E4DC]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-[#0B0F19]">
              Generator Operations Dashboard
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#DCFCE7] text-[#16A34A] border border-[#16A34A]/20">
              KYC Verified
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-0.5">
            {currentUser.businessName} · SPCB Auth #{currentUser.spcbAuthNo} · Sahibabad, Ghaziabad
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/seller/streams"
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-[#D1343A] hover:bg-[#A81818] transition-colors shadow-subtle flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>+ Create Waste Stream</span>
          </Link>
        </div>
      </div>

      {/* Lab Test Referral Action Banner if streams lack lab reports */}
      {missingLabStreams.length > 0 && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-[#FFFBEB] via-[#FFF8EE] to-[#FEF3C7]/40 border-2 border-[#D97706]/30 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#D97706] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#D97706] text-white">
                  ACTION REQUIRED · LAB ASSAY NEEDED
                </span>
                <span className="text-xs font-semibold text-[#1E293B]">
                  {missingLabStreams.length} stream(s) lack certified lab reports
                </span>
              </div>
              <h3 className="text-sm font-bold text-[#0B0F19]">
                Obtain NABL Chemical Assay for "{missingLabStreams[0].name}" to Unlock Buyer Matching
              </h3>
              <p className="text-xs text-[#64748B] max-w-2xl">
                Authorized cement kilns and co-processors require certified elemental assays before issuing intake bids. Connect with accredited NABL labs near your factory to verify heavy metals.
              </p>
            </div>
          </div>

          <button
            onClick={() => openLabReferralModal(missingLabStreams[0])}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#D97706] hover:bg-[#b45309] transition-all shadow-sm flex items-center gap-2 shrink-0 self-start md:self-center cursor-pointer"
          >
            <FlaskConical className="w-4 h-4" />
            <span>Find Labs Near Me</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 4 Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Waste Streams */}
        <Link
          to="/seller/streams"
          className="p-5 rounded-2xl bg-surface border border-[#E2E4DC] hover:border-[#D1343A]/40 transition-all shadow-subtle group hover:shadow-card"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-[#FDF2F2] text-[#D1343A] flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-mono font-bold text-[#0B0F19] bg-surface-subtle px-2 py-0.5 rounded">
              {wasteStreams.length} Active
            </span>
          </div>
          <h4 className="text-sm font-bold text-[#0B0F19] group-hover:text-[#D1343A] transition-colors">
            Waste Streams
          </h4>
          <p className="text-xs text-[#64748B] mt-1">
            Spent HCl (12t), Alkaline Sludge (9t), Foundry Sand (15t).
          </p>
        </Link>

        {/* Card 2: Market Offers */}
        <Link
          to="/seller/marketplace"
          className="p-5 rounded-2xl bg-surface border border-[#E2E4DC] hover:border-[#D1343A]/40 transition-all shadow-subtle group hover:shadow-card"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center">
              <Store className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-mono font-bold text-[#16A34A] bg-[#DCFCE7] px-2 py-0.5 rounded">
              {offers.length} Deal
            </span>
          </div>
          <h4 className="text-sm font-bold text-[#0B0F19] group-hover:text-[#D1343A] transition-colors">
            Match Offers
          </h4>
          <p className="text-xs text-[#64748B] mt-1">
            Aravali Cement offer: ₹1,250/MT clinker credit (+₹40,550 net).
          </p>
        </Link>

        {/* Card 3: Active Shipments */}
        <Link
          to="/seller/shipments"
          className="p-5 rounded-2xl bg-surface border border-[#E2E4DC] hover:border-[#D1343A]/40 transition-all shadow-subtle group hover:shadow-card"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center">
              <Truck className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-mono font-bold text-[#2563EB] bg-[#EFF6FF] px-2 py-0.5 rounded">
              In Transit
            </span>
          </div>
          <h4 className="text-sm font-bold text-[#0B0F19] group-hover:text-[#D1343A] transition-colors">
            Form 10 Manifests
          </h4>
          <p className="text-xs text-[#64748B] mt-1">
            Manifest #FORM10-UP-2026-9042 with SafeChem Liquid Logistics.
          </p>
        </Link>

        {/* Card 4: Escrow & Reports */}
        <Link
          to="/seller/settlement"
          className="p-5 rounded-2xl bg-surface border border-[#E2E4DC] hover:border-[#D1343A]/40 transition-all shadow-subtle group hover:shadow-card"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center">
              <Receipt className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-mono font-bold text-[#16A34A] bg-[#DCFCE7] px-2 py-0.5 rounded">
              ₹15,000 Held
            </span>
          </div>
          <h4 className="text-sm font-bold text-[#0B0F19] group-hover:text-[#D1343A] transition-colors">
            Escrow & SPCB Audit
          </h4>
          <p className="text-xs text-[#64748B] mt-1">
            Funds locked in smart escrow. SPCB Form 3 audit pack ready.
          </p>
        </Link>
      </div>

      {/* Dual Column Grid: Active Stream Details & Incoming Match Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Primary Active Waste Stream */}
        <div className="p-5 rounded-2xl bg-surface border border-[#E2E4DC] shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E4DC]">
            <div>
              <h3 className="text-sm font-bold text-[#0B0F19]">
                Active Stream: Spent Hydrochloric Acid
              </h3>
              <p className="text-[11px] text-[#64748B]">Batch #SG-2026-08 · Steel Descaling Acidic Liquor</p>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#FDF2F2] text-[#D1343A]">
              Class 8 UN 1789
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 rounded-xl bg-surface-subtle border border-[#E2E4DC]">
              <span className="text-[10px] text-[#64748B] font-semibold uppercase">Volume</span>
              <div className="text-sm font-mono font-bold text-[#0B0F19]">12.0 MT</div>
            </div>
            <div className="p-3 rounded-xl bg-surface-subtle border border-[#E2E4DC]">
              <span className="text-[10px] text-[#64748B] font-semibold uppercase">pH Level</span>
              <div className="text-sm font-mono font-bold text-[#D1343A]">0.85</div>
            </div>
            <div className="p-3 rounded-xl bg-surface-subtle border border-[#E2E4DC]">
              <span className="text-[10px] text-[#64748B] font-semibold uppercase">Dissolved Fe</span>
              <div className="text-sm font-mono font-bold text-[#16A34A]">118.5k ppm</div>
            </div>
            <div className="p-3 rounded-xl bg-surface-subtle border border-[#E2E4DC]">
              <span className="text-[10px] text-[#64748B] font-semibold uppercase">Chlorides</span>
              <div className="text-sm font-mono font-bold text-[#0B0F19]">182k ppm</div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs">
            <span className="text-[#64748B]">
              Certified Assay: SGS_Chemical_Assay_Batch_SG08.pdf (High Confidence)
            </span>
            <Link to="/seller/streams" className="font-bold text-[#D1343A] hover:underline">
              Inspect Fingerprint →
            </Link>
          </div>
        </div>

        {/* Right Column: Accepted Deal Corridor Preview */}
        <div className="p-5 rounded-2xl bg-surface border border-[#E2E4DC] shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E4DC]">
            <div>
              <h3 className="text-sm font-bold text-[#0B0F19]">
                Accepted Deal: Aravali Cement Works Kiln
              </h3>
              <p className="text-[11px] text-[#64748B]">Nimbahera, Rajasthan · 820 km Highway Route</p>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#DCFCE7] text-[#16A34A]">
              Confirmed Match
            </span>
          </div>

          <div className="p-4 rounded-xl bg-surface-subtle border border-[#E2E4DC] space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#64748B]">Payment per Tonne:</span>
              <span className="font-mono font-bold text-[#16A34A]">+₹1,250/MT</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#64748B]">Avoided Landfill Disposal (Status Quo):</span>
              <span className="font-mono font-bold text-[#1E293B]">₹48,000</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#64748B]">Estimated Freight (50% Milk-Run Share):</span>
              <span className="font-mono font-bold text-[#DC2626]">-₹34,850</span>
            </div>
            <div className="pt-2 border-t border-[#E2E4DC] flex items-center justify-between text-xs font-bold">
              <span className="text-[#0B0F19]">Net Economic Gain:</span>
              <span className="font-mono text-sm text-[#16A34A]">+₹40,550</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-[#64748B]">Transporter: SafeChem Rubber-Lined Tanker</span>
            <Link to="/seller/shipments" className="font-bold text-[#D1343A] hover:underline">
              View Form 10 Manifest →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
