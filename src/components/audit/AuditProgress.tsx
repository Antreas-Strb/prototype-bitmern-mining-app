import React from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

interface AuditProgressProps {
  total: number;
  completed: number;
  percentage: number;
  passed: number;
  failed: number;
  pending: number;
}

const AuditProgress: React.FC<AuditProgressProps> = ({
  total,
  completed,
  percentage,
  passed,
  failed,
  pending
}) => {
  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-6">Audit Progress</h2>
      
      <div className="flex items-center mb-6">
        <div className="flex-1">
          <div className="h-4 bg-dark-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary-500 transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
        <span className="ml-4 font-medium">{percentage}%</span>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-dark-700 rounded-lg">
          <div className="flex items-center mb-2">
            <CheckCircle className="w-5 h-5 text-success-500 mr-2" />
            <span className="font-medium">Passed</span>
          </div>
          <p className="text-2xl font-bold">{passed}</p>
          <p className="text-sm text-light-700">items</p>
        </div>

        <div className="p-4 bg-dark-700 rounded-lg">
          <div className="flex items-center mb-2">
            <XCircle className="w-5 h-5 text-error-500 mr-2" />
            <span className="font-medium">Failed</span>
          </div>
          <p className="text-2xl font-bold">{failed}</p>
          <p className="text-sm text-light-700">items</p>
        </div>

        <div className="p-4 bg-dark-700 rounded-lg">
          <div className="flex items-center mb-2">
            <Clock className="w-5 h-5 text-light-700 mr-2" />
            <span className="font-medium">Pending</span>
          </div>
          <p className="text-2xl font-bold">{pending}</p>
          <p className="text-sm text-light-700">items</p>
        </div>
      </div>
    </div>
  );
};

export default AuditProgress;