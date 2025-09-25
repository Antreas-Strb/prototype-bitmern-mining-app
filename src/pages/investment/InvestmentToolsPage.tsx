import React, { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Zap, Clock, BarChart3 } from 'lucide-react';

const InvestmentToolsPage = () => {
  const [hashrate, setHashrate] = useState('100');
  const [power, setPower] = useState('3000');
  const [electricityCost, setElectricityCost] = useState('0.10');
  const [bitcoinPrice, setBitcoinPrice] = useState('45000');
  const [difficulty, setDifficulty] = useState('72057594037927940');
  
  // Mock market trends data
  const marketTrends = [
    { name: 'Bitcoin', price: '$45,000', change: '+5.2%', volume: '$28.5B' },
    { name: 'Mining Difficulty', value: '72.06T', change: '+2.8%', period: '24h' },
    { name: 'Network Hashrate', value: '512 EH/s', change: '+1.5%', period: '24h' },
    { name: 'Transaction Fees', value: '0.00012 BTC', change: '+15.3%', period: '24h' },
  ];

  // Calculate mining profitability
  const calculateProfitability = () => {
    const H = parseFloat(hashrate) * 1e12; // TH/s to H/s
    const P = parseFloat(power);
    const C = parseFloat(electricityCost);
    const B = parseFloat(bitcoinPrice);
    const D = parseFloat(difficulty);

    // Daily Bitcoin mined = (hashrate * 86400 * 6.25) / (difficulty * 2^32)
    const dailyBTC = (H * 86400 * 6.25) / (D * Math.pow(2, 32));
    
    // Daily revenue in USD
    const dailyRevenue = dailyBTC * B;
    
    // Daily power cost in USD
    const dailyPowerCost = (P * 24 * C) / 1000;
    
    // Daily profit
    const dailyProfit = dailyRevenue - dailyPowerCost;
    
    return {
      dailyBTC: dailyBTC.toFixed(8),
      dailyRevenue: dailyRevenue.toFixed(2),
      dailyPowerCost: dailyPowerCost.toFixed(2),
      dailyProfit: dailyProfit.toFixed(2),
      monthlyProfit: (dailyProfit * 30).toFixed(2),
      yearlyProfit: (dailyProfit * 365).toFixed(2),
    };
  };

  const profitability = calculateProfitability();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Investment Tools</h1>
        <button className="btn btn-primary">
          Save Calculations
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mining Calculator */}
        <div className="card lg:col-span-2">
          <div className="flex items-center mb-6">
            <Calculator className="w-6 h-6 text-primary-400 mr-2" />
            <h2 className="text-lg font-semibold">Mining Calculator</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-light-700 mb-1">
                  Hashrate (TH/s)
                </label>
                <input
                  type="number"
                  value={hashrate}
                  onChange={(e) => setHashrate(e.target.value)}
                  className="input"
                  placeholder="Enter hashrate"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-light-700 mb-1">
                  Power Consumption (W)
                </label>
                <input
                  type="number"
                  value={power}
                  onChange={(e) => setPower(e.target.value)}
                  className="input"
                  placeholder="Enter power consumption"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-light-700 mb-1">
                  Electricity Cost ($/kWh)
                </label>
                <input
                  type="number"
                  value={electricityCost}
                  onChange={(e) => setElectricityCost(e.target.value)}
                  className="input"
                  placeholder="Enter electricity cost"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-light-700 mb-1">
                  Bitcoin Price (USD)
                </label>
                <input
                  type="number"
                  value={bitcoinPrice}
                  onChange={(e) => setBitcoinPrice(e.target.value)}
                  className="input"
                  placeholder="Enter BTC price"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-light-700 mb-1">
                  Network Difficulty
                </label>
                <input
                  type="number"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="input"
                  placeholder="Enter network difficulty"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-dark-700 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Profitability Analysis</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-light-700">Daily Mining</p>
                <p className="text-lg font-semibold">{profitability.dailyBTC} BTC</p>
                <p className="text-sm text-success-500">+${profitability.dailyRevenue}</p>
              </div>
              <div>
                <p className="text-sm text-light-700">Power Cost</p>
                <p className="text-lg font-semibold">${profitability.dailyPowerCost}</p>
                <p className="text-sm text-error-500">per day</p>
              </div>
              <div>
                <p className="text-sm text-light-700">Daily Profit</p>
                <p className="text-lg font-semibold">${profitability.dailyProfit}</p>
                <p className="text-sm text-success-500">after costs</p>
              </div>
              <div>
                <p className="text-sm text-light-700">Monthly Profit</p>
                <p className="text-lg font-semibold">${profitability.monthlyProfit}</p>
              </div>
              <div>
                <p className="text-sm text-light-700">Yearly Profit</p>
                <p className="text-lg font-semibold">${profitability.yearlyProfit}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Market Trends */}
        <div className="card">
          <div className="flex items-center mb-6">
            <TrendingUp className="w-6 h-6 text-primary-400 mr-2" />
            <h2 className="text-lg font-semibold">Market Trends</h2>
          </div>
          
          <div className="space-y-4">
            {marketTrends.map((trend, index) => (
              <div key={index} className="p-4 bg-dark-700 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-light-700">{trend.name}</p>
                    <p className="text-lg font-semibold mt-1">
                      {trend.value || trend.price}
                    </p>
                  </div>
                  <span className={`text-sm ${
                    trend.change.startsWith('+') ? 'text-success-500' : 'text-error-500'
                  }`}>
                    {trend.change}
                  </span>
                </div>
                {trend.period && (
                  <p className="text-xs text-light-900 mt-1">Last {trend.period}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Investment Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card flex items-start">
          <div className="p-3 bg-primary-500/20 rounded-lg mr-4">
            <DollarSign className="w-6 h-6 text-primary-400" />
          </div>
          <div>
            <p className="text-sm text-light-700">ROI Period</p>
            <p className="text-xl font-semibold mt-1">186 days</p>
            <p className="text-sm text-success-500">Optimal</p>
          </div>
        </div>
        
        <div className="card flex items-start">
          <div className="p-3 bg-secondary-500/20 rounded-lg mr-4">
            <Zap className="w-6 h-6 text-secondary-400" />
          </div>
          <div>
            <p className="text-sm text-light-700">Efficiency</p>
            <p className="text-xl font-semibold mt-1">34 J/TH</p>
            <p className="text-sm text-warning-500">Average</p>
          </div>
        </div>
        
        <div className="card flex items-start">
          <div className="p-3 bg-accent-500/20 rounded-lg mr-4">
            <Clock className="w-6 h-6 text-accent-400" />
          </div>
          <div>
            <p className="text-sm text-light-700">Break-even Time</p>
            <p className="text-xl font-semibold mt-1">8.2 months</p>
            <p className="text-sm text-success-500">Good</p>
          </div>
        </div>
        
        <div className="card flex items-start">
          <div className="p-3 bg-warning-500/20 rounded-lg mr-4">
            <BarChart3 className="w-6 h-6 text-warning-500" />
          </div>
          <div>
            <p className="text-sm text-light-700">Risk Level</p>
            <p className="text-xl font-semibold mt-1">Medium</p>
            <p className="text-sm text-warning-500">Moderate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentToolsPage;