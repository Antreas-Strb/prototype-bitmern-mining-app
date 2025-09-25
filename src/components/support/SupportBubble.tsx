'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MessageSquare, X, HelpCircle, MessageCircle, Phone, Mail } from 'lucide-react';
import LiveChat from './LiveChat';

const SupportBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleBubble = () => {
    if (isChatOpen) {
      setIsChatOpen(false);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const openChat = () => {
    setIsOpen(false);
    setIsChatOpen(true);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Live Chat */}
      {isChatOpen && (
        <div className="absolute bottom-16 right-0 mb-4">
          <LiveChat onClose={() => setIsChatOpen(false)} />
        </div>
      )}

      {/* Support Options */}
      {isOpen && !isChatOpen && (
        <div className="absolute bottom-16 right-0 w-72 bg-dark-800 border border-dark-700 rounded-lg shadow-xl p-4 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Need Help?</h3>
            <button 
              onClick={toggleBubble}
              className="text-light-700 hover:text-light-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-2">
            <Link
              href="/support"
              className="flex items-center p-3 rounded-lg hover:bg-dark-700 transition-colors"
            >
              <div className="p-2 bg-primary-500/20 rounded-lg mr-3">
                <MessageSquare className="w-5 h-5 text-primary-400" />
              </div>
              <div>
                <p className="font-medium">Support Tickets</p>
                <p className="text-sm text-light-700">Create or view tickets</p>
              </div>
            </Link>
            
            <button
              onClick={openChat}
              className="w-full flex items-center p-3 rounded-lg hover:bg-dark-700 transition-colors"
            >
              <div className="p-2 bg-secondary-500/20 rounded-lg mr-3">
                <MessageCircle className="w-5 h-5 text-secondary-400" />
              </div>
              <div className="text-left">
                <p className="font-medium">Live Chat</p>
                <p className="text-sm text-light-700">Chat with support</p>
              </div>
            </button>
            
            <a
              href="tel:+1234567890"
              className="flex items-center p-3 rounded-lg hover:bg-dark-700 transition-colors"
            >
              <div className="p-2 bg-accent-500/20 rounded-lg mr-3">
                <Phone className="w-5 h-5 text-accent-400" />
              </div>
              <div>
                <p className="font-medium">Call Us</p>
                <p className="text-sm text-light-700">24/7 phone support</p>
              </div>
            </a>
            
            <a
              href="mailto:support@example.com"
              className="flex items-center p-3 rounded-lg hover:bg-dark-700 transition-colors"
            >
              <div className="p-2 bg-warning-500/20 rounded-lg mr-3">
                <Mail className="w-5 h-5 text-warning-500" />
              </div>
              <div>
                <p className="font-medium">Email Support</p>
                <p className="text-sm text-light-700">Get email assistance</p>
              </div>
            </a>
          </div>
        </div>
      )}

      {/* Main Bubble Button */}
      <button
        onClick={toggleBubble}
        className={`p-4 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 ${
          isOpen || isChatOpen
            ? 'bg-dark-700 text-light-500' 
            : 'bg-primary-500 text-white hover:bg-primary-600'
        }`}
      >
        {isOpen || isChatOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <HelpCircle className="w-6 h-6" />
        )}
      </button>
    </div>
  );
};

export default SupportBubble;