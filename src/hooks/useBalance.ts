import useSWR from 'swr';
import { supabase } from '../lib/supabase';

interface Balance {
  amount: number;
  currency: string;
  lastUpdated: string;
}

const fetcher = async (): Promise<Balance> => {
  const { data, error } = await supabase
    .from('balances')
    .select('*')
    .single();

  if (error) throw error;
  return data;
};

export function useBalance() {
  const { data, error, mutate } = useSWR<Balance>('balance', fetcher, {
    refreshInterval: 60000, // Refresh every minute
    revalidateOnFocus: true,
    dedupingInterval: 5000,
  });

  return {
    balance: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}