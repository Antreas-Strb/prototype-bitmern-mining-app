import React from 'react';
import Link from 'next/link';
import { 
  Menu, 
  Bell, 
  Moon,
  Sun, 
  Search,
  ChevronDown,
  AlertTriangle,
  RefreshCcw
} from 'lucide-react';
import { useNavigation } from '../../contexts/NavigationContext';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useBitcoinPrice } from '../../contexts/BitcoinPriceContext';

const TopBar = () => {
  const { toggleSidebar } = useNavigation();
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { price, priceChange, isLoading, refreshPrice } = useBitcoinPrice();
  const balance = 25.50;
  const lowBalanceThreshold = 50;
  
  return (
    <header className="bg-dark-800 border-b border-dark-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleSidebar} 
            className="p-1.5 rounded-lg text-light-700 hover:bg-dark-700 hover:text-light-500 md:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="hidden md:flex relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-light-900" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-10 pr-4 py-2 bg-dark-700 border border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-light-500 w-64"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={refreshPrice}
            disabled={isLoading}
            className="flex items-center space-x-2 bg-dark-700 px-3 py-1.5 rounded-lg group relative"
          >
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full ${priceChange && priceChange > 0 ? 'bg-success-500' : 'bg-error-500'} animate-pulse mr-2`}></div>
              <span className="text-sm font-medium">
                BTC: ${price ? price.toLocaleString() : '---'}
              </span>
            </div>
            <RefreshCcw className={`w-4 h-4 text-light-700 transition-transform ${isLoading ? 'animate-spin' : 'group-hover:rotate-180'}`} />
            {priceChange && (
              <span className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs ${
                priceChange > 0 ? 'text-success-500' : 'text-error-500'
              }`}>
                {priceChange > 0 ? '+' : ''}{priceChange.toFixed(2)}%
              </span>
            )}
          </button>
          
          {balance < lowBalanceThreshold && (
            <Link 
              href="/billing" 
              className="flex items-center px-3 py-1.5 bg-warning-500/20 text-warning-500 rounded-lg hover:bg-warning-500/30 transition-colors"
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Low Balance: ${balance.toFixed(2)}</span>
            </Link>
          )}
          
          <button className="p-1.5 rounded-lg text-light-700 hover:bg-dark-700 hover:text-light-500 relative">
            <Bell className="w-6 h-6" />
            <span className="absolute top-0 right-0 block w-2 h-2 bg-error-500 rounded-full"></span>
          </button>
          
          <button 
            onClick={toggleTheme}
            className="p-1.5 rounded-lg text-light-700 hover:bg-dark-700 hover:text-light-500"
          >
            {theme === 'dark' ? (
              <Sun className="w-6 h-6" />
            ) : (
              <Moon className="w-6 h-6" />
            )}
          </button>
          
          <div className="flex items-center space-x-3 ml-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-medium">
              {user?.name ? user.name.charAt(0) : 'U'}
            </div>
            <div className="hidden md:block">
              <div className="flex items-center">
                <span className="font-medium text-light-500">{user?.name || 'User'}</span>
                <ChevronDown className="w-4 h-4 ml-1 text-light-700" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;