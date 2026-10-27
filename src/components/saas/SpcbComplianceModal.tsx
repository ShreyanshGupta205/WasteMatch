import React from 'react';
import {
  X,
  ShieldCheck,
  Building2,
  FileBadge,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Calendar,
  MapPin,
  User,
} from 'lucide-react';
import { useSaasStore } from '../../store/saasStore';

export const SpcbComplianceModal: React.FC = () => {
  const { isSpcbModalOpen, closeSpcbModal, facility } = useSaasStore();

  if (!isSpcbModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0F19]/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-surface rounded-2xl border border-[#E2E4DC] shadow-elevated overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-[#E2E4DC] flex items-center justify-between bg-surface-subtle/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#DCFCE7] border border-[#16A34A]/30 flex items-center justify-center text-[#16A34A]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[#0B0F19]">
                  SPCB Regulatory Compliance Scorecard
                </h3>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#DCFCE7] text-[#16A34A] border border-[#16A34A]/20">
                  95% A-Grade
                </span>
              </div>
              <p className="text-xs text-[#64748B]">
                State Pollution Control Board Statutory Health & HazMat Authorization
              </p>
            </div>
          </div>
          <button
            onClick={closeSpcbModal}
            className="p-1 rounded-lg text-[#64748B] hover:text-[#0B0F19] hover:bg-surface-subtle"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Facility Info Card */}
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          <div className="p-4 rounded-xl bg-surface-subtle/70 border border-[#E2E4DC] space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                  OPERATING FACILITY
                </span>
                <h4 className="text-sm font-bold text-[#0B0F19]">
                  {facility.name} ({facility.unit})
                </h4>
                <div className="flex items-center gap-1.5 text-xs text-[#64748B] mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#64748B]" />
                  <span>{facility.location}, {facility.city}, {facility.state} - {facility.pin}</span>
                </div>
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold bg-[#DCFCE7] text-[#16A34A]">
                Active
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#E2E4DC]">
              <div>
                <span className="text-[10px] text-[#64748B]">SPCB Authorization No.</span>
                <p className="text-xs font-mono font-bold text-[#0B0F19]">
                  {facility.spcbAuthNo}
                </p>
              </div>
              <div>
                <span className="text-[10px] text-[#64748B]">Authorization Validity</span>
                <p className="text-xs font-mono font-bold text-[#16A34A]">
                  {facility.spcbValidity}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#E2E4DC]">
              <div>
                <span className="text-[10px] text-[#64748B]">Compliance Lead</span>
                <p className="text-xs font-semibold text-[#1E293B]">
                  {facility.contactPerson}
                </p>
                <p className="text-[10px] text-[#64748B]">{facility.role}</p>
              </div>
              <div>
                <span className="text-[10px] text-[#64748B]">Authorized HazCat Schedule</span>
                <p className="text-xs font-semibold text-[#1E293B]">
                  Schedule I, Cat #26.1
                </p>
                <p className="text-[10px] text-[#64748B]">Spent Pickle Liquor (12 MT/mo)</p>
              </div>
            </div>
          </div>

          {/* Compliance Breakdown Table */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
              Statutory Compliance Breakdown
            </div>

            <div className="space-y-2">
              {[
                {
                  label: 'Hazardous Waste Authorization (Rule 6)',
                  score: '100%',
                  status: 'Valid through 2027',
                  pass: true,
                },
                {
                  label: 'On-site Storage & Secondary Catchment (Rule 8)',
                  score: '100%',
                  status: 'EPDM lined vat with sump basin verified',
                  pass: true,
                },
                {
                  label: 'Manifest Filing & Form 9 Records (Rule 19)',
                  score: '95%',
                  status: 'All Q2 2026 manifests matched with SPCB copies',
                  pass: true,
                },
                {
                  label: 'Elemental Heavy Metals NABL Certification',
                  score: '85%',
                  status: 'Lead (Pb) & Mercury (Hg) delta assay pending',
                  pass: false,
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl border border-[#E2E4DC] bg-surface"
                >
                  <div className="flex items-center gap-2.5">
                    {item.pass ? (
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-[#D97706] shrink-0" />
                    )}
                    <div>
                      <div className="text-xs font-bold text-[#0B0F19]">
                        {item.label}
                      </div>
                      <div className="text-[11px] text-[#64748B]">
                        {item.status}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                      item.pass
                        ? 'bg-[#DCFCE7] text-[#16A34A]'
                        : 'bg-[#FEF3C7] text-[#D97706]'
                    }`}
                  >
                    {item.score}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E2E4DC] bg-surface-subtle/50 flex items-center justify-between">
          <div className="text-xs text-[#64748B]">
            Last verified via UPPCB Portal sync: 27-Oct-2026
          </div>
          <button
            onClick={closeSpcbModal}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-[#1E293B] text-white hover:bg-[#0B0F19] transition-colors"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};
