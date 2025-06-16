
import { AnalyticsData } from './types';
import { mockDataGenerator } from './mockDataGenerator';

export class DataFetchingService {
  async fetchAnalyticsData(): Promise<AnalyticsData> {
    console.log('Generating comprehensive mock analytics data...');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return mockDataGenerator.generateMockAnalyticsData();
  }

  async fetchDataSources() {
    console.log('Generating mock data sources...');
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockDataGenerator.generateMockDataSources();
  }

  async fetchMLModels() {
    console.log('Generating mock ML models...');
    await new Promise(resolve => setTimeout(resolve, 150));
    return mockDataGenerator.generateMockMLModels();
  }

  async fetchAlerts() {
    console.log('Generating mock alerts...');
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockDataGenerator.generateMockAlerts();
  }
}

export const dataFetchingService = new DataFetchingService();
