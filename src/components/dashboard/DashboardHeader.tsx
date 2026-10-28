import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Building2,
  ShieldCheck,
  Bell,
  ArrowRightLeft,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sparkles,
  Menu,
  X,
} from 'lucide-react';
import { useDashboardStore, UserRole, SEED_USERS } from '../../store/dashboardStore';

export const DashboardHeader: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, switchRole, toggleMobileMenu, isMobileMenuOpen } = useDashboardStore();

  const handleRoleSwitch = (newRole: UserRole) => {
    switchRole(newRole);
    if (newRole === 'seller') navigate('/seller');
    else if (newRole === 'buyer') navigate('/buyer');
    else if (newRole === 'admin') navigate('/admin');
  };

  return (
    <header className="sticky top-0 z-40 h-16 bg-white border-b border-[#E2E4DC] px-3 sm:px-6 flex items-center justify-between shadow-subtle">
      {/* Brand Logo & Mobile Hamburger */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile Hamburger Drawer Trigger */}
        <button
          type="button"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
          className="lg:hidden p-2 -ml-1 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition active:scale-95"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <Link to={`/${currentUser.role}`} className="flex items-center gap-2 sm:gap-2.5 group">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#D1343A] hover:bg-[#A81818] flex items-center justify-center text-white shadow-sm transition-all duration-200 shrink-0">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" />
              <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12" />
              <path d="m14 16-3 3 3 3" />
              <path d="M8.293 13.596 5.8 9.5a1.784 1.784 0 0 1 0-1.774l3.944-6.821a1.83 1.83 0 0 1 1.57-.89 1.83 1.83 0 0 1 1.57.89l2.4 4.156" />
              <path d="m14.9 8.5 3.1 5.38" />
              <path d="m7 10 3-3-3-3" />
              <path d="m17 14 3-3-3-3" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base sm:text-lg font-bold tracking-tight text-[#0B0F19]">
                Waste<span className="text-[#D1343A]">Match</span>
              </span>
              <span
                className={`text-[9px] sm:text-[10px] uppercase tracking-wider font-bold px-1.5 sm:px-2 py-0.5 rounded-full whitespace-nowrap ${
                  currentUser.role === 'seller'
                    ? 'bg-[#DCFCE7] text-[#16A34A] border border-[#16A34A]/20'
                    : currentUser.role === 'buyer'
                    ? 'bg-[#EFF6FF] text-[#2563EB] border border-[#2563EB]/20'
                    : 'bg-[#FEF3C7] text-[#D97706] border border-[#D97706]/20'
                }`}
              >
                {currentUser.role === 'seller'
                  ? 'Seller'
                  : currentUser.role === 'buyer'
                  ? 'Buyer'
                  : 'Admin'}
              </span>
            </div>
            <p className="text-[10px] text-[#64748B] font-medium leading-none hidden md:block">
              {currentUser.businessName}
            </p>
          </div>
        </Link>
      </div>

      {/* Center: Quick 1-Click Role Switcher */}
      <div className="hidden lg:flex items-center gap-1 p-1 bg-surface-subtle rounded-xl border border-[#E2E4DC]">
        <span className="text-[10px] font-bold text-[#64748B] px-2 flex items-center gap-1">
          <ArrowRightLeft className="w-3 h-3 text-[#D1343A]" /> Demo Role:
        </span>
        <button
          onClick={() => handleRoleSwitch('seller')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            currentUser.role === 'seller'
              ? 'bg-[#D1343A] text-white shadow-sm'
              : 'text-[#1E293B] hover:text-[#0B0F19] hover:bg-surface'
          }`}
        >
          1. Seller (Generator)
        </button>
        <button
          onClick={() => handleRoleSwitch('buyer')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            currentUser.role === 'buyer'
              ? 'bg-[#2563EB] text-white shadow-sm'
              : 'text-[#1E293B] hover:text-[#0B0F19] hover:bg-surface'
          }`}
        >
          2. Buyer (Receiver)
        </button>
        <button
          onClick={() => handleRoleSwitch('admin')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            currentUser.role === 'admin'
              ? 'bg-[#0B0F19] text-white shadow-sm'
              : 'text-[#1E293B] hover:text-[#0B0F19] hover:bg-surface'
          }`}
        >
          3. Admin (Ops & KYC)
        </button>
      </div>

      {/* Right: SPCB Status, Home link, Mobile Quick Switch & User Avatar */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Mobile 1-Tap Role Cycle Button */}
        <button
          type="button"
          onClick={() => {
            const roles: UserRole[] = ['seller', 'buyer', 'admin'];
            const nextRole = roles[(roles.indexOf(currentUser.role) + 1) % 3];
            handleRoleSwitch(nextRole);
          }}
          className="lg:hidden inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200/80 transition active:scale-95 shadow-sm"
          title="Tap to toggle next demo role"
        >
          <ArrowRightLeft className="w-3 h-3 text-[#D1343A]" />
          <span className="capitalize">{currentUser.role}</span>
        </button>

        <Link
          to="/"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200 transition"
          title="Return to Public Landing Page"
        >
          <span>Home</span>
        </Link>

        {currentUser.spcbAuthNo && (
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#DCFCE7] border border-[#16A34A]/30 text-[#16A34A] text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span className="font-mono text-[11px] font-bold">SPCB Verified</span>
          </div>
        )}

        {/* User Info Avatar */}
        <Link
          to="/login"
          title="Switch User Persona"
          className="flex items-center gap-2 pl-2 border-l border-[#E2E4DC] hover:opacity-80 transition"
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-subtle ${
              currentUser.role === 'seller'
                ? 'bg-[#D1343A]'
                : currentUser.role === 'buyer'
                ? 'bg-[#2563EB]'
                : 'bg-[#0B0F19]'
            }`}
          >
            {currentUser.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .slice(0, 2)}
          </div>
          <div className="hidden md:block text-left">
            <p className="text-xs font-bold text-[#0B0F19] leading-tight">
              {currentUser.name}
            </p>
            <p className="text-[10px] text-[#64748B] capitalize leading-none">
              {currentUser.role}
            </p>
          </div>
        </Link>
      </div>
    </header>
  );
};

