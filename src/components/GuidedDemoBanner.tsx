import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Pause, SkipForward, X, Sparkles, Compass } from 'lucide-react';
import { useDemoStore } from '../store/demoStore';

export const GuidedDemoBanner: React.FC = () => {
  const navigate = useNavigate();
  const {
    guidedDemo,
    pauseGuidedDemo,
    resumeGuidedDemo,
    nextGuidedDemoStep,
    stopGuidedDemo,
    addSampleFiles,
    runAnalysis,
    runOptimizer,
    selectMatch,
    simulateDeliveryTransit,
    runVerificationCheck,
    releaseStage1,
    simulateLabReport,
    releaseStage2,
    matches,
  } = useDemoStore();

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Guided demo scenario steps (Task 7)
  const DEMO_STAGES = [
    {
      index: 0,
      title: '1. Ingestion: Multimodal waste inputs',
      caption: 'Step 1/7: Loading SGS lab assay, storage vat photos, NIR scan, and shift supervisor voice logs for Shree Ganesh Galvanizers.',
      duration: 3500,
      action: async () => {
        navigate('/generator');
        addSampleFiles();
      },
    },
    {
      index: 1,
      title: '2. Fingerprinting: Chemical passport & completeness',
      caption: 'Step 2/7: Multimodal AI extracts key chemical parameters with Tier 1 on-site completeness and Human-in-the-Loop verification.',
      duration: 4500,
      action: async () => {
        navigate('/generator');
        await runAnalysis();
      },
    },
    {
      index: 2,
      title: '3. Receiver Registry: SPCB Public Index',
      caption: 'Step 3/7: Receivers come from public SPCB/CPCB registries, then claim their profile and complete quality envelope specs.',
      duration: 4500,
      action: async () => {
        navigate('/receivers');
      },
    },
    {
      index: 3,
      title: '4. Optimization: CP-SAT Constraint Solver',
      caption: 'Step 4/7: CP-SAT solver evaluates feasibility across CPCB & EU BREF rules with multi-stop vehicle sequencing.',
      duration: 4500,
      action: async () => {
        navigate('/matching');
        await runOptimizer();
      },
    },
    {
      index: 4,
      title: '5. The Shared Bundle: 91% Full Tanker',
      caption: 'Step 5/7: Two half-empty loads become one 91% full tanker (Muzaffarnagar 9t + Ghaziabad 12t to Aravali Kiln). Net benefit: ₹40,550.',
      duration: 4500,
      action: async () => {
        navigate('/matching');
        if (matches.length > 0) {
          selectMatch(matches[0]);
        }
      },
    },
    {
      index: 5,
      title: '6. Settlement & Transit: 820 km Road Milestones',
      caption: 'Step 6/7: Receiver payment of ₹26,250 held in escrow. Vehicle GPS & E-seals monitored across 820 km to Gate #4.',
      duration: 4000,
      action: async () => {
        navigate('/settlement');
        await simulateDeliveryTransit();
      },
    },
    {
      index: 6,
      title: '7. Staged Verification: Payout & Diversion Certificate',
      caption: 'Step 7/7: Gate checks pass (Stage 1 released: ₹21,000). Lab report verified (Stage 2 released: ₹5,250). Diversion Certificate issued!',
      duration: 5500,
      action: async () => {
        navigate('/settlement');
        await runVerificationCheck();
        await new Promise((r) => setTimeout(r, 600));
        await releaseStage1();
        await new Promise((r) => setTimeout(r, 600));
        await simulateLabReport();
        await new Promise((r) => setTimeout(r, 600));
        await releaseStage2();
      },
    },
  ];

  const currentStage = DEMO_STAGES[guidedDemo.stepIndex] || DEMO_STAGES[DEMO_STAGES.length - 1];

  useEffect(() => {
    if (!guidedDemo.isActive || guidedDemo.isPaused) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    if (currentStage && currentStage.action) {
      currentStage.action();
    }

    timerRef.current = setTimeout(() => {
      if (guidedDemo.stepIndex < DEMO_STAGES.length - 1) {
        nextGuidedDemoStep();
      } else {
        stopGuidedDemo();
      }
    }, currentStage?.duration || 4500);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [guidedDemo.isActive, guidedDemo.isPaused, guidedDemo.stepIndex]);

  if (!guidedDemo.isActive) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-3xl">
      <div className="bg-ink-primary/95 text-white backdrop-blur-lg px-5 py-4 rounded-2xl shadow-elevated border border-brand-500/30 flex flex-col gap-3">
        {/* Header row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-500"></span>
            </span>
            <span className="text-xs font-bold tracking-wider uppercase text-brand-300 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              Guided Live Demonstration
            </span>
            <span className="text-xs text-ink-muted">
              ({guidedDemo.stepIndex + 1}/{DEMO_STAGES.length})
            </span>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {guidedDemo.isPaused ? (
              <button
                onClick={resumeGuidedDemo}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors text-xs flex items-center gap-1 px-2.5"
                title="Resume auto-play"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Resume</span>
              </button>
            ) : (
              <button
                onClick={pauseGuidedDemo}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors text-xs flex items-center gap-1 px-2.5"
                title="Pause auto-play"
              >
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Pause</span>
              </button>
            )}

            <button
              onClick={() => {
                if (guidedDemo.stepIndex < DEMO_STAGES.length - 1) {
                  nextGuidedDemoStep();
                } else {
                  stopGuidedDemo();
                }
              }}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors text-xs flex items-center gap-1 px-2.5"
              title="Skip to next step"
            >
              <SkipForward className="w-3.5 h-3.5" />
              <span>Next</span>
            </button>

            <button
              onClick={stopGuidedDemo}
              className="p-1.5 rounded-lg text-ink-muted hover:text-white transition-colors"
              title="Exit guided demo"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Narrative caption */}
        <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-surface-subtle font-medium flex items-center gap-3">
          <Sparkles className="w-4 h-4 text-brand-400 flex-shrink-0 animate-pulse" />
          <p className="leading-snug text-balance">{currentStage?.caption}</p>
        </div>

        {/* Mini progress bar */}
        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-brand-500 h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${((guidedDemo.stepIndex + 1) / DEMO_STAGES.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
