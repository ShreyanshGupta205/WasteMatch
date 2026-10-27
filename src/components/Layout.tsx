import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { GuidedDemoBanner } from './GuidedDemoBanner';
import { ErrorBoundary } from './ErrorBoundary';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-brand-100 selection:text-brand-700">
      <Navbar />
      <main className="flex-1">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
      <GuidedDemoBanner />
    </div>
  );
};

