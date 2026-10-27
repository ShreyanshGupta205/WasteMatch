import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Master 3-Dashboard Layout Shell
import { DashboardLayout } from './components/dashboard/DashboardLayout';

// Dashboard 1: Seller / Waste Generator Pages
import { SellerOverview } from './features/seller/SellerOverview';
import { SellerKyc } from './features/seller/SellerKyc';
import { SellerStreams } from './features/seller/SellerStreams';
import { SellerLabsPage } from './features/seller/SellerLabsPage';
import { SellerMarketplace } from './features/seller/SellerMarketplace';
import { SellerShipments } from './features/seller/SellerShipments';
import { SellerSettlement } from './features/seller/SellerSettlement';

// Dashboard 2: Buyer / Receiver Pages
import { BuyerOverview } from './features/buyer/BuyerOverview';
import { BuyerKyc } from './features/buyer/BuyerKyc';
import { BuyerProfile } from './features/buyer/BuyerProfile';
import { BuyerMatches } from './features/buyer/BuyerMatches';
import { BuyerDeliveries } from './features/buyer/BuyerDeliveries';
import { BuyerPayments } from './features/buyer/BuyerPayments';

// Dashboard 3: Admin Pages
import { AdminOverview } from './features/admin/AdminOverview';
import { AdminUsers } from './features/admin/AdminUsers';
import { AdminTransactions } from './features/admin/AdminTransactions';
import { AdminLabDirectory } from './features/admin/AdminLabDirectory';
import { AdminTransporterDirectory } from './features/admin/AdminTransporterDirectory';
import { AdminCompliance } from './features/admin/AdminCompliance';

// Public Marketing & Storytelling Landing Page
import { Layout } from './components/Layout';
import { LandingPage } from './features/landing/LandingPage';
import { LoginPage } from './features/auth/LoginPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Landing Page */}
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="landing" element={<LandingPage />} />
        <Route path="home" element={<LandingPage />} />
      </Route>

      {/* Auth */}
      <Route path="/login" element={<LoginPage />} />

      {/* DASHBOARD 1: Seller / Waste Generator Dashboard */}
      <Route path="/seller" element={<DashboardLayout />}>
        <Route index element={<SellerOverview />} />
        <Route path="kyc" element={<SellerKyc />} />
        <Route path="streams" element={<SellerStreams />} />
        <Route path="labs" element={<SellerLabsPage />} />
        <Route path="marketplace" element={<SellerMarketplace />} />
        <Route path="shipments" element={<SellerShipments />} />
        <Route path="settlement" element={<SellerSettlement />} />
      </Route>

      {/* DASHBOARD 2: Buyer / Receiver Dashboard */}
      <Route path="/buyer" element={<DashboardLayout />}>
        <Route index element={<BuyerOverview />} />
        <Route path="kyc" element={<BuyerKyc />} />
        <Route path="profile" element={<BuyerProfile />} />
        <Route path="matches" element={<BuyerMatches />} />
        <Route path="deliveries" element={<BuyerDeliveries />} />
        <Route path="payments" element={<BuyerPayments />} />
      </Route>

      {/* DASHBOARD 3: Admin Dashboard */}
      <Route path="/admin" element={<DashboardLayout />}>
        <Route index element={<AdminOverview />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="transactions" element={<AdminTransactions />} />
        <Route path="labs" element={<AdminLabDirectory />} />
        <Route path="transporters" element={<AdminTransporterDirectory />} />
        <Route path="compliance" element={<AdminCompliance />} />
      </Route>

      {/* Legacy Aliases */}
      <Route path="/app" element={<Navigate to="/seller" replace />} />
      <Route path="/app/*" element={<Navigate to="/seller" replace />} />
      <Route path="/generator" element={<Navigate to="/seller/streams" replace />} />
      <Route path="/matching" element={<Navigate to="/seller/marketplace" replace />} />
      <Route path="/settlement" element={<Navigate to="/seller/settlement" replace />} />

      {/* Fallback Catch-All */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

