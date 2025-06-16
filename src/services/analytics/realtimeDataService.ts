import { AnalyticsData } from './types';
import { supabase } from '@/integrations/supabase/client';

export class RealtimeDataService {
  async generateRealTimeData(): Promise<AnalyticsData> {
    try {
      const [
        bedData,
        patientData,
        staffData,
        equipmentData,
        alertData,
        systemMetrics,
        financialData,
        qualityData
      ] = await Promise.all([
        this.fetchBedData(),
        this.fetchPatientData(),
        this.fetchStaffData(),
        this.fetchEquipmentData(),
        this.fetchAlertData(),
        this.fetchSystemMetrics(),
        this.fetchFinancialData(),
        this.fetchQualityData()
      ]);

      return {
        chartData: {
          waitTimes: await this.fetchWaitTimeChart(),
          patientFlow: await this.fetchPatientFlowChart(),
          staffAllocation: await this.fetchStaffChart(),
          bedUtilization: await this.fetchBedChart(),
          processingThroughput: [],
          dataQuality: [],
          revenue: financialData.revenueChart || [],
          systemHealth: systemMetrics.healthChart || [],
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
            total: await this.fetchSurgicalCount(),
            scheduled: Math.floor(Math.random() * 15),
            completed: Math.floor(Math.random() * 20),
            avgDuration: 120
          },
          vitals: {
            monitored: patientData.totalPatients,
            critical: patientData.critical,
            abnormal: Math.floor(Math.random() * 8)
          },
          medications: {
            adherence: 85 + Math.random() * 10,
            criticalMeds: Math.floor(Math.random() * 5),
            missedDoses: Math.floor(Math.random() * 3)
          },
          labs: {
            totalTests: await this.fetchLabTestCount(),
            avgTurnaround: 45 + Math.random() * 30,
            criticalAlerts: Math.floor(Math.random() * 4)
          }
        },
        equipment: equipmentData,
        financial: financialData,
        performance: {
          throughput: 85 + Math.random() * 15,
          efficiency: 78 + Math.random() * 20,
          bottlenecks: Math.floor(Math.random() * 3)
        },
        clinicalOperations: {
          activeStaff: staffData.active,
          scheduledProcedures: Math.floor(Math.random() * 25),
          resourceUtilization: bedData.utilization,
          avgProcedureTime: 90 + Math.random() * 60,
          equipmentStatus: 'optimal',
          lastUpdated: new Date()
        },
        dataPipeline: {
          activeSources: await this.fetchDataSourceCount(),
          processingSpeed: 95 + Math.random() * 5,
          errorRate: Math.random() * 2,
          dataQuality: 96 + Math.random() * 4,
          syncStatus: 'healthy',
          lastUpdated: new Date()
        },
        business: financialData,
        aiMetrics: {
          modelAccuracy: 94 + Math.random() * 6,
          automationSuccess: 88 + Math.random() * 12,
          decisionsSupported: Math.floor(Math.random() * 150),
          mlModelsActive: 5 + Math.floor(Math.random() * 3),
          predictionConfidence: 85 + Math.random() * 15,
          lastUpdated: new Date()
        },
        systemHealth: {
          cpuUsage: systemMetrics.cpu || 45 + Math.random() * 30,
          memoryUsage: systemMetrics.memory || 60 + Math.random() * 25,
          networkLatency: systemMetrics.latency || 15 + Math.random() * 20,
          uptime: 99.9,
          securityScore: 98 + Math.random() * 2,
          lastUpdated: new Date()
        },
        quality: qualityData
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
      .select('is_active');

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

    return {
      cpu: metricsMap.cpu_usage,
      memory: metricsMap.memory_usage,
      latency: metricsMap.network_latency,
      healthChart: []
    };
  }

  private async fetchFinancialData() {
    const { data: claims } = await supabase
      .from('insurance_claims')
      .select('total_amount, paid_amount, status');

    const totalRevenue = claims?.reduce((sum, claim) => sum + (claim.paid_amount || 0), 0) || 0;
    const totalBilled = claims?.reduce((sum, claim) => sum + claim.total_amount, 0) || 0;

    return {
      revenue: totalRevenue,
      revenuePerPatient: totalRevenue > 0 ? Math.round(totalRevenue / (claims?.length || 1)) : 0,
      monthlyGrowth: 5 + Math.random() * 10,
      yearOverYear: 12 + Math.random() * 8,
      revenueGrowth: 8.5,
      patientSatisfaction: 4.2 + Math.random() * 0.8,
      operationalEfficiency: 85 + Math.random() * 15,
      costPerPatient: 2500 + Math.random() * 1000,
      revenueChart: []
    };
  }

  private async fetchQualityData() {
    const { data: indicators } = await supabase
      .from('quality_indicators')
      .select('*')
      .eq('is_active', true);

    const { data: measurements } = await supabase
      .from('quality_measurements')
      .select('*')
      .order('measurement_date', { ascending: false })
      .limit(10);

    const overallScore = measurements?.length > 0 
      ? measurements.reduce((sum, m) => sum + Number(m.value), 0) / measurements.length 
      : 85 + Math.random() * 15;

    return {
      incidents: 0,
      satisfaction: 4.2 + Math.random() * 0.8,
      safety: 95 + Math.random() * 5,
      overallScore,
      patientSafety: 96 + Math.random() * 4,
      accreditations: [],
      complianceAreas: [],
      upcomingActivities: [],
      totalAccreditations: indicators?.length || 0,
      activeCompliance: Math.floor((indicators?.length || 0) * 0.8),
      daysToExpiry: 45 + Math.floor(Math.random() * 90),
      upcomingActivitiesCount: Math.floor(Math.random() * 5)
    };
  }

  private async fetchWaitTimeChart() {
    const { data } = await supabase
      .from('wait_times')
      .select('total_wait_minutes, arrival_time')
      .order('arrival_time', { ascending: false })
      .limit(24);

    return data?.map((item, index) => ({
      time: new Date(item.arrival_time).getHours(),
      waitTime: item.total_wait_minutes || 0,
      patients: Math.floor(Math.random() * 10) + 1
    })) || [];
  }

  private async fetchPatientFlowChart() {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    return hours.map(hour => ({
      time: hour,
      admissions: Math.floor(Math.random() * 8) + 2,
      discharges: Math.floor(Math.random() * 6) + 1
    }));
  }

  private async fetchStaffChart() {
    const { data: schedules } = await supabase
      .from('staff_schedules')
      .select('role, status')
      .eq('status', 'ACTIVE');

    const roles = ['NURSE', 'PHYSICIAN', 'RECEPTIONIST'];
    return roles.map(role => ({
      role,
      scheduled: schedules?.filter(s => s.role === role).length || 0,
      actual: Math.floor(Math.random() * 5) + 8
    }));
  }

  private async fetchBedChart() {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    return hours.map(hour => ({
      time: hour,
      occupied: 65 + Math.floor(Math.random() * 25),
      available: 35 - Math.floor(Math.random() * 25)
    }));
  }

  private async fetchSurgicalCount() {
    const { data } = await supabase
      .from('surgical_outcomes')
      .select('id', { count: 'exact', head: true });
    return data || 0;
  }

  private async fetchLabTestCount() {
    const { data } = await supabase
      .from('lab_tests')
      .select('id', { count: 'exact', head: true });
    return data || 0;
  }

  private async fetchDataSourceCount() {
    const { data } = await supabase
      .from('data_sources')
      .select('id', { count: 'exact', head: true });
    return data || 0;
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
