
import { useState, useEffect } from 'react';
import { dataSourceService } from '@/services/dataSourceService';
import { useRealTimeData } from '@/hooks/useRealTimeData';
import type { Tables } from '@/integrations/supabase/types';

type DataSource = Tables<'data_sources'>;

export const useDataSources = () => {
  const { data: realtimeData, loading, error } = useRealTimeData<DataSource>({
    table: 'data_sources'
  });

  const [dataSources, setDataSources] = useState<DataSource[]>([]);

  // Ensure data persistence and proper updates
  useEffect(() => {
    if (realtimeData && Array.isArray(realtimeData)) {
      console.log('Real-time data sources updated:', realtimeData.length);
      setDataSources(realtimeData);
    }
  }, [realtimeData]);

  // Initial data fetch if real-time data is empty
  useEffect(() => {
    const fetchInitialData = async () => {
      if (!loading && (!realtimeData || realtimeData.length === 0)) {
        try {
          console.log('Fetching initial data sources...');
          const { data, error } = await dataSourceService.getAll();
          if (error) {
            console.error('Error fetching initial data sources:', error);
          } else if (data) {
            console.log('Initial data sources loaded:', data.length);
            setDataSources(data);
          }
        } catch (err) {
          console.error('Error in initial data fetch:', err);
        }
      }
    };

    fetchInitialData();
  }, [loading, realtimeData]);

  const updateDataSourceStatus = async (id: string, status: any) => {
    try {
      console.log('Updating data source status:', id, status);
      const { error } = await dataSourceService.update(id, { status });
      if (error) throw error;
    } catch (err) {
      console.error('Error updating data source status:', err);
    }
  };

  const deleteDataSource = async (id: string) => {
    try {
      console.log('Deleting data source:', id);
      const { error } = await dataSourceService.delete(id);
      if (error) throw error;
    } catch (err) {
      console.error('Error deleting data source:', err);
    }
  };

  const testConnection = async (id: string) => {
    try {
      console.log('Testing connection for data source:', id);
      const { error } = await dataSourceService.testConnection(id);
      if (error) throw error;
    } catch (err) {
      console.error('Error testing connection:', err);
    }
  };

  const refetch = async () => {
    try {
      console.log('Manually refetching data sources...');
      const { data, error } = await dataSourceService.getAll();
      if (error) throw error;
      if (data) {
        console.log('Manual refetch completed:', data.length);
        setDataSources(data || []);
      }
    } catch (err) {
      console.error('Error refetching data sources:', err);
    }
  };

  console.log('useDataSources - Current state:', {
    dataSourcesCount: dataSources.length,
    loading,
    error: error?.message
  });

  return {
    dataSources,
    loading,
    error,
    refetch,
    updateDataSourceStatus,
    deleteDataSource,
    testConnection
  };
};
