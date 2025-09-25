'use client';

import React from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './contexts/AuthContext';
import { NavigationProvider } from './contexts/NavigationContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { CartProvider } from './contexts/CartContext';
import { BitcoinPriceProvider } from './contexts/BitcoinPriceContext';
import SupportBubble from './components/support/SupportBubble';

interface AppProps {
  router: AppRouterInstance;
  pathname: string;
}

function App({ router, pathname }: AppProps) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <BitcoinPriceProvider>
            <NavigationProvider>
              <AppRoutes router={router} pathname={pathname} />
              <SupportBubble />
            </NavigationProvider>
          </BitcoinPriceProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;