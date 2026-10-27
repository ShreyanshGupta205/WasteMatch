import React, { useState } from 'react';
import {
  Truck,
  Printer,
  FileBadge,
  ShieldAlert,
  MapPin,
  CheckCircle2,
  Clock,
  ArrowRight,
  Phone,
  Eye,
  Info,
} from 'lucide-react';
import { useDashboardStore, ShipmentItem } from '../../store/dashboardStore';

export const SellerShipments: React.FC = () => {
  const { shipments, updateShipmentStatus, transportersDirectory } = useDashboardStore();

  const [activeTab, setActiveTab] = useState<'manifest' | 'trem' | 'transporters'>('manifest');
  const [selectedShipment, setSelectedShipment] = useState<ShipmentItem>(shipments[0]);

  const handleStatusChange = (status: ShipmentItem['status']) => {
    updateShipmentStatus(selectedShipment.id, status);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E2E4DC]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-[#0B0F19]">
              Transport Documentation & Form 10 Manifests
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#FDF2F2] text-[#D1343A] border border-[#D1343A]/20">
              Rule 19 CMVR & HW Rules 2016
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-0.5">
            Auto-Filled Digital Form 10 Manifests, TREM Cards & Verified HazMat Transporter Reference Directory
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#D1343A] hover:bg-[#A81818] transition-colors shadow-subtle flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Form 10 Manifest (Copy 1-7)</span>
          </button>
        </div>
      </div>

      {/* Manual Status Updater Bar */}
      <div className="p-5 rounded-2xl bg-surface border border-[#E2E4DC] shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#64748B] uppercase">Shipment Manifest No:</span>
            <span className="font-mono font-bold text-sm text-[#0B0F19]">
              {selectedShipment.manifestForm10No}
            </span>
            <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-[#EFF6FF] text-[#2563EB]">
              Current Status: {selectedShipment.status}
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-1">
            Carrier: <strong className="text-[#1E293B]">{selectedShipment.transporterName}</strong> · Scheduled: {selectedShipment.scheduledDispatchDate}
          </p>
        </div>

        {/* Manual Status Stepper */}
        <div className="flex items-center gap-2">
          {(['Scheduled', 'Picked Up', 'In Transit', 'Delivered'] as const).map((st) => (
            <button
              key={st}
              onClick={() => handleStatusChange(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedShipment.status === st
                  ? 'bg-[#D1343A] text-white shadow-sm'
                  : 'bg-surface-subtle text-[#64748B] hover:text-[#0B0F19] hover:bg-[#E2E4DC]/50'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E2E4DC] pb-1">
        <button
          onClick={() => setActiveTab('manifest')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'manifest'
              ? 'bg-[#1E293B] text-white'
              : 'text-[#64748B] hover:text-[#0B0F19] hover:bg-surface-subtle'
          }`}
        >
          Auto-Filled Form 10 Manifest
        </button>
        <button
          onClick={() => setActiveTab('trem')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'trem'
              ? 'bg-[#1E293B] text-white'
              : 'text-[#64748B] hover:text-[#0B0F19] hover:bg-surface-subtle'
          }`}
        >
          TREM Card (Emergency Response)
        </button>
        <button
          onClick={() => setActiveTab('transporters')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'transporters'
              ? 'bg-[#1E293B] text-white'
              : 'text-[#64748B] hover:text-[#0B0F19] hover:bg-surface-subtle'
          }`}
        >
          Recommended Transporter Directory (Reference)
        </button>
      </div>

      {/* Tab 1: Form 10 Manifest Preview */}
      {activeTab === 'manifest' && (
        <div className="p-6 rounded-2xl bg-white border border-[#E2E4DC] shadow-card space-y-5 text-xs text-[#0B0F19]">
          <div className="text-center pb-4 border-b border-[#E2E4DC] space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#D1343A]">
              CENTRAL POLLUTION CONTROL BOARD · FORM 10 [RULE 19(1)]
            </span>
            <h3 className="text-lg font-bold text-[#0B0F19]">
              MANIFEST FOR HAZARDOUS AND OTHER WASTE MOVEMENT
            </h3>
            <p className="text-[11px] text-[#64748B]">
              Manifest No: <strong className="text-[#0B0F19] font-mono">{selectedShipment.manifestForm10No}</strong> · Generated by Generator (Seller)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3.5 rounded-xl bg-[#F8F6F5] border border-[#E2E4DC] space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                1. SENDER (GENERATOR)
              </span>
              <p className="font-bold text-[#0B0F19]">{selectedShipment.sellerName}</p>
              <p className="text-[#64748B]">Site-4 Industrial Area, Ghaziabad, UP</p>
              <p className="font-mono text-[11px] font-bold text-[#16A34A]">
                Auth: {selectedShipment.manifestData.senderAuthNo}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F8F6F5] border border-[#E2E4DC] space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                2. TRANSPORTER
              </span>
              <p className="font-bold text-[#0B0F19]">{selectedShipment.transporterName}</p>
              <p className="text-[#64748B]">Vehicle Reg: {selectedShipment.manifestData.vehicleRegistrationNo}</p>
              <p className="font-mono text-[11px] font-bold text-[#16A34A]">
                Permit: {selectedShipment.manifestData.transporterPermitNo}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F8F6F5] border border-[#E2E4DC] space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                3. RECEIVER (CO-PROCESSOR)
              </span>
              <p className="font-bold text-[#0B0F19]">{selectedShipment.buyerName}</p>
              <p className="text-[#64748B]">Nimbahera Cement Zone, Rajasthan</p>
              <p className="font-mono text-[11px] font-bold text-[#16A34A]">
                Auth: {selectedShipment.manifestData.receiverAuthNo}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-surface-subtle border border-[#E2E4DC] space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
              4. WASTE STREAM & CONTAINER SPECIFICATION
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
              <div>
                <span className="text-[10px] text-[#64748B] block">Description:</span>
                <span className="font-bold text-[#0B0F19]">{selectedShipment.manifestData.wasteDescription}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#64748B] block">Batch Quantity:</span>
                <span className="font-bold text-[#0B0F19]">{selectedShipment.manifestData.quantityTonnes} Metric Tonnes</span>
              </div>
              <div>
                <span className="text-[10px] text-[#64748B] block">Packaging Form:</span>
                <span className="font-bold text-[#0B0F19]">{selectedShipment.manifestData.packagingType}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#64748B] block">Hazard Class:</span>
                <span className="font-bold text-[#D1343A]">Class 8 Corrosive</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#F8F6F5] text-[11px] text-[#64748B] border border-[#E2E4DC]">
            <strong>7-Copy System:</strong> Copy 1 (White - Sender), Copy 2 (Yellow - State PCB), Copy 3 (Pink - Receiver), Copy 4 (Orange - Transporter), Copy 5 (Green - Receiver PCB), Copy 6 (Blue - Sender Return), Copy 7 (Grey - Escrow Record).
          </div>
        </div>
      )}

      {/* Tab 2: TREM Card Preview */}
      {activeTab === 'trem' && (
        <div className="p-6 rounded-2xl bg-white border border-[#D1343A]/30 shadow-card space-y-5 text-xs text-[#0B0F19]">
          <div className="flex items-center gap-3 pb-3 border-b border-[#E2E4DC]">
            <div className="w-10 h-10 rounded-xl bg-[#FDF2F2] text-[#D1343A] flex items-center justify-center">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#D1343A]">
                TRANSPORT EMERGENCY CARD (TREMCARD) — CENTRAL MOTOR VEHICLES RULES RULE 129
              </span>
              <h3 className="text-base font-bold text-[#0B0F19]">
                Hazard Response Information: {selectedShipment.tremCardData.cargoName} ({selectedShipment.tremCardData.unNumber})
              </h3>
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-[#F8F6F5] border border-[#E2E4DC] space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#D1343A]">
                NATURE OF HAZARD
              </span>
              <p className="text-xs text-[#1E293B]">
                Extremely corrosive acidic liquid (pH &lt; 1.0). Causes severe chemical burns upon skin contact. Generates irritating and toxic hydrogen chloride gas vapor upon exposure to open air. In contact with mild steel or metals, liberates highly flammable hydrogen gas.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F8F6F5] border border-[#E2E4DC] space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#0B0F19]">
                PERSONAL PROTECTIVE EQUIPMENT (PPE) MANDATORY
              </span>
              <p className="text-xs text-[#1E293B]">
                {selectedShipment.tremCardData.ppeRequirement}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F8F6F5] border border-[#E2E4DC] space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#0B0F19]">
                EMERGENCY SPILL CONTAINMENT PROTOCOL
              </span>
              <p className="text-xs text-[#1E293B]">
                {selectedShipment.tremCardData.spillProtocol}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#DCFCE7]/30 border border-[#16A34A]/30 flex items-center justify-between text-xs">
              <span className="font-semibold text-[#0B0F19]">
                National HazChem Emergency Hotline:
              </span>
              <span className="font-mono font-bold text-sm text-[#16A34A]">
                {selectedShipment.tremCardData.emergencyPhone}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Transporter Directory (Reference Only) */}
      {activeTab === 'transporters' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#FFFBEB] border border-[#D97706]/30 flex items-start gap-3">
            <Info className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
            <p className="text-xs text-[#1E293B] leading-relaxed">
              <strong>Reference Data Directory:</strong> WasteMatch does not provide fleet booking or transportation brokerage. Generators select and contract licensed third-party transporters independently from this verified SPCB-authorized list.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {transportersDirectory.map((trans) => (
              <div
                key={trans.id}
                className="p-5 rounded-2xl bg-surface border border-[#E2E4DC] shadow-subtle space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#16A34A] bg-[#DCFCE7] px-2 py-0.5 rounded border border-[#16A34A]/20">
                      {trans.spcbPermitNo}
                    </span>
                    <h4 className="text-sm font-bold text-[#0B0F19] mt-1">
                      {trans.name}
                    </h4>
                    <p className="text-xs text-[#64748B]">Base: {trans.baseCity} · {trans.coverageStates}</p>
                  </div>
                  <span className="font-mono font-bold text-xs text-[#0B0F19] bg-surface-subtle px-2 py-0.5 rounded">
                    ₹{trans.pricePerKm}/km
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-surface-subtle text-xs text-[#1E293B] space-y-1">
                  <span className="text-[10px] text-[#64748B] font-semibold uppercase">Vehicle Specification</span>
                  <p className="font-medium">{trans.vehicleTypes}</p>
                  <p className="text-[11px] text-[#64748B]">Payload Capacity: {trans.capacityTonnes} MT</p>
                </div>

                <div className="p-2.5 rounded-xl bg-[#F8F6F5] border border-[#E2E4DC] flex items-center justify-between text-xs">
                  <span className="text-[#64748B]">Dispatch Desk:</span>
                  <a href={`tel:${trans.contactPhone}`} className="font-mono font-bold text-[#D1343A] hover:underline flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{trans.contactPhone}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
