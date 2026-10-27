import React, { useState } from 'react';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  CheckCircle2,
  Clock,
  Download,
  AlertCircle,
  ShieldCheck,
  Building,
  FileText,
  CreditCard,
  Plus,
} from 'lucide-react';
import { useDashboardStore } from '../../store/dashboardStore';

export const BuyerPayments: React.FC = () => {
  const { shipments, offers } = useDashboardStore();
  const [escrowDepositModal, setEscrowDepositModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState('50000');
  const [toast, setToast] = useState<string | null>(null);

  const [escrowBalance, setEscrowBalance] = useState(125000);

  const showNotification = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4500);
  };

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = Number(depositAmount);
    if (val > 0) {
      setEscrowBalance((prev) => prev + val);
      setEscrowDepositModal(false);
      showNotification(`₹${val.toLocaleString('en-IN')} deposited successfully into ICICI Escrow Account.`);
    }
  };

  const transactions = [
    {
      id: 'tx-8812',
      date: '28-Oct-2026',
      type: 'Escrow Allocation',
      reference: 'Match #match-hero-01 (Spent HCl)',
      beneficiary: 'Shree Ganesh Galvanizers Plant #2',
      amount: 15000,
      status: 'Funds Held in Escrow',
      invoiceUrl: '/docs/invoice_inv_2026_0941.pdf',
    },
    {
      id: 'tx-7901',
      date: '14-Oct-2026',
      type: 'Escrow Settlement',
      reference: 'Match #match-past-09 (Alkaline Lime Sludge)',
      beneficiary: 'Bharat Paper & Board Mills',
      amount: 7200,
      status: 'Released to Generator',
      invoiceUrl: '/docs/invoice_inv_2026_0811.pdf',
    },
    {
      id: 'tx-6502',
      date: '02-Oct-2026',
      type: 'Transport Logistics Settlement',
      reference: 'Transporter Logistics Manifest FORM10-UP-2026-8711',
      beneficiary: 'SafeChem Dedicated Logistics',
      amount: 45000,
      status: 'Released to Transporter',
      invoiceUrl: '/docs/invoice_trans_2026_022.pdf',
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
              Tripartite Escrow Mechanism
            </span>
            <span className="text-xs text-stone-500">RBI Scheduled Commercial Bank Escrow</span>
          </div>
          <h1 className="text-2xl font-bold text-[#0B0F19]">Escrow Accounts & Settlement Ledger</h1>
          <p className="text-sm text-stone-600 mt-1">
            Pre-fund transactions into protected third-party escrow. Funds are locked upon offer acceptance and only disbursed after Gate QC validation.
          </p>
        </div>
        <button
          onClick={() => setEscrowDepositModal(true)}
          className="px-4 py-2.5 rounded-xl bg-[#D1343A] hover:bg-[#A81818] text-white font-semibold text-xs shadow-sm flex items-center gap-2 transition"
        >
          <Plus className="w-4 h-4" /> Deposit Escrow Funds
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white border border-[#E2E4DC] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
            <span>Available Escrow Balance</span>
            <Wallet className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="font-mono text-2xl font-bold text-[#0B0F19]">
            ₹{escrowBalance.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-stone-500 mt-1">Ready for match commitments & gate clearances</p>
        </div>

        <div className="bg-white border border-[#E2E4DC] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
            <span>Locked in Active Shipments</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="font-mono text-2xl font-bold text-amber-600">
            ₹15,000
          </div>
          <p className="text-[11px] text-stone-500 mt-1">Held pending Gate QC at Aravali Cement Works</p>
        </div>

        <div className="bg-white border border-[#E2E4DC] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
            <span>Disbursed (FY 2026-27)</span>
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
          </div>
          <div className="font-mono text-2xl font-bold text-stone-800">
            ₹52,200
          </div>
          <p className="text-[11px] text-stone-500 mt-1">Settled upon confirmed Form 10 Copy 4 receipt</p>
        </div>
      </div>

      {/* Escrow Mechanism Explainer */}
      <div className="bg-[#0B0F19] text-white rounded-2xl p-6 border border-stone-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1 max-w-xl">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4" /> WasteMatch Zero-Risk Escrow Guarantee
          </div>
          <h3 className="text-lg font-bold">Funds released ONLY when incoming assay meets specifications</h3>
          <p className="text-xs text-stone-400">
            If chemical assay fails during gate inspection (Rule 18/Form 10), buyer triggers dispute. Funds are retained in escrow until admin arbitration or consignment return.
          </p>
        </div>
        <div className="bg-stone-900 border border-stone-700 rounded-xl p-4 text-xs font-mono text-stone-300">
          <div>Escrow Trustee: ICICI Bank Custodial Trust</div>
          <div>Account No: 0041-ESCR-7782-9901</div>
          <div>IFSC Code: ICIC0000041</div>
        </div>
      </div>

      {/* Transactions & Invoices Table */}
      <div className="bg-white border border-[#E2E4DC] rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <div>
            <h2 className="text-base font-bold text-[#0B0F19]">Transaction Ledger & GST Invoices</h2>
            <p className="text-xs text-stone-500">Record of escrow deposits, holds, releases, and tax invoices.</p>
          </div>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-200 text-stone-500 uppercase tracking-wider font-semibold">
                <th className="py-3 px-3">Date & Ref</th>
                <th className="py-3 px-3">Transaction Type</th>
                <th className="py-3 px-3">Counterparty</th>
                <th className="py-3 px-3">Amount</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Tax Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-stone-50/70 transition">
                  <td className="py-3.5 px-3">
                    <span className="font-mono text-stone-800 font-semibold">{tx.date}</span>
                    <span className="block text-[11px] text-stone-500 font-mono">{tx.id}</span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="font-medium text-stone-900 block">{tx.type}</span>
                    <span className="text-[11px] text-stone-500">{tx.reference}</span>
                  </td>
                  <td className="py-3.5 px-3 font-medium text-stone-800">{tx.beneficiary}</td>
                  <td className="py-3.5 px-3 font-mono font-bold text-stone-900">
                    ₹{tx.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                        tx.status.includes('Released')
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <a
                      href={tx.invoiceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[#D1343A] hover:underline font-semibold"
                    >
                      <Download className="w-3.5 h-3.5" /> GST Invoice
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Escrow Deposit Modal */}
      {escrowDepositModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full border border-stone-200 shadow-2xl p-6">
            <h3 className="text-lg font-bold text-[#0B0F19]">Deposit Escrow Funds</h3>
            <p className="text-xs text-stone-500 mt-1">
              Transfer funds from corporate bank account into WasteMatch RBI-mandated Escrow Pool.
            </p>

            <form onSubmit={handleDeposit} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Deposit Amount (INR)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-sm font-bold text-stone-500">₹</span>
                  <input
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    required
                    min="1000"
                    className="w-full pl-8 pr-4 py-2 border border-stone-300 rounded-xl text-sm font-mono font-bold focus:ring-2 focus:ring-[#D1343A] focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#F8F6F5] border border-stone-200 text-xs space-y-1">
                <div className="flex justify-between text-stone-600">
                  <span>Linked Corporate Account:</span>
                  <span className="font-mono font-semibold">HDFC Bank •• 4091</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Settlement Fee:</span>
                  <span className="font-semibold text-emerald-600">₹0 (Zero Fee)</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEscrowDepositModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-stone-600 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#D1343A] hover:bg-[#A81818] text-white text-xs font-semibold shadow-sm transition"
                >
                  Authorize RTGS / NEFT Deposit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
