import React, { useState } from 'react';
import {
  X,
  FlaskConical,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Clock,
  Tag,
  Star,
  ExternalLink,
  UploadCloud,
  CheckCircle2,
  Info,
} from 'lucide-react';
import { useDashboardStore } from '../../store/dashboardStore';

export const SellerLabReferralModal: React.FC = () => {
  const {
    isLabReferralModalOpen,
    closeLabReferralModal,
    selectedStreamForLabReferral,
    labsDirectory,
    uploadLabReport,
  } = useDashboardStore();

  const [simulatedUploading, setSimulatedUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  if (!isLabReferralModalOpen) return null;

  const handleSimulateLabReportUpload = () => {
    if (!selectedStreamForLabReferral) return;
    setSimulatedUploading(true);
    setTimeout(() => {
      uploadLabReport(selectedStreamForLabReferral.id);
      setSimulatedUploading(false);
      setSuccessMsg(true);
      setTimeout(() => {
        setSuccessMsg(false);
        closeLabReferralModal();
      }, 2500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0F19]/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-4xl bg-surface rounded-2xl border border-[#E2E4DC] shadow-elevated overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-5 border-b border-[#E2E4DC] flex items-center justify-between bg-gradient-to-r from-[#FFFBEB] via-surface to-[#FDF2F2] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D97706] text-white flex items-center justify-center shadow-sm">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[#0B0F19]">
                  Partner NABL Labs Near Me
                </h3>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#FEF3C7] text-[#D97706] border border-[#D97706]/30">
                  PIN {selectedStreamForLabReferral?.pincode || '201010'} · Reference Directory
                </span>
              </div>
              <p className="text-xs text-[#64748B] mt-0.5">
                Target Stream: <strong className="text-[#0B0F19]">{selectedStreamForLabReferral?.name}</strong> (Chemical Characterization Needed)
              </p>
            </div>
          </div>
          <button
            onClick={closeLabReferralModal}
            className="p-1 rounded-lg text-[#64748B] hover:text-[#0B0F19] hover:bg-surface-subtle"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Important Regulatory Notice */}
          <div className="p-4 rounded-xl bg-[#FFFBEB] border border-[#D97706]/30 flex items-start gap-3">
            <Info className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
            <div className="text-xs text-[#1E293B] space-y-1 leading-relaxed">
              <span className="font-bold text-[#D97706] uppercase tracking-wider text-[11px] block">
                Independent Lab Referral Policy (MVP Scope)
              </span>
              <p>
                WasteMatch is an optimization platform and does not physically transport samples or collect testing fees. Below is a curated reference directory of <strong className="text-[#0B0F19]">NABL-accredited chemical testing laboratories</strong> located near your factory pincode. You may contact them directly, arrange sample dispatch, and obtain an official testing report.
              </p>
            </div>
          </div>

          {/* Upload Success Alert */}
          {successMsg && (
            <div className="p-4 rounded-xl bg-[#DCFCE7] border border-[#16A34A]/30 text-xs text-[#16A34A] font-bold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>Official Lab Report uploaded! AI chemical fingerprint reprocessed to High confidence.</span>
            </div>
          )}

          {/* Directory of Labs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
              Accredited Testing Laboratories in Your Corridor
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {labsDirectory.map((lab) => (
                <div
                  key={lab.id}
                  className="p-5 rounded-2xl bg-surface border border-[#E2E4DC] hover:border-[#D1343A]/40 transition-all shadow-subtle flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-[#16A34A] bg-[#DCFCE7] px-2 py-0.5 rounded border border-[#16A34A]/20">
                          {lab.nablRegNo}
                        </span>
                        <h5 className="text-sm font-bold text-[#0B0F19] mt-1.5 leading-snug">
                          {lab.name}
                        </h5>
                      </div>
                      <div className="flex items-center gap-1 text-xs font-bold text-[#1E293B] bg-surface-subtle px-2 py-0.5 rounded">
                        <Star className="w-3.5 h-3.5 fill-[#D97706] text-[#D97706]" />
                        <span>{lab.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                      <MapPin className="w-3.5 h-3.5 text-[#64748B] shrink-0" />
                      <span>{lab.address}, {lab.city}</span>
                      <span className="font-mono text-[#0B0F19] font-semibold">({lab.distanceKm} km away)</span>
                    </div>

                    <div className="p-3 rounded-xl bg-surface-subtle border border-[#E2E4DC] space-y-1 text-xs">
                      <div className="text-[10px] font-bold text-[#64748B] uppercase">Test Types Offered:</div>
                      <p className="text-[11px] text-[#1E293B] font-medium leading-relaxed">
                        {lab.testTypes}
                      </p>
                    </div>
                  </div>

                  {/* Contact Info & Indicative Pricing */}
                  <div className="pt-3 border-t border-[#E2E4DC] space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[10px] text-[#64748B]">Indicative Pricing</span>
                        <div className="font-mono font-bold text-[#16A34A] text-sm">
                          {lab.indicativePricing}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-[#64748B]">Turnaround</span>
                        <div className="text-xs font-semibold text-[#1E293B]">
                          {lab.turnaroundDays} Business Days
                        </div>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#F8F6F5] border border-[#E2E4DC] flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-[#0B0F19] font-mono font-bold">
                        <Phone className="w-3.5 h-3.5 text-[#D1343A]" />
                        <span>{lab.contactPhone}</span>
                      </div>
                      <a
                        href={`tel:${lab.contactPhone}`}
                        className="text-[11px] font-bold text-[#D1343A] hover:underline flex items-center gap-1"
                      >
                        <span>Call Lab</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* After Obtaining Report: Upload Section */}
          <div className="p-5 rounded-2xl bg-surface border border-[#E2E4DC] space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B0F19] flex items-center gap-1.5">
              <UploadCloud className="w-4 h-4 text-[#D1343A]" />
              <span>Step 2: Upload Lab Report to Re-Verify AI Fingerprint</span>
            </h4>
            <p className="text-xs text-[#64748B]">
              Once you have received your certified assay PDF from the lab, upload it below. WasteMatch will extract verified parameters and elevate the stream confidence score to <strong className="text-[#16A34A]">High</strong>.
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={handleSimulateLabReportUpload}
                disabled={simulatedUploading}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#D1343A] hover:bg-[#A81818] transition-all shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <UploadCloud className="w-4 h-4" />
                <span>{simulatedUploading ? 'Extracting Lab Assay...' : 'Upload Certified Lab Report (PDF)'}</span>
              </button>
              <span className="text-xs text-[#64748B]">Accepts NABL certified PDF reports up to 10 MB</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#E2E4DC] bg-surface-subtle/50 flex items-center justify-between shrink-0">
          <span className="text-xs text-[#64748B]">
            NABL Accreditation ISO/IEC 17025:2017 Cross-Referenced Directory
          </span>
          <button
            onClick={closeLabReferralModal}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-[#1E293B] bg-surface border border-[#E2E4DC] hover:bg-surface-subtle"
          >
            Close Directory
          </button>
        </div>
      </div>
    </div>
  );
};
