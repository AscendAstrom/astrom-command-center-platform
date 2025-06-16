
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
});

const toDataPipelineDAOforUpdate = (pipeline: DataPipeline): DataPipelineUpdate => ({
    name: pipeline.name,
    description: pipeline.description,
    transformation_rules: { steps: pipeline.steps } as any,
    status: pipeline.status,
    schedule_cron: pipeline.schedule_cron,
    target_schema: pipeline.target_schema,
    version: pipeline.version,
});

// Sample pipeline data
const samplePipelines: DataPipeline[] = [
  {
    id: '1',
    name: 'Epic EHR Data Integration',
    description: 'Real-time patient data synchronization from Epic EHR system with FHIR R4 compliance',
    status: 'active',
    version: 3,
    schedule_cron: '*/15 * * * *',
    steps: [
      { id: '1', type: 'extract', name: 'Extract Patient Data', config: { source: 'Epic EHR API' } },
      { id: '2', type: 'transform', name: 'FHIR Transformation', config: { format: 'FHIR R4' } },
      { id: '3', type: 'validate', name: 'Data Validation', config: { rules: ['required_fields', 'data_types'] } },
      { id: '4', type: 'load', name: 'Load to Data Lake', config: { destination: 'Clinical Data Lake' } }
    ],
    source_id: 'epic-source-1',
    target_schema: { format: 'FHIR', version: 'R4' },
    transformation_rules: { mappings: 'epic_to_fhir' },
    created_by: 'system',
    created_at: '2024-01-15T08:00:00Z',
    updated_at: '2024-06-15T14:30:00Z'
  },
  {
    id: '2',
    name: 'Laboratory Results Pipeline',
    description: 'Automated processing of lab results with quality scoring and anomaly detection',
    status: 'active',
    version: 2,
    schedule_cron: '0 */2 * * *',
    steps: [
      { id: '1', type: 'extract', name: 'Lab System Extract', config: { source: 'LIS API' } },
      { id: '2', type: 'transform', name: 'Normalize Lab Values', config: { units: 'standard' } },
      { id: '3', type: 'enrich', name: 'Reference Range Mapping', config: { ranges: 'clinical_standards' } },
      { id: '4', type: 'quality', name: 'Quality Scoring', config: { threshold: 0.95 } },
      { id: '5', type: 'load', name: 'Clinical Data Store', config: { destination: 'analytics_db' } }
    ],
    source_id: 'lab-source-1',
    target_schema: { format: 'normalized', version: '1.0' },
    transformation_rules: { quality_rules: 'lab_standards' },
    created_by: 'system',
    created_at: '2024-02-01T10:00:00Z',
    updated_at: '2024-06-14T16:45:00Z'
  },
  {
    id: '3',
    name: 'Financial Data Aggregation',
    description: 'Daily financial metrics aggregation from billing systems with revenue analytics',
    status: 'active',
    version: 1,
    schedule_cron: '0 6 * * *',
    steps: [
      { id: '1', type: 'extract', name: 'Billing Data Extract', config: { source: 'Financial System' } },
      { id: '2', type: 'aggregate', name: 'Revenue Calculations', config: { period: 'daily' } },
      { id: '3', type: 'transform', name: 'KPI Generation', config: { metrics: 'financial_kpis' } },
      { id: '4', type: 'load', name: 'Executive Dashboard', config: { destination: 'reporting_db' } }
    ],
    source_id: 'billing-source-1',
    target_schema: { format: 'financial_metrics', version: '2.0' },
    transformation_rules: { calculations: 'revenue_analytics' },
    created_by: 'admin',
    created_at: '2024-03-10T12:00:00Z',
    updated_at: '2024-06-16T09:15:00Z'
  },
  {
    id: '4',
    name: 'Bed Management Sync',
    description: 'Real-time bed status synchronization with occupancy forecasting',
    status: 'active',
    version: 4,
    schedule_cron: '*/5 * * * *',
    steps: [
      { id: '1', type: 'extract', name: 'Bed Status Extract', config: { source: 'Hospital Management System' } },
      { id: '2', type: 'transform', name: 'Status Normalization', config: { mapping: 'bed_status_codes' } },
      { id: '3', type: 'predict', name: 'Occupancy Forecasting', config: { model: 'bed_demand_ml' } },
      { id: '4', type: 'alert', name: 'Capacity Alerts', config: { threshold: 0.9 } },
      { id: '5', type: 'load', name: 'Operations Dashboard', config: { destination: 'real_time_db' } }
    ],
    source_id: 'bed-management-1',
    target_schema: { format: 'operational', version: '1.5' },
    transformation_rules: { ml_predictions: 'capacity_model' },
    created_by: 'operations',
    created_at: '2024-01-20T14:00:00Z',
    updated_at: '2024-06-16T11:20:00Z'
  },
  {
    id: '5',
    name: 'Medication Safety Pipeline',
    description: 'Drug interaction checking and adverse event monitoring pipeline',
    status: 'draft',
    version: 1,
    schedule_cron: null,
    steps: [
      { id: '1', type: 'extract', name: 'Medication Data', config: { source: 'Pharmacy System' } },
      { id: '2', type: 'validate', name: 'Drug Interaction Check', config: { database: 'drug_interactions' } },
      { id: '3', type: 'monitor', name: 'Adverse Event Detection', config: { ml_model: 'adr_detection' } },
      { id: '4', type: 'alert', name: 'Safety Alerts', config: { priority: 'high' } }
    ],
    source_id: 'pharmacy-source-1',
    target_schema: { format: 'safety_monitoring', version: '1.0' },
    transformation_rules: { safety_checks: 'comprehensive' },
    created_by: 'clinical_team',
    created_at: '2024-06-10T16:30:00Z',
    updated_at: '2024-06-15T14:00:00Z'
  },
  {
    id: '6',
    name: 'Patient Flow Analytics',
    description: 'Patient journey tracking and bottleneck identification across departments',
    status: 'deprecated',
    version: 2,
    schedule_cron: '0 */4 * * *',
    steps: [
      { id: '1', type: 'extract', name: 'Patient Movement Data', config: { source: 'RTLS System' } },
      { id: '2', type: 'track', name: 'Journey Mapping', config: { algorithm: 'path_analysis' } },
      { id: '3', type: 'analyze', name: 'Bottleneck Detection', config: { threshold: 'statistical' } },
      { id: '4', type: 'report', name: 'Flow Optimization', config: { recommendations: 'ai_generated' } }
    ],
    source_id: 'rtls-source-1',
    target_schema: { format: 'flow_analytics', version: '1.0' },
    transformation_rules: { analytics: 'patient_flow' },
    created_by: 'analytics_team',
    created_at: '2024-01-05T09:00:00Z',
    updated_at: '2024-05-30T13:45:00Z'
  }
];

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
