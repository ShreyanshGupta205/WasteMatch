import React, { useState } from 'react';
import {
  FlaskConical,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Star,
  ExternalLink,
  Search,
  UploadCloud,
  CheckCircle2,
  Info,
} from 'lucide-react';
import { useDashboardStore } from '../../store/dashboardStore';

export const SellerLabsPage: React.FC = () => {
  const { labsDirectory, currentUser, wasteStreams, uploadLabReport } = useDashboardStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadedStreamId, setUploadedStreamId] = useState<string>('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const filteredLabs = labsDirectory.filter(
    (l) =>
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.testTypes.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUploadReport = (streamId: string) => {
    uploadLabReport(streamId);
    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E2E4DC]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-[#0B0F19]">
              Partner NABL-Accredited Labs Near Me
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#FEF3C7] text-[#D97706] border border-[#D97706]/30">
              Reference Directory · PIN {currentUser.pincode || '201010'}
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-0.5">
            Accredited Chemical Testing Laboratories for Heavy Metals, Halogens, TCLP & Calorific Value
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search lab name or test..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs text-[#0B0F19] bg-surface border border-[#E2E4DC] rounded-xl focus:outline-none focus:border-[#D1343A]"
          />
        </div>
      </div>

      {/* Regulatory Context Notice */}
      <div className="p-4 rounded-xl bg-[#FFFBEB] border border-[#D97706]/30 flex items-start gap-3.5">
        <Info className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs text-[#1E293B]">
          <span className="font-bold uppercase tracking-wider text-[11px] text-[#D97706] block">
            HOW THE NABL LAB REFERRAL WORKS (MVP PROTOCOL)
          </span>
          <p className="leading-relaxed">
            WasteMatch does not collect testing fees, schedule sample couriers, or handle samples. This directory is provided so generators can <strong className="text-[#0B0F19]">contact accredited NABL testing laboratories independently</strong> to commission required heavy metals / TCLP assays. Once you receive your certified PDF assay, upload it via the upload drawer below to upgrade your stream's AI fingerprint confidence to <strong className="text-[#16A34A]">High</strong>.
          </p>
        </div>
      </div>

      {uploadSuccess && (
        <div className="p-4 rounded-xl bg-[#DCFCE7] border border-[#16A34A]/30 text-xs font-bold text-[#16A34A] flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          <span>Lab report uploaded and AI fingerprint updated to High confidence.</span>
        </div>
      )}

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredLabs.map((lab) => (
          <div
            key={lab.id}
            className="p-6 rounded-2xl bg-surface border border-[#E2E4DC] hover:border-[#D1343A]/40 transition-all shadow-subtle flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2.5">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#16A34A] bg-[#DCFCE7] px-2 py-0.5 rounded border border-[#16A34A]/20">
                    {lab.nablRegNo}
                  </span>
                  <h3 className="text-base font-bold text-[#0B0F19] mt-1.5 leading-snug">
                    {lab.name}
                  </h3>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-[#1E293B] bg-surface-subtle px-2 py-0.5 rounded">
                  <Star className="w-3.5 h-3.5 fill-[#D97706] text-[#D97706]" />
                  <span>{lab.rating}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                <MapPin className="w-3.5 h-3.5 text-[#64748B] shrink-0" />
                <span>{lab.address}, {lab.city}, {lab.state} - {lab.pincode}</span>
                <span className="font-mono font-bold text-[#0B0F19]">({lab.distanceKm} km away)</span>
              </div>

              <div className="p-3.5 rounded-xl bg-surface-subtle border border-[#E2E4DC] space-y-1.5 text-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                  Accredited Test Types Offered
                </span>
                <p className="text-[11px] text-[#1E293B] font-medium leading-relaxed">
                  {lab.testTypes}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E2E4DC] space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#64748B]">Indicative Pricing</span>
                  <div className="text-sm font-mono font-bold text-[#16A34A]">
                    {lab.indicativePricing}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#64748B]">Turnaround Time</span>
                  <div className="font-semibold text-[#1E293B]">
                    {lab.turnaroundDays} Business Days
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#F8F6F5] border border-[#E2E4DC] flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#0B0F19]">
                  <Phone className="w-4 h-4 text-[#D1343A]" />
                  <span>{lab.contactPhone}</span>
                </div>
                <a
                  href={`tel:${lab.contactPhone}`}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-[#D1343A] hover:bg-[#A81818] transition-colors flex items-center gap-1"
                >
                  <span>Contact Lab</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Received Lab Report Card */}
      <div className="p-6 rounded-2xl bg-surface border border-[#E2E4DC] shadow-subtle space-y-4">
        <h3 className="text-sm font-bold text-[#0B0F19] flex items-center gap-2 pb-3 border-b border-[#E2E4DC]">
          <UploadCloud className="w-4 h-4 text-[#D1343A]" />
          <span>Upload External Lab Report for Reprocessing</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#0B0F19]">Select Waste Stream to Attach Report</label>
            <select
              value={uploadedStreamId}
              onChange={(e) => setUploadedStreamId(e.target.value)}
              className="w-full px-3.5 py-2 text-xs text-[#0B0F19] bg-surface-subtle border border-[#E2E4DC] rounded-xl focus:outline-none focus:border-[#D1343A]"
            >
              <option value="">-- Choose Stream --</option>
              {wasteStreams.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.estimatedMonthlyQuantityTonnes} MT) {s.hasLabReport ? '· Report Attached' : '· Missing Lab Report'}
                </option>
              ))}
            </select>
          </div>

          <div className="pt-5">
            <button
              onClick={() => handleUploadReport(uploadedStreamId || wasteStreams[1]?.id || wasteStreams[0].id)}
              className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-[#D1343A] hover:bg-[#A81818] transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Simulate Report Upload & Reprocess Fingerprint</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
