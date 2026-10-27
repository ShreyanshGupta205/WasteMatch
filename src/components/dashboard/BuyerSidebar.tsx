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

export const BuyerSidebar: React.FC = () => {
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
    <aside className="w-[240px] shrink-0 bg-surface border-r border-[#E2E4DC] flex flex-col justify-between h-[calc(100vh-4rem)] sticky top-16 shadow-subtle z-20">
      <div className="p-3.5 space-y-4 overflow-y-auto">
        <div className="px-3 pb-1 text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
          BUYER / RECEIVER CAPABILITIES
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group ${
                    isActive
                      ? 'bg-[#EFF6FF] text-[#2563EB] shadow-sm font-bold border border-[#2563EB]/20'
                      : 'text-[#1E293B] hover:text-[#0B0F19] hover:bg-surface-subtle'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className={`w-4 h-4 transition-colors ${
                          isActive ? 'text-[#2563EB]' : 'text-[#64748B] group-hover:text-[#0B0F19]'
                        }`}
                      />
                      <span className="truncate">{item.name}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                          item.badgeColor || 'bg-surface-subtle text-[#64748B]'
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
      <div className="p-3 border-t border-[#E2E4DC] bg-surface-subtle/70">
        <div className="p-3 rounded-xl bg-surface border border-[#E2E4DC] shadow-subtle">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
              CO-PROCESSING FACILITY
            </span>
            <span className="text-[9px] font-bold bg-[#DCFCE7] text-[#16A34A] px-1.5 py-0.2 rounded">
              Gate #4 Active
            </span>
          </div>
          <div className="text-xs font-bold text-[#0B0F19] truncate">
            {buyerProfile.facilityName}
          </div>
          <div className="text-[10px] text-[#64748B] mt-1 font-mono">
            Auth: {buyerProfile.spcbAuthNo}
          </div>
        </div>
      </div>
    </aside>
  );
};
