
import { AnalyticsData, ChartDataPoint } from './types';

export class MockDataGenerator {
  generateMockAnalyticsData(): AnalyticsData {
    const now = new Date();
    const timePoints = Array.from({ length: 24 }, (_, i) => {
      const time = new Date(now.getTime() - (23 - i) * 60 * 60 * 1000);
      return time.toISOString();
    });

    return {
      chartData: {
        waitTimes: timePoints.map((timestamp, i) => ({
          timestamp,
          value: 15 + Math.sin(i * 0.3) * 8 + Math.random() * 5,
          label: 'Wait Time (minutes)'
        })),
        patientFlow: timePoints.map((timestamp, i) => ({
          timestamp,
          value: 45 + Math.sin(i * 0.2) * 15 + Math.random() * 10,
          label: 'Patients/hour'
        })),
        staffAllocation: timePoints.map((timestamp, i) => ({
          timestamp,
          value: 85 + Math.sin(i * 0.1) * 10 + Math.random() * 5,
          label: 'Staff Utilization %'
        })),
        bedUtilization: timePoints.map((timestamp, i) => ({
          timestamp,
          value: 78 + Math.sin(i * 0.15) * 12 + Math.random() * 6,
          label: 'Bed Utilization %'
        })),
        processingThroughput: timePoints.map((timestamp, i) => ({
          timestamp,
          value: 1200 + Math.sin(i * 0.25) * 300 + Math.random() * 100,
          label: 'Records/min'
        })),
        dataQuality: timePoints.map((timestamp, i) => ({
          timestamp,
          value: 94 + Math.sin(i * 0.05) * 3 + Math.random() * 2,
          label: 'Quality Score %'
        })),
        revenue: timePoints.map((timestamp, i) => ({
          timestamp,
          value: 12000 + Math.sin(i * 0.4) * 2000 + Math.random() * 500,
          label: 'Revenue (SAR)'
        })),
        systemHealth: timePoints.map((timestamp, i) => ({
          timestamp,
          value: 96 + Math.sin(i * 0.08) * 2 + Math.random() * 1,
          label: 'System Health %'
        })),
        modelPerformance: timePoints.map((timestamp, i) => ({
          timestamp,
          value: 91 + Math.sin(i * 0.12) * 4 + Math.random() * 2,
          label: 'Model Accuracy %'
        }))
      },
      emergencyDepartment: {
        totalPatients: 47,
        avgWaitTime: 23,
        bedUtilization: 78,
        staffOnDuty: 32,
        triageQueue: 8,
        criticalPatients: 3,
        criticalAlerts: 1,
        lastUpdated: now.toISOString()
      },
      beds: {
        total: 450,
        occupied: 352,
        available: 78,
        outOfOrder: 20,
        utilization: 78.2
      },
      staffing: {
        total: 1250,
        onDuty: 432,
        active: 398,
        onCall: 145,
        overtime: 28,
        scheduledNext: 178
      },
      equipment: {
        total: 890,
        available: 756,
        inUse: 89,
        maintenance: 45
      },
      clinical: {
        totalPatients: 352,
        activeTreatments: 298,
        completedProcedures: 156,
        pendingDischarges: 34,
        surgeries: {
          total: 28,
          scheduled: 12,
          completed: 15,
          avgDuration: 145
        },
        vitals: {
          monitored: 287,
          critical: 12,
          abnormal: 45
        },
        medications: {
          adherence: 94.2,
          criticalMeds: 23,
          missedDoses: 7
        },
        labs: {
          totalTests: 234,
          avgTurnaround: 45,
          criticalAlerts: 4
        }
      },
      financial: {
        dailyRevenue: 1250000,
        pendingBilling: 187500,
        insuranceClaims: 89,
        costCenter: 890000,
        revenue: 1250000,
        revenuePerPatient: 3551,
        monthlyGrowth: 12.5,
        yearOverYear: 8.3
      },
      performance: {
        throughput: 1450,
        efficiency: 87.3,
        turnaroundTime: 32,
        resourceUtilization: 82.1,
        bottlenecks: 3
      },
      clinicalOperations: {
        activeCases: 298,
        surgicalSchedule: 12,
        labResults: 156,
        imagingStudies: 67,
        activeStaff: 432,
        scheduledProcedures: 23,
        resourceUtilization: 82.1,
        avgProcedureTime: 45,
        equipmentStatus: 'optimal',
        lastUpdated: now
      },
      quality: {
        overallScore: 92.5,
        patientSafety: 96.2,
        satisfaction: 88.7,
        safety: 96.2,
        incidents: 2,
        accreditations: [
          { name: 'CBAHI Accreditation', status: 'Active', expiryDate: '2025-12-31' },
          { name: 'ISO 9001:2015', status: 'Active', expiryDate: '2025-08-15' },
          { name: 'JCAHO International', status: 'Pending', expiryDate: '2024-11-30' }
        ],
        complianceAreas: [
          { name: 'Patient Safety Standards', status: 'Compliant', lastReview: '2024-05-15' },
          { name: 'Data Protection (PDPL)', status: 'Compliant', lastReview: '2024-06-01' },
          { name: 'Clinical Governance', status: 'In Progress', lastReview: '2024-04-20' }
        ],
        upcomingActivities: [
          { name: 'Annual Safety Audit', date: '2024-07-15', type: 'Internal Audit' },
          { name: 'CBAHI Surveillance', date: '2024-08-30', type: 'External Review' },
          { name: 'Staff Training Update', date: '2024-07-01', type: 'Training' }
        ],
        totalAccreditations: 8,
        activeCompliance: 15,
        daysToExpiry: 45,
        upcomingActivitiesCount: 5
      },
      qualityMetrics: {
        patientSatisfaction: 88.7,
        safetyIncidents: 2,
        complianceScore: 94.1,
        qualityIndicators: 12
      },
      systemHealth: {
        uptime: 99.8,
        performance: 94.2,
        alerts: 3,
        connectivity: 98.5,
        cpuUsage: 45,
        memoryUsage: 67,
        networkLatency: 12,
        securityScore: 96,
        lastUpdated: now
      },
      dataPipeline: {
        activeSources: 8,
        processingSpeed: 1250,
        errorRate: 0.3,
        dataQuality: 94.8,
        syncStatus: 'healthy',
        lastUpdated: now
      },
      business: {
        revenue: 1250000,
        revenueGrowth: 12.5,
        patientSatisfaction: 88.7,
        operationalEfficiency: 91.3,
        costPerPatient: 2529,
        lastUpdated: now
      },
      aiMetrics: {
        modelAccuracy: 94.2,
        automationSuccess: 87.5,
        decisionsSupported: 156,
        mlModelsActive: 4,
        predictionConfidence: 89.3,
        lastUpdated: now
      }
    };
  }

