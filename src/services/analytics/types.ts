
export interface EmergencyDepartmentMetrics {
  totalPatients: number;
  avgWaitTime: number;
  bedUtilization: number;
  staffOnDuty: number;
  criticalAlerts: number;
  lastUpdated: Date;
}

export interface ClinicalOperationsMetrics {
  activeStaff: number;
  scheduledProcedures: number;
  resourceUtilization: number;
  avgProcedureTime: number;
  equipmentStatus: 'optimal' | 'warning' | 'critical';
  lastUpdated: Date;
}

export interface DataPipelineMetrics {
  activeSources: number;
  processingSpeed: number;
  errorRate: number;
  dataQuality: number;
  syncStatus: 'healthy' | 'warning' | 'error';
  lastUpdated: Date;
}

export interface BusinessMetrics {
  revenue: number;
  revenueGrowth: number;
  patientSatisfaction: number;
  operationalEfficiency: number;
  costPerPatient: number;
  lastUpdated: Date;
}

export interface SystemHealthMetrics {
  cpuUsage: number;
  memoryUsage: number;
  networkLatency: number;
  uptime: number;
  securityScore: number;
  lastUpdated: Date;
}

export interface AIMetrics {
  modelAccuracy: number;
  automationSuccess: number;
  decisionsSupported: number;
  mlModelsActive: number;
  predictionConfidence: number;
  lastUpdated: Date;
}

export interface ChartDataPoint {
  time: string;
  [key: string]: any;
}

export interface AnalyticsData {
  emergencyDepartment: EmergencyDepartmentMetrics;
  clinicalOperations: ClinicalOperationsMetrics;
  dataPipeline: DataPipelineMetrics;
  business: BusinessMetrics;
  systemHealth: SystemHealthMetrics;
  aiMetrics: AIMetrics;
  chartData: {
    waitTimes: ChartDataPoint[];
    patientFlow: ChartDataPoint[];
    staffAllocation: any[];
    bedUtilization: any[];
    processingThroughput: ChartDataPoint[];
    dataQuality: ChartDataPoint[];
    revenue: ChartDataPoint[];
    systemHealth: ChartDataPoint[];
    modelPerformance: ChartDataPoint[];
  };
}
