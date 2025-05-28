
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { DataSource } from '../types';
import { mockEpicDataSources } from '@/data/mockEpicDataSources';

export const useDataSources = () => {
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDataSources = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('data_sources')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      // If no real data sources exist, use mock Epic data sources
      if (!data || data.length === 0) {
        setDataSources(mockEpicDataSources);
      } else {
        // Transform the data to match our DataSource interface
        const transformedData: DataSource[] = data.map((source: any) => ({
          id: source.id,
          name: source.name,
          type: source.type,
          status: source.status || 'CONNECTED',
          ingestion_mode: source.ingestion_mode,
          records_count: source.records_count || 0,
          last_sync: source.last_sync,
          health_score: source.health_score || 85,
          last_error: source.last_error
        }));
        setDataSources(transformedData);
      }
    } catch (err) {
      console.error('Error fetching data sources:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      // Fallback to mock data on error
      setDataSources(mockEpicDataSources);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDataSources();
  }, []);

  const refetch = () => {
    fetchDataSources();
  };

  return {
    dataSources,
    isLoading,
    error,
    refetch
  };
};
