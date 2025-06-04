import { AnalyticsData } from './types';
import { supabase } from '@/integrations/supabase/client';

export class RealtimeDataService {
  async generateRealTimeData(): Promise<AnalyticsData> {
    try {
      // Fetch real data from multiple tables
      const [
        bedData,
        patientData,
        staffData,
        equipmentData,
        alertData,
        systemMetrics
      ] = await Promise.all([
        this.fetchBedData(),
        this.fetchPatientData(),
        this.fetchStaffData(),
        this.fetchEquipmentData(),
        this.fetchAlertData(),
        this.fetchSystemMetrics()
      ]);

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
          totalPatients: patientData.totalPatients,
          avgWaitTime: patientData.avgWaitTime,
          bedUtilization: bedData.utilization,
          staffOnDuty: staffData.onDuty,
          criticalAlerts: alertData.critical,
          triageQueue: patientData.triageQueue,
          criticalPatients: patientData.critical,
          lastUpdated: new Date()
        },
        beds: bedData,
        staffing: staffData,
        clinical: {
          surgeries: {
            total: 0,
            scheduled: 0,
            completed: 0,
            avgDuration: 0
          },
          vitals: {
            monitored: 0,
            critical: 0,
            abnormal: 0
          },
          medications: {
            adherence: 0,
            criticalMeds: 0,
            missedDoses: 0
          },
          labs: {
            totalTests: 0,
            avgTurnaround: 0,
            criticalAlerts: 0
          }
        },
        equipment: equipmentData,
        financial: {
          revenue: 0,
          revenuePerPatient: 0,
          monthlyGrowth: 0,
          yearOverYear: 0
        },
        performance: {
          throughput: 0,
          efficiency: 0,
          bottlenecks: 0
        },
        clinicalOperations: {
          activeStaff: staffData.active,
          scheduledProcedures: 0,
          resourceUtilization: bedData.utilization,
          avgProcedureTime: 0,
          equipmentStatus: 'optimal',
          lastUpdated: new Date()
        },
        dataPipeline: {
          activeSources: 0,
          processingSpeed: 0,
          errorRate: 0,
          dataQuality: 0,
          syncStatus: 'healthy',
          lastUpdated: new Date()
        },
        business: {
          revenue: 0,
          revenueGrowth: 0,
          patientSatisfaction: 0,
          operationalEfficiency: 0,
          costPerPatient: 0,
          lastUpdated: new Date()
        },
        aiMetrics: {
          modelAccuracy: 0,
          automationSuccess: 0,
          decisionsSupported: 0,
          mlModelsActive: 0,
          predictionConfidence: 0,
          lastUpdated: new Date()
        },
        systemHealth: {
          cpuUsage: 0,
          memoryUsage: 0,
          networkLatency: 0,
          uptime: 0,
          securityScore: 0,
          lastUpdated: new Date()
        },
        quality: {
          incidents: alertData.total,
          satisfaction: 0,
          safety: 0,
          overallScore: 0,
          patientSafety: 0,
          accreditations: [],
          complianceAreas: [],
          upcomingActivities: [],
          totalAccreditations: 0,
          activeCompliance: 0,
          daysToExpiry: 0,
          upcomingActivitiesCount: 0
        }
      };
    } catch (error) {
      console.error('Error fetching real-time data:', error);
      return this.getEmptyAnalyticsData();
    }
  }

  private async fetchBedData() {
    const { data: beds } = await supabase
      .from('beds')
      .select('status')
      .eq('deleted_at', null);

    const total = beds?.length || 0;
    const occupied = beds?.filter(b => b.status === 'OCCUPIED').length || 0;
    const available = beds?.filter(b => b.status === 'AVAILABLE').length || 0;
    const maintenance = beds?.filter(b => b.status === 'MAINTENANCE').length || 0;

    return {
      total,
      occupied,
      available,
      outOfOrder: maintenance,
      utilization: total > 0 ? Math.round((occupied / total) * 100) : 0
    };
  }

  private async fetchPatientData() {
    const { data: visits } = await supabase
      .from('patient_visits')
      .select('status, admission_date')
      .eq('status', 'ACTIVE');

    const { data: waitTimes } = await supabase
      .from('wait_times')
      .select('total_wait_minutes, priority_level')
      .order('created_at', { ascending: false })
      .limit(50);

    const totalPatients = visits?.length || 0;
    const avgWaitTime = waitTimes?.length > 0 
      ? Math.round(waitTimes.reduce((sum, w) => sum + (w.total_wait_minutes || 0), 0) / waitTimes.length)
      : 0;

    return {
      totalPatients,
      avgWaitTime,
      triageQueue: waitTimes?.filter(w => w.priority_level <= 2).length || 0,
      critical: waitTimes?.filter(w => w.priority_level === 1).length || 0
    };
  }

  private async fetchStaffData() {
    const { data: staff } = await supabase
      .from('staff')
      .select('is_active')
      .eq('is_active', true);

    const { data: schedules } = await supabase
      .from('staff_schedules')
      .select('status, is_on_call')
      .gte('shift_end', new Date().toISOString());

    const total = staff?.length || 0;
    const onDuty = schedules?.filter(s => s.status === 'ACTIVE').length || 0;
    const onCall = schedules?.filter(s => s.is_on_call).length || 0;

    return {
      total,
      active: total,
      onDuty,
      onCall,
      scheduledNext: 0,
      overtime: 0
    };
  }

  private async fetchEquipmentData() {
    const { data: equipment } = await supabase
      .from('equipment')
      .select('status');

    const total = equipment?.length || 0;
    const available = equipment?.filter(e => e.status === 'AVAILABLE').length || 0;
    const inUse = equipment?.filter(e => e.status === 'IN_USE').length || 0;
    const maintenance = equipment?.filter(e => e.status === 'MAINTENANCE').length || 0;

    return {
      total,
      available,
      inUse,
      maintenance
    };
  }

  private async fetchAlertData() {
    const { data: alerts } = await supabase
      .from('alerts')
      .select('severity, status')
      .eq('status', 'ACTIVE');

    const total = alerts?.length || 0;
    const critical = alerts?.filter(a => a.severity === 'CRITICAL').length || 0;

    return {
      total,
      critical
    };
  }

  private async fetchSystemMetrics() {
    const { data: metrics } = await supabase
      .from('system_metrics')
      .select('metric_name, metric_value')
      .order('timestamp', { ascending: false })
      .limit(100);

    const metricsMap: Record<string, number> = {};
    metrics?.forEach(m => {
      if (!metricsMap[m.metric_name]) {
        metricsMap[m.metric_name] = m.metric_value;
      }
    });

    return metricsMap;
  }

  private getEmptyAnalyticsData(): AnalyticsData {
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
        criticalAlerts: 0,
        triageQueue: 0,
        criticalPatients: 0,
        lastUpdated: new Date()
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
        active: 0,
        onDuty: 0,
        onCall: 0,
        scheduledNext: 0,
        overtime: 0
      },
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
        revenue: 0,
        revenuePerPatient: 0,
        monthlyGrowth: 0,
        yearOverYear: 0
      },
      performance: {
        throughput: 0,
        efficiency: 0,
        bottlenecks: 0
      },
      clinicalOperations: {
        activeStaff: 0,
        scheduledProcedures: 0,
        resourceUtilization: 0,
        avgProcedureTime: 0,
        equipmentStatus: 'optimal',
        lastUpdated: new Date()
      },
      dataPipeline: {
        activeSources: 0,
        processingSpeed: 0,
        errorRate: 0,
        dataQuality: 0,
        syncStatus: 'healthy',
        lastUpdated: new Date()
      },
      business: {
        revenue: 0,
        revenueGrowth: 0,
        patientSatisfaction: 0,
        operationalEfficiency: 0,
        costPerPatient: 0,
        lastUpdated: new Date()
      },
      aiMetrics: {
        modelAccuracy: 0,
        automationSuccess: 0,
        decisionsSupported: 0,
        mlModelsActive: 0,
        predictionConfidence: 0,
        lastUpdated: new Date()
      },
      systemHealth: {
        cpuUsage: 0,
        memoryUsage: 0,
        networkLatency: 0,
        uptime: 0,
        securityScore: 0,
        lastUpdated: new Date()
      },
      quality: {
        incidents: 0,
        satisfaction: 0,
        safety: 0,
        overallScore: 0,
        patientSafety: 0,
        accreditations: [],
        complianceAreas: [],
        upcomingActivities: [],
        totalAccreditations: 0,
        activeCompliance: 0,
        daysToExpiry: 0,
        upcomingActivitiesCount: 0
      }
    };
  }
}
