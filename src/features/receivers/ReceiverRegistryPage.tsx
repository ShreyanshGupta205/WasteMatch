import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  CheckCircle2,
  AlertCircle,
  FileText,
  UploadCloud,
  X,
  Search,
  Filter,
  ArrowRight,
  ShieldCheck,
  Check,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { useDemoStore } from '../../store/demoStore';
import { ReceiverProfile } from '../../mock/types';

export const ReceiverRegistryPage: React.FC = () => {
  const { receiverProfiles, claimProfile } = useDemoStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Verified' | 'Claimed' | 'Unverified'>('All');
  const [selectedProfileForClaim, setSelectedProfileForClaim] = useState<ReceiverProfile | null>(null);

  // Form states for Claim Drawer
  const [claimEmail, setClaimEmail] = useState('');
  const [pdfAttached, setPdfAttached] = useState(false);
  const [chlorideMax, setChlorideMax] = useState('0.10');
  const [calorificMin, setCalorificMin] = useState('1.5');
  const [metalLimit, setMetalLimit] = useState('100');
  const [gateHours, setGateHours] = useState('06:00 - 22:00 Daily');

  const filtered = receiverProfiles.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.authorisedCategories.some((c) => c.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenClaim = (profile: ReceiverProfile) => {
    setSelectedProfileForClaim(profile);
    setClaimEmail('');
    setPdfAttached(false);
    if (profile.limits) {
      setChlorideMax(String(profile.limits.chlorideMaxPct));
      setCalorificMin(String(profile.limits.minCalorificMjKg));
      setMetalLimit(String(profile.limits.metalLimitsPpm));
      setGateHours(profile.limits.acceptedHours);
    }
  };

  const handleSaveClaim = async () => {
    if (!selectedProfileForClaim) return;
    await claimProfile(selectedProfileForClaim.id, claimEmail || 'compliance@facility.demo', {
      chlorideMaxPct: parseFloat(chlorideMax) || 0.10,
      minCalorificMjKg: parseFloat(calorificMin) || 1.5,
      metalLimitsPpm: parseFloat(metalLimit) || 100,
      acceptedHours: gateHours,
    });
    setSelectedProfileForClaim(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-600 mb-1">
            <span>Directory & Onboarding</span>
            <span>•</span>
            <span>Public Authorization Index</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink-primary font-display">
            Authorized Receiver Registry
          </h1>
          <p className="text-sm text-ink-secondary mt-1">
            Receiver profiles are seeded from public SPCB/CPCB authorisation lists, then claimed and completed by the receiver.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/matching"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface border border-surface-muted text-xs font-bold text-ink-primary hover:border-brand-300 transition-colors shadow-subtle"
          >
            <span>Back to Matching</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-surface rounded-2xl p-4 border border-surface-subtle shadow-card mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-ink-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search facility name, state, material..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-surface-subtle border border-surface-muted text-xs sm:text-sm text-ink-primary focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs text-ink-muted mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Status:
          </span>
          {(['All', 'Verified', 'Claimed', 'Unverified'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                statusFilter === st
                  ? 'bg-brand-600 text-white'
                  : 'bg-surface-subtle text-ink-secondary hover:text-ink-primary border border-surface-muted'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Registry Table */}
      <div className="bg-surface rounded-3xl border border-surface-subtle shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead className="bg-surface-subtle text-ink-secondary font-semibold border-b border-surface-muted">
              <tr>
                <th className="py-3.5 px-4">Facility Name & Location</th>
                <th className="py-3.5 px-4">Authorised Waste Streams</th>
                <th className="py-3.5 px-3">Monthly Capacity</th>
                <th className="py-3.5 px-3">Registry Source</th>
                <th className="py-3.5 px-3">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-subtle">
              {filtered.map((profile) => (
                <tr key={profile.id} className="hover:bg-surface-subtle/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-ink-primary flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-brand-600 flex-shrink-0" />
                      <span>{profile.name}</span>
                    </div>
                    <div className="text-[11px] text-ink-secondary font-normal mt-0.5">
                      {profile.city}, {profile.state} • {profile.industry}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {profile.authorisedCategories.map((cat, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[10px] font-semibold bg-surface-subtle border border-surface-muted text-ink-secondary"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3.5 px-3 font-semibold text-ink-primary whitespace-nowrap">
                    {profile.monthlyCapacityTonnes} t / mo
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                      {profile.sourceBadge}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        profile.status === 'Verified'
                          ? 'bg-status-success-bg text-status-success'
                          : profile.status === 'Claimed'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-surface-muted text-ink-muted'
                      }`}
                    >
                      {profile.status === 'Verified' && <CheckCircle2 className="w-3 h-3" />}
                      <span>{profile.status}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    {profile.status === 'Unverified' ? (
                      <button
                        onClick={() => handleOpenClaim(profile)}
                        className="px-3 py-1.5 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-700 font-bold text-xs border border-brand-200 transition-colors shadow-subtle"
                      >
                        Claim this profile
                      </button>
                    ) : profile.status === 'Claimed' ? (
                      <button
                        onClick={() => handleOpenClaim(profile)}
                        className="px-3 py-1.5 rounded-xl bg-surface border border-surface-muted hover:border-brand-300 text-ink-secondary text-xs font-semibold"
                      >
                        Update Intake Specs
                      </button>
                    ) : (
                      <span className="text-[11px] font-bold text-status-success flex items-center justify-end gap-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>Active Solver Match</span>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Claim & Onboarding Profile Drawer */}
      {selectedProfileForClaim && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-ink-primary/50 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-xl bg-surface h-full shadow-elevated flex flex-col animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div className="p-6 border-b border-surface-subtle flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-brand-100 text-brand-700 text-xs font-bold uppercase">
                    Facility Onboarding
                  </span>
                  <span className="text-xs text-ink-muted">Claim Public Profile</span>
                </div>
                <h3 className="text-lg font-bold text-ink-primary mt-1">
                  {selectedProfileForClaim.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProfileForClaim(null)}
                className="p-2 rounded-xl text-ink-secondary hover:text-ink-primary hover:bg-surface-subtle transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {/* Step 1: Pre-filled public data */}
              <div className="p-4 rounded-2xl bg-surface-subtle border border-surface-muted text-xs space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-ink-muted block">
                  1. Pre-Filled from Public Record (Read-Only)
                </span>
                <div className="flex justify-between">
                  <span className="text-ink-secondary">Location:</span>
                  <strong className="text-ink-primary">{selectedProfileForClaim.city}, {selectedProfileForClaim.state}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-secondary">Capacity:</span>
                  <strong className="text-ink-primary">{selectedProfileForClaim.monthlyCapacityTonnes} Tonnes / month</strong>
                </div>
                <div>
                  <span className="text-ink-secondary block mb-1">Permitted Waste Streams:</span>
                  <div className="flex flex-wrap gap-1">
                    {selectedProfileForClaim.authorisedCategories.map((c, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-surface border border-surface-muted text-[10px] font-medium text-ink-primary">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 2: Verification */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-ink-primary block">
                  2. Facility Verification
                </span>
                <div>
                  <label className="block text-xs font-semibold text-ink-secondary mb-1">
                    Work Email (Domain verification)
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. compliance@facility.com"
                    value={claimEmail}
                    onChange={(e) => setClaimEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-muted text-xs sm:text-sm text-ink-primary focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                {/* Upload Auth PDF tile */}
                <div
                  onClick={() => setPdfAttached(true)}
                  className={`p-4 rounded-xl border border-dashed cursor-pointer transition-all flex items-center justify-between ${
                    pdfAttached
                      ? 'bg-status-success-bg/30 border-status-success'
                      : 'bg-surface-subtle hover:bg-surface border-surface-muted hover:border-brand-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FileText className={`w-5 h-5 ${pdfAttached ? 'text-status-success' : 'text-ink-muted'}`} />
                    <div>
                      <div className="text-xs font-bold text-ink-primary">
                        {pdfAttached ? 'SPCB_Authorisation_Consent_Valid.pdf' : 'Attach SPCB Authorisation PDF'}
                      </div>
                      <div className="text-[10px] text-ink-muted">
                        {pdfAttached ? 'Verified digital watermark signature' : 'Click to attach any sample PDF'}
                      </div>
                    </div>
                  </div>
                  {pdfAttached ? (
                    <span className="text-xs font-bold text-status-success flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Attached
                    </span>
                  ) : (
                    <UploadCloud className="w-4 h-4 text-ink-muted" />
                  )}
                </div>
              </div>

              {/* Step 3: Acceptance Profile Form */}
              <div className="space-y-3 pt-2 border-t border-surface-subtle">
                <span className="text-xs font-bold text-ink-primary block">
                  3. Acceptance Profile & Quality Envelopes
                </span>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-semibold text-ink-secondary mb-1">
                      Chloride Max Cap (%)
                    </label>
                    <input
                      type="text"
                      value={chlorideMax}
                      onChange={(e) => setChlorideMax(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl border border-surface-muted bg-surface text-ink-primary"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-ink-secondary mb-1">
                      Min Calorific Value (MJ/kg)
                    </label>
                    <input
                      type="text"
                      value={calorificMin}
                      onChange={(e) => setCalorificMin(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl border border-surface-muted bg-surface text-ink-primary"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-ink-secondary mb-1">
                      Heavy Metal Cap (ppm)
                    </label>
                    <input
                      type="text"
                      value={metalLimit}
                      onChange={(e) => setMetalLimit(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl border border-surface-muted bg-surface text-ink-primary"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-ink-secondary mb-1">
                      Gate Receiving Hours
                    </label>
                    <input
                      type="text"
                      value={gateHours}
                      onChange={(e) => setGateHours(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl border border-surface-muted bg-surface text-ink-primary"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-surface-subtle bg-surface-subtle/50 flex items-center justify-between">
              <button
                onClick={() => setSelectedProfileForClaim(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-ink-secondary hover:text-ink-primary"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveClaim}
                className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-card active:scale-95 transition-all"
              >
                Verify & Activate Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

