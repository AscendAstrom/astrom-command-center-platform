
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
