
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { DataPipeline } from '../types';
import { definitions } from '@/integrations/supabase/types';

type DataPipelineDAO = definitions['data_pipelines'];

const fromDataPipelineDAO = (dao: DataPipelineDAO): DataPipeline => ({
  ...dao,
  id: dao.id,
  description: dao.description || '',
  steps: (dao.transformation_rules as any)?.steps || [],
  createdAt: dao.created_at,
  updatedAt: dao.updated_at,
  createdBy: dao.created_by || 'system',
});

const toDataPipelineDAO = (pipeline: Partial<DataPipeline>): Partial<Omit<DataPipelineDAO, 'id'>> => ({
    name: pipeline.name,
    description: pipeline.description,
    transformation_rules: { steps: pipeline.steps } as any,
    status: pipeline.status,
    schedule_cron: pipeline.schedule_cron,
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
      const dao = toDataPipelineDAO(newPipeline);
      const { data, error } = await supabase.from('data_pipelines').insert(dao).single();
      if (error) throw error;
      return fromDataPipelineDAO(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['data_pipelines'] });
    },
  });

  const updatePipelineMutation = useMutation({
    mutationFn: async (pipeline: DataPipeline) => {
      const dao = toDataPipelineDAO(pipeline);
      const { data, error } = await supabase.from('data_pipelines').update(dao).eq('id', pipeline.id).single();
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
