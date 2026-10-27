import React from 'react';
import {
  ShieldAlert,
  Users,
  CreditCard,
  TrendingUp,
  FileCheck2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  BarChart3,
  Clock,
  Layers,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDashboardStore } from '../../store/dashboardStore';

export const AdminOverview: React.FC = () => {
  const { adminUsers, shipments, wasteStreams, labsDirectory, transportersDirectory } = useDashboardStore();

  const pendingUsers = adminUsers.filter((u) => u.verificationStatus === 'Pending');
  const verifiedUsers = adminUsers.filter((u) => u.verificationStatus === 'Verified');
  const disputedShipments = shipments.filter((s) => s.escrowStatus === 'Disputed');
  const heldEscrow = shipments
    .filter((s) => s.escrowStatus === 'Held')
    .reduce((sum, s) => sum + s.escrowAmountInr, 0);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#0B0F19] text-white rounded-2xl p-6 shadow-sm border border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-950/80 text-red-300 border border-red-800">
              Admin Platform Operations
            </span>
            <span className="text-xs text-stone-400">CPCB & SPCB Regulatory Oversight Engine</span>
          </div>
          <h1 className="text-2xl font-bold">WasteMatch Central Compliance Administration</h1>
          <p className="text-xs text-stone-300 mt-1 max-w-2xl">
            Global monitoring of verified industrial symbiosis matches, KYC authorization scrutiny, Form 10 manifests, and tripartite escrow disbursements.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/admin/users"
            className="px-4 py-2.5 rounded-xl bg-[#D1343A] hover:bg-[#A81818] text-white font-semibold text-xs shadow-sm flex items-center gap-2 transition"
          >
            <Users className="w-4 h-4" /> Review KYC Queue ({pendingUsers.length})
          </Link>
        </div>
      </div>

      {/* Aggregate Impact Metrics (Prompt Requirement) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white border border-[#E2E4DC] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
            <span>Total Waste Diverted</span>
            <Layers className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="font-mono text-2xl font-bold text-[#0B0F19]">1,482.5 MT</div>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium mt-1">
            <span>↑ 24% vs last quarter</span>
          </div>
        </div>

        <div className="bg-white border border-[#E2E4DC] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
            <span>Estimated CO₂ Avoided</span>
            <Sparkles className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="font-mono text-2xl font-bold text-emerald-700">196.4 tCO₂e</div>
          <p className="text-[11px] text-stone-500 mt-1">Via virgin raw material displacement</p>
        </div>

        <div className="bg-white border border-[#E2E4DC] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
            <span>Gross Transacted Value</span>
            <CreditCard className="w-4 h-4 text-blue-600" />
          </div>
          <div className="font-mono text-2xl font-bold text-stone-900">₹1,84,50,000</div>
          <p className="text-[11px] text-stone-500 mt-1">Anonymized platform-wide turnover</p>
        </div>

        <div className="bg-white border border-[#E2E4DC] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
            <span>Escrow Under Custody</span>
            <ShieldCheck className="w-4 h-4 text-amber-600" />
          </div>
          <div className="font-mono text-2xl font-bold text-amber-600">
            ₹{heldEscrow.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-stone-500 mt-1">In ICICI Custodial Bank Escrow Pool</p>
        </div>
      </div>

      {/* Critical Operational Alerts */}
      <div className="bg-white border border-[#E2E4DC] rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#0B0F19]">Statutory & Regulatory Alerts</h2>
              <p className="text-xs text-stone-500">Live operational compliance signals requiring administrator action.</p>
            </div>
          </div>
          <Link
            to="/admin/compliance"
            className="text-xs text-[#D1343A] hover:underline flex items-center gap-1 font-semibold"
          >
            View All Compliance Audits <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="mt-4 space-y-3">
          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-stone-900">Interstate Hazardous Waste Movement Notification</h4>
                <p className="text-xs text-stone-600 mt-0.5">
                  Shipment <strong className="font-mono">FORM10-UP-2026-9042</strong> transit crossed Uttar Pradesh → Rajasthan border. Check UPPCB Form 10 Copy 2 and RSPCB acknowledgment sync.
                </p>
              </div>
            </div>
            <Link
              to="/admin/transactions"
              className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold self-start md:self-auto transition"
            >
              Inspect Manifest
            </Link>
          </div>

          <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-stone-900">SPCB Hazardous Waste Authorization Expiring Soon</h4>
                <p className="text-xs text-stone-600 mt-0.5">
                  Bharat Paper & Board Mills authorization <strong className="font-mono">UPPCB/HW/MZF/2023/3412</strong> expires in 34 days (30-Nov-2026). Automated renewal reminder dispatched.
                </p>
              </div>
            </div>
            <Link
              to="/admin/users"
              className="px-3.5 py-1.5 rounded-lg bg-stone-800 hover:bg-black text-white text-xs font-semibold self-start md:self-auto transition"
            >
              View User Dossier
            </Link>
          </div>
        </div>
      </div>

      {/* Two Column Layout: User Verification & Reference Directories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Management Quick Snapshot */}
        <div className="bg-white border border-[#E2E4DC] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-stone-200">
            <div>
              <h3 className="text-base font-bold text-[#0B0F19]">Pending KYC Queue</h3>
              <p className="text-xs text-stone-500">Entities awaiting GST, PAN, and SPCB verification.</p>
            </div>
            <Link
              to="/admin/users"
              className="text-xs font-semibold text-[#D1343A] hover:underline flex items-center gap-1"
            >
              Manage Users <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-stone-100 mt-3">
            {adminUsers.map((u) => (
              <div key={u.id} className="py-3.5 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-stone-900 text-sm">{u.businessName}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                        u.role === 'seller' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {u.role}
                    </span>
                  </div>
                  <div className="text-xs text-stone-500 mt-0.5">
                    GSTIN: <span className="font-mono">{u.gstin}</span> • {u.city}, {u.state}
                  </div>
                </div>

                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    u.verificationStatus === 'Verified'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}
                >
                  {u.verificationStatus}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Reference Entities Status (Strictly No Dashboards) */}
        <div className="bg-white border border-[#E2E4DC] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-stone-200">
            <div>
              <h3 className="text-base font-bold text-[#0B0F19]">Reference Directories</h3>
              <p className="text-xs text-stone-500">Contact entities for sellers/buyers (No dashboards created).</p>
            </div>
          </div>

          <div className="mt-4 space-y-4">
            {/* Labs Directory Card */}
            <div className="p-4 rounded-xl border border-stone-200 bg-[#F8F6F5] flex items-center justify-between">
              <div className="space-y-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-stone-200 text-stone-700">
                  Reference Entity (No Login)
                </span>
                <h4 className="text-sm font-bold text-stone-900">Partner NABL Laboratories Directory</h4>
                <p className="text-xs text-stone-600">
                  {labsDirectory.length} accredited labs listed with indicative pricing for heavy metal & TCLP leachate assays.
                </p>
              </div>
              <Link
                to="/admin/labs"
                className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-black text-white text-xs font-semibold transition"
              >
                Manage Directory
              </Link>
            </div>

            {/* Transporters Directory Card */}
            <div className="p-4 rounded-xl border border-stone-200 bg-[#F8F6F5] flex items-center justify-between">
              <div className="space-y-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-stone-200 text-stone-700">
                  Reference Entity (No Login)
                </span>
                <h4 className="text-sm font-bold text-stone-900">Authorized Transporter Fleet Directory</h4>
                <p className="text-xs text-stone-600">
                  {transportersDirectory.length} SPCB-permitted hazardous waste haulers with ISO-tanker & rubber-lined specs.
                </p>
              </div>
              <Link
                to="/admin/transporters"
                className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-black text-white text-xs font-semibold transition"
              >
                Manage Directory
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
