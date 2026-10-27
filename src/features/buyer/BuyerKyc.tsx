import React, { useState } from 'react';
import {
  FileCheck2,
  CheckCircle2,
  UploadCloud,
  Building2,
  ShieldCheck,
  FileText,
  AlertTriangle,
} from 'lucide-react';
import { useDashboardStore } from '../../store/dashboardStore';

export const BuyerKyc: React.FC = () => {
  const { buyerProfile } = useDashboardStore();

  const [saved, setSaved] = useState(false);

  const documents = [
    { name: 'SPCB Hazardous Waste Co-Processing Authorization (Rule 6)', status: 'Verified', categories: 'Spent Acid, Alkaline Sludge, Paint Sludge, RDF', authNo: buyerProfile.spcbAuthNo },
    { name: 'CPCB Recycler & Co-Processor Registration Certificate', status: 'Verified', categories: 'Co-Processing in Cement Kiln under Rule 9', authNo: 'CPCB/RECYCLER/AFR/RAJ/2022/09' },
    { name: 'SPCB Air & Water Consent to Operate (CTO)', status: 'Verified', categories: 'Kiln Line 1 & Line 2', authNo: 'RSPCB/CTO/2023/8802' },
    { name: 'Factory License & Industrial Storage Approval', status: 'Verified', categories: 'HazMat Receiving Bay & Sump Tank Farm', authNo: 'FAC/RAJ/312601/109' },
    { name: 'Company GST & PAN Certificates', status: 'Verified', categories: '08AAACA9876H1Z1 / AAACA9876H', authNo: 'Verified' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E2E4DC]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-[#0B0F19]">
              Receiver SPCB Authorizations & Recycler Licenses
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#DCFCE7] text-[#16A34A] border border-[#16A34A]/20">
              Admin Verified
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-0.5">
            Statutory Co-Processing Permitted Waste Categories & CPCB Recycler Registration
          </p>
        </div>
      </div>

      {/* Authorized Waste Categories Box */}
      <div className="p-6 rounded-2xl bg-surface border border-[#E2E4DC] shadow-subtle space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E2E4DC]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#2563EB]" />
            <h3 className="text-sm font-bold text-[#0B0F19]">
              SPCB Permitted Hazardous Waste Categories under Rule 6 & Rule 9
            </h3>
          </div>
          <span className="text-xs font-mono font-bold text-[#16A34A] bg-[#DCFCE7] px-2 py-0.5 rounded">
            Valid till {buyerProfile.spcbValidTill}
          </span>
        </div>

        <p className="text-xs text-[#1E293B] leading-relaxed">
          Admin compliance verification confirms that your State Pollution Control Board authorization covers intake of <strong className="text-[#0B0F19]">Spent Pickle Liquor (Schedule I #26.1)</strong> and <strong className="text-[#0B0F19]">Alkaline Sludges (Schedule I #33.2)</strong> for raw mix substitution and thermal clinker calcination.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {buyerProfile.acceptedCategories.map((cat, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-surface-subtle border border-[#E2E4DC] space-y-1">
              <span className="text-[10px] font-bold text-[#16A34A] uppercase flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Permitted Category
              </span>
              <div className="text-xs font-bold text-[#0B0F19]">{cat}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Uploaded Documents List */}
      <div className="p-6 rounded-2xl bg-surface border border-[#E2E4DC] shadow-subtle space-y-4">
        <h3 className="text-sm font-bold text-[#0B0F19] pb-3 border-b border-[#E2E4DC]">
          Verified Statutory Authorizations on File
        </h3>

        <div className="space-y-3">
          {documents.map((doc, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-[#E2E4DC] bg-surface-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-0.5">
                <div className="font-bold text-[#0B0F19]">{doc.name}</div>
                <div className="text-[#64748B]">Scope: {doc.categories}</div>
                <div className="font-mono text-[11px] text-[#2563EB]">{doc.authNo}</div>
              </div>

              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#DCFCE7] text-[#16A34A] shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{doc.status}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
