import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  Flame,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Factory,
  ArrowRight,
  Zap,
} from 'lucide-react';
import { GemmaService, GemmaMatchExplanation } from '../services/gemmaService';

interface GemmaMatchExplainerModalProps {
  isOpen: boolean;
  onClose: () => void;
  offer: {
    buyerName?: string;
    wasteStreamName?: string;
    quantityTonnes?: number;
    offeredPricePerTonne?: number;
    distanceKm?: number;
    savingsPerMonthInr?: number;
  } | null;
}

export const GemmaMatchExplainerModal: React.FC<GemmaMatchExplainerModalProps> = ({
  isOpen,
  onClose,
  offer,
}) => {
  const [explanation, setExplanation] = useState<GemmaMatchExplanation | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!isOpen || !offer) return;
    setIsLoading(true);

    GemmaService.explainCompatibility(
      {
        name: offer.wasteStreamName || 'Spent Acid',
        physicalForm: 'liquid',
        fingerprint: {},
        estimatedMonthlyQuantityTonnes: offer.quantityTonnes,
      },
      {
        facilityName: offer.buyerName || 'Aravali Cement Works AFR Kiln',
      }
    )
      .then((res) => {
        setExplanation(res);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [isOpen, offer]);

  if (!isOpen || !offer) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-white rounded-2xl border border-[#E2E4DC] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#E2E4DC] bg-gradient-to-r from-purple-50 via-white to-indigo-50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-purple-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">
                  Gemma 2 Co-Processing Match Reasoner
                </h3>
                <span className="text-[10px] font-mono font-bold bg-purple-100 text-purple-800 border border-purple-200 px-2 py-0.5 rounded-full">
                  Kiln Compatibility
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {offer.wasteStreamName} ↔ {offer.buyerName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs text-slate-700">
          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-3">
              <Cpu className="w-8 h-8 text-purple-600 animate-spin" />
              <p className="text-xs font-semibold text-slate-600">
                Gemma 2 9B evaluating chemical envelope & SPCB clinker rules...
              </p>
            </div>
          ) : explanation ? (
            <>
              {/* Compatibility Score Banner */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 via-emerald-50/50 to-white border border-emerald-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                    Match Verdict
                  </span>
                  <h4 className="text-lg font-bold text-emerald-900">{explanation.verdict}</h4>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block">AI Match Score</span>
                  <span className="text-2xl font-mono font-bold text-emerald-700">
                    {explanation.compatibilityScore}%
                  </span>
                </div>
              </div>

              {/* 1. Material & Clinker Mineralogy */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <div className="flex items-center gap-1.5 text-slate-900 font-bold text-xs">
                  <Flame className="w-4 h-4 text-amber-600" />
                  <span>Thermal & Raw Material Clinker Contribution</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  {explanation.thermalAndMaterialContribution}
                </p>
              </div>

              {/* 2. Regulatory Compliance */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <div className="flex items-center gap-1.5 text-slate-900 font-bold text-xs">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Statutory Compliance (HW Rules 2016)</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  {explanation.regulatoryComplianceCheck}
                </p>
              </div>

              {/* 3. Gate QC Recommended Protocol */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <div className="flex items-center gap-1.5 text-slate-900 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Recommended Inbound Gate QC Inspection</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  {explanation.recommendedGateQcProtocol}
                </p>
              </div>

              {/* 4. Economic Benefit */}
              <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-200/60 space-y-1.5">
                <div className="flex items-center gap-1.5 text-purple-900 font-bold text-xs">
                  <TrendingUp className="w-4 h-4 text-purple-600" />
                  <span>Economic & Carbon Abatement Benefit</span>
                </div>
                <p className="text-purple-950 text-[11px] leading-relaxed font-medium">
                  {explanation.economicAndEnvironmentalBenefit}
                </p>
              </div>
            </>
          ) : null}

          {/* Footer Close */}
          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition"
            >
              Close Analysis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
