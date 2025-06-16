
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
        status: 'ACTIVE',
        health_score: 96,
        records_count: 2450000,
        last_sync: new Date(Date.now() - 300000).toISOString(),
        created_at: new Date('2024-01-15').toISOString(),
        description: 'Ministry of Health FHIR R4 compliant data gateway',
        tags: ['production', 'moh', 'fhir', 'critical']
      },
      {
        id: '2',
        name: 'Riyadh General Hospital EHR',
        type: 'EPIC',
        status: 'ACTIVE',
        health_score: 94,
        records_count: 850000,
        last_sync: new Date(Date.now() - 600000).toISOString(),
        created_at: new Date('2024-02-01').toISOString(),
        description: 'Primary EHR system for Riyadh General Hospital',
        tags: ['production', 'ehr', 'riyadh']
      },
      {
        id: '3',
        name: 'King Fahd Hospital Labs',
        type: 'HL7',
        status: 'ACTIVE',
        health_score: 98,
        records_count: 1250000,
        last_sync: new Date(Date.now() - 180000).toISOString(),
        created_at: new Date('2024-01-20').toISOString(),
        description: 'Laboratory Information System - HL7 v2.5',
        tags: ['production', 'labs', 'hl7', 'real-time']
      },
      {
        id: '4',
        name: 'PACS Imaging Network',
        type: 'API',
        status: 'WARNING',
        health_score: 87,
        records_count: 450000,
        last_sync: new Date(Date.now() - 3600000).toISOString(),
        created_at: new Date('2024-02-10').toISOString(),
        description: 'Radiology PACS system integration',
        tags: ['production', 'imaging', 'pacs']
      },
      {
        id: '5',
        name: 'MOH Financial Data Export',
        type: 'CSV',
        status: 'ACTIVE',
        health_score: 92,
        records_count: 125000,
        last_sync: new Date(Date.now() - 86400000).toISOString(),
        created_at: new Date('2024-03-01').toISOString(),
        description: 'Daily financial data exports from MOH systems',
        tags: ['batch', 'financial', 'daily', 'moh']
      },
      {
        id: '6',
        name: 'Pharmacy Management System',
        type: 'API',
        status: 'ACTIVE',
        health_score: 91,
        records_count: 680000,
        last_sync: new Date(Date.now() - 900000).toISOString(),
        created_at: new Date('2024-01-25').toISOString(),
        description: 'Medication dispensing and inventory data',
        tags: ['production', 'pharmacy', 'medications']
      },
      {
        id: '7',
        name: 'Emergency Services Network',
        type: 'HL7',
        status: 'ACTIVE',
        health_score: 95,
        records_count: 320000,
        last_sync: new Date(Date.now() - 240000).toISOString(),
        created_at: new Date('2024-02-15').toISOString(),
        description: 'Emergency department real-time data feed',
        tags: ['production', 'emergency', 'real-time']
      },
      {
        id: '8',
        name: 'Insurance Claims Portal',
        type: 'API',
        status: 'PAUSED',
        health_score: 75,
        records_count: 95000,
        last_sync: new Date(Date.now() - 7200000).toISOString(),
        created_at: new Date('2024-03-05').toISOString(),
        description: 'Insurance claims processing integration',
        tags: ['insurance', 'claims', 'batch']
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
