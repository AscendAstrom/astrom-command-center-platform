
import { AutomationRule } from '../types';

export const sampleAutomationRules: AutomationRule[] = [
  {
    id: '1',
    name: 'Emergency Department Surge Alert',
    description: 'Automatically alert staff when ED patient count exceeds capacity thresholds',
    status: 'ACTIVE',
    trigger_conditions: {
      type: 'metric_threshold',
      metric: 'ed_patient_count',
      operator: 'greater_than',
      value: 45,
      time_window: '15_minutes'
    },
    actions: [
      {
        type: 'notification',
        recipients: ['ed_manager', 'charge_nurse'],
        channels: ['sms', 'email'],
        message: 'Emergency Department surge detected. Patient count: {{patient_count}}'
      },
      {
        type: 'workflow_trigger',
        workflow_id: 'surge_response_protocol',
        parameters: { severity: 'high' }
      }
    ],
    execution_count: 23,
    last_executed: '2024-06-15T14:30:00Z',
    created_by: 'system_admin',
    created_at: '2024-01-15T08:00:00Z',
    updated_at: '2024-06-15T14:30:00Z'
  },
  {
    id: '2',
    name: 'Bed Assignment Optimization',
    description: 'Automatically assign beds based on patient acuity and departmental capacity',
    status: 'ACTIVE',
    trigger_conditions: {
      type: 'event',
      event_type: 'patient_admission',
      filters: {
        department: 'emergency',
        acuity_level: ['high', 'critical']
      }
    },
    actions: [
      {
        type: 'bed_assignment',
        algorithm: 'acuity_based',
        preferences: ['closest_to_nurses_station', 'monitoring_capable']
      },
      {
        type: 'staff_notification',
        role: 'attending_physician',
        message: 'High acuity patient assigned to bed {{bed_number}}'
      }
    ],
    execution_count: 145,
    last_executed: '2024-06-16T11:45:00Z',
    created_by: 'bed_manager',
    created_at: '2024-02-01T10:00:00Z',
    updated_at: '2024-06-16T11:45:00Z'
  },
  {
    id: '3',
    name: 'Medication Safety Check',
    description: 'Automatically check for drug interactions and allergies during medication orders',
    status: 'ACTIVE',
    trigger_conditions: {
      type: 'event',
      event_type: 'medication_order',
      filters: {}
    },
    actions: [
      {
        type: 'safety_check',
        checks: ['drug_interactions', 'allergies', 'contraindications'],
        block_on_failure: true
      },
      {
        type: 'alert_generation',
        severity: 'critical',
        condition: 'safety_check_failed'
      }
    ],
    execution_count: 892,
    last_executed: '2024-06-16T13:20:00Z',
    created_by: 'pharmacy_director',
    created_at: '2024-01-20T14:00:00Z',
    updated_at: '2024-06-16T13:20:00Z'
  },
  {
    id: '4',
    name: 'Lab Result Critical Value Alert',
    description: 'Immediately notify physicians of critical lab values requiring urgent attention',
    status: 'ACTIVE',
    trigger_conditions: {
      type: 'data_condition',
      source: 'lab_results',
      condition: 'critical_value_detected'
    },
    actions: [
      {
        type: 'urgent_notification',
        recipients: ['attending_physician', 'resident_on_call'],
        channels: ['pager', 'phone_call'],
        escalation_time: '5_minutes'
      },
      {
        type: 'documentation',
        template: 'critical_value_notification',
        auto_populate: true
      }
    ],
    execution_count: 67,
    last_executed: '2024-06-16T09:15:00Z',
    created_by: 'lab_director',
    created_at: '2024-03-10T12:00:00Z',
    updated_at: '2024-06-16T09:15:00Z'
  },
  {
    id: '5',
    name: 'Discharge Planning Optimization',
    description: 'Automatically initiate discharge planning based on length of stay and clinical indicators',
    status: 'DRAFT',
    trigger_conditions: {
      type: 'combined',
      conditions: [
        {
          type: 'metric_threshold',
          metric: 'length_of_stay',
          operator: 'greater_than',
          value: 48,
          unit: 'hours'
        },
        {
          type: 'clinical_indicator',
          indicator: 'stable_vitals',
          duration: '24_hours'
        }
      ]
    },
    actions: [
      {
        type: 'workflow_trigger',
        workflow_id: 'discharge_planning_protocol',
        assign_to: 'case_manager'
      },
      {
        type: 'task_creation',
        task_type: 'discharge_assessment',
        due_date: '+4_hours'
      }
    ],
    execution_count: 0,
    last_executed: null,
    created_by: 'case_manager',
    created_at: '2024-06-10T16:30:00Z',
    updated_at: '2024-06-15T14:00:00Z'
  },
  {
    id: '6',
    name: 'Equipment Maintenance Scheduler',
    description: 'Automatically schedule preventive maintenance based on usage hours and manufacturer recommendations',
    status: 'PAUSED',
    trigger_conditions: {
      type: 'scheduled',
      schedule: 'daily',
      time: '02:00',
      conditions: {
        equipment_usage_hours: 'exceeds_maintenance_threshold'
      }
    },
    actions: [
      {
        type: 'maintenance_scheduling',
        priority: 'medium',
        assign_to: 'biomedical_engineering'
      },
      {
        type: 'equipment_status_update',
        status: 'scheduled_maintenance'
      }
    ],
    execution_count: 156,
    last_executed: '2024-06-10T02:00:00Z',
    created_by: 'facilities_manager',
    created_at: '2024-01-05T09:00:00Z',
    updated_at: '2024-06-10T08:30:00Z'
  }
];
