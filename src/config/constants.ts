
export const occupancyThresholds = {
  normal: 75,
  warning: 90,
  critical: 95
};

export const chartConfigurations = {
  defaultColors: {
    primary: '#06b6d4',
    secondary: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6'
  },
  refreshIntervals: {
    realtime: 5000,
    normal: 30000,
    slow: 60000
  }
};

export const emptyStateMessages = {
  noBedData: 'No bed data available. Connect your data sources to see real-time bed management data.',
  noChartData: 'No chart data available. Please check your data connections.',
  noPatientData: 'No patient data found. Ensure your patient management system is connected.',
  noStaffData: 'No staff data available. Please verify your HR system integration.'
};
