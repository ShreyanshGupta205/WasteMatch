import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Layers,
  FileCheck2,
  SlidersHorizontal,
  Flame,
  Truck,
  CreditCard,
  Building2,
} from 'lucide-react';
import { useDashboardStore } from '../../store/dashboardStore';

interface BuyerSidebarProps {
  onNavigate?: () => void;
  isMobile?: boolean;
}

export const BuyerSidebar: React.FC<BuyerSidebarProps> = ({ onNavigate, isMobile }) => {
  const { buyerProfile, shipments } = useDashboardStore();

  const activeDeliveriesCount = shipments.filter((s) => s.status !== 'Delivered').length;

  const navItems = [
    {
      name: 'Receiver Overview',
      path: '/buyer',
      icon: Layers,
      end: true,
    },
    {
      name: 'SPCB Authorization',
      path: '/buyer/kyc',
      icon: FileCheck2,
      badge: 'Authorized',
      badgeColor: 'bg-[#DCFCE7] text-[#16A34A]',
    },
    {
      name: 'Acceptance Profile',
      path: '/buyer/profile',
      icon: SlidersHorizontal,
      badge: '450 MT Quota',
      badgeColor: 'bg-surface-subtle text-[#1E293B]',
    },
    {
      name: 'Incoming Matches',
      path: '/buyer/matches',
      icon: Flame,
      badge: '2 Compatible',
      badgeColor: 'bg-[#EFF6FF] text-[#2563EB]',
    },
    {
      name: 'Delivery & QC Gate',
      path: '/buyer/deliveries',
      icon: Truck,
      badge: activeDeliveriesCount > 0 ? `${activeDeliveriesCount} Active` : null,
      badgeColor: 'bg-[#FEF3C7] text-[#D97706]',
    },
    {
      name: 'Payments & Escrow',
      path: '/buyer/payments',
      icon: CreditCard,
      badge: '₹15k Held',
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
          <span>Buyer / Receiver</span>
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
                      ? 'bg-[#EFF6FF] text-[#2563EB] shadow-sm font-bold border border-[#2563EB]/20'
                      : 'text-slate-700 hover:text-[#0B0F19] hover:bg-slate-50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-2.5 min-w-0 flex-1 mr-2">
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive ? 'text-[#2563EB]' : 'text-slate-400 group-hover:text-slate-800'
                        }`}
                      />
                      <span className="truncate">{item.name}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`inline-flex items-center gap-1.5 text-[10px] font-medium leading-none px-2 py-1 rounded-full whitespace-nowrap shrink-0 border transition-colors ${
                          isActive
                            ? 'bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/20'
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

      {/* Bottom Kiln Status Card */}
      <div className="p-3 border-t border-[#E2E4DC] bg-slate-50/80">
        <div className="p-3 rounded-xl bg-white border border-[#E2E4DC] shadow-sm">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              CO-PROCESSING FACILITY
            </span>
            <span className="inline-flex items-center gap-1 text-[9px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80 px-2 py-0.5 rounded-full">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              Gate #4 Active
            </span>
          </div>
          <div className="text-xs font-bold text-slate-900 truncate">
            {buyerProfile.facilityName}
          </div>
          <div className="text-[10px] text-slate-500 mt-1 font-mono">
            Auth: {buyerProfile.spcbAuthNo}
          </div>
        </div>
      </div>
    </aside>
  );
};
