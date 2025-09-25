import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Package, Truck, Calendar, ArrowRight } from 'lucide-react';

const ConfirmationPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-primary-500"></div>
          <div className="w-3 h-3 rounded-full bg-primary-500"></div>
          <div className="w-3 h-3 rounded-full bg-primary-500"></div>
        </div>
      </div>

      <div className="card text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-success-500/20 rounded-full">
            <CheckCircle className="w-12 h-12 text-success-500" />
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-light-700 mb-8">
          Thank you for your purchase. Your order has been confirmed and will be shipped soon.
        </p>

        <div className="border border-dark-700 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-2 gap-6">
            <div className="text-left">
              <p className="text-sm text-light-700">Order Number</p>
              <p className="font-medium">#ORD-2024-0123</p>
            </div>
            <div className="text-left">
              <p className="text-sm text-light-700">Order Date</p>
              <p className="font-medium">March 15, 2024</p>
            </div>
            <div className="text-left">
              <p className="text-sm text-light-700">Total Amount</p>
              <p className="font-medium">$8,499.99</p>
            </div>
            <div className="text-left">
              <p className="text-sm text-light-700">Payment Method</p>
              <p className="font-medium">Credit Card (...4242)</p>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center p-4 bg-dark-700 rounded-lg">
            <Package className="w-6 h-6 text-primary-400 mr-4" />
            <div className="flex-1 text-left">
              <p className="font-medium">Order Processing</p>
              <p className="text-sm text-light-700">Your order is being processed</p>
            </div>
          </div>
          
          <div className="flex items-center p-4 bg-dark-700 rounded-lg">
            <Truck className="w-6 h-6 text-secondary-400 mr-4" />
            <div className="flex-1 text-left">
              <p className="font-medium">Estimated Delivery</p>
              <p className="text-sm text-light-700">March 20 - March 25, 2024</p>
            </div>
          </div>
          
          <div className="flex items-center p-4 bg-dark-700 rounded-lg">
            <Calendar className="w-6 h-6 text-accent-400 mr-4" />
            <div className="flex-1 text-left">
              <p className="font-medium">Warranty Period</p>
              <p className="text-sm text-light-700">180 days from delivery</p>
            </div>
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => navigate('/miners')}
            className="btn btn-primary flex-1 flex items-center justify-center"
          >
            View My Miners
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
          <button
            onClick={() => navigate('/marketplace')}
            className="btn btn-outline flex-1"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;