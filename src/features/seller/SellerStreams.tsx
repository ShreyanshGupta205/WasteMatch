import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  FlaskConical,
  Plus,
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  HelpCircle,
  FileCheck,
  Send,
} from 'lucide-react';
import { useDashboardStore, WasteStreamItem } from '../../store/dashboardStore';

export const SellerStreams: React.FC = () => {
  const navigate = useNavigate();
  const {
    wasteStreams,
    createWasteStream,
    uploadLabReport,
    publishListing,
    openLabReferralModal,
  } = useDashboardStore();

  const [isCreating, setIsCreating] = useState(false);
  const [streamName, setStreamName] = useState('');
  const [sourceProcess, setSourceProcess] = useState('');
  const [physicalForm, setPhysicalForm] = useState<'liquid' | 'solid' | 'sludge' | 'oily'>('liquid');
  const [quantity, setQuantity] = useState('10.0');
  const [location, setLocation] = useState('Site-4 Industrial Area, Sahibabad');
  const [pincode, setPincode] = useState('201010');
  const [hasReportChecked, setHasReportChecked] = useState(false);

  const [activeTab, setActiveTab] = useState<'all' | 'needsLab' | 'listed'>('all');

  const needsLabStreams = wasteStreams.filter((s) => !s.hasLabReport || Object.values(s.confidenceScores).some((val) => val === 'Low'));
  const listedStreams = wasteStreams.filter((s) => s.status === 'Listed');
  const displayedStreams =
    activeTab === 'all' ? wasteStreams : activeTab === 'needsLab' ? needsLabStreams : listedStreams;

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!streamName.trim()) return;

    createWasteStream({
      name: streamName,
      sourceProcess,
      physicalForm,
      estimatedMonthlyQuantityTonnes: Number(quantity) || 10.0,
      locationAddress: location,
      pincode,
      hasLabReport: hasReportChecked,
    });

    setIsCreating(false);
    setStreamName('');
    setSourceProcess('');
  };


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E2E4DC]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-[#0B0F19]">
              Waste Stream Management & AI Fingerprinting
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-surface-subtle text-[#1E293B] border border-[#E2E4DC]">
              {wasteStreams.length} Streams Active
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-0.5">
            Characterize Industrial Byproducts, Trigger NABL Lab Verification & Publish Marketplace Listings
          </p>
        </div>

        <button
          onClick={() => setIsCreating(!isCreating)}
          className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#D1343A] hover:bg-[#A81818] transition-colors shadow-subtle flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{isCreating ? 'Cancel Creation' : 'Create New Waste Stream'}</span>
        </button>
      </div>

      {/* New Stream Creation Drawer / Form */}
      {isCreating && (
        <form onSubmit={handleCreateSubmit} className="p-6 rounded-2xl bg-surface border-2 border-[#D1343A]/30 shadow-card space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E4DC]">
            <h3 className="text-sm font-bold text-[#0B0F19] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D1343A]" />
              <span>Register New Byproduct Stream for AI Fingerprinting</span>
            </h3>
            <span className="text-xs text-[#64748B]">All fields mandatory under HW Rules 2016</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#0B0F19]">Waste Stream Name</label>
              <input
                type="text"
                placeholder="e.g. Spent Hydrochloric Acid"
                value={streamName}
                onChange={(e) => setStreamName(e.target.value)}
                required
                className="w-full px-3.5 py-2 text-xs text-[#0B0F19] bg-surface-subtle border border-[#E2E4DC] rounded-xl focus:outline-none focus:border-[#D1343A]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#0B0F19]">Source Process</label>
              <input
                type="text"
                placeholder="e.g. Mild steel surface finishing"
                value={sourceProcess}
                onChange={(e) => setSourceProcess(e.target.value)}
                required
                className="w-full px-3.5 py-2 text-xs text-[#0B0F19] bg-surface-subtle border border-[#E2E4DC] rounded-xl focus:outline-none focus:border-[#D1343A]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#0B0F19]">Physical Form</label>
              <select
                value={physicalForm}
                onChange={(e) => setPhysicalForm(e.target.value as any)}
                className="w-full px-3.5 py-2 text-xs text-[#0B0F19] bg-surface-subtle border border-[#E2E4DC] rounded-xl focus:outline-none focus:border-[#D1343A]"
              >
                <option value="liquid">Liquid</option>
                <option value="sludge">Sludge</option>
                <option value="solid">Solid</option>
                <option value="oily">Oily</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#0B0F19]">Estimated Monthly Quantity (MT)</label>
              <input
                type="number"
                step="0.5"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                className="w-full px-3.5 py-2 text-xs font-mono font-bold text-[#0B0F19] bg-surface-subtle border border-[#E2E4DC] rounded-xl focus:outline-none focus:border-[#D1343A]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#0B0F19]">Factory Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3.5 py-2 text-xs text-[#0B0F19] bg-surface-subtle border border-[#E2E4DC] rounded-xl focus:outline-none focus:border-[#D1343A]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#0B0F19]">PIN Code</label>
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full px-3.5 py-2 text-xs font-mono font-bold text-[#0B0F19] bg-surface-subtle border border-[#E2E4DC] rounded-xl focus:outline-none focus:border-[#D1343A]"
              />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-subtle border border-[#E2E4DC] flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-[#0B0F19]">
                Do you have an existing NABL / SGS certified chemical lab report?
              </span>
              <p className="text-[11px] text-[#64748B]">
                If unchecked, AI will synthesize provisional fingerprint and trigger the <strong>"Find Labs Near Me"</strong> button.
              </p>
            </div>
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#1E293B]">
              <input
                type="checkbox"
                checked={hasReportChecked}
                onChange={(e) => setHasReportChecked(e.target.checked)}
                className="rounded text-[#D1343A] focus:ring-[#D1343A]"
              />
              <span>Yes, I have Lab Assay</span>
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 text-xs font-semibold text-[#64748B] hover:text-[#0B0F19]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#D1343A] hover:bg-[#A81818] shadow-sm cursor-pointer"
            >
              Generate AI Chemical Fingerprint
            </button>
          </div>
        </form>
      )}

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#E2E4DC] pb-3">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
            activeTab === 'all'
              ? 'bg-[#0B0F19] text-white shadow-sm'
              : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          All Streams ({wasteStreams.length})
        </button>
        <button
          onClick={() => setActiveTab('needsLab')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            activeTab === 'needsLab'
              ? 'bg-[#D97706] text-white shadow-sm'
              : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#D97706]" />
          Needs NABL Lab Report ({needsLabStreams.length})
        </button>
        <button
          onClick={() => setActiveTab('listed')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            activeTab === 'listed'
              ? 'bg-[#16A34A] text-white shadow-sm'
              : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
          Marketplace Listed ({listedStreams.length})
        </button>
      </div>

      {/* List of Active Waste Streams */}
      <div className="space-y-5">
        {displayedStreams.map((stream) => {
          // Identify if stream has low confidence or lacks lab report
          const needsLab = !stream.hasLabReport || Object.values(stream.confidenceScores).some((val) => val === 'Low');


          return (
            <div
              key={stream.id}
              className="p-6 rounded-2xl bg-surface border border-[#E2E4DC] shadow-subtle space-y-5"
            >
              {/* Stream Title Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E2E4DC]">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-bold text-[#0B0F19]">{stream.name}</h3>
                    <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-[#FDF2F2] text-[#D1343A] border border-[#D1343A]/20">
                      {stream.hazardClass}
                    </span>
                    <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-surface-subtle text-[#1E293B]">
                      {stream.unNumber}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-semibold ${
                        stream.status === 'Listed'
                          ? 'bg-[#DCFCE7] text-[#16A34A]'
                          : 'bg-surface-subtle text-[#64748B]'
                      }`}
                    >
                      {stream.status === 'Listed' ? 'Marketplace Live' : 'Draft'}
                    </span>
                  </div>
                  <p className="text-xs text-[#64748B] mt-1">
                    Process Origin: <strong className="text-[#1E293B]">{stream.sourceProcess}</strong> · {stream.estimatedMonthlyQuantityTonnes} MT/month · {stream.locationAddress} (PIN {stream.pincode})
                  </p>
                </div>

                {/* Marketplace Publish CTA */}
                <div className="flex items-center gap-2">
                  {stream.status !== 'Listed' ? (
                    <button
                      onClick={() => publishListing(stream.id, 1250)}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#16A34A] hover:bg-[#15803D] transition-colors shadow-subtle flex items-center gap-1.5 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Publish as Live Listing</span>
                    </button>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#DCFCE7] text-[#16A34A] border border-[#16A34A]/30">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Live on Exchange</span>
                    </span>
                  )}
                </div>
              </div>

              {/* AI Chemical Fingerprinting Display */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#64748B] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#D1343A]" />
                    <span>AI Chemical Fingerprint & Extraction Confidence</span>
                  </h4>
                  <span className="text-[11px] text-[#64748B]">
                    Extracted from multimodal documents & historical SPCB batch logs
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
                  {/* Parameter: pH */}
                  <div className="p-3 rounded-xl bg-surface-subtle border border-[#E2E4DC] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[#64748B] font-semibold uppercase">pH Level</span>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                          stream.confidenceScores.pH === 'High'
                            ? 'bg-[#DCFCE7] text-[#16A34A]'
                            : stream.confidenceScores.pH === 'Medium'
                            ? 'bg-[#FEF3C7] text-[#D97706]'
                            : 'bg-[#FEE2E2] text-[#DC2626]'
                        }`}
                      >
                        {stream.confidenceScores.pH || 'Low'}
                      </span>
                    </div>
                    <div className="text-sm font-mono font-bold text-[#0B0F19]">
                      {stream.fingerprint.pH}
                    </div>
                  </div>

                  {/* Parameter: Chloride */}
                  <div className="p-3 rounded-xl bg-surface-subtle border border-[#E2E4DC] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[#64748B] font-semibold uppercase">Chloride (Cl⁻)</span>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                          stream.confidenceScores.chloride === 'High'
                            ? 'bg-[#DCFCE7] text-[#16A34A]'
                            : stream.confidenceScores.chloride === 'Medium'
                            ? 'bg-[#FEF3C7] text-[#D97706]'
                            : 'bg-[#FEE2E2] text-[#DC2626]'
                        }`}
                      >
                        {stream.confidenceScores.chloride || 'Low'}
                      </span>
                    </div>
                    <div className="text-sm font-mono font-bold text-[#0B0F19]">
                      {stream.fingerprint.chloridePpm?.toLocaleString()} ppm
                    </div>
                  </div>

                  {/* Parameter: Heavy Metals */}
                  <div className="p-3 rounded-xl bg-surface-subtle border border-[#E2E4DC] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[#64748B] font-semibold uppercase">Heavy Metals</span>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                          stream.confidenceScores.metals === 'High'
                            ? 'bg-[#DCFCE7] text-[#16A34A]'
                            : stream.confidenceScores.metals === 'Medium'
                            ? 'bg-[#FEF3C7] text-[#D97706]'
                            : 'bg-[#FEE2E2] text-[#DC2626]'
                        }`}
                      >
                        {stream.confidenceScores.metals || 'Low'}
                      </span>
                    </div>
                    <div className="text-sm font-mono font-bold text-[#0B0F19]">
                      {stream.fingerprint.ironPpm ? `${stream.fingerprint.ironPpm.toLocaleString()} ppm Fe` : 'Unverified'}
                    </div>
                  </div>

                  {/* Parameter: Calorific Value */}
                  <div className="p-3 rounded-xl bg-surface-subtle border border-[#E2E4DC] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[#64748B] font-semibold uppercase">Calorific Val</span>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                          stream.confidenceScores.calorificValue === 'High'
                            ? 'bg-[#DCFCE7] text-[#16A34A]'
                            : stream.confidenceScores.calorificValue === 'Medium'
                            ? 'bg-[#FEF3C7] text-[#D97706]'
                            : 'bg-[#FEE2E2] text-[#DC2626]'
                        }`}
                      >
                        {stream.confidenceScores.calorificValue || 'Low'}
                      </span>
                    </div>
                    <div className="text-sm font-mono font-bold text-[#0B0F19]">
                      {stream.fingerprint.calorificValueMjKg} MJ/kg
                    </div>
                  </div>

                  {/* Parameter: Moisture */}
                  <div className="p-3 rounded-xl bg-surface-subtle border border-[#E2E4DC] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[#64748B] font-semibold uppercase">Moisture</span>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                          stream.confidenceScores.moisture === 'High'
                            ? 'bg-[#DCFCE7] text-[#16A34A]'
                            : stream.confidenceScores.moisture === 'Medium'
                            ? 'bg-[#FEF3C7] text-[#D97706]'
                            : 'bg-[#FEE2E2] text-[#DC2626]'
                        }`}
                      >
                        {stream.confidenceScores.moisture || 'Low'}
                      </span>
                    </div>
                    <div className="text-sm font-mono font-bold text-[#0B0F19]">
                      {stream.fingerprint.moisturePct}%
                    </div>
                  </div>

                  {/* Parameter: Hazard Class */}
                  <div className="p-3 rounded-xl bg-surface-subtle border border-[#E2E4DC] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[#64748B] font-semibold uppercase">Hazard Class</span>
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#DCFCE7] text-[#16A34A]">
                        High
                      </span>
                    </div>
                    <div className="text-xs font-mono font-bold text-[#D1343A] truncate">
                      {stream.hazardClass}
                    </div>
                  </div>
                </div>
              </div>

              {/* PROMINENT LAB TEST REFERRAL SECTION:
                  Displayed if stream has NO lab report uploaded OR AI confidence is low */}
              {needsLab && (
                <div className="p-4 rounded-xl bg-gradient-to-r from-[#FFFBEB] to-[#FEF3C7]/40 border-2 border-[#D97706]/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-[#D97706] text-white shrink-0 mt-0.5">
                      <FlaskConical className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#0B0F19]">
                          No Certified Lab Assay Uploaded / Low Trace Confidence
                        </span>
                        <span className="text-[10px] font-bold bg-[#D97706] text-white px-1.5 py-0.2 rounded">
                          Action Required
                        </span>
                      </div>
                      <p className="text-xs text-[#1E293B] max-w-2xl leading-relaxed">
                        Receivers require an accredited NABL assay before accepting delivery. Contact a recommended NABL laboratory near PIN <strong>{stream.pincode}</strong> to commission a targeted assay, then upload the certificate below.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => openLabReferralModal(stream)}
                      className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#D97706] hover:bg-[#b45309] shadow-md flex items-center gap-2 transition active:scale-95 cursor-pointer ring-2 ring-[#D97706]/30"
                    >
                      <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                      <FlaskConical className="w-4 h-4" />
                      <span>Find Labs Near Me</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => uploadLabReport(stream.id)}
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[#1E293B] bg-surface hover:bg-surface-subtle border border-[#E2E4DC] transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <UploadCloud className="w-3.5 h-3.5 text-[#D1343A]" />
                      <span>Upload Lab Report (PDF)</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Already verified lab report state */}
              {stream.hasLabReport && (
                <div className="p-3 rounded-xl bg-[#DCFCE7]/30 border border-[#16A34A]/30 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                    <span className="font-semibold text-[#0B0F19]">
                      Certified Lab Report Attached: {stream.labReportUrl}
                    </span>
                    <span className="text-[10px] text-[#64748B]">
                      (Uploaded {stream.labReportUploadedAt || 'Recently'})
                    </span>
                  </div>
                  <button
                    onClick={() => uploadLabReport(stream.id)}
                    className="text-[11px] font-bold text-[#D1343A] hover:underline"
                  >
                    Replace / Upload New Assay
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
