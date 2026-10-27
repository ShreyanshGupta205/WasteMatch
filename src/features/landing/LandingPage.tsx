import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  Fingerprint,
  ShieldCheck,
  TrendingUp,
  Truck,
  CheckCircle2,
  BarChart3,
  Flame,
  Leaf,
  Layers,
  Building2,
  Factory,
  FlaskConical,
  Scale,
  FileText,
  Clock,
  ExternalLink,
  ChevronRight,
  Shield,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-[#F8F6F5] text-[#0B0F19] selection:bg-red-50 selection:text-[#D1343A]">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden border-b border-[#E2E4DC]">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#E2E4DC_1px,transparent_1px),linear-gradient(to_bottom,#E2E4DC_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Regulatory Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E2E4DC] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
              <span className="text-xs font-semibold text-stone-700 tracking-wide">
                SPCB Hazardous Waste (M&THM) Rules 2016 Compliant Engine
              </span>
            </div>

            {/* Primary Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#0B0F19] leading-[1.12]">
              Turn Industrial Waste Costs Into{' '}
              <span className="text-[#D1343A] underline decoration-red-200 decoration-wavy decoration-2">
                Resource Revenue.
              </span>
            </h1>

            {/* Clean Sub-headline */}
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto">
              WasteMatch connects industrial byproduct generators with certified co-processing kilns across India. Powered by AI chemical fingerprinting, Form 10 digital manifests, and tripartite escrow settlement.
            </p>

            {/* Primary CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link
                to="/seller"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#D1343A] hover:bg-[#A81818] text-white font-semibold text-sm shadow-md transition-all active:scale-98"
              >
                <span>Launch Seller Portal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-stone-50 text-stone-900 font-semibold text-sm border border-[#E2E4DC] shadow-sm transition-all"
              >
                <Sparkles className="w-4 h-4 text-[#D1343A]" />
                <span>1-Click Demo Personas</span>
              </Link>
            </div>

            {/* Trust Pill */}
            <div className="pt-3 flex flex-wrap items-center justify-center gap-4 text-xs text-stone-500 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                Exactly 3 Isolated Portals
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                NABL Testing Laboratory Referrals
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                Form 10 Manifests & Form 3 SPCB Pack
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE 3 ROLE-BASED DASHBOARDS SECTION */}
      <section className="py-16 md:py-24 bg-white border-b border-[#E2E4DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-50 text-[#D1343A] border border-red-100">
              Platform Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B0F19] mt-3">
              Three Dedicated Workspaces. Zero Third-Party Confusion.
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2">
              Transporters and testing laboratories are reference directory entities. All platform workflows run strictly within 3 isolated role-based portals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Dashboard 1 Card */}
            <div className="p-6 rounded-2xl bg-[#F8F6F5] border border-[#E2E4DC] hover:border-[#D1343A] hover:bg-white transition-all shadow-sm flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center font-bold">
                    <Factory className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-orange-50 text-orange-800 border border-orange-200">
                    Dashboard 1
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#0B0F19]">
                    Seller / Waste Generator
                  </h3>
                  <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                    Designed for industrial manufacturing plants producing recyclable chemical byproducts.
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-stone-200/60 text-xs text-stone-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                    <span>AI Chemical Fingerprinting (50 Parameters)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FlaskConical className="w-4 h-4 text-[#D97706] shrink-0" />
                    <span className="font-semibold text-stone-900">
                      Prominent "Find Labs Near Me" Button
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                    <span>Form 10 Manifests & TREM Emergency Cards</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                    <span>Annual SPCB Form 3 Regulatory Export</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Link
                  to="/seller"
                  className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-stone-50 border border-stone-300 group-hover:border-[#D1343A] group-hover:bg-[#D1343A] group-hover:text-white text-stone-900 text-xs font-bold transition flex items-center justify-center gap-2"
                >
                  <span>Open Seller Portal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Dashboard 2 Card */}
            <div className="p-6 rounded-2xl bg-[#F8F6F5] border border-[#E2E4DC] hover:border-[#2563EB] hover:bg-white transition-all shadow-sm flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-800 border border-blue-200">
                    Dashboard 2
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#0B0F19]">
                    Buyer / Receiver Kiln
                  </h3>
                  <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                    Designed for certified cement kilns, AFR facilities, and co-processors substituting virgin minerals.
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-stone-200/60 text-xs text-stone-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                    <span>SPCB Authorized Waste Categories Verifier</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                    <span>Acceptance Envelopes (pH, Cl, Moisture)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                    <span className="font-semibold text-stone-900">Gate QC Inspection & Escrow Trigger</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                    <span>Official Diversion Certificate Issuance</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Link
                  to="/buyer"
                  className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-stone-50 border border-stone-300 group-hover:border-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white text-stone-900 text-xs font-bold transition flex items-center justify-center gap-2"
                >
                  <span>Open Buyer Portal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Dashboard 3 Card */}
            <div className="p-6 rounded-2xl bg-[#F8F6F5] border border-[#E2E4DC] hover:border-stone-800 hover:bg-white transition-all shadow-sm flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-stone-200 text-stone-800 flex items-center justify-center font-bold">
                    <Shield className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-stone-100 text-stone-800 border border-stone-300">
                    Dashboard 3
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#0B0F19]">
                    Central Administration
                  </h3>
                  <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                    Designed for operations compliance admins to govern platform KYC, dispute arbitrations, and directory data.
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-stone-200/60 text-xs text-stone-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                    <span>Entity KYC & SPCB Consent Scrutiny</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                    <span>Global Escrow Custody Ledger (Held/Released)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                    <span>Gate Assay Dispute Arbitration Queue</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                    <span>NABL Lab & Transporter Directory Management</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Link
                  to="/admin"
                  className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-stone-50 border border-stone-300 group-hover:border-stone-900 group-hover:bg-stone-900 group-hover:text-white text-stone-900 text-xs font-bold transition flex items-center justify-center gap-2"
                >
                  <span>Open Admin Console</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LIVE INDUSTRIAL SYMBIOSIS SHOWCASE */}
      <section className="py-16 md:py-24 bg-[#F8F6F5] border-b border-[#E2E4DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-[#E2E4DC] p-8 md:p-12 shadow-sm">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-8 border-b border-stone-200">
              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Live Hero Match Scenario • Delhi NCR Corridor
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B0F19]">
                  Shree Ganesh Galvanizers ➔ Aravali Cement Kiln
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 max-w-2xl">
                  Turning 12 tonnes of acidic pickle liquor disposal liability into a high-grade bauxite/hematite iron flux substitute in clinker manufacturing.
                </p>
              </div>

              <div className="bg-[#F8F6F5] border border-stone-200 rounded-2xl p-4 text-right shrink-0">
                <span className="text-xs text-stone-500 block">Generator Economic Gain</span>
                <div className="text-2xl font-bold font-mono text-emerald-600 mt-0.5">
                  +₹40,550
                </div>
                <span className="text-[11px] text-stone-500">avoiding ₹48k landfill penalty</span>
              </div>
            </div>

            {/* Chemical & Logistics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
              {/* Chemical Assay Box */}
              <div className="p-5 rounded-2xl bg-[#F8F6F5] border border-stone-200 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-stone-800">
                  <span>AI Chemical Passport</span>
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono">
                    NABL Verified
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white p-2.5 rounded-xl border border-stone-200">
                    <span className="text-stone-500 block text-[10px]">pH Value</span>
                    <span className="font-mono font-bold text-stone-900 text-sm">0.85</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-stone-200">
                    <span className="text-stone-500 block text-[10px]">Chlorides (Cl⁻)</span>
                    <span className="font-mono font-bold text-stone-900 text-sm">18.2%</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-stone-200">
                    <span className="text-stone-500 block text-[10px]">Iron (Fe²⁺/Fe³⁺)</span>
                    <span className="font-mono font-bold text-stone-900 text-sm">11.85%</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-stone-200">
                    <span className="text-stone-500 block text-[10px]">Hazard Class</span>
                    <span className="font-mono font-bold text-red-600 text-sm">Class 8 UN1789</span>
                  </div>
                </div>
              </div>

              {/* Regulatory Logistics Box */}
              <div className="p-5 rounded-2xl bg-[#F8F6F5] border border-stone-200 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-stone-800">
                  <span>Manifest & Route Specs</span>
                  <span className="text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-mono">
                    Form 10
                  </span>
                </div>
                <div className="space-y-1.5 text-xs text-stone-700">
                  <div className="flex justify-between py-1 border-b border-stone-200/60">
                    <span className="text-stone-500">Manifest No:</span>
                    <span className="font-mono font-bold text-stone-900">FORM10-UP-2026-9042</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-200/60">
                    <span className="text-stone-500">Corridor Transit:</span>
                    <span className="font-medium text-stone-900">Ghaziabad, UP ➔ Nimbahera, RJ</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-200/60">
                    <span className="text-stone-500">Distance & Tanker:</span>
                    <span className="font-medium text-stone-900">820 km (Rubber-lined Ebonite)</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-stone-500">Estimated CO₂e Offset:</span>
                    <span className="font-bold text-emerald-700">1.60 MT CO₂e avoided</span>
                  </div>
                </div>
              </div>

              {/* Escrow Settlement Box */}
              <div className="p-5 rounded-2xl bg-[#F8F6F5] border border-stone-200 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-stone-800">
                  <span>Tripartite Escrow Ledger</span>
                  <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-mono">
                    ICICI Custodial
                  </span>
                </div>
                <div className="space-y-1.5 text-xs text-stone-700">
                  <div className="flex justify-between py-1 border-b border-stone-200/60">
                    <span className="text-stone-500">Offer Value:</span>
                    <span className="font-mono font-bold text-stone-900">₹1,250 / MT</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-200/60">
                    <span className="text-stone-500">Escrow Deposit:</span>
                    <span className="font-mono font-bold text-stone-900">₹15,000 Locked</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-200/60">
                    <span className="text-stone-500">Disbursement Gate:</span>
                    <span className="text-stone-900 font-medium">Automatic on Gate QC Pass</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-stone-500">Statutory Certificate:</span>
                    <span className="text-stone-900 font-medium">Receiver Diversion Cert</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS: 4 SIMPLE STEPS */}
      <section className="py-16 md:py-24 bg-white border-b border-[#E2E4DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-stone-100 text-stone-700">
              End-to-End Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B0F19] mt-3">
              How WasteMatch Operates Under Indian Environmental Law
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2">
              From characterization to escrow disbursement, each step is designed for SPCB compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-[#F8F6F5] border border-stone-200 space-y-3 relative">
              <span className="w-7 h-7 rounded-full bg-[#D1343A] text-white flex items-center justify-center font-bold text-xs font-mono">
                1
              </span>
              <h4 className="text-base font-bold text-stone-900">
                Stream Characterization
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                SMEs upload process details. If no lab report is attached, the prominent <strong>"Find Labs Near Me"</strong> button refers nearby NABL labs for offline testing.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-[#F8F6F5] border border-stone-200 space-y-3 relative">
              <span className="w-7 h-7 rounded-full bg-stone-900 text-white flex items-center justify-center font-bold text-xs font-mono">
                2
              </span>
              <h4 className="text-base font-bold text-stone-900">
                Co-Processing Match
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                WasteMatch evaluates receiver SPCB authorizations, matching waste streams with cement kilns whose acceptance envelopes allow the material.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-[#F8F6F5] border border-stone-200 space-y-3 relative">
              <span className="w-7 h-7 rounded-full bg-stone-900 text-white flex items-center justify-center font-bold text-xs font-mono">
                3
              </span>
              <h4 className="text-base font-bold text-stone-900">
                Form 10 Manifest & Transit
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Generator issues pre-filled Form 10 manifests and TREM cards. Authorized haulers are selected from the reference directory with manual milestone logging.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-2xl bg-[#F8F6F5] border border-stone-200 space-y-3 relative">
              <span className="w-7 h-7 rounded-full bg-[#16A34A] text-white flex items-center justify-center font-bold text-xs font-mono">
                4
              </span>
              <h4 className="text-base font-bold text-stone-900">
                Gate QC & Escrow Release
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Receiver uploads signed Form 10 Copy 4, verifies incoming chemical assay, and releases escrow funds. An official Diversion Certificate is generated.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. NATIONAL STATS STRIP */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-[#F8F6F5] border border-stone-200">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Annual Loss in India
              </span>
              <div className="text-3xl font-extrabold text-[#D1343A] font-mono mt-1">
                ₹252 Lakh Cr
              </div>
              <p className="text-xs text-stone-600 mt-1">
                Valuable byproducts dumped into landfills due to lack of verified off-takers
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8F6F5] border border-stone-200">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Co-Processing Potential
              </span>
              <div className="text-3xl font-extrabold text-[#16A34A] font-mono mt-1">
                70%
              </div>
              <p className="text-xs text-stone-600 mt-1">
                Of manufacturing waste has an authorized secondary raw material use
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8F6F5] border border-stone-200">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                SME Truckload Barrier
              </span>
              <div className="text-3xl font-extrabold text-stone-900 font-mono mt-1">
                85%
              </div>
              <p className="text-xs text-stone-600 mt-1">
                Of small manufacturing plants generate partial truckloads, requiring consolidation
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
