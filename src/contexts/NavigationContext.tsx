'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface NavigationContextType {
  isSidebarOpen: boolean;
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
  toggleSidebarCollapse: () => void;
  closeSidebar: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

export const NavigationProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  // Close sidebar on window resize if in mobile view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    
    // Set initial state
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };
  
  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed(prev => !prev);
  };
  
  const closeSidebar = () => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };
  
  const value = {
    isSidebarOpen,
    isSidebarCollapsed,
    toggleSidebar,
    toggleSidebarCollapse,
    closeSidebar,
  };
  
  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
};