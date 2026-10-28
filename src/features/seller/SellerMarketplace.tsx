import React, { useState } from 'react';
import {
  Store,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Truck,
  ArrowRight,
  Sparkles,
  MapPin,
  Clock,
  DollarSign,
  AlertCircle,
} from 'lucide-react';
import { useDashboardStore } from '../../store/dashboardStore';
import { GemmaMatchExplainerModal } from '../../components/GemmaMatchExplainerModal';

export const SellerMarketplace: React.FC = () => {
  const { offers, respondOffer, wasteStreams } = useDashboardStore();

  const [counterOfferId, setCounterOfferId] = useState<string | null>(null);
  const [counterPriceInput, setCounterPriceInput] = useState<string>('1400');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [explainingOffer, setExplainingOffer] = useState<any | null>(null);

  const handleAction = (offerId: string, action: 'Accept' | 'Reject' | 'Counter') => {
    if (action === 'Counter') {
      respondOffer(offerId, 'Counter', Number(counterPriceInput));
      setCounterOfferId(null);
      setToastMessage('Counter-offer sent to buyer.');
    } else {
      respondOffer(offerId, action);
      setToastMessage(`Offer ${action.toLowerCase()}ed.`);
    }
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E2E4DC]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-[#0B0F19]">
              Marketplace Listings & Incoming Buyer Offers
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#DCFCE7] text-[#16A34A] border border-[#16A34A]/20">
              {offers.length} Active Offers
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-0.5">
            Evaluate Bids, Negotiate Counter-Offers, and Lock Smart Escrow Settlements
          </p>
        </div>
      </div>

      {toastMessage && (
        <div className="p-4 rounded-xl bg-[#DCFCE7] border border-[#16A34A]/30 text-xs font-bold text-[#16A34A] flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Offers Feed */}
      <div className="space-y-5">
        {offers.map((offer) => {
          const isAccepted = offer.status === 'Accepted';
          const isDeclined = offer.status === 'Declined';
          const isCountered = offer.status === 'Countered';

          return (
            <div
              key={offer.id}
              className="p-6 rounded-2xl bg-surface border border-[#E2E4DC] shadow-subtle space-y-5"
            >
              {/* Title & Status Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E2E4DC]">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-[#DCFCE7] text-[#16A34A] px-2 py-0.5 rounded border border-[#16A34A]/20">
                      Incoming Buyer Offer
                    </span>
                    <h3 className="text-base font-bold text-[#0B0F19]">
                      {offer.buyerName}
                    </h3>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${
                        isAccepted
                          ? 'bg-[#DCFCE7] text-[#16A34A]'
                          : isDeclined
                          ? 'bg-[#FEE2E2] text-[#DC2626]'
                          : isCountered
                          ? 'bg-[#FEF3C7] text-[#D97706]'
                          : 'bg-[#EFF6FF] text-[#2563EB]'
                      }`}
                    >
                      Status: {offer.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#64748B] mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#64748B]" />
                    <span>{offer.buyerLocation} · Distance: <strong className="text-[#0B0F19]">{offer.distanceKm} km</strong></span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-[#64748B]">Offered Price per Tonne</span>
                  <div className="text-xl font-mono font-bold text-[#16A34A]">
                    +₹{offer.offeredPricePerTonne.toLocaleString()}/MT
                  </div>
                </div>
              </div>

              {/* Economic & Logistics Breakdown */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-surface-subtle border border-[#E2E4DC]">
                  <span className="text-[10px] text-[#64748B] font-semibold uppercase">Quantity</span>
                  <div className="text-sm font-mono font-bold text-[#0B0F19]">
                    {offer.quantityTonnes} MT
                  </div>
                  <span className="text-[10px] text-[#64748B]">{offer.wasteStreamName}</span>
                </div>

                <div className="p-3 rounded-xl bg-surface-subtle border border-[#E2E4DC]">
                  <span className="text-[10px] text-[#64748B] font-semibold uppercase">Gross Value</span>
                  <div className="text-sm font-mono font-bold text-[#16A34A]">
                    +₹{(offer.quantityTonnes * offer.offeredPricePerTonne).toLocaleString()}
                  </div>
                  <span className="text-[10px] text-[#64748B]">Byproduct Revenue</span>
                </div>

                <div className="p-3 rounded-xl bg-surface-subtle border border-[#E2E4DC]">
                  <span className="text-[10px] text-[#64748B] font-semibold uppercase">Estimated Freight</span>
                  <div className="text-sm font-mono font-bold text-[#1E293B]">
                    ₹{offer.estimatedTransportCost.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-[#64748B]">Rubber-Lined Tanker</span>
                </div>

                <div className="p-3 rounded-xl bg-[#DCFCE7]/40 border border-[#16A34A]/30">
                  <span className="text-[10px] text-[#16A34A] font-semibold uppercase">Net Economic Benefit</span>
                  <div className="text-sm font-mono font-bold text-[#15803D]">
                    +₹{offer.netEconomicGain.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-[#16A34A]">vs -₹48k TSDF Dump</span>
                </div>
              </div>

              {offer.counterTerms && (
                <div className="p-3 rounded-xl bg-[#FEF3C7]/40 border border-[#D97706]/30 text-xs text-[#D97706] font-semibold">
                  {offer.counterTerms}
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#E2E4DC] flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-[#64748B]">
                  Co-processing kiln verifies Fe (11.85%) raw mix replacement under CPCB Guidelines.
                </span>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setExplainingOffer(offer)}
                    className="px-3 py-2 rounded-xl text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                    title="Explain match rationale with Gemma 2 AI"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                    <span>✨ Gemma 2 Insights</span>
                  </button>

                  {!isAccepted && !isDeclined && (
                    <>
                      <button
                        onClick={() => handleAction(offer.id, 'Accept')}
                        className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#16A34A] hover:bg-[#15803D] transition-colors shadow-subtle flex items-center gap-1.5 cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Accept Offer & Lock Escrow</span>
                      </button>

                      <button
                        onClick={() => setCounterOfferId(counterOfferId ? null : offer.id)}
                        className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[#1E293B] bg-surface hover:bg-surface-subtle border border-[#E2E4DC] transition-colors cursor-pointer"
                      >
                        Counter-Offer
                      </button>

                      <button
                        onClick={() => handleAction(offer.id, 'Reject')}
                        className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[#DC2626] bg-surface hover:bg-[#FEE2E2] border border-[#DC2626]/30 transition-colors cursor-pointer"
                      >
                        Decline
                      </button>
                    </>
                  )}

                  {isAccepted && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#DCFCE7] text-[#16A34A] border border-[#16A34A]/30">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Deal Accepted · Form 10 Manifest Ready</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Counter-Offer Inline Box */}
              {counterOfferId === offer.id && (
                <div className="p-4 rounded-xl bg-surface-subtle border border-[#E2E4DC] space-y-3 animate-in fade-in">
                  <span className="text-xs font-bold text-[#0B0F19]">
                    Submit Counter-Offer to {offer.buyerName}
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] text-[#64748B]">Counter Price (₹/MT)</label>
                      <input
                        type="number"
                        value={counterPriceInput}
                        onChange={(e) => setCounterPriceInput(e.target.value)}
                        className="px-3 py-1.5 text-xs font-mono font-bold text-[#0B0F19] bg-surface border border-[#E2E4DC] rounded-lg"
                      />
                    </div>
                    <button
                      onClick={() => handleAction(offer.id, 'Counter')}
                      className="px-4 py-2 mt-4 rounded-xl text-xs font-bold text-white bg-[#D1343A] hover:bg-[#A81818] cursor-pointer"
                    >
                      Send Counter-Offer
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Gemma 2 Co-Processing Match Reasoner Modal */}
      <GemmaMatchExplainerModal
        isOpen={!!explainingOffer}
        onClose={() => setExplainingOffer(null)}
        offer={explainingOffer}
      />
    </div>
  );
};
