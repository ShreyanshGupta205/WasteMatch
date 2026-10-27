import React, { useState } from 'react';
import {
  Receipt,
  Download,
  ShieldCheck,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  Archive,
} from 'lucide-react';
import { useDashboardStore } from '../../store/dashboardStore';

export const SellerSettlement: React.FC = () => {
  const { shipments, currentUser } = useDashboardStore();
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const shipment = shipments[0];

  const handleDownload = (type: string) => {
    setDownloadNotice(`Downloading ${type}...`);
    setTimeout(() => setDownloadNotice(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E2E4DC]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-[#0B0F19]">
              Escrow Settlement, Tax Invoices & SPCB Form 3 Audit Pack
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#DCFCE7] text-[#16A34A] border border-[#16A34A]/20">
              Escrow Protected
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-0.5">
            Automated Fund Custody, GST Invoices, Official Diversion Certificates & Regulatory Filing Exports
          </p>
        </div>

        <button
          onClick={() => handleDownload('SPCB Form 3 Annual Compliance Pack (ZIP)')}
          className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#16A34A] hover:bg-[#15803D] transition-colors shadow-subtle flex items-center gap-1.5 cursor-pointer"
        >
          <Archive className="w-4 h-4" />
          <span>Export Annual Audit Pack (ZIP)</span>
        </button>
      </div>

      {downloadNotice && (
        <div className="p-4 rounded-xl bg-[#DCFCE7] border border-[#16A34A]/30 text-xs font-bold text-[#16A34A] flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5" />
          <span>{downloadNotice}</span>
        </div>
      )}

      {/* Escrow Status Card */}
      <div className="p-6 rounded-2xl bg-surface border border-[#E2E4DC] shadow-subtle space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E2E4DC]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0B0F19]">
                Smart Escrow Settlement Status
              </h3>
              <p className="text-[11px] text-[#64748B]">
                Deal ID: {shipment?.matchId} · Counterparty: {shipment?.buyerName}
              </p>
            </div>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
              shipment?.escrowStatus === 'Released'
                ? 'bg-[#DCFCE7] text-[#16A34A]'
                : shipment?.escrowStatus === 'Disputed'
                ? 'bg-[#FEE2E2] text-[#DC2626]'
                : 'bg-[#FEF3C7] text-[#D97706]'
            }`}
          >
            Escrow Status: {shipment?.escrowStatus}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-surface-subtle border border-[#E2E4DC]">
            <span className="text-[10px] text-[#64748B] font-semibold uppercase">Locked In Escrow</span>
            <div className="text-xl font-mono font-bold text-[#0B0F19] mt-1">
              ₹{shipment?.escrowAmountInr.toLocaleString()}
            </div>
            <span className="text-[10px] text-[#64748B]">12 MT @ ₹1,250/MT</span>
          </div>

          <div className="p-4 rounded-xl bg-surface-subtle border border-[#E2E4DC]">
            <span className="text-[10px] text-[#64748B] font-semibold uppercase">Release Condition</span>
            <div className="text-xs font-semibold text-[#1E293B] mt-1">
              Buyer Gate #4 QC Pass & Form 10 Copy 4 Upload
            </div>
            <span className="text-[10px] text-[#16A34A]">Auto-triggered on receiver sign-off</span>
          </div>

          <div className="p-4 rounded-xl bg-surface-subtle border border-[#E2E4DC]">
            <span className="text-[10px] text-[#64748B] font-semibold uppercase">Dispute Protection</span>
            <div className="text-xs font-semibold text-[#1E293B] mt-1">
              Admin Escrow Arbitrator Guard
            </div>
            <span className="text-[10px] text-[#64748B]">Protected from unilateral withdrawal</span>
          </div>
        </div>
      </div>

      {/* Available Documents Download Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Doc 1: Tax Invoice */}
        <div className="p-5 rounded-2xl bg-surface border border-[#E2E4DC] shadow-subtle flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <span className="text-[10px] font-mono font-bold text-[#2563EB] bg-[#EFF6FF] px-2 py-0.5 rounded">
              GST Tax Invoice
            </span>
            <h4 className="text-sm font-bold text-[#0B0F19]">
              Commercial Tax Invoice (HSN 2806)
            </h4>
            <p className="text-xs text-[#64748B]">
              Invoice #INV-2026-0941 · 18% GST itemized · Compliant with GST e-Invoicing format.
            </p>
          </div>

          <button
            onClick={() => handleDownload('GST Tax Invoice #INV-2026-0941 (PDF)')}
            className="w-full py-2.5 rounded-xl text-xs font-bold text-[#1E293B] hover:text-white bg-surface hover:bg-[#0B0F19] border border-[#E2E4DC] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-subtle"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Tax Invoice (PDF)</span>
          </button>
        </div>

        {/* Doc 2: Diversion Certificate */}
        <div className="p-5 rounded-2xl bg-surface border border-[#E2E4DC] shadow-subtle flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <span className="text-[10px] font-mono font-bold text-[#16A34A] bg-[#DCFCE7] px-2 py-0.5 rounded">
              Receiver Issued
            </span>
            <h4 className="text-sm font-bold text-[#0B0F19]">
              Official Waste Diversion Certificate
            </h4>
            <p className="text-xs text-[#64748B]">
              Issued by Aravali Cement Works Kiln · Certifies 12 MT recycled & 1.6 t CO₂e avoided.
            </p>
          </div>

          <button
            onClick={() => handleDownload('Waste Diversion Certificate DIV-ARAVALI-2026 (PDF)')}
            className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-[#16A34A] hover:bg-[#15803D] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-subtle"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Certificate (PDF)</span>
          </button>
        </div>

        {/* Doc 3: Annual Audit Pack */}
        <div className="p-5 rounded-2xl bg-surface border border-[#E2E4DC] shadow-subtle flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <span className="text-[10px] font-mono font-bold text-[#D97706] bg-[#FEF3C7] px-2 py-0.5 rounded">
              SPCB Form 3 Bundle
            </span>
            <h4 className="text-sm font-bold text-[#0B0F19]">
              Annual SPCB Audit Filing Pack
            </h4>
            <p className="text-xs text-[#64748B]">
              Complete archive containing Form 10 manifests, signed Copies 4, TREM cards & invoices.
            </p>
          </div>

          <button
            onClick={() => handleDownload('SPCB Form 3 Annual Compliance Audit Pack (ZIP)')}
            className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-[#D1343A] hover:bg-[#A81818] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-subtle"
          >
            <Archive className="w-3.5 h-3.5" />
            <span>Export Form 3 Pack (ZIP)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
