import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Layers,
  FileBadge,
  FlaskConical,
  Store,
  Truck,
  Receipt,
  FileText,
  Building2,
  ExternalLink,
} from 'lucide-react';
import { useDashboardStore } from '../../store/dashboardStore';

interface SellerSidebarProps {
  onNavigate?: () => void;
  isMobile?: boolean;
}

export const SellerSidebar: React.FC<SellerSidebarProps> = ({ onNavigate, isMobile }) => {
  const { currentUser, wasteStreams, offers, shipments } = useDashboardStore();

  const missingLabCount = wasteStreams.filter((s) => !s.hasLabReport).length;
  const pendingOffersCount = offers.filter((o) => o.status === 'Quoted' || o.status === 'Countered').length;

  const navItems = [
    {
      name: 'Overview',
      path: '/seller',
      icon: Layers,
      end: true,
    },
    {
      name: 'Registration & KYC',
      path: '/seller/kyc',
      icon: FileBadge,
      badge: currentUser.verificationStatus,
      badgeColor: 'bg-[#DCFCE7] text-[#16A34A]',
    },
    {
      name: 'Waste Streams & AI',
      path: '/seller/streams',
      icon: FileText,
      badge: `${wasteStreams.length} Streams`,
      badgeColor: 'bg-surface-subtle text-[#1E293B]',
    },
    {
      name: 'Find Labs Near Me',
      path: '/seller/labs',
      icon: FlaskConical,
      badge: missingLabCount > 0 ? `${missingLabCount} Needs Lab` : 'Directory',
      badgeColor: missingLabCount > 0 ? 'bg-[#FEF3C7] text-[#D97706]' : 'bg-surface-subtle text-[#64748B]',
    },
    {
      name: 'Marketplace & Offers',
      path: '/seller/marketplace',
      icon: Store,
      badge: pendingOffersCount > 0 ? `${pendingOffersCount} New` : null,
      badgeColor: 'bg-[#FDF2F2] text-[#D1343A]',
    },
    {
      name: 'Transport & Form 10',
      path: '/seller/shipments',
      icon: Truck,
      badge: 'Form 10',
      badgeColor: 'bg-surface-subtle text-[#1E293B]',
    },
    {
      name: 'Payments & Reports',
      path: '/seller/settlement',
      icon: Receipt,
      badge: 'Escrow',
      badgeColor: 'bg-[#DCFCE7] text-[#16A34A]',
    },
  ];

  return (
    <aside
      className={
        isMobile
          ? 'w-full flex flex-col justify-between'
          : 'w-[264px] shrink-0 bg-white border-r border-[#E2E4DC] flex flex-col justify-between h-[calc(100vh-4rem)] sticky top-16 shadow-subtle z-20'
      }
    >
      <div className="p-3.5 space-y-3 overflow-y-auto">
        <div className="px-3 pt-1 pb-0.5 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400">
          <span>Seller Capabilities</span>
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={() => onNavigate?.()}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                    isActive
                      ? 'bg-[#FDF2F2] text-[#D1343A] shadow-sm font-bold border border-[#D1343A]/20'
                      : 'text-slate-700 hover:text-[#0B0F19] hover:bg-slate-50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-2.5 min-w-0 flex-1 mr-2">
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive ? 'text-[#D1343A]' : 'text-slate-400 group-hover:text-slate-800'
                        }`}
                      />
                      <span className="truncate">{item.name}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`inline-flex items-center gap-1.5 text-[10px] font-medium leading-none px-2 py-1 rounded-full whitespace-nowrap shrink-0 border transition-colors ${
                          isActive
                            ? 'bg-[#D1343A]/10 text-[#D1343A] border-[#D1343A]/20'
                            : item.badgeColor || 'bg-slate-50 text-slate-500 border-slate-200/80'
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

      {/* Bottom Facility SPCB Card */}
      <div className="p-3 border-t border-[#E2E4DC] bg-slate-50/80">
        <div className="p-3 rounded-xl bg-white border border-[#E2E4DC] shadow-sm">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              SPCB AUTHORIZATION
            </span>
            <span className="inline-flex items-center gap-1 text-[9px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80 px-2 py-0.5 rounded-full">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              Active
            </span>
          </div>
          <div className="text-xs font-mono font-bold text-slate-900 truncate">
            {currentUser.spcbAuthNo || 'UPPCB/HW/GZB/2024/7741'}
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            Plant #2 · Ghaziabad, UP
          </div>
        </div>
      </div>
    </aside>
  );
};
