import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Play, RotateCcw, Sparkles, CheckCircle2, ChevronRight, Layers } from 'lucide-react';
import { useDemoStore } from '../store/demoStore';
import { SimulatedBadge } from './SimulatedBadge';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    fingerprint,
    matches,
    deal,
    guidedDemo,
    startGuidedDemo,
    resetAll,
  } = useDemoStore();

  const isLanding = location.pathname === '/';

  const steps = [
    {
      num: 1,
      title: 'Fingerprint',
      path: '/generator',
      done: !!fingerprint,
      active: location.pathname === '/generator',
    },
    {
      num: 2,
      title: 'Match & Optimize',
      path: '/matching',
      done: matches.length > 0,
      active: location.pathname === '/matching',
    },
    {
      num: 3,
      title: 'Settle & Trust',
      path: '/settlement',
      done: deal.stage === 'Funds released' || deal.stage === 'Gate verified',
      active: location.pathname === '/settlement',
    },
  ];

  const handleReset = () => {
    resetAll();
    navigate('/');
  };

  const handleStartDemo = () => {
    startGuidedDemo();
    navigate('/generator');
  };

  return (
    <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-surface-subtle shadow-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-ink-primary font-display">
                  Waste<span className="text-brand-600">Match</span>
                </span>
              </div>
              <p className="text-[11px] text-ink-muted hidden sm:block -mt-0.5">
                Autonomous Industrial Symbiosis Engine
              </p>
            </div>
          </Link>
          <div className="hidden lg:block ml-2">
            <SimulatedBadge subtle />
          </div>
        </div>

        {/* On Landing Page: Direct Role Dashboard Links */}
        {isLanding ? (
          <nav className="hidden md:flex items-center gap-2">
            <Link
              to="/seller"
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-stone-700 hover:text-[#D1343A] hover:bg-red-50/50 transition border border-transparent hover:border-red-100 flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              1. Seller Portal
            </Link>
            <Link
              to="/buyer"
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-stone-700 hover:text-[#D1343A] hover:bg-blue-50/50 transition border border-transparent hover:border-blue-100 flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              2. Buyer Portal
            </Link>
            <Link
              to="/admin"
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-stone-700 hover:text-[#D1343A] hover:bg-amber-50/50 transition border border-transparent hover:border-amber-100 flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              3. Admin Console
            </Link>
          </nav>
        ) : (
          /* 3-Step Interactive Pipeline Stepper when in legacy demo */
          <nav className="hidden md:flex items-center gap-1 bg-surface-subtle/80 p-1.5 rounded-full border border-surface-muted/60">
            {steps.map((step, idx) => (
              <React.Fragment key={step.num}>
                <Link
                  to={step.path}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    step.active
                      ? 'bg-surface text-brand-700 shadow-sm font-bold border border-surface-muted'
                      : step.done
                      ? 'text-status-success hover:text-status-success hover:bg-surface/50'
                      : 'text-ink-secondary hover:text-ink-primary hover:bg-surface/40'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      step.active
                        ? 'bg-brand-600 text-white'
                        : step.done
                        ? 'bg-status-success-bg text-status-success'
                        : 'bg-surface-muted text-ink-secondary'
                    }`}
                  >
                    {step.done ? <CheckCircle2 className="w-3.5 h-3.5" /> : step.num}
                  </span>
                  <span>{step.title}</span>
                </Link>
                {idx < steps.length - 1 && (
                  <ChevronRight className="w-3.5 h-3.5 text-ink-muted/50" />
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <Link
            to="/login"
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-stone-700 hover:text-[#0B0F19] hover:bg-stone-100 border border-stone-200 transition"
          >
            Demo Login
          </Link>

          <Link
            to="/seller"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-[#D1343A] hover:bg-[#A81818] text-white shadow-sm transition-all active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-white/80" />
            <span>Launch Platform</span>
          </Link>
        </div>
      </div>
    </header>
  );
};


