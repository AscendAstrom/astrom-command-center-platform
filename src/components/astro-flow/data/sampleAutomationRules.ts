
import { AutomationRule } from '../types';

export const sampleAutomationRules: AutomationRule[] = [
  {
    id: '1',
    name: 'Emergency Department Surge Alert',
    description: 'Automatically alert staff when ED patient count exceeds capacity thresholds',
    triggerType: 'threshold_exceeded',
    conditions: [
      {
        id: '1',
        field: 'ed_patient_count',
        operator: 'greaterThan',
        value: 45
      }
    ],
    actions: [
      {
        id: '1',
        type: 'email_alert',
        config: {
          recipients: ['ed-manager@hospital.sa', 'charge-nurse@hospital.sa'],
          subject: 'ED Surge Alert - Immediate Action Required',
          template: 'surge_alert'
        }
      },
      {
        id: '2',
        type: 'slack_notification',
        config: {
          channel: '#emergency-alerts',
          message: 'ED patient count has exceeded capacity threshold. Current count: {{patient_count}}'
        }
      }
    ],
    isActive: true,
    priority: 'critical',
    executionCount: 12,
    createdBy: 'admin',
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-06-15T10:30:00Z',
    last_executed: '2024-06-16T08:45:00Z',
    conditionLogic: 'AND'
  },
  {
    id: '2',
    name: 'Bed Assignment Optimization',
    description: 'Automatically assign beds based on patient acuity and unit specialization',
    triggerType: 'threshold_exceeded',
    conditions: [
      {
        id: '2',
        field: 'new_admission',
        operator: 'equals',
        value: true
      }
    ],
    actions: [
      {
        id: '3',
        type: 'api_call',
        config: {
          endpoint: '/api/beds/assign',
          method: 'POST',
          payload: {
            patient_id: '{{patient_id}}',
            acuity_level: '{{acuity}}',
            preferred_unit: '{{unit_preference}}'
          }
        }
      },
      {
        id: '4',
        type: 'email_alert',
        config: {
          recipients: ['bed-management@hospital.sa'],
          subject: 'New Bed Assignment - {{patient_name}}',
          template: 'bed_assignment'
        }
      }
    ],
    isActive: true,
    priority: 'high',
    executionCount: 89,
    createdBy: 'bed-manager',
    created_at: '2024-02-01T00:00:00Z',
    updated_at: '2024-06-14T15:20:00Z',
    last_executed: '2024-06-16T09:15:00Z',
    conditionLogic: 'AND'
  },
  {
    id: '3',
    name: 'Medication Safety Check',
    description: 'Verify medication interactions and allergies before administration',
    triggerType: 'data_anomaly',
    conditions: [
      {
        id: '3',
        field: 'medication_order_pending',
        operator: 'equals',
        value: true
      }
    ],
    actions: [
      {
        id: '5',
        type: 'api_call',
        config: {
          endpoint: '/api/medications/safety-check',
          method: 'POST',
          payload: {
            patient_id: '{{patient_id}}',
            medication_list: '{{medications}}',
            allergy_list: '{{allergies}}'
          }
        }
      },
      {
        id: '6',
        type: 'slack_notification',
        config: {
          channel: '#pharmacy-alerts',
          message: 'Safety check completed for patient {{patient_name}}. Status: {{safety_status}}'
        }
      }
    ],
    isActive: true,
    priority: 'high',
    executionCount: 156,
    createdBy: 'pharmacy-director',
    created_at: '2024-03-01T00:00:00Z',
    updated_at: '2024-06-13T11:45:00Z',
    last_executed: '2024-06-16T09:30:00Z',
    conditionLogic: 'AND'
  },
  {
    id: '4',
    name: 'Lab Result Critical Value Alert',
    description: 'Immediately notify physicians of critical lab results requiring urgent attention',
    triggerType: 'threshold_exceeded',
    conditions: [
      {
        id: '4',
        field: 'lab_result_critical',
        operator: 'equals',
        value: true
      }
    ],
    actions: [
      {
        id: '7',
        type: 'sms_alert',
        config: {
          recipients: ['{{attending_physician_phone}}', '{{resident_phone}}'],
          message: 'CRITICAL LAB RESULT: {{test_name}} = {{result_value}} for patient {{patient_name}}. Normal range: {{normal_range}}'
        }
      },
      {
        id: '8',
        type: 'email_alert',
        config: {
          recipients: ['{{attending_physician_email}}'],
          subject: 'URGENT: Critical Lab Result - {{patient_name}}',
          template: 'critical_lab_result'
        }
      }
    ],
    isActive: true,
    priority: 'critical',
    executionCount: 23,
    createdBy: 'lab-director',
    created_at: '2024-03-15T00:00:00Z',
    updated_at: '2024-06-12T14:20:00Z',
    last_executed: '2024-06-16T07:22:00Z',
    conditionLogic: 'AND'
  },
  {
    id: '5',
    name: 'Discharge Planning Workflow',
    description: 'Coordinate discharge planning activities and follow-up appointments',
    triggerType: 'time_based',
    conditions: [
      {
        id: '5',
        field: 'discharge_planned_within',
        operator: 'lessThan',
        value: 24
      }
    ],
    actions: [
      {
        id: '9',
        type: 'api_call',
        config: {
          endpoint: '/api/discharge/prepare',
          method: 'POST',
          payload: {
            patient_id: '{{patient_id}}',
            discharge_date: '{{planned_discharge_date}}',
            follow_up_required: '{{follow_up_needed}}'
          }
        }
      },
      {
        id: '10',
        type: 'webhook',
        config: {
          url: 'https://appointment-system.hospital.sa/api/schedule',
          method: 'POST',
          headers: {
            'Authorization': 'Bearer {{api_token}}',
            'Content-Type': 'application/json'
          },
          payload: {
            patient_id: '{{patient_id}}',
            appointment_type: 'follow_up',
            preferred_date: '{{follow_up_date}}'
          }
        }
      }
    ],
    isActive: true,
    priority: 'medium',
    executionCount: 67,
    createdBy: 'case-manager',
    created_at: '2024-04-01T00:00:00Z',
    updated_at: '2024-06-11T16:30:00Z',
    last_executed: '2024-06-16T06:00:00Z',
    conditionLogic: 'AND'
  },
  {
    id: '6',
    name: 'Equipment Maintenance Scheduler',
    description: 'Schedule preventive maintenance based on equipment usage and manufacturer recommendations',
    triggerType: 'time_based',
    conditions: [
      {
        id: '6',
        field: 'equipment_usage_hours',
        operator: 'greaterThan',
        value: 1000
      }
    ],
    actions: [
      {
        id: '11',
        type: 'api_call',
        config: {
          endpoint: '/api/maintenance/schedule',
          method: 'POST',
          payload: {
            equipment_id: '{{equipment_id}}',
            maintenance_type: 'preventive',
            priority: '{{maintenance_priority}}'
          }
        }
      },
      {
        id: '12',
        type: 'email_alert',
        config: {
          recipients: ['maintenance@hospital.sa', 'biomedical@hospital.sa'],
          subject: 'Preventive Maintenance Required - {{equipment_name}}',
          template: 'maintenance_schedule'
        }
      }
    ],
    isActive: false,
    priority: 'low',
    executionCount: 34,
    createdBy: 'biomedical-engineer',
    created_at: '2024-05-01T00:00:00Z',
    updated_at: '2024-06-10T13:15:00Z',
    last_executed: '2024-06-15T22:00:00Z',
    conditionLogic: 'OR'
  }
];
