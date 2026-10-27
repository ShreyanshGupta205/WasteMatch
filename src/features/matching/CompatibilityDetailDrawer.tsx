import React from 'react';
import { X, CheckCircle2, AlertTriangle, XCircle, ShieldCheck, Calculator } from 'lucide-react';
import { MatchOption } from '../../mock/types';

interface CompatibilityDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  match: MatchOption | null;
}

export const CompatibilityDetailDrawer: React.FC<CompatibilityDetailDrawerProps> = ({
  isOpen,
  onClose,
  match,
}) => {
  if (!isOpen || !match) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-ink-primary/50 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-2xl bg-surface h-full shadow-elevated flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 border-b border-surface-subtle flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-100 text-brand-700">
                {match.compatibilityScore}% Compatibility
              </span>
              <span className="text-xs text-ink-muted">
                {match.rulesPassed} of {match.rulesTotal} applicable rules passed
              </span>
            </div>
            <h2 className="text-xl font-bold text-ink-primary mt-1">
              Regulatory & Environmental Clearance
            </h2>
            <p className="text-xs text-ink-secondary mt-0.5">
              Verified against CPCB, EU BREF (Cement), and US EPA RCRA limits
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-ink-secondary hover:text-ink-primary hover:bg-surface-subtle transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Summary Box */}
          <div className="p-4 rounded-2xl bg-surface-subtle border border-surface-muted">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-600 mb-1">
              Match Option Overview
            </h4>
            <p className="text-sm font-semibold text-ink-primary">{match.title}</p>
            <p className="text-xs text-ink-secondary mt-1">{match.description}</p>
          </div>

          {/* Formula & Economics Box (Task 1) */}
          <div className="p-4 rounded-2xl bg-brand-50/50 border border-brand-200">
            <div className="flex items-center gap-2 text-xs font-bold text-brand-800 mb-2">
              <Calculator className="w-4 h-4 text-brand-600" />
              <span>Economic Derivation Formula</span>
            </div>
            <div className="bg-surface rounded-xl p-3 border border-brand-100 font-mono text-xs text-ink-primary mb-2">
              <div className="text-ink-secondary mb-1">
                netBenefit = (tonnes × BASELINE_DISPOSAL_PER_T) − (km × FREIGHT_PER_KM) + receiverPayment
              </div>
              <div className="text-ink-secondary">
                truckFillPct = round(tonnes / TANKER_CAPACITY_T × 100)
              </div>
            </div>

            {match.formulaBreakdown && (
              <div className="text-xs font-semibold text-brand-900 mt-2">
                Calculation: <span className="font-mono text-ink-primary">{match.formulaBreakdown}</span>
              </div>
            )}
            <div className="mt-1 text-[11px] text-ink-muted">
              *Receiver payment is negative when receiver charges an acceptance fee.
            </div>
          </div>

          {/* Rules Checked List */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-secondary">
              Audited Rules ({match.rulesPassed} of {match.rulesTotal} applicable rules passed)
            </h4>

            {match.rulesChecked.map((rule, idx) => {
              const isPass = rule.status === 'pass';
              const isWarn = rule.status === 'warn';
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border transition-all ${
                    isPass
                      ? 'bg-status-success-bg/20 border-emerald-200'
                      : isWarn
                      ? 'bg-status-warning-bg/30 border-amber-300'
                      : 'bg-status-error-bg/30 border-red-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <div className="flex items-start gap-2">
                      {isPass ? (
                        <CheckCircle2 className="w-4 h-4 text-status-success flex-shrink-0 mt-0.5" />
                      ) : isWarn ? (
                        <AlertTriangle className="w-4 h-4 text-status-warning flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-4 h-4 text-status-error flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <h5 className="text-xs font-bold text-ink-primary">
                          {rule.rule}
                        </h5>
                        <p className="text-xs text-ink-secondary mt-1 leading-relaxed">
                          {rule.note}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded flex-shrink-0 ${
                        rule.source === 'CPCB'
                          ? 'bg-purple-100 text-purple-700'
                          : rule.source === 'EU BREF'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {rule.source}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-surface-subtle bg-surface-subtle/50 flex items-center justify-between text-xs text-ink-secondary">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-status-success" />
            <span>Rule Engine Clearance Verified</span>
          </span>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-ink-primary text-white font-medium hover:bg-black transition-colors"
          >
            Close Audit
          </button>
        </div>
      </div>
    </div>
  );
};
