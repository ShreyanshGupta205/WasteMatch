import React, { useState } from 'react';
import {
  FileBadge,
  CheckCircle2,
  UploadCloud,
  Building2,
  FileText,
  AlertTriangle,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { useDashboardStore } from '../../store/dashboardStore';

export const SellerKyc: React.FC = () => {
  const { currentUser } = useDashboardStore();

  const [businessName, setBusinessName] = useState(currentUser.businessName);
  const [gstin, setGstin] = useState('09AAACS1234F1Z5');
  const [pan, setPan] = useState('AAACS1234F');
  const [address, setAddress] = useState('Site-4 Industrial Area, Sahibabad, Ghaziabad, Uttar Pradesh');
  const [pincode, setPincode] = useState('201010');
  const [signatory, setSignatory] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState('+91 98110 44210');
  const [spcbAuth, setSpcbAuth] = useState(currentUser.spcbAuthNo || 'UPPCB/HW/GZB/2024/7741');
  const [isSaved, setIsSaved] = useState(false);

  const documents = [
    { name: 'GST Registration Certificate', status: 'Verified', fileName: 'GST_09AAACS1234F1Z5.pdf', size: '1.2 MB' },
    { name: 'Company PAN Card', status: 'Verified', fileName: 'PAN_AAACS1234F.pdf', size: '640 KB' },
    { name: 'Factory / Trade License (DIC / Factories Act)', status: 'Verified', fileName: 'Factory_License_Ghaziabad_2024.pdf', size: '2.1 MB' },
    { name: 'SPCB Consent to Operate (CTO)', status: 'Verified', fileName: 'UPPCB_Consent_To_Operate_2024.pdf', size: '3.4 MB' },
    { name: 'SPCB Hazardous Waste Authorization (Rule 6)', status: 'Verified', fileName: 'UPPCB_HW_Auth_7741.pdf', size: '4.1 MB' },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E2E4DC]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-[#0B0F19]">
              Registration & Statutory KYC Verification
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#DCFCE7] text-[#16A34A] border border-[#16A34A]/20">
              Account Status: {currentUser.verificationStatus}
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-0.5">
            Legal Entity Details, GSTIN, PAN & State Pollution Control Board Statutory Consents
          </p>
        </div>
      </div>

      {isSaved && (
        <div className="p-4 rounded-xl bg-[#DCFCE7] border border-[#16A34A]/30 text-xs font-bold text-[#16A34A] flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          <span>Profile updates saved. KYC details submitted for Admin review.</span>
        </div>
      )}

      {/* KYC Form */}
      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Form Fields */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-surface border border-[#E2E4DC] shadow-subtle space-y-4">
          <h3 className="text-sm font-bold text-[#0B0F19] flex items-center gap-2 pb-3 border-b border-[#E2E4DC]">
            <Building2 className="w-4 h-4 text-[#D1343A]" />
            <span>Manufacturing Facility & Authorized Signatory Details</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#0B0F19]">Business Legal Name</label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full px-3.5 py-2 text-xs font-semibold text-[#0B0F19] bg-surface-subtle border border-[#E2E4DC] rounded-xl focus:outline-none focus:border-[#D1343A]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#0B0F19]">Authorized Signatory Name</label>
              <input
                type="text"
                value={signatory}
                onChange={(e) => setSignatory(e.target.value)}
                className="w-full px-3.5 py-2 text-xs font-semibold text-[#0B0F19] bg-surface-subtle border border-[#E2E4DC] rounded-xl focus:outline-none focus:border-[#D1343A]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#0B0F19]">GSTIN (15-digit)</label>
              <input
                type="text"
                value={gstin}
                onChange={(e) => setGstin(e.target.value)}
                className="w-full px-3.5 py-2 text-xs font-mono font-bold text-[#0B0F19] bg-surface-subtle border border-[#E2E4DC] rounded-xl focus:outline-none focus:border-[#D1343A]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#0B0F19]">Company PAN (10-digit)</label>
              <input
                type="text"
                value={pan}
                onChange={(e) => setPan(e.target.value)}
                className="w-full px-3.5 py-2 text-xs font-mono font-bold text-[#0B0F19] bg-surface-subtle border border-[#E2E4DC] rounded-xl focus:outline-none focus:border-[#D1343A]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#0B0F19]">Factory Premises Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3.5 py-2 text-xs text-[#0B0F19] bg-surface-subtle border border-[#E2E4DC] rounded-xl focus:outline-none focus:border-[#D1343A]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#0B0F19]">Factory Pincode</label>
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full px-3.5 py-2 text-xs font-mono font-bold text-[#0B0F19] bg-surface-subtle border border-[#E2E4DC] rounded-xl focus:outline-none focus:border-[#D1343A]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#0B0F19]">Official Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2 text-xs text-[#0B0F19] bg-surface-subtle border border-[#E2E4DC] rounded-xl focus:outline-none focus:border-[#D1343A]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#0B0F19]">Contact Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2 text-xs font-mono text-[#0B0F19] bg-surface-subtle border border-[#E2E4DC] rounded-xl focus:outline-none focus:border-[#D1343A]"
              />
            </div>
          </div>

          <div className="space-y-1 pt-2">
            <label className="text-xs font-bold text-[#0B0F19]">SPCB Hazardous Waste Authorization Number</label>
            <input
              type="text"
              value={spcbAuth}
              onChange={(e) => setSpcbAuth(e.target.value)}
              className="w-full px-3.5 py-2 text-xs font-mono font-bold text-[#16A34A] bg-surface-subtle border border-[#E2E4DC] rounded-xl focus:outline-none focus:border-[#D1343A]"
            />
          </div>

          <div className="pt-3">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#D1343A] hover:bg-[#A81818] transition-all shadow-sm cursor-pointer"
            >
              Update Registration & KYC
            </button>
          </div>
        </div>

        {/* Right Column: Uploaded Documents Verification Status */}
        <div className="p-6 rounded-2xl bg-surface border border-[#E2E4DC] shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E4DC]">
            <h3 className="text-sm font-bold text-[#0B0F19]">
              Uploaded Statutory Documents
            </h3>
            <span className="text-[10px] font-bold text-[#16A34A] bg-[#DCFCE7] px-2 py-0.5 rounded">
              5/5 Verified
            </span>
          </div>

          <div className="space-y-3">
            {documents.map((doc, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl border border-[#E2E4DC] bg-surface-subtle space-y-1"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#0B0F19]">{doc.name}</span>
                  <span className="text-[10px] font-bold text-[#16A34A] flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {doc.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#64748B]">
                  <span className="truncate">{doc.fileName}</span>
                  <span className="font-mono">{doc.size}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl border border-dashed border-[#E2E4DC] bg-surface text-center cursor-pointer hover:border-[#D1343A] transition-colors">
            <UploadCloud className="w-5 h-5 text-[#D1343A] mx-auto mb-1" />
            <span className="text-xs font-semibold text-[#1E293B]">
              Upload Updated SPCB Consent or Renewed Authorization
            </span>
            <p className="text-[10px] text-[#64748B]">PDF up to 15 MB</p>
          </div>
        </div>
      </form>
    </div>
  );
};
