import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, AlertTriangle, ShieldCheck, FileText, ArrowRight } from 'lucide-react';
import { useSaasStore } from '../../store/saasStore';

export const ReviewParamModal: React.FC = () => {
  const { editingParameter, setEditingParameter, reviewParameter, facility } = useSaasStore();

  const [revisedVal, setRevisedVal] = useState('');
  const [justification, setJustification] = useState('');
  const [auditorName, setAuditorName] = useState(facility.contactPerson);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingParameter) {
      setRevisedVal(editingParameter.value === 'Not Available' ? '' : editingParameter.value);
      setJustification('');
      setError('');
    }
  }, [editingParameter]);

  if (!editingParameter) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revisedVal.trim()) {
      setError('Please enter a revised valid chemical value.');
      return;
    }
    if (!justification.trim() || justification.trim().length < 8) {
      setError('Audit justification note is mandatory (min 8 characters) for regulatory compliance.');
      return;
    }

    reviewParameter({
      parameterId: editingParameter.id,
      revisedValue: revisedVal.trim(),
      auditJustification: justification.trim(),
      revisedBy: auditorName || facility.contactPerson,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0F19]/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-surface rounded-2xl border border-[#E2E4DC] shadow-elevated overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-[#E2E4DC] flex items-center justify-between bg-surface-subtle/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#FDF2F2] text-[#D1343A] flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0B0F19]">
                Review / Correct Parameter Value
              </h3>
              <p className="text-[11px] text-[#64748B]">
                Human-in-the-Loop Regulatory Audit Verification
              </p>
            </div>
          </div>
          <button
            onClick={() => setEditingParameter(null)}
            className="p-1 text-[#64748B] hover:text-[#0B0F19] rounded-lg hover:bg-surface-subtle"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Target Parameter Specs */}
          <div className="p-3.5 rounded-xl bg-surface-subtle border border-[#E2E4DC] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#0B0F19]">
                {editingParameter.symbol} · {editingParameter.name}
              </span>
              <span className="text-[10px] font-mono font-bold text-[#64748B] bg-surface px-2 py-0.5 rounded border border-[#E2E4DC]">
                {editingParameter.category}
              </span>
            </div>
            <div className="text-xs text-[#64748B]">
              Benchmark / Envelope: <span className="text-[#1E293B] font-mono font-medium">{editingParameter.benchmark}</span>
            </div>
            <div className="text-[11px] text-[#64748B]">
              Current Citation: <span className="text-[#1E293B] font-medium">{editingParameter.citation}</span>
            </div>
          </div>

          {/* Before & After Values */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-surface border border-[#E2E4DC]">
              <span className="text-[10px] text-[#64748B] font-semibold">BEFORE (CURRENT)</span>
              <div className="text-sm font-mono font-bold text-[#D1343A] mt-1">
                {editingParameter.value} {editingParameter.unit}
              </div>
              <div className="text-[10px] text-[#64748B]">
                Confidence: {editingParameter.confidencePct}%
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#DCFCE7]/30 border border-[#16A34A]/30">
              <span className="text-[10px] text-[#16A34A] font-semibold">AFTER (CORRECTED)</span>
              <div className="text-sm font-mono font-bold text-[#16A34A] mt-1">
                {revisedVal || '—'} {editingParameter.unit}
              </div>
              <div className="text-[10px] text-[#16A34A]">
                Confidence: 100% (Human Audit)
              </div>
            </div>
          </div>

          {/* Corrected Input */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#0B0F19]">
              Corrected Analytical Value ({editingParameter.unit})
            </label>
            <input
              type="text"
              value={revisedVal}
              onChange={(e) => setRevisedVal(e.target.value)}
              placeholder={`e.g. ${editingParameter.value === 'Not Available' ? '4.8 or < 2.0' : editingParameter.value}`}
              className="w-full px-3.5 py-2 text-sm font-mono text-[#0B0F19] bg-surface border border-[#E2E4DC] rounded-xl focus:outline-none focus:border-[#D1343A]"
            />
          </div>

          {/* Audit Justification Note */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#0B0F19]">
              Audit Justification Note & Reference Document (Mandatory)
            </label>
            <textarea
              rows={3}
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              placeholder="e.g. Bench titration cross-checked by Chief Chemist via IS 3025 Pt 32 recalibrated on 27-Oct. Verified within kiln specification envelope."
              className="w-full p-3 text-xs text-[#0B0F19] bg-surface border border-[#E2E4DC] rounded-xl focus:outline-none focus:border-[#D1343A] leading-relaxed resize-none"
            />
          </div>

          {/* Auditor Name */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#0B0F19]">
              Authorizing QA/QC Lead
            </label>
            <input
              type="text"
              value={auditorName}
              onChange={(e) => setAuditorName(e.target.value)}
              className="w-full px-3.5 py-2 text-xs text-[#0B0F19] bg-surface border border-[#E2E4DC] rounded-xl focus:outline-none focus:border-[#D1343A]"
            />
          </div>

          {error && (
            <div className="p-2.5 rounded-lg bg-[#FEE2E2] text-[#DC2626] text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#E2E4DC]">
            <button
              type="button"
              onClick={() => setEditingParameter(null)}
              className="px-4 py-2 text-xs font-semibold text-[#64748B] hover:text-[#0B0F19] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold text-white bg-[#D1343A] hover:bg-[#A81818] rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Commit Audit Verification</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
