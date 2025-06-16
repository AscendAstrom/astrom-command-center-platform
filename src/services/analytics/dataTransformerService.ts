
import { AnalyticsData } from './types';

export class DataTransformerService {
  transformRealtimeToAnalytics(realtimeData: any): AnalyticsData {
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
        totalPatients: realtimeData.beds.filter(b => b.patient_id).length,
        avgWaitTime: 15,
        bedUtilization: 75,
        staffOnDuty: realtimeData.staff.length,
        triageQueue: 3,
        criticalPatients: 1,
        criticalAlerts: 0,
        lastUpdated: currentDate.toISOString()
      },
      beds: {
        total: realtimeData.beds.length,
        occupied: realtimeData.beds.filter(b => b.status === 'OCCUPIED').length,
        available: realtimeData.beds.filter(b => b.status === 'AVAILABLE').length,
        outOfOrder: realtimeData.beds.filter(b => b.status === 'MAINTENANCE').length,
        utilization: realtimeData.beds.length > 0 ? 
          (realtimeData.beds.filter(b => b.status === 'OCCUPIED').length / realtimeData.beds.length) * 100 : 0
      },
      staffing: {
        total: realtimeData.staff.length,
        onDuty: realtimeData.staff.filter(s => s.is_active).length,
        active: realtimeData.staff.filter(s => s.is_active).length,
        onCall: realtimeData.staff.filter(s => s.is_active).length,
        overtime: 0,
        scheduledNext: 0
      },
      equipment: {
        total: realtimeData.equipment.length,
        available: realtimeData.equipment.filter(e => e.status === 'AVAILABLE').length,
        inUse: realtimeData.equipment.filter(e => e.status === 'IN_USE').length,
        maintenance: realtimeData.equipment.filter(e => e.status === 'MAINTENANCE').length
      },
      clinical: {
        totalPatients: realtimeData.beds.filter(b => b.patient_id).length,
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
      performance: {
        throughput: 0,
        efficiency: 0,
        turnaroundTime: 0,
        resourceUtilization: 0,
        bottlenecks: 0
      },
      clinicalOperations: {
        activeCases: realtimeData.beds.filter(b => b.patient_id).length,
        surgicalSchedule: 0,
        labResults: 0,
        imagingStudies: 0,
        activeStaff: realtimeData.staff.filter(s => s.is_active).length,
        scheduledProcedures: 0,
        resourceUtilization: 0,
        avgProcedureTime: 0,
        equipmentStatus: 'optimal',
        lastUpdated: currentDate
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
      systemHealth: {
        uptime: 99.9,
        performance: 95,
        alerts: 0,
        connectivity: 100,
        cpuUsage: 35,
        memoryUsage: 62,
        networkLatency: 12,
        securityScore: 95,
        lastUpdated: currentDate
      },
      dataPipeline: {
        activeSources: 3,
        processingSpeed: 150,
        errorRate: 0.5,
        dataQuality: 95.2,
        syncStatus: 'healthy',
        lastUpdated: currentDate
      },
      business: {
        revenue: 12000,
        revenueGrowth: 12.5,
        patientSatisfaction: 4.2,
        operationalEfficiency: 87,
        costPerPatient: 2500,
        lastUpdated: currentDate
      },
      aiMetrics: {
        modelAccuracy: 92.5,
        automationSuccess: 89,
        decisionsSupported: 23,
        mlModelsActive: 5,
        predictionConfidence: 88,
        lastUpdated: currentDate
      }
    };
  }
}

export const dataTransformerService = new DataTransformerService();
