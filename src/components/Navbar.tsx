import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Play, RotateCcw, Sparkles, CheckCircle2, ChevronRight, Layers, Menu, X, ArrowRight } from 'lucide-react';
import { useDemoStore } from '../store/demoStore';
import { SimulatedBadge } from './SimulatedBadge';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-surface-subtle shadow-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2.5 sm:gap-3 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105 shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-ink-primary font-display">
                  Waste<span className="text-brand-600">Match</span>
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-ink-muted hidden sm:block -mt-0.5">
                Autonomous Industrial Symbiosis Engine
              </p>
            </div>
          </Link>
          <div className="hidden lg:block ml-2">
            <SimulatedBadge subtle />
          </div>
        </div>

        {/* On Landing Page: Desktop Role Dashboard Links */}
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

        {/* Action Controls & Mobile Menu Hamburger */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <Link
            to="/login"
            className="hidden sm:inline-flex px-3.5 py-2 rounded-xl text-xs font-semibold text-stone-700 hover:text-[#0B0F19] hover:bg-stone-100 border border-stone-200 transition"
          >
            Login
          </Link>

          <Link
            to="/seller"
            className="hidden xs:inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-[#D1343A] hover:bg-[#A81818] text-white shadow-sm transition-all active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-white/80" />
            <span>Launch Platform</span>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 rounded-xl text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition active:scale-95"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Down Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-4 shadow-xl animate-in slide-in-from-top-2 duration-150">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-2">
              Role-Based Portals
            </p>
            <div className="space-y-1">
              <Link
                to="/seller"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl bg-red-50/50 hover:bg-red-50 text-stone-900 font-semibold text-sm transition"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span>1. Seller Portal (Generator)</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#D1343A]" />
              </Link>
              <Link
                to="/buyer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl bg-blue-50/50 hover:bg-blue-50 text-stone-900 font-semibold text-sm transition"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span>2. Buyer Portal (Receiver)</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#2563EB]" />
              </Link>
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl bg-amber-50/50 hover:bg-amber-50 text-stone-900 font-semibold text-sm transition"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span>3. Admin Console (KYC & Ops)</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-800" />
              </Link>
            </div>
          </div>

          <div className="pt-2 border-t border-stone-100 flex flex-col gap-2">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 px-4 text-center rounded-xl text-sm font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 transition"
            >
              1-Click Demo Personas
            </Link>
            <Link
              to="/seller"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 px-4 text-center rounded-xl text-sm font-semibold bg-[#D1343A] text-white shadow-sm hover:bg-[#A81818] transition"
            >
              Launch Platform Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};


