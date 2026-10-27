import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Bell,
  Building2,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';
import { useSaasStore } from '../../store/saasStore';

export const SaasTopHeader: React.FC = () => {
  const {
    facility,
    openGlobalSearch,
    toggleNotifications,
    notifications,
    openSpcbModal,
  } = useSaasStore();

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Keyboard shortcut listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openGlobalSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openGlobalSearch]);

  return (
    <header className="sticky top-0 z-30 h-16 bg-surface border-b border-[#E2E4DC] px-4 sm:px-6 flex items-center justify-between shadow-subtle">
      {/* Left: Logo & Platform Title */}
      <div className="flex items-center gap-3">
        <Link to="/app/overview" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-[#D1343A] hover:bg-[#A81818] flex items-center justify-center text-white shadow-sm transition-all duration-200">
            {/* Minimal white recycle symbol */}
            <svg
              className="w-5 h-5 text-white"
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
              <span className="text-lg font-bold tracking-tight text-[#0B0F19]">
                Waste<span className="text-[#D1343A]">Match</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-surface-subtle text-[#64748B] border border-[#E2E4DC]">
                SaaS
              </span>
            </div>
            <p className="text-[10px] text-[#64748B] font-medium leading-none hidden md:block">
              Industrial Chemistry & HazMat Platform
            </p>
          </div>
        </Link>
      </div>

      {/* Middle: Facility Context Chip */}
      <div className="hidden lg:flex items-center">
        <button
          onClick={openSpcbModal}
          className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-surface-subtle border border-[#E2E4DC] hover:border-[#D1343A]/40 transition-colors group cursor-pointer shadow-subtle"
          title="Active Industrial Facility Context"
        >
          <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
          <Building2 className="w-3.5 h-3.5 text-[#64748B] group-hover:text-[#D1343A] transition-colors" />
          <span className="text-xs font-semibold text-[#1E293B]">
            {facility.name} {facility.unit}
          </span>
          <span className="text-xs text-[#64748B]">·</span>
          <span className="text-xs text-[#64748B]">{facility.city}, {facility.state}</span>
          <ChevronDown className="w-3 h-3 text-[#64748B]" />
        </button>
      </div>

      {/* Right: Global Search, Notifications, Compliance Pill, User Profile */}
      <div className="flex items-center gap-2.5">
        {/* Global Search Button */}
        <button
          onClick={openGlobalSearch}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-[#64748B] bg-surface-subtle hover:bg-surface border border-[#E2E4DC] rounded-lg transition-all shadow-subtle cursor-pointer"
        >
          <Search className="w-3.5 h-3.5 text-[#64748B]" />
          <span className="hidden sm:inline">Search chemical, lab, route...</span>
          <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-[#64748B] bg-surface rounded border border-[#E2E4DC]">
            Ctrl+K
          </kbd>
        </button>

        {/* SPCB Compliance Score Pill */}
        <button
          onClick={openSpcbModal}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#DCFCE7] border border-[#16A34A]/30 text-[#16A34A] hover:bg-[#bbf7d0] transition-colors cursor-pointer"
          title="SPCB Statutory Compliance Health Score: 95%"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span className="text-xs font-bold tracking-tight">Score {facility.spcbScore}%</span>
        </button>

        {/* Notifications Bell */}
        <button
          onClick={toggleNotifications}
          className="relative p-2 rounded-lg text-[#1E293B] hover:bg-surface-subtle border border-transparent hover:border-[#E2E4DC] transition-colors cursor-pointer"
          title="Notifications & Regulatory Alerts"
        >
          <Bell className="w-4 h-4 text-[#1E293B]" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#D1343A] text-white text-[9px] font-bold flex items-center justify-center animate-pulse">
              {unreadCount}
            </span>
          )}
        </button>

        {/* User Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-[#E2E4DC]">
          <div className="w-8 h-8 rounded-full bg-[#1E293B] text-white flex items-center justify-center text-xs font-bold tracking-wider shadow-subtle">
            RK
          </div>
          <div className="hidden xl:block text-left">
            <p className="text-xs font-bold text-[#0B0F19] leading-tight">
              {facility.contactPerson}
            </p>
            <p className="text-[10px] text-[#64748B] leading-none">
              Head of EHS
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
