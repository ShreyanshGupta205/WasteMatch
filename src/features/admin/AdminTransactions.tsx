import React, { useState } from 'react';
import {
  CreditCard,
  ShieldCheck,
  AlertOctagon,
  CheckCircle2,
  XCircle,
  FileText,
  Clock,
  ArrowRight,
  RotateCcw,
  ExternalLink,
  Filter,
} from 'lucide-react';
import { useDashboardStore } from '../../store/dashboardStore';

export const AdminTransactions: React.FC = () => {
  const { shipments, offers, resolveDispute } = useDashboardStore();
  const [filterEscrow, setFilterEscrow] = useState<'all' | 'Held' | 'Released' | 'Disputed' | 'Refunded'>('all');
  const [toast, setToast] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4500);
  };

  const handleResolve = (shipmentId: string, resolution: 'ReleaseToSeller' | 'RefundToBuyer') => {
    resolveDispute(shipmentId, resolution);
    if (resolution === 'ReleaseToSeller') {
      showNotification(`Dispute resolved in favor of Seller. Escrow funds transferred to Seller bank account.`);
    } else {
      showNotification(`Dispute resolved in favor of Buyer. Escrow funds refunded to Buyer custodial balance.`);
    }
  };

  const filteredShipments = shipments.filter((s) => {
    if (filterEscrow !== 'all' && s.escrowStatus !== filterEscrow) return false;
    return true;
  });

  const disputes = shipments.filter((s) => s.escrowStatus === 'Disputed');

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
              Escrow Oversight & Arbitration
            </span>
            <span className="text-xs text-stone-500">ICICI Bank Custodial Trust Integration</span>
          </div>
          <h1 className="text-2xl font-bold text-[#0B0F19]">Transaction Oversight & Dispute Resolution</h1>
          <p className="text-sm text-stone-600 mt-1">
            Global view of all matches, escrow fund locks, gate assay disputes, and statutory arbitration triggers.
          </p>
        </div>
      </div>

      {/* Escrow Status Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E2E4DC] rounded-2xl p-5 shadow-sm">
          <span className="text-stone-500 text-xs block">Funds Held in Custody</span>
          <div className="font-mono text-xl font-bold text-amber-600 mt-1">₹15,000</div>
          <span className="text-[11px] text-stone-400">1 active shipment</span>
        </div>
        <div className="bg-white border border-[#E2E4DC] rounded-2xl p-5 shadow-sm">
          <span className="text-stone-500 text-xs block">Disbursed Payouts</span>
          <div className="font-mono text-xl font-bold text-emerald-700 mt-1">₹52,200</div>
          <span className="text-[11px] text-stone-400">Gate QC validated</span>
        </div>
        <div className="bg-white border border-[#E2E4DC] rounded-2xl p-5 shadow-sm">
          <span className="text-stone-500 text-xs block">Active Disputes</span>
          <div className="font-mono text-xl font-bold text-red-600 mt-1">{disputes.length} Disputes</div>
          <span className="text-[11px] text-stone-400">Requires admin arbitration</span>
        </div>
        <div className="bg-white border border-[#E2E4DC] rounded-2xl p-5 shadow-sm">
          <span className="text-stone-500 text-xs block">Gross Transaction Volume</span>
          <div className="font-mono text-xl font-bold text-stone-900 mt-1">₹1,84,500</div>
          <span className="text-[11px] text-stone-400">Oct 2026 Run Rate</span>
        </div>
      </div>

      {/* Dispute Arbitration Queue (Prompt Requirement) */}
      {disputes.length > 0 && (
        <div className="bg-white border-2 border-red-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 pb-4 border-b border-red-100">
            <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center text-red-700">
              <AlertOctagon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-red-900">Active Dispute Resolution Queue</h2>
              <p className="text-xs text-red-700">
                Consignments flagged for QC assay failure or manifest specification discrepancies.
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-4">
            {disputes.map((d) => (
              <div key={d.id} className="p-4 rounded-xl border border-red-200 bg-red-50/50 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="font-mono font-bold text-stone-900 text-sm">{d.manifestForm10No}</span>
                    <span className="text-xs text-stone-500 ml-2">({d.manifestData.wasteDescription})</span>
                  </div>
                  <div className="font-mono font-bold text-red-700">
                    Escrow: ₹{d.escrowAmountInr.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="text-xs text-stone-700 grid grid-cols-1 sm:grid-cols-2 gap-2 bg-white p-3 rounded-lg border border-red-100">
                  <div>
                    <span className="text-stone-500">Seller / Generator:</span> {d.sellerName}
                  </div>
                  <div>
                    <span className="text-stone-500">Buyer / Receiver:</span> {d.buyerName}
                  </div>
                  <div className="sm:col-span-2 text-red-700 font-medium">
                    QC Rejection Flag: {d.qcNotes || 'Chemical assay out of agreed threshold'}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    onClick={() => handleResolve(d.id, 'RefundToBuyer')}
                    className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-black text-white text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    <RotateCcw className="w-4 h-4" /> Refund Escrow to Buyer
                  </button>
                  <button
                    onClick={() => handleResolve(d.id, 'ReleaseToSeller')}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Release Escrow to Seller
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Global Matches & Shipments Table */}
      <div className="bg-white border border-[#E2E4DC] rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-200 gap-4">
          <div>
            <h2 className="text-base font-bold text-[#0B0F19]">Global Match & Settlement Ledger</h2>
            <p className="text-xs text-stone-500">Comprehensive real-time ledger of all matches across India.</p>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-stone-400" />
            <select
              value={filterEscrow}
              onChange={(e) => setFilterEscrow(e.target.value as any)}
              className="px-3 py-1.5 border border-stone-200 rounded-xl text-xs bg-white text-stone-700 focus:outline-none"
            >
              <option value="all">All Escrow Statuses</option>
              <option value="Held">Funds Held</option>
              <option value="Released">Released</option>
              <option value="Disputed">Disputed</option>
              <option value="Refunded">Refunded</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-200 text-stone-500 uppercase tracking-wider font-semibold">
                <th className="py-3 px-3">Manifest / ID</th>
                <th className="py-3 px-3">Parties</th>
                <th className="py-3 px-3">Material & Quantity</th>
                <th className="py-3 px-3">Transit Status</th>
                <th className="py-3 px-3">Gate QC</th>
                <th className="py-3 px-3">Escrow Status</th>
                <th className="py-3 px-3 text-right">Escrow Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredShipments.map((s) => (
                <tr key={s.id} className="hover:bg-stone-50/70 transition">
                  <td className="py-3.5 px-3">
                    <span className="font-mono text-stone-900 font-bold block">{s.manifestForm10No}</span>
                    <span className="text-[11px] text-stone-400 font-mono">Match #{s.matchId}</span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="font-medium text-stone-900 block">{s.sellerName}</span>
                    <span className="text-[11px] text-stone-500">→ {s.buyerName}</span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="font-semibold text-stone-800 block">{s.manifestData.wasteDescription}</span>
                    <span className="font-mono text-stone-500">{s.manifestData.quantityTonnes} MT</span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                        s.status === 'Delivered'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : s.status === 'In Transit'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                        s.qcResult === 'Passed'
                          ? 'bg-emerald-50 text-emerald-700'
                          : s.qcResult === 'Failed'
                          ? 'bg-red-50 text-red-700'
                          : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      {s.qcResult}
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        s.escrowStatus === 'Released'
                          ? 'bg-emerald-100 text-emerald-800'
                          : s.escrowStatus === 'Disputed'
                          ? 'bg-red-100 text-red-800'
                          : s.escrowStatus === 'Held'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-stone-100 text-stone-800'
                      }`}
                    >
                      {s.escrowStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono font-bold text-stone-900">
                    ₹{s.escrowAmountInr.toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
