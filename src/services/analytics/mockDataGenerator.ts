
import { AnalyticsData } from './types';

export class MockDataGenerator {
  generateBaseData(): Partial<AnalyticsData> {
    return {
      totalPatients: 0,
      availableBeds: 0,
      occupancyRate: 0,
      avgWaitTime: 0,
      staffOnDuty: 0,
      criticalAlerts: 0,
      pendingDischarges: 0,
      emergencyCapacity: 0
    };
  }

  generateChartData(baseData: Partial<AnalyticsData>, chartHistory: any): any {
    return {
      patientFlow: [],
      bedOccupancy: [],
      waitTimes: [],
      staffing: [],
      alerts: [],
      departments: []
    };
  }
}
