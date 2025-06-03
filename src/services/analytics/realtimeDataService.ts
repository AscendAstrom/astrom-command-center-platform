
import { AnalyticsData } from './types';
import { ChartDataService } from './chartDataService';
import { bedMetricsService } from './bedMetricsService';
import { patientMetricsService } from './patientMetricsService';
import { staffMetricsService } from './staffMetricsService';
import { qualityMetricsService } from './qualityMetricsService';

export class RealtimeDataService {
  private chartDataService = new ChartDataService();

  async generateRealTimeData(): Promise<AnalyticsData> {
    const chartHistory = this.chartDataService.getChartData();
    const chartData = {
      waitTimes: chartHistory.waitTimes || [],
      patientFlow: chartHistory.patientFlow || [],
      staffAllocation: chartHistory.staffAllocation || [],
      bedUtilization: chartHistory.bedUtilization || [],
      processingThroughput: chartHistory.processingThroughput || [],
      dataQuality: chartHistory.dataQuality || [],
      revenue: chartHistory.revenue || [],
      systemHealth: chartHistory.systemHealth || [],
      modelPerformance: chartHistory.modelPerformance || []
    };

    const [
      bedMetrics,
      patientMetrics,
      staffMetrics,
      qualityData
    ] = await Promise.all([
      bedMetricsService.fetchBedMetrics(),
      patientMetricsService.fetchPatientMetrics(),
      staffMetricsService.fetchStaffMetrics(),
      qualityMetricsService.fetchQualityMetrics()
    ]);

    const mockSystemMetrics = this.generateMockSystemMetrics();

    return {
      chartData,
      emergencyDepartment: {
        totalPatients: patientMetrics.activePatients || 0,
        avgWaitTime: patientMetrics.avgWaitTime || 0,
        bedUtilization: bedMetrics.utilization || 0,
        staffOnDuty: staffMetrics.onDuty || 0,
        criticalAlerts: patientMetrics.criticalPatients || 0,
        triageQueue: patientMetrics.triageQueue || 0,
        criticalPatients: patientMetrics.criticalPatients || 0,
        lastUpdated: new Date()
      },
      beds: bedMetrics,
      staffing: staffMetrics,
      clinical: {
        surgeries: { total: 0, scheduled: 0, completed: 0, avgDuration: 0 },
        vitals: { monitored: 0, critical: 0, abnormal: 0 },
        medications: { adherence: 0, criticalMeds: 0, missedDoses: 0 },
        labs: { totalTests: 0, avgTurnaround: 0, criticalAlerts: 0 }
      },
      equipment: {
        total: 0,
        available: 0,
        inUse: 0,
        maintenance: 0
      },
      financial: {
        revenue: mockSystemMetrics.revenue || 0,
        revenuePerPatient: mockSystemMetrics.revenuePerPatient || 0,
        monthlyGrowth: mockSystemMetrics.revenueGrowth || 0,
        yearOverYear: mockSystemMetrics.yearOverYear || 0
      },
      performance: {
        throughput: mockSystemMetrics.throughput || 0,
        efficiency: mockSystemMetrics.efficiency || 0,
        bottlenecks: mockSystemMetrics.bottlenecks || 0
      },
      clinicalOperations: {
        activeStaff: staffMetrics.active || 0,
        scheduledProcedures: mockSystemMetrics.procedures || 0,
        resourceUtilization: mockSystemMetrics.resourceUtil || 0,
        avgProcedureTime: mockSystemMetrics.avgProcTime || 0,
        equipmentStatus: 'optimal' as const,
        lastUpdated: new Date()
      },
      dataPipeline: {
        activeSources: mockSystemMetrics.activeSources || 0,
        processingSpeed: mockSystemMetrics.processingSpeed || 0,
        errorRate: mockSystemMetrics.errorRate || 0,
        dataQuality: mockSystemMetrics.dataQuality || 100,
        syncStatus: 'healthy' as const,
        lastUpdated: new Date()
      },
      business: {
        revenue: mockSystemMetrics.revenue || 0,
        revenueGrowth: mockSystemMetrics.revenueGrowth || 0,
        patientSatisfaction: mockSystemMetrics.satisfaction || 0,
        operationalEfficiency: mockSystemMetrics.efficiency || 0,
        costPerPatient: mockSystemMetrics.costPerPatient || 0,
        lastUpdated: new Date()
      },
      aiMetrics: {
        modelAccuracy: mockSystemMetrics.modelAccuracy || 0,
        automationSuccess: mockSystemMetrics.automationSuccess || 0,
        decisionsSupported: mockSystemMetrics.decisionsSupported || 0,
        mlModelsActive: mockSystemMetrics.mlModels || 0,
        predictionConfidence: mockSystemMetrics.predictionConfidence || 0,
        lastUpdated: new Date()
      },
      systemHealth: {
        cpuUsage: mockSystemMetrics.cpuUsage || 0,
        memoryUsage: mockSystemMetrics.memoryUsage || 0,
        networkLatency: mockSystemMetrics.networkLatency || 0,
        uptime: mockSystemMetrics.uptime || 0,
        securityScore: mockSystemMetrics.securityScore || 100,
        lastUpdated: new Date()
      },
      quality: qualityData
    };
  }

  private generateMockSystemMetrics() {
    return {
      procedures: 0,
      resourceUtil: 0,
      avgProcTime: 0,
      activeSources: 0,
      processingSpeed: 0,
      errorRate: 0,
      dataQuality: 100,
      revenue: 0,
      revenuePerPatient: 0,
      revenueGrowth: 0,
      yearOverYear: 0,
      satisfaction: 0,
      efficiency: 0,
      costPerPatient: 0,
      throughput: 0,
      bottlenecks: 0,
      modelAccuracy: 0,
      automationSuccess: 0,
      decisionsSupported: 0,
      mlModels: 0,
      predictionConfidence: 0,
      cpuUsage: 0,
      memoryUsage: 0,
      networkLatency: 0,
      uptime: 0,
      securityScore: 100
    };
  }
}
