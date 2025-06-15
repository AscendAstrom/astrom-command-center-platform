import { Database } from '@/integrations/supabase/types';

export type DataPipelineDAO = Database['public']['Tables']['data_pipelines']['Row'];

export interface SchemaField {
  id: string;
  name: string;
  type: string;
  isPrimaryKey?: boolean;
  isForeignKey?: boolean;
  isRequired?: boolean;
}

export interface SchemaTable {
  id: string;
  name: string;
  type: 'fact' | 'dimension';
  position: { x: number; y: number };
  fields: SchemaField[];
}

export interface SchemaRelationship {
  id: string;
  source: string;
  target: string;
  fromTableId: string;
  toTableId: string;
}

export interface PipelineStep {
  id: string;
  name: string;
  type: 'extract' | 'transform' | 'load';
  params: Record<string, any>;
  order: number;
}

export type DataPipeline = Omit<DataPipelineDAO, 'transformation_rules' | 'id'> & {
  id: string;
  steps: PipelineStep[];
};

export interface SourceField {
  id: string;
  name:string;
  type: string;
  description?: string;
  sample?: string;
}

export interface TargetField {
  id: string;
  name: string;
  type: string;
  description?: string;
  required?: boolean;
}

export interface FieldMapping {
  id: string;
  sourceFieldId: string;
  targetFieldId: string;
  transformationRule?: string;
}

export interface TransformationRule {
    id: string;
    name: string;
    description: string;
    ruleType: 'sql' | 'python';
    sqlQuery?: string;
    pythonScript?: string;
    createdAt: string;
    updatedAt: string;
}

export interface TimestampCleaningRule {
    id: string;
    name: string;
    pattern: string;
    replacement: string;
    description: string;
}

export interface DuplicateResolutionRule {
    id: string;
    name: string;
    fields: string[];
    strategy: 'keep_first' | 'keep_last' | 'merge' | 'manual_review';
    description: string;
}

export type UserRole = 'ADMIN' | 'EDITOR' | 'VIEWER' | 'ANALYST';
