import React, { useState } from 'react';
import {
  Truck,
  Plus,
  Phone,
  ShieldCheck,
  AlertCircle,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { useDashboardStore, TransporterCard } from '../../store/dashboardStore';

export const AdminTransporterDirectory: React.FC = () => {
  const { transportersDirectory, addTransporter } = useDashboardStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // New Transporter Form State
  const [name, setName] = useState('');
  const [baseCity, setBaseCity] = useState('');
  const [coverageStates, setCoverageStates] = useState('Uttar Pradesh, Delhi NCR, Haryana, Rajasthan');
  const [vehicleTypes, setVehicleTypes] = useState('Rubber-Lined Acid Tanker (Class 8 Approved)');
  const [capacityTonnes, setCapacityTonnes] = useState(24);
  const [authorizedHazardous, setAuthorizedHazardous] = useState(true);
  const [spcbPermitNo, setSpcbPermitNo] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [pricePerKm, setPricePerKm] = useState(85);

  const showNotification = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const handleCreateTransporter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !baseCity || !contactPhone) return;

    const newTransporter: TransporterCard = {
      id: `trans-${Date.now()}`,
      name,
      baseCity,
      coverageStates,
      vehicleTypes,
      capacityTonnes: Number(capacityTonnes) || 20,
      authorizedHazardous,
      spcbPermitNo: spcbPermitNo || 'SPCB/HAZ/TR/2024/9912',
      contactPhone,
      pricePerKm: Number(pricePerKm) || 80,
    };

    addTransporter(newTransporter);
    setIsAddModalOpen(false);
    showNotification(`Transporter "${name}" added to reference directory.`);

    // Reset Form
    setName('');
    setBaseCity('');
    setContactPhone('');
    setSpcbPermitNo('');
  };

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
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-stone-100 text-stone-700 border border-stone-200">
              Reference Directory Entity
            </span>
            <span className="text-xs text-stone-500">Strictly No Login / Dashboard</span>
          </div>
          <h1 className="text-2xl font-bold text-[#0B0F19]">Authorized Transporter Fleet Directory</h1>
          <p className="text-sm text-stone-600 mt-1">
            Manage SPCB-authorized hazardous waste carriers and freight haulers for Form 10 manifest pre-fills.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-[#D1343A] hover:bg-[#A81818] text-white font-semibold text-xs shadow-sm flex items-center gap-2 transition"
        >
          <Plus className="w-4 h-4" /> Add Authorized Transporter
        </button>
      </div>

      {/* Anti-Feature Constraint Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900">
        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold">Regulatory Operational Model:</strong> WasteMatch does not provide a Transporter Dashboard or physical GPS tracking integrations. Generators select a transporter from this reference directory; the generator issues the Form 10 manifest and the parties manually update transit milestones.
        </div>
      </div>

      {/* Transporter Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {transportersDirectory.map((t) => (
          <div key={t.id} className="bg-white border border-[#E2E4DC] rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  {t.spcbPermitNo}
                </span>
                <h3 className="text-base font-bold text-stone-900 mt-1.5">{t.name}</h3>
                <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" /> Operational Base: {t.baseCity}
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-stone-900">₹{t.pricePerKm}/km</span>
                <span className="text-[11px] text-stone-400 block mt-0.5">{t.capacityTonnes} MT Tanker</span>
              </div>
            </div>

            <div className="space-y-2 bg-[#F8F6F5] p-3.5 rounded-xl border border-stone-200 text-xs">
              <div>
                <span className="text-stone-500 block">Permitted Fleet Types:</span>
                <span className="font-medium text-stone-800">{t.vehicleTypes}</span>
              </div>
              <div className="pt-1 border-t border-stone-200/60">
                <span className="text-stone-500 block">Coverage States:</span>
                <span className="text-stone-700 font-medium">{t.coverageStates}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1 border-t border-stone-100">
              <span className="flex items-center gap-1.5 text-stone-700 font-mono font-medium">
                <Phone className="w-3.5 h-3.5 text-stone-400" /> {t.contactPhone}
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                {t.authorizedHazardous ? 'Rule 18 HazChem Compliant' : 'Non-Hazardous'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Transporter Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-stone-200 shadow-2xl p-6">
            <h3 className="text-lg font-bold text-[#0B0F19]">Add Authorized Transporter</h3>
            <p className="text-xs text-stone-500 mt-1">
              Add a licensed hazardous or non-hazardous waste hauler to the directory.
            </p>

            <form onSubmit={handleCreateTransporter} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Company / Fleet Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SafeChem Dedicated Liquid Logistics"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs focus:ring-2 focus:ring-[#D1343A] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Base City *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ghaziabad"
                    value={baseCity}
                    onChange={(e) => setBaseCity(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs focus:ring-2 focus:ring-[#D1343A] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">SPCB Transit Permit No.</label>
                  <input
                    type="text"
                    placeholder="e.g. UPPCB/HAZ/TR/2024/9021"
                    value={spcbPermitNo}
                    onChange={(e) => setSpcbPermitNo(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs focus:ring-2 focus:ring-[#D1343A] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Contact Phone *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. +91 98110 44219"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs focus:ring-2 focus:ring-[#D1343A] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Indicative Rate (₹/km)</label>
                  <input
                    type="number"
                    value={pricePerKm}
                    onChange={(e) => setPricePerKm(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs focus:ring-2 focus:ring-[#D1343A] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Vehicle Specification</label>
                <input
                  type="text"
                  value={vehicleTypes}
                  onChange={(e) => setVehicleTypes(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs focus:ring-2 focus:ring-[#D1343A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Coverage States</label>
                <input
                  type="text"
                  value={coverageStates}
                  onChange={(e) => setCoverageStates(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs focus:ring-2 focus:ring-[#D1343A] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-stone-600 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#D1343A] hover:bg-[#A81818] text-white text-xs font-semibold shadow-sm transition"
                >
                  Save Transporter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
