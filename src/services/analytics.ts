
import { supabase } from '@/integrations/supabase/client';

export interface AnalyticsData {
  emergencyDepartment: {
    totalPatients: number;
    avgWaitTime: number;
    bedUtilization: number;
    staffOnDuty: number;
    triageQueue: number;
    criticalPatients: number;
  };
  beds: {
    total: number;
    occupied: number;
    available: number;
    outOfOrder: number;
    utilization: number;
  };
  staffing: {
    total: number;
    onDuty: number;
    onCall: number;
    overtime: number;
    scheduledNext: number;
  };
  clinical: {
    surgeries: {
      total: number;
      scheduled: number;
      completed: number;
      avgDuration: number;
    };
    vitals: {
      monitored: number;
      critical: number;
      abnormal: number;
    };
    medications: {
      adherence: number;
      criticalMeds: number;
      missedDoses: number;
    };
    labs: {
      totalTests: number;
      avgTurnaround: number;
      criticalAlerts: number;
    };
  };
  financial: {
    revenue: number;
    revenuePerPatient: number;
    monthlyGrowth: number;
    yearOverYear: number;
  };
  equipment: {
    total: number;
    available: number;
    inUse: number;
    maintenance: number;
  };
  quality: {
    overallScore: number;
    patientSafety: number;
    satisfaction: number;
    incidents: number;
  };
  performance: {
    throughput: number;
    efficiency: number;
    bottlenecks: number;
  };
}

class AnalyticsService {
  private subscribers: ((data: AnalyticsData | null) => void)[] = [];
  private currentData: AnalyticsData | null = null;
  private updateInterval: NodeJS.Timeout | null = null;

