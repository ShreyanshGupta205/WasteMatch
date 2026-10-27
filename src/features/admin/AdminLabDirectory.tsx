import React, { useState } from 'react';
import {
  FlaskConical,
  Plus,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Building2,
  Trash2,
} from 'lucide-react';
import { useDashboardStore, LabCard } from '../../store/dashboardStore';

export const AdminLabDirectory: React.FC = () => {
  const { labsDirectory, addLab } = useDashboardStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // New Lab Form State
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Uttar Pradesh');
  const [pincode, setPincode] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [nablRegNo, setNablRegNo] = useState('');
  const [testTypes, setTestTypes] = useState('Heavy Metals ICP-OES, Toxicity Characteristic Leaching Procedure (TCLP)');
  const [indicativePricing, setIndicativePricing] = useState('₹3,500 - ₹4,500');
  const [turnaroundDays, setTurnaroundDays] = useState(2);

  const showNotification = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const handleCreateLab = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !city || !contactPhone) return;

    const newLab: LabCard = {
      id: `lab-${Date.now()}`,
      name,
      address: address || `${city} Industrial Area`,
      city,
      state,
      pincode: pincode || '110001',
      distanceKm: 32,
      contactPhone,
      contactEmail: contactEmail || 'testing@lab.in',
      nablRegNo: nablRegNo || 'NABL TC-9912',
      testTypes,
      indicativePricing,
      turnaroundDays: Number(turnaroundDays) || 2,
      rating: 4.8,
    };

    addLab(newLab);
    setIsAddModalOpen(false);
    showNotification(`Lab "${name}" added to reference directory.`);

    // Reset Form
    setName('');
    setAddress('');
    setCity('');
    setPincode('');
    setContactPhone('');
    setContactEmail('');
    setNablRegNo('');
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
          <h1 className="text-2xl font-bold text-[#0B0F19]">Partner NABL Testing Laboratories</h1>
          <p className="text-sm text-stone-600 mt-1">
            Maintain the directory of accredited environmental testing facilities shown to waste generators for offline sample referral.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-[#D1343A] hover:bg-[#A81818] text-white font-semibold text-xs shadow-sm flex items-center gap-2 transition"
        >
          <Plus className="w-4 h-4" /> Add Partner Laboratory
        </button>
      </div>

      {/* Explicit Architecture Constraint Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900">
        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold">Architectural Constraint (India Regulatory Flow):</strong> Laboratories do NOT possess dashboard credentials or platform booking flows. Waste generators view these cards in the "Find Labs Near Me" modal to commission testing directly. Once obtained, sellers upload the resulting PDF to reprocess their AI fingerprint.
        </div>
      </div>

      {/* Lab Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {labsDirectory.map((lab) => (
          <div key={lab.id} className="bg-white border border-[#E2E4DC] rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {lab.nablRegNo}
                </span>
                <h3 className="text-base font-bold text-stone-900 mt-1.5">{lab.name}</h3>
                <p className="text-xs text-stone-500 flex items-center gap-1.5 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" /> {lab.address}, {lab.city}, {lab.state} - {lab.pincode}
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold text-amber-600">★ {lab.rating}</span>
                <span className="text-[11px] text-stone-400 block mt-0.5">{lab.turnaroundDays}-Day TAT</span>
              </div>
            </div>

            <div className="space-y-2 bg-[#F8F6F5] p-3.5 rounded-xl border border-stone-200 text-xs">
              <div>
                <span className="text-stone-500 block">Scope of Accredited Testing:</span>
                <span className="font-medium text-stone-800">{lab.testTypes}</span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-stone-200/60">
                <span className="text-stone-500">Indicative Pricing:</span>
                <span className="font-mono font-bold text-stone-900">{lab.indicativePricing}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1 border-t border-stone-100">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-stone-600 font-mono">
                  <Phone className="w-3.5 h-3.5 text-stone-400" /> {lab.contactPhone}
                </span>
                <span className="flex items-center gap-1 text-stone-600">
                  <Mail className="w-3.5 h-3.5 text-stone-400" /> {lab.contactEmail}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Lab Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-stone-200 shadow-2xl p-6">
            <h3 className="text-lg font-bold text-[#0B0F19]">Add NABL Testing Laboratory</h3>
            <p className="text-xs text-stone-500 mt-1">
              Register a certified laboratory for generator offline test referral.
            </p>

            <form onSubmit={handleCreateLab} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Laboratory Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shriram Institute for Industrial Research"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs focus:ring-2 focus:ring-[#D1343A] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">City *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ghaziabad"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs focus:ring-2 focus:ring-[#D1343A] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Pincode *</label>
                  <input
                    type="text"
                    placeholder="e.g. 201010"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
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
                    placeholder="e.g. +91 98110 00000"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs focus:ring-2 focus:ring-[#D1343A] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">NABL Accreditation No.</label>
                  <input
                    type="text"
                    placeholder="e.g. NABL TC-6102"
                    value={nablRegNo}
                    onChange={(e) => setNablRegNo(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs focus:ring-2 focus:ring-[#D1343A] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Accredited Test Types</label>
                <input
                  type="text"
                  value={testTypes}
                  onChange={(e) => setTestTypes(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs focus:ring-2 focus:ring-[#D1343A] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Indicative Pricing</label>
                  <input
                    type="text"
                    value={indicativePricing}
                    onChange={(e) => setIndicativePricing(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs focus:ring-2 focus:ring-[#D1343A] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Turnaround Time (Days)</label>
                  <input
                    type="number"
                    value={turnaroundDays}
                    onChange={(e) => setTurnaroundDays(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs focus:ring-2 focus:ring-[#D1343A] focus:outline-none"
                  />
                </div>
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
                  Save Partner Laboratory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
