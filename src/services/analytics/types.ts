
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

export interface ClinicalData {
  totalPatients: number;
  activeTreatments: number;
  completedProcedures: number;
  pendingDischarges: number;
}

export interface FinancialData {
  dailyRevenue: number;
  pendingBilling: number;
  insuranceClaims: number;
  costCenter: number;
}

export interface PerformanceData {
  throughput: number;
  efficiency: number;
  turnaroundTime: number;
  resourceUtilization: number;
}

export interface ClinicalOperationsData {
  activeCases: number;
  surgicalSchedule: number;
  labResults: number;
  imagingStudies: number;
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
  qualityMetrics: QualityMetricsData;
  systemHealth: SystemHealthData;
}
