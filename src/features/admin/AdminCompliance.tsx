import React, { useState } from 'react';
import {
  ShieldAlert,
  Download,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Clock,
  Sparkles,
  ArrowRight,
  Filter,
  Layers,
  FileSpreadsheet,
} from 'lucide-react';
import { useDashboardStore } from '../../store/dashboardStore';

export const AdminCompliance: React.FC = () => {
  const { shipments, adminUsers } = useDashboardStore();
  const [toast, setToast] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const handleExportAuditLogs = () => {
    showNotification('Platform-wide SPCB & CPCB compliance audit log bundle exported (ZIP format).');
  };

  const complianceAlerts = [
    {
      id: 'alert-01',
      severity: 'Critical',
      title: 'Interstate Hazardous Consignment Movement Detected',
      details: 'Manifest FORM10-UP-2026-9042: Crossing from Uttar Pradesh into Rajasthan. Transporter verified with valid CMVR Rule 129 TREM card.',
      entity: 'SafeChem Dedicated Logistics (UP14-BT-8902)',
      statutoryRule: 'CPCB Guidelines on Interstate Hazardous Movement (Rule 18.2)',
      time: '2 hours ago',
      resolved: false,
    },
    {
      id: 'alert-02',
      severity: 'Warning',
      title: 'SPCB Hazardous Waste Authorization Expiring Within 45 Days',
      details: 'Bharat Paper & Board Mills authorization UPPCB/HW/MZF/2023/3412 valid till 30-Nov-2026.',
      entity: 'Bharat Paper & Board Mills',
      statutoryRule: 'Hazardous and Other Wastes (M&THM) Rules, 2016 Rule 6(5)',
      time: '1 day ago',
      resolved: false,
    },
    {
      id: 'alert-03',
      severity: 'Info',
      title: 'Form 10 Manifest Copy 4 Receipt Logged',
      details: 'Aravali Cement Works signed receiver receipt Copy 4 for 12.0 MT Spent Hydrochloric Acid.',
      entity: 'Aravali Cement Works',
      statutoryRule: 'Rule 19 (Manifest System Copy 4 Return)',
      time: '3 hours ago',
      resolved: true,
    },
  ];

  const auditEvents = [
    {
      timestamp: '28-Oct-2026 14:22:10 IST',
      actor: 'system-agent',
      action: 'MANIFEST_FORM10_GENERATED',
      details: 'Pre-filled Form 10 generated for match match-hero-01. Consignor: Shree Ganesh Galvanizers.',
      ip: '10.0.4.12',
    },
    {
      timestamp: '28-Oct-2026 11:05:40 IST',
      actor: 'admin@wastematch.com',
      action: 'USER_KYC_VERIFIED',
      details: 'Verified SPCB HW Authorization UPPCB/HW/GZB/2024/7741 for Shree Ganesh Galvanizers.',
      ip: '103.21.144.9',
    },
    {
      timestamp: '27-Oct-2026 19:40:15 IST',
      actor: 'buyer@aravalicement.com',
      action: 'ESCROW_FUNDS_LOCKED',
      details: 'ICICI Escrow hold of INR 15,000 for Spent HCl consignment.',
      ip: '49.204.12.88',
    },
    {
      timestamp: '27-Oct-2026 18:12:00 IST',
      actor: 'seller@shreeganesh.com',
      action: 'WASTE_STREAM_CREATED',
      details: 'Alkaline Lime/Caustic Sludge created without lab report. Triggered NABL lab referral prompt.',
      ip: '122.161.44.10',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div className="bg-[#0B0F19] text-white px-5 py-3.5 rounded-xl border border-emerald-500/40 shadow-xl flex items-center justify-between text-sm animate-in fade-in">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium text-stone-200">{toast}</span>
          </div>
          <button onClick={() => setToast(null)} className="text-stone-400 hover:text-white ml-4 text-xs">
            Dismiss
          </button>
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-white border border-[#E2E4DC] rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              India Regulatory Compliance Engine
            </span>
            <span className="text-xs text-stone-500">Form 3 Annual Returns & Form 10 Audit Pack</span>
          </div>
          <h1 className="text-2xl font-bold text-[#0B0F19]">Statutory Compliance, Alerts & Audit Logs</h1>
          <p className="text-sm text-stone-600 mt-1">
            Real-time compliance monitoring for interstate hazardous transit, authorization expirations, and exportable regulatory packs.
          </p>
        </div>
        <button
          onClick={handleExportAuditLogs}
          className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-black text-white font-semibold text-xs shadow-sm flex items-center gap-2 transition"
        >
          <Download className="w-4 h-4" /> Export Platform Audit Logs (ZIP)
        </button>
      </div>

      {/* Impact & Compliance Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white border border-[#E2E4DC] rounded-2xl p-5 shadow-sm">
          <span className="text-stone-500 text-xs block">Hazardous Shipments Manifested</span>
          <div className="font-mono text-2xl font-bold text-stone-900 mt-1">100% Compliant</div>
          <p className="text-[11px] text-emerald-700 font-medium mt-1">
            Zero unregistered shipments across all state borders
          </p>
        </div>

        <div className="bg-white border border-[#E2E4DC] rounded-2xl p-5 shadow-sm">
          <span className="text-stone-500 text-xs block">SPCB Authorizations Tracked</span>
          <div className="font-mono text-2xl font-bold text-blue-700 mt-1">{adminUsers.length} Facilities</div>
          <p className="text-[11px] text-stone-500 mt-1">
            1 expiring within 45 days (reminder dispatched)
          </p>
        </div>

        <div className="bg-white border border-[#E2E4DC] rounded-2xl p-5 shadow-sm">
          <span className="text-stone-500 text-xs block">Carbon Offset Verified</span>
          <div className="font-mono text-2xl font-bold text-emerald-700 mt-1">196.4 tCO₂e</div>
          <p className="text-[11px] text-stone-500 mt-1">
            Certified diversion substituting virgin quarrying
          </p>
        </div>
      </div>

      {/* Compliance Alerts Stack */}
      <div className="bg-white border border-[#E2E4DC] rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-[#D1343A]" />
            <h2 className="text-base font-bold text-[#0B0F19]">Active Regulatory Compliance Alerts</h2>
          </div>
          <span className="text-xs text-stone-500 font-mono">3 Signals Logged</span>
        </div>

        <div className="mt-4 space-y-3">
          {complianceAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                alert.severity === 'Critical'
                  ? 'bg-red-50/60 border-red-200'
                  : alert.severity === 'Warning'
                  ? 'bg-amber-50/60 border-amber-200'
                  : 'bg-emerald-50/60 border-emerald-200'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      alert.severity === 'Critical'
                        ? 'bg-red-200 text-red-900'
                        : alert.severity === 'Warning'
                        ? 'bg-amber-200 text-amber-900'
                        : 'bg-emerald-200 text-emerald-900'
                    }`}
                  >
                    {alert.severity}
                  </span>
                  <span className="text-xs font-bold text-stone-900">{alert.title}</span>
                  <span className="text-[11px] text-stone-400 font-mono">({alert.time})</span>
                </div>
                <p className="text-xs text-stone-700">{alert.details}</p>
                <div className="text-[11px] text-stone-500 font-mono">
                  Target Entity: {alert.entity} • Ref: {alert.statutoryRule}
                </div>
              </div>

              <div className="flex items-center gap-2 self-start md:self-auto">
                {alert.resolved ? (
                  <span className="px-3 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Resolved
                  </span>
                ) : (
                  <button
                    onClick={() => showNotification(`Alert acknowledged and recorded in SPCB compliance ledger.`)}
                    className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-black text-white text-xs font-medium transition"
                  >
                    Acknowledge Alert
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Platform-Wide Audit Logs */}
      <div className="bg-white border border-[#E2E4DC] rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <div>
            <h2 className="text-base font-bold text-[#0B0F19]">Platform Audit Trail (Immutable Log)</h2>
            <p className="text-xs text-stone-500">Record of authentication events, manifest generation, and escrow movements.</p>
          </div>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-200 text-stone-500 uppercase tracking-wider font-semibold">
                <th className="py-3 px-3">Timestamp (IST)</th>
                <th className="py-3 px-3">Actor</th>
                <th className="py-3 px-3">Action Event</th>
                <th className="py-3 px-3">Log Details</th>
                <th className="py-3 px-3 text-right">Source IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-mono">
              {auditEvents.map((evt, idx) => (
                <tr key={idx} className="hover:bg-stone-50/70 transition">
                  <td className="py-3 px-3 text-stone-700 whitespace-nowrap">{evt.timestamp}</td>
                  <td className="py-3 px-3 text-stone-900 font-semibold">{evt.actor}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded text-[11px] bg-stone-100 text-stone-800 font-bold">
                      {evt.action}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-sans text-stone-700">{evt.details}</td>
                  <td className="py-3 px-3 text-right text-stone-400">{evt.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
