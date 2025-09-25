import React from 'react';
import { 
  Server, 
  Map, 
  Zap, 
  Shield, 
  Users, 
  Clock, 
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';

// Mock data for facilities
const facilities = [
  {
    id: 1,
    name: 'Texas Mega Facility',
    location: 'Austin, TX',
    status: 'operational',
    capacity: {
      total: '100 MW',
      used: '76 MW',
      available: '24 MW'
    },
    uptime: '99.99%',
    temperature: '22°C',
    humidity: '45%',
    powerCost: '$0.052/kWh'
  },
  {
    id: 2,
    name: 'Nordic Green Hub',
    location: 'Stockholm, Sweden',
    status: 'maintenance',
    capacity: {
      total: '50 MW',
      used: '32 MW',
      available: '18 MW'
    },
    uptime: '99.95%',
    temperature: '18°C',
    humidity: '40%',
    powerCost: '$0.048/kWh'
  }
];

// Mock data for hosting plans
const hostingPlans = [
  {
    name: 'Standard',
    price: '$89',
    power: '3000W',
    features: [
      'Basic monitoring',
      '24/7 facility security',
      'Standard support',
      'Monthly reports'
    ]
  },
  {
    name: 'Professional',
    price: '$129',
    power: '6000W',
    features: [
      'Advanced monitoring',
      'Priority maintenance',
      '24/7 technical support',
      'Weekly reports',
      'Power usage optimization'
    ],
    recommended: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    power: 'Custom',
    features: [
      'Full-scale monitoring',
      'Dedicated support team',
      'Custom SLA',
      'Daily reports',
      'Power usage optimization',
      'Custom integration'
    ]
  }
];

// Mock data for hosted miners
const hostedMiners = [
  {
    id: 'HM-001',
    model: 'Antminer S19 XP',
    facility: 'Texas Mega Facility',
    status: 'running',
    powerUsage: '3010W',
    temperature: '62°C',
    startDate: '2024-01-15'
  },
  {
    id: 'HM-002',
    model: 'Whatsminer M50S',
    facility: 'Nordic Green Hub',
    status: 'maintenance',
    powerUsage: '3276W',
    temperature: '58°C',
    startDate: '2024-02-01'
  }
];

const HostingPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Hosting Services</h1>
        <button className="btn btn-primary">
          Request Hosting
        </button>
      </div>

      {/* Facilities Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {facilities.map((facility) => (
          <div key={facility.id} className="card">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-lg font-semibold">{facility.name}</h2>
                <div className="flex items-center text-light-700 mt-1">
                  <Map className="w-4 h-4 mr-1" />
                  <span className="text-sm">{facility.location}</span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                facility.status === 'operational' 
                  ? 'bg-success-500/20 text-success-500' 
                  : 'bg-warning-500/20 text-warning-500'
              }`}>
                {facility.status.charAt(0).toUpperCase() + facility.status.slice(1)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-dark-700 rounded-lg">
                <p className="text-sm text-light-700">Power Capacity</p>
                <p className="text-lg font-semibold mt-1">{facility.capacity.total}</p>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-success-500">{facility.capacity.available} Available</span>
                  <span className="text-light-700">{facility.capacity.used} Used</span>
                </div>
              </div>
              <div className="p-4 bg-dark-700 rounded-lg">
                <p className="text-sm text-light-700">Environment</p>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between">
                    <span>Temperature</span>
                    <span className="text-light-500">{facility.temperature}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Humidity</span>
                    <span className="text-light-500">{facility.humidity}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center text-success-500">
                <Clock className="w-4 h-4 mr-1" />
                <span>Uptime: {facility.uptime}</span>
              </div>
              <div className="text-light-700">
                Power Cost: {facility.powerCost}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hosting Plans */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-6">Hosting Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hostingPlans.map((plan) => (
            <div key={plan.name} className={`p-6 rounded-xl border ${
              plan.recommended 
                ? 'border-primary-500 bg-primary-500/5' 
                : 'border-dark-700 bg-dark-800'
            }`}>
              {plan.recommended && (
                <span className="inline-block px-3 py-1 bg-primary-500/20 text-primary-400 text-sm rounded-full mb-4">
                  Recommended
                </span>
              )}
              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <div className="flex items-baseline mb-4">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-light-700 ml-2">/month</span>
              </div>
              <p className="text-light-700 mb-4">Up to {plan.power} per unit</p>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <CheckCircle className="w-5 h-5 text-success-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`w-full btn ${
                plan.recommended ? 'btn-primary' : 'btn-outline'
              }`}>
                Select Plan
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Hosted Miners */}
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Your Hosted Miners</h2>
          <button className="text-primary-400 hover:text-primary-300 text-sm flex items-center">
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-700">
                <th className="text-left py-3 text-light-700 font-medium">ID</th>
                <th className="text-left py-3 text-light-700 font-medium">Model</th>
                <th className="text-left py-3 text-light-700 font-medium">Facility</th>
                <th className="text-left py-3 text-light-700 font-medium">Status</th>
                <th className="text-left py-3 text-light-700 font-medium">Power Usage</th>
                <th className="text-left py-3 text-light-700 font-medium">Temperature</th>
                <th className="text-left py-3 text-light-700 font-medium">Start Date</th>
              </tr>
            </thead>
            <tbody>
              {hostedMiners.map((miner) => (
                <tr key={miner.id} className="border-b border-dark-700 hover:bg-dark-700/50">
                  <td className="py-4">{miner.id}</td>
                  <td className="py-4">{miner.model}</td>
                  <td className="py-4">{miner.facility}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      miner.status === 'running' 
                        ? 'bg-success-500/20 text-success-500' 
                        : 'bg-warning-500/20 text-warning-500'
                    }`}>
                      {miner.status.charAt(0).toUpperCase() + miner.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4">{miner.powerUsage}</td>
                  <td className="py-4">{miner.temperature}</td>
                  <td className="py-4">{miner.startDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card">
          <div className="p-3 bg-primary-500/20 rounded-lg w-fit mb-4">
            <Shield className="w-6 h-6 text-primary-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Enterprise Security</h3>
          <p className="text-light-700">
            24/7 security personnel, CCTV monitoring, and secure access controls protect your mining hardware.
          </p>
        </div>

        <div className="card">
          <div className="p-3 bg-secondary-500/20 rounded-lg w-fit mb-4">
            <Zap className="w-6 h-6 text-secondary-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Reliable Power</h3>
          <p className="text-light-700">
            Redundant power systems and UPS backup ensure continuous operation of your mining equipment.
          </p>
        </div>

        <div className="card">
          <div className="p-3 bg-accent-500/20 rounded-lg w-fit mb-4">
            <Users className="w-6 h-6 text-accent-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Expert Support</h3>
          <p className="text-light-700">
            Our team of mining experts provides round-the-clock technical support and maintenance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HostingPage;