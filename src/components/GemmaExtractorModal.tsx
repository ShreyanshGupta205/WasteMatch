import React, { useState } from 'react';
import {
  X,
  Sparkles,
  FlaskConical,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Cpu,
  Layers,
  FileText,
  RotateCcw,
  Zap,
} from 'lucide-react';
import {
  GemmaService,
  SAMPLE_INDUSTRIAL_ASSAYS,
  ExtractedChemicalFingerprint,
} from '../services/gemmaService';

interface GemmaExtractorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (data: ExtractedChemicalFingerprint) => void;
}

export const GemmaExtractorModal: React.FC<GemmaExtractorModalProps> = ({
  isOpen,
  onClose,
  onApply,
}) => {
  const [selectedSampleIdx, setSelectedSampleIdx] = useState<number>(0);
  const [inputText, setInputText] = useState<string>(SAMPLE_INDUSTRIAL_ASSAYS[0].rawText);
  const [isExtracting, setIsExtracting] = useState<boolean>(false);
  const [extractedResult, setExtractedResult] = useState<ExtractedChemicalFingerprint | null>(null);

  if (!isOpen) return null;

  const handleSelectSample = (idx: number) => {
    setSelectedSampleIdx(idx);
    setInputText(SAMPLE_INDUSTRIAL_ASSAYS[idx].rawText);
    setExtractedResult(null);
  };

  const handleRunExtraction = async () => {
    if (!inputText.trim()) return;
    setIsExtracting(true);
    try {
      const res = await GemmaService.extractFingerprint(inputText);
      setExtractedResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsExtracting(false);
    }
  };

  const handleApplyToForm = () => {
    if (!extractedResult) return;
    onApply(extractedResult);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-3xl bg-white rounded-2xl border border-[#E2E4DC] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#E2E4DC] bg-gradient-to-r from-purple-50 via-white to-indigo-50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-purple-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">
                  Gemma 2 Chemical Fingerprinting Assistant
                </h3>
                <span className="text-[10px] font-mono font-bold bg-purple-100 text-purple-800 border border-purple-200 px-2 py-0.5 rounded-full">
                  Gemma 2 9B Engine
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                AI extraction of chemical assay parameters & SPCB compliance codes from unstructured text
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

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-xs text-slate-700">
          {/* Quick Pre-loaded Samples */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <FlaskConical className="w-3.5 h-3.5 text-purple-600" /> 1-Click Industrial Test Samples
              </span>
              <span className="text-[10px] text-slate-400">Or paste your own report below</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {SAMPLE_INDUSTRIAL_ASSAYS.map((s, idx) => (
                <button
                  key={s.title}
                  type="button"
                  onClick={() => handleSelectSample(idx)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    selectedSampleIdx === idx
                      ? 'border-purple-600 bg-purple-50/50 shadow-sm ring-1 ring-purple-600/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <p className="font-bold text-slate-900 text-xs truncate">{s.title}</p>
                  <p className="text-[10px] text-slate-500 truncate mt-0.5">{s.category}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Raw Text Input */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-800 text-xs">
                Raw Assay Document / Material Description Notes
              </label>
              <button
                type="button"
                onClick={() => setInputText('')}
                className="text-[10px] text-slate-400 hover:text-slate-600"
              >
                Clear text
              </button>
            </div>
            <textarea
              rows={6}
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                setExtractedResult(null);
              }}
              placeholder="Paste raw chemical analysis report, laboratory assay, MSDS excerpt, or shift supervisor notes..."
              className="w-full p-3 font-mono text-[11px] bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition leading-relaxed"
            />
          </div>

          {/* Extract Button */}
          <div>
            <button
              type="button"
              onClick={handleRunExtraction}
              disabled={isExtracting || !inputText.trim()}
              className="w-full py-3 px-4 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              {isExtracting ? (
                <>
                  <Cpu className="w-4 h-4 animate-spin" />
                  <span>Gemma 2 9B is extracting chemical parameters & SPCB codes...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-purple-200" />
                  <span>Extract Chemical Fingerprint with Gemma 2 AI</span>
                </>
              )}
            </button>
          </div>

          {/* Extracted Structured Result Preview */}
          {extractedResult && (
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-purple-50/40 via-white to-slate-50 border border-purple-200/80 shadow-sm space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-purple-100">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="font-bold text-slate-900 text-sm">
                    {extractedResult.streamName}
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {extractedResult.spcbScheduleCategory}
                </span>
              </div>

              {/* Chemical Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-2.5 rounded-xl bg-white border border-slate-200/80">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">pH Level</span>
                  <div className="text-base font-mono font-bold text-slate-900 mt-0.5">
                    {extractedResult.chemicalParameters.pH}
                  </div>
                  <span className="text-[9px] text-emerald-600 font-medium">Confidence: High</span>
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-slate-200/80">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Total Chlorides</span>
                  <div className="text-base font-mono font-bold text-slate-900 mt-0.5">
                    {extractedResult.chemicalParameters.chloridePpm.toLocaleString()} ppm
                  </div>
                  <span className="text-[9px] text-emerald-600 font-medium">Confidence: High</span>
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-slate-200/80">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">
                    {extractedResult.chemicalParameters.ironPpm ? 'Total Iron (Fe)' : 'Calorific Value'}
                  </span>
                  <div className="text-base font-mono font-bold text-slate-900 mt-0.5">
                    {extractedResult.chemicalParameters.ironPpm
                      ? `${extractedResult.chemicalParameters.ironPpm.toLocaleString()} ppm`
                      : `${extractedResult.chemicalParameters.calorificValueMjKg} MJ/kg`}
                  </div>
                  <span className="text-[9px] text-emerald-600 font-medium">Confidence: High</span>
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-slate-200/80">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Moisture Content</span>
                  <div className="text-base font-mono font-bold text-slate-900 mt-0.5">
                    {extractedResult.chemicalParameters.moisturePct}%
                  </div>
                  <span className="text-[9px] text-emerald-600 font-medium">Confidence: High</span>
                </div>
              </div>

              {/* Meta details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] bg-slate-50 p-3 rounded-xl border border-slate-200/60">
                <div>
                  <span className="text-slate-400">UN Number:</span>{' '}
                  <span className="font-mono font-bold text-slate-800">{extractedResult.unNumber}</span>
                </div>
                <div>
                  <span className="text-slate-400">Hazard Class:</span>{' '}
                  <span className="font-semibold text-rose-700">{extractedResult.hazardClass}</span>
                </div>
                <div>
                  <span className="text-slate-400">Physical Form:</span>{' '}
                  <span className="font-semibold text-slate-800 capitalize">{extractedResult.physicalForm}</span>
                </div>
              </div>

              {/* Reasoning Summary */}
              <div className="p-3 rounded-xl bg-purple-50/60 border border-purple-200/60 space-y-1">
                <span className="text-[10px] font-bold text-purple-900 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-purple-600" /> Gemma Reasoning
                </span>
                <p className="text-[11px] text-purple-950 leading-relaxed font-medium">
                  {extractedResult.gemmaReasoningSummary}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleApplyToForm}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#D1343A] hover:bg-[#A81818] shadow-md transition flex items-center gap-2 cursor-pointer"
                >
                  <span>Apply to Stream Registration</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
