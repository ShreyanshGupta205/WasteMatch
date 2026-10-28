import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  ShieldAlert,
  Users,
  CreditCard,
  FlaskConical,
  Truck,
  FileSpreadsheet,
  Activity,
  Layers,
} from 'lucide-react';
import { useDashboardStore } from '../../store/dashboardStore';

interface AdminSidebarProps {
  onNavigate?: () => void;
  isMobile?: boolean;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ onNavigate, isMobile }) => {
  const { adminUsers, shipments } = useDashboardStore();

  const pendingVerificationCount = adminUsers.filter((u) => u.verificationStatus === 'Pending').length;
  const disputedEscrowCount = shipments.filter((s) => s.escrowStatus === 'Disputed').length;

  const navItems = [
    {
      name: 'Operations Overview',
      path: '/admin',
      icon: Layers,
      end: true,
    },
    {
      name: 'User Management & KYC',
      path: '/admin/users',
      icon: Users,
      badge: pendingVerificationCount > 0 ? `${pendingVerificationCount} Pending` : `${adminUsers.length} Users`,
      badgeType: pendingVerificationCount > 0 ? 'warning' : 'neutral',
      badgeDot: pendingVerificationCount > 0,
      badgeColor:
        pendingVerificationCount > 0
          ? 'bg-amber-50 text-amber-700 border-amber-200/80'
          : 'bg-slate-100 text-slate-600 border-slate-200/80',
    },
    {
      name: 'Transaction & Escrow',
      path: '/admin/transactions',
      icon: CreditCard,
      badge: disputedEscrowCount > 0 ? `${disputedEscrowCount} Disputed` : 'Monitored',
      badgeType: disputedEscrowCount > 0 ? 'danger' : 'success',
      badgeDot: true,
      badgeColor:
        disputedEscrowCount > 0
          ? 'bg-rose-50 text-rose-700 border-rose-200/80'
          : 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    },
    {
      name: 'NABL Lab Directory',
      path: '/admin/labs',
      icon: FlaskConical,
      badge: 'Ref Only',
      badgeType: 'neutral',
      badgeColor: 'bg-slate-50 text-slate-500 border-slate-200/80',
    },
    {
      name: 'Transporter Directory',
      path: '/admin/transporters',
      icon: Truck,
      badge: 'Ref Only',
      badgeType: 'neutral',
      badgeColor: 'bg-slate-50 text-slate-500 border-slate-200/80',
    },
    {
      name: 'Compliance & Audit Logs',
      path: '/admin/compliance',
      icon: ShieldAlert,
      badge: '2 Alerts',
      badgeType: 'danger',
      badgeDot: true,
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200/80',
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
          <span>Administration Controls</span>
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
                      ? 'bg-[#0B0F19] text-white shadow-sm font-bold'
                      : 'text-slate-700 hover:text-[#0B0F19] hover:bg-slate-50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-2.5 min-w-0 flex-1 mr-2">
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-800'
                        }`}
                      />
                      <span className="truncate">{item.name}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`inline-flex items-center gap-1.5 text-[10px] font-medium leading-none px-2 py-1 rounded-full whitespace-nowrap shrink-0 border transition-colors ${
                          isActive
                            ? 'bg-white/15 text-white border-white/20 backdrop-blur-sm'
                            : item.badgeColor
                        }`}
                      >
                        {item.badgeDot && !isActive && (
                          <span
                            className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                              item.badgeType === 'warning'
                                ? 'bg-amber-500 animate-pulse'
                                : item.badgeType === 'danger'
                                ? 'bg-rose-500 animate-pulse'
                                : 'bg-emerald-500'
                            }`}
                          />
                        )}
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

      {/* Bottom Regulatory Desk Card */}
      <div className="p-3 border-t border-[#E2E4DC] bg-slate-50/80">
        <div className="p-3 rounded-xl bg-white border border-[#E2E4DC] shadow-sm">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              GOVERNANCE DESK
            </span>
            <span className="inline-flex items-center gap-1 text-[9px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80 px-2 py-0.5 rounded-full">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              Online
            </span>
          </div>
          <div className="text-xs font-bold text-slate-900">
            SPCB Central Compliance
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            Hazardous Waste Rules 2016
          </div>
        </div>
      </div>
    </aside>
  );
};
