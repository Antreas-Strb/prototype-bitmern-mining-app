import React from 'react';
import { useBalance } from '../../hooks/useBalance';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

interface BalanceDisplayProps {
  className?: string;
}

const BalanceDisplay: React.FC<BalanceDisplayProps> = ({ className }) => {
  const { balance, isLoading, isError, mutate } = useBalance();

  if (isLoading) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-500"></div>
        <span>Loading balance...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={`flex items-center space-x-2 text-error-500 ${className}`}>
        <AlertTriangle className="w-4 h-4" />
        <span>Error loading balance</span>
        <button 
          onClick={() => mutate()} 
          className="text-primary-500 hover:text-primary-600"
        >
          <RefreshCcw className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <span className="font-medium">{balance?.currency}</span>
      <span className="text-xl font-bold">
        {balance?.amount.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </span>
      <button 
        onClick={() => mutate()} 
        className="text-light-700 hover:text-light-500"
      >
        <RefreshCcw className="w-4 h-4" />
      </button>
    </div>
  );
};

export default BalanceDisplay;