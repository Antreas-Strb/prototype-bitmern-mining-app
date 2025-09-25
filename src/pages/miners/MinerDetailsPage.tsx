'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { 
  HardDrive, 
  Zap, 
  Thermometer, 
  Settings, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight,
  Power,
  Server,
  Activity,
  AlertTriangle,
  BarChart3,
  History,
  ChevronRight
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

// Mock data for charts
const hashrateData = [
  { time: '00:00', hashrate: 95 },
  { time: '04:00', hashrate: 98 },
  { time: '08:00', hashrate: 92 },
  { time: '12:00', hashrate: 96 },
  { time: '16:00', hashrate: 94 },
  { time: '20:00', hashrate: 97 },
  { time: '24:00', hashrate: 95 },
];

const powerData = [
  { time: '00:00', power: 3250 },
  { time: '04:00', power: 3260 },
  { time: '08:00', power: 3240 },
  { time: '12:00', power: 3255 },
  { time: '16:00', power: 3245 },
  { time: '20:00', power: 3250 },
  { time: '24:00', power: 3248 },
];

const temperatureData = [
  { time: '00:00', temp: 62 },
  { time: '04:00', temp: 63 },
  { time: '08:00', temp: 65 },
  { time: '12:00', temp: 64 },
  { time: '16:00', temp: 63 },
  { time: '20:00', temp: 62 },
  { time: '24:00', temp: 63 },
];

// Mock events data
const events = [
  {
    id: 1,
    type: 'warning',
    message: 'High temperature detected',
    timestamp: '2024-03-15T14:30:00',
  },
  {
    id: 2,
    type: 'info',
    message: 'Hashrate optimization applied',
    timestamp: '2024-03-15T12:15:00',
  },
  {
    id: 3,
    type: 'error',
    message: 'Connection lost temporarily',
    timestamp: '2024-03-15T10:45:00',
  },
];

const MinerDetailsPage = () => {
  const params = useParams();
  const id = params?.id as string;
  
  // Mock miner data - in real app, fetch based on id
  const miner = {
    id: 'MINER-001',
    name: 'Antminer S19 XP',
    status: 'online',
    hashrate: '140 TH/s',
    efficiency: '21.5 J/TH',
    power: '3010W',
    temperature: '62°C',
    uptime: '99.8%',
    pool: 'F2Pool',
    worker: 'worker1',
    lastShare: '2 min ago',
    earnings: '0.00042 BTC/day',
    firmware: 'v2.0.1.3',
    ip: '192.168.1.100',
    location: 'Rack A4, Shelf 2',
    facility: 'Texas Mega Facility'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            <HardDrive className="w-6 h-6 mr-2" />
            {miner.name}
          </h1>
          <p className="text-light-700 mt-1">ID: {miner.id}</p>
        </div>
        <div className="flex space-x-2">
          <button className="btn btn-outline">
            Restart Miner
          </button>
          <button className="btn btn-primary flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            Configure
          </button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-light-700">Hashrate</p>
              <p className="text-2xl font-bold mt-1">{miner.hashrate}</p>
            </div>
            <div className="p-2 bg-success-500/20 rounded-lg">
              <ArrowUpRight className="w-5 h-5 text-success-500" />
            </div>
          </div>
          <div className="flex items-center text-success-500 text-sm">
            <ArrowUpRight className="w-4 h-4 mr-1" />
            <span>+2.5% vs 24h avg</span>
          </div>
        </div>

        <div className="card">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-light-700">Power</p>
              <p className="text-2xl font-bold mt-1">{miner.power}</p>
            </div>
            <div className="p-2 bg-warning-500/20 rounded-lg">
              <Zap className="w-5 h-5 text-warning-500" />
            </div>
          </div>
          <div className="flex items-center text-warning-500 text-sm">
            <ArrowUpRight className="w-4 h-4 mr-1" />
            <span>Efficiency: {miner.efficiency}</span>
          </div>
        </div>

        <div className="card">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-light-700">Temperature</p>
              <p className="text-2xl font-bold mt-1">{miner.temperature}</p>
            </div>
            <div className="p-2 bg-error-500/20 rounded-lg">
              <Thermometer className="w-5 h-5 text-error-500" />
            </div>
          </div>
          <div className="flex items-center text-error-500 text-sm">
            <AlertTriangle className="w-4 h-4 mr-1" />
            <span>Above optimal range</span>
          </div>
        </div>

        <div className="card">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-light-700">Uptime</p>
              <p className="text-2xl font-bold mt-1">{miner.uptime}</p>
            </div>
            <div className="p-2 bg-primary-500/20 rounded-lg">
              <Activity className="w-5 h-5 text-primary-500" />
            </div>
          </div>
          <div className="flex items-center text-primary-500 text-sm">
            <Clock className="w-4 h-4 mr-1" />
            <span>Last share: {miner.lastShare}</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg font-semibold mb-6">Hashrate Performance</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hashrateData}>
                <defs>
                  <linearGradient id="hashrateGradient" x1="0" y1="0" x2="0" y2="1">
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
                  fill="url(#hashrateGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold mb-6">Power Consumption</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={powerData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151' }}
                  labelStyle={{ color: '#F9FAFB' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="power" 
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

      {/* Details and Events */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Miner Details */}
        <div className="card lg:col-span-2">
          <h2 className="text-lg font-semibold mb-6">Miner Details</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-light-700">Pool</p>
                <p className="font-medium mt-1">{miner.pool}</p>
              </div>
              <div>
                <p className="text-sm text-light-700">Worker Name</p>
                <p className="font-medium mt-1">{miner.worker}</p>
              </div>
              <div>
                <p className="text-sm text-light-700">Firmware Version</p>
                <p className="font-medium mt-1">{miner.firmware}</p>
              </div>
              <div>
                <p className="text-sm text-light-700">IP Address</p>
                <p className="font-medium mt-1">{miner.ip}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-light-700">Location</p>
                <p className="font-medium mt-1">{miner.location}</p>
              </div>
              <div>
                <p className="text-sm text-light-700">Facility</p>
                <p className="font-medium mt-1">{miner.facility}</p>
              </div>
              <div>
                <p className="text-sm text-light-700">Daily Earnings</p>
                <p className="font-medium mt-1">{miner.earnings}</p>
              </div>
              <div>
                <p className="text-sm text-light-700">Status</p>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-success-500/20 text-success-500 mt-1">
                  Online
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Events */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Recent Events</h2>
            <button className="text-primary-400 hover:text-primary-300 text-sm flex items-center">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="p-4 bg-dark-700 rounded-lg">
                <div className="flex items-start">
                  <div className={`p-2 rounded-full ${
                    event.type === 'error' 
                      ? 'bg-error-500/20' 
                      : event.type === 'warning'
                        ? 'bg-warning-500/20'
                        : 'bg-success-500/20'
                  } mr-3`}>
                    <AlertTriangle className={`w-5 h-5 ${
                      event.type === 'error' 
                        ? 'text-error-500' 
                        : event.type === 'warning'
                          ? 'text-warning-500'
                          : 'text-success-500'
                    }`} />
                  </div>
                  <div>
                    <p className="text-sm mb-1">{event.message}</p>
                    <p className="text-xs text-light-900">
                      {new Date(event.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinerDetailsPage;