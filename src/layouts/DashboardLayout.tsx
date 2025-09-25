import React from 'react';
import Sidebar from '../components/navigation/Sidebar';
import TopBar from '../components/navigation/TopBar';
import { useNavigation } from '../contexts/NavigationContext';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { isSidebarOpen, isSidebarCollapsed } = useNavigation();
  
  return (
    <div className="flex h-screen bg-dark-900 text-light-500">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 transition-all duration-300 transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 bg-dark-800 border-r border-dark-700 ${
        isSidebarCollapsed ? 'w-20' : 'w-64'
      }`}>
        <Sidebar />
      </div>
      
      {/* Main Content */}
      <div className={`flex flex-col flex-1 ${
        isSidebarOpen ? (isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64') : ''
      } transition-all duration-300`}>
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="container mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;