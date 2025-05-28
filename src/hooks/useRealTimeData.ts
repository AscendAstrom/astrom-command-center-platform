
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface UseRealTimeDataOptions {
  table: string;
  filter?: { column: string; value: any };
  enabled?: boolean;
}

export function useRealTimeData<T extends Record<string, any>>({ table, filter, enabled = true }: UseRealTimeDataOptions) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!enabled) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log(`Fetching data from table: ${table}`);
        
        // Use any to bypass strict typing for dynamic table queries
        let query = (supabase as any).from(table).select('*');
        
        if (filter) {
          query = query.eq(filter.column, filter.value);
        }
        
        const { data: result, error: fetchError } = await query;
        
        if (fetchError) {
          console.error(`Error fetching from ${table}:`, fetchError);
          throw fetchError;
        }
        
        console.log(`Fetched ${result?.length || 0} records from ${table}`);
        setData(result as T[] || []);
      } catch (err) {
        console.error(`Error in useRealTimeData for ${table}:`, err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Set up real-time subscription
    console.log(`Setting up real-time subscription for ${table}`);
    const channel = supabase
      .channel(`${table}_changes`)
      .on('postgres_changes', 
        { event: '*', schema: 'public', table }, 
        (payload) => {
          console.log(`Real-time update for ${table}:`, payload);
          fetchData(); // Refetch data on any change
        }
      )
      .subscribe();

    return () => {
      console.log(`Cleaning up real-time subscription for ${table}`);
      supabase.removeChannel(channel);
    };
  }, [table, filter?.column, filter?.value, enabled]);

  return { data, loading, error };
}