  generateMockDataSources() {
    return [
      {
        id: '1',
        name: 'Saudi MOH FHIR Gateway',
        type: 'FHIR_R4',
        status: 'ACTIVE',
        health: 96,
        lastSync: '2 min ago',
        description: 'Ministry of Health FHIR R4 compliant data gateway',
        recordsCount: 2500000,
        errorRate: 0.02
      },
      {
        id: '2',
        name: 'Riyadh General Hospital EHR',
        type: 'HL7_V2',
        status: 'ACTIVE',
        health: 94,
        lastSync: '5 min ago',
        description: 'Main hospital EHR system with patient records',
        recordsCount: 890000,
        errorRate: 0.01
      },
      {
        id: '3',
        name: 'King Fahd Hospital Labs',
        type: 'LIS',
        status: 'ACTIVE',
        health: 98,
        lastSync: '1 min ago',
        description: 'Laboratory Information System for test results',
        recordsCount: 450000,
        errorRate: 0.03
      },
      {
        id: '4',
        name: 'PACS Imaging Network',
        type: 'DICOM',
        status: 'WARNING',
        health: 87,
        lastSync: '45 min ago',
        description: 'Picture Archiving and Communication System',
        recordsCount: 125000,
        errorRate: 0.08
      },
      {
        id: '5',
        name: 'Pharmacy Management System',
        type: 'CUSTOM_API',
        status: 'ACTIVE',
        health: 91,
        lastSync: '8 min ago',
        description: 'Medication dispensing and inventory management',
        recordsCount: 67000,
        errorRate: 0.05
      }
    ];
  }

  generateMockMLModels() {
    return [
      {
        id: '1',
        name: 'Patient Flow Predictor',
        type: 'Time Series Forecasting',
        accuracy: 94.2,
        status: 'ACTIVE',
        lastTrained: '2 days ago',
        predictions: 1245,
        confidence: 89.3
      },
      {
        id: '2',
        name: 'Bed Demand Forecaster',
        type: 'Regression',
        accuracy: 91.7,
        status: 'ACTIVE',
        lastTrained: '1 week ago',
        predictions: 892,
        confidence: 87.1
      },
      {
        id: '3',
        name: 'Emergency Severity Classifier',
        type: 'Classification',
        accuracy: 96.8,
        status: 'TRAINING',
        lastTrained: '3 hours ago',
        predictions: 567,
        confidence: 92.4
      },
      {
        id: '4',
        name: 'Drug Interaction Detector',
        type: 'Deep Learning',
        accuracy: 98.1,
        status: 'ACTIVE',
        lastTrained: '5 days ago',
        predictions: 234,
        confidence: 95.7
      }
    ];
  }

  generateMockAlerts() {
    return [
      {
        id: '1',
        title: 'High Emergency Department Wait Time',
        message: 'Average wait time has exceeded 30 minutes threshold',
        severity: 'HIGH',
        status: 'ACTIVE',
        timestamp: new Date(Date.now() - 300000),
        source: 'Emergency Department Monitor'
      },
      {
        id: '2',
        title: 'Bed Capacity Warning',
        message: 'ICU bed utilization at 95% capacity',
        severity: 'MEDIUM',
        status: 'ACKNOWLEDGED',
        timestamp: new Date(Date.now() - 1200000),
        source: 'Bed Management System'
      },
      {
        id: '3',
        title: 'Data Quality Issue',
        message: 'Lab results data completeness below 95% threshold',
        severity: 'LOW',
        status: 'RESOLVED',
        timestamp: new Date(Date.now() - 3600000),
        source: 'Data Quality Monitor'
      }
    ];
  }
}

export const mockDataGenerator = new MockDataGenerator();
