
export interface IntegrationStatus {
  name: string;
  type: string;
  status: 'active' | 'maintenance' | 'error';
  uptime: number;
  throughput: string;
}

export interface WorkflowMetrics {
  activeWorkflows: number;
  completedToday: number;
  averageProcessingTime: string;
  automationRate: number;
}

export interface WorkflowPerformance {
  name: string;
  completion: number;
  efficiency: string;
}

export interface SecurityControl {
  name: string;
  status: string;
  score: number;
}

export interface ComplianceItem {
  name: string;
  status: string;
  lastAudit: string;
}

export interface FederationFacility {
  facility: string;
  systems: string;
  status: 'synced' | 'syncing';
  latency: string;
}
