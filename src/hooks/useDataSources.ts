
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface DataSource {
  id: string;
  name: string;
  type: 'HL7' | 'FHIR' | 'API' | 'CSV' | 'MANUAL' | 'EPIC';
  description?: string;
  config: Record<string, any>;
  field_mappings: Record<string, any>;
  ingestion_mode: 'BATCH' | 'STREAM';
  schedule_cron?: string;
  status: 'CONNECTED' | 'SYNCING' | 'ERROR' | 'PAUSED';
  last_sync?: string;
  last_error?: string;
  records_count: number;
  health_score: number;
  metadata: Record<string, any>;
  tags?: string[];
  created_by?: string;
  created_at: string;
  updated_at: string;
  last_health_check?: string;
}

export const useDataSources = () => {
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDataSources = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('data_sources')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDataSources(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data sources');
      toast.error('Failed to load data sources');
    } finally {
      setLoading(false);
    }
  };

  const createDataSource = async (dataSource: Omit<DataSource, 'id' | 'created_at' | 'updated_at' | 'created_by'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('data_sources')
        .insert([{
          ...dataSource,
          created_by: user.id
        }])
        .select()
        .single();

      if (error) throw error;
      
      setDataSources(prev => [data, ...prev]);
      toast.success('Data source created successfully');
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create data source';
      setError(message);
      toast.error(message);
      throw err;
    }
  };

  const updateDataSource = async (id: string, updates: Partial<DataSource>) => {
    try {
      const { data, error } = await supabase
        .from('data_sources')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      setDataSources(prev => prev.map(ds => ds.id === id ? data : ds));
      toast.success('Data source updated successfully');
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update data source';
      setError(message);
      toast.error(message);
      throw err;
    }
  };

  const deleteDataSource = async (id: string) => {
    try {
      const { error } = await supabase
        .from('data_sources')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setDataSources(prev => prev.filter(ds => ds.id !== id));
      toast.success('Data source deleted successfully');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete data source';
      setError(message);
      toast.error(message);
      throw err;
    }
  };

  const testConnection = async (id: string) => {
    try {
      // Simulate connection test
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const healthScore = Math.floor(Math.random() * 30) + 70; // 70-100
      const isHealthy = healthScore > 80;
      
      await updateDataSource(id, {
        status: isHealthy ? 'CONNECTED' : 'ERROR',
        health_score: healthScore,
        last_health_check: new Date().toISOString(),
        last_error: isHealthy ? undefined : 'Connection timeout'
      });
      
      toast.success(`Connection test ${isHealthy ? 'passed' : 'failed'}`);
      return isHealthy;
    } catch (err) {
      toast.error('Connection test failed');
      throw err;
    }
  };

  const triggerSync = async (id: string) => {
    try {
      await updateDataSource(id, {
        status: 'SYNCING',
        last_sync: new Date().toISOString()
      });
      
      // Simulate sync process
      setTimeout(async () => {
        const recordsProcessed = Math.floor(Math.random() * 1000) + 100;
        await updateDataSource(id, {
          status: 'CONNECTED',
          records_count: recordsProcessed
        });
        
        // Log the sync
        await supabase.from('ingestion_logs').insert({
          data_source_id: id,
          status: 'SUCCESS',
          message: `Processed ${recordsProcessed} records`,
          records_processed: recordsProcessed,
          completed_at: new Date().toISOString()
        });
        
        toast.success(`Sync completed: ${recordsProcessed} records processed`);
      }, 3000);
      
      toast.info('Sync started...');
    } catch (err) {
      toast.error('Failed to start sync');
      throw err;
    }
  };

  useEffect(() => {
    fetchDataSources();
  }, []);

  return {
    dataSources,
    loading,
    error,
    fetchDataSources,
    createDataSource,
    updateDataSource,
    deleteDataSource,
    testConnection,
    triggerSync
  };
};
