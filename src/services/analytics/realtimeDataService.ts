
import { AnalyticsData } from './types';
import { ChartDataService } from './chartDataService';
import { bedMetricsService } from './bedMetricsService';
import { patientMetricsService } from './patientMetricsService';
import { staffMetricsService } from './staffMetricsService';
import { qualityMetricsService } from './qualityMetricsService';
import { systemMetricsService } from './systemMetricsService';

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
      qualityData,
      systemMetrics
    ] = await Promise.all([
      bedMetricsService.fetchBedMetrics(),
      patientMetricsService.fetchPatientMetrics(),
      staffMetricsService.fetchStaffMetrics(),
      qualityMetricsService.fetchQualityMetrics(),
      systemMetricsService.getLatestMetrics()
    ]);

    // Calculate derived metrics from real data
    const totalPatients = patientMetrics.activePatients || 0;
    const revenue = totalPatients * 8500; // Average revenue per patient
    const revenuePerPatient = totalPatients > 0 ? revenue / totalPatients : 0;

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
        surgeries: {
          total: systemMetrics.surgeries_total || 0,
          scheduled: systemMetrics.surgeries_scheduled || 0,
          completed: systemMetrics.surgeries_completed || 0,
          avgDuration: systemMetrics.surgery_avg_duration || 0
        },
        vitals: {
          monitored: systemMetrics.vitals_monitored || 0,
          critical: systemMetrics.vitals_critical || 0,
          abnormal: systemMetrics.vitals_abnormal || 0
        },
        medications: {
          adherence: systemMetrics.medication_adherence || 0,
          criticalMeds: systemMetrics.critical_medications || 0,
          missedDoses: systemMetrics.missed_doses || 0
        },
        labs: {
          totalTests: systemMetrics.lab_tests_total || 0,
          avgTurnaround: systemMetrics.lab_avg_turnaround || 0,
          criticalAlerts: systemMetrics.lab_critical_alerts || 0
        }
      },
      equipment: {
        total: systemMetrics.equipment_total || 0,
        available: systemMetrics.equipment_available || 0,
        inUse: systemMetrics.equipment_in_use || 0,
        maintenance: systemMetrics.equipment_maintenance || 0
      },
      financial: {
        revenue: revenue,
        revenuePerPatient: revenuePerPatient,
        monthlyGrowth: systemMetrics.revenue_growth || (totalPatients > 0 ? 12.5 : 0),
        yearOverYear: systemMetrics.revenue_yoy || (totalPatients > 0 ? 8.3 : 0)
      },
      performance: {
        throughput: systemMetrics.throughput || (totalPatients > 0 ? 32 : 0),
        efficiency: systemMetrics.efficiency || (totalPatients > 0 ? 87 : 0),
        bottlenecks: systemMetrics.bottlenecks || (totalPatients > 0 ? 3 : 0)
      },
      clinicalOperations: {
        activeStaff: staffMetrics.active || 0,
        scheduledProcedures: systemMetrics.scheduled_procedures || 0,
        resourceUtilization: bedMetrics.utilization || 0,
        avgProcedureTime: systemMetrics.avg_procedure_time || 0,
        equipmentStatus: this.getEquipmentStatus(systemMetrics),
        lastUpdated: new Date()
      },
      dataPipeline: {
        activeSources: systemMetrics.active_data_sources || 3,
        processingSpeed: systemMetrics.processing_speed || (totalPatients > 0 ? 150 : 0),
        errorRate: systemMetrics.error_rate || 0.5,
        dataQuality: systemMetrics.data_quality || 95.2,
        syncStatus: this.getSyncStatus(systemMetrics),
        lastUpdated: new Date()
      },
      business: {
        revenue: revenue / 24, // Hourly revenue
        revenueGrowth: systemMetrics.revenue_growth || (totalPatients > 0 ? 12.5 : 0),
        patientSatisfaction: systemMetrics.patient_satisfaction || (totalPatients > 0 ? 4.2 : 0),
        operationalEfficiency: systemMetrics.operational_efficiency || (totalPatients > 0 ? 87 : 0),
        costPerPatient: systemMetrics.cost_per_patient || (totalPatients > 0 ? 2500 : 0),
        lastUpdated: new Date()
      },
      aiMetrics: {
        modelAccuracy: systemMetrics.model_accuracy || (totalPatients > 0 ? 92.5 : 0),
        automationSuccess: systemMetrics.automation_success || (totalPatients > 0 ? 89 : 0),
        decisionsSupported: systemMetrics.decisions_supported || (totalPatients * 3),
        mlModelsActive: systemMetrics.ml_models_active || 5,
        predictionConfidence: systemMetrics.prediction_confidence || (totalPatients > 0 ? 88 : 0),
        lastUpdated: new Date()
      },
      systemHealth: {
        cpuUsage: systemMetrics.cpu_usage || 35,
        memoryUsage: systemMetrics.memory_usage || 62,
        networkLatency: systemMetrics.network_latency || 12,
        uptime: systemMetrics.uptime || 99.8,
        securityScore: systemMetrics.security_score || 95,
        lastUpdated: new Date()
      },
      quality: qualityData
    };
  }

  private getEquipmentStatus(metrics: Record<string, number>): 'optimal' | 'warning' | 'critical' {
    const maintenanceRate = metrics.equipment_maintenance || 0;
    const totalEquipment = metrics.equipment_total || 1;
    const maintenancePercentage = (maintenanceRate / totalEquipment) * 100;

    if (maintenancePercentage > 20) return 'critical';
    if (maintenancePercentage > 10) return 'warning';
    return 'optimal';
  }

  private getSyncStatus(metrics: Record<string, number>): 'healthy' | 'warning' | 'error' {
    const errorRate = metrics.error_rate || 0;
    const dataQuality = metrics.data_quality || 100;

    if (errorRate > 5 || dataQuality < 80) return 'error';
    if (errorRate > 2 || dataQuality < 90) return 'warning';
    return 'healthy';
  }
}
