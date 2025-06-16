
export class PatientMetricsService {
  async fetchPatientMetrics() {
    try {
      // Since patient tables don't exist, return mock data based on existing tables
      console.log('Patient tables not available - returning mock data');
      
      return {
        activePatients: 0,
        edPatients: 0,
        criticalPatients: 0,
        avgWaitTime: 0,
        triageQueue: 0
      };
    } catch (error) {
      console.error('Error fetching patient metrics:', error);
      return {
        activePatients: 0,
        edPatients: 0,
        criticalPatients: 0,
        avgWaitTime: 0,
        triageQueue: 0
      };
    }
  }
}

export const patientMetricsService = new PatientMetricsService();
