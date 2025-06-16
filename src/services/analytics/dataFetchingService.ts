
import { AnalyticsData } from './types';

export class DataFetchingService {
  async fetchAnalyticsData(): Promise<AnalyticsData> {
    console.log('Returning empty analytics data...');
    return this.getEmptyAnalyticsData();
  }

  private getEmptyAnalyticsData(): AnalyticsData {
    const currentDate = new Date();
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
      },
      emergencyDepartment: {
        totalPatients: 0,
        avgWaitTime: 0,
        bedUtilization: 0,
        staffOnDuty: 0,
        triageQueue: 0,
        criticalPatients: 0,
        criticalAlerts: 0,
        lastUpdated: currentDate.toISOString()
      },
      beds: {
        total: 0,
        occupied: 0,
        available: 0,
        outOfOrder: 0,
        utilization: 0
      },
      staffing: {
        total: 0,
        onDuty: 0,
        active: 0,
        onCall: 0,
        overtime: 0,
        scheduledNext: 0
      },
      clinical: {
        totalPatients: 0,
        activeTreatments: 0,
        completedProcedures: 0,
        pendingDischarges: 0,
        surgeries: { total: 0, scheduled: 0, completed: 0, avgDuration: 0 },
        vitals: { monitored: 0, critical: 0, abnormal: 0 },
        medications: { adherence: 0, criticalMeds: 0, missedDoses: 0 },
        labs: { totalTests: 0, avgTurnaround: 0, criticalAlerts: 0 }
      },
      financial: {
        dailyRevenue: 0,
        pendingBilling: 0,
        insuranceClaims: 0,
        costCenter: 0,
        revenue: 0,
        revenuePerPatient: 0,
        monthlyGrowth: 0,
        yearOverYear: 0
      },
      equipment: {
        total: 0,
        available: 0,
        inUse: 0,
        maintenance: 0
      },
      quality: {
        overallScore: 0,
        patientSafety: 0,
        satisfaction: 0,
        safety: 0,
        incidents: 0,
        accreditations: [],
        complianceAreas: [],
        upcomingActivities: [],
        totalAccreditations: 0,
        activeCompliance: 0,
        daysToExpiry: 0,
        upcomingActivitiesCount: 0
      },
      qualityMetrics: {
        patientSatisfaction: 0,
        safetyIncidents: 0,
        complianceScore: 0,
        qualityIndicators: 0
      },
      performance: {
        throughput: 0,
        efficiency: 0,
        turnaroundTime: 0,
        resourceUtilization: 0,
        bottlenecks: 0
      },
      clinicalOperations: {
        activeCases: 0,
        surgicalSchedule: 0,
        labResults: 0,
        imagingStudies: 0,
        activeStaff: 0,
        scheduledProcedures: 0,
        resourceUtilization: 0,
        avgProcedureTime: 0,
        equipmentStatus: 'optimal',
        lastUpdated: currentDate
      },
      dataPipeline: {
        activeSources: 0,
        processingSpeed: 0,
        errorRate: 0,
        dataQuality: 0,
        syncStatus: 'error',
        lastUpdated: currentDate
      },
      business: {
        revenue: 0,
        revenueGrowth: 0,
        patientSatisfaction: 0,
        operationalEfficiency: 0,
        costPerPatient: 0,
        lastUpdated: currentDate
      },
      aiMetrics: {
        modelAccuracy: 0,
        automationSuccess: 0,
        decisionsSupported: 0,
        mlModelsActive: 0,
        predictionConfidence: 0,
        lastUpdated: currentDate
      },
      systemHealth: {
        uptime: 0,
        performance: 0,
        alerts: 0,
        connectivity: 0,
        cpuUsage: 0,
        memoryUsage: 0,
        networkLatency: 0,
        securityScore: 0,
        lastUpdated: currentDate
      }
    };
  }
}

export const dataFetchingService = new DataFetchingService();
