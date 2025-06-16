
import { DataPipeline } from '../types';
import { Database } from '@/integrations/supabase/types';

type DataPipelineDAO = Database['public']['Tables']['data_pipelines']['Row'];
type DataPipelineUpdate = Database['public']['Tables']['data_pipelines']['Update'];

export const fromDataPipelineDAO = (dao: DataPipelineDAO): DataPipeline => ({
  ...dao,
  id: dao.id,
  description: dao.description || '',
  steps: (dao.transformation_rules as any)?.steps || [],
});

export const toDataPipelineDAOforUpdate = (pipeline: DataPipeline): DataPipelineUpdate => ({
  name: pipeline.name,
  description: pipeline.description,
  transformation_rules: { steps: pipeline.steps } as any,
  status: pipeline.status,
  schedule_cron: pipeline.schedule_cron,
  target_schema: pipeline.target_schema,
  version: pipeline.version,
});
