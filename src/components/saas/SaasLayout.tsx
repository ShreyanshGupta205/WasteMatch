import React from 'react';
import { Outlet } from 'react-router-dom';
import { SaasTopHeader } from './SaasTopHeader';
import { SaasSidebar } from './SaasSidebar';
import { GlobalSearchModal } from './GlobalSearchModal';
import { NotificationDrawer } from './NotificationDrawer';
import { SpcbComplianceModal } from './SpcbComplianceModal';

export const SaasLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8F6F5] text-[#0B0F19] flex flex-col font-sans antialiased selection:bg-[#FDF2F2] selection:text-[#D1343A]">
      {/* Top Header */}
      <SaasTopHeader />

      {/* Main Container with Sidebar + Content */}
      <div className="flex-1 flex">
        {/* Left Sidebar (240px wide) */}
        <SaasSidebar />

        {/* Dynamic Workspace Canvas */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-[1600px]">
          <Outlet />
        </main>
      </div>

      {/* Interactive Global Modals */}
      <GlobalSearchModal />
      <NotificationDrawer />
      <SpcbComplianceModal />
    </div>
  );
};
