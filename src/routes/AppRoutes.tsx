'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useAuth, AuthProvider } from '../contexts/AuthContext';
import dynamic from 'next/dynamic';

// Layouts
const DashboardLayout = dynamic(() => import('../layouts/DashboardLayout'));

// Public Pages
const LandingPage = dynamic(() => import('../pages/public/LandingPage'));
const RegisterPage = dynamic(() => import('../pages/auth/RegisterPage'));

// Protected Pages
const DashboardPage = dynamic(() => import('../pages/dashboard/DashboardPage'));
const MarketplacePage = dynamic(() => import('../pages/marketplace/MarketplacePage'));
const MarketplaceMinerDetails = dynamic(() => import('../pages/marketplace/MarketplaceMinerDetails'));
const MinersPage = dynamic(() => import('../pages/miners/MinersPage'));
const MinerDetailsPage = dynamic(() => import('../pages/miners/MinerDetailsPage'));
const ViaBTCWatcherPage = dynamic(() => import('../pages/miners/ViaBTCWatcherPage'));
const HostingPage = dynamic(() => import('../pages/hosting/HostingPage'));
const ProfilePage = dynamic(() => import('../pages/profile/ProfilePage'));
const InvestmentToolsPage = dynamic(() => import('../pages/investment/InvestmentToolsPage'));
const BillingPage = dynamic(() => import('../pages/billing/BillingPage'));
const InfoCenterPage = dynamic(() => import('../pages/info/InfoCenterPage'));
const SupportPage = dynamic(() => import('../pages/support/SupportPage'));
const AdminPage = dynamic(() => import('../pages/admin/AdminPage'));

const AppRoutes = () => {
  const pathname = usePathname();

  // Public routes
  if (pathname === '/') {
    return (
      <AuthProvider>
        {({ isAuthenticated }) => 
          isAuthenticated ? (
            <DashboardLayout>
              <DashboardPage />
            </DashboardLayout>
          ) : (
            <LandingPage />
          )
        }
      </AuthProvider>
    );
  }

  // Protected routes - wrap with AuthProvider to ensure useAuth is available
  return (
    <AuthProvider>
      {({ isAuthenticated }) => 
        isAuthenticated ? (
          <DashboardLayout>
            {pathname === '/dashboard' && <DashboardPage />}
            {pathname === '/marketplace' && <MarketplacePage />}
            {pathname.startsWith('/marketplace/') && <MarketplaceMinerDetails id={pathname.split('/')[2]} />}
            {pathname === '/miners' && <MinersPage />}
            {pathname.startsWith('/miners/') && pathname !== '/miners/viabtc' && <MinerDetailsPage />}
            {pathname === '/miners/viabtc' && <ViaBTCWatcherPage />}
            {pathname === '/hosting' && <HostingPage />}
            {pathname === '/profile' && <ProfilePage />}
            {pathname === '/investment-tools' && <InvestmentToolsPage />}
            {pathname === '/billing' && <BillingPage />}
            {pathname === '/info-center' && <InfoCenterPage />}
            {pathname === '/support' && <SupportPage />}
            {pathname === '/admin' && <AdminPage />}
          </DashboardLayout>
        ) : null
      }
    </AuthProvider>
  );
};

export default AppRoutes;