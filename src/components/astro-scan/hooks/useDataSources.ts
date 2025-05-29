
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { DataSource, SyncStatus } from '../types';
import { mockEpicDataSources } from '@/data/mockEpicDataSources';
import { useAuth } from '@/contexts/AuthContext';

export const useDataSources = () => {
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchDataSources = async () => {
    if (!user) {
      setDataSources([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
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
      setLoading(false);
    }
  };

  const updateDataSourceStatus = async (id: string, status: SyncStatus) => {
    if (!user) return;

    try {
      // Update local state immediately for better UX
      setDataSources(prev => 
        prev.map(source => 
          source.id === id ? { ...source, status } : source
        )
      );

      // Update in database (if using real data)
      const { error: updateError } = await supabase
        .from('data_sources')
        .update({ status })
        .eq('id', id);

      if (updateError) {
        console.error('Error updating data source status:', updateError);
        // Revert local state on error
        fetchDataSources();
      }
    } catch (err) {
      console.error('Error updating data source status:', err);
      // Revert local state on error
      fetchDataSources();
    }
  };

  const deleteDataSource = async (id: string) => {
    if (!user) return;

    try {
      // Update local state immediately for better UX
      setDataSources(prev => prev.filter(source => source.id !== id));

      // Delete from database (if using real data)
      const { error: deleteError } = await supabase
        .from('data_sources')
        .delete()
        .eq('id', id);

      if (deleteError) {
        console.error('Error deleting data source:', deleteError);
        // Revert local state on error
        fetchDataSources();
      }
    } catch (err) {
      console.error('Error deleting data source:', err);
      // Revert local state on error
      fetchDataSources();
    }
  };

  useEffect(() => {
    fetchDataSources();
  }, [user]);

  const refetch = () => {
    fetchDataSources();
  };

  return {
    dataSources,
    loading,
    error,
    refetch,
    updateDataSourceStatus,
    deleteDataSource
  };
};
