import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Users, 
  Zap, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight,
  RefreshCcw,
  Settings,
  AlertTriangle,
  ChevronRight
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import useSWR from 'swr';

interface ViaBTCResponse {
  code: number;
  message: string;
  data: any;
}

const fetcher = async (endpoint: string): Promise<ViaBTCResponse> => {
  const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/viabtc?endpoint=${endpoint}`;
  const response = await fetch(apiUrl, {
    headers: {
      'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch data from ViaBTC');
  }
  
  return response.json();
};

const ViaBTCWatcherPage = () => {
  const [timeRange, setTimeRange] = useState('24h');
  const { data: accountInfo, error: accountError, mutate: refreshAccount } = useSWR('/account/info', fetcher);
  const { data: minerStats, error: minerError, mutate: refreshMiners } = useSWR('/miner/stats', fetcher);
  
  const isLoading = !accountInfo && !accountError || !minerStats && !minerError;
  const hasError = accountError || minerError;

  const workers = [
    {
      id: 'worker-1',
      name: 'Worker 1',
      status: 'active',
      hashrate: '130 TH/s',
      acceptedShares: '123456',
      rejectedShares: '123',
      lastShare: '1 min ago',
      dailyRewards: '0.00062 BTC'
    },
    {
      id: 'worker-2',
      name: 'Worker 2',
      status: 'active',
      hashrate: '136 TH/s',
      acceptedShares: '654321',
      rejectedShares: '321',
      lastShare: '5 min ago',
      dailyRewards: '0.00061 BTC'
    },
    {
      id: 'worker-3',
      name: 'Worker 3',
      status: 'inactive',
      hashrate: '0 TH/s',
      acceptedShares: '0',
      rejectedShares: '0',
      lastShare: 'N/A',
      dailyRewards: '0.00000 BTC'
    },
  ];

  const refreshData = async () => {
    await Promise.all([
      refreshAccount(),
      refreshMiners()
    ]);
  };

  // Format data for charts
  const formatHashrateData = (stats: any) => {
    if (!stats?.hashrate_history) return [];
    return Object.entries(stats.hashrate_history).map(([time, hashrate]) => ({
      time: new Date(parseInt(time) * 1000).toLocaleTimeString([], { hour: '2-digit' }),
      hashrate: parseFloat(hashrate as string)
    }));
  };

  // Mock rewards data for the chart
  const rewardsData = [
    { time: '00:00', rewards: 0.0001 },
    { time: '04:00', rewards: 0.00012 },
    { time: '08:00', rewards: 0.00015 },
    { time: '12:00', rewards: 0.00013 },
    { time: '16:00', rewards: 0.00014 },
    { time: '20:00', rewards: 0.00016 },
    { time: '24:00', rewards: 0.00015 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-success-500/20 text-success-500';
      case 'warning':
        return 'bg-warning-500/20 text-warning-500';
      case 'inactive':
        return 'bg-error-500/20 text-error-500';
      default:
        return 'bg-light-700/20 text-light-700';
    }
  };

  if (hasError) {
    return (
      <div className="p-6 bg-error-500/10 border border-error-500/30 rounded-lg">
        <div className="flex items-center">
          <AlertTriangle className="w-6 h-6 text-error-500 mr-3" />
          <h2 className="text-lg font-semibold text-error-500">Error Loading Data</h2>
        </div>
        <p className="mt-2 text-light-700">Failed to fetch data from ViaBTC. Please try again later.</p>
        <button 
          onClick={refreshData}
          className="mt-4 btn btn-error"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">ViaBTC Account</h1>
          <p className="text-light-700">Pool: BTC.com</p>
        </div>
        <div className="flex space-x-2">
          <button className="btn btn-outline flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            Settings
          </button>
          <button className="btn btn-primary flex items-center" onClick={refreshData}>
            <RefreshCcw className="w-5 h-5 mr-2" />
            Refresh Data
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-light-700">Total Hashrate</p>
              <p className="text-2xl font-bold mt-1">266 TH/s</p>
            </div>
            <div className="p-2 bg-success-500/20 rounded-lg">
              <ArrowUpRight className="w-5 h-5 text-success-500" />
            </div>
          </div>
          <div className="flex items-center text-success-500 text-sm">
            <ArrowUpRight className="w-4 h-4 mr-1" />
            <span>+5.2% vs 24h avg</span>
          </div>
        </div>

        <div className="card">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-light-700">Active Workers</p>
              <p className="text-2xl font-bold mt-1">2/3</p>
            </div>
            <div className="p-2 bg-warning-500/20 rounded-lg">
              <Users className="w-5 h-5 text-warning-500" />
            </div>
          </div>
          <div className="flex items-center text-warning-500 text-sm">
            <AlertTriangle className="w-4 h-4 mr-1" />
            <span>1 inactive worker</span>
          </div>
        </div>

        <div className="card">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-light-700">24h Rewards</p>
              <p className="text-2xl font-bold mt-1">0.00123 BTC</p>
            </div>
            <div className="p-2 bg-accent-500/20 rounded-lg">
              <Zap className="w-5 h-5 text-accent-500" />
            </div>
          </div>
          <div className="flex items-center text-success-500 text-sm">
            <ArrowUpRight className="w-4 h-4 mr-1" />
            <span>+3.8% vs yesterday</span>
          </div>
        </div>

        <div className="card">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-light-700">Share Acceptance</p>
              <p className="text-2xl font-bold mt-1">99.2%</p>
            </div>
            <div className="p-2 bg-primary-500/20 rounded-lg">
              <Clock className="w-5 h-5 text-primary-500" />
            </div>
          </div>
          <div className="flex items-center text-error-500 text-sm">
            <ArrowDownRight className="w-4 h-4 mr-1" />
            <span>-0.3% vs 24h avg</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Hashrate History</h2>
            <div className="flex space-x-2">
              <button 
                className={`px-2 py-1 text-xs rounded ${
                  timeRange === '24h' 
                    ? 'bg-primary-700/30 text-primary-400' 
                    : 'bg-dark-700 hover:bg-dark-600'
                }`}
                onClick={() => setTimeRange('24h')}
              >
                24h
              </button>
              <button 
                className={`px-2 py-1 text-xs rounded ${
                  timeRange === '7d' 
                    ? 'bg-primary-700/30 text-primary-400' 
                    : 'bg-dark-700 hover:bg-dark-600'
                }`}
                onClick={() => setTimeRange('7d')}
              >
                7d
              </button>
              <button 
                className={`px-2 py-1 text-xs rounded ${
                  timeRange === '30d' 
                    ? 'bg-primary-700/30 text-primary-400' 
                    : 'bg-dark-700 hover:bg-dark-600'
                }`}
                onClick={() => setTimeRange('30d')}
              >
                30d
              </button>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={minerStats ? formatHashrateData(minerStats.data) : []}>
                <defs>
                  <linearGradient id="hashRateGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151' }}
                  labelStyle={{ color: '#F9FAFB' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="hashrate" 
                  stroke="#3B82F6" 
                  fillOpacity={1} 
                  fill="url(#hashRateGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Rewards History</h2>
            <button className="text-primary-400 hover:text-primary-300 text-sm flex items-center">
              View Details <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={rewardsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151' }}
                  labelStyle={{ color: '#F9FAFB' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="rewards" 
                  stroke="#14B8A6" 
                  strokeWidth={2}
                  dot={{ r: 4, fill: '#14B8A6' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Workers Table */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Mining Workers</h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-light-700">
              {workers.length} workers
            </span>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-700">
                <th className="text-left py-3 text-light-700 font-medium">Worker</th>
                <th className="text-left py-3 text-light-700 font-medium">Status</th>
                <th className="text-left py-3 text-light-700 font-medium">Hashrate</th>
                <th className="text-left py-3 text-light-700 font-medium">Accepted Shares</th>
                <th className="text-left py-3 text-light-700 font-medium">Rejected Shares</th>
                <th className="text-left py-3 text-light-700 font-medium">Last Share</th>
                <th className="text-left py-3 text-light-700 font-medium">24h Rewards</th>
              </tr>
            </thead>
            <tbody>
              {workers.map((worker) => (
                <tr key={worker.id} className="border-b border-dark-700 hover:bg-dark-700/50">
                  <td className="py-4">
                    <div className="flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2 text-light-700" />
                      {worker.name}
                    </div>
                  </td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(worker.status)}`}>
                      {worker.status.charAt(0).toUpperCase() + worker.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4">{worker.hashrate}</td>
                  <td className="py-4">{worker.acceptedShares}</td>
                  <td className="py-4">
                    <span className="text-error-500">{worker.rejectedShares}</span>
                  </td>
                  <td className="py-4">{worker.lastShare}</td>
                  <td className="py-4">{worker.dailyRewards}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViaBTCWatcherPage;