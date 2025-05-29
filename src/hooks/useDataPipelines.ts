
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
      setPipelines(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch pipelines');
      toast.error('Failed to load pipelines');
    } finally {
      setLoading(false);
    }
  };

  const createPipeline = async (pipeline: Omit<DataPipeline, 'id' | 'created_at' | 'updated_at' | 'created_by'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('data_pipelines')
        .insert([{
          ...pipeline,
          created_by: user.id
        }])
        .select()
        .single();

      if (error) throw error;
      
      setPipelines(prev => [data, ...prev]);
      toast.success('Pipeline created successfully');
      return data;
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
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      setPipelines(prev => prev.map(p => p.id === id ? data : p));
      toast.success('Pipeline updated successfully');
      return data;
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
