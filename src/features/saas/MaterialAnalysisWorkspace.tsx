import React, { useState } from 'react';
import {
  FileText,
  UploadCloud,
  Camera,
  Radio,
  Mic,
  AlertTriangle,
  CheckCircle2,
  Search,
  Filter,
  ShieldAlert,
  Sparkles,
  Info,
  ExternalLink,
  Edit3,
  HelpCircle,
  FileCheck,
} from 'lucide-react';
import { useSaasStore } from '../../store/saasStore';
import { ReviewParamModal } from '../../components/saas/ReviewParamModal';

export const MaterialAnalysisWorkspace: React.FC = () => {
  const {
    parameters,
    selectedCategory,
    setSelectedCategory,
    searchParamQuery,
    setSearchParamQuery,
    setEditingParameter,
    facility,
  } = useSaasStore();

  const [isSimulatingUpload, setIsSimulatingUpload] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedNotification, setUploadedNotification] = useState(false);

  const categories = [
    'All',
    'Physicochemical',
    'Heavy Metals',
    'Combustion / Co-Processing',
    'Hazmat & Safety',
    'Logistics',
    'Missing / Unverified',
  ];

  const filteredParameters = parameters.filter((p) => {
    // Category filter
    if (selectedCategory === 'Missing / Unverified') {
      if (!p.isMissing && p.status !== 'Needs Review' && p.status !== 'Not Available') {
        return false;
      }
    } else if (selectedCategory !== 'All' && p.category !== selectedCategory) {
      return false;
    }

    // Search query filter
    if (searchParamQuery.trim()) {
      const q = searchParamQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.symbol.toLowerCase().includes(q) ||
        p.citation.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.value.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const missingCount = parameters.filter((p) => p.isMissing || p.status === 'Not Available').length;
  const verifiedCount = parameters.filter((p) => p.status === 'Verified').length;
  const provisionalCount = parameters.filter((p) => p.status === 'Provisional').length;

  const handleSimulateDrop = () => {
    setIsSimulatingUpload(true);
    setUploadProgress(15);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSimulatingUpload(false);
          setUploadedNotification(true);
          setTimeout(() => setUploadedNotification(false), 5000);
          return 100;
        }
        return prev + 25;
      });
    }, 250);
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E2E4DC]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-[#0B0F19]">
              Material Analysis & Chemical Characterization
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FDF2F2] text-[#D1343A] border border-[#D1343A]/20">
              50-Parameter Engine
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-0.5">
            Multimodal Chemical Passport & Regulatory Verification · CPCB Schedule I Cat #26.1
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSimulateDrop}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-[#D1343A] hover:bg-[#A81818] transition-colors shadow-subtle flex items-center gap-1.5 cursor-pointer"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Upload Additional Assay</span>
          </button>
        </div>
      </div>

      {/* 1. Material Details Card */}
      <div className="p-5 rounded-2xl bg-surface border border-[#E2E4DC] shadow-subtle space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#E2E4DC]">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#FDF2F2] border border-[#D1343A]/20 flex items-center justify-center text-[#D1343A] font-bold text-xl shrink-0">
              HCl
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg font-bold text-[#0B0F19]">
                  Spent Hydrochloric Acid (Pickling Liquor)
                </h2>
                <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-[#FDF2F2] text-[#D1343A] border border-[#D1343A]/30">
                  Class 8 Corrosive · UN 1789
                </span>
                <span className="px-2 py-0.5 rounded text-xs font-semibold bg-[#DCFCE7] text-[#16A34A] border border-[#16A34A]/20">
                  Liquid State
                </span>
              </div>
              <p className="text-xs text-[#64748B] mt-1">
                Generator: <strong className="text-[#1E293B] font-semibold">{facility.name} {facility.unit}</strong> (Site-4 Sahibabad, Ghaziabad UP) · Process Origin: Steel Descaling & Wire Galvanizing Line 2
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="text-right">
              <div className="text-xs text-[#64748B]">Batch Quantity</div>
              <div className="text-xl font-mono font-bold text-[#0B0F19]">12.0 MT</div>
            </div>
            <div className="h-8 w-px bg-[#E2E4DC] mx-2" />
            <div className="text-right">
              <div className="text-xs text-[#64748B]">Regulatory Cat</div>
              <div className="text-xs font-mono font-bold text-[#1E293B]">Sched I #26.1</div>
            </div>
          </div>
        </div>

        {/* Quick Analytical Snapshot Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          <div className="p-3 rounded-xl bg-surface-subtle border border-[#E2E4DC]">
            <span className="text-[10px] text-[#64748B] font-semibold uppercase">pH Level</span>
            <div className="text-base font-mono font-bold text-[#D1343A]">0.85</div>
            <span className="text-[10px] text-[#64748B]">Extreme Acid</span>
          </div>

          <div className="p-3 rounded-xl bg-surface-subtle border border-[#E2E4DC]">
            <span className="text-[10px] text-[#64748B] font-semibold uppercase">Total Iron (Fe)</span>
            <div className="text-base font-mono font-bold text-[#16A34A]">118,500 ppm</div>
            <span className="text-[10px] text-[#16A34A] font-medium">11.85% Fe (Asset)</span>
          </div>

          <div className="p-3 rounded-xl bg-surface-subtle border border-[#E2E4DC]">
            <span className="text-[10px] text-[#64748B] font-semibold uppercase">Total Chloride</span>
            <div className="text-base font-mono font-bold text-[#0B0F19]">182,000 ppm</div>
            <span className="text-[10px] text-[#64748B]">18.2% Cl⁻</span>
          </div>

          <div className="p-3 rounded-xl bg-surface-subtle border border-[#E2E4DC]">
            <span className="text-[10px] text-[#64748B] font-semibold uppercase">Specific Gravity</span>
            <div className="text-base font-mono font-bold text-[#0B0F19]">1.284 g/cm³</div>
            <span className="text-[10px] text-[#64748B]">Hydrometer #3</span>
          </div>

          <div className="p-3 rounded-xl bg-surface-subtle border border-[#E2E4DC]">
            <span className="text-[10px] text-[#64748B] font-semibold uppercase">Free Acid (HCl)</span>
            <div className="text-base font-mono font-bold text-[#0B0F19]">4.80% w/w</div>
            <span className="text-[10px] text-[#64748B]">Titration</span>
          </div>

          <div className="p-3 rounded-xl bg-surface-subtle border border-[#E2E4DC]">
            <span className="text-[10px] text-[#64748B] font-semibold uppercase">Zinc Dragout</span>
            <div className="text-base font-mono font-bold text-[#D97706]">840 ppm</div>
            <span className="text-[10px] text-[#D97706] font-medium">NIR Review</span>
          </div>
        </div>
      </div>

      {/* 2. Multi-Document Upload Dropzone & Evidence Cards */}
      <div className="p-5 rounded-2xl bg-surface border border-[#E2E4DC] shadow-subtle space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#D1343A]" />
            <h3 className="text-sm font-bold text-[#0B0F19]">
              Multi-Document Ingestion Evidence & Citations
            </h3>
          </div>
          <span className="text-xs text-[#64748B]">
            3 Verified Source Documents Ingested
          </span>
        </div>

        {/* Upload Progress Bar if simulating */}
        {isSimulatingUpload && (
          <div className="p-3 rounded-xl bg-[#FDF2F2] border border-[#D1343A]/30 space-y-2 animate-in fade-in">
            <div className="flex items-center justify-between text-xs font-semibold text-[#D1343A]">
              <span>Ingesting New Laboratory Certificate & Extracting Spectral Peaks...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#E2E4DC] overflow-hidden">
              <div
                className="h-full bg-[#D1343A] transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {uploadedNotification && (
          <div className="p-3 rounded-xl bg-[#DCFCE7] border border-[#16A34A]/30 text-xs font-bold text-[#16A34A] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Document successfully ingested and cross-matched with CPCB HazMat Registry.</span>
          </div>
        )}

        {/* 3 Evidence Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Evidence 1: Lab PDF */}
          <div className="p-4 rounded-xl bg-surface-subtle border border-[#E2E4DC] hover:border-[#D1343A]/40 transition-colors space-y-2">
            <div className="flex items-start justify-between">
              <div className="p-2 rounded-lg bg-[#EFF6FF] text-[#2563EB]">
                <FileText className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono font-bold bg-[#DCFCE7] text-[#16A34A] px-2 py-0.5 rounded">
                NABL Certified
              </span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#0B0F19] truncate">
                SGS_Chemical_Assay_Batch_SG08.pdf
              </h4>
              <p className="text-[11px] text-[#64748B]">1.4 MB · Ingested 2 hours ago</p>
            </div>
            <div className="p-2 rounded-lg bg-surface text-[11px] text-[#1E293B] font-mono leading-tight border border-[#E2E4DC]">
              pH: 0.85 | Free HCl: 4.8% | Fe: 118,500 ppm | Cl⁻: 182,000 ppm
            </div>
          </div>

          {/* Evidence 2: Hydrometer Photo */}
          <div className="p-4 rounded-xl bg-surface-subtle border border-[#E2E4DC] hover:border-[#D1343A]/40 transition-colors space-y-2">
            <div className="flex items-start justify-between">
              <div className="p-2 rounded-lg bg-[#FAF5FF] text-[#9333EA]">
                <Camera className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono font-bold bg-[#DCFCE7] text-[#16A34A] px-2 py-0.5 rounded">
                CV Verified
              </span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#0B0F19] truncate">
                IBC_Tanks_Vat_Inspection_Aug.jpg
              </h4>
              <p className="text-[11px] text-[#64748B]">3.8 MB · Ingested Yesterday</p>
            </div>
            <div className="p-2 rounded-lg bg-surface text-[11px] text-[#1E293B] font-mono leading-tight border border-[#E2E4DC]">
              Specific Gravity: 1.284 g/cm³ | Zero bottom cake | Greenish tint
            </div>
          </div>

          {/* Evidence 3: MicroNIR CSV */}
          <div className="p-4 rounded-xl bg-surface-subtle border border-[#E2E4DC] hover:border-[#D1343A]/40 transition-colors space-y-2">
            <div className="flex items-start justify-between">
              <div className="p-2 rounded-lg bg-[#ECFDF5] text-[#059669]">
                <Radio className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono font-bold bg-[#FEF3C7] text-[#D97706] px-2 py-0.5 rounded">
                Needs Lab Check
              </span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#0B0F19] truncate">
                MicroNIR_Scan_Point_04.csv
              </h4>
              <p className="text-[11px] text-[#64748B]">420 KB · Ingested Today 09:15 AM</p>
            </div>
            <div className="p-2 rounded-lg bg-surface text-[11px] text-[#1E293B] font-mono leading-tight border border-[#E2E4DC]">
              Absorption peaks @ 1440 & 1940nm (HCl hydrate) | Zn est: 840 ppm
            </div>
          </div>
        </div>

        {/* Dropzone trigger */}
        <div
          onClick={handleSimulateDrop}
          className="p-4 rounded-xl border border-dashed border-[#E2E4DC] hover:border-[#D1343A] bg-surface-subtle/40 hover:bg-[#FDF2F2]/30 transition-all text-center cursor-pointer group"
        >
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#1E293B] group-hover:text-[#D1343A]">
            <UploadCloud className="w-4 h-4 text-[#D1343A]" />
            <span>Drag & drop additional testing assays, hydrometer photos, or NIR files to append evidence</span>
          </div>
          <p className="text-[10px] text-[#64748B] mt-0.5">
            Supports PDF, JPG, PNG, CSV, and audio foreman notes up to 25 MB
          </p>
        </div>
      </div>

      {/* 3. Scientific Non-Fabrication Banner */}
      <div className="p-4 rounded-2xl bg-[#FFFBEB] border border-[#D97706]/30 flex items-start gap-3.5 shadow-subtle">
        <div className="p-2 rounded-xl bg-[#FEF3C7] text-[#D97706] shrink-0 mt-0.5">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D97706]">
              SCIENTIFIC NON-FABRICATION GUARANTEE & REGULATORY ENFORCEMENT
            </h4>
            <span className="px-2 py-0.2 rounded text-[10px] font-bold bg-[#D97706] text-white">
              Zero Chemical Hallucination
            </span>
          </div>
          <p className="text-xs text-[#1E293B] leading-relaxed">
            WasteMatch strictly refuses to synthesize, extrapolate, or hallucinate trace elemental heavy metals (<strong className="font-semibold text-[#0B0F19]">Lead Pb, Mercury Hg, Flash Point</strong>) from visual photography or simple optical NIR spectra. Under the <em>Hazardous and Other Wastes (Management and Transboundary Movement) Rules 2016</em>, trace elemental heavy metals can only be verified via <strong className="font-semibold text-[#0B0F19]">Certified NABL Atomic Emission (ICP-OES / AAS) Spectroscopy</strong>. All missing parameters are explicitly marked as <span className="inline-flex px-1.5 py-0.2 rounded font-mono font-bold text-[10px] bg-[#FEF3C7] text-[#D97706] border border-[#D97706]/30">Not Available - NABL Lab Assay Required</span>.
          </p>
        </div>
      </div>

      {/* 4. 50-Parameter Chemical Characterization Table */}
      <div className="p-5 rounded-2xl bg-surface border border-[#E2E4DC] shadow-subtle space-y-4">
        {/* Table Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-[#E2E4DC]">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#D1343A]" />
            <h3 className="text-sm font-bold text-[#0B0F19]">
              50-Parameter Chemical Passport & Assay Ledger
            </h3>
            <span className="text-xs font-mono text-[#64748B]">
              ({filteredParameters.length} of {parameters.length} shown)
            </span>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 text-[#64748B] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Filter by formula, name..."
              value={searchParamQuery}
              onChange={(e) => setSearchParamQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs text-[#0B0F19] placeholder-[#64748B] bg-surface-subtle border border-[#E2E4DC] rounded-xl focus:outline-none focus:border-[#D1343A]"
            />
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#D1343A] text-white shadow-sm'
                  : 'bg-surface-subtle text-[#64748B] hover:text-[#0B0F19] hover:bg-[#E2E4DC]/50'
              }`}
            >
              {cat}
              {cat === 'Missing / Unverified' && (
                <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-white/20">
                  {missingCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Characterization Table */}
        <div className="overflow-x-auto rounded-xl border border-[#E2E4DC]">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-surface-subtle/80 border-b border-[#E2E4DC] text-[#64748B] font-semibold text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4">Parameter & Formula</th>
                <th className="py-3 px-4">Value & Unit</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Document Citation</th>
                <th className="py-3 px-4">AI Confidence</th>
                <th className="py-3 px-4">Verification Status</th>
                <th className="py-3 px-4 text-right">Human Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E4DC]">
              {filteredParameters.map((p) => {
                const isMissing = p.status === 'Not Available' || p.isMissing;
                const isNeedsReview = p.status === 'Needs Review';
                const isVerified = p.status === 'Verified';

                return (
                  <tr
                    key={p.id}
                    className={`hover:bg-surface-subtle/50 transition-colors ${
                      isMissing ? 'bg-[#FEF3C7]/15' : ''
                    }`}
                  >
                    {/* Parameter & Formula */}
                    <td className="py-3 px-4">
                      <div className="font-bold text-[#0B0F19] flex items-center gap-1.5">
                        <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-surface border border-[#E2E4DC] text-[#D1343A]">
                          {p.symbol}
                        </span>
                        <span>{p.name}</span>
                      </div>
                      <div className="text-[10px] text-[#64748B] mt-0.5">
                        Benchmark: {p.benchmark}
                      </div>
                    </td>

                    {/* Value & Unit */}
                    <td className="py-3 px-4">
                      {isMissing ? (
                        <span className="font-mono font-bold text-xs text-[#D97706] bg-[#FEF3C7] px-2 py-0.5 rounded">
                          Not Available
                        </span>
                      ) : (
                        <span className="font-mono font-bold text-xs text-[#0B0F19]">
                          {p.value}{' '}
                          <span className="text-[11px] font-normal text-[#64748B]">
                            {p.unit}
                          </span>
                        </span>
                      )}
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4">
                      <span className="text-[11px] text-[#64748B] font-medium">
                        {p.category}
                      </span>
                    </td>

                    {/* Citation */}
                    <td className="py-3 px-4 max-w-xs">
                      <div className="text-[11px] text-[#1E293B] truncate" title={p.citation}>
                        {p.citation}
                      </div>
                    </td>

                    {/* AI Confidence % */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-1.5 rounded-full bg-[#E2E4DC] overflow-hidden">
                          <div
                            className={`h-full ${
                              p.confidencePct >= 90
                                ? 'bg-[#16A34A]'
                                : p.confidencePct >= 70
                                ? 'bg-[#D97706]'
                                : 'bg-[#DC2626]'
                            }`}
                            style={{ width: `${p.confidencePct}%` }}
                          />
                        </div>
                        <span className="font-mono text-[11px] font-semibold text-[#1E293B]">
                          {p.confidencePct}%
                        </span>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3 px-4">
                      {isVerified ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#DCFCE7] text-[#16A34A] border border-[#16A34A]/20">
                          <CheckCircle2 className="w-3 h-3" />
                          Verified
                        </span>
                      ) : isNeedsReview ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FEF3C7] text-[#D97706] border border-[#D97706]/30">
                          <AlertTriangle className="w-3 h-3" />
                          Needs Review
                        </span>
                      ) : isMissing ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FEE2E2] text-[#DC2626] border border-[#DC2626]/30">
                          <AlertTriangle className="w-3 h-3" />
                          Lab Assay Req.
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-surface-subtle text-[#64748B]">
                          Provisional
                        </span>
                      )}
                    </td>

                    {/* Action: Review / Correct */}
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setEditingParameter(p)}
                        className="px-2.5 py-1 text-xs font-semibold text-[#1E293B] hover:text-[#D1343A] bg-surface hover:bg-[#FDF2F2] border border-[#E2E4DC] hover:border-[#D1343A]/40 rounded-lg transition-all shadow-subtle cursor-pointer"
                      >
                        {isMissing ? 'Input / Certify' : 'Review / Correct'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Audit Review Modal */}
      <ReviewParamModal />
    </div>
  );
};
