import React from 'react';
import { RouteProvider, useAppNavigation } from '@/src/context/RouteContext';
import { CurrencyProvider } from '@/src/context/CurrencyContext';
import { Navbar } from '@/src/components/layout/Navbar';
import { Footer } from '@/src/components/layout/Footer';
import { ServiceRequestModal } from '@/src/components/forms/ServiceRequestModal';
import { TacAssistantDrawer } from '@/src/components/assistant/TacAssistantDrawer';
import { FloatingActions } from '@/src/components/common/FloatingActions';

import { HomePage } from '@/src/pages/HomePage';
import { AboutPage } from '@/src/pages/AboutPage';
import { StudiosPage } from '@/src/pages/StudiosPage';
import { ServiceDetailPage } from '@/src/pages/ServiceDetailPage';
import { PackagesPage } from '@/src/pages/PackagesPage';
import { OpportunitiesPage } from '@/src/pages/OpportunitiesPage';
import { PortfolioPage } from '@/src/pages/PortfolioPage';
import { ContactPage } from '@/src/pages/ContactPage';
import { InvestorsPage } from '@/src/pages/InvestorsPage';

const AppContent: React.FC = () => {
  const { currentPath } = useAppNavigation();

  // Router dispatcher
  const renderPage = () => {
    // Exact or prefix matches
    if (currentPath === '/' || currentPath === '') {
      return <HomePage />;
    }

    if (currentPath === '/about') {
      return <AboutPage />;
    }

    if (currentPath === '/investors') {
      return <InvestorsPage />;
    }

    if (currentPath === '/packages' || currentPath === '/solutions') {
      return <PackagesPage />;
    }

    if (currentPath === '/opportunities' || currentPath === '/join') {
      return <OpportunitiesPage />;
    }

    if (currentPath === '/portfolio') {
      return <PortfolioPage />;
    }

    if (currentPath === '/contact') {
      return <ContactPage />;
    }

    // Dynamic service detail route: /studios/service/[service-slug]
    if (currentPath.startsWith('/studios/service/')) {
      const slug = currentPath.replace('/studios/service/', '').split('/')[0];
      return <ServiceDetailPage slug={slug} />;
    }

    // Studios category route: /studios/[category] or /studios (also /services)
    if (currentPath.startsWith('/studios') || currentPath.startsWith('/services')) {
      const pathPrefix = currentPath.startsWith('/studios') ? '/studios' : '/services';
      const parts = currentPath.replace(pathPrefix, '').replace(/^\//, '').split('/');
      const category = parts[0] || 'all';
      return <StudiosPage initialCategory={category === '' ? 'all' : category} />;
    }

    // Fallback to Home
    return <HomePage />;
  };

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 flex flex-col font-sans-clean antialiased selection:bg-[#D4AF37] selection:text-slate-950">
      {/* 3-Zone Navigation Header */}
      <Navbar />

      {/* Main View Area */}
      <main className="flex-1">
        {renderPage()}
      </main>

      {/* Corporate Luxury Footer */}
      <Footer />

      {/* Dynamic Service Request Modal */}
      <ServiceRequestModal />

      {/* AI Executive Assistant Drawer */}
      <TacAssistantDrawer />

      {/* Floating Concierge Action Buttons */}
      <FloatingActions />
    </div>
  );
};

export default function App() {
  return (
    <CurrencyProvider>
      <RouteProvider>
        <AppContent />
      </RouteProvider>
    </CurrencyProvider>
  );
}
