import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, ChevronRight, ArrowLeft } from 'lucide-react';

const ShippingPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/marketplace/purchase/payment');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-light-700 hover:text-light-500"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-primary-500"></div>
          <div className="w-3 h-3 rounded-full bg-dark-700"></div>
          <div className="w-3 h-3 rounded-full bg-dark-700"></div>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center mb-6">
          <div className="p-3 bg-primary-500/20 rounded-lg mr-4">
            <Truck className="w-6 h-6 text-primary-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Shipping Information</h1>
            <p className="text-light-700">Enter your shipping details</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-light-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="input"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-light-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="input"
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-light-700 mb-1">
              Street Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="input"
              placeholder="123 Main St"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-light-700 mb-1">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="input"
                placeholder="City"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-light-700 mb-1">
                State/Province
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="input"
                placeholder="State"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-light-700 mb-1">
                ZIP/Postal Code
              </label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                required
                className="input"
                placeholder="ZIP Code"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-light-700 mb-1">
              Country
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="input"
              placeholder="Country"
            />
          </div>

          <div className="pt-6 border-t border-dark-700">
            <button 
              type="submit"
              className="btn btn-primary w-full flex items-center justify-center"
            >
              Continue to Payment
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShippingPage;