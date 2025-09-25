import React, { useState } from 'react';
import { ArrowLeft, Send, Paperclip, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

interface Message {
  id: number;
  sender: 'user' | 'agent';
  message: string;
  timestamp: string;
}

interface Ticket {
  id: string;
  subject: string;
  description: string;
  status: string;
  priority: string;
  category: string;
  createdAt: string;
  lastUpdate: string;
  messages: Message[];
}

interface TicketDetailsProps {
  ticket: Ticket;
  onClose: () => void;
  onUpdate: (ticket: Ticket) => void;
}

const TicketDetails: React.FC<TicketDetailsProps> = ({ ticket, onClose, onUpdate }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newMessageObj: Message = {
      id: ticket.messages.length + 1,
      sender: 'user',
      message: newMessage.trim(),
      timestamp: new Date().toISOString()
    };

    const updatedTicket = {
      ...ticket,
      messages: [...ticket.messages, newMessageObj],
      lastUpdate: new Date().toISOString()
    };

    onUpdate(updatedTicket);
    setNewMessage('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-warning-500/20 text-warning-500';
      case 'in-progress':
        return 'bg-primary-500/20 text-primary-500';
      case 'resolved':
        return 'bg-success-500/20 text-success-500';
      default:
        return 'bg-light-700/20 text-light-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-error-500/20 text-error-500';
      case 'medium':
        return 'bg-warning-500/20 text-warning-500';
      case 'low':
        return 'bg-success-500/20 text-success-500';
      default:
        return 'bg-light-700/20 text-light-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <button 
          onClick={onClose}
          className="flex items-center text-light-700 hover:text-light-500"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Tickets
        </button>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(ticket.status)}`}>
            {ticket.status.split('-').map(word => 
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ')}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(ticket.priority)}`}>
            {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)} Priority
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <h2 className="text-xl font-bold mb-2">{ticket.subject}</h2>
            <p className="text-light-700 mb-4">{ticket.description}</p>
            <div className="flex items-center text-sm text-light-700">
              <AlertCircle className="w-4 h-4 mr-1" />
              <span>Created on {format(new Date(ticket.createdAt), 'MMM d, yyyy HH:mm')}</span>
            </div>
          </div>

          <div className="card">
            <div className="space-y-6">
              {ticket.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.sender === 'user'
                        ? 'bg-primary-500/10 text-light-500'
                        : 'bg-dark-700'
                    }`}
                  >
                    <p className="mb-2">{message.message}</p>
                    <p className="text-xs text-light-700">
                      {format(new Date(message.timestamp), 'MMM d, yyyy HH:mm')}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="mt-6 pt-6 border-t border-dark-700">
              <div className="flex space-x-4">
                <div className="flex-1 relative">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="input min-h-[100px] resize-none"
                  />
                  <button 
                    type="button"
                    className="absolute bottom-3 right-3 p-2 hover:bg-dark-600 rounded-lg transition-colors"
                  >
                    <Paperclip className="w-5 h-5 text-light-700" />
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="btn btn-primary self-end flex items-center"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Ticket Info */}
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Ticket Information</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-light-700">Ticket ID</p>
                <p className="font-medium">{ticket.id}</p>
              </div>
              <div>
                <p className="text-sm text-light-700">Category</p>
                <p className="font-medium">{ticket.category}</p>
              </div>
              <div>
                <p className="text-sm text-light-700">Last Updated</p>
                <p className="font-medium">
                  {format(new Date(ticket.lastUpdate), 'MMM d, yyyy HH:mm')}
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Related Articles</h3>
            <div className="space-y-3">
              <a href="#" className="block p-3 rounded-lg hover:bg-dark-700 transition-colors">
                <p className="font-medium">Connecting Your Miner</p>
                <p className="text-sm text-light-700">Step-by-step guide</p>
              </a>
              <a href="#" className="block p-3 rounded-lg hover:bg-dark-700 transition-colors">
                <p className="font-medium">Network Troubleshooting</p>
                <p className="text-sm text-light-700">Common issues and fixes</p>
              </a>
              <a href="#" className="block p-3 rounded-lg hover:bg-dark-700 transition-colors">
                <p className="font-medium">Miner Configuration</p>
                <p className="text-sm text-light-700">Best practices</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;