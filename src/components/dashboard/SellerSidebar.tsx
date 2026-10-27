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

export const SellerSidebar: React.FC = () => {
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
    <aside className="w-[240px] shrink-0 bg-surface border-r border-[#E2E4DC] flex flex-col justify-between h-[calc(100vh-4rem)] sticky top-16 shadow-subtle z-20">
      <div className="p-3.5 space-y-4 overflow-y-auto">
        <div className="px-3 pb-1 text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
          SELLER CAPABILITIES
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
                          isActive ? 'text-[#D1343A]' : 'text-[#64748B] group-hover:text-[#0B0F19]'
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

      {/* Bottom Facility SPCB Card */}
      <div className="p-3 border-t border-[#E2E4DC] bg-surface-subtle/70">
        <div className="p-3 rounded-xl bg-surface border border-[#E2E4DC] shadow-subtle">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
              SPCB AUTHORIZATION
            </span>
            <span className="text-[9px] font-bold bg-[#DCFCE7] text-[#16A34A] px-1.5 py-0.2 rounded">
              Active
            </span>
          </div>
          <div className="text-xs font-mono font-bold text-[#0B0F19] truncate">
            {currentUser.spcbAuthNo || 'UPPCB/HW/GZB/2024/7741'}
          </div>
          <div className="text-[10px] text-[#64748B] mt-1">
            Plant #2 · Ghaziabad, UP
          </div>
        </div>
      </div>
    </aside>
  );
};
