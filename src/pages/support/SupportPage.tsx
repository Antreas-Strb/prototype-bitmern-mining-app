import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Plus, 
  Search, 
  Filter, 
  ChevronDown, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  ExternalLink,
  ChevronRight,
  HelpCircle,
  X
} from 'lucide-react';
import TicketDetails from './TicketDetails';
import { supabase } from '../../lib/supabase';

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
  status: 'open' | 'in-progress' | 'resolved';
  priority: 'high' | 'medium' | 'low';
  category: string;
  createdAt: string;
  lastUpdate: string;
  messages: Message[];
}

const SupportPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initial fetch of tickets
    fetchTickets();

    // Set up real-time subscription
    const subscription = supabase
      .channel('tickets')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tickets'
        },
        (payload) => {
          handleTicketChange(payload);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchTickets = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .order('createdAt', { ascending: false });

      if (error) throw error;

      setTickets(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTicketChange = (payload: any) => {
    const { eventType, new: newTicket, old: oldTicket } = payload;

    switch (eventType) {
      case 'INSERT':
        setTickets(prev => [newTicket, ...prev]);
        break;
      case 'UPDATE':
        setTickets(prev => 
          prev.map(ticket => 
            ticket.id === newTicket.id ? newTicket : ticket
          )
        );
        if (selectedTicket?.id === newTicket.id) {
          setSelectedTicket(newTicket);
        }
        break;
      case 'DELETE':
        setTickets(prev => 
          prev.filter(ticket => ticket.id !== oldTicket.id)
        );
        if (selectedTicket?.id === oldTicket.id) {
          setSelectedTicket(null);
        }
        break;
    }
  };

  const handleUpdateTicket = async (updatedTicket: Ticket) => {
    try {
      const { error } = await supabase
        .from('tickets')
        .update(updatedTicket)
        .eq('id', updatedTicket.id);

      if (error) throw error;

      // The update will be handled by the real-time subscription
    } catch (err) {
      setError(err.message);
    }
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-error-500/10 border border-error-500/30 rounded-lg">
        <div className="flex items-center">
          <AlertCircle className="w-6 h-6 text-error-500 mr-3" />
          <h2 className="text-lg font-semibold text-error-500">Error Loading Tickets</h2>
        </div>
        <p className="mt-2 text-light-700">{error}</p>
        <button 
          onClick={fetchTickets}
          className="mt-4 btn btn-error"
        >
          Retry
        </button>
      </div>
    );
  }

  const filteredTickets = tickets.filter(ticket => {
    if (selectedStatus !== 'all' && ticket.status !== selectedStatus) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        ticket.id.toLowerCase().includes(query) ||
        ticket.subject.toLowerCase().includes(query) ||
        ticket.description.toLowerCase().includes(query)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {selectedTicket ? (
        <TicketDetails 
          ticket={selectedTicket} 
          onClose={() => setSelectedTicket(null)} 
          onUpdate={handleUpdateTicket}
        />
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Support Center</h1>
            <button className="btn btn-primary flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              Create New Ticket
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card flex items-center">
              <div className="p-3 bg-warning-500/20 rounded-lg mr-4">
                <AlertCircle className="w-6 h-6 text-warning-500" />
              </div>
              <div>
                <p className="text-sm text-light-700">Open Tickets</p>
                <p className="text-2xl font-bold">
                  {tickets.filter(t => t.status === 'open').length}
                </p>
              </div>
            </div>

            <div className="card flex items-center">
              <div className="p-3 bg-primary-500/20 rounded-lg mr-4">
                <Clock className="w-6 h-6 text-primary-500" />
              </div>
              <div>
                <p className="text-sm text-light-700">In Progress</p>
                <p className="text-2xl font-bold">
                  {tickets.filter(t => t.status === 'in-progress').length}
                </p>
              </div>
            </div>

            <div className="card flex items-center">
              <div className="p-3 bg-success-500/20 rounded-lg mr-4">
                <CheckCircle className="w-6 h-6 text-success-500" />
              </div>
              <div>
                <p className="text-sm text-light-700">Resolved</p>
                <p className="text-2xl font-bold">
                  {tickets.filter(t => t.status === 'resolved').length}
                </p>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-900 w-5 h-5" />
              <input
                type="text"
                placeholder="Search tickets..."
                className="input pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <button className="btn btn-outline flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Filters
                <ChevronDown className="w-4 h-4 ml-2" />
              </button>
              <select 
                className="input min-w-[150px]"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>

          {/* Tickets Table */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Support Tickets</h2>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-light-700">
                  Showing {filteredTickets.length} tickets
                </span>
              </div>
            </div>

            {filteredTickets.length === 0 ? (
              <div className="text-center py-12">
                <HelpCircle className="w-12 h-12 text-light-700 mx-auto mb-4" />
                <p className="text-lg font-medium">No tickets found</p>
                <p className="text-light-700 mt-1">
                  {searchQuery ? 'Try adjusting your search or filters' : 'Create a new ticket to get started'}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-dark-700">
                      <th className="text-left py-3 text-light-700 font-medium">Ticket ID</th>
                      <th className="text-left py-3 text-light-700 font-medium">Subject</th>
                      <th className="text-left py-3 text-light-700 font-medium">Status</th>
                      <th className="text-left py-3 text-light-700 font-medium">Priority</th>
                      <th className="text-left py-3 text-light-700 font-medium">Category</th>
                      <th className="text-left py-3 text-light-700 font-medium">Last Update</th>
                      <th className="text-left py-3 text-light-700 font-medium">Messages</th>
                      <th className="text-left py-3 text-light-700 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTickets.map((ticket) => (
                      <tr key={ticket.id} className="border-b border-dark-700 hover:bg-dark-700/50">
                        <td className="py-4">
                          <div className="flex items-center">
                            <MessageSquare className="w-5 h-5 mr-2 text-light-700" />
                            {ticket.id}
                          </div>
                        </td>
                        <td className="py-4">
                          <div>
                            <p className="font-medium">{ticket.subject}</p>
                            <p className="text-sm text-light-700">{ticket.description}</p>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(ticket.status)}`}>
                            {ticket.status.split('-').map(word => 
                              word.charAt(0).toUpperCase() + word.slice(1)
                            ).join(' ')}
                          </span>
                        </td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(ticket.priority)}`}>
                            {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                          </span>
                        </td>
                        <td className="py-4">{ticket.category}</td>
                        <td className="py-4">
                          <div>
                            <p className="text-sm">{new Date(ticket.lastUpdate).toLocaleDateString()}</p>
                            <p className="text-xs text-light-700">{new Date(ticket.lastUpdate).toLocaleTimeString()}</p>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className="px-2 py-1 bg-dark-700 rounded-full text-xs">
                            {Array.isArray(ticket.messages) ? `${ticket.messages.length} messages` : '0 messages'}
                          </span>
                        </td>
                        <td className="py-4">
                          <button 
                            onClick={() => setSelectedTicket(ticket)}
                            className="btn btn-outline btn-sm"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SupportPage;