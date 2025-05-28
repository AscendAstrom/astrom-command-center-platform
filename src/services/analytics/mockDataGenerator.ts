
import { AnalyticsData } from './types';

export class MockDataGenerator {
  // Helper function to get equipment status with proper typing
  private getEquipmentStatus(): 'optimal' | 'warning' | 'critical' {
    const rand = Math.random();
    if (rand > 0.9) return 'critical';
    if (rand > 0.8) return 'warning';
    return 'optimal';
  }

  // Helper function to get sync status with proper typing
  private getSyncStatus(): 'healthy' | 'warning' | 'error' {
    const rand = Math.random();
    if (rand > 0.95) return 'error';
    if (rand > 0.9) return 'warning';
    return 'healthy';
  }

  generateBaseData() {
    const now = new Date();
    
    return {
      emergencyDepartment: {
        totalPatients: 142 + Math.floor(Math.random() * 20 - 10),
        avgWaitTime: 23 + Math.floor(Math.random() * 10 - 5),
        bedUtilization: 78 + Math.floor(Math.random() * 10 - 5),
        staffOnDuty: 28 + Math.floor(Math.random() * 4 - 2),
        criticalAlerts: Math.floor(Math.random() * 5),
        lastUpdated: now
      },
      clinicalOperations: {
        activeStaff: 156 + Math.floor(Math.random() * 20 - 10),
        scheduledProcedures: 34 + Math.floor(Math.random() * 8 - 4),
        resourceUtilization: 85 + Math.floor(Math.random() * 10 - 5),
        avgProcedureTime: 45 + Math.floor(Math.random() * 10 - 5),
        equipmentStatus: this.getEquipmentStatus(),
        lastUpdated: now
      },
      dataPipeline: {
        activeSources: 24 + Math.floor(Math.random() * 4 - 2),
        processingSpeed: 1200 + Math.floor(Math.random() * 200 - 100),
        errorRate: Math.max(0, 2.5 + Math.random() * 2 - 1),
        dataQuality: 98.7 + Math.random() * 2 - 1,
        syncStatus: this.getSyncStatus(),
        lastUpdated: now
      },
      business: {
        revenue: 12400 + Math.floor(Math.random() * 1000 - 500),
        revenueGrowth: 8.5 + Math.random() * 4 - 2,
        patientSatisfaction: 4.8 + Math.random() * 0.4 - 0.2,
        operationalEfficiency: 92 + Math.floor(Math.random() * 6 - 3),
        costPerPatient: 284 + Math.floor(Math.random() * 40 - 20),
        lastUpdated: now
      },
      systemHealth: {
        cpuUsage: 45 + Math.floor(Math.random() * 20 - 10),
        memoryUsage: 67 + Math.floor(Math.random() * 15 - 7),
        networkLatency: 15 + Math.floor(Math.random() * 10 - 5),
        uptime: 99.8 + Math.random() * 0.4 - 0.2,
        securityScore: 96 + Math.floor(Math.random() * 6 - 3),
        lastUpdated: now
      },
      aiMetrics: {
        modelAccuracy: 94.2 + Math.random() * 4 - 2,
        automationSuccess: 89 + Math.floor(Math.random() * 8 - 4),
        decisionsSupported: 156 + Math.floor(Math.random() * 30 - 15),
        mlModelsActive: 12 + Math.floor(Math.random() * 4 - 2),
        predictionConfidence: 87 + Math.floor(Math.random() * 10 - 5),
        lastUpdated: now
      }
    };
  }

  generateChartData(baseData: any, chartHistory: any): AnalyticsData['chartData'] {
    return {
      waitTimes: chartHistory.waitTimes || [],
      patientFlow: chartHistory.patientFlow || [],
      staffAllocation: [
        { category: 'Nurses', value: Math.floor(baseData.clinicalOperations.activeStaff * 0.4) },
        { category: 'Doctors', value: Math.floor(baseData.clinicalOperations.activeStaff * 0.3) },
        { category: 'Support', value: Math.floor(baseData.clinicalOperations.activeStaff * 0.2) },
        { category: 'Admin', value: Math.floor(baseData.clinicalOperations.activeStaff * 0.1) }
      ],
      bedUtilization: [
        { name: 'Occupied', value: baseData.emergencyDepartment.bedUtilization },
        { name: 'Available', value: 100 - baseData.emergencyDepartment.bedUtilization }
      ],
      processingThroughput: chartHistory.processingThroughput || [],
      dataQuality: chartHistory.dataQuality || [],
      revenue: chartHistory.revenue || [],
      systemHealth: chartHistory.systemHealth || [],
      modelPerformance: chartHistory.modelPerformance || []
    };
  }
}
