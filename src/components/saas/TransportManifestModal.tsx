import React, { useState } from 'react';
import {
  X,
  Printer,
  FileText,
  Truck,
  CheckCircle2,
  ShieldAlert,
  Building2,
  Calendar,
  AlertTriangle,
  FileBadge,
} from 'lucide-react';
import { useSaasStore } from '../../store/saasStore';

export const TransportManifestModal: React.FC = () => {
  const {
    isTransportEnquiryModalOpen,
    closeTransportEnquiryModal,
    selectedCarrierForManifest,
    facility,
  } = useSaasStore();

  const [manifestNo, setManifestNo] = useState('FORM9-UP-2026-9042');
  const [vehicleRegNo, setVehicleRegNo] = useState('UP14-BT-8902');
  const [dispatchDate, setDispatchDate] = useState('28-Oct-2026');

  if (!isTransportEnquiryModalOpen || !selectedCarrierForManifest) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0F19]/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-3xl bg-surface rounded-2xl border border-[#E2E4DC] shadow-elevated overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-4 border-b border-[#E2E4DC] flex items-center justify-between bg-surface-subtle/50 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#FDF2F2] text-[#D1343A] flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0B0F19]">
                FORM 9 HazMat Road Manifest & TREMCARD Instructions
              </h3>
              <p className="text-[11px] text-[#64748B]">
                Statutory Manifest under Hazardous and Other Wastes Rules 2016 (Rule 19)
              </p>
            </div>
          </div>
          <button
            onClick={closeTransportEnquiryModal}
            className="p-1 rounded-lg text-[#64748B] hover:text-[#0B0F19] hover:bg-surface-subtle"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* Printable Manifest Preview */}
          <div className="p-6 rounded-xl border border-[#E2E4DC] bg-white shadow-subtle space-y-5 text-[#0B0F19]">
            {/* Header Title */}
            <div className="text-center pb-4 border-b border-[#E2E4DC] space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#D1343A]">
                CENTRAL POLLUTION CONTROL BOARD · FORM 9 [RULE 19(1)]
              </span>
              <h4 className="text-base font-bold text-[#0B0F19]">
                HAZARDOUS WASTE MOVEMENT DOCUMENT (MANIFEST)
              </h4>
              <p className="text-[11px] text-[#64748B]">
                Manifest Reference No: <span className="font-mono font-bold text-[#0B0F19]">{manifestNo}</span> · Emergency Response Code: <span className="font-mono font-bold text-[#D1343A]">UN 1789 (Class 8)</span>
              </p>
            </div>

            {/* 7-Copy Color Coded System Banner */}
            <div className="p-3 rounded-lg bg-surface-subtle border border-[#E2E4DC] space-y-1.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                7-COPY STATUTORY COLOR-CODED MANIFEST SYSTEM
              </div>
              <div className="grid grid-cols-7 gap-1 text-center font-mono text-[9px] font-bold">
                <div className="p-1.5 rounded bg-white text-gray-800 border border-[#E2E4DC]">Copy 1: White (Sender)</div>
                <div className="p-1.5 rounded bg-yellow-100 text-yellow-800 border border-yellow-200">Copy 2: Yellow (SPCB)</div>
                <div className="p-1.5 rounded bg-pink-100 text-pink-800 border border-pink-200">Copy 3: Pink (Receiver)</div>
                <div className="p-1.5 rounded bg-orange-100 text-orange-800 border border-orange-200">Copy 4: Orange (Transporter)</div>
                <div className="p-1.5 rounded bg-green-100 text-green-800 border border-green-200">Copy 5: Green (SPCB Rec)</div>
                <div className="p-1.5 rounded bg-blue-100 text-blue-800 border border-blue-200">Copy 6: Blue (Sender Ret)</div>
                <div className="p-1.5 rounded bg-gray-200 text-gray-800 border border-gray-300">Copy 7: Grey (Escrow)</div>
              </div>
            </div>

            {/* Tri-Party Signatures & Manifest Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Box 1: Sender / Generator */}
              <div className="p-3 rounded-lg border border-[#E2E4DC] bg-[#F8F6F5] space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                  1. SENDER / GENERATOR
                </span>
                <p className="font-bold text-[#0B0F19]">{facility.name}</p>
                <p className="text-[11px] text-[#64748B]">{facility.location}, {facility.city}</p>
                <p className="text-[10px] font-mono text-[#64748B]">Auth: {facility.spcbAuthNo}</p>
                <p className="text-[10px] text-[#1E293B]">Rep: {facility.contactPerson}</p>
              </div>

              {/* Box 2: Transporter */}
              <div className="p-3 rounded-lg border border-[#E2E4DC] bg-[#F8F6F5] space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                  2. AUTHORIZED TRANSPORTER
                </span>
                <p className="font-bold text-[#0B0F19]">{selectedCarrierForManifest.name}</p>
                <p className="text-[11px] text-[#64748B]">{selectedCarrierForManifest.vehicleType}</p>
                <p className="text-[10px] font-mono text-[#16A34A]">{selectedCarrierForManifest.authorizationNumber}</p>
                <p className="text-[10px] font-mono text-[#1E293B]">Vehicle: {vehicleRegNo}</p>
              </div>

              {/* Box 3: Receiver */}
              <div className="p-3 rounded-lg border border-[#E2E4DC] bg-[#F8F6F5] space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                  3. RECEIVER / CO-PROCESSOR
                </span>
                <p className="font-bold text-[#0B0F19]">Aravali Cement Works Kiln</p>
                <p className="text-[11px] text-[#64748B]">Nimbahera, Chittorgarh, Rajasthan</p>
                <p className="text-[10px] font-mono text-[#16A34A]">Auth: RSPCB/HW/AFR/2023/11</p>
                <p className="text-[10px] text-[#1E293B]">Intake Gate #4 (AFR Manifold)</p>
              </div>
            </div>

            {/* Waste Description */}
            <div className="p-3 rounded-lg border border-[#E2E4DC] bg-surface-subtle space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                WASTE STREAM DESCRIPTION & CONTAINMENT SPECIFICATION
              </span>
              <div className="grid grid-cols-4 gap-2 font-mono text-[11px]">
                <div>
                  <span className="text-[10px] text-[#64748B] block">Description:</span>
                  <span className="font-bold text-[#0B0F19]">Spent Hydrochloric Acid</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#64748B] block">Schedule I Category:</span>
                  <span className="font-bold text-[#0B0F19]">Cat #26.1</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#64748B] block">Quantity:</span>
                  <span className="font-bold text-[#0B0F19]">12.0 MT (Liquid)</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#64748B] block">Container:</span>
                  <span className="font-bold text-[#16A34A]">Rubber-Lined Tanker</span>
                </div>
              </div>
            </div>

            {/* TREMCARD Emergency Instructions */}
            <div className="p-4 rounded-xl border border-[#D1343A]/30 bg-[#FDF2F2]/40 space-y-2">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-[#D1343A]" />
                <h5 className="text-xs font-bold text-[#0B0F19]">
                  TREMCARD (Transport Emergency Card) Instructions — UN 1789
                </h5>
              </div>
              <ul className="text-[11px] text-[#1E293B] space-y-1 list-disc list-inside">
                <li><strong>Spill Response:</strong> In case of leak, isolate hazard area for 50 meters. Neutralize with dry sodium carbonate slurry or agricultural lime. Avoid washing into storm drains.</li>
                <li><strong>Personal Protection:</strong> Wear full acid-resistant rubber suit, neoprene gloves, face shield, and chemical vapor respirator.</li>
                <li><strong>Fire Protocol:</strong> Non-flammable liquid. If container is heated in fire, use water spray to cool tank exterior. Do NOT spray water into breach.</li>
                <li><strong>Emergency Hotline:</strong> National HazChem Emergency Toll-Free: 1800-180-1111 / Fire: 101.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#E2E4DC] bg-surface-subtle/50 flex items-center justify-between shrink-0">
          <div className="text-xs text-[#64748B]">
            Compliant with Form 9 Central Motor Vehicles Rules (CMVR) Rule 139
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={closeTransportEnquiryModal}
              className="px-3 py-2 text-xs font-semibold text-[#64748B] hover:text-[#0B0F19]"
            >
              Close
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#D1343A] hover:bg-[#A81818] transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Statutory Form 9 (7 Copies)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
