
export const sampleRuleExecutions = [
  {
    id: '1',
    rule_id: '1',
    rule_name: 'Emergency Department Surge Alert',
    executed_at: new Date(Date.now() - 300000).toISOString(), // 5 minutes ago
    status: 'SUCCESS',
    details: {
      trigger_value: 47,
      threshold: 45,
      actions_taken: ['sms_sent', 'email_sent', 'workflow_triggered'],
      recipients: ['Dr. Ahmed Al-Rashid', 'Nurse Manager Sarah'],
      execution_time_ms: 245
    }
  },
  {
    id: '2',
    rule_id: '2',
    rule_name: 'Bed Assignment Optimization',
    executed_at: new Date(Date.now() - 900000).toISOString(), // 15 minutes ago
    status: 'SUCCESS',
    details: {
      patient_id: 'P-2024-1567',
      assigned_bed: 'ICU-A-12',
      acuity_level: 'high',
      assignment_time_ms: 1200,
      nursing_station_distance: '15m'
    }
  },
  {
    id: '3',
    rule_id: '3',
    rule_name: 'Medication Safety Check',
    executed_at: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
    status: 'WARNING',
    details: {
      medication: 'Warfarin 5mg',
      patient_id: 'P-2024-1523',
      warning_type: 'drug_interaction',
      interacting_medication: 'Aspirin 325mg',
      severity: 'moderate',
      physician_notified: true
    }
  },
  {
    id: '4',
    rule_id: '4',
    rule_name: 'Lab Result Critical Value Alert',
    executed_at: new Date(Date.now() - 2700000).toISOString(), // 45 minutes ago
    status: 'SUCCESS',
    details: {
      test_name: 'Troponin I',
      critical_value: '15.8 ng/mL',
      normal_range: '< 0.04 ng/mL',
      patient_id: 'P-2024-1489',
      physician_contacted: 'Dr. Khalid Bin Salman',
      response_time_seconds: 180
    }
  },
  {
    id: '5',
    rule_id: '1',
    rule_name: 'Emergency Department Surge Alert',
    executed_at: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    status: 'SUCCESS',
    details: {
      trigger_value: 52,
      threshold: 45,
      actions_taken: ['surge_protocol_activated', 'additional_staff_called'],
      escalation_level: 2,
      additional_beds_opened: 6
    }
  },
  {
    id: '6',
    rule_id: '6',
    rule_name: 'Equipment Maintenance Scheduler',
    executed_at: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
    status: 'FAILED',
    details: {
      equipment_id: 'MRI-001',
      maintenance_type: 'preventive',
      failure_reason: 'scheduling_conflict',
      retry_scheduled: true,
      next_attempt: new Date(Date.now() + 86400000).toISOString()
    }
  }
];
