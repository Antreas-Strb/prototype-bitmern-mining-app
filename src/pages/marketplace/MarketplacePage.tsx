import React, { useState } from 'react';
import { Search, Filter, Grid, List, ChevronDown, Star, DollarSign, Zap } from 'lucide-react';
import Link from 'next/link';

const MarketplacePage = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const miners = [
    {
      id: 1,
      name: 'Antminer S19 XP',
      image: 'https://images.pexels.com/photos/1432697/pexels-photo-1432697.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      price: 8499.99,
      hashrate: '140 TH/s',
      efficiency: '21.5 J/TH',
      rating: 4.8,
      seller: 'MiningDirect',
      condition: 'New'
    },
    {
      id: 2,
      name: 'Whatsminer M50S',
      image: 'https://images.pexels.com/photos/12876612/pexels-photo-12876612.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      price: 7899.99,
      hashrate: '126 TH/s',
      efficiency: '26 J/TH',
      rating: 4.6,
      seller: 'CryptoMining Pro',
      condition: 'New'
    },
    {
      id: 3,
      name: 'Antminer S19j Pro (Refurbished)',
      image: 'https://images.pexels.com/photos/11996726/pexels-photo-11996726.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      price: 4999.99,
      hashrate: '96 TH/s',
      efficiency: '29.5 J/TH',
      rating: 4.3,
      seller: 'RefurbMiners',
      condition: 'Refurbished'
    },
    {
      id: 4,
      name: 'AvalonMiner 1366',
      image: 'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      price: 6799.99,
      hashrate: '88 TH/s',
      efficiency: '38 J/TH',
      rating: 4.4,
      seller: 'MiningWarehouse',
      condition: 'New'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Marketplace</h1>
        <button className="btn btn-primary">
          List Item for Sale
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-900 w-5 h-5" />
          <input
            type="text"
            placeholder="Search miners, parts, or accessories..."
            className="input pl-10 w-full"
          />
        </div>
        <div className="flex gap-2">
          <button className="btn btn-outline flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filters
            <ChevronDown className="w-4 h-4 ml-2" />
          </button>
          <div className="flex rounded-lg overflow-hidden border border-dark-700">
            <button
              className={`p-2 ${viewMode === 'grid' ? 'bg-dark-700 text-light-500' : 'text-light-700 hover:bg-dark-700'}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              className={`p-2 ${viewMode === 'list' ? 'bg-dark-700 text-light-500' : 'text-light-700 hover:bg-dark-700'}`}
              onClick={() => setViewMode('list')}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {['All Items', 'ASIC Miners', 'GPU Miners', 'Parts', 'Accessories', 'Power Supplies'].map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${
              category === 'All Items'
                ? 'bg-primary-600 text-white'
                : 'bg-dark-700 text-light-700 hover:bg-dark-600'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
        {miners.map((miner) => (
          <Link 
            key={miner.id} 
            href={`/marketplace/${miner.id}`}
            className={`card hover:border-primary-500 transition-colors ${
              viewMode === 'list' ? 'flex gap-6' : ''
            }`}
          >
            <div className={viewMode === 'list' ? 'w-48 h-48 flex-shrink-0' : 'aspect-square'}>
              <img
                src={miner.image}
                alt={miner.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="mt-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{miner.name}</h3>
                  <p className="text-light-700 text-sm">{miner.seller}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${
                  miner.condition === 'New' ? 'bg-success-500/20 text-success-500' : 'bg-warning-500/20 text-warning-500'
                }`}>
                  {miner.condition}
                </span>
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-light-700">
                  <Zap className="w-4 h-4 mr-2" />
                  <span>{miner.hashrate}</span>
                </div>
                <div className="flex items-center text-sm text-light-700">
                  <DollarSign className="w-4 h-4 mr-2" />
                  <span>${miner.price.toLocaleString()}</span>
                </div>
                <div className="flex items-center text-sm text-light-700">
                  <Star className="w-4 h-4 mr-2 text-accent-500" />
                  <span>{miner.rating}/5.0</span>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button className="btn btn-primary flex-1">
                  Buy Now
                </button>
                <button className="btn btn-outline">
                  Details
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MarketplacePage;