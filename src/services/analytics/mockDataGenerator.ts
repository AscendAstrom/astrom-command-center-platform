
import { AnalyticsData } from './types';

export class MockDataGenerator {
  generateBaseData(): Partial<AnalyticsData> {
    return {
      chartData: {
        patientFlow: [],
        bedOccupancy: [],
        waitTimes: [],
        staffing: [],
        alerts: [],
        departments: []
      }
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
