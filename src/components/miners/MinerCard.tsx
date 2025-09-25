import React from 'react';
import Link from 'next/link';
import { 
  HardDrive, 
  Zap, 
  Thermometer, 
  Settings,
  ExternalLink,
  MoreVertical,
  CheckCircle,
  AlertTriangle,
  XCircle
} from 'lucide-react';
import type { Miner } from '../../hooks/useMiners';

interface MinerCardProps {
  miner: Miner;
}

const MinerCard: React.FC<MinerCardProps> = ({ miner }) => {
  const getStatusIcon = () => {
    switch (miner.status) {
      case 'online':
        return <CheckCircle className="w-5 h-5 text-success-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-warning-500" />;
      case 'offline':
        return <XCircle className="w-5 h-5 text-error-500" />;
    }
  };

  const getStatusColor = () => {
    switch (miner.status) {
      case 'online':
        return 'bg-success-500/20 text-success-500';
      case 'warning':
        return 'bg-warning-500/20 text-warning-500';
      case 'offline':
        return 'bg-error-500/20 text-error-500';
    }
  };

  return (
    <div className="card">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <HardDrive className="w-6 h-6 text-light-700 mr-3" />
          <div>
            <h3 className="font-medium">{miner.name}</h3>
            <p className="text-sm text-light-700">{miner.model}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs flex items-center ${getStatusColor()}`}>
            {getStatusIcon()}
            <span className="ml-1 capitalize">{miner.status}</span>
          </span>
          <button className="p-1 hover:bg-dark-700 rounded-lg transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-3 bg-dark-700 rounded-lg">
          <div className="flex items-center text-sm text-light-700 mb-1">
            <Zap className="w-4 h-4 mr-1" />
            <span>Hashrate</span>
          </div>
          <p className="font-medium">{miner.hashrate}</p>
        </div>
        <div className="p-3 bg-dark-700 rounded-lg">
          <div className="flex items-center text-sm text-light-700 mb-1">
            <Thermometer className="w-4 h-4 mr-1" />
            <span>Temperature</span>
          </div>
          <p className="font-medium">{miner.temperature}</p>
        </div>
      </div>

      <div className="space-y-2 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-light-700">Pool</span>
          <span>{miner.pool}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-light-700">Last Share</span>
          <span>{miner.last_share}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-light-700">24h Earnings</span>
          <span>{miner.earnings}</span>
        </div>
      </div>

      <div className="flex justify-between">
        <button className="btn btn-outline btn-sm flex items-center">
          <Settings className="w-4 h-4 mr-2" />
          Configure
        </button>
        <Link 
          href={`/miners/${miner.id}`}
          className="btn btn-primary btn-sm flex items-center"
        >
          View Details
          <ExternalLink className="w-4 h-4 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default MinerCard;