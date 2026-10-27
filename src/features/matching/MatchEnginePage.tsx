import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Cpu,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Truck,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { useDemoStore } from '../../store/demoStore';
import { NetworkMapSvg } from './NetworkMapSvg';
import { BaselineComparisonChart } from './BaselineComparisonChart';
import { CompatibilityDetailDrawer } from './CompatibilityDetailDrawer';
import { ReceiverView } from './ReceiverView';
import { MatchOption } from '../../mock/types';

export const MatchEnginePage: React.FC = () => {
  const navigate = useNavigate();
  const {
    isSolving,
    solverProgress,
    hasSolved,
    matches,
    selectedMatch,
    activeMatchTab,
    setActiveMatchTab,
    runOptimizer,
    selectMatch,
    fingerprint,
    simulateLabResult,
  } = useDemoStore();

  const [detailModalMatch, setDetailModalMatch] = useState<MatchOption | null>(null);

  // Auto-run optimizer if not run yet
  useEffect(() => {
    if (!hasSolved && !isSolving) {
      runOptimizer();
    }
  }, []);

  const handleAcceptDeal = () => {
    navigate('/settlement');
  };

  const isProvisional = fingerprint?.status === 'Provisional';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-600 mb-1">
            <span>Engine 2</span>
            <span>•</span>
            <span>Constraint Optimization & Multi-Party Symbiosis Solver</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink-primary font-display">
            Symbiosis Matching & Route Optimization
          </h1>
          <p className="text-sm text-ink-secondary mt-1">
            Rule engine: sample rule set in this prototype
          </p>
        </div>

        {/* View Toggle Tabs */}
        <div className="flex items-center gap-3">
          <div className="bg-surface-subtle p-1 rounded-2xl border border-surface-muted flex items-center gap-1">
            <button
              onClick={() => setActiveMatchTab('generator')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeMatchTab === 'generator'
                  ? 'bg-surface text-brand-700 shadow-sm border border-surface-muted'
                  : 'text-ink-secondary hover:text-ink-primary'
              }`}
            >
              Generator Perspective
            </button>
            <button
              onClick={() => setActiveMatchTab('receiver')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeMatchTab === 'receiver'
                  ? 'bg-surface text-brand-700 shadow-sm border border-surface-muted'
                  : 'text-ink-secondary hover:text-ink-primary'
              }`}
            >
              Receiver Kiln Perspective
            </button>
          </div>
        </div>
      </div>

      {activeMatchTab === 'receiver' ? (
        <ReceiverView />
      ) : (
        /* Generator View */
        <div className="space-y-8">
          {/* Top Solver Trigger Banner */}
          <div className="bg-surface rounded-2xl p-4 sm:p-5 border border-surface-subtle shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-200 flex items-center justify-center text-brand-600 flex-shrink-0">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-ink-primary">
                  CP-SAT Solver Status
                </h3>
                <p className="text-xs text-ink-secondary">
                  {isSolving
                    ? solverProgress.label
                    : hasSolved
                    ? 'Best feasible bundle found · 3 configurations evaluated'
                    : 'Awaiting solver execution'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Task 6: Simulate lab result button if provisional */}
              {isProvisional && (
                <button
                  onClick={async () => {
                    await simulateLabResult();
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-300 transition-colors shadow-sm"
                  title="Simulate lab test completion to confirm matches"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Simulate Lab Result</span>
                </button>
              )}

              {isSolving ? (
                <div className="w-48">
                  <div className="flex justify-between text-[11px] font-mono text-brand-700 mb-1">
                    <span>Searching optimum...</span>
                    <span>{solverProgress.pct}%</span>
                  </div>
                  <div className="w-full bg-brand-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-brand-600 h-full rounded-full transition-all duration-300"
                      style={{ width: `${solverProgress.pct}%` }}
                    />
                  </div>
                </div>
              ) : (
                <button
                  onClick={runOptimizer}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-700 font-semibold text-xs border border-brand-200 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Re-Run Solver</span>
                </button>
              )}
            </div>
          </div>

          {/* Main 2-Column Grid: Map on Left (7 cols), Match Options on Right (5 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: SVG Geo Network Map (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="bg-surface rounded-3xl p-5 border border-surface-subtle shadow-card">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-600" />
                    <h3 className="text-sm font-bold text-ink-primary">
                      Multi-Party Spatial Symbiosis Network
                    </h3>
                  </div>
                </div>

                {/* The SVG Network Map */}
                <div className="h-[390px] w-full">
                  <NetworkMapSvg
                    selectedMatch={selectedMatch}
                    isSolving={isSolving}
                    hasSolved={hasSolved}
                  />
                </div>

                {/* Task 2: Replaced breakout box with clean single caption */}
                <p className="mt-3 text-xs text-ink-secondary text-center font-medium">
                  Two half-empty loads become one 91% full tanker.
                </p>
              </div>

              {/* Economic Comparison Chart */}
              <BaselineComparisonChart />
            </div>

            {/* Right: Ranked Match Options (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-ink-primary">
                  Ranked Match Proposals ({matches.length})
                </h3>
                <span className="text-xs text-ink-muted">
                  Ranked by net benefit
                </span>
              </div>

              {matches.map((opt) => {
                const isSelected = selectedMatch?.id === opt.id;
                const isNegative = opt.netBenefit < 0;

                return (
                  <div
                    key={opt.id}
                    onClick={() => selectMatch(opt)}
                    className={`cursor-pointer rounded-2xl p-5 border transition-all ${
                      isSelected
                        ? 'bg-surface border-brand-500 shadow-elevated ring-2 ring-brand-500/10'
                        : 'bg-surface hover:bg-surface-subtle/80 border-surface-muted shadow-subtle'
                    }`}
                  >
                    {/* Top Row: Title + Badges */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-1.5">
                          {opt.recommended && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-brand-600 text-white shadow-sm">
                              <Sparkles className="w-3 h-3 text-brand-200" />
                              Best Bundle
                            </span>
                          )}
                          {isProvisional && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                              Provisional: pending lab test
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm font-bold text-ink-primary leading-snug">
                          {opt.title}
                        </h4>
                      </div>

                      <div className="flex flex-col items-end">
                        <span className="text-lg font-black text-brand-700 font-display">
                          {opt.compatibilityScore}%
                        </span>
                        <span className="text-[10px] text-ink-muted -mt-0.5">
                          Compatibility
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-ink-secondary mb-4 leading-relaxed">
                      {opt.description}
                    </p>

                    {/* Metric Pills */}
                    <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                      {/* Net Benefit derived from economics.ts */}
                      <div className={`p-2 rounded-xl border ${
                        isNegative
                          ? 'bg-red-50 border-red-200 text-status-error'
                          : 'bg-surface-subtle border-surface-muted/60'
                      }`}>
                        <span className="text-[10px] text-ink-muted block">Net Benefit</span>
                        <span className={`text-sm font-extrabold font-display ${
                          isNegative ? 'text-status-error' : 'text-status-success'
                        }`}>
                          {isNegative ? `−₹${Math.abs(opt.netBenefit).toLocaleString()}` : `+₹${opt.netBenefit.toLocaleString()}`}
                        </span>
                        {isNegative && (
                          <span className="text-[10px] text-red-700 block leading-tight mt-0.5 font-medium">
                            Not viable alone: half-empty truck, long haul
                          </span>
                        )}
                      </div>

                      <div className="p-2 rounded-xl bg-surface-subtle border border-surface-muted/60">
                        <span className="text-[10px] text-ink-muted block">Truck Fill Rate</span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <div className="flex-1 bg-surface-muted h-1.5 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                opt.truckFillPct > 80 ? 'bg-status-success' : 'bg-status-warning'
                              }`}
                              style={{ width: `${opt.truckFillPct}%` }}
                            />
                          </div>
                          <span className="text-xs font-bold text-ink-primary">
                            {opt.truckFillPct}%
                          </span>
                        </div>
                      </div>

                      <div className="p-2 rounded-xl bg-surface-subtle border border-surface-muted/60">
                        <span className="text-[10px] text-ink-muted block">Rule Compliance</span>
                        <span className="text-xs font-bold text-ink-primary">
                          {opt.rulesPassed} of {opt.rulesTotal} applicable rules passed
                        </span>
                      </div>

                      <div className="p-2 rounded-xl bg-surface-subtle border border-surface-muted/60">
                        <span className="text-[10px] text-ink-muted block">Carbon Diverted</span>
                        <span className="text-xs font-bold text-emerald-700">
                          {opt.co2SavedTonnes} t CO₂e (est.)
                        </span>
                      </div>
                    </div>

                    {/* Actions on Card */}
                    <div className="pt-3 border-t border-surface-subtle flex items-center justify-between">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDetailModalMatch(opt);
                        }}
                        className="text-xs font-semibold text-brand-700 hover:text-brand-800 flex items-center gap-1"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>View {opt.rulesChecked.length} Rule Checks</span>
                      </button>

                      <div className="text-[11px] text-ink-muted flex items-center gap-1">
                        <Truck className="w-3.5 h-3.5" />
                        <span>{opt.distanceKm} km</span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Bottom Sticky Action: Accept & Escrow */}
              <div className="bg-surface rounded-2xl p-5 border border-brand-200 shadow-card flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-ink-secondary">Selected Configuration:</span>
                  <strong className="text-ink-primary font-bold">
                    {selectedMatch?.title || 'Shared bundle to Aravali Cement Works'}
                  </strong>
                </div>

                <button
                  onClick={handleAcceptDeal}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm transition-all shadow-card hover:shadow-elevated active:scale-98"
                >
                  <ShieldCheck className="w-4 h-4 text-brand-200" />
                  <span>{isProvisional ? 'Reserve match' : 'Accept match and lock escrow'}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <p className="text-[11px] text-ink-muted text-center">
                  Smart contract locks funds in simulated escrow prior to tanker dispatch.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Compatibility Detail Modal/Drawer */}
      <CompatibilityDetailDrawer
        isOpen={!!detailModalMatch}
        onClose={() => setDetailModalMatch(null)}
        match={detailModalMatch}
      />
    </div>
  );
};
