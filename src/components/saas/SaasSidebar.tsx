import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Layers,
  FileText,
  FlaskConical,
  Calculator,
  Truck,
  ShieldCheck,
  Network,
  Building2,
  FileBadge,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { useSaasStore } from '../../store/saasStore';

export const SaasSidebar: React.FC = () => {
  const { facility, openSpcbModal } = useSaasStore();

  const coreNavItems = [
    {
      name: 'Overview',
      path: '/app/overview',
      icon: Layers,
      badge: null,
    },
    {
      name: 'Material Analysis',
      path: '/app/analysis',
      icon: FileText,
      badge: '50 Params',
    },
    {
      name: 'Find a Laboratory',
      path: '/app/laboratories',
      icon: FlaskConical,
      badge: '6 Labs',
    },
    {
      name: 'Cost Analysis',
      path: '/app/costs',
      icon: Calculator,
      badge: '₹40.5k',
    },
    {
      name: 'Transport Recommendations',
      path: '/app/transport',
      icon: Truck,
      badge: 'Class 8',
    },
  ];

  const solverItems = [
    {
      name: 'Match & Bundle Optimizer',
      path: '/matching',
      icon: Network,
    },
    {
      name: 'Escrow Settlement',
      path: '/settlement',
      icon: ShieldCheck,
    },
    {
      name: 'Receiver Registry',
      path: '/receivers',
      icon: Building2,
    },
  ];

  return (
    <aside className="w-[240px] shrink-0 bg-surface border-r border-[#E2E4DC] flex flex-col justify-between h-[calc(100vh-4rem)] sticky top-16 shadow-subtle z-20">
      <div className="p-3.5 space-y-5 overflow-y-auto">
        {/* Core Capabilities Section */}
        <div>
          <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
            CORE CAPABILITIES
          </div>
          <nav className="space-y-1">
            {coreNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group ${
                      isActive
                        ? 'bg-[#FDF2F2] text-[#D1343A] shadow-sm font-bold border border-[#D1343A]/20'
                        : 'text-[#1E293B] hover:text-[#0B0F19] hover:bg-surface-subtle'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-2.5">
                        <Icon
                          className={`w-4 h-4 transition-colors ${
                            isActive
                              ? 'text-[#D1343A]'
                              : 'text-[#64748B] group-hover:text-[#0B0F19]'
                          }`}
                        />
                        <span className="truncate">{item.name}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                            isActive
                              ? 'bg-[#D1343A] text-white'
                              : 'bg-surface-subtle text-[#64748B] group-hover:bg-[#E2E4DC]/60'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Advanced Optimization Solvers */}
        <div>
          <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-[#64748B] flex items-center justify-between">
            <span>SOLVERS & ESCROW</span>
            <Sparkles className="w-3 h-3 text-[#D1343A]" />
          </div>
          <nav className="space-y-1">
            {solverItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all group ${
                      isActive
                        ? 'bg-[#FDF2F2] text-[#D1343A] shadow-sm font-bold border border-[#D1343A]/20'
                        : 'text-[#64748B] hover:text-[#0B0F19] hover:bg-surface-subtle'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        className={`w-4 h-4 transition-colors ${
                          isActive
                            ? 'text-[#D1343A]'
                            : 'text-[#64748B] group-hover:text-[#0B0F19]'
                        }`}
                      />
                      <span className="truncate">{item.name}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom: Active Facility License Card */}
      <div className="p-3 border-t border-[#E2E4DC] bg-surface-subtle/70">
        <button
          onClick={openSpcbModal}
          className="w-full text-left p-3 rounded-xl bg-surface border border-[#E2E4DC] hover:border-[#D1343A]/40 transition-all shadow-subtle group cursor-pointer"
        >
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <FileBadge className="w-3.5 h-3.5 text-[#D1343A]" />
              <span className="text-[11px] font-bold text-[#0B0F19]">
                Active Facility License
              </span>
            </div>
            <span className="inline-flex items-center px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-[#DCFCE7] text-[#16A34A]">
              Active
            </span>
          </div>

          <div className="space-y-0.5">
            <div className="text-[10px] text-[#64748B] font-medium">SPCB Authorization #</div>
            <div className="text-[11px] font-mono font-bold text-[#1E293B] truncate">
              {facility.spcbAuthNo}
            </div>
          </div>

          <div className="mt-2 pt-2 border-t border-[#E2E4DC]/70 flex items-center justify-between text-[10px] text-[#64748B]">
            <span>{facility.spcbValidity}</span>
            <ExternalLink className="w-3 h-3 text-[#64748B] group-hover:text-[#D1343A] transition-colors" />
          </div>
        </button>
      </div>
    </aside>
  );
};
