
import { definitions } from '@/integrations/supabase/types';

export interface SchemaTable {
  id: string;
  name: string;
  position: { x: number; y: number };
  columns: { name: string; type: string; is_pk?: boolean }[];
}

export interface SchemaRelationship {
  source: string;
  target: string;
}

export interface PipelineStep {
  name: string;
  type: string;
  params: Record<string, any>;
}

export type DataPipeline = Omit<definitions['data_pipelines'], 'transformation_rules' | 'id'> & {
  id: string;
  steps: PipelineStep[];
};
