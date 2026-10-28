import React, { useState } from 'react';
import {
  Flame,
  CheckCircle2,
  XCircle,
  TrendingUp,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
} from 'lucide-react';
import { useDashboardStore } from '../../store/dashboardStore';
import { GemmaMatchExplainerModal } from '../../components/GemmaMatchExplainerModal';

export const BuyerMatches: React.FC = () => {
  const [matchStatus, setMatchStatus] = useState<Record<string, string>>({
    'match-01': 'Ready for Gate Order',
    'match-02': 'Reviewing Analytical Specs',
  });
  const [counterBoxId, setCounterBoxId] = useState<string | null>(null);
  const [counterVal, setCounterVal] = useState('1150');
  const [toast, setToast] = useState<string | null>(null);
  const [explainingMatch, setExplainingMatch] = useState<any | null>(null);

  const incomingFeed = [
    {
      id: 'match-01',
      generatorName: 'Shree Ganesh Galvanizers Plant #2',
      generatorLocation: 'Ghaziabad, UP',
      distanceKm: 820,
      materialName: 'Spent Hydrochloric Acid (UN 1789)',
      quantityTonnes: 12.0,
      askingPricePerTonne: 1250,
      transportEstimate: 69700,
      compatibilityScore: 94,
      co2eOffset: 1.6,
      fingerprint: {
        pH: 0.85,
        chloridesPpm: 182000,
        ironPpm: 118500,
        moisturePct: 68.4,
      },
      confidence: {
        pH: 'High',
        chlorides: 'High',
        iron: 'High',
      },
      matchRationale: 'High iron content (11.85% Fe) acts as direct substitute for mined bauxite/hematite flux in cement clinker.',
    },
    {
      id: 'match-02',
      generatorName: 'Bharat Paper & Board Mills',
      generatorLocation: 'Muzaffarnagar, UP',
      distanceKm: 780,
      materialName: 'Alkaline Lime/Caustic Sludge (UN 3077)',
      quantityTonnes: 9.0,
      askingPricePerTonne: 800,
      transportEstimate: 54000,
      compatibilityScore: 82,
      co2eOffset: 1.1,
      fingerprint: {
        pH: 11.8,
        calciumCarbonatePct: 48.0,
        chloridesPpm: 4500,
        moisturePct: 62.0,
      },
      confidence: {
        pH: 'Medium',
        calciumCarbonate: 'Medium',
        chlorides: 'Low',
      },
      matchRationale: 'Neutralizes raw kiln feed and provides lime buffering for acidic chloride balance.',
    },
  ];

  const handleAction = (id: string, action: 'Accept' | 'Decline' | 'Counter') => {
    if (action === 'Accept') {
      setMatchStatus((prev) => ({ ...prev, [id]: 'Accepted · Escrow Reserved' }));
      setToast('Match accepted! Funds locked in escrow for generator.');
    } else if (action === 'Decline') {
      setMatchStatus((prev) => ({ ...prev, [id]: 'Declined' }));
      setToast('Match declined.');
    } else if (action === 'Counter') {
      setMatchStatus((prev) => ({ ...prev, [id]: `Counter-Offer: ₹${counterVal}/MT Sent` }));
      setCounterBoxId(null);
      setToast(`Counter-offer of ₹${counterVal}/MT sent to generator.`);
    }
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E2E4DC]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-[#0B0F19]">
              Incoming Matches Matching Kiln Acceptance Envelope
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#EFF6FF] text-[#2563EB] border border-[#2563EB]/20">
              {incomingFeed.length} Qualified Feeds
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-0.5">
            Pre-Screened by AI Fingerprinting Engine against Aravali Cement Works Kiln Rules
          </p>
        </div>
      </div>

      {toast && (
        <div className="p-4 rounded-xl bg-[#DCFCE7] border border-[#16A34A]/30 text-xs font-bold text-[#16A34A] flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          <span>{toast}</span>
        </div>
      )}

      {/* Feed Cards */}
      <div className="space-y-5">
        {incomingFeed.map((match) => (
          <div
            key={match.id}
            className="p-6 rounded-2xl bg-surface border border-[#E2E4DC] shadow-subtle space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E2E4DC]">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-[#DCFCE7] text-[#16A34A] px-2 py-0.5 rounded">
                    {match.compatibilityScore}% Compatibility
                  </span>
                  <h3 className="text-base font-bold text-[#0B0F19]">
                    {match.materialName} ({match.quantityTonnes} MT)
                  </h3>
                  <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-[#EFF6FF] text-[#2563EB]">
                    {matchStatus[match.id]}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#64748B] mt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#64748B]" />
                  <span>Generator: <strong className="text-[#0B0F19]">{match.generatorName}</strong> · {match.generatorLocation} ({match.distanceKm} km haul)</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-[#64748B]">Generator Asking Price</span>
                <div className="text-lg font-mono font-bold text-[#16A34A]">
                  ₹{match.askingPricePerTonne.toLocaleString()}/MT
                </div>
              </div>
            </div>

            {/* AI Fingerprint Matrix */}
            <div className="p-4 rounded-xl bg-surface-subtle border border-[#E2E4DC] space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                AI FINGERPRINTING & KILN ENVELOPE FIT
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-2.5 rounded-lg bg-surface">
                  <span className="text-[10px] text-[#64748B] block">pH Value</span>
                  <span className="font-mono font-bold text-[#D1343A]">{match.fingerprint.pH}</span>
                  <span className="text-[10px] text-[#16A34A] block">Within kiln limit</span>
                </div>
                <div className="p-2.5 rounded-lg bg-surface">
                  <span className="text-[10px] text-[#64748B] block">Chloride Load</span>
                  <span className="font-mono font-bold text-[#0B0F19]">{match.fingerprint.chloridesPpm.toLocaleString()} ppm</span>
                  <span className="text-[10px] text-[#16A34A] block">&lt; 200k ppm max</span>
                </div>
                <div className="p-2.5 rounded-lg bg-surface">
                  <span className="text-[10px] text-[#64748B] block">Moisture</span>
                  <span className="font-mono font-bold text-[#0B0F19]">{match.fingerprint.moisturePct}%</span>
                  <span className="text-[10px] text-[#16A34A] block">&lt; 75% max</span>
                </div>
                <div className="p-2.5 rounded-lg bg-surface">
                  <span className="text-[10px] text-[#64748B] block">CO₂e Avoided</span>
                  <span className="font-mono font-bold text-[#16A34A]">{match.co2eOffset} Tonnes</span>
                  <span className="text-[10px] text-[#64748B] block">LCA Verified</span>
                </div>
              </div>
              <p className="text-xs text-[#1E293B] pt-1">
                <strong>Clinker Chemical Rationale:</strong> {match.matchRationale}
              </p>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <span className="text-xs text-[#64748B]">
                Estimated Inbound Freight (50% Milk-Run): ₹{(match.transportEstimate * 0.5).toLocaleString()}
              </span>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setExplainingMatch({
                      wasteStreamName: match.materialName,
                      buyerName: 'Aravali Cement Works AFR Kiln',
                      quantityTonnes: match.quantityTonnes,
                    })
                  }
                  className="px-3 py-2 rounded-xl text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Explain co-processing compatibility with Gemma 2 AI"
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  <span>✨ Gemma 2 Insights</span>
                </button>

                <button
                  onClick={() => handleAction(match.id, 'Accept')}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#2563EB] hover:bg-[#1d4ed8] transition-colors shadow-subtle flex items-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Accept & Reserve Gate Slot</span>
                </button>

                <button
                  onClick={() => setCounterBoxId(counterBoxId ? null : match.id)}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[#1E293B] bg-surface hover:bg-surface-subtle border border-[#E2E4DC] transition-colors cursor-pointer"
                >
                  Counter-Offer
                </button>

                <button
                  onClick={() => handleAction(match.id, 'Decline')}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[#DC2626] bg-surface hover:bg-[#FEE2E2] border border-[#DC2626]/30 transition-colors cursor-pointer"
                >
                  Decline
                </button>
              </div>
            </div>

            {/* Counter Box */}
            {counterBoxId === match.id && (
              <div className="p-4 rounded-xl bg-surface-subtle border border-[#E2E4DC] space-y-2 animate-in fade-in">
                <span className="text-xs font-bold text-[#0B0F19]">
                  Adjust Price per Tonne for {match.generatorName}
                </span>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={counterVal}
                    onChange={(e) => setCounterVal(e.target.value)}
                    className="px-3 py-1.5 text-xs font-mono font-bold text-[#0B0F19] bg-surface border border-[#E2E4DC] rounded-lg"
                  />
                  <button
                    onClick={() => handleAction(match.id, 'Counter')}
                    className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-[#2563EB] hover:bg-[#1d4ed8]"
                  >
                    Submit Counter-Offer
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Gemma 2 Co-Processing Match Reasoner Modal */}
      <GemmaMatchExplainerModal
        isOpen={!!explainingMatch}
        onClose={() => setExplainingMatch(null)}
        offer={explainingMatch}
      />
    </div>
  );
};
