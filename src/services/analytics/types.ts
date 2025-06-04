
export interface ChartDataPoint {
  time: string;
  value: number;
  [key: string]: any;
}

export interface ChartData {
  waitTimes: ChartDataPoint[];
  patientFlow: ChartDataPoint[];
  staffAllocation: ChartDataPoint[];
  bedUtilization: ChartDataPoint[];
  processingThroughput: ChartDataPoint[];
  dataQuality: ChartDataPoint[];
  revenue: ChartDataPoint[];
  systemHealth: ChartDataPoint[];
  modelPerformance: ChartDataPoint[];
}

export interface EmergencyDepartmentData {
  totalPatients: number;
  avgWaitTime: number;
  bedUtilization: number;
  staffOnDuty: number;
  criticalAlerts: number;
  triageQueue: number;
  criticalPatients: number;
  lastUpdated: Date;
}

export interface BedData {
  total: number;
  occupied: number;
  available: number;
  outOfOrder: number;
  utilization: number;
}

export interface StaffingData {
  total: number;
  active: number;
  onDuty: number;
  onCall: number;
  scheduledNext: number;
  overtime: number;
}

export interface ClinicalData {
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
}

export interface EquipmentData {
  total: number;
  available: number;
  inUse: number;
  maintenance: number;
}

export interface FinancialData {
  revenue: number;
  revenuePerPatient: number;
  monthlyGrowth: number;
  yearOverYear: number;
}

export interface PerformanceData {
  throughput: number;
  efficiency: number;
  bottlenecks: number;
}

export interface ClinicalOperationsData {
  activeStaff: number;
  scheduledProcedures: number;
  resourceUtilization: number;
  avgProcedureTime: number;
  equipmentStatus: string;
  lastUpdated: Date;
}

export interface DataPipelineData {
  activeSources: number;
  processingSpeed: number;
  errorRate: number;
  dataQuality: number;
  syncStatus: string;
  lastUpdated: Date;
}

export interface BusinessData {
  revenue: number;
  revenueGrowth: number;
  patientSatisfaction: number;
  operationalEfficiency: number;
  costPerPatient: number;
  lastUpdated: Date;
}

export interface AIMetricsData {
  modelAccuracy: number;
  automationSuccess: number;
  decisionsSupported: number;
  mlModelsActive: number;
  predictionConfidence: number;
  lastUpdated: Date;
}

export interface SystemHealthData {
  cpuUsage: number;
  memoryUsage: number;
  networkLatency: number;
  uptime: number;
  securityScore: number;
  lastUpdated: Date;
}

export interface QualityData {
  incidents: number;
  satisfaction: number;
  safety: number;
  overallScore: number;
  patientSafety: number;
  accreditations: Array<{
    name: string;
    status: string;
    expiry: string;
    score: number;
    lastReview: string;
  }>;
  complianceAreas: Array<{
    area: string;
    compliance: number;
    target: number;
  }>;
  upcomingActivities: Array<{
    activity: string;
    date: string;
    type: string;
  }>;
  totalAccreditations: number;
  activeCompliance: number;
  daysToExpiry: number;
  upcomingActivitiesCount: number;
}

export interface AnalyticsData {
  chartData: ChartData;
  emergencyDepartment: EmergencyDepartmentData;
  beds: BedData;
  staffing: StaffingData;
  clinical: ClinicalData;
  equipment: EquipmentData;
  financial: FinancialData;
  performance: PerformanceData;
  clinicalOperations: ClinicalOperationsData;
  dataPipeline: DataPipelineData;
  business: BusinessData;
  aiMetrics: AIMetricsData;
  systemHealth: SystemHealthData;
  quality: QualityData;
}
