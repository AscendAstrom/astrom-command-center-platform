
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface DataPipeline {
  id: string;
  name: string;
  description?: string;
  source_id?: string;
  target_schema: Record<string, any>;
  transformation_rules: Record<string, any>;
  status: string;
  schedule_cron?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
  version: number;
  steps: Array<{
    id: string;
    type: 'extract' | 'transform' | 'load';
    name: string;
    config: Record<string, any>;
    order: number;
  }>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export const useDataPipelines = () => {
  const [pipelines, setPipelines] = useState<DataPipeline[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPipelines = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('data_pipelines')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform database data to match interface
      const transformedData: DataPipeline[] = (data || []).map((item: any) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        source_id: item.source_id,
        target_schema: typeof item.target_schema === 'string' ? JSON.parse(item.target_schema) : (item.target_schema || {}),
        transformation_rules: typeof item.transformation_rules === 'string' ? JSON.parse(item.transformation_rules) : (item.transformation_rules || {}),
        status: item.status,
        schedule_cron: item.schedule_cron,
        created_by: item.created_by,
        created_at: item.created_at,
        updated_at: item.updated_at,
        version: 1, // Default version
        steps: [], // Default empty steps
        createdAt: item.created_at,
        updatedAt: item.updated_at,
        createdBy: item.created_by || 'Unknown'
      }));
      
      setPipelines(transformedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch pipelines');
      toast.error('Failed to load pipelines');
    } finally {
      setLoading(false);
    }
  };

  const createPipeline = async (pipeline: Omit<DataPipeline, 'id' | 'created_at' | 'updated_at' | 'created_by' | 'version' | 'steps' | 'createdAt' | 'updatedAt' | 'createdBy'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('data_pipelines')
        .insert([{
          name: pipeline.name,
          description: pipeline.description,
          source_id: pipeline.source_id,
          target_schema: pipeline.target_schema,
          transformation_rules: pipeline.transformation_rules,
          status: pipeline.status,
          schedule_cron: pipeline.schedule_cron,
          created_by: user.id
        }])
        .select()
        .single();

      if (error) throw error;
      
      // Transform the created item
      const transformedData: DataPipeline = {
        id: data.id,
        name: data.name,
        description: data.description,
        source_id: data.source_id,
        target_schema: typeof data.target_schema === 'string' ? JSON.parse(data.target_schema) : (data.target_schema || {}),
        transformation_rules: typeof data.transformation_rules === 'string' ? JSON.parse(data.transformation_rules) : (data.transformation_rules || {}),
        status: data.status,
        schedule_cron: data.schedule_cron,
        created_by: data.created_by,
        created_at: data.created_at,
        updated_at: data.updated_at,
        version: 1,
        steps: [],
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        createdBy: data.created_by || 'Unknown'
      };
      
      setPipelines(prev => [transformedData, ...prev]);
      toast.success('Pipeline created successfully');
      return transformedData;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create pipeline';
      setError(message);
      toast.error(message);
      throw err;
    }
  };

  const updatePipeline = async (id: string, updates: Partial<DataPipeline>) => {
    try {
      const { data, error } = await supabase
        .from('data_pipelines')
        .update({
          name: updates.name,
          description: updates.description,
          status: updates.status,
          schedule_cron: updates.schedule_cron,
          target_schema: updates.target_schema,
          transformation_rules: updates.transformation_rules
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      // Transform the updated item
      const transformedData: DataPipeline = {
        id: data.id,
        name: data.name,
        description: data.description,
        source_id: data.source_id,
        target_schema: typeof data.target_schema === 'string' ? JSON.parse(data.target_schema) : (data.target_schema || {}),
        transformation_rules: typeof data.transformation_rules === 'string' ? JSON.parse(data.transformation_rules) : (data.transformation_rules || {}),
        status: data.status,
        schedule_cron: data.schedule_cron,
        created_by: data.created_by,
        created_at: data.created_at,
        updated_at: data.updated_at,
        version: 1,
        steps: [],
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        createdBy: data.created_by || 'Unknown'
      };
      
      setPipelines(prev => prev.map(p => p.id === id ? transformedData : p));
      toast.success('Pipeline updated successfully');
      return transformedData;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update pipeline';
      setError(message);
      toast.error(message);
      throw err;
    }
  };

  const deletePipeline = async (id: string) => {
    try {
      const { error } = await supabase
        .from('data_pipelines')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setPipelines(prev => prev.filter(p => p.id !== id));
      toast.success('Pipeline deleted successfully');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete pipeline';
      setError(message);
      toast.error(message);
      throw err;
    }
  };

  const executePipeline = async (id: string) => {
    try {
      await updatePipeline(id, { status: 'RUNNING' });
      
      // Simulate pipeline execution
      setTimeout(async () => {
        await updatePipeline(id, { status: 'ACTIVE' });
        toast.success('Pipeline executed successfully');
      }, 2000);
      
      toast.info('Pipeline execution started...');
    } catch (err) {
      toast.error('Failed to execute pipeline');
      throw err;
    }
  };

  useEffect(() => {
    fetchPipelines();
  }, []);

  return {
    pipelines,
    loading,
    error,
    fetchPipelines,
    createPipeline,
    updatePipeline,
    deletePipeline,
    executePipeline
  };
};