  async fetchAnalyticsData(): Promise<AnalyticsData> {
    console.log('Fetching analytics data from Supabase...');

    try {
      // Fetch all data in parallel
      const [
        bedsData,
        patientsData,
        staffData,
        waitTimesData,
        visitsData,
        equipmentData,
        schedulesData,
        medicalRecordsData
      ] = await Promise.all([
        supabase.from('beds').select('*'),
        supabase.from('patients').select('*'),
        supabase.from('staff').select('*'),
        supabase.from('wait_times').select('*'),
        supabase.from('patient_visits').select('*'),
        supabase.from('equipment').select('*'),
        supabase.from('staff_schedules').select('*'),
        supabase.from('medical_records').select('*')
      ]);

      const beds = bedsData.data || [];
      const patients = patientsData.data || [];
      const staff = staffData.data || [];
      const waitTimes = waitTimesData.data || [];
      const visits = visitsData.data || [];
      const equipment = equipmentData.data || [];
      const schedules = schedulesData.data || [];
      const records = medicalRecordsData.data || [];

      // Calculate metrics
      const totalBeds = beds.length;
      const occupiedBeds = beds.filter(bed => bed.status === 'OCCUPIED').length;
      const availableBeds = beds.filter(bed => bed.status === 'AVAILABLE').length;
      const outOfOrderBeds = beds.filter(bed => bed.status === 'OUT_OF_ORDER').length;
      
      const activePatients = patients.filter(p => p.status === 'ACTIVE').length;
      const activeStaff = staff.filter(s => s.is_active).length;
      
      // Calculate average wait time
      const currentWaitTimes = waitTimes.filter(wt => !wt.discharge_time);
      const avgWaitTime = currentWaitTimes.length > 0 
        ? Math.round(currentWaitTimes.reduce((sum, wt) => sum + (wt.total_wait_minutes || 0), 0) / currentWaitTimes.length)
        : 0;

      // ED metrics
      const edPatients = visits.filter(v => v.status === 'ACTIVE').length;
      const criticalPatients = visits.filter(v => v.status === 'CRITICAL').length;
      
      // Staff on duty calculation
      const now = new Date();
      const staffOnDuty = schedules.filter(s => {
        const shiftStart = new Date(s.shift_start);
        const shiftEnd = new Date(s.shift_end);
        return s.status === 'ACTIVE' && shiftStart <= now && shiftEnd >= now;
      }).length;

      // Equipment metrics
      const totalEquipment = equipment.length;
      const availableEquipment = equipment.filter(e => e.status === 'AVAILABLE').length;
      const inUseEquipment = equipment.filter(e => e.status === 'IN_USE').length;
      const maintenanceEquipment = equipment.filter(e => e.status === 'MAINTENANCE').length;

      // Financial metrics (mock calculations for demo)
      const revenue = activePatients * 8500; // Rough calculation
      const revenuePerPatient = activePatients > 0 ? revenue / activePatients : 0;

      // Clinical metrics
      const surgicalRecords = records.filter(r => r.record_type === 'SURGICAL');
      const vitalRecords = records.filter(r => r.record_type === 'VITALS');
      const medicationRecords = records.filter(r => r.record_type === 'MEDICATION');
      const labRecords = records.filter(r => r.record_type === 'LAB');

      const analyticsData: AnalyticsData = {
        emergencyDepartment: {
          totalPatients: edPatients,
          avgWaitTime,
          bedUtilization: totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0,
          staffOnDuty: staffOnDuty || activeStaff,
          triageQueue: currentWaitTimes.length,
          criticalPatients
        },
        beds: {
          total: totalBeds,
          occupied: occupiedBeds,
          available: availableBeds,
          outOfOrder: outOfOrderBeds,
          utilization: totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0
        },
        staffing: {
          total: staff.length,
          onDuty: staffOnDuty || activeStaff,
          onCall: schedules.filter(s => s.is_on_call).length,
          overtime: schedules.filter(s => s.status === 'OVERTIME').length,
          scheduledNext: schedules.filter(s => new Date(s.shift_start) > now).length
        },
        clinical: {
          surgeries: {
            total: surgicalRecords.length,
            scheduled: surgicalRecords.filter(r => r.content?.status === 'SCHEDULED').length,
            completed: surgicalRecords.filter(r => r.content?.status === 'COMPLETED').length,
            avgDuration: surgicalRecords.length > 0 ? 120 : 0 // Mock calculation
          },
          vitals: {
            monitored: vitalRecords.length,
            critical: vitalRecords.filter(r => r.content?.critical === true).length,
            abnormal: vitalRecords.filter(r => r.content?.abnormal === true).length
          },
          medications: {
            adherence: medicationRecords.length > 0 ? 89 : 0, // Mock percentage
            criticalMeds: medicationRecords.filter(r => r.content?.critical === true).length,
            missedDoses: medicationRecords.filter(r => r.content?.missed === true).length
          },
          labs: {
            totalTests: labRecords.length,
            avgTurnaround: labRecords.length > 0 ? 45 : 0, // Mock minutes
            criticalAlerts: labRecords.filter(r => r.content?.critical === true).length
          }
        },
        financial: {
          revenue,
          revenuePerPatient,
          monthlyGrowth: activePatients > 0 ? 12.5 : 0, // Mock percentage
          yearOverYear: activePatients > 0 ? 8.3 : 0 // Mock percentage
        },
        equipment: {
          total: totalEquipment,
          available: availableEquipment,
          inUse: inUseEquipment,
          maintenance: maintenanceEquipment
        },
        quality: {
          overallScore: activePatients > 0 ? 90.5 : 0, // Mock score
          patientSafety: activePatients > 0 ? 94 : 0,
          satisfaction: activePatients > 0 ? 8.7 : 0,
          incidents: 2 // Mock number
        },
        performance: {
          throughput: activePatients > 0 ? 32 : 0,
          efficiency: activePatients > 0 ? 87 : 0,
          bottlenecks: activePatients > 0 ? 3 : 0
        }
      };

      console.log('Analytics data fetched:', analyticsData);
      return analyticsData;
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      // Return empty data structure on error
      return {
        emergencyDepartment: {
          totalPatients: 0,
          avgWaitTime: 0,
          bedUtilization: 0,
          staffOnDuty: 0,
          triageQueue: 0,
          criticalPatients: 0
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
          onCall: 0,
          overtime: 0,
          scheduledNext: 0
        },
        clinical: {
          surgeries: { total: 0, scheduled: 0, completed: 0, avgDuration: 0 },
          vitals: { monitored: 0, critical: 0, abnormal: 0 },
          medications: { adherence: 0, criticalMeds: 0, missedDoses: 0 },
          labs: { totalTests: 0, avgTurnaround: 0, criticalAlerts: 0 }
        },
        financial: {
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
          incidents: 0
        },
        performance: {
          throughput: 0,
          efficiency: 0,
          bottlenecks: 0
        }
      };
    }
  }

  async refreshData(): Promise<void> {
    const data = await this.fetchAnalyticsData();
    this.currentData = data;
    this.notifySubscribers(data);
  }

  subscribe(callback: (data: AnalyticsData | null) => void): () => void {
    this.subscribers.push(callback);
    
    // Immediately provide current data if available
    if (this.currentData) {
      callback(this.currentData);
    } else {
      // Fetch initial data
      this.refreshData();
    }

    // Return unsubscribe function
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  private notifySubscribers(data: AnalyticsData | null): void {
    this.subscribers.forEach(callback => callback(data));
  }

  startRealTimeUpdates(): () => void {
    // Refresh data every 30 seconds
    this.updateInterval = setInterval(() => {
      this.refreshData();
    }, 30000);

    // Initial fetch
    this.refreshData();

    // Return function to stop updates
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

export const analyticsService = new AnalyticsService();
