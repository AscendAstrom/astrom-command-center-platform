
import { AnalyticsData } from './types';
import { ChartDataService } from './chartDataService';
import { RealtimeDataService } from './realtimeDataService';

class AnalyticsDataService {
  private subscribers: ((data: AnalyticsData) => void)[] = [];
  private intervalId: NodeJS.Timeout | null = null;
  private refreshInterval = 2000;
  private chartDataService = new ChartDataService();
  private realtimeDataService = new RealtimeDataService();

  subscribe(callback: (data: AnalyticsData) => void) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  start() {
    if (this.intervalId) return;
    
    this.chartDataService.initializeChartHistory();
    
    this.intervalId = setInterval(async () => {
      const realtimeData = await this.realtimeDataService.getRealtimeData();
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
          totalPatients: realtimeData.beds.filter(b => b.patient_id).length,
          avgWaitTime: 15,
          bedUtilization: 75,
          staffOnDuty: realtimeData.staff.length,
          triageQueue: 3,
          criticalPatients: 1,
          criticalAlerts: 0,
          lastUpdated: realtimeData.timestamp
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
          pendingDischarges: 0
        },
        financial: {
          dailyRevenue: 0,
          pendingBilling: 0,
          insuranceClaims: 0,
          costCenter: 0
        },
        performance: {
          throughput: 0,
          efficiency: 0,
          turnaroundTime: 0,
          resourceUtilization: 0
        },
        clinicalOperations: {
          activeCases: realtimeData.beds.filter(b => b.patient_id).length,
          surgicalSchedule: 0,
          labResults: 0,
          imagingStudies: 0
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
          connectivity: 100
        }
      };
      
      this.subscribers.forEach(callback => callback(analyticsData));
    }, this.refreshInterval);

    this.realtimeDataService.getRealtimeData().then(realtimeData => {
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
          totalPatients: realtimeData.beds.filter(b => b.patient_id).length,
          avgWaitTime: 15,
          bedUtilization: 75,
          staffOnDuty: realtimeData.staff.length,
          triageQueue: 3,
          criticalPatients: 1,
          criticalAlerts: 0,
          lastUpdated: realtimeData.timestamp
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
          pendingDischarges: 0
        },
        financial: {
          dailyRevenue: 0,
          pendingBilling: 0,
          insuranceClaims: 0,
          costCenter: 0
        },
        performance: {
          throughput: 0,
          efficiency: 0,
          turnaroundTime: 0,
          resourceUtilization: 0
        },
        clinicalOperations: {
          activeCases: realtimeData.beds.filter(b => b.patient_id).length,
          surgicalSchedule: 0,
          labResults: 0,
          imagingStudies: 0
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
          connectivity: 100
        }
      };
      
      this.subscribers.forEach(callback => callback(analyticsData));
    });
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  setRefreshInterval(interval: number) {
    this.refreshInterval = interval;
    this.restart();
  }

  restart() {
    this.stop();
    this.start();
  }
}

export const analyticsDataService = new AnalyticsDataService();
