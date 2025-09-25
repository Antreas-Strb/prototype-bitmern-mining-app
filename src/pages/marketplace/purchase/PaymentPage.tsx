import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Bitcoin, ChevronRight, ArrowLeft, Shield } from 'lucide-react';

const PaymentPage = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'crypto'>('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
    btcAddress: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/marketplace/purchase/confirmation');
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
          <div className="w-3 h-3 rounded-full bg-primary-500"></div>
          <div className="w-3 h-3 rounded-full bg-dark-700"></div>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center mb-6">
          <div className="p-3 bg-primary-500/20 rounded-lg mr-4">
            <CreditCard className="w-6 h-6 text-primary-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Payment Method</h1>
            <p className="text-light-700">Choose how you'd like to pay</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setPaymentMethod('card')}
              className={`flex-1 p-4 rounded-lg border ${
                paymentMethod === 'card'
                  ? 'border-primary-500 bg-primary-500/5'
                  : 'border-dark-700 hover:border-primary-500'
              }`}
            >
              <CreditCard className="w-6 h-6 mb-2" />
              <p className="font-medium">Credit Card</p>
              <p className="text-sm text-light-700">Visa, Mastercard, Amex</p>
            </button>
            <button
              onClick={() => setPaymentMethod('crypto')}
              className={`flex-1 p-4 rounded-lg border ${
                paymentMethod === 'crypto'
                  ? 'border-primary-500 bg-primary-500/5'
                  : 'border-dark-700 hover:border-primary-500'
              }`}
            >
              <Bitcoin className="w-6 h-6 mb-2" />
              <p className="font-medium">Cryptocurrency</p>
              <p className="text-sm text-light-700">Bitcoin, ETH, USDT</p>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {paymentMethod === 'card' ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-light-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    required
                    className="input"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-light-700 mb-1">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleChange}
                    required
                    className="input"
                    placeholder="John Doe"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-light-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      name="expiry"
                      value={formData.expiry}
                      onChange={handleChange}
                      required
                      className="input"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-light-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      required
                      className="input"
                      placeholder="123"
                    />
                  </div>
                </div>
              </>
            ) : (
              <div>
                <label className="block text-sm font-medium text-light-700 mb-1">
                  Bitcoin Address
                </label>
                <input
                  type="text"
                  name="btcAddress"
                  value={formData.btcAddress}
                  onChange={handleChange}
                  required
                  className="input"
                  placeholder="Enter your BTC address"
                />
                <p className="mt-2 text-sm text-light-700">
                  Please ensure this is a correct Bitcoin address. Transactions cannot be reversed.
                </p>
              </div>
            )}

            <div className="p-4 bg-dark-700 rounded-lg flex items-start">
              <Shield className="w-5 h-5 text-success-500 mr-3 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-light-700">
                Your payment information is encrypted and secure. We never store your full card details.
              </p>
            </div>

            <div className="pt-6 border-t border-dark-700">
              <button 
                type="submit"
                className="btn btn-primary w-full flex items-center justify-center"
              >
                Complete Purchase
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;