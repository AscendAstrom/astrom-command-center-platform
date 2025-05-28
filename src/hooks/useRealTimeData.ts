
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

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
        let query = supabase.from(table as any).select('*');
        
        if (filter) {
          query = query.eq(filter.column, filter.value);
        }
        
        const { data: result, error: fetchError } = await query;
        
        if (fetchError) throw fetchError;
        setData(result as T[] || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Set up real-time subscription
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
      supabase.removeChannel(channel);
    };
  }, [table, filter?.column, filter?.value, enabled]);

  return { data, loading, error };
}
