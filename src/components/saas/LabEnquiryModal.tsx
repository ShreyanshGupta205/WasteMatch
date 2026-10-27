import React, { useState } from 'react';
import {
  X,
  Printer,
  Download,
  FlaskConical,
  CheckCircle2,
  Building2,
  FileBadge,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import { useSaasStore } from '../../store/saasStore';

export const LabEnquiryModal: React.FC = () => {
  const {
    isLabEnquiryModalOpen,
    closeLabEnquiryModal,
    selectedLabForEnquiry,
    facility,
  } = useSaasStore();

  const [turnaroundOption, setTurnaroundOption] = useState<'Standard 48h' | 'Express 24h'>('Express 24h');
  const [selectedParams, setSelectedParams] = useState<string[]>([
    'Lead (Pb) by ICP-OES (EPA 6010D)',
    'Mercury (Hg) by Cold-Vapor AAS (EPA 7470A)',
    'Closed Cup Flash Point (ASTM D93)',
    'Zinc (Zn) Cross-Validation (AAS)',
  ]);
  const [isCopied, setIsCopied] = useState(false);

  if (!isLabEnquiryModalOpen || !selectedLabForEnquiry) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const text = `FORMAL TESTING ENQUIRY & CHAIN OF CUSTODY (CoC)
To: ${selectedLabForEnquiry.name} (${selectedLabForEnquiry.nablRegNo})
From: ${facility.name} (${facility.spcbAuthNo})
Material: Spent Hydrochloric Acid (Pickle Liquor) UN 1789 Class 8
Quantity: 12 MT Batch #SG-2026-08
Targeted Test Scope: ${selectedParams.join(', ')}
Turnaround: ${turnaroundOption}
Indicative Fee: ${selectedLabForEnquiry.indicativePriceRange}`;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  const toggleParam = (param: string) => {
    if (selectedParams.includes(param)) {
      setSelectedParams(selectedParams.filter((p) => p !== param));
    } else {
      setSelectedParams([...selectedParams, param]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0F19]/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-3xl bg-surface rounded-2xl border border-[#E2E4DC] shadow-elevated overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-4 border-b border-[#E2E4DC] flex items-center justify-between bg-surface-subtle/50 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0B0F19]">
                Formal NABL Analytical Testing Enquiry & CoC
              </h3>
              <p className="text-[11px] text-[#64748B]">
                Generated for {selectedLabForEnquiry.name} · {selectedLabForEnquiry.nablRegNo}
              </p>
            </div>
          </div>
          <button
            onClick={closeLabEnquiryModal}
            className="p-1 rounded-lg text-[#64748B] hover:text-[#0B0F19] hover:bg-surface-subtle"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* Printable Formal Document Preview */}
          <div className="p-6 rounded-xl border border-[#E2E4DC] bg-white shadow-subtle space-y-5 text-[#0B0F19]">
            {/* Document Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[#E2E4DC]">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#D1343A] font-bold">
                  FORMAL TESTING REQUISITION · FORM NABL-CoC-2026
                </span>
                <h4 className="text-base font-bold text-[#0B0F19]">
                  Requisition for Targeted Heavy Metals Trace Assay
                </h4>
                <p className="text-[11px] text-[#64748B]">
                  Regulatory Reference: CPCB Co-Processing Guidelines & Schedule I Rule 9
                </p>
              </div>
              <div className="text-right">
                <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#DCFCE7] text-[#16A34A]">
                  Targeted Delta Scope
                </span>
                <div className="text-[10px] text-[#64748B] mt-1 font-mono">
                  Date: 27-Oct-2026
                </div>
              </div>
            </div>

            {/* Two-party details */}
            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-[#E2E4DC]">
              {/* Generator Info */}
              <div className="p-3 rounded-lg bg-[#F8F6F5] border border-[#E2E4DC] space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                  REQUISITIONING GENERATOR
                </span>
                <p className="font-bold text-[#0B0F19]">{facility.name} ({facility.unit})</p>
                <p className="text-[11px] text-[#64748B]">{facility.location}, {facility.city}, {facility.state}</p>
                <p className="text-[11px] text-[#64748B] font-mono">SPCB Auth: {facility.spcbAuthNo}</p>
                <p className="text-[11px] text-[#1E293B]">Contact: {facility.contactPerson} ({facility.role})</p>
              </div>

              {/* Lab Info */}
              <div className="p-3 rounded-lg bg-[#F8F6F5] border border-[#E2E4DC] space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                  ACCREDITED TESTING LABORATORY
                </span>
                <p className="font-bold text-[#0B0F19]">{selectedLabForEnquiry.name}</p>
                <p className="text-[11px] text-[#64748B]">{selectedLabForEnquiry.address}, {selectedLabForEnquiry.city}</p>
                <p className="text-[11px] font-mono font-bold text-[#16A34A]">{selectedLabForEnquiry.nablRegNo}</p>
                <p className="text-[11px] text-[#1E293B]">Email: {selectedLabForEnquiry.email}</p>
              </div>
            </div>

            {/* Sample Information */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                SAMPLE IDENTIFICATION & HAZMAT CHAIN OF CUSTODY
              </span>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-2.5 rounded-lg border border-[#E2E4DC] bg-surface-subtle">
                  <div className="text-[10px] text-[#64748B]">Sample Batch ID</div>
                  <div className="font-mono font-bold text-[#0B0F19]">SG-2026-08/SPL-02</div>
                </div>
                <div className="p-2.5 rounded-lg border border-[#E2E4DC] bg-surface-subtle">
                  <div className="text-[10px] text-[#64748B]">Hazard Classification</div>
                  <div className="font-mono font-bold text-[#D1343A]">UN 1789 · Class 8</div>
                </div>
                <div className="p-2.5 rounded-lg border border-[#E2E4DC] bg-surface-subtle">
                  <div className="text-[10px] text-[#64748B]">Batch Volume</div>
                  <div className="font-mono font-bold text-[#0B0F19]">12.0 Metric Tonnes</div>
                </div>
              </div>
            </div>

            {/* Targeted Testing Checklist */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                  REQUESTED TARGETED PARAMETERS (DELTA ONLY)
                </span>
                <span className="text-[10px] text-[#16A34A] font-semibold">
                  Avoids Full ₹15,000 Panel Re-Test
                </span>
              </div>

              <div className="space-y-1.5">
                {[
                  'Lead (Pb) by ICP-OES (EPA 6010D)',
                  'Mercury (Hg) by Cold-Vapor AAS (EPA 7470A)',
                  'Closed Cup Flash Point (ASTM D93)',
                  'Zinc (Zn) Cross-Validation (AAS)',
                ].map((param) => {
                  const isChecked = selectedParams.includes(param);
                  return (
                    <label
                      key={param}
                      onClick={() => toggleParam(param)}
                      className="flex items-center gap-2 p-2 rounded-lg border border-[#E2E4DC] bg-surface hover:bg-surface-subtle cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="rounded text-[#D1343A] focus:ring-[#D1343A]"
                      />
                      <span className="font-mono text-xs font-medium text-[#1E293B]">
                        {param}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Turnaround Time Options */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                TURNAROUND TIME (TAT) REQUIREMENT
              </span>
              <div className="flex items-center gap-3">
                {(['Express 24h', 'Standard 48h'] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setTurnaroundOption(opt)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      turnaroundOption === opt
                        ? 'bg-[#D1343A] text-white border-[#D1343A]'
                        : 'bg-surface text-[#64748B] border-[#E2E4DC] hover:bg-surface-subtle'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Pricing Summary */}
            <div className="p-3 rounded-lg bg-[#DCFCE7]/30 border border-[#16A34A]/30 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#16A34A] font-bold uppercase">
                  INDICATIVE QUOTED FEE
                </span>
                <p className="text-xs text-[#1E293B]">
                  Targeted package applies directly to Aravali Cement kiln co-processing pre-intake.
                </p>
              </div>
              <div className="text-right">
                <span className="text-base font-mono font-bold text-[#16A34A]">
                  {selectedLabForEnquiry.indicativePriceRange}
                </span>
                <div className="text-[10px] text-[#64748B]">GST 18% as applicable</div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 border-t border-[#E2E4DC] bg-surface-subtle/50 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-[#64748B]">
            Format compliant with ISO/IEC 17025:2017 Chain of Custody standards
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="px-3 py-2 rounded-xl text-xs font-semibold text-[#1E293B] bg-surface hover:bg-surface-subtle border border-[#E2E4DC] transition-colors"
            >
              {isCopied ? 'Copied to Clipboard!' : 'Copy Summary'}
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#D1343A] hover:bg-[#A81818] transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Download Enquiry Document</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
