
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { DataSource, SyncStatus } from '../components/astro-scan/types';
import { useAuth } from '@/contexts/AuthContext';

export const useDataSources = () => {
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const generateMockDataSources = (): DataSource[] => {
    return [
      {
        id: '1',
        name: 'Saudi MOH FHIR Gateway',
        type: 'FHIR',
        status: 'CONNECTED',
        ingestion_mode: 'REAL_TIME',
        health_score: 96,
        records_count: 2450000,
        last_sync: new Date(Date.now() - 300000).toISOString(),
        last_error: null
      },
      {
        id: '2',
        name: 'Riyadh General Hospital EHR',
        type: 'EPIC',
        status: 'CONNECTED',
        ingestion_mode: 'BATCH',
        health_score: 94,
        records_count: 850000,
        last_sync: new Date(Date.now() - 600000).toISOString(),
        last_error: null
      },
      {
        id: '3',
        name: 'King Fahd Hospital Labs',
        type: 'HL7',
        status: 'CONNECTED',
        ingestion_mode: 'REAL_TIME',
        health_score: 98,
        records_count: 1250000,
        last_sync: new Date(Date.now() - 180000).toISOString(),
        last_error: null
      },
      {
        id: '4',
        name: 'PACS Imaging Network',
        type: 'API',
        status: 'ERROR',
        ingestion_mode: 'BATCH',
        health_score: 87,
        records_count: 450000,
        last_sync: new Date(Date.now() - 3600000).toISOString(),
        last_error: 'Connection timeout after 30 seconds'
      },
      {
        id: '5',
        name: 'MOH Financial Data Export',
        type: 'CSV',
        status: 'CONNECTED',
        ingestion_mode: 'BATCH',
        health_score: 92,
        records_count: 125000,
        last_sync: new Date(Date.now() - 86400000).toISOString(),
        last_error: null
      },
      {
        id: '6',
        name: 'Pharmacy Management System',
        type: 'API',
        status: 'CONNECTED',
        ingestion_mode: 'REAL_TIME',
        health_score: 91,
        records_count: 680000,
        last_sync: new Date(Date.now() - 900000).toISOString(),
        last_error: null
      },
      {
        id: '7',
        name: 'Emergency Services Network',
        type: 'HL7',
        status: 'CONNECTED',
        ingestion_mode: 'REAL_TIME',
        health_score: 95,
        records_count: 320000,
        last_sync: new Date(Date.now() - 240000).toISOString(),
        last_error: null
      },
      {
        id: '8',
        name: 'Insurance Claims Portal',
        type: 'API',
        status: 'PAUSED',
        ingestion_mode: 'BATCH',
        health_score: 75,
        records_count: 95000,
        last_sync: new Date(Date.now() - 7200000).toISOString(),
        last_error: 'Scheduled maintenance mode'
      }
    ];
  };

  const fetchDataSources = async () => {
    try {
      setLoading(true);
      setError(null);

      // Always return mock data for now
      const mockData = generateMockDataSources();
      setDataSources(mockData);
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
      setDataSources(prev => 
        prev.map(source => 
          source.id === id ? { ...source, status } : source
        )
      );

      const { error: updateError } = await supabase
        .from('data_sources')
        .update({ status })
        .eq('id', id);

      if (updateError) {
        console.error('Error updating data source status:', updateError);
        fetchDataSources();
      }
    } catch (err) {
      console.error('Error updating data source status:', err);
      fetchDataSources();
    }
  };

  const deleteDataSource = async (id: string) => {
    if (!user) return;

    try {
      setDataSources(prev => prev.filter(source => source.id !== id));

      const { error: deleteError } = await supabase
        .from('data_sources')
        .delete()
        .eq('id', id);

      if (deleteError) {
        console.error('Error deleting data source:', deleteError);
        fetchDataSources();
      }
    } catch (err) {
      console.error('Error deleting data source:', err);
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
