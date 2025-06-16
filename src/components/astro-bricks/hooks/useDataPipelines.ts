
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { DataPipeline } from '../types';
import { Database } from '@/integrations/supabase/types';
import { samplePipelines } from '../data/samplePipelines';
import { fromDataPipelineDAO, toDataPipelineDAOforUpdate } from '../utils/pipelineTransformers';

type DataPipelineInsert = Database['public']['Tables']['data_pipelines']['Insert'];

export const useDataPipelines = () => {
  const queryClient = useQueryClient();

  // Use mock data for now, with fallback to database
  const { data: pipelines = [], isLoading, error } = useQuery<DataPipeline[]>({
    queryKey: ['data_pipelines'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase.from('data_pipelines').select('*');
        if (error) {
          console.warn('Database error, using sample data:', error);
          return samplePipelines;
        }
        
        if (!data || data.length === 0) {
          console.log('No database pipelines found, using sample data');
          return samplePipelines;
        }
        
        return data.map(fromDataPipelineDAO);
      } catch (err) {
        console.warn('Error fetching pipelines, using sample data:', err);
        return samplePipelines;
      }
    },
  });

  const createPipelineMutation = useMutation({
    mutationFn: async (newPipeline: Partial<DataPipeline>) => {
      const newPipelineDAO: DataPipelineInsert = {
        name: newPipeline.name!,
        description: newPipeline.description,
        status: newPipeline.status!,
        transformation_rules: { steps: newPipeline.steps || [] } as any,
        target_schema: (newPipeline as any).target_schema || {},
        created_by: (newPipeline as any).created_by,
        schedule_cron: newPipeline.schedule_cron,
        version: 1,
      };
      const { data, error } = await supabase.from('data_pipelines').insert(newPipelineDAO).select().single();
      if (error) throw error;
      return fromDataPipelineDAO(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['data_pipelines'] });
    },
  });

  const updatePipelineMutation = useMutation({
    mutationFn: async (pipeline: DataPipeline) => {
      const dao = toDataPipelineDAOforUpdate(pipeline);
      const { data, error } = await supabase.from('data_pipelines').update(dao).eq('id', pipeline.id).select().single();
      if (error) throw error;
      return fromDataPipelineDAO(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['data_pipelines'] });
    },
  });

  return {
    pipelines,
    isLoading,
    error,
    createPipeline: createPipelineMutation.mutateAsync,
    updatePipeline: updatePipelineMutation.mutateAsync,
  };
};
