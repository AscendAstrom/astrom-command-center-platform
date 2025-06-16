
import { AnalyticsData, ChartDataPoint } from './types';

export class MockDataGenerator {
  private generateRealisticTimeSeries(
    baseValue: number,
    variance: number,
    points: number = 24,
    intervalHours: number = 1
  ): ChartDataPoint[] {
    const now = new Date();
    return Array.from({ length: points }, (_, i) => {
      const time = new Date(now.getTime() - (points - i) * intervalHours * 60 * 60 * 1000);
      const variation = (Math.random() - 0.5) * variance;
      const timeOfDayFactor = this.getTimeOfDayFactor(time.getHours());
      
      return {
        time: time.toISOString(),
        value: Math.max(0, Math.round(baseValue + variation + (baseValue * timeOfDayFactor * 0.3))),
        label: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
    });
  }

  private getTimeOfDayFactor(hour: number): number {
    // Simulate hospital activity patterns - higher activity during day shift
    if (hour >= 6 && hour <= 14) return 0.3; // Day shift peak
    if (hour >= 15 && hour <= 22) return 0.1; // Evening shift
    return -0.2; // Night shift lower activity
  }

  generateMockAnalyticsData(): AnalyticsData {
    const currentDate = new Date();
    
    // Generate realistic patient and bed data
    const totalBeds = 450;
    const occupiedBeds = Math.floor(totalBeds * (0.78 + Math.random() * 0.15)); // 78-93% occupancy
    const availableBeds = totalBeds - occupiedBeds;
    
    // Generate staff data
    const totalStaff = 1250;
    const onDutyStaff = Math.floor(totalStaff * (0.25 + Math.random() * 0.1)); // 25-35% on duty
    
    // Generate patient data
    const totalPatients = occupiedBeds + Math.floor(Math.random() * 50); // Some patients may not be in beds
    const criticalPatients = Math.floor(totalPatients * (0.08 + Math.random() * 0.05)); // 8-13% critical
    
    return {
      chartData: {
        waitTimes: this.generateRealisticTimeSeries(35, 15).map(point => ({
          ...point,
          waitTime: point.value,
          targetTime: 30
        })),
        patientFlow: this.generateRealisticTimeSeries(12, 8).map(point => ({
          ...point,
          admissions: point.value,
          discharges: Math.max(0, point.value - Math.floor(Math.random() * 5))
        })),
        staffAllocation: this.generateRealisticTimeSeries(onDutyStaff, 50),
        bedUtilization: this.generateRealisticTimeSeries(78, 8).map(point => ({
          ...point,
          utilization: Math.min(100, Math.max(60, point.value))
        })),
        processingThroughput: this.generateRealisticTimeSeries(1450, 200).map(point => ({
          ...point,
          throughput: point.value,
          target: 1500
        })),
        dataQuality: this.generateRealisticTimeSeries(96, 3).map(point => ({
          ...point,
          quality: Math.min(100, Math.max(90, point.value)),
          completeness: Math.min(100, Math.max(92, point.value + Math.random() * 4 - 2))
        })),
        revenue: this.generateRealisticTimeSeries(145000, 25000, 7, 24).map(point => ({
          ...point,
          revenue: point.value,
          target: 150000
        })),
        systemHealth: this.generateRealisticTimeSeries(45, 15).map(point => ({
          ...point,
          cpu: Math.min(90, Math.max(15, point.value)),
          memory: Math.min(95, Math.max(35, point.value + 20)),
          network: Math.min(50, Math.max(5, point.value - 25))
        })),
        modelPerformance: this.generateRealisticTimeSeries(92, 5, 12, 2).map(point => ({
          ...point,
          accuracy: Math.min(99, Math.max(85, point.value)),
          confidence: Math.min(95, Math.max(80, point.value - 3))
        }))
      },
      emergencyDepartment: {
        totalPatients: Math.floor(45 + Math.random() * 25),
        avgWaitTime: Math.floor(28 + Math.random() * 35),
        bedUtilization: Math.floor(82 + Math.random() * 15),
        staffOnDuty: Math.floor(28 + Math.random() * 12),
        triageQueue: Math.floor(8 + Math.random() * 12),
        criticalPatients: Math.floor(2 + Math.random() * 6),
        criticalAlerts: Math.floor(Math.random() * 4),
        lastUpdated: currentDate.toISOString()
      },
      beds: {
        total: totalBeds,
        occupied: occupiedBeds,
        available: availableBeds,
        outOfOrder: Math.floor(8 + Math.random() * 12),
        utilization: Math.round((occupiedBeds / totalBeds) * 100)
      },
      staffing: {
        total: totalStaff,
        onDuty: onDutyStaff,
        active: Math.floor(onDutyStaff * 0.95),
        onCall: Math.floor(totalStaff * 0.12),
        overtime: Math.floor(onDutyStaff * 0.15),
        scheduledNext: Math.floor(onDutyStaff * 1.1)
      },
      clinical: {
        totalPatients: totalPatients,
        activeTreatments: Math.floor(totalPatients * 0.65),
        completedProcedures: Math.floor(45 + Math.random() * 35),
        pendingDischarges: Math.floor(15 + Math.random() * 25),
        surgeries: {
          total: Math.floor(18 + Math.random() * 12),
          scheduled: Math.floor(22 + Math.random() * 8),
          completed: Math.floor(16 + Math.random() * 6),
          avgDuration: Math.floor(145 + Math.random() * 90)
        },
        vitals: {
          monitored: Math.floor(totalPatients * 0.85),
          critical: criticalPatients,
          abnormal: Math.floor(totalPatients * 0.12)
        },
        medications: {
          adherence: Math.floor(94 + Math.random() * 5),
          criticalMeds: Math.floor(8 + Math.random() * 12),
          missedDoses: Math.floor(2 + Math.random() * 8)
        },
        labs: {
          totalTests: Math.floor(125 + Math.random() * 85),
          avgTurnaround: Math.floor(35 + Math.random() * 25),
          criticalAlerts: Math.floor(1 + Math.random() * 4)
        }
      },
      financial: {
        dailyRevenue: Math.floor(145000 + Math.random() * 35000),
        pendingBilling: Math.floor(85000 + Math.random() * 25000),
        insuranceClaims: Math.floor(245 + Math.random() * 85),
        costCenter: Math.floor(95000 + Math.random() * 25000),
        revenue: Math.floor(2450000 + Math.random() * 350000),
        revenuePerPatient: Math.floor(3200 + Math.random() * 800),
        monthlyGrowth: Math.round((Math.random() * 10 - 2) * 10) / 10,
        yearOverYear: Math.round((Math.random() * 20 - 5) * 10) / 10
      },
      equipment: {
        total: Math.floor(850 + Math.random() * 150),
        available: Math.floor(720 + Math.random() * 80),
        inUse: Math.floor(95 + Math.random() * 45),
        maintenance: Math.floor(15 + Math.random() * 25)
      },
      quality: {
        overallScore: Math.floor(87 + Math.random() * 10),
        patientSafety: Math.floor(92 + Math.random() * 6),
        satisfaction: Math.round((4.2 + Math.random() * 0.6) * 10) / 10,
        safety: Math.floor(94 + Math.random() * 5),
        incidents: Math.floor(2 + Math.random() * 6),
        accreditations: [
          { name: 'Joint Commission', status: 'ACTIVE', expiry: '2025-12-15' },
          { name: 'MAGNET Recognition', status: 'ACTIVE', expiry: '2026-03-20' },
          { name: 'HIMSS Stage 7', status: 'PENDING', expiry: '2024-08-30' }
        ],
        complianceAreas: [
          { name: 'HIPAA Compliance', status: 'COMPLIANT', score: 96 },
          { name: 'FDA Regulations', status: 'COMPLIANT', score: 94 },
          { name: 'CMS Guidelines', status: 'REVIEW_REQUIRED', score: 88 }
        ],
        upcomingActivities: [
          { name: 'Safety Audit', date: '2024-07-15', type: 'AUDIT' },
          { name: 'Quality Review', date: '2024-07-22', type: 'REVIEW' }
        ],
        totalAccreditations: 3,
        activeCompliance: 2,
        daysToExpiry: 145,
        upcomingActivitiesCount: 2
      },
      qualityMetrics: {
        patientSatisfaction: Math.round((4.1 + Math.random() * 0.8) * 10) / 10,
        safetyIncidents: Math.floor(1 + Math.random() * 4),
        complianceScore: Math.floor(92 + Math.random() * 7),
        qualityIndicators: Math.floor(89 + Math.random() * 8)
      },
      performance: {
        throughput: Math.floor(1420 + Math.random() * 180),
        efficiency: Math.floor(87 + Math.random() * 10),
        turnaroundTime: Math.floor(42 + Math.random() * 18),
        resourceUtilization: Math.floor(84 + Math.random() * 12),
        bottlenecks: Math.floor(2 + Math.random() * 5)
      },
      clinicalOperations: {
        activeCases: totalPatients,
        surgicalSchedule: Math.floor(24 + Math.random() * 16),
        labResults: Math.floor(145 + Math.random() * 85),
        imagingStudies: Math.floor(65 + Math.random() * 35),
        activeStaff: onDutyStaff,
        scheduledProcedures: Math.floor(35 + Math.random() * 25),
        resourceUtilization: Math.floor(82 + Math.random() * 15),
        avgProcedureTime: Math.floor(125 + Math.random() * 65),
        equipmentStatus: Math.random() > 0.1 ? 'optimal' : 'warning',
        lastUpdated: currentDate
      },
      dataPipeline: {
        activeSources: Math.floor(8 + Math.random() * 7),
        processingSpeed: Math.floor(1350 + Math.random() * 300),
        errorRate: Math.round((Math.random() * 2.5) * 10) / 10,
        dataQuality: Math.round((94 + Math.random() * 5) * 10) / 10,
        syncStatus: Math.random() > 0.15 ? 'healthy' : (Math.random() > 0.5 ? 'warning' : 'error'),
        lastUpdated: currentDate
      },
      business: {
        revenue: Math.floor(145000 + Math.random() * 35000),
        revenueGrowth: Math.round((Math.random() * 15 - 2) * 10) / 10,
        patientSatisfaction: Math.round((4.1 + Math.random() * 0.8) * 10) / 10,
        operationalEfficiency: Math.floor(84 + Math.random() * 12),
        costPerPatient: Math.floor(2800 + Math.random() * 600),
        lastUpdated: currentDate
      },
      aiMetrics: {
        modelAccuracy: Math.round((91 + Math.random() * 7) * 10) / 10,
        automationSuccess: Math.floor(87 + Math.random() * 10),
        decisionsSupported: Math.floor(145 + Math.random() * 85),
        mlModelsActive: Math.floor(12 + Math.random() * 8),
        predictionConfidence: Math.round((86 + Math.random() * 12) * 10) / 10,
        lastUpdated: currentDate
      },
      systemHealth: {
        uptime: Math.round((99.2 + Math.random() * 0.7) * 100) / 100,
        performance: Math.floor(92 + Math.random() * 7),
        alerts: Math.floor(Math.random() * 8),
        connectivity: Math.floor(97 + Math.random() * 3),
        cpuUsage: Math.floor(35 + Math.random() * 25),
        memoryUsage: Math.floor(62 + Math.random() * 20),
        networkLatency: Math.floor(8 + Math.random() * 15),
        securityScore: Math.floor(94 + Math.random() * 5),
        lastUpdated: currentDate
      }
    };
  }

  generateMockDataSources() {
    return [
      {
        id: '1',
        name: 'Epic EHR Integration',
        type: 'EPIC' as const,
        status: 'ACTIVE' as const,
        health_score: 96,
        records_count: 2450000,
        last_sync: new Date(Date.now() - 300000).toISOString(), // 5 minutes ago
        created_at: new Date('2024-01-15').toISOString(),
        description: 'Primary Electronic Health Records system integration',
        tags: ['production', 'critical', 'ehr']
      },
      {
        id: '2',
        name: 'HL7 FHIR Gateway',
        type: 'HL7' as const,
        status: 'ACTIVE' as const,
        health_score: 94,
        records_count: 850000,
        last_sync: new Date(Date.now() - 600000).toISOString(), // 10 minutes ago
        created_at: new Date('2024-02-01').toISOString(),
        description: 'FHIR R4 compliant data gateway for interoperability',
        tags: ['production', 'fhir', 'interop']
      },
      {
        id: '3',
        name: 'Laboratory Information System',
        type: 'API' as const,
        status: 'ACTIVE' as const,
        health_score: 98,
        records_count: 1250000,
        last_sync: new Date(Date.now() - 180000).toISOString(), // 3 minutes ago
        created_at: new Date('2024-01-20').toISOString(),
        description: 'Lab results and test data integration',
        tags: ['production', 'labs', 'real-time']
      },
      {
        id: '4',
        name: 'Radiology PACS',
        type: 'API' as const,
        status: 'WARNING' as const,
        health_score: 87,
        records_count: 450000,
        last_sync: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        created_at: new Date('2024-02-10').toISOString(),
        description: 'Picture Archiving and Communication System integration',
        tags: ['production', 'imaging', 'pacs']
      },
      {
        id: '5',
        name: 'Financial Systems Export',
        type: 'CSV' as const,
        status: 'PAUSED' as const,
        health_score: 75,
        records_count: 125000,
        last_sync: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        created_at: new Date('2024-03-01').toISOString(),
        description: 'Daily financial data exports and billing information',
        tags: ['batch', 'financial', 'daily']
      }
    ];
  }

  generateMockMLModels() {
    return [
      {
        id: '1',
        name: 'ED Surge Predictor',
        type: 'Time Series Forecasting',
        status: 'ACTIVE',
        accuracy: 94.2,
        confidence: 91.8,
        last_trained: new Date(Date.now() - 604800000).toISOString(), // 1 week ago
        data_points: 2450000,
        version: '2.1.0'
      },
      {
        id: '2',
        name: 'Bed Demand Optimizer',
        type: 'Optimization',
        status: 'ACTIVE',
        accuracy: 88.7,
        confidence: 89.3,
        last_trained: new Date(Date.now() - 1209600000).toISOString(), // 2 weeks ago
        data_points: 1850000,
        version: '1.8.3'
      },
      {
        id: '3',
        name: 'Risk Stratification',
        type: 'Classification',
        status: 'TRAINING',
        accuracy: 92.1,
        confidence: 87.5,
        last_trained: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        data_points: 3200000,
        version: '3.0.0-beta'
      }
    ];
  }

  generateMockAlerts() {
    const alertTypes = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'] as const;
    const statuses = ['ACTIVE', 'ACKNOWLEDGED', 'RESOLVED'] as const;
    const sources = ['CAPACITY', 'EQUIPMENT', 'STAFFING', 'SAFETY', 'SYSTEM'] as const;
    
    return Array.from({ length: 25 }, (_, i) => ({
      id: `alert-${i + 1}`,
      title: this.generateAlertTitle(sources[i % sources.length]),
      message: this.generateAlertMessage(sources[i % sources.length]),
      severity: alertTypes[Math.floor(Math.random() * alertTypes.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      source_type: sources[i % sources.length],
      created_at: new Date(Date.now() - Math.random() * 604800000).toISOString(), // Random within last week
      resolved_at: Math.random() > 0.6 ? new Date(Date.now() - Math.random() * 86400000).toISOString() : null
    }));
  }

  private generateAlertTitle(source: string): string {
    const titles = {
      CAPACITY: ['High Patient Volume', 'Bed Shortage Alert', 'ICU Capacity Warning'],
      EQUIPMENT: ['Equipment Malfunction', 'Device Offline', 'Maintenance Required'],
      STAFFING: ['Staff Shortage', 'Overtime Alert', 'Coverage Gap'],
      SAFETY: ['Medication Error', 'Fall Risk Alert', 'Infection Control'],
      SYSTEM: ['System Performance', 'Data Sync Issue', 'Network Latency']
    };
    const options = titles[source as keyof typeof titles] || ['General Alert'];
    return options[Math.floor(Math.random() * options.length)];
  }

  private generateAlertMessage(source: string): string {
    const messages = {
      CAPACITY: 'Patient volume exceeding capacity thresholds in Emergency Department',
      EQUIPMENT: 'Critical equipment requires immediate attention or maintenance',
      STAFFING: 'Staffing levels below recommended ratios for current patient load',
      SAFETY: 'Patient safety event detected requiring immediate review',
      SYSTEM: 'System performance degradation affecting operational efficiency'
    };
    return messages[source as keyof typeof messages] || 'Alert requiring attention';
  }
}

export const mockDataGenerator = new MockDataGenerator();
