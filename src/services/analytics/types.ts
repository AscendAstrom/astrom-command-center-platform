
export interface ChartDataPoint {
  timestamp: string;
  value: number;
  label?: string;
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

export interface AccreditationData {
  name: string;
  status: string;
  expiry: string;
  score: number;
  lastReview: string;
}

export interface ComplianceArea {
  area: string;
  compliance: number;
  target: number;
}

export interface UpcomingActivity {
  activity: string;
  date: string;
  type: string;
}

export interface QualityData {
  accreditations: AccreditationData[];
  complianceAreas: ComplianceArea[];
  upcomingActivities: UpcomingActivity[];
  totalAccreditations: number;
  activeCompliance: number;
  daysToExpiry: number;
  upcomingActivitiesCount: number;
}

export interface AnalyticsData {
  chartData: ChartData;
  emergencyDepartment: {
    totalPatients: number;
    avgWaitTime: number;
    bedUtilization: number;
    staffOnDuty: number;
    criticalAlerts: number;
    lastUpdated: Date;
  };
  clinicalOperations: {
    activeStaff: number;
    scheduledProcedures: number;
    resourceUtilization: number;
    avgProcedureTime: number;
    equipmentStatus: 'optimal' | 'warning' | 'critical';
    lastUpdated: Date;
  };
  dataPipeline: {
    activeSources: number;
    processingSpeed: number;
    errorRate: number;
    dataQuality: number;
    syncStatus: 'healthy' | 'warning' | 'error';
    lastUpdated: Date;
  };
  business: {
    revenue: number;
    revenueGrowth: number;
    patientSatisfaction: number;
    operationalEfficiency: number;
    costPerPatient: number;
    lastUpdated: Date;
  };
  aiMetrics: {
    modelAccuracy: number;
    automationSuccess: number;
    decisionsSupported: number;
    mlModelsActive: number;
    predictionConfidence: number;
    lastUpdated: Date;
  };
  systemHealth: {
    cpuUsage: number;
    memoryUsage: number;
    networkLatency: number;
    uptime: number;
    securityScore: number;
    lastUpdated: Date;
  };
  quality: QualityData;
}
