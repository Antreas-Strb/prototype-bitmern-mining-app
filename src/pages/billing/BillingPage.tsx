import React, { useState } from 'react';
import { CreditCard, DollarSign, History, Zap, AlertTriangle, ChevronRight, Plus } from 'lucide-react';

const BillingPage = () => {
  const [balance, setBalance] = useState(25.50);
  const [topUpAmount, setTopUpAmount] = useState('');
  
  // Mock billing history
  const billingHistory = [
    {
      id: 1,
      date: '2024-03-01',
      description: 'March 2024 Electricity Bill',
      consumption: '2,450 kWh',
      amount: 245.00,
      status: 'paid'
    },
    {
      id: 2,
      date: '2024-02-01',
      description: 'February 2024 Electricity Bill',
      consumption: '2,320 kWh',
      amount: 232.00,
      status: 'paid'
    },
    {
      id: 3,
      date: '2024-01-01',
      description: 'January 2024 Electricity Bill',
      consumption: '2,180 kWh',
      amount: 218.00,
      status: 'paid'
    }
  ];

  const handleTopUp = () => {
    const amount = parseFloat(topUpAmount);
    if (!isNaN(amount) && amount > 0) {
      setBalance(prev => prev + amount);
      setTopUpAmount('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Billing & Payments</h1>
        <button className="btn btn-primary flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Add Payment Method
        </button>
      </div>

      {/* Balance Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Current Balance</h2>
            {balance < 50 && (
              <span className="px-2 py-1 bg-warning-500/20 text-warning-500 rounded-full text-sm flex items-center">
                <AlertTriangle className="w-4 h-4 mr-1" />
                Low Balance
              </span>
            )}
          </div>
          <div className="flex items-baseline mb-4">
            <span className="text-3xl font-bold">${balance.toFixed(2)}</span>
            <span className="text-light-700 ml-2">USD</span>
          </div>
          <div className="space-y-3">
            <input
              type="number"
              value={topUpAmount}
              onChange={(e) => setTopUpAmount(e.target.value)}
              className="input w-full"
              placeholder="Enter amount to top up"
              min="0"
              step="0.01"
            />
            <button 
              className="btn btn-primary w-full"
              onClick={handleTopUp}
              disabled={!topUpAmount || parseFloat(topUpAmount) <= 0}
            >
              Top Up Balance
            </button>
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Quick Stats</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-dark-700 rounded-lg">
              <div className="flex items-center">
                <Zap className="w-5 h-5 text-primary-400 mr-2" />
                <span>Current Month Usage</span>
              </div>
              <span className="font-medium">2,450 kWh</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-dark-700 rounded-lg">
              <div className="flex items-center">
                <DollarSign className="w-5 h-5 text-success-500 mr-2" />
                <span>Estimated Bill</span>
              </div>
              <span className="font-medium">$245.00</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Payment Methods</h2>
          <div className="space-y-3">
            <div className="p-3 bg-dark-700 rounded-lg flex items-center justify-between">
              <div className="flex items-center">
                <CreditCard className="w-5 h-5 text-light-700 mr-2" />
                <div>
                  <p className="font-medium">•••• 4242</p>
                  <p className="text-sm text-light-700">Expires 12/25</p>
                </div>
              </div>
              <span className="px-2 py-1 bg-success-500/20 text-success-500 rounded-full text-xs">
                Default
              </span>
            </div>
            <button className="btn btn-outline w-full">
              Manage Payment Methods
            </button>
          </div>
        </div>
      </div>

      {/* Billing History */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <History className="w-6 h-6 text-primary-400 mr-2" />
            <h2 className="text-lg font-semibold">Billing History</h2>
          </div>
          <button className="text-primary-400 hover:text-primary-300 text-sm flex items-center">
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-700">
                <th className="text-left py-3 text-light-700 font-medium">Date</th>
                <th className="text-left py-3 text-light-700 font-medium">Description</th>
                <th className="text-left py-3 text-light-700 font-medium">Consumption</th>
                <th className="text-left py-3 text-light-700 font-medium">Amount</th>
                <th className="text-left py-3 text-light-700 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {billingHistory.map((bill) => (
                <tr key={bill.id} className="border-b border-dark-700 hover:bg-dark-700/50">
                  <td className="py-4">{bill.date}</td>
                  <td className="py-4">{bill.description}</td>
                  <td className="py-4">{bill.consumption}</td>
                  <td className="py-4">${bill.amount.toFixed(2)}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      bill.status === 'paid' 
                        ? 'bg-success-500/20 text-success-500'
                        : 'bg-warning-500/20 text-warning-500'
                    }`}>
                      {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;