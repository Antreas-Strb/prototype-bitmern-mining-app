import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeText?: string;
  icon?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, changeText, icon }) => {
  const isPositiveChange = change !== undefined && change >= 0;
  
  return (
    <div className="dashboard-stat">
      <div className="flex justify-between items-start">
        <div>
          <p className="stat-label">{title}</p>
          <p className="stat-value">{value}</p>
        </div>
        {icon && (
          <div className="p-3 bg-dark-700 rounded-lg">
            {icon}
          </div>
        )}
      </div>
      
      {change !== undefined && (
        <div className={`mt-4 ${isPositiveChange ? 'stat-trend-up' : 'stat-trend-down'}`}>
          {isPositiveChange ? (
            <TrendingUp className="w-4 h-4 mr-1" />
          ) : (
            <TrendingDown className="w-4 h-4 mr-1" />
          )}
          <span className="text-sm font-medium">
            {isPositiveChange ? '+' : ''}{change}% {changeText || ''}
          </span>
        </div>
      )}
    </div>
  );
};

export default StatCard;