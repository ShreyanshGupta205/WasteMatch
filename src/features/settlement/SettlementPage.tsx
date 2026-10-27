import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Lock,
  Unlock,
  Check,
  XCircle,
  HelpCircle,
  X,
  FileCheck,
} from 'lucide-react';
import { useDemoStore } from '../../store/demoStore';
import { CertificateCard } from './CertificateCard';
import { EscrowStage } from '../../mock/types';
import {
  ESCROW_HERO_DEAL,
  CO2_ESTIMATED_TONNES,
  CO2_ESTIMATION_METHOD,
} from '../../mock/economics';

export const SettlementPage: React.FC = () => {
  const {
    deal,
    isDelivering,
    isVerifying,
    forceFailMode,
    setForceFailMode,
    simulateDeliveryTransit,
    runVerificationCheck,
    releaseStage1,
    simulateLabReport,
    releaseStage2,
  } = useDemoStore();

  const [showCo2Popover, setShowCo2Popover] = useState(false);

  // 4-Stage Stepper (Task 3)
  const stages: { stage: EscrowStage; label: string; desc: string }[] = [
    { stage: 'Locked', label: '1. Escrow locked', desc: '₹26,250 receiver payment held' },
    { stage: 'In transit', label: '2. In transit', desc: 'GPS & E-seal tracking' },
    { stage: 'Gate verified', label: '3. Gate verified', desc: 'In-line sensor titration' },
    { stage: 'Funds released', label: '4. Funds released', desc: 'Stage 1 + Stage 2 disbursed' },
  ];

  const stageOrder: EscrowStage[] = [
    'Locked',
    'In transit',
    'Gate verified',
    'Funds released',
  ];

  const currentStageIndex = stageOrder.indexOf(deal.stage);

  const handleRunVerification = async () => {
    await runVerificationCheck();
    if (!forceFailMode) {
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#D1343A', '#15803D', '#10B981'],
      });
    }
  };

  const handleReleaseStage1 = async () => {
    await releaseStage1();
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#15803D', '#10B981', '#34D399'],
    });
  };

  const handleSimulateLab = async () => {
    await simulateLabReport();
  };

  const handleReleaseStage2 = async () => {
    await releaseStage2();
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.55 },
      colors: ['#15803D', '#10B981', '#34D399', '#D1343A', '#F59E0B'],
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const isGatePass = deal.verification?.result === 'PASS';
  const isLabPassed = deal.labReportStatus === 'passed';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header (No SimulatedBadge here per Task 4) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-600 mb-1">
            <span>Engine 3</span>
            <span>•</span>
            <span>Escrow Settlement, IoT Tracking & Staged Quality Verification</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink-primary font-display">
            Autonomous Deal Settlement & Escrow
          </h1>
          <p className="text-sm text-ink-secondary mt-1">
            Escrow: nodal account / smart contract (testnet, simulated). Hash anchored on-chain for audit.
          </p>
        </div>
      </div>

      {/* 4-Step Horizontal Escrow Stepper (Task 3) */}
      <div className="bg-surface rounded-2xl p-4 sm:p-6 border border-surface-subtle shadow-card mb-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {stages.map((stg, idx) => {
            const isCompleted = currentStageIndex > idx || deal.stage === 'Funds released';
            const isCurrent = currentStageIndex === idx && deal.stage !== 'Funds released';
            const isAllDone = deal.stage === 'Funds released' && idx === 3;

            return (
              <div
                key={stg.stage}
                className={`p-3.5 rounded-xl border transition-all ${
                  isAllDone || (isCompleted && idx === 3)
                    ? 'bg-status-success-bg/30 border-status-success'
                    : isCurrent
                    ? 'bg-brand-50 border-brand-500 shadow-sm ring-1 ring-brand-500/20'
                    : isCompleted
                    ? 'bg-surface border-surface-muted'
                    : 'bg-surface-subtle/40 border-surface-subtle opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      isCompleted || isAllDone
                        ? 'bg-status-success text-white'
                        : isCurrent
                        ? 'bg-brand-600 text-white animate-pulse'
                        : 'bg-surface-muted text-ink-muted'
                    }`}
                  >
                    {isCompleted || isAllDone ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                  </span>

                  {isCurrent && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700 bg-brand-100 px-1.5 py-0.5 rounded">
                      Active
                    </span>
                  )}
                </div>

                <div className="text-xs font-bold text-ink-primary truncate">
                  {stg.label}
                </div>
                <div className="text-[10px] text-ink-secondary mt-0.5 leading-tight">
                  {stg.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main 2-Column Split: Deal & Transit on Left, Quality Verification & Release on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
        {/* Left Column: Deal Manifest & Compact Transit Tracker (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {/* Deal Manifest Box */}
          <div className="bg-surface rounded-3xl p-6 border border-surface-subtle shadow-card">
            <div className="flex items-center justify-between pb-4 border-b border-surface-subtle mb-4">
              <div>
                <span className="text-[10px] font-mono text-ink-muted uppercase">
                  Active Deal ID
                </span>
                <h3 className="text-base font-bold text-ink-primary font-mono">
                  {deal.id}
                </h3>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-ink-muted uppercase">Escrow Locked Amount</span>
                <div className="text-xl font-black text-status-success font-display">
                  ₹{ESCROW_HERO_DEAL.totalAmountInr.toLocaleString()}
                </div>
                <span className="text-[10px] text-ink-muted block">
                  (21 t × ₹1,250 receiver payment)
                </span>
              </div>
            </div>

            {/* Parties Manifest & Split (Task 1) */}
            <div className="space-y-3 text-xs">
              <div className="flex items-start justify-between">
                <span className="text-ink-secondary">Consortium Generators (Split):</span>
                <div className="text-right font-medium text-ink-primary">
                  <div>Shree Ganesh Galvanizers: <strong>₹{ESCROW_HERO_DEAL.generatorSplit.shreeGaneshInr.toLocaleString()}</strong> (12 t)</div>
                  <div className="text-ink-secondary">Bharat Paper Mills: <strong>₹{ESCROW_HERO_DEAL.generatorSplit.bharatPaperInr.toLocaleString()}</strong> (9 t)</div>
                </div>
              </div>

              <div className="flex items-start justify-between">
                <span className="text-ink-secondary">Receiver:</span>
                <strong className="text-ink-primary font-semibold">{deal.receiverName}</strong>
              </div>

              <div className="flex items-start justify-between">
                <span className="text-ink-secondary">Freight Settlement:</span>
                <span className="text-ink-muted text-right max-w-xs">{ESCROW_HERO_DEAL.freightNote}</span>
              </div>

              <div className="flex items-start justify-between pt-2 border-t border-surface-subtle">
                <span className="text-ink-secondary">Escrow Mechanism:</span>
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-brand-700">
                  <Lock className="w-3 h-3" />
                  <span>Nodal Smart Escrow ({deal.contractAddress})</span>
                </div>
              </div>
            </div>
          </div>

          {/* Compact Transit Tracker (Task 3: Replaced 6-row feed) */}
          <div className="bg-surface rounded-3xl p-6 border border-surface-subtle shadow-card flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-brand-600" />
                <h3 className="text-sm font-bold text-ink-primary">
                  Vehicle Transit Tracker (820 km)
                </h3>
              </div>

              {deal.stage === 'Locked' || deal.stage === 'In transit' ? (
                <button
                  onClick={simulateDeliveryTransit}
                  disabled={isDelivering}
                  className="px-3.5 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-transform active:scale-95"
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>{isDelivering ? 'Fast-forwarding...' : 'Simulate delivery arrival'}</span>
                </button>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-status-success bg-status-success-bg px-2.5 py-1 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Arrived at Gate #4</span>
                </span>
              )}
            </div>

            {/* 3 Milestones Progress Bar */}
            <div className="my-2">
              <div className="flex justify-between text-[11px] font-bold text-ink-primary mb-1.5">
                <span className={deal.stage !== 'Locked' ? 'text-status-success' : 'text-brand-600'}>
                  ● Dispatched
                </span>
                <span className={deal.stage === 'In transit' ? 'text-brand-600 font-bold' : deal.stage !== 'Locked' ? 'text-status-success' : 'text-ink-muted'}>
                  ● In transit (GPS)
                </span>
                <span className={deal.stage === 'Gate verified' || deal.stage === 'Funds released' ? 'text-status-success' : 'text-ink-muted'}>
                  ● Arrived at gate
                </span>
              </div>
              <div className="w-full bg-surface-muted h-2 rounded-full overflow-hidden">
                <div
                  className="bg-brand-600 h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: deal.stage === 'Locked' ? '20%' : deal.stage === 'In transit' ? '60%' : '100%',
                  }}
                />
              </div>
            </div>

            {/* Compact Chips */}
            <div className="flex items-center gap-2 flex-wrap text-[11px]">
              <span className="px-2.5 py-1 rounded-lg bg-surface-subtle border border-surface-muted font-mono font-medium text-ink-secondary">
                E-manifest MAN-2026-0412 (simulated)
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-surface-subtle border border-surface-muted font-medium text-ink-secondary">
                GPS-tracked vehicle
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-status-success font-bold flex items-center gap-1">
                ✓ E-seal intact
              </span>
            </div>

            {/* ETA Line */}
            <div className="text-xs text-ink-secondary pt-2 border-t border-surface-subtle">
              Pickups: <strong>08:30</strong> (Muzaffarnagar), <strong>11:00</strong> (Ghaziabad) · ETA: <strong>22 Oct, ~02:00</strong> at Gate #4
            </div>
          </div>
        </div>

        {/* Right Column: Two-Stage Quality Verification & Payout (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="bg-surface rounded-3xl p-6 sm:p-8 border border-surface-subtle shadow-card">
            <div className="flex items-center justify-between pb-4 border-b border-surface-subtle mb-4">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-brand-600">
                  Receiver Gate Checks
                </span>
                <h3 className="text-lg font-bold text-ink-primary mt-0.5">
                  Chemical Verification & Staged Release
                </h3>
              </div>

              {/* Demo Fail Toggle */}
              <div className="flex items-center gap-2 bg-surface-subtle px-3 py-1.5 rounded-xl border border-surface-muted">
                <span className="text-[11px] font-semibold text-ink-secondary">
                  Demo fail path:
                </span>
                <button
                  onClick={() => setForceFailMode(!forceFailMode)}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-colors ${
                    forceFailMode
                      ? 'bg-status-error text-white'
                      : 'bg-surface text-ink-muted border border-surface-muted'
                  }`}
                >
                  {forceFailMode ? 'FAIL ON' : 'NORMAL'}
                </button>
              </div>
            </div>

            {/* Dispute or Pass Banners */}
            {deal.disputeActive && (
              <div className="mb-4 p-4 rounded-2xl bg-status-error-bg/60 border border-status-error text-xs space-y-2">
                <div className="flex items-center gap-2 text-status-error font-bold text-sm">
                  <XCircle className="w-5 h-5 flex-shrink-0" />
                  <span>Funds held. Re-test or return load</span>
                </div>
                <p className="text-red-900 leading-relaxed">
                  {deal.verification?.rejectionReason || 'Chloride threshold breached kiln envelope. Batch held in tanker manifold.'}
                </p>
                <div className="pt-2 border-t border-red-200 text-[11px] text-red-800 font-semibold">
                  Zero payout released. Transporter instructed to hold segregated tank valve closed.
                </div>
              </div>
            )}

            {deal.verification && !deal.disputeActive && (
              <div className="mb-4 p-3 rounded-2xl bg-status-success-bg/40 border border-status-success text-xs flex items-center gap-2 text-status-success font-semibold">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>Gate checks verified: Within kiln acceptance limits.</span>
              </div>
            )}

            {/* Checks List */}
            {deal.verification ? (
              <div className="space-y-4">
                {/* Stage 1 Gate Checks */}
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-ink-primary mb-2">
                    <span>Stage 1: In-Line Gate Checks (80% = ₹21,000)</span>
                    {deal.stage1Released ? (
                      <span className="text-status-success text-[11px] font-bold">✓ Released (₹21,000)</span>
                    ) : (
                      <span className="text-brand-600 text-[11px]">Ready for Release</span>
                    )}
                  </div>

                  <div className="space-y-2">
                    {deal.verification.checks.slice(0, 3).map((chk, i) => (
                      <div
                        key={i}
                        className={`p-2.5 rounded-xl border text-xs flex items-center justify-between gap-3 ${
                          chk.pass ? 'bg-surface border-surface-muted' : 'bg-status-error-bg/30 border-red-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {chk.pass ? (
                            <CheckCircle2 className="w-4 h-4 text-status-success flex-shrink-0" />
                          ) : (
                            <XCircle className="w-4 h-4 text-status-error flex-shrink-0" />
                          )}
                          <div>
                            <div className="font-bold text-ink-primary">{chk.name}</div>
                            <div className="text-[10px] text-ink-muted">Target: {chk.expected}</div>
                          </div>
                        </div>
                        <div className="text-right font-mono font-bold text-ink-primary">
                          {chk.measured}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Stage 1 Action Button */}
                  {!deal.disputeActive && !deal.stage1Released && (
                    <button
                      onClick={handleReleaseStage1}
                      className="mt-3 w-full py-2.5 px-4 rounded-xl bg-status-success hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all active:scale-98 flex items-center justify-center gap-2"
                    >
                      <Unlock className="w-4 h-4" />
                      <span>Release stage 1 (₹21,000)</span>
                    </button>
                  )}
                </div>

                {/* Stage 2 Lab Checks */}
                <div className="pt-3 border-t border-surface-subtle">
                  <div className="flex items-center justify-between text-xs font-bold text-ink-primary mb-2">
                    <span>Stage 2: Trace Heavy Metals Lab Report (20% = ₹5,250)</span>
                    {deal.stage2Released ? (
                      <span className="text-status-success text-[11px] font-bold">✓ Released (₹5,250)</span>
                    ) : isLabPassed ? (
                      <span className="text-status-success text-[11px]">Passed</span>
                    ) : (
                      <span className="text-amber-700 text-[11px]">Pending (24 to 48 h)</span>
                    )}
                  </div>

                  {/* Trace metal check row */}
                  {deal.verification.checks.length > 3 && (
                    <div className="p-2.5 rounded-xl border border-surface-muted bg-surface text-xs flex items-center justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        {isLabPassed ? (
                          <CheckCircle2 className="w-4 h-4 text-status-success flex-shrink-0" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                        )}
                        <div>
                          <div className="font-bold text-ink-primary">{deal.verification.checks[3].name}</div>
                          <div className="text-[10px] text-ink-muted">Target: {deal.verification.checks[3].expected}</div>
                        </div>
                      </div>
                      <div className="text-right font-mono text-xs">
                        {isLabPassed ? (
                          <span className="font-bold text-status-success">{deal.verification.checks[3].measured}</span>
                        ) : (
                          <span className="text-amber-600 font-semibold">Pending Analysis</span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Stage 2 Actions */}
                  {!deal.disputeActive && (
                    <div className="space-y-2 mt-2">
                      {!isLabPassed && (
                        <button
                          onClick={handleSimulateLab}
                          className="w-full py-2 px-3 rounded-xl bg-surface-subtle hover:bg-surface-muted text-ink-primary text-xs font-semibold border border-surface-muted transition-colors flex items-center justify-center gap-1.5"
                        >
                          <FileCheck className="w-4 h-4 text-brand-600" />
                          <span>Simulate lab report</span>
                        </button>
                      )}

                      {isLabPassed && deal.stage1Released && !deal.stage2Released && (
                        <button
                          onClick={handleReleaseStage2}
                          className="w-full py-2.5 px-4 rounded-xl bg-status-success hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all active:scale-98 flex items-center justify-center gap-2"
                        >
                          <Unlock className="w-4 h-4" />
                          <span>Release stage 2 (₹5,250)</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Awaiting gate check */
              <div className="py-8 text-center flex flex-col items-center justify-center">
                <div className="w-14 h-14 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 mb-3">
                  <FileCheck className="w-7 h-7" />
                </div>
                <h4 className="text-sm font-bold text-ink-primary">
                  Awaiting Delivery Arrival
                </h4>
                <p className="text-xs text-ink-secondary max-w-xs mt-1 mb-6">
                  Simulate delivery transit on the left to dock the tanker at Gate #4 and run in-line titration checks.
                </p>
                <button
                  onClick={handleRunVerification}
                  disabled={isVerifying}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-all shadow-card active:scale-95"
                >
                  <Sparkles className="w-4 h-4 text-brand-200" />
                  <span>{isVerifying ? 'Testing Spectrophotometry...' : 'Run Gate Titration Verification'}</span>
                </button>
              </div>
            )}
          </div>

          {/* Certificate Display ONLY when not in dispute and funds released (Task 3) */}
          {!deal.disputeActive && deal.stage === 'Funds released' && deal.certificate && (
            <CertificateCard
              certificate={deal.certificate}
              onPrint={handlePrint}
            />
          )}
        </div>
      </div>

      {/* Bottom Impact Summary (Task 1: Derived from economics.ts) */}
      <div className="bg-ink-primary rounded-3xl p-6 sm:p-8 text-white relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-brand-300 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Lifecycle Symbiosis Outcome</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black font-display">
              Quantified Value Generated This Cycle
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-white/60">SDG 9.4 • 12.5 • 8.4 Aligned</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Net Economic Gain (Task 1) */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-xs font-bold text-brand-300 block mb-1">
              Net Economic Gain
            </span>
            <div className="text-3xl sm:text-4xl font-black font-display text-white">
              ₹{ESCROW_HERO_DEAL.netEconomicGainInr.toLocaleString()}
            </div>
            <p className="text-[11px] text-surface-subtle mt-1">
              {ESCROW_HERO_DEAL.impactSubtext}
            </p>
          </div>

          {/* Greenhouse Gases Avoided (Task 1: 1.6 t CO2e with How Estimated popover) */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 relative">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-emerald-300">
                Greenhouse Gases Avoided
              </span>
              <button
                onClick={() => setShowCo2Popover(!showCo2Popover)}
                className="text-[11px] text-emerald-300 hover:text-white flex items-center gap-1 underline underline-offset-2"
                title="How estimated"
              >
                <HelpCircle className="w-3 h-3" />
                <span>How estimated</span>
              </button>
            </div>
            <div className="text-3xl sm:text-4xl font-black font-display text-emerald-400">
              {CO2_ESTIMATED_TONNES} <span className="text-lg">t CO₂e (estimated)</span>
            </div>
            <p className="text-[11px] text-surface-subtle mt-1">
              Avoided neutralization chemicals + avoided mined iron corrective − transport emissions
            </p>

            {/* How Estimated Popover (Task 1) */}
            {showCo2Popover && (
              <div className="absolute bottom-full left-0 right-0 mb-2 p-4 bg-slate-900 border border-slate-700 rounded-2xl text-xs text-white shadow-elevated z-30">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                  <span className="font-bold text-emerald-400">CO₂ Methodology & Breakdown</span>
                  <button onClick={() => setShowCo2Popover(false)} className="text-slate-400 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-1.5 font-mono text-[11px]">
                  {CO2_ESTIMATION_METHOD.factors.map((f, i) => (
                    <div key={i} className="flex justify-between">
                      <span className="text-slate-300">{f.label}:</span>
                      <strong className="text-emerald-300">{f.value}</strong>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-slate-400 italic">
                  {CO2_ESTIMATION_METHOD.note}
                </div>
              </div>
            )}
          </div>

          {/* Diverted from Landfill Tile */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-xs font-bold text-amber-300 block mb-1">
              Diverted From Landfill
            </span>
            <div className="text-3xl sm:text-4xl font-black font-display text-amber-400">
              {ESCROW_HERO_DEAL.divertedTonnes.toFixed(1)} <span className="text-lg">Tonnes</span>
            </div>
            <p className="text-[11px] text-surface-subtle mt-1">
              100% circular valorization across Shree Ganesh and Bharat Paper
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
