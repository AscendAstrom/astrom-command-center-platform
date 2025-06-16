
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { DataSource, SyncStatus } from '../types';
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

      // Always return empty array - no data sources
      setDataSources([]);
    } catch (err) {
      console.error('Error fetching data sources:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      setDataSources([]);
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

    const channel = supabase
      .channel('public-data_sources-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'data_sources' },
        (payload) => {
          console.log('Data source change detected, refetching...', payload);
          fetchDataSources();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
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
