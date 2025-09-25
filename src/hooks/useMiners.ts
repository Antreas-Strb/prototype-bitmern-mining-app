import useSWR from 'swr';
import { supabase } from '../lib/supabase';

export interface Miner {
  id: string;
  name: string;
  model: string;
  status: 'online' | 'offline' | 'warning';
  hashrate: string;
  power: string;
  temperature: string;
  pool: string;
  earnings: string;
  last_share: string;
  ip_address: string;
  location: string;
  facility: string;
  config: Record<string, any>;
  created_at: string;
  updated_at: string;
}

const fetcher = async (): Promise<Miner[]> => {
  const { data, error } = await supabase
    .from('miners')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export function useMiners() {
  const { data, error, mutate } = useSWR<Miner[]>('miners', fetcher, {
    refreshInterval: 30000, // Refresh every 30 seconds
    revalidateOnFocus: true,
    dedupingInterval: 5000,
  });

  return {
    miners: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}