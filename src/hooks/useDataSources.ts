
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { DataSource, SyncStatus } from '../components/astro-scan/types';
import { 
  fetchDataSourcesFromDB, 
  updateDataSourceStatusInDB, 
  deleteDataSourceFromDB,
  generateMockDataSources 
} from './dataSourcesService';
import { useDataSourcesRealtimeSubscription } from './useDataSourcesRealtimeSubscription';

export const useDataSources = () => {
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchDataSources = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Always try to fetch real data first
      const realData = await fetchDataSourcesFromDB();
      
      // If we have real data, use it, otherwise supplement with mock data for demo
      if (realData.length > 0) {
        setDataSources(realData);
      } else {
        // Show mock data for demo purposes when no real data exists
        const mockData = generateMockDataSources();
        setDataSources(mockData);
      }

    } catch (err) {
      console.error('Error in fetchDataSources:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      
      // Only show mock data as ultimate fallback for non-authenticated users
      if (!user) {
        const mockData = generateMockDataSources();
        setDataSources(mockData);
      } else {
        setDataSources([]);
      }
    } finally {
      setLoading(false);
    }
  }, [user]);

  const updateDataSourceStatus = async (id: string, status: SyncStatus) => {
    // Optimistically update the UI
    setDataSources(prev => 
      prev.map(source => 
        source.id === id ? { ...source, status } : source
      )
    );

    try {
      await updateDataSourceStatusInDB(id, status);
    } catch (err) {
      console.error('Error updating data source status:', err);
      // Revert optimistic update on error
      fetchDataSources();
    }
  };

  const deleteDataSource = async (id: string) => {
    // Optimistically remove from UI
    setDataSources(prev => prev.filter(source => source.id !== id));

    try {
      await deleteDataSourceFromDB(id);
    } catch (err) {
      console.error('Error deleting data source:', err);
      // Revert optimistic update on error
      fetchDataSources();
    }
  };

  const refetch = useCallback(() => {
    fetchDataSources();
  }, [fetchDataSources]);

  // Set up real-time subscription
  useDataSourcesRealtimeSubscription({ 
    user, 
    onDataChange: fetchDataSources 
  });

  useEffect(() => {
    fetchDataSources();
  }, [fetchDataSources]);

  return {
    dataSources,
    loading,
    error,
    refetch,
    updateDataSourceStatus,
    deleteDataSource
  };
};
