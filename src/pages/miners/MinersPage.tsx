import React, { useState } from 'react';
import { 
  HardDrive, 
  Zap, 
  Thermometer, 
  Settings, 
  AlertTriangle, 
  Power,
  Plus,
  Filter,
  Search,
  MoreVertical,
  ChevronDown,
  ExternalLink,
  Loader
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMiners } from '../../hooks/useMiners';
import MinerCard from '../../components/miners/MinerCard';

const MinersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { miners, isLoading, isError, mutate } = useMiners();
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader className="w-8 h-8 animate-spin text-primary-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 bg-error-500/10 border border-error-500/30 rounded-lg">
        <div className="flex items-center">
          <AlertTriangle className="w-6 h-6 text-error-500 mr-3" />
          <h2 className="text-lg font-semibold text-error-500">Error Loading Miners</h2>
        </div>
        <p className="mt-2 text-light-700">Failed to load miner data. Please try again.</p>
        <button 
          onClick={() => mutate()}
          className="mt-4 btn btn-error"
        >
          Retry
        </button>
      </div>
    );
  }

  const filteredMiners = miners?.filter(miner => {
    if (statusFilter !== 'all' && miner.status !== statusFilter) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        miner.name.toLowerCase().includes(query) ||
        miner.model.toLowerCase().includes(query) ||
        miner.pool.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const totalHashrate = miners?.reduce((total, miner) => {
    if (miner.status === 'online') {
      const hashrate = parseFloat(miner.hashrate) || 0;
      return total + hashrate;
    }
    return total;
  }, 0);

  const totalPower = miners?.reduce((total, miner) => {
    if (miner.status === 'online') {
      const power = parseFloat(miner.power) || 0;
      return total + power;
    }
    return total;
  }, 0);

  const averageTemp = miners?.reduce((total, miner, index, array) => {
    if (miner.status === 'online') {
      const temp = parseFloat(miner.temperature) || 0;
      return total + temp / array.length;
    }
    return total;
  }, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mining Hardware</h1>
        <div className="flex space-x-2">
          <button className="btn btn-outline">
            Import Miners
          </button>
          <button className="btn btn-primary flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            Add New Miner
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card flex items-start">
          <div className="p-3 bg-primary-500/20 rounded-lg mr-4">
            <HardDrive className="w-6 h-6 text-primary-400" />
          </div>
          <div>
            <p className="text-sm text-light-700">Total Miners</p>
            <p className="text-xl font-semibold mt-1">{miners?.length || 0} Units</p>
            <p className="text-sm text-success-500">
              {miners?.filter(m => m.status === 'online').length} Active
            </p>
          </div>
        </div>
        
        <div className="card flex items-start">
          <div className="p-3 bg-secondary-500/20 rounded-lg mr-4">
            <Zap className="w-6 h-6 text-secondary-400" />
          </div>
          <div>
            <p className="text-sm text-light-700">Total Hashrate</p>
            <p className="text-xl font-semibold mt-1">{totalHashrate?.toFixed(1)} TH/s</p>
            <p className="text-sm text-success-500">+5.2% vs last week</p>
          </div>
        </div>
        
        <div className="card flex items-start">
          <div className="p-3 bg-accent-500/20 rounded-lg mr-4">
            <Power className="w-6 h-6 text-accent-400" />
          </div>
          <div>
            <p className="text-sm text-light-700">Power Consumption</p>
            <p className="text-xl font-semibold mt-1">{(totalPower / 1000).toFixed(1)} kW</p>
            <p className="text-sm text-error-500">-2.1% efficiency</p>
          </div>
        </div>
        
        <div className="card flex items-start">
          <div className="p-3 bg-warning-500/20 rounded-lg mr-4">
            <Thermometer className="w-6 h-6 text-warning-500" />
          </div>
          <div>
            <p className="text-sm text-light-700">Avg Temperature</p>
            <p className="text-xl font-semibold mt-1">{averageTemp?.toFixed(1)}°C</p>
            <p className="text-sm text-warning-500">
              Warning: {miners?.filter(m => parseFloat(m.temperature) > 65).length} units
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-900 w-5 h-5" />
          <input
            type="text"
            placeholder="Search miners by name, model, or pool..."
            className="input pl-10 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button className="btn btn-outline flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filters
            <ChevronDown className="w-4 h-4 ml-2" />
          </button>
          <select 
            className="input min-w-[150px]"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="online">Online</option>
            <option value="warning">Warning</option>
            <option value="offline">Offline</option>
          </select>
        </div>
      </div>

      {/* Miners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMiners?.map((miner) => (
          <MinerCard key={miner.id} miner={miner} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <button className="card hover:bg-dark-700/50 transition-colors">
          <div className="flex items-center">
            <div className="p-3 bg-primary-500/20 rounded-lg mr-4">
              <Settings className="w-6 h-6 text-primary-400" />
            </div>
            <div className="text-left">
              <h3 className="font-medium">Batch Configure</h3>
              <p className="text-sm text-light-700">Update multiple miners</p>
            </div>
          </div>
        </button>

        <button className="card hover:bg-dark-700/50 transition-colors">
          <div className="flex items-center">
            <div className="p-3 bg-secondary-500/20 rounded-lg mr-4">
              <Power className="w-6 h-6 text-secondary-400" />
            </div>
            <div className="text-left">
              <h3 className="font-medium">Power Management</h3>
              <p className="text-sm text-light-700">Control power settings</p>
            </div>
          </div>
        </button>

        <button className="card hover:bg-dark-700/50 transition-colors">
          <div className="flex items-center">
            <div className="p-3 bg-accent-500/20 rounded-lg mr-4">
              <AlertTriangle className="w-6 h-6 text-accent-400" />
            </div>
            <div className="text-left">
              <h3 className="font-medium">Alerts</h3>
              <p className="text-sm text-light-700">View and manage alerts</p>
            </div>
          </div>
        </button>

        <button className="card hover:bg-dark-700/50 transition-colors">
          <div className="flex items-center">
            <div className="p-3 bg-warning-500/20 rounded-lg mr-4">
              <HardDrive className="w-6 h-6 text-warning-500" />
            </div>
            <div className="text-left">
              <h3 className="font-medium">Maintenance</h3>
              <p className="text-sm text-light-700">Schedule maintenance</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default MinersPage;