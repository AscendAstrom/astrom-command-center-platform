
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

export interface EmergencyDepartmentData {
  totalPatients: number;
  avgWaitTime: number;
  bedUtilization: number;
  staffOnDuty: number;
  triageQueue: number;
  criticalPatients: number;
  criticalAlerts: number;
  lastUpdated: string;
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
  onDuty: number;
  active: number;
  onCall: number;
  overtime: number;
  scheduledNext: number;
}

export interface EquipmentData {
  total: number;
  available: number;
  inUse: number;
  maintenance: number;
}

export interface VitalsData {
  monitored: number;
  critical: number;
  abnormal: number;
}

export interface SurgeriesData {
  total: number;
  scheduled: number;
  completed: number;
  avgDuration: number;
}

export interface MedicationsData {
  adherence: number;
  criticalMeds: number;
  missedDoses: number;
}

export interface LabsData {
  totalTests: number;
  avgTurnaround: number;
  criticalAlerts: number;
}

export interface ClinicalData {
  totalPatients: number;
  activeTreatments: number;
  completedProcedures: number;
  pendingDischarges: number;
  surgeries: SurgeriesData;
  vitals: VitalsData;
  medications: MedicationsData;
  labs: LabsData;
}

export interface FinancialData {
  dailyRevenue: number;
  pendingBilling: number;
  insuranceClaims: number;
  costCenter: number;
  revenue: number;
  revenuePerPatient: number;
  monthlyGrowth: number;
  yearOverYear: number;
}

export interface PerformanceData {
  throughput: number;
  efficiency: number;
  turnaroundTime: number;
  resourceUtilization: number;
  bottlenecks: number;
}

export interface ClinicalOperationsData {
  activeCases: number;
  surgicalSchedule: number;
  labResults: number;
  imagingStudies: number;
  activeStaff: number;
  scheduledProcedures: number;
  resourceUtilization: number;
  avgProcedureTime: number;
  equipmentStatus: string;
  lastUpdated: Date;
}

export interface QualityData {
  overallScore: number;
  patientSafety: number;
  satisfaction: number;
  safety: number;
  incidents: number;
  accreditations: any[];
  complianceAreas: any[];
  upcomingActivities: any[];
  totalAccreditations: number;
  activeCompliance: number;
  daysToExpiry: number;
  upcomingActivitiesCount: number;
}

export interface QualityMetricsData {
  patientSatisfaction: number;
  safetyIncidents: number;
  complianceScore: number;
  qualityIndicators: number;
}

export interface SystemHealthData {
  uptime: number;
  performance: number;
  alerts: number;
  connectivity: number;
  cpuUsage: number;
  memoryUsage: number;
  networkLatency: number;
  securityScore: number;
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

export interface AnalyticsData {
  chartData: ChartData;
  emergencyDepartment: EmergencyDepartmentData;
  beds: BedData;
  staffing: StaffingData;
  equipment: EquipmentData;
  clinical: ClinicalData;
  financial: FinancialData;
  performance: PerformanceData;
  clinicalOperations: ClinicalOperationsData;
  quality: QualityData;
  qualityMetrics: QualityMetricsData;
  systemHealth: SystemHealthData;
  dataPipeline: DataPipelineData;
  business: BusinessData;
  aiMetrics: AIMetricsData;
}
