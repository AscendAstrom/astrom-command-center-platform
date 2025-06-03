
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
  overallScore: number;
  patientSafety: number;
  satisfaction: number;
  incidents: number;
  accreditations: AccreditationData[];
  complianceAreas: ComplianceArea[];
  upcomingActivities: UpcomingActivity[];
  totalAccreditations: number;
  activeCompliance: number;
  daysToExpiry: number;
  upcomingActivitiesCount: number;
}

export interface BedMetrics {
  total: number;
  occupied: number;
  available: number;
  outOfOrder: number;
  utilization: number;
}

export interface StaffMetrics {
  total: number;
  onDuty: number;
  active: number;
  onCall: number;
  overtime: number;
  scheduledNext: number;
}

export interface ClinicalMetrics {
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

export interface EquipmentMetrics {
  total: number;
  available: number;
  inUse: number;
  maintenance: number;
}

export interface FinancialMetrics {
  revenue: number;
  revenuePerPatient: number;
  monthlyGrowth: number;
  yearOverYear: number;
}

export interface PerformanceMetrics {
  throughput: number;
  efficiency: number;
  bottlenecks: number;
}

export interface AnalyticsData {
  chartData: ChartData;
  emergencyDepartment: {
    totalPatients: number;
    avgWaitTime: number;
    bedUtilization: number;
    staffOnDuty: number;
    criticalAlerts: number;
    triageQueue: number;
    criticalPatients: number;
    lastUpdated: Date;
  };
  beds: BedMetrics;
  staffing: StaffMetrics;
  clinical: ClinicalMetrics;
  equipment: EquipmentMetrics;
  financial: FinancialMetrics;
  performance: PerformanceMetrics;
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
