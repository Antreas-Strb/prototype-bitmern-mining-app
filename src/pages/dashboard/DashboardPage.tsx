import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Zap, 
  Thermometer, 
  Bitcoin,
  ChevronRight,
  Bell,
  RefreshCcw
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import StatCard from '../../components/dashboard/StatCard';
import { useBitcoinPrice } from '../../contexts/BitcoinPriceContext';

const DashboardPage = () => {
  const [timeRange, setTimeRange] = useState('24h');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hashRateData, setHashRateData] = useState([]);
  const [powerData, setPowerData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const { price: btcPrice } = useBitcoinPrice();

  // Generate mock data with proper typing
  const generateHashRateData = () => {
    const now = new Date();
    return Array.from({ length: 24 }, (_, i) => {
      const date = new Date(now);
      date.setHours(date.getHours() - i);
      return {
        date: date.toLocaleTimeString([], { hour: '2-digit' }),
        hashrate: 85 + Math.random() * 40
      };
    }).reverse();
  };

  const generatePowerData = () => {
    const now = new Date();
    return Array.from({ length: 24 }, (_, i) => {
      const date = new Date(now);
      date.setHours(date.getHours() - i);
      return {
        date: date.toLocaleTimeString([], { hour: '2-digit' }),
        consumption: 300 + Math.random() * 100
      };
    }).reverse();
  };

  const generateTempData = () => {
    return Array.from({ length: 5 }, (_, i) => ({
      name: `Miner ${i + 1}`,
      temperature: 55 + Math.random() * 15
    }));
  };

  const generateRevenueData = () => {
    const now = new Date();
    return Array.from({ length: 24 }, (_, i) => {
      const date = new Date(now);
      date.setHours(date.getHours() - i);
      return {
        date: date.toLocaleTimeString([], { hour: '2-digit' }),
        revenue: 6000 + Math.random() * 4000,
        cost: 4000 + Math.random() * 1000
      };
    }).reverse();
  };

  const refreshData = () => {
    setIsRefreshing(true);
    setHashRateData(generateHashRateData());
    setPowerData(generatePowerData());
    setTempData(generateTempData());
    setRevenueData(generateRevenueData());
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  useEffect(() => {
    // Initial data load
    refreshData();
    
    // Set up auto-refresh interval
    const interval = setInterval(refreshData, 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  const calculateDailyRevenue = () => {
    if (revenueData.length === 0) return '0.00';
    const lastRevenue = revenueData[revenueData.length - 1];
    return (lastRevenue.revenue - lastRevenue.cost).toFixed(2);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-dark-800 p-3 border border-dark-700 rounded-lg shadow-lg">
          <p className="text-light-500 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value.toFixed(2)} {entry.unit || ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mining Dashboard</h1>
        <div className="flex space-x-2">
          <button 
            className={`btn btn-outline flex items-center ${isRefreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={refreshData}
            disabled={isRefreshing}
          >
            <RefreshCcw className={`w-5 h-5 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button className="btn btn-primary">
            Export Data
          </button>
        </div>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Hashrate" 
          value="456.2 TH/s" 
          change={8.3} 
          changeText="vs last week" 
          icon={<BarChart3 className="w-6 h-6 text-primary-400" />} 
        />
        <StatCard 
          title="Power Consumption" 
          value="12.4 kWh" 
          change={-2.5} 
          changeText="vs last week" 
          icon={<Zap className="w-6 h-6 text-secondary-400" />} 
        />
        <StatCard 
          title="Average Temperature" 
          value="61°C" 
          change={3.1} 
          changeText="vs last week" 
          icon={<Thermometer className="w-6 h-6 text-warning-500" />} 
        />
        <StatCard 
          title="Daily Revenue" 
          value={`$${calculateDailyRevenue()}`}
          change={5.7} 
          changeText="vs last week" 
          icon={<Bitcoin className="w-6 h-6 text-accent-500" />} 
        />
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hashrate Chart */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Hashrate Performance</h2>
            <div className="flex space-x-2">
              <button 
                className={`px-2 py-1 text-xs rounded ${timeRange === '24h' ? 'bg-primary-700/30 text-primary-400' : 'bg-dark-700 hover:bg-dark-600'}`}
                onClick={() => setTimeRange('24h')}
              >
                24h
              </button>
              <button 
                className={`px-2 py-1 text-xs rounded ${timeRange === '7d' ? 'bg-primary-700/30 text-primary-400' : 'bg-dark-700 hover:bg-dark-600'}`}
                onClick={() => setTimeRange('7d')}
              >
                7d
              </button>
              <button 
                className={`px-2 py-1 text-xs rounded ${timeRange === '30d' ? 'bg-primary-700/30 text-primary-400' : 'bg-dark-700 hover:bg-dark-600'}`}
                onClick={() => setTimeRange('30d')}
              >
                30d
              </button>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hashRateData}>
                <defs>
                  <linearGradient id="hashRateGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="hashrate" 
                  name="Hashrate"
                  unit=" TH/s"
                  stroke="#3B82F6" 
                  fillOpacity={1} 
                  fill="url(#hashRateGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Power Consumption Chart */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Power Consumption</h2>
            <div className="flex space-x-2">
              <button 
                className={`px-2 py-1 text-xs rounded ${timeRange === '24h' ? 'bg-secondary-700/30 text-secondary-400' : 'bg-dark-700 hover:bg-dark-600'}`}
                onClick={() => setTimeRange('24h')}
              >
                24h
              </button>
              <button 
                className={`px-2 py-1 text-xs rounded ${timeRange === '7d' ? 'bg-secondary-700/30 text-secondary-400' : 'bg-dark-700 hover:bg-dark-600'}`}
                onClick={() => setTimeRange('7d')}
              >
                7d
              </button>
              <button 
                className={`px-2 py-1 text-xs rounded ${timeRange === '30d' ? 'bg-secondary-700/30 text-secondary-400' : 'bg-dark-700 hover:bg-dark-600'}`}
                onClick={() => setTimeRange('30d')}
              >
                30d
              </button>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={powerData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="consumption"
                  name="Power"
                  unit=" W"
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
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Temperature Chart */}
        <div className="card lg:col-span-1">
          <h2 className="text-lg font-semibold mb-6">Temperature Distribution</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tempData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="temperature"
                  name="Temperature"
                  unit="°C"
                  fill="#F97316" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Revenue vs Costs */}
        <div className="card lg:col-span-2">
          <h2 className="text-lg font-semibold mb-6">Revenue vs Costs</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="costGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="revenue"
                  name="Revenue"
                  unit=" USD"
                  stroke="#10B981" 
                  fillOpacity={1} 
                  fill="url(#revenueGradient)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="cost"
                  name="Cost"
                  unit=" USD"
                  stroke="#EF4444" 
                  fillOpacity={1} 
                  fill="url(#costGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;