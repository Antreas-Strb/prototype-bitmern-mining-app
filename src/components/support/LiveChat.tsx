import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Image as ImageIcon, Smile, X } from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '../../contexts/AuthContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
}

const LiveChat: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! How can I help you today?",
      sender: 'agent',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simulate agent response after a delay
    setTimeout(() => {
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thank you for your message. An agent will respond shortly.",
        sender: 'agent',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, agentMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[500px] w-[350px] bg-dark-800 rounded-lg shadow-xl border border-dark-700">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-dark-700">
        <div>
          <h3 className="font-semibold">Live Support</h3>
          <p className="text-sm text-light-700">We typically reply in a few minutes</p>
        </div>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-dark-700 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === 'user'
                  ? 'bg-primary-500 text-white'
                  : 'bg-dark-700'
              }`}
            >
              <p>{message.text}</p>
              <p className="text-xs mt-1 opacity-70">
                {format(message.timestamp, 'HH:mm')}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-dark-700">
        <div className="flex items-end space-x-2">
          <div className="flex-1 bg-dark-700 rounded-lg">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="w-full bg-transparent p-3 focus:outline-none resize-none"
              rows={2}
            />
            <div className="flex items-center px-3 pb-2">
              <button className="p-1 hover:bg-dark-600 rounded-lg transition-colors">
                <Paperclip className="w-5 h-5 text-light-700" />
              </button>
              <button className="p-1 hover:bg-dark-600 rounded-lg transition-colors ml-1">
                <ImageIcon className="w-5 h-5 text-light-700" />
              </button>
              <button className="p-1 hover:bg-dark-600 rounded-lg transition-colors ml-1">
                <Smile className="w-5 h-5 text-light-700" />
              </button>
            </div>
          </div>
          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className="p-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveChat;