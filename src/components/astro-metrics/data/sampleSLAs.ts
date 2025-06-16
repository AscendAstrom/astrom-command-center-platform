
export const sampleSLAs = [
  {
    id: '1',
    name: 'Emergency Department Wait Time',
    description: 'Maximum acceptable wait time for emergency department patients',
    target_value: 30,
    measurement_period: 'realtime',
    zone_name: 'Emergency Department',
    metric_type: 'wait_time',
    unit: 'minutes',
    time_window: '15_minutes',
    status: 'active',
    threshold: 30,
    alert_enabled: true,
    escalation_rules: [
      { level: 1, threshold: 25, action: 'notify_charge_nurse' },
      { level: 2, threshold: 35, action: 'notify_department_manager' },
      { level: 3, threshold: 45, action: 'activate_surge_protocol' }
    ],
    current_value: 23,
    compliance_percentage: 87.5,
    trend: 'stable',
    last_breach: '2024-06-14T16:30:00Z'
  },
  {
    id: '2',
    name: 'ICU Bed Availability',
    description: 'Minimum number of available ICU beds to maintain',
    target_value: 10,
    measurement_period: 'continuous',
    zone_name: 'Intensive Care Unit',
    metric_type: 'bed_availability',
    unit: 'beds',
    time_window: 'realtime',
    status: 'active',
    threshold: 10,
    alert_enabled: true,
    escalation_rules: [
      { level: 1, threshold: 8, action: 'notify_icu_manager' },
      { level: 2, threshold: 5, action: 'initiate_discharge_review' },
      { level: 3, threshold: 2, action: 'activate_capacity_protocol' }
    ],
    current_value: 12,
    compliance_percentage: 94.2,
    trend: 'improving',
    last_breach: '2024-06-12T22:15:00Z'
  },
  {
    id: '3',
    name: 'Lab Result Turnaround Time',
    description: 'Maximum time for routine lab results to be reported',
    target_value: 60,
    measurement_period: 'hourly',
    zone_name: 'Clinical Laboratory',
    metric_type: 'turnaround_time',
    unit: 'minutes',
    time_window: '1_hour',
    status: 'active',
    threshold: 60,
    alert_enabled: true,
    escalation_rules: [
      { level: 1, threshold: 75, action: 'notify_lab_supervisor' },
      { level: 2, threshold: 90, action: 'escalate_to_lab_director' }
    ],
    current_value: 45,
    compliance_percentage: 96.8,
    trend: 'stable',
    last_breach: '2024-06-11T14:20:00Z'
  },
  {
    id: '4',
    name: 'Surgery Start Time Punctuality',
    description: 'Percentage of surgeries starting within 15 minutes of scheduled time',
    target_value: 95,
    measurement_period: 'daily',
    zone_name: 'Operating Theaters',
    metric_type: 'punctuality',
    unit: 'percentage',
    time_window: '24_hours',
    status: 'active',
    threshold: 95,
    alert_enabled: true,
    escalation_rules: [
      { level: 1, threshold: 90, action: 'notify_or_coordinator' },
      { level: 2, threshold: 85, action: 'review_scheduling_process' }
    ],
    current_value: 92.3,
    compliance_percentage: 89.1,
    trend: 'declining',
    last_breach: '2024-06-16T08:30:00Z'
  },
  {
    id: '5',
    name: 'Medication Error Rate',
    description: 'Maximum acceptable medication error rate per 1000 doses',
    target_value: 2,
    measurement_period: 'weekly',
    zone_name: 'Hospital-wide',
    metric_type: 'error_rate',
    unit: 'errors_per_1000_doses',
    time_window: '7_days',
    status: 'active',
    threshold: 2,
    alert_enabled: true,
    escalation_rules: [
      { level: 1, threshold: 2.5, action: 'medication_safety_review' },
      { level: 2, threshold: 3, action: 'immediate_intervention' }
    ],
    current_value: 1.2,
    compliance_percentage: 98.7,
    trend: 'improving',
    last_breach: '2024-05-28T10:00:00Z'
  },
  {
    id: '6',
    name: 'Patient Satisfaction Score',
    description: 'Minimum patient satisfaction score (HCAHPS equivalent)',
    target_value: 85,
    measurement_period: 'monthly',
    zone_name: 'Hospital-wide',
    metric_type: 'satisfaction_score',
    unit: 'percentage',
    time_window: '30_days',
    status: 'active',
    threshold: 85,
    alert_enabled: true,
    escalation_rules: [
      { level: 1, threshold: 80, action: 'patient_experience_review' },
      { level: 2, threshold: 75, action: 'quality_improvement_initiative' }
    ],
    current_value: 88.7,
    compliance_percentage: 92.3,
    trend: 'stable',
    last_breach: '2024-04-15T12:00:00Z'
  }
];
