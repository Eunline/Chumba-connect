import React, { useState } from 'react';
import { AuthModal } from './components/AuthModal';
import { AvailabilityCheckModal } from './components/AvailabilityCheckModal';
import { BottomNav } from './components/BottomNav';
import { Navbar } from './components/Navbar';
import { NotificationsModal } from './components/NotificationsModal';
import { PaymentModal } from './components/PaymentModal';
import { PWAInstallModal } from './components/PWAInstallBanner';
import { RoomDetailModal } from './components/RoomDetailModal';
import { TenantOnboardingModal } from './components/TenantOnboardingModal';
import { AppProvider, useApp } from './context/AppContext';
import { AddListingView } from './views/AddListingView';
import { AdminView } from './views/AdminView';
import { ArchitectureDocsView } from './views/ArchitectureDocsView';
import { HomeView } from './views/HomeView';
import { LandlordDashboardView } from './views/LandlordDashboardView';
import { ReferralView } from './views/ReferralView';
import { SearchView } from './views/SearchView';
import { TenantDashboardView } from './views/TenantDashboardView';

const MainContent: React.FC = () => {
  const {
    activeView,
    setActiveView,
    selectedListing,
    setSelectedListing,
    showPayModal,
    listingToUnlock,
    openPaywallForListing,
    closePaywall,
    toastMessage,
  } = useApp();

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showNotifModal, setShowNotifModal] = useState(false);
  const [showPwaModal, setShowPwaModal] = useState(false);
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);

  const handleApplyOnboardingFilters = (filters: any) => {
    setActiveView('search');
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-gray-900 flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        onOpenAuth={() => setShowAuthModal(true)}
        onOpenNotifications={() => setShowNotifModal(true)}
        onOpenPwaGuide={() => setShowPwaModal(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeView === 'home' && (
          <HomeView
            onOpenOnboarding={() => setShowOnboardingModal(true)}
            onOpenPwaGuide={() => setShowPwaModal(true)}
          />
        )}
        {activeView === 'search' && <SearchView />}
        {activeView === 'add_listing' && <AddListingView />}
        {activeView === 'landlord_dash' && <LandlordDashboardView />}
        {activeView === 'tenant_dash' && <TenantDashboardView />}
        {activeView === 'referral' && <ReferralView />}
        {activeView === 'admin' && <AdminView />}
        {activeView === 'docs' && <ArchitectureDocsView />}
      </main>

      {/* Bottom Navigation (Mobile & Desktop quick access) */}
      <BottomNav />

      {/* Global Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white text-xs sm:text-sm font-bold py-3 px-5 rounded-full shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-200 pointer-events-none whitespace-nowrap border border-white/10">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modals */}
      <RoomDetailModal
        listing={selectedListing}
        onClose={() => setSelectedListing(null)}
        onUnlock={(listing) => openPaywallForListing(listing)}
      />

      <PaymentModal
        listing={listingToUnlock}
        isOpen={showPayModal}
        onClose={closePaywall}
      />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />

      <NotificationsModal
        isOpen={showNotifModal}
        onClose={() => setShowNotifModal(false)}
      />

      <PWAInstallModal
        isOpen={showPwaModal}
        onClose={() => setShowPwaModal(false)}
      />

      <TenantOnboardingModal
        isOpen={showOnboardingModal}
        onClose={() => setShowOnboardingModal(false)}
        onApplyFilters={handleApplyOnboardingFilters}
      />

      <AvailabilityCheckModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
