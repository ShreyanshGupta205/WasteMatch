import React from 'react';
import { Link } from 'react-router-dom';
import {
  Flame,
  Truck,
  CreditCard,
  SlidersHorizontal,
  FileCheck2,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Building2,
} from 'lucide-react';
import { useDashboardStore } from '../../store/dashboardStore';

export const BuyerOverview: React.FC = () => {
  const { buyerProfile, shipments } = useDashboardStore();

  const activeDeliveries = shipments.filter((s) => s.status !== 'Delivered');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E2E4DC]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-[#0B0F19]">
              Co-Processor / Receiver Operations Hub
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#EFF6FF] text-[#2563EB] border border-[#2563EB]/20">
              Authorized Kiln
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-0.5">
            {buyerProfile.facilityName} · SPCB Auth #{buyerProfile.spcbAuthNo} · Nimbahera, Rajasthan
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/buyer/matches"
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-[#2563EB] hover:bg-[#1d4ed8] transition-colors shadow-subtle flex items-center gap-1.5"
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Review Incoming Matches (2)</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          to="/buyer/profile"
          className="p-5 rounded-2xl bg-surface border border-[#E2E4DC] hover:border-[#2563EB]/40 transition-all shadow-subtle group hover:shadow-card"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-mono font-bold text-[#0B0F19] bg-surface-subtle px-2 py-0.5 rounded">
              450 MT/mo
            </span>
          </div>
          <h4 className="text-sm font-bold text-[#0B0F19] group-hover:text-[#2563EB] transition-colors">
            Monthly Quota & Limits
          </h4>
          <p className="text-xs text-[#64748B] mt-1">
            Acceptance envelope: pH 0.5–12.5, Chlorides &lt; 200k ppm, Metals &lt; 100 ppm.
          </p>
        </Link>

        <Link
          to="/buyer/matches"
          className="p-5 rounded-2xl bg-surface border border-[#E2E4DC] hover:border-[#2563EB]/40 transition-all shadow-subtle group hover:shadow-card"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center">
              <Flame className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-mono font-bold text-[#D97706] bg-[#FEF3C7] px-2 py-0.5 rounded">
              2 Compatible
            </span>
          </div>
          <h4 className="text-sm font-bold text-[#0B0F19] group-hover:text-[#2563EB] transition-colors">
            Incoming Matches
          </h4>
          <p className="text-xs text-[#64748B] mt-1">
            Spent HCl from Shree Ganesh (94% compatibility) & Alkaline Sludge.
          </p>
        </Link>

        <Link
          to="/buyer/deliveries"
          className="p-5 rounded-2xl bg-surface border border-[#E2E4DC] hover:border-[#2563EB]/40 transition-all shadow-subtle group hover:shadow-card"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center">
              <Truck className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-mono font-bold text-[#16A34A] bg-[#DCFCE7] px-2 py-0.5 rounded">
              1 Inbound
            </span>
          </div>
          <h4 className="text-sm font-bold text-[#0B0F19] group-hover:text-[#2563EB] transition-colors">
            Gate Quality Control
          </h4>
          <p className="text-xs text-[#64748B] mt-1">
            Gate #4 delivery scheduled. Form 10 Copy 4 verification & QC check.
          </p>
        </Link>

        <Link
          to="/buyer/payments"
          className="p-5 rounded-2xl bg-surface border border-[#E2E4DC] hover:border-[#2563EB]/40 transition-all shadow-subtle group hover:shadow-card"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-[#F8F6F5] text-[#1E293B] flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-mono font-bold text-[#16A34A] bg-[#DCFCE7] px-2 py-0.5 rounded">
              ₹15,000 Held
            </span>
          </div>
          <h4 className="text-sm font-bold text-[#0B0F19] group-hover:text-[#2563EB] transition-colors">
            Escrow Custody
          </h4>
          <p className="text-xs text-[#64748B] mt-1">
            Pre-funded escrow. Auto-releases upon Gate #4 QC Pass.
          </p>
        </Link>
      </div>

      {/* Hero Inbound Delivery & QC Gate Card */}
      <div className="p-6 rounded-2xl bg-surface border border-[#E2E4DC] shadow-subtle space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E2E4DC]">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#2563EB]">
              INBOUND DELIVERY WINDOW · GATE #4
            </span>
            <h3 className="text-base font-bold text-[#0B0F19]">
              12 MT Spent Hydrochloric Acid (Shree Ganesh Galvanizers)
            </h3>
            <p className="text-xs text-[#64748B]">Carrier: SafeChem Rubber-Lined Tanker · Manifest #{shipments[0]?.manifestForm10No}</p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#EFF6FF] text-[#2563EB]">
            {shipments[0]?.status}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-surface-subtle border border-[#E2E4DC]">
            <span className="text-[10px] text-[#64748B] font-semibold uppercase">Material Value in Kiln</span>
            <div className="text-sm font-bold text-[#16A34A] mt-1">
              Replaces Mined Bauxite Iron Additive
            </div>
            <span className="text-[10px] text-[#64748B]">Provides 1.42t Fe elemental flux</span>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-subtle border border-[#E2E4DC]">
            <span className="text-[10px] text-[#64748B] font-semibold uppercase">Gate QC Parameters</span>
            <div className="text-sm font-mono font-bold text-[#0B0F19] mt-1">
              pH 0.85 · Cl⁻ 182k ppm
            </div>
            <span className="text-[10px] text-[#16A34A]">Within kiln burner envelope</span>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-subtle border border-[#E2E4DC]">
            <span className="text-[10px] text-[#64748B] font-semibold uppercase">Next Action</span>
            <div className="text-xs font-bold text-[#2563EB] mt-1">
              Confirm Delivery & Perform QC Pass
            </div>
            <span className="text-[10px] text-[#64748B]">Unlocks Diversion Certificate</span>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <Link
            to="/buyer/deliveries"
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#2563EB] hover:bg-[#1d4ed8] transition-colors flex items-center gap-1.5"
          >
            <span>Proceed to Gate Quality Control</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
