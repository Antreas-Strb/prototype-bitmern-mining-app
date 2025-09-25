import React from 'react';
import { Bitcoin } from 'lucide-react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-dark-900">
      {/* Left column - Brand/Info */}
      <div className="hidden lg:flex lg:w-1/2 bg-dark-800 flex-col justify-center p-16">
        <div className="max-w-md mx-auto">
          <div className="flex items-center space-x-3 mb-8">
            <Bitcoin className="h-12 w-12 text-accent-500" />
            <h1 className="text-3xl font-bold text-light-500">Bitmern Mining</h1>
          </div>
          <h2 className="text-2xl font-semibold mb-6 text-light-500">
            Professional Bitcoin Mining Management
          </h2>
          <p className="text-light-700 mb-8">
            Monitor your miners, track performance, and maximize your ROI with our comprehensive mining management platform.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-dark-700 p-4 rounded-lg">
              <h3 className="font-medium text-light-600 mb-1">Real-time Monitoring</h3>
              <p className="text-sm text-light-800">Track your miners' performance with live data</p>
            </div>
            <div className="bg-dark-700 p-4 rounded-lg">
              <h3 className="font-medium text-light-600 mb-1">Advanced Analytics</h3>
              <p className="text-sm text-light-800">Make data-driven decisions with our tools</p>
            </div>
            <div className="bg-dark-700 p-4 rounded-lg">
              <h3 className="font-medium text-light-600 mb-1">Hardware Marketplace</h3>
              <p className="text-sm text-light-800">Buy and sell mining equipment easily</p>
            </div>
            <div className="bg-dark-700 p-4 rounded-lg">
              <h3 className="font-medium text-light-600 mb-1">Professional Hosting</h3>
              <p className="text-sm text-light-800">Secure facilities with optimal conditions</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right column - Auth form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Join MiningVerse</h2>
            <p className="text-light-700">Create your account to get started</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;