import React, { useState } from 'react';
import {
  FlaskConical,
  Search,
  MapPin,
  ShieldCheck,
  Clock,
  Tag,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Filter,
  FileBadge,
  Phone,
  Mail,
  Star,
} from 'lucide-react';
import { useSaasStore } from '../../store/saasStore';
import { TARGETED_PACKAGE_RECOMMENDATION } from '../../mock/saasData';
import { LabEnquiryModal } from '../../components/saas/LabEnquiryModal';

export const FindLaboratoryWorkspace: React.FC = () => {
  const {
    laboratories,
    labSearchQuery,
    setLabSearchQuery,
    selectedCorridor,
    setSelectedCorridor,
    openLabEnquiryModal,
  } = useSaasStore();

  const [pinCodeFilter, setPinCodeFilter] = useState('');
  const [appliedRecommendedScopeToast, setAppliedRecommendedScopeToast] = useState(false);

  const corridors = [
    'All Corridors',
    'Delhi NCR',
    'Uttar Pradesh',
    'Haryana',
  ];

  const filteredLabs = laboratories.filter((lab) => {
    // Corridor filter
    if (selectedCorridor !== 'All Corridors' && lab.state !== selectedCorridor) {
      return false;
    }

    // PIN code filter
    if (pinCodeFilter.trim() && !lab.pin.startsWith(pinCodeFilter.trim())) {
      return false;
    }

    // Search query filter
    if (labSearchQuery.trim()) {
      const q = labSearchQuery.toLowerCase();
      return (
        lab.name.toLowerCase().includes(q) ||
        lab.city.toLowerCase().includes(q) ||
        lab.nablRegNo.toLowerCase().includes(q) ||
        lab.testedParametersOffered.some((p) => p.toLowerCase().includes(q))
      );
    }

    return true;
  });

  const handleApplyRecommendedScope = () => {
    setAppliedRecommendedScopeToast(true);
    openLabEnquiryModal(laboratories[0]);
    setTimeout(() => setAppliedRecommendedScopeToast(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E2E4DC]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-[#0B0F19]">
              Find a Laboratory & Targeted Chemical Testing
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FEF3C7] text-[#D97706] border border-[#D97706]/30">
              NABL ISO/IEC 17025:2017
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-0.5">
            Verified Chemical Testing Laboratories across Ghaziabad, Delhi-NCR & Rajasthan Transport Corridors
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => openLabEnquiryModal()}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-[#D1343A] hover:bg-[#A81818] transition-colors shadow-subtle flex items-center gap-1.5 cursor-pointer"
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Prepare Testing Enquiry</span>
          </button>
        </div>
      </div>

      {/* 1. Targeted Testing Package Recommendation Card */}
      <div className="relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-[#FFF8EE] via-[#FFFBF5] to-[#FEF3C7]/40 border-2 border-[#D97706]/40 shadow-card space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-[#D97706] text-white">
                TARGETED COST OPTIMIZATION RECOMMENDED
              </span>
              <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-[#DCFCE7] text-[#16A34A] border border-[#16A34A]/20">
                {TARGETED_PACKAGE_RECOMMENDATION.costSavings}
              </span>
              <span className="px-2 py-0.5 rounded text-xs font-semibold bg-surface text-[#64748B] border border-[#E2E4DC]">
                TAT: {TARGETED_PACKAGE_RECOMMENDATION.turnaroundDays}
              </span>
            </div>

            <h3 className="text-lg font-bold text-[#0B0F19]">
              Order ICP-OES Heavy Metals Trace Assay ({TARGETED_PACKAGE_RECOMMENDATION.indicativeCostRange}) instead of ₹15,000 Full Panel
            </h3>

            <p className="text-xs text-[#1E293B] max-w-4xl leading-relaxed">
              {TARGETED_PACKAGE_RECOMMENDATION.rationale}
            </p>

            {/* Covered Missing Parameters Pills */}
            <div className="flex items-center gap-2 pt-1 flex-wrap">
              <span className="text-[11px] font-semibold text-[#64748B]">Missing Parameters Covered:</span>
              {TARGETED_PACKAGE_RECOMMENDATION.missingParametersCovered.map((param) => (
                <span
                  key={param}
                  className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-surface border border-[#D97706]/40 text-[#D97706]"
                >
                  ✓ {param}
                </span>
              ))}
            </div>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col items-end gap-2.5">
            <div className="text-right">
              <div className="text-[10px] text-[#64748B] font-semibold uppercase">Cost Comparison</div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-mono font-bold text-[#16A34A]">
                  ₹3,800
                </span>
                <span className="text-xs font-mono line-through text-[#64748B]">
                  ₹15,000
                </span>
              </div>
            </div>

            <button
              onClick={handleApplyRecommendedScope}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#D1343A] hover:bg-[#A81818] transition-all shadow-sm flex items-center gap-2 active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Apply Recommended Scope</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Location Search Bar & Corridor Filters */}
      <div className="p-4 rounded-2xl bg-surface border border-[#E2E4DC] shadow-subtle flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Keyword Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search lab name, parameter (ICP-OES)..."
            value={labSearchQuery}
            onChange={(e) => setLabSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs text-[#0B0F19] placeholder-[#64748B] bg-surface-subtle border border-[#E2E4DC] rounded-xl focus:outline-none focus:border-[#D1343A]"
          />
        </div>

        {/* PIN Code Filter */}
        <div className="relative w-full md:w-44">
          <MapPin className="w-4 h-4 text-[#64748B] absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Filter PIN (e.g. 201)"
            value={pinCodeFilter}
            onChange={(e) => setPinCodeFilter(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs font-mono text-[#0B0F19] placeholder-[#64748B] bg-surface-subtle border border-[#E2E4DC] rounded-xl focus:outline-none focus:border-[#D1343A]"
          />
        </div>

        {/* Corridor Buttons */}
        <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {corridors.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCorridor(c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCorridor === c
                  ? 'bg-[#1E293B] text-white shadow-sm'
                  : 'bg-surface-subtle text-[#64748B] hover:text-[#0B0F19] hover:bg-[#E2E4DC]/50'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Laboratory Directory Cards (Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredLabs.map((lab) => (
          <div
            key={lab.id}
            className="p-5 rounded-2xl bg-surface border border-[#E2E4DC] hover:border-[#D1343A]/40 transition-all shadow-subtle hover:shadow-card flex flex-col justify-between space-y-4 group"
          >
            {/* Lab Card Header */}
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#16A34A] bg-[#DCFCE7] px-2 py-0.5 rounded border border-[#16A34A]/20">
                    {lab.nablRegNo}
                  </span>
                  <h3 className="text-sm font-bold text-[#0B0F19] group-hover:text-[#D1343A] transition-colors mt-1.5 leading-snug">
                    {lab.name}
                  </h3>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-[#1E293B] bg-surface-subtle px-2 py-0.5 rounded">
                  <Star className="w-3.5 h-3.5 fill-[#D97706] text-[#D97706]" />
                  <span>{lab.rating}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs text-[#64748B]">
                <MapPin className="w-3.5 h-3.5 text-[#64748B] shrink-0" />
                <span className="truncate">{lab.address}, {lab.city}</span>
                <span className="font-mono text-[#0B0F19] font-semibold">({lab.distanceKm} km)</span>
              </div>
            </div>

            {/* Scope & Verified Source Badge */}
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-surface-subtle border border-[#E2E4DC] space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] flex items-center justify-between">
                  <span>Accredited Scope</span>
                  <span className="text-[#16A34A] font-mono">ISO 17025</span>
                </div>
                <ul className="text-[11px] text-[#1E293B] space-y-0.5 list-disc list-inside">
                  {lab.accreditedScope.slice(0, 2).map((s, idx) => (
                    <li key={idx} className="truncate">{s}</li>
                  ))}
                </ul>
              </div>

              {/* Tested parameters chips */}
              <div className="flex flex-wrap gap-1">
                {lab.testedParametersOffered.slice(0, 3).map((param, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded text-[10px] bg-surface-subtle text-[#1E293B] border border-[#E2E4DC]"
                  >
                    {param}
                  </span>
                ))}
              </div>

              {/* Verified Source Citation */}
              <div className="p-2 rounded-lg bg-[#F8F6F5] text-[10px] text-[#64748B] flex items-center gap-1.5 border border-[#E2E4DC]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
                <span className="truncate">{lab.verifiedSourceBadge}</span>
              </div>
            </div>

            {/* Price & Turnaround Footer */}
            <div className="pt-3 border-t border-[#E2E4DC] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-[#64748B]">Indicative Package</div>
                  <div className="text-sm font-mono font-bold text-[#16A34A]">
                    {lab.indicativePriceRange}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-[#64748B]">Turnaround Time</div>
                  <div className="text-xs font-semibold text-[#1E293B] flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#64748B]" />
                    <span>{lab.turnaroundTime}</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <button
                onClick={() => openLabEnquiryModal(lab)}
                className="w-full py-2 rounded-xl text-xs font-bold text-[#1E293B] hover:text-white bg-surface hover:bg-[#D1343A] border border-[#E2E4DC] hover:border-[#D1343A] transition-all shadow-subtle flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Prepare Testing Enquiry</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Lab Enquiry Modal */}
      <LabEnquiryModal />
    </div>
  );
};
