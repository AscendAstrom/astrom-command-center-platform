
import { supabase } from '@/integrations/supabase/client';
import { DataSource, SyncStatus } from '../components/astro-scan/types';

export const generateMockDataSources = (): DataSource[] => {
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

export const transformDatabaseDataSource = (dbSource: any): DataSource => {
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

export const fetchDataSourcesFromDB = async () => {
  const { data, error } = await supabase
    .from('data_sources')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data ? data.map(transformDatabaseDataSource) : [];
};

export const updateDataSourceStatusInDB = async (id: string, status: SyncStatus) => {
  // Skip database update for mock data
  if (id.startsWith('mock-')) {
    return;
  }

  const { error } = await supabase
    .from('data_sources')
    .update({ status })
    .eq('id', id);

  if (error) {
    throw error;
  }
};

export const deleteDataSourceFromDB = async (id: string) => {
  // Skip deletion for mock data
  if (id.startsWith('mock-')) {
    return;
  }

  const { error } = await supabase
    .from('data_sources')
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  }
};
