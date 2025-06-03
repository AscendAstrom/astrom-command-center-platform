
import { AnalyticsData } from './types';

export class MockDataGenerator {
  generateBaseData(): Partial<AnalyticsData> {
    return {
      chartData: {
        waitTimes: [],
        patientFlow: [],
        staffAllocation: [],
        bedUtilization: [],
        processingThroughput: [],
        dataQuality: [],
        revenue: [],
        systemHealth: [],
        modelPerformance: []
      }
    };
  }

  generateChartData(baseData: Partial<AnalyticsData>, chartHistory: any): any {
    return {
      waitTimes: [],
      patientFlow: [],
      staffAllocation: [],
      bedUtilization: [],
      processingThroughput: [],
      dataQuality: [],
      revenue: [],
      systemHealth: [],
      modelPerformance: []
    };
  }
}
