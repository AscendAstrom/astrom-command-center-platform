
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
        id: 'mock-1',
        name: 'Saudi MOH FHIR Gateway (Demo)',
        type: 'FHIR',
        status: 'CONNECTED',
        ingestion_mode: 'REAL_TIME',
        health_score: 96,
        records_count: 2450000,
        last_sync: new Date(Date.now() - 300000).toISOString(),
        last_error: null
      },
      {
        id: 'mock-2',
        name: 'Riyadh General Hospital EHR (Demo)',
        type: 'EPIC',
        status: 'CONNECTED',
        ingestion_mode: 'BATCH',
        health_score: 94,
        records_count: 850000,
        last_sync: new Date(Date.now() - 600000).toISOString(),
        last_error: null
      },
      {
        id: 'mock-3',
        name: 'King Fahd Hospital Labs (Demo)',
        type: 'HL7',
        status: 'CONNECTED',
        ingestion_mode: 'REAL_TIME',
        health_score: 98,
        records_count: 1250000,
        last_sync: new Date(Date.now() - 180000).toISOString(),
        last_error: null
      }
    ];
  };

  const transformDatabaseDataSource = (dbSource: any): DataSource => {
    return {
      id: dbSource.id,
      name: dbSource.name,
      type: dbSource.type,
      status: dbSource.status as SyncStatus,
      ingestion_mode: dbSource.ingestion_mode,
      health_score: dbSource.health_score || 85,
      records_count: dbSource.records_count || 0,
      last_sync: dbSource.last_sync,
      last_error: dbSource.last_error
    };
  };

  const fetchDataSources = async () => {
    try {
      setLoading(true);
      setError(null);

      // Always try to fetch real data first
      const { data: realData, error: fetchError } = await supabase
        .from('data_sources')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) {
        console.error('Error fetching data sources:', fetchError);
        setError(fetchError.message);
        
        // Only fall back to mock data if there's an error and no user is authenticated
        if (!user) {
          const mockData = generateMockDataSources();
          setDataSources(mockData);
        } else {
          setDataSources([]);
        }
        return;
      }

      // Transform real data
      const transformedRealData = realData ? realData.map(transformDatabaseDataSource) : [];
      
      // If we have real data, use it
      if (transformedRealData.length > 0) {
        setDataSources(transformedRealData);
      } else {
        // Only show mock data for demo purposes when no real data exists
        const mockData = generateMockDataSources();
        setDataSources([...transformedRealData, ...mockData]);
      }

    } catch (err) {
      console.error('Error in fetchDataSources:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      
      // Only show mock data as ultimate fallback
      if (!user) {
        const mockData = generateMockDataSources();
        setDataSources(mockData);
      } else {
        setDataSources([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const updateDataSourceStatus = async (id: string, status: SyncStatus) => {
    // Optimistically update the UI
    setDataSources(prev => 
      prev.map(source => 
        source.id === id ? { ...source, status } : source
      )
    );

    // Skip database update for mock data
    if (id.startsWith('mock-')) {
      return;
    }

    if (!user) return;

    try {
      const { error: updateError } = await supabase
        .from('data_sources')
        .update({ status })
        .eq('id', id);

      if (updateError) {
        console.error('Error updating data source status:', updateError);
        // Revert optimistic update on error
        fetchDataSources();
      }
    } catch (err) {
      console.error('Error updating data source status:', err);
      fetchDataSources();
    }
  };

  const deleteDataSource = async (id: string) => {
    // Skip deletion for mock data
    if (id.startsWith('mock-')) {
      return;
    }

    if (!user) return;

    // Optimistically remove from UI
    setDataSources(prev => prev.filter(source => source.id !== id));

    try {
      const { error: deleteError } = await supabase
        .from('data_sources')
        .delete()
        .eq('id', id);

      if (deleteError) {
        console.error('Error deleting data source:', deleteError);
        // Revert optimistic update on error
        fetchDataSources();
      }
    } catch (err) {
      console.error('Error deleting data source:', err);
      fetchDataSources();
    }
  };

  useEffect(() => {
    fetchDataSources();

    // Set up real-time subscription for data_sources table
    const channel = supabase
      .channel('data-sources-realtime')
      .on(
        'postgres_changes',
        { 
          event: '*', 
          schema: 'public', 
          table: 'data_sources' 
        },
        (payload) => {
          console.log('Data source change detected:', payload.eventType, payload);
          // Refetch data when any change occurs
          fetchDataSources();
        }
      )
      .subscribe((status) => {
        console.log('Realtime subscription status:', status);
      });

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
