
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
      
      // Transform database data to match interface
      const transformedData: DataSource[] = (data || []).map((item: any) => ({
        id: item.id,
        name: item.name,
        type: item.type,
        description: item.description,
        config: typeof item.config === 'string' ? JSON.parse(item.config) : (item.config || {}),
        field_mappings: typeof item.field_mappings === 'string' ? JSON.parse(item.field_mappings) : (item.field_mappings || {}),
        ingestion_mode: item.ingestion_mode || 'BATCH',
        schedule_cron: item.schedule_cron,
        status: item.status || 'PAUSED',
        last_sync: item.last_sync,
        last_error: item.last_error,
        records_count: item.records_count || 0,
        health_score: item.health_score || 100,
        metadata: typeof item.metadata === 'string' ? JSON.parse(item.metadata) : (item.metadata || {}),
        tags: item.tags,
        created_by: item.created_by,
        created_at: item.created_at,
        updated_at: item.updated_at,
        last_health_check: item.last_health_check
      }));
      
      setDataSources(transformedData);
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
          name: dataSource.name,
          type: dataSource.type,
          description: dataSource.description,
          config: dataSource.config,
          field_mappings: dataSource.field_mappings,
          ingestion_mode: dataSource.ingestion_mode,
          schedule_cron: dataSource.schedule_cron,
          status: dataSource.status,
          records_count: dataSource.records_count,
          health_score: dataSource.health_score,
          metadata: dataSource.metadata,
          tags: dataSource.tags,
          created_by: user.id
        }])
        .select()
        .single();

      if (error) throw error;
      
      // Transform the created item
      const transformedData: DataSource = {
        id: data.id,
        name: data.name,
        type: data.type,
        description: data.description,
        config: typeof data.config === 'string' ? JSON.parse(data.config) : (data.config || {}),
        field_mappings: typeof data.field_mappings === 'string' ? JSON.parse(data.field_mappings) : (data.field_mappings || {}),
        ingestion_mode: data.ingestion_mode || 'BATCH',
        schedule_cron: data.schedule_cron,
        status: data.status || 'PAUSED',
        last_sync: data.last_sync,
        last_error: data.last_error,
        records_count: data.records_count || 0,
        health_score: data.health_score || 100,
        metadata: typeof data.metadata === 'string' ? JSON.parse(data.metadata) : (data.metadata || {}),
        tags: data.tags,
        created_by: data.created_by,
        created_at: data.created_at,
        updated_at: data.updated_at,
        last_health_check: data.last_health_check
      };
      
      setDataSources(prev => [transformedData, ...prev]);
      toast.success('Data source created successfully');
      return transformedData;
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
        .update({
          name: updates.name,
          description: updates.description,
          status: updates.status,
          health_score: updates.health_score,
          last_health_check: updates.last_health_check,
          last_error: updates.last_error,
          last_sync: updates.last_sync,
          records_count: updates.records_count
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      // Transform the updated item
      const transformedData: DataSource = {
        id: data.id,
        name: data.name,
        type: data.type,
        description: data.description,
        config: typeof data.config === 'string' ? JSON.parse(data.config) : (data.config || {}),
        field_mappings: typeof data.field_mappings === 'string' ? JSON.parse(data.field_mappings) : (data.field_mappings || {}),
        ingestion_mode: data.ingestion_mode || 'BATCH',
        schedule_cron: data.schedule_cron,
        status: data.status || 'PAUSED',
        last_sync: data.last_sync,
        last_error: data.last_error,
        records_count: data.records_count || 0,
        health_score: data.health_score || 100,
        metadata: typeof data.metadata === 'string' ? JSON.parse(data.metadata) : (data.metadata || {}),
        tags: data.tags,
        created_by: data.created_by,
        created_at: data.created_at,
        updated_at: data.updated_at,
        last_health_check: data.last_health_check
      };
      
      setDataSources(prev => prev.map(ds => ds.id === id ? transformedData : ds));
      toast.success('Data source updated successfully');
      return transformedData;
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
