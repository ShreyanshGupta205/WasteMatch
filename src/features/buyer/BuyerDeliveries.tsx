import React, { useState } from 'react';
import {
  Truck,
  CheckCircle2,
  XCircle,
  FileCheck,
  AlertTriangle,
  FileText,
  Download,
  UploadCloud,
  ShieldCheck,
  Clock,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { useDashboardStore } from '../../store/dashboardStore';

export const BuyerDeliveries: React.FC = () => {
  const {
    shipments,
    markDeliveryReceived,
    performQcCheck,
    issueDiversionCertificate,
  } = useDashboardStore();

  const [selectedShipmentId, setSelectedShipmentId] = useState<string>('ship-01');
  const [qcNotes, setQcNotes] = useState('');
  const [qcModalOpen, setQcModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const activeShipment = shipments.find((s) => s.id === selectedShipmentId) || shipments[0];

  const showNotification = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4500);
  };

  const handleMarkReceived = (shipmentId: string) => {
    markDeliveryReceived(shipmentId);
    showNotification('Shipment marked as Received. Signed Form 10 (Copy 4) proof of receipt generated.');
  };

  const handleQcSubmit = (result: 'Passed' | 'Failed') => {
    if (!activeShipment) return;
    performQcCheck(activeShipment.id, result, qcNotes || undefined);
    setQcModalOpen(false);
    if (result === 'Passed') {
      showNotification('QC Inspection Passed! Escrow of ₹' + activeShipment.escrowAmountInr.toLocaleString('en-IN') + ' released to seller.');
    } else {
      showNotification('QC Failed! Dispute opened. Escrow funds held and flagged for admin resolution.');
    }
  };

  const handleIssueCertificate = (shipmentId: string) => {
    issueDiversionCertificate(shipmentId);
    showNotification('CPCB/SPCB Statutory Diversion Certificate issued and transmitted to generator.');
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div className="bg-[#0B0F19] text-white px-5 py-3.5 rounded-xl border border-emerald-500/40 shadow-xl flex items-center justify-between text-sm animate-in fade-in slide-in-from-top-2">
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
              India Form 10 Copy 4 Quality Gate
            </span>
            <span className="text-xs text-stone-500">Hazardous Waste (Management) Rules 2016</span>
          </div>
          <h1 className="text-2xl font-bold text-[#0B0F19]">Inbound Deliveries & Receiver Gate QC</h1>
          <p className="text-sm text-stone-600 mt-1">
            Verify transporter manifests, receive consignments, perform quality gate chemical assay, and release escrow settlement.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-[#F8F6F5] border border-[#E2E4DC] rounded-xl px-4 py-2.5 text-right">
            <div className="text-xs text-stone-500">Active Shipments</div>
            <div className="text-xl font-bold font-mono text-[#0B0F19]">{shipments.length} Active</div>
          </div>
        </div>
      </div>

      {/* 5-Step Inbound Gate Stepper */}
      <div className="bg-white border border-[#E2E4DC] rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between text-xs font-semibold text-stone-500 overflow-x-auto pb-1 gap-3">
          <div className="flex items-center gap-2 shrink-0 text-emerald-700">
            <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center font-bold font-mono text-xs">1</span>
            <span>Form 10 Manifest Issued</span>
          </div>
          <ChevronRight className="w-4 h-4 text-stone-300 shrink-0" />
          <div className="flex items-center gap-2 shrink-0 text-blue-700">
            <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center font-bold font-mono text-xs">2</span>
            <span>HazChem In Transit</span>
          </div>
          <ChevronRight className="w-4 h-4 text-stone-300 shrink-0" />
          <div className={`flex items-center gap-2 shrink-0 ${activeShipment?.status === 'Delivered' ? 'text-emerald-700 font-bold' : 'text-stone-700'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold font-mono text-xs ${activeShipment?.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-600'}`}>3</span>
            <span>Sign Copy 4 Receipt</span>
          </div>
          <ChevronRight className="w-4 h-4 text-stone-300 shrink-0" />
          <div className={`flex items-center gap-2 shrink-0 ${activeShipment?.qcResult === 'Passed' ? 'text-emerald-700 font-bold' : activeShipment?.qcResult === 'Failed' ? 'text-red-700 font-bold' : 'text-amber-700'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold font-mono text-xs ${activeShipment?.qcResult === 'Passed' ? 'bg-emerald-100 text-emerald-800' : activeShipment?.qcResult === 'Failed' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'}`}>4</span>
            <span>Gate Assay QC</span>
          </div>
          <ChevronRight className="w-4 h-4 text-stone-300 shrink-0" />
          <div className={`flex items-center gap-2 shrink-0 ${activeShipment?.escrowStatus === 'Released' ? 'text-emerald-700 font-bold' : 'text-stone-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold font-mono text-xs ${activeShipment?.escrowStatus === 'Released' ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-500'}`}>5</span>
            <span>Disburse Escrow & Certify</span>
          </div>
        </div>
      </div>


      {/* Main Grid: Shipments List & Gate Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Shipment Cards */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-500">Scheduled & Incoming Shipments</h2>
          {shipments.map((s) => (
            <div
              key={s.id}
              onClick={() => setSelectedShipmentId(s.id)}
              className={`cursor-pointer rounded-2xl border p-5 transition-all ${
                selectedShipmentId === s.id
                  ? 'bg-white border-[#D1343A] shadow-md ring-2 ring-[#D1343A]/10'
                  : 'bg-white/80 border-[#E2E4DC] hover:border-stone-400 hover:bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-medium text-stone-500">{s.manifestForm10No}</span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    s.status === 'Delivered'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : s.status === 'In Transit'
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}
                >
                  {s.status}
                </span>
              </div>
              <h3 className="font-semibold text-stone-900 text-sm">{s.manifestData.wasteDescription}</h3>
              <p className="text-xs text-stone-600 mt-1">From: {s.sellerName}</p>

              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="font-mono text-stone-700 font-semibold">{s.manifestData.quantityTonnes} MT</span>
                <span className="text-stone-500">Dispatch: {s.scheduledDispatchDate}</span>
              </div>

              {/* Status pills */}
              <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
                <span className="bg-stone-100 text-stone-700 px-2 py-0.5 rounded">
                  QC: <strong className={s.qcResult === 'Passed' ? 'text-emerald-700' : s.qcResult === 'Failed' ? 'text-red-700' : 'text-amber-700'}>{s.qcResult}</strong>
                </span>
                <span className="bg-stone-100 text-stone-700 px-2 py-0.5 rounded">
                  Escrow: <strong className={s.escrowStatus === 'Released' ? 'text-emerald-700' : s.escrowStatus === 'Disputed' ? 'text-red-700' : 'text-blue-700'}>{s.escrowStatus}</strong>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Right 2 Columns: Selected Delivery Details & QC Console */}
        <div className="lg:col-span-2 space-y-6">
          {activeShipment ? (
            <>
              {/* Manifest Header Card */}
              <div className="bg-white border border-[#E2E4DC] rounded-2xl p-6 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between pb-5 border-b border-stone-200 gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#D1343A] bg-red-50 px-2.5 py-1 rounded border border-red-100">
                        {activeShipment.manifestForm10No}
                      </span>
                      <span className="text-xs text-stone-500">Pre-filled by Generator (Rule 18 / Form 10)</span>
                    </div>
                    <h2 className="text-xl font-bold text-[#0B0F19] mt-2">{activeShipment.manifestData.wasteDescription}</h2>
                    <p className="text-xs text-stone-500 mt-0.5">Consignor: {activeShipment.sellerName}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    {activeShipment.status !== 'Delivered' ? (
                      <button
                        onClick={() => handleMarkReceived(activeShipment.id)}
                        className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs shadow-sm flex items-center gap-2 transition"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Mark as "Received" (Sign Copy 4)
                      </button>
                    ) : (
                      <span className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Consignment Received at Gate
                      </span>
                    )}
                  </div>
                </div>

                {/* Statutory Logistics Specs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 border-b border-stone-200 text-xs">
                  <div>
                    <span className="text-stone-500 block">Vehicle Reg. No.</span>
                    <span className="font-mono font-bold text-stone-900 text-sm">{activeShipment.manifestData.vehicleRegistrationNo}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Authorized Transporter</span>
                    <span className="font-medium text-stone-900 truncate block">{activeShipment.transporterName}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Consignment Quantity</span>
                    <span className="font-mono font-bold text-stone-900 text-sm">{activeShipment.manifestData.quantityTonnes} MT</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Packaging Specification</span>
                    <span className="font-medium text-stone-900 truncate block">{activeShipment.manifestData.packagingType}</span>
                  </div>
                </div>

                {/* Authorization References */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 text-xs bg-[#F8F6F5] p-3.5 rounded-xl border border-[#E2E4DC]">
                  <div>
                    <span className="text-stone-500">Sender SPCB Authorization:</span>
                    <p className="font-mono font-medium text-stone-800">{activeShipment.manifestData.senderAuthNo}</p>
                  </div>
                  <div>
                    <span className="text-stone-500">Receiver SPCB Authorization:</span>
                    <p className="font-mono font-medium text-stone-800">{activeShipment.manifestData.receiverAuthNo}</p>
                  </div>
                </div>
              </div>

              {/* Quality Control (QC) Gate & Escrow Section */}
              <div className="bg-white border border-[#E2E4DC] rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-[#D1343A]">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#0B0F19]">Receiving Quality Gate & Escrow Release</h3>
                      <p className="text-xs text-stone-500">
                        Perform fast onsite laboratory assay before unloading into bulk storage silos.
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-stone-500 block">Held Escrow Value</span>
                    <span className="font-mono text-lg font-bold text-stone-900">
                      ₹{activeShipment.escrowAmountInr.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Gate Inspection Parameters Verification */}
                <div className="mt-5 space-y-4">
                  <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
                    <div className="flex items-center justify-between text-xs font-semibold text-stone-700 mb-3">
                      <span>Gate Sampling Assay vs Envelope Acceptance</span>
                      <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        In-House Rapid Test Kit
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                      <div className="bg-white p-2.5 rounded-lg border border-stone-200">
                        <span className="text-stone-500 block">pH Assay</span>
                        <div className="flex items-center justify-between mt-1">
                          <span className="font-mono font-bold text-stone-900">0.88</span>
                          <span className="text-[11px] text-emerald-600 font-medium">✓ Limit [0.5 - 2.0]</span>
                        </div>
                      </div>
                      <div className="bg-white p-2.5 rounded-lg border border-stone-200">
                        <span className="text-stone-500 block">Chloride Loading</span>
                        <div className="flex items-center justify-between mt-1">
                          <span className="font-mono font-bold text-stone-900">18.2%</span>
                          <span className="text-[11px] text-emerald-600 font-medium">✓ Max &lt; 20%</span>
                        </div>
                      </div>
                      <div className="bg-white p-2.5 rounded-lg border border-stone-200">
                        <span className="text-stone-500 block">Heavy Metals (Hg/Cd)</span>
                        <div className="flex items-center justify-between mt-1">
                          <span className="font-mono font-bold text-stone-900">&lt; 5 ppm</span>
                          <span className="text-[11px] text-emerald-600 font-medium">✓ Non-Detect</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* QC Decision Status & Buttons */}
                  <div className="p-4 rounded-xl border border-[#E2E4DC] bg-white flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="text-xs text-stone-500">Current Gate Inspection Status</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            activeShipment.qcResult === 'Passed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : activeShipment.qcResult === 'Failed'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {activeShipment.qcResult === 'Pending' ? 'Pending Inspection' : `QC ${activeShipment.qcResult}`}
                        </span>
                        {activeShipment.qcNotes && (
                          <span className="text-xs text-stone-600 italic">"{activeShipment.qcNotes}"</span>
                        )}
                      </div>
                      <div className="text-xs text-stone-500 mt-2">
                        Escrow State:{' '}
                        <strong className="text-stone-800 font-mono">{activeShipment.escrowStatus}</strong>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <button
                        onClick={() => handleQcSubmit('Passed')}
                        className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs shadow-sm flex items-center gap-1.5 transition"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Pass QC & Release Escrow
                      </button>
                      <button
                        onClick={() => handleQcSubmit('Failed')}
                        className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium text-xs shadow-sm flex items-center gap-1.5 transition"
                      >
                        <XCircle className="w-4 h-4" />
                        Fail QC & Open Dispute
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Statutory Documents (Form 10 Copy 4 & Diversion Certificate) */}
              <div className="bg-white border border-[#E2E4DC] rounded-2xl p-6 shadow-sm">
                <h3 className="text-base font-bold text-[#0B0F19] mb-1">Statutory Proofs & Diversion Certificate</h3>
                <p className="text-xs text-stone-500 mb-4">
                  Regulatory compliance: Receiver signs Copy 4 and issues recycling/co-processing diversion certificates.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Form 10 Copy 4 Card */}
                  <div className="p-4 rounded-xl border border-stone-200 bg-[#F8F6F5] space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <span className="font-semibold text-stone-900 text-sm">Form 10 Manifest (Copy 4)</span>
                      </div>
                      <span className="text-[11px] font-mono text-stone-500">Receiver Copy</span>
                    </div>
                    <p className="text-xs text-stone-600">
                      Signed acknowledgement of hazardous consignment intake as required under Rule 19 of HW Rules 2016.
                    </p>
                    <div className="pt-2">
                      {activeShipment.form10Copy4Url ? (
                        <div className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-stone-200 text-xs">
                          <span className="text-emerald-700 font-medium flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4" /> Signed Copy 4 Uploaded
                          </span>
                          <a
                            href={activeShipment.form10Copy4Url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#D1343A] hover:underline flex items-center gap-1 font-semibold"
                          >
                            View PDF <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleMarkReceived(activeShipment.id)}
                          className="w-full py-2 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-700 text-xs font-medium flex items-center justify-center gap-1.5 transition"
                        >
                          <UploadCloud className="w-4 h-4" /> Upload Signed Copy 4
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Diversion Certificate Card */}
                  <div className="p-4 rounded-xl border border-stone-200 bg-[#F8F6F5] space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-emerald-600" />
                        <span className="font-semibold text-stone-900 text-sm">Industrial Diversion Certificate</span>
                      </div>
                      <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Receiver-Issued
                      </span>
                    </div>
                    <p className="text-xs text-stone-600">
                      Certifies that {activeShipment.manifestData.quantityTonnes} MT was utilized as raw material substitute in cement kiln clinkering.
                    </p>
                    <div className="pt-2">
                      {activeShipment.diversionCertificateUrl ? (
                        <div className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-stone-200 text-xs">
                          <span className="text-emerald-700 font-medium flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4" /> Certificate Issued & Active
                          </span>
                          <a
                            href={activeShipment.diversionCertificateUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#D1343A] hover:underline flex items-center gap-1 font-semibold"
                          >
                            Download <Download className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleIssueCertificate(activeShipment.id)}
                          className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow-sm"
                        >
                          <Sparkles className="w-4 h-4" /> Issue Diversion Certificate to Generator
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white border border-[#E2E4DC] rounded-2xl p-12 text-center text-stone-500">
              No shipment selected.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
