
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
  noBedData: 'Ready for real data! Connect your bed management system or add bed records to see live data here.',
  noChartData: 'No data available yet. Connect your data sources to populate analytics charts.',
  noPatientData: 'No patient records found. Add patients to start tracking admissions and care metrics.',
  noStaffData: 'No staff records available. Add staff members to monitor scheduling and resource allocation.',
  dataCleared: 'Database has been cleared and is ready for your real healthcare data. Start by adding departments, beds, and staff records.',
  readyForRealData: 'Your system is ready! Begin by configuring your data sources and adding real healthcare records.'
};
