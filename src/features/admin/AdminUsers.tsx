import React, { useState } from 'react';
import {
  Users,
  CheckCircle2,
  XCircle,
  FileText,
  Search,
  Filter,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Building,
} from 'lucide-react';
import { useDashboardStore, AdminUserRecord } from '../../store/dashboardStore';

export const AdminUsers: React.FC = () => {
  const { adminUsers, verifyUserAccount } = useDashboardStore();
  const [filterRole, setFilterRole] = useState<'all' | 'seller' | 'buyer'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'Pending' | 'Verified' | 'Suspended'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<AdminUserRecord | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const filteredUsers = adminUsers.filter((u) => {
    if (filterRole !== 'all' && u.role !== filterRole) return false;
    if (filterStatus !== 'all' && u.verificationStatus !== filterStatus) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        u.businessName.toLowerCase().includes(q) ||
        u.gstin.toLowerCase().includes(q) ||
        u.spcbAuthNo.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleApprove = (userId: string) => {
    verifyUserAccount(userId, 'Verified');
    if (selectedUser?.id === userId) {
      setSelectedUser({ ...selectedUser, verificationStatus: 'Verified' });
    }
    showNotification('Account verified successfully. Trading permissions unlocked.');
  };

  const handleReject = () => {
    if (!selectedUser) return;
    verifyUserAccount(selectedUser.id, 'Suspended', rejectionReason);
    setIsRejectModalOpen(false);
    showNotification(`Account marked Suspended. Reason transmitted: "${rejectionReason || 'Non-compliant documents'}"`);
    setRejectionReason('');
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
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
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              KYC & Statutory Verification Console
            </span>
            <span className="text-xs text-stone-500">Hazardous Waste Rule 6 Authorization Verifier</span>
          </div>
          <h1 className="text-2xl font-bold text-[#0B0F19]">User Directory & Compliance Scrutiny</h1>
          <p className="text-sm text-stone-600 mt-1">
            Review GST certificates, PAN cards, factory licenses, and SPCB Hazardous Waste authorizations before unlocking platform matching.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#E2E4DC] rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search business, GSTIN, or SPCB..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-[#D1343A] focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value as any)}
            className="px-3 py-2 border border-stone-200 rounded-xl text-xs bg-white text-stone-700 focus:outline-none"
          >
            <option value="all">All Roles (Generators & Buyers)</option>
            <option value="seller">Sellers / Generators</option>
            <option value="buyer">Buyers / Receivers</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-3 py-2 border border-stone-200 rounded-xl text-xs bg-white text-stone-700 focus:outline-none"
          >
            <option value="all">All Verification Statuses</option>
            <option value="Pending">Pending Scrutiny</option>
            <option value="Verified">Verified & Active</option>
            <option value="Suspended">Suspended / Rejected</option>
          </select>
        </div>
      </div>

      {/* User Table & Inspection Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User List */}
        <div className="lg:col-span-2 bg-white border border-[#E2E4DC] rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-stone-200 flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#0B0F19]">Registered Entities ({filteredUsers.length})</h2>
            <span className="text-xs text-stone-500">Click a record to inspect documents</span>
          </div>

          <div className="divide-y divide-stone-100">
            {filteredUsers.map((u) => (
              <div
                key={u.id}
                onClick={() => setSelectedUser(u)}
                className={`p-4 cursor-pointer transition flex items-center justify-between ${
                  selectedUser?.id === u.id ? 'bg-red-50/40 border-l-4 border-[#D1343A]' : 'hover:bg-stone-50'
                }`}
              >
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
                  <div className="text-xs text-stone-500 mt-1 space-x-2">
                    <span>GSTIN: <strong className="font-mono text-stone-700">{u.gstin}</strong></span>
                    <span>•</span>
                    <span>SPCB: <strong className="font-mono text-stone-700">{u.spcbAuthNo}</strong></span>
                  </div>
                  <div className="text-[11px] text-stone-400 mt-0.5">
                    Location: {u.city}, {u.state} | Authorized: {u.authorizedCategories}
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      u.verificationStatus === 'Verified'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : u.verificationStatus === 'Pending'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}
                  >
                    {u.verificationStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Dossier Inspection Panel */}
        <div className="bg-white border border-[#E2E4DC] rounded-2xl p-6 shadow-sm">
          {selectedUser ? (
            <div className="space-y-5">
              <div className="pb-4 border-b border-stone-200">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-stone-100 text-stone-600 font-semibold">
                  Entity Dossier #{selectedUser.id}
                </span>
                <h3 className="text-base font-bold text-[#0B0F19] mt-2">{selectedUser.businessName}</h3>
                <p className="text-xs text-stone-500">{selectedUser.city}, {selectedUser.state}</p>
              </div>

              {/* Statutory Credentials */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">GSTIN</span>
                  <span className="font-mono font-semibold text-stone-900">{selectedUser.gstin}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">PAN</span>
                  <span className="font-mono font-semibold text-stone-900">{selectedUser.pan}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">SPCB Permit</span>
                  <span className="font-mono font-semibold text-stone-900">{selectedUser.spcbAuthNo}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">Authorization Expiry</span>
                  <span className="font-mono font-semibold text-stone-900">{selectedUser.validTill}</span>
                </div>
              </div>

              {/* Attached Legal Documents */}
              <div>
                <h4 className="text-xs font-bold text-stone-700 mb-2">Attached Statutory Documents</h4>
                <div className="space-y-2">
                  {selectedUser.documents.map((doc, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl border border-stone-200 bg-[#F8F6F5] flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#D1343A]" />
                        <span className="font-medium text-stone-900">{doc.name}</span>
                      </div>
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#D1343A] hover:underline font-semibold flex items-center gap-1"
                      >
                        Inspect <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Admin Actions */}
              <div className="pt-4 border-t border-stone-200 space-y-2">
                {selectedUser.verificationStatus !== 'Verified' && (
                  <button
                    onClick={() => handleApprove(selectedUser.id)}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm flex items-center justify-center gap-2 transition"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Approve & Verify Account
                  </button>
                )}
                {selectedUser.verificationStatus !== 'Suspended' && (
                  <button
                    onClick={() => setIsRejectModalOpen(true)}
                    className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs shadow-sm flex items-center justify-center gap-2 transition"
                  >
                    <XCircle className="w-4 h-4" /> Reject / Suspend with Reason
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-stone-400 text-xs">
              Select a seller or buyer from the list to scrutinize KYC documents.
            </div>
          )}
        </div>
      </div>

      {/* Reject Reason Modal */}
      {isRejectModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full border border-stone-200 shadow-2xl p-6">
            <h3 className="text-lg font-bold text-[#0B0F19]">Reject Account Verification</h3>
            <p className="text-xs text-stone-500 mt-1">
              Please enter the regulatory compliance reason for rejecting or suspending {selectedUser.businessName}.
            </p>

            <div className="mt-4">
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Rejection Reason (Transmitted to Entity)
              </label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="e.g. SPCB Hazardous Waste Authorization has expired, or schedule category mismatch with CTO..."
                rows={4}
                className="w-full p-3 border border-stone-300 rounded-xl text-xs focus:ring-2 focus:ring-[#D1343A] focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-4">
              <button
                onClick={() => setIsRejectModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs text-stone-600 hover:bg-stone-100"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-sm transition"
              >
                Confirm Account Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
