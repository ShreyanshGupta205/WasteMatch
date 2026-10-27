import React, { useState } from 'react';
import {
  SlidersHorizontal,
  CheckCircle2,
  ShieldCheck,
  AlertTriangle,
  Flame,
} from 'lucide-react';
import { useDashboardStore } from '../../store/dashboardStore';

export const BuyerProfile: React.FC = () => {
  const { buyerProfile, updateBuyerProfile } = useDashboardStore();

  const [monthlyQuota, setMonthlyQuota] = useState(buyerProfile.monthlyQuotaTonnes.toString());
  const [minPh, setMinPh] = useState(buyerProfile.minPh.toString());
  const [maxPh, setMaxPh] = useState(buyerProfile.maxPh.toString());
  const [maxChloride, setMaxChloride] = useState(buyerProfile.maxChloridePpm.toString());
  const [maxMetals, setMaxMetals] = useState(buyerProfile.maxMetalsPpm.toString());
  const [maxMoisture, setMaxMoisture] = useState(buyerProfile.maxMoisturePct.toString());
  const [radius, setRadius] = useState(buyerProfile.serviceRadiusKm.toString());
  const [priceRange, setPriceRange] = useState(buyerProfile.indicativePriceRange);
  const [prohibited, setProhibited] = useState(buyerProfile.prohibitedContaminants);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBuyerProfile({
      monthlyQuotaTonnes: Number(monthlyQuota) || 450,
      minPh: Number(minPh) || 0.5,
      maxPh: Number(maxPh) || 12.5,
      maxChloridePpm: Number(maxChloride) || 200000,
      maxMetalsPpm: Number(maxMetals) || 100,
      maxMoisturePct: Number(maxMoisture) || 75,
      serviceRadiusKm: Number(radius) || 1000,
      indicativePriceRange: priceRange,
      prohibitedContaminants: prohibited,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E2E4DC]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-[#0B0F19]">
              Receiver Profile & Quality Acceptance Limits
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#EFF6FF] text-[#2563EB] border border-[#2563EB]/20">
              Co-Processing Intake Rules
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-0.5">
            Configure Intake Envelopes, Pre-Calciner Temperature Limits & Chemical Tolerance Thresholds
          </p>
        </div>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-[#DCFCE7] border border-[#16A34A]/30 text-xs font-bold text-[#16A34A] flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          <span>Acceptance limits and monthly quota updated successfully.</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-surface border border-[#E2E4DC] shadow-subtle space-y-5">
        <h3 className="text-sm font-bold text-[#0B0F19] flex items-center gap-2 pb-3 border-b border-[#E2E4DC]">
          <SlidersHorizontal className="w-4 h-4 text-[#2563EB]" />
          <span>Cement Kiln Quality Envelope & Operating Parameters</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#0B0F19]">Monthly Acceptance Quota (Tonnes)</label>
            <input
              type="number"
              value={monthlyQuota}
              onChange={(e) => setMonthlyQuota(e.target.value)}
              className="w-full px-3.5 py-2 text-xs font-mono font-bold text-[#0B0F19] bg-surface-subtle border border-[#E2E4DC] rounded-xl focus:outline-none focus:border-[#2563EB]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#0B0F19]">Permitted pH Range (Min – Max)</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                step="0.1"
                value={minPh}
                onChange={(e) => setMinPh(e.target.value)}
                placeholder="Min pH"
                className="px-3.5 py-2 text-xs font-mono font-bold text-[#0B0F19] bg-surface-subtle border border-[#E2E4DC] rounded-xl focus:outline-none focus:border-[#2563EB]"
              />
              <input
                type="number"
                step="0.1"
                value={maxPh}
                onChange={(e) => setMaxPh(e.target.value)}
                placeholder="Max pH"
                className="px-3.5 py-2 text-xs font-mono font-bold text-[#0B0F19] bg-surface-subtle border border-[#E2E4DC] rounded-xl focus:outline-none focus:border-[#2563EB]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#0B0F19]">Max Chloride Loading (ppm)</label>
            <input
              type="number"
              value={maxChloride}
              onChange={(e) => setMaxChloride(e.target.value)}
              className="w-full px-3.5 py-2 text-xs font-mono font-bold text-[#0B0F19] bg-surface-subtle border border-[#E2E4DC] rounded-xl focus:outline-none focus:border-[#2563EB]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#0B0F19]">Max Heavy Metals (Pb/Hg/Cd ppm)</label>
            <input
              type="number"
              value={maxMetals}
              onChange={(e) => setMaxMetals(e.target.value)}
              className="w-full px-3.5 py-2 text-xs font-mono font-bold text-[#0B0F19] bg-surface-subtle border border-[#E2E4DC] rounded-xl focus:outline-none focus:border-[#2563EB]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#0B0F19]">Max Moisture (%)</label>
            <input
              type="number"
              value={maxMoisture}
              onChange={(e) => setMaxMoisture(e.target.value)}
              className="w-full px-3.5 py-2 text-xs font-mono font-bold text-[#0B0F19] bg-surface-subtle border border-[#E2E4DC] rounded-xl focus:outline-none focus:border-[#2563EB]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#0B0F19]">Service Radius (km)</label>
            <input
              type="number"
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
              className="w-full px-3.5 py-2 text-xs font-mono font-bold text-[#0B0F19] bg-surface-subtle border border-[#E2E4DC] rounded-xl focus:outline-none focus:border-[#2563EB]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#0B0F19]">Indicative Buying Price Range</label>
            <input
              type="text"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full px-3.5 py-2 text-xs font-mono font-bold text-[#16A34A] bg-surface-subtle border border-[#E2E4DC] rounded-xl focus:outline-none focus:border-[#2563EB]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#0B0F19]">Strictly Prohibited Contaminants</label>
            <input
              type="text"
              value={prohibited}
              onChange={(e) => setProhibited(e.target.value)}
              className="w-full px-3.5 py-2 text-xs text-[#DC2626] font-semibold bg-surface-subtle border border-[#E2E4DC] rounded-xl focus:outline-none focus:border-[#2563EB]"
            />
          </div>
        </div>

        <div className="pt-3 flex justify-end">
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#2563EB] hover:bg-[#1d4ed8] transition-all shadow-sm cursor-pointer"
          >
            Save Acceptance Profile
          </button>
        </div>
      </form>
    </div>
  );
};
