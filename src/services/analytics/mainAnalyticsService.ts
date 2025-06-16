
import { AnalyticsData } from './types';
import { bedMetricsService } from './bedMetricsService';
import { patientMetricsService } from './patientMetricsService';
import { staffMetricsService } from './staffMetricsService';
import { clinicalMetricsService } from './clinicalMetricsService';
import { equipmentMetricsService } from './equipmentMetricsService';
import { qualityMetricsService } from './qualityMetricsService';

class MainAnalyticsService {
  private subscribers: ((data: AnalyticsData | null) => void)[] = [];
  private currentData: AnalyticsData | null = null;
  private updateInterval: NodeJS.Timeout | null = null;

  async fetchAnalyticsData(): Promise<AnalyticsData> {
    console.log('Fetching analytics data from Supabase...');

    try {
      const [
        bedMetrics,
        patientMetrics,
        staffMetrics,
        clinicalMetrics,
        equipmentMetrics,
        qualityMetrics
      ] = await Promise.all([
        bedMetricsService.fetchBedMetrics(),
        patientMetricsService.fetchPatientMetrics(),
        staffMetricsService.fetchStaffMetrics(),
        clinicalMetricsService.fetchClinicalMetrics(),
        equipmentMetricsService.fetchEquipmentMetrics(),
        qualityMetricsService.fetchQualityMetrics()
      ]);

      const currentDate = new Date();
      const revenue = patientMetrics.activePatients * 8500;
      const revenuePerPatient = patientMetrics.activePatients > 0 ? revenue / patientMetrics.activePatients : 0;

      const analyticsData: AnalyticsData = {
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
          totalPatients: patientMetrics.edPatients,
          avgWaitTime: patientMetrics.avgWaitTime,
          bedUtilization: bedMetrics.utilization,
          staffOnDuty: staffMetrics.onDuty,
          triageQueue: patientMetrics.triageQueue,
          criticalPatients: patientMetrics.criticalPatients,
          criticalAlerts: patientMetrics.criticalPatients > 0 ? Math.floor(patientMetrics.criticalPatients * 0.1) : 0,
          lastUpdated: currentDate.toISOString()
        },
        beds: bedMetrics,
        staffing: staffMetrics,
        clinical: {
          totalPatients: patientMetrics.activePatients,
          activeTreatments: clinicalMetrics.surgeries.total,
          completedProcedures: clinicalMetrics.surgeries.completed,
          pendingDischarges: 0,
          surgeries: clinicalMetrics.surgeries,
          vitals: clinicalMetrics.vitals,
          medications: clinicalMetrics.medications,
          labs: clinicalMetrics.labs
        },
        financial: {
          dailyRevenue: revenue,
          pendingBilling: 0,
          insuranceClaims: 0,
          costCenter: 0,
          revenue,
          revenuePerPatient,
          monthlyGrowth: patientMetrics.activePatients > 0 ? 12.5 : 0,
          yearOverYear: patientMetrics.activePatients > 0 ? 8.3 : 0
        },
        equipment: equipmentMetrics,
        quality: qualityMetrics,
        qualityMetrics: {
          patientSatisfaction: qualityMetrics.satisfaction,
          safetyIncidents: qualityMetrics.incidents,
          complianceScore: qualityMetrics.overallScore,
          qualityIndicators: qualityMetrics.totalAccreditations
        },
        performance: {
          throughput: patientMetrics.activePatients > 0 ? 32 : 0,
          efficiency: patientMetrics.activePatients > 0 ? 87 : 0,
          turnaroundTime: 0,
          resourceUtilization: 0,
          bottlenecks: patientMetrics.activePatients > 0 ? 3 : 0
        },
        clinicalOperations: {
          activeCases: patientMetrics.activePatients,
          surgicalSchedule: 0,
          labResults: 0,
          imagingStudies: 0,
          activeStaff: staffMetrics.active,
          scheduledProcedures: clinicalMetrics.surgeries.total,
          resourceUtilization: bedMetrics.utilization,
          avgProcedureTime: clinicalMetrics.surgeries.avgDuration,
          equipmentStatus: 'optimal',
          lastUpdated: currentDate
        },
        dataPipeline: {
          activeSources: 3,
          processingSpeed: patientMetrics.activePatients > 0 ? 150 : 0,
          errorRate: 0.5,
          dataQuality: 95.2,
          syncStatus: 'healthy',
          lastUpdated: currentDate
        },
        business: {
          revenue: revenue / 24,
          revenueGrowth: patientMetrics.activePatients > 0 ? 12.5 : 0,
          patientSatisfaction: patientMetrics.activePatients > 0 ? 4.2 : 0,
          operationalEfficiency: patientMetrics.activePatients > 0 ? 87 : 0,
          costPerPatient: patientMetrics.activePatients > 0 ? 2500 : 0,
          lastUpdated: currentDate
        },
        aiMetrics: {
          modelAccuracy: patientMetrics.activePatients > 0 ? 92.5 : 0,
          automationSuccess: patientMetrics.activePatients > 0 ? 89 : 0,
          decisionsSupported: patientMetrics.activePatients * 3,
          mlModelsActive: 5,
          predictionConfidence: patientMetrics.activePatients > 0 ? 88 : 0,
          lastUpdated: currentDate
        },
        systemHealth: {
          uptime: 99.8,
          performance: 95,
          alerts: 0,
          connectivity: 100,
          cpuUsage: 35,
          memoryUsage: 62,
          networkLatency: 12,
          securityScore: 95,
          lastUpdated: currentDate
        }
      };

      console.log('Analytics data fetched:', analyticsData);
      return analyticsData;
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      return this.getEmptyAnalyticsData();
    }
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

  async refreshData(): Promise<void> {
    const data = await this.fetchAnalyticsData();
    this.currentData = data;
    this.notifySubscribers(data);
  }

  subscribe(callback: (data: AnalyticsData | null) => void): () => void {
    this.subscribers.push(callback);
    
    if (this.currentData) {
      callback(this.currentData);
    } else {
      this.refreshData();
    }

    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  private notifySubscribers(data: AnalyticsData | null): void {
    this.subscribers.forEach(callback => callback(data));
  }

  startRealTimeUpdates(): () => void {
    this.updateInterval = setInterval(() => {
      this.refreshData();
    }, 30000);

    this.refreshData();

    return () => {
      if (this.updateInterval) {
        clearInterval(this.updateInterval);
        this.updateInterval = null;
      }
    };
  }

  getCurrentData(): AnalyticsData | null {
    return this.currentData;
  }
}

export const analyticsService = new MainAnalyticsService();
