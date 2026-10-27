import React from 'react';
import { Outlet } from 'react-router-dom';
import { DashboardHeader } from './DashboardHeader';
import { SellerSidebar } from './SellerSidebar';
import { BuyerSidebar } from './BuyerSidebar';
import { AdminSidebar } from './AdminSidebar';
import { useDashboardStore } from '../../store/dashboardStore';
import { SellerLabReferralModal } from '../../features/seller/SellerLabReferralModal';

export const DashboardLayout: React.FC = () => {
  const { currentUser } = useDashboardStore();

  return (
    <div className="min-h-screen bg-[#F8F6F5] text-[#0B0F19] flex flex-col font-sans antialiased selection:bg-[#FDF2F2] selection:text-[#D1343A]">
      {/* Top Header with Role Switcher */}
      <DashboardHeader />

      {/* Main Container with Sidebar + Dashboard Content */}
      <div className="flex-1 flex">
        {currentUser.role === 'seller' && <SellerSidebar />}
        {currentUser.role === 'buyer' && <BuyerSidebar />}
        {currentUser.role === 'admin' && <AdminSidebar />}

        {/* Dynamic Workspace Canvas */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-[1600px]">
          <Outlet />
        </main>
      </div>

      {/* Lab Test Referral Modal for Seller */}
      <SellerLabReferralModal />
    </div>
  );
};
