
export interface IntegrationMetrics {
  activeConnections: number;
  dataVolume: string;
  syncStatus: number;
  errorRate: number;
}

export interface WorkflowMetrics {
  activeWorkflows: number;
  completedToday: number;
  averageProcessingTime: number;
  automationRate: number;
}

export interface WorkflowPerformance {
  name: string;
  completion: number;
  efficiency: string;
  isActive?: boolean;
}

export interface GovernanceMetrics {
  complianceScore: number;
  policiesActive: number;
  auditTrails: number;
  riskLevel: string;
}

export interface FederationMetrics {
  connectedOrganizations: number;
  sharedDatasets: number;
  crossOrgQueries: number;
  federationHealth: number;
}

export interface ApiMetrics {
  totalRequests: number;
  averageLatency: string;
  uptime: number;
  activeEndpoints: number;
}

export interface IntegrationStatus {
  name: string;
  status: 'active' | 'maintenance' | 'error';
  uptime: number;
  throughput: string;
  type: string;
}

export interface FederationFacility {
  facility: string;
  systems: string;
  status: 'synced' | 'syncing' | 'error';
  latency: string;
}

export interface SecurityControl {
  name: string;
  status: 'active' | 'inactive';
  score: number;
}

export interface ComplianceItem {
  name: string;
  status: 'compliant' | 'non-compliant';
  lastAudit: string;
}
