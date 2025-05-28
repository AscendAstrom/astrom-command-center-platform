
export interface SourceField {
  id: string;
  name: string;
  type: 'string' | 'number' | 'date' | 'boolean';
  description?: string;
  sample?: string;
}

export interface TargetField {
  id: string;
  name: string;
  type: 'string' | 'number' | 'date' | 'boolean';
  required: boolean;
  description?: string;
}

export interface FieldMapping {
  id: string;
  sourceFieldId: string;
  targetFieldId: string;
  transformationRule?: string;
}

export interface DataMapping {
  id: string;
  name: string;
  sourceFields: SourceField[];
  targetFields: TargetField[];
  mappings: FieldMapping[];
  createdAt: string;
  updatedAt: string;
}

export interface TransformationRule {
  id: string;
  name: string;
  description: string;
  ruleType: 'sql' | 'visual';
  sqlQuery?: string;
  visualSteps?: TransformationStep[];
  createdAt: string;
  updatedAt: string;
}

export interface TransformationStep {
  id: string;
  type: 'filter' | 'map' | 'aggregate' | 'join' | 'clean';
  config: Record<string, any>;
  order: number;
}

export interface SchemaTable {
  id: string;
  name: string;
  type: 'fact' | 'dimension';
  fields: SchemaField[];
  position: { x: number; y: number };
}

export interface SchemaField {
  id: string;
  name: string;
  type: string;
  isPrimaryKey: boolean;
  isForeignKey: boolean;
  isRequired: boolean;
  description?: string;
}

export interface SchemaRelationship {
  id: string;
  fromTableId: string;
  toTableId: string;
  fromFieldId: string;
  toFieldId: string;
  type: 'one-to-one' | 'one-to-many' | 'many-to-one' | 'many-to-many';
}

export interface DataPipeline {
  id: string;
  name: string;
  description: string;
  version: number;
  status: 'draft' | 'active' | 'deprecated';
  steps: PipelineStep[];
  schedule?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface PipelineStep {
  id: string;
  type: 'extract' | 'transform' | 'load';
  name: string;
  config: Record<string, any>;
  order: number;
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

export type UserRole = 'DATA_ENGINEER' | 'ANALYST' | 'ADMIN';
