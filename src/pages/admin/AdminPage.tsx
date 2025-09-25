import React from 'react';
import { Users, Server, Settings, AlertTriangle, Activity, Database } from 'lucide-react';

const AdminPage = () => {
  const stats = [
    { label: 'Total Users', value: '1,234', change: '+12%', icon: <Users className="w-6 h-6 text-primary-400" /> },
    { label: 'Active Miners', value: '856', change: '+8%', icon: <Server className="w-6 h-6 text-secondary-400" /> },
    { label: 'System Load', value: '76%', change: '-3%', icon: <Activity className="w-6 h-6 text-accent-400" /> },
  ];

  const recentAlerts = [
    { id: 1, type: 'error', message: 'High system load detected on Server #12', time: '5 minutes ago' },
    { id: 2, type: 'warning', message: 'User verification pending for 25 accounts', time: '15 minutes ago' },
    { id: 3, type: 'info', message: 'System backup completed successfully', time: '1 hour ago' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex space-x-2">
          <button className="btn btn-outline">
            Export Data
          </button>
          <button className="btn btn-primary">
            System Settings
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="dashboard-stat">
            <div className="flex justify-between items-start">
              <div>
                <p className="stat-label">{stat.label}</p>
                <p className="stat-value">{stat.value}</p>
              </div>
              <div className="p-3 bg-dark-700 rounded-lg">
                {stat.icon}
              </div>
            </div>
            <div className={`mt-4 flex items-center ${
              stat.change.startsWith('+') ? 'text-success-500' : 'text-error-500'
            }`}>
              <span className="text-sm font-medium">{stat.change} vs last week</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Status */}
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">System Status</h2>
            <button className="text-primary-400 hover:text-primary-300 text-sm">View Details</button>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-dark-700 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-light-700">CPU Usage</p>
                    <p className="text-xl font-semibold mt-1">45%</p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-success-500"></div>
                </div>
              </div>
              <div className="p-4 bg-dark-700 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-light-700">Memory</p>
                    <p className="text-xl font-semibold mt-1">76%</p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-warning-500"></div>
                </div>
              </div>
              <div className="p-4 bg-dark-700 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-light-700">Storage</p>
                    <p className="text-xl font-semibold mt-1">82%</p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-warning-500"></div>
                </div>
              </div>
              <div className="p-4 bg-dark-700 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-light-700">Network</p>
                    <p className="text-xl font-semibold mt-1">92%</p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-error-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Recent Alerts</h2>
            <button className="text-primary-400 hover:text-primary-300 text-sm">View All</button>
          </div>
          <div className="space-y-4">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="p-4 bg-dark-700 rounded-lg">
                <div className="flex items-start">
                  <div className={`p-2 rounded-full ${
                    alert.type === 'error' 
                      ? 'bg-error-500/20' 
                      : alert.type === 'warning'
                        ? 'bg-warning-500/20'
                        : 'bg-success-500/20'
                  } mr-3`}>
                    <AlertTriangle className={`w-5 h-5 ${
                      alert.type === 'error' 
                        ? 'text-error-500' 
                        : alert.type === 'warning'
                          ? 'text-warning-500'
                          : 'text-success-500'
                    }`} />
                  </div>
                  <div>
                    <p className="text-sm mb-1">{alert.message}</p>
                    <p className="text-xs text-light-900">{alert.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 bg-dark-700 rounded-lg hover:bg-dark-600 transition-colors flex items-center">
            <Settings className="w-5 h-5 mr-3 text-primary-400" />
            <span>System Settings</span>
          </button>
          <button className="p-4 bg-dark-700 rounded-lg hover:bg-dark-600 transition-colors flex items-center">
            <Users className="w-5 h-5 mr-3 text-secondary-400" />
            <span>User Management</span>
          </button>
          <button className="p-4 bg-dark-700 rounded-lg hover:bg-dark-600 transition-colors flex items-center">
            <Database className="w-5 h-5 mr-3 text-accent-400" />
            <span>Backup Database</span>
          </button>
          <button className="p-4 bg-dark-700 rounded-lg hover:bg-dark-600 transition-colors flex items-center">
            <AlertTriangle className="w-5 h-5 mr-3 text-warning-500" />
            <span>View Alerts</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;