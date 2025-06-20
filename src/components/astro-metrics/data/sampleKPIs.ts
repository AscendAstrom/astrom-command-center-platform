
export const sampleKPIs = [
  {
    id: '1',
    name: 'Emergency Department Wait Time',
    description: 'Average wait time from arrival to being seen by physician',
    category: 'OPERATIONAL',
    formula: 'AVG(seen_by_provider_time - arrival_time)',
    unit: 'minutes',
    target_value: 30,
    warning_threshold: 35,
    critical_threshold: 45,
    current_value: 23,
    trend: 'stable',
    last_updated: new Date(Date.now() - 300000).toISOString()
  },
  {
    id: '2',
    name: 'Bed Utilization Rate',
    description: 'Percentage of beds occupied at any given time',
    category: 'OPERATIONAL',
    formula: '(occupied_beds / total_beds) * 100',
    unit: 'percentage',
    target_value: 85,
    warning_threshold: 95,
    critical_threshold: 98,
    current_value: 78.2,
    trend: 'improving',
    last_updated: new Date(Date.now() - 180000).toISOString()
  },
  {
    id: '3',
    name: 'Patient Satisfaction Score',
    description: 'Overall patient satisfaction rating from surveys',
    category: 'CLINICAL',
    formula: 'AVG(overall_rating)',
    unit: 'score_1_to_10',
    target_value: 8.5,
    warning_threshold: 7.5,
    critical_threshold: 7.0,
    current_value: 8.7,
    trend: 'stable',
    last_updated: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: '4',
    name: 'Medication Error Rate',
    description: 'Number of medication errors per 1000 doses administered',
    category: 'CLINICAL',
    formula: '(medication_errors / total_doses) * 1000',
    unit: 'errors_per_1000',
    target_value: 2.0,
    warning_threshold: 3.0,
    critical_threshold: 4.0,
    current_value: 1.2,
    trend: 'improving',
    last_updated: new Date(Date.now() - 1800000).toISOString()
  },
  {
    id: '5',
    name: 'Revenue per Patient',
    description: 'Average revenue generated per patient visit',
    category: 'FINANCIAL',
    formula: 'total_revenue / total_patients',
    unit: 'SAR',
    target_value: 3500,
    warning_threshold: 3000,
    critical_threshold: 2500,
    current_value: 3551,
    trend: 'stable',
    last_updated: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: '6',
    name: 'Staff Productivity',
    description: 'Number of patients treated per FTE staff member per day',
    category: 'OPERATIONAL',
    formula: 'patients_treated / fte_staff',
    unit: 'patients_per_fte',
    target_value: 12,
    warning_threshold: 10,
    critical_threshold: 8,
    current_value: 13.2,
    trend: 'improving',
    last_updated: new Date(Date.now() - 7200000).toISOString()
  },
  {
    id: '7',
    name: 'Lab Turnaround Time',
    description: 'Average time from lab order to result availability',
    category: 'CLINICAL',
    formula: 'AVG(result_time - order_time)',
    unit: 'minutes',
    target_value: 60,
    warning_threshold: 90,
    critical_threshold: 120,
    current_value: 45,
    trend: 'stable',
    last_updated: new Date(Date.now() - 900000).toISOString()
  },
  {
    id: '8',
    name: 'Cost per Admission',
    description: 'Total cost divided by number of admissions',
    category: 'FINANCIAL',
    formula: 'total_costs / total_admissions',
    unit: 'SAR',
    target_value: 2500,
    warning_threshold: 3000,
    critical_threshold: 3500,
    current_value: 2529,
    trend: 'stable',
    last_updated: new Date(Date.now() - 10800000).toISOString()
  }
];
