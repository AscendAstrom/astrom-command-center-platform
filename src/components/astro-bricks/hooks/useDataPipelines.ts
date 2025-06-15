
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { DataPipeline } from '../types';
import { Database } from '@/integrations/supabase/types';

type DataPipelineDAO = Database['public']['Tables']['data_pipelines']['Row'];
type DataPipelineInsert = Database['public']['Tables']['data_pipelines']['Insert'];
type DataPipelineUpdate = Database['public']['Tables']['data_pipelines']['Update'];

const fromDataPipelineDAO = (dao: DataPipelineDAO): DataPipeline => ({
  ...dao,
  id: dao.id,
  description: dao.description || '',
  steps: (dao.transformation_rules as any)?.steps || [],
  createdAt: dao.created_at,
  updatedAt: dao.updated_at,
  createdBy: dao.created_by || 'system',
});

const toDataPipelineDAOforUpdate = (pipeline: DataPipeline): DataPipelineUpdate => ({
    name: pipeline.name,
    description: pipeline.description,
    transformation_rules: { steps: pipeline.steps } as any,
    status: pipeline.status,
    schedule_cron: pipeline.schedule_cron,
    target_schema: pipeline.target_schema,
});

export const useDataPipelines = () => {
  const queryClient = useQueryClient();

  const { data: pipelines = [], isLoading, error } = useQuery<DataPipeline[]>({
    queryKey: ['data_pipelines'],
    queryFn: async () => {
      const { data, error } = await supabase.from('data_pipelines').select('*');
      if (error) throw error;
      return data.map(fromDataPipelineDAO);
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
        created_by: newPipeline.createdBy,
        schedule_cron: newPipeline.schedule_cron
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
