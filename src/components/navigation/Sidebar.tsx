import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  HardDrive, 
  Server, 
  Calculator, 
  FileText, 
  UserCircle, 
  Settings, 
  LogOut, 
  Bitcoin,
  CreditCard,
  MessageSquare,
  BarChart3,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigation } from '../../contexts/NavigationContext';

const Sidebar = () => {
  const { logout } = useAuth();
  const { isSidebarCollapsed, toggleSidebarCollapse } = useNavigation();
  const pathname = usePathname();
  
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Marketplace', path: '/marketplace', icon: <ShoppingCart className="w-5 h-5" /> },
    { name: 'My Miners', path: '/miners', icon: <HardDrive className="w-5 h-5" /> },
    { name: 'ViaBTC', path: '/miners/viabtc', icon: <BarChart3 className="w-5 h-5" /> },
    { name: 'Hosting', path: '/hosting', icon: <Server className="w-5 h-5" /> },
    { name: 'Investment Tools', path: '/investment-tools', icon: <Calculator className="w-5 h-5" /> },
    { name: 'Billing', path: '/billing', icon: <CreditCard className="w-5 h-5" /> },
    { name: 'Support', path: '/support', icon: <MessageSquare className="w-5 h-5" /> },
    { name: 'Info Center', path: '/info-center', icon: <FileText className="w-5 h-5" /> },
    { name: 'Profile', path: '/profile', icon: <UserCircle className="w-5 h-5" /> },
    { name: 'Admin', path: '/admin', icon: <Settings className="w-5 h-5" /> },
  ];
  
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`flex items-center px-6 py-5 border-b border-dark-700 ${isSidebarCollapsed ? 'justify-center' : ''}`}>
        <Bitcoin className="w-8 h-8 text-accent-500 mr-3 flex-shrink-0" />
        {!isSidebarCollapsed && <span className="text-xl font-bold">MiningVerse</span>}
      </div>
      
      {/* Nav Items */}
      <nav className="flex-1 py-6 overflow-y-auto">
        <ul className="space-y-1 px-3">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link 
                  href={item.path}
                  className={`flex items-center px-3 py-2.5 rounded-lg transition-colors duration-200 ${
                    isActive 
                      ? 'bg-primary-700/20 text-primary-400' 
                      : 'text-light-700 hover:bg-dark-700 hover:text-light-500'
                  } ${isSidebarCollapsed ? 'justify-center' : ''}`}
                  title={isSidebarCollapsed ? item.name : undefined}
                >
                  {item.icon}
                  {!isSidebarCollapsed && <span className="ml-3">{item.name}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      {/* Collapse Button */}
      <button
        onClick={toggleSidebarCollapse}
        className="mx-3 mb-2 p-2 rounded-lg text-light-700 hover:bg-dark-700 hover:text-light-500 flex items-center justify-center"
      >
        {isSidebarCollapsed ? (
          <ChevronRight className="w-5 h-5" />
        ) : (
          <ChevronLeft className="w-5 h-5" />
        )}
      </button>
      
      {/* User */}
      <div className="p-4 border-t border-dark-700">
        <button 
          onClick={logout} 
          className={`flex items-center px-3 py-2.5 text-light-700 hover:bg-dark-700 hover:text-light-500 rounded-lg transition-colors duration-200 ${
            isSidebarCollapsed ? 'justify-center' : 'w-full'
          }`}
          title={isSidebarCollapsed ? 'Log Out' : undefined}
        >
          <LogOut className="w-5 h-5" />
          {!isSidebarCollapsed && <span className="ml-3">Log Out</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;