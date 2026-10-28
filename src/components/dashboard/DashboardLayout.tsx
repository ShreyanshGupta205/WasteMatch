import React from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  X,
  Layers,
  FileText,
  Store,
  Truck,
  CreditCard,
  Users,
  ShieldAlert,
  ArrowRightLeft,
  Home,
  Menu,
  FileBadge,
  Sparkles,
} from 'lucide-react';
import { DashboardHeader } from './DashboardHeader';
import { SellerSidebar } from './SellerSidebar';
import { BuyerSidebar } from './BuyerSidebar';
import { AdminSidebar } from './AdminSidebar';
import { useDashboardStore, UserRole } from '../../store/dashboardStore';
import { SellerLabReferralModal } from '../../features/seller/SellerLabReferralModal';

export const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, switchRole, isMobileMenuOpen, setMobileMenuOpen } = useDashboardStore();

  const handleRoleSwitch = (newRole: UserRole) => {
    switchRole(newRole);
    setMobileMenuOpen(false);
    if (newRole === 'seller') navigate('/seller');
    else if (newRole === 'buyer') navigate('/buyer');
    else if (newRole === 'admin') navigate('/admin');
  };

  // Mobile Bottom Dock Quick Items
  const sellerBottomItems = [
    { name: 'Overview', path: '/seller', icon: Layers, end: true },
    { name: 'Streams', path: '/seller/streams', icon: FileText },
    { name: 'Market', path: '/seller/marketplace', icon: Store },
    { name: 'Shipments', path: '/seller/shipments', icon: Truck },
  ];

  const buyerBottomItems = [
    { name: 'Overview', path: '/buyer', icon: Layers, end: true },
    { name: 'Matches', path: '/buyer/matches', icon: Store },
    { name: 'Deliveries', path: '/buyer/deliveries', icon: Truck },
    { name: 'Escrow', path: '/buyer/payments', icon: CreditCard },
  ];

  const adminBottomItems = [
    { name: 'Overview', path: '/admin', icon: Layers, end: true },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Escrow', path: '/admin/transactions', icon: CreditCard },
    { name: 'Audit', path: '/admin/compliance', icon: ShieldAlert },
  ];

  const currentBottomItems =
    currentUser.role === 'seller'
      ? sellerBottomItems
      : currentUser.role === 'buyer'
      ? buyerBottomItems
      : adminBottomItems;

  return (
    <div className="min-h-screen bg-[#F8F6F5] text-[#0B0F19] flex flex-col font-sans antialiased selection:bg-[#FDF2F2] selection:text-[#D1343A]">
      {/* Top Header with Role Switcher */}
      <DashboardHeader />

      {/* Main Container with Sidebar + Dashboard Content */}
      <div className="flex-1 flex relative">
        {/* Desktop Docked Sidebar (Hidden on mobile) */}
        <div className="hidden lg:block shrink-0">
          {currentUser.role === 'seller' && <SellerSidebar />}
          {currentUser.role === 'buyer' && <BuyerSidebar />}
          {currentUser.role === 'admin' && <AdminSidebar />}
        </div>

        {/* Mobile Off-Canvas Drawer (Slide-over overlay) */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div
              className="w-[290px] max-w-[85vw] h-full bg-white shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-left duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drawer Top Branding & Close Button */}
              <div className="p-4 border-b border-[#E2E4DC] flex items-center justify-between bg-slate-50/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#D1343A] flex items-center justify-center text-white shadow-sm font-bold text-sm">
                    W
                  </div>
                  <div>
                    <span className="font-bold text-sm text-[#0B0F19]">WasteMatch</span>
                    <p className="text-[10px] text-slate-500 font-medium capitalize">
                      {currentUser.role} Dashboard
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-200/60 transition"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer 1-Click Role Switcher */}
              <div className="p-3 bg-white border-b border-[#E2E4DC]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <ArrowRightLeft className="w-3 h-3 text-[#D1343A]" /> Switch Role
                  </span>
                  <span className="text-[9px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-semibold">
                    Live Demo
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => handleRoleSwitch('seller')}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition text-center ${
                      currentUser.role === 'seller'
                        ? 'bg-[#D1343A] text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    1. Seller
                  </button>
                  <button
                    onClick={() => handleRoleSwitch('buyer')}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition text-center ${
                      currentUser.role === 'buyer'
                        ? 'bg-[#2563EB] text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    2. Buyer
                  </button>
                  <button
                    onClick={() => handleRoleSwitch('admin')}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition text-center ${
                      currentUser.role === 'admin'
                        ? 'bg-[#0B0F19] text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    3. Admin
                  </button>
                </div>
              </div>

              {/* Drawer Navigation Links */}
              <div className="flex-1 overflow-y-auto">
                {currentUser.role === 'seller' && (
                  <SellerSidebar isMobile onNavigate={() => setMobileMenuOpen(false)} />
                )}
                {currentUser.role === 'buyer' && (
                  <BuyerSidebar isMobile onNavigate={() => setMobileMenuOpen(false)} />
                )}
                {currentUser.role === 'admin' && (
                  <AdminSidebar isMobile onNavigate={() => setMobileMenuOpen(false)} />
                )}
              </div>

              {/* Drawer Bottom Quick Links */}
              <div className="p-3 border-t border-[#E2E4DC] bg-slate-50/90 flex items-center justify-between text-xs font-semibold text-slate-600">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/');
                  }}
                  className="inline-flex items-center gap-1.5 text-slate-700 hover:text-[#D1343A] transition"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Public Site</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/login');
                  }}
                  className="inline-flex items-center gap-1.5 text-slate-700 hover:text-[#D1343A] transition"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#D1343A]" />
                  <span>Personas</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Workspace Canvas */}
        <main className="flex-1 min-w-0 p-3 sm:p-6 lg:p-8 pb-24 lg:pb-8 overflow-y-auto max-w-[1600px]">
          <Outlet />
        </main>
      </div>

      {/* Mobile Floating Bottom Dock Bar (iOS/Android Native Feel) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E2E4DC] px-2 py-1.5 flex items-center justify-around shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
        {currentBottomItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
                  isActive
                    ? currentUser.role === 'seller'
                      ? 'text-[#D1343A] font-bold'
                      : currentUser.role === 'buyer'
                      ? 'text-[#2563EB] font-bold'
                      : 'text-[#0B0F19] font-bold'
                    : 'text-slate-500 hover:text-slate-900 font-medium'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`p-1 rounded-lg transition-colors ${
                      isActive
                        ? currentUser.role === 'seller'
                          ? 'bg-red-50 text-[#D1343A]'
                          : currentUser.role === 'buyer'
                          ? 'bg-blue-50 text-[#2563EB]'
                          : 'bg-slate-100 text-[#0B0F19]'
                        : ''
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] mt-0.5 leading-none">{item.name}</span>
                </>
              )}
            </NavLink>
          );
        })}

        {/* 5th Button: Open Full Drawer Menu */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-slate-500 hover:text-slate-900 transition-all font-medium"
        >
          <div className="p-1 rounded-lg hover:bg-slate-100">
            <Menu className="w-4 h-4" />
          </div>
          <span className="text-[10px] mt-0.5 leading-none">All Pages</span>
        </button>
      </nav>

      {/* Lab Test Referral Modal for Seller */}
      <SellerLabReferralModal />
    </div>
  );
};
