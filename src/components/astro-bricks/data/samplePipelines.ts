
import { DataPipeline } from '../types';

export const samplePipelines: DataPipeline[] = [
  {
    id: '1',
    name: 'Epic EHR Data Integration',
    description: 'Real-time patient data synchronization from Epic EHR system with FHIR R4 compliance',
    status: 'active',
    version: 3,
    schedule_cron: '*/15 * * * *',
    steps: [
      { id: '1', type: 'extract', name: 'Extract Patient Data', params: {}, order: 1, config: { source: 'Epic EHR API' } },
      { id: '2', type: 'transform', name: 'FHIR Transformation', params: {}, order: 2, config: { format: 'FHIR R4' } },
      { id: '3', type: 'validate', name: 'Data Validation', params: {}, order: 3, config: { rules: ['required_fields', 'data_types'] } },
      { id: '4', type: 'load', name: 'Load to Data Lake', params: {}, order: 4, config: { destination: 'Clinical Data Lake' } }
    ],
    source_id: 'epic-source-1',
    target_schema: { format: 'FHIR', version: 'R4' },
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
      { id: '1', type: 'extract', name: 'Lab System Extract', params: {}, order: 1, config: { source: 'LIS API' } },
      { id: '2', type: 'transform', name: 'Normalize Lab Values', params: {}, order: 2, config: { units: 'standard' } },
      { id: '3', type: 'enrich', name: 'Reference Range Mapping', params: {}, order: 3, config: { ranges: 'clinical_standards' } },
      { id: '4', type: 'quality', name: 'Quality Scoring', params: {}, order: 4, config: { threshold: 0.95 } },
      { id: '5', type: 'load', name: 'Clinical Data Store', params: {}, order: 5, config: { destination: 'analytics_db' } }
    ],
    source_id: 'lab-source-1',
    target_schema: { format: 'normalized', version: '1.0' },
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
      { id: '1', type: 'extract', name: 'Billing Data Extract', params: {}, order: 1, config: { source: 'Financial System' } },
      { id: '2', type: 'aggregate', name: 'Revenue Calculations', params: {}, order: 2, config: { period: 'daily' } },
      { id: '3', type: 'transform', name: 'KPI Generation', params: {}, order: 3, config: { metrics: 'financial_kpis' } },
      { id: '4', type: 'load', name: 'Executive Dashboard', params: {}, order: 4, config: { destination: 'reporting_db' } }
    ],
    source_id: 'billing-source-1',
    target_schema: { format: 'financial_metrics', version: '2.0' },
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
      { id: '1', type: 'extract', name: 'Bed Status Extract', params: {}, order: 1, config: { source: 'Hospital Management System' } },
      { id: '2', type: 'transform', name: 'Status Normalization', params: {}, order: 2, config: { mapping: 'bed_status_codes' } },
      { id: '3', type: 'predict', name: 'Occupancy Forecasting', params: {}, order: 3, config: { model: 'bed_demand_ml' } },
      { id: '4', type: 'alert', name: 'Capacity Alerts', params: {}, order: 4, config: { threshold: 0.9 } },
      { id: '5', type: 'load', name: 'Operations Dashboard', params: {}, order: 5, config: { destination: 'real_time_db' } }
    ],
    source_id: 'bed-management-1',
    target_schema: { format: 'operational', version: '1.5' },
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
      { id: '1', type: 'extract', name: 'Medication Data', params: {}, order: 1, config: { source: 'Pharmacy System' } },
      { id: '2', type: 'validate', name: 'Drug Interaction Check', params: {}, order: 2, config: { database: 'drug_interactions' } },
      { id: '3', type: 'monitor', name: 'Adverse Event Detection', params: {}, order: 3, config: { ml_model: 'adr_detection' } },
      { id: '4', type: 'alert', name: 'Safety Alerts', params: {}, order: 4, config: { priority: 'high' } }
    ],
    source_id: 'pharmacy-source-1',
    target_schema: { format: 'safety_monitoring', version: '1.0' },
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
      { id: '1', type: 'extract', name: 'Patient Movement Data', params: {}, order: 1, config: { source: 'RTLS System' } },
      { id: '2', type: 'track', name: 'Journey Mapping', params: {}, order: 2, config: { algorithm: 'path_analysis' } },
      { id: '3', type: 'analyze', name: 'Bottleneck Detection', params: {}, order: 3, config: { threshold: 'statistical' } },
      { id: '4', type: 'report', name: 'Flow Optimization', params: {}, order: 4, config: { recommendations: 'ai_generated' } }
    ],
    source_id: 'rtls-source-1',
    target_schema: { format: 'flow_analytics', version: '1.0' },
    created_by: 'analytics_team',
    created_at: '2024-01-05T09:00:00Z',
    updated_at: '2024-05-30T13:45:00Z'
  }
];
