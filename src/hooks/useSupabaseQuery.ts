
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface UseSupabaseQueryOptions {
  enabled?: boolean;
  refetchOnMount?: boolean;
}

export function useSupabaseQuery<T>(
  queryFn: () => Promise<{ data: T; error: any }>,
  dependencies: any[] = [],
  options: UseSupabaseQueryOptions = {}
) {
  const { enabled = true, refetchOnMount = true } = options;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const executeQuery = async () => {
    if (!enabled) return;
    
    try {
      setLoading(true);
      setError(null);
      const result = await queryFn();
      
      if (result.error) {
        throw result.error;
      }
      
      setData(result.data);
    } catch (err) {
      console.error('Query error:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (refetchOnMount || dependencies.some(dep => dep !== undefined)) {
      executeQuery();
    }
  }, [enabled, refetchOnMount, ...dependencies]);

  const refetch = () => executeQuery();

  return { data, loading, error, refetch };
}

export function useSupabaseMutation<T, P>(
  mutationFn: (params: P) => Promise<{ data: T; error: any }>
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const mutate = async (params: P): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);
      const result = await mutationFn(params);
      
      if (result.error) {
        throw result.error;
      }
      
      return result.data;
    } catch (err) {
      console.error('Mutation error:', err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
}
