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

export const AdminSidebar: React.FC = () => {
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
      badgeColor: pendingVerificationCount > 0 ? 'bg-[#FEF3C7] text-[#D97706]' : 'bg-surface-subtle text-[#1E293B]',
    },
    {
      name: 'Transaction & Escrow',
      path: '/admin/transactions',
      icon: CreditCard,
      badge: disputedEscrowCount > 0 ? `${disputedEscrowCount} Disputed` : 'Monitored',
      badgeColor: disputedEscrowCount > 0 ? 'bg-[#FEE2E2] text-[#DC2626]' : 'bg-[#DCFCE7] text-[#16A34A]',
    },
    {
      name: 'NABL Lab Directory',
      path: '/admin/labs',
      icon: FlaskConical,
      badge: 'Reference Only',
      badgeColor: 'bg-surface-subtle text-[#64748B]',
    },
    {
      name: 'Transporter Directory',
      path: '/admin/transporters',
      icon: Truck,
      badge: 'Reference Only',
      badgeColor: 'bg-surface-subtle text-[#64748B]',
    },
    {
      name: 'Compliance & Audit Logs',
      path: '/admin/compliance',
      icon: ShieldAlert,
      badge: '2 Alerts',
      badgeColor: 'bg-[#FDF2F2] text-[#D1343A]',
    },
  ];

  return (
    <aside className="w-[240px] shrink-0 bg-surface border-r border-[#E2E4DC] flex flex-col justify-between h-[calc(100vh-4rem)] sticky top-16 shadow-subtle z-20">
      <div className="p-3.5 space-y-4 overflow-y-auto">
        <div className="px-3 pb-1 text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
          ADMINISTRATION CONTROLS
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
                      ? 'bg-[#0B0F19] text-white shadow-sm font-bold'
                      : 'text-[#1E293B] hover:text-[#0B0F19] hover:bg-surface-subtle'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className={`w-4 h-4 transition-colors ${
                          isActive ? 'text-white' : 'text-[#64748B] group-hover:text-[#0B0F19]'
                        }`}
                      />
                      <span className="truncate">{item.name}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : item.badgeColor || 'bg-surface-subtle text-[#64748B]'
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

      {/* Bottom Regulatory Desk Card */}
      <div className="p-3 border-t border-[#E2E4DC] bg-surface-subtle/70">
        <div className="p-3 rounded-xl bg-surface border border-[#E2E4DC] shadow-subtle">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
              GOVERNANCE DESK
            </span>
            <span className="text-[9px] font-bold bg-[#DCFCE7] text-[#16A34A] px-1.5 py-0.2 rounded">
              Online
            </span>
          </div>
          <div className="text-xs font-bold text-[#0B0F19]">
            SPCB Central Compliance
          </div>
          <div className="text-[10px] text-[#64748B] mt-0.5">
            Hazardous Waste Rules 2016
          </div>
        </div>
      </div>
    </aside>
  );
};
