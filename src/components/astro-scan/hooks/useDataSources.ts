
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

  useEffect(() => {
    setDataSources(realtimeData);
  }, [realtimeData]);

  const updateDataSourceStatus = async (id: string, status: any) => {
    try {
      const { error } = await dataSourceService.update(id, { status });
      if (error) throw error;
    } catch (err) {
      console.error('Error updating data source status:', err);
    }
  };

  const deleteDataSource = async (id: string) => {
    try {
      const { error } = await dataSourceService.delete(id);
      if (error) throw error;
    } catch (err) {
      console.error('Error deleting data source:', err);
    }
  };

  const testConnection = async (id: string) => {
    try {
      const { error } = await dataSourceService.testConnection(id);
      if (error) throw error;
    } catch (err) {
      console.error('Error testing connection:', err);
    }
  };

  const refetch = async () => {
    try {
      const { data, error } = await dataSourceService.getAll();
      if (error) throw error;
      setDataSources(data || []);
    } catch (err) {
      console.error('Error refetching data sources:', err);
    }
  };

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
