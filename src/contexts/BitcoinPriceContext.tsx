'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface BitcoinPriceContextType {
  price: number | null;
  priceChange: number | null;
  isLoading: boolean;
  error: string | null;
  refreshPrice: () => Promise<void>;
}

const BitcoinPriceContext = createContext<BitcoinPriceContextType | undefined>(undefined);

export const useBitcoinPrice = () => {
  const context = useContext(BitcoinPriceContext);
  if (!context) {
    throw new Error('useBitcoinPrice must be used within a BitcoinPriceProvider');
  }
  return context;
};

export const BitcoinPriceProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [price, setPrice] = useState<number | null>(null);
  const [priceChange, setPriceChange] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrice = async () => {
    try {
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true'
      );
      setPrice(response.data.bitcoin.usd);
      setPriceChange(response.data.bitcoin.usd_24h_change);
      setError(null);
    } catch (err) {
      setError('Failed to fetch Bitcoin price');
      console.error('Error fetching Bitcoin price:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrice();
    const interval = setInterval(fetchPrice, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const refreshPrice = async () => {
    setIsLoading(true);
    await fetchPrice();
  };

  return (
    <BitcoinPriceContext.Provider value={{
      price,
      priceChange,
      isLoading,
      error,
      refreshPrice
    }}>
      {children}
    </BitcoinPriceContext.Provider>
  );
};