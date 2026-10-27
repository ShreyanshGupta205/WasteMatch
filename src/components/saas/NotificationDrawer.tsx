import React from 'react';
import { Link } from 'react-router-dom';
import {
  X,
  AlertTriangle,
  CheckCircle2,
  Info,
  Bell,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { useSaasStore } from '../../store/saasStore';

export const NotificationDrawer: React.FC = () => {
  const {
    isNotificationsOpen,
    toggleNotifications,
    notifications,
    markAllNotificationsRead,
  } = useSaasStore();

  if (!isNotificationsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#0B0F19]/40 backdrop-blur-xs transition-opacity"
        onClick={toggleNotifications}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-surface shadow-elevated border-l border-[#E2E4DC] flex flex-col justify-between">
          {/* Header */}
          <div className="p-4 border-b border-[#E2E4DC] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#D1343A]" />
              <h2 className="text-sm font-bold text-[#0B0F19]">
                Notifications & Regulatory Alerts
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={markAllNotificationsRead}
                className="text-[11px] font-semibold text-[#D1343A] hover:underline"
              >
                Mark all read
              </button>
              <button
                onClick={toggleNotifications}
                className="p-1 rounded-md text-[#64748B] hover:text-[#0B0F19] hover:bg-surface-subtle"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {notifications.map((n) => {
              const isAction = n.type === 'action_required';
              const isSuccess = n.type === 'success';

              return (
                <div
                  key={n.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    !n.read
                      ? 'bg-[#FDF2F2]/60 border-[#D1343A]/20'
                      : 'bg-surface border-[#E2E4DC]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-1.5 rounded-lg shrink-0 ${
                        isAction
                          ? 'bg-[#FEF3C7] text-[#D97706]'
                          : isSuccess
                          ? 'bg-[#DCFCE7] text-[#16A34A]'
                          : 'bg-[#F3F0EE] text-[#64748B]'
                      }`}
                    >
                      {isAction ? (
                        <AlertTriangle className="w-4 h-4" />
                      ) : isSuccess ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <Info className="w-4 h-4" />
                      )}
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#0B0F19]">
                          {n.title}
                        </span>
                        <span className="text-[10px] text-[#64748B] font-mono">
                          {n.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-[#1E293B] leading-relaxed">
                        {n.message}
                      </p>
                      {n.link && (
                        <div className="pt-1">
                          <Link
                            to={n.link}
                            onClick={toggleNotifications}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#D1343A] hover:underline"
                          >
                            <span>Resolve in workspace</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-[#E2E4DC] bg-surface-subtle/50 text-[11px] text-[#64748B] text-center">
            Synchronized with SPCB Portal & Regional Testing Labs
          </div>
        </div>
      </div>
    </div>
  );
};
