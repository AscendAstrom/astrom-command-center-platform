
export type ViewUserRole = 'ADMIN' | 'ANALYST' | 'VIEWER' | 'DATA_ENGINEER';

export type ChartType = 'bar' | 'pie' | 'line' | 'area' | 'donut';
export type RefreshInterval = 15 | 30 | 60 | 300; // seconds
export type ExportFormat = 'pdf' | 'csv' | 'png';

export interface SemanticTerm {
  id: string;
  name: string;
  description: string;
  formula: string;
  unit: string;
  category: string;
  dataSource: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardWidget {
  id: string;
  type: 'zone_tile' | 'patient_timer' | 'chart' | 'metric_card';
  title: string;
  position: { x: number; y: number; w: number; h: number };
  config: {
    chartType?: ChartType;
    dataSource?: string;
    filters?: Record<string, any>;
    refreshInterval?: RefreshInterval;
    showDrillDown?: boolean;
  };
  semanticTerms: string[];
}

export interface Dashboard {
  id: string;
  name: string;
  description: string;
  targetAudience: 'ed_managers' | 'ops_staff' | 'executives';
  widgets: DashboardWidget[];
  autoRefresh: RefreshInterval;
  isPublic: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ZoneTileData {
  zoneId: string;
  zoneName: string;
  status: 'normal' | 'warning' | 'critical';
  occupancy: number;
  capacity: number;
  avgWaitTime: number;
  alertCount: number;
}

export interface PatientTimerData {
  patientId: string;
  zoneName: string;
  arrivalTime: string;
  currentWaitTime: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'waiting' | 'in_progress' | 'completed';
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string[];
    borderColor?: string;
  }[];
}

export interface DrillDownContext {
  widget: DashboardWidget;
  filters: Record<string, any>;
  timeRange: { start: string; end: string };
}
