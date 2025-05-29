
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, AlertCircle } from 'lucide-react';

interface Feature {
  name: string;
  module: string;
  status: 'complete' | 'partial' | 'missing';
  description: string;
  components: string[];
}

const FeatureMatrix = () => {
  const features: Feature[] = [
    {
      name: 'Dashboard Management',
      module: 'ASTRO-VIEW',
      status: 'complete',
      description: 'Create, edit, and manage interactive dashboards',
      components: ['DashboardManager', 'RealtimeDashboard', 'SemanticLayerBuilder']
    },
    {
      name: 'Data Pipeline Management',
      module: 'ASTRO-BRICKS',
      status: 'complete',
      description: 'Build and manage data transformation pipelines',
      components: ['DataPipelineManager', 'DataMappingCanvas', 'SchemaVisualization', 'TransformationRulesEditor', 'TimestampTools']
    },
    {
      name: 'Data Source Integration',
      module: 'ASTRO-SCAN',
      status: 'complete',
      description: 'Connect and manage various data sources',
      components: ['DataSourceList', 'IngestionDashboard', 'MonitoringTabContent', 'EnterpriseIntegrationHub']
    },
    {
      name: 'KPI & Metrics Management',
      module: 'ASTRO-METRICS',
      status: 'complete',
      description: 'Define and track key performance indicators',
      components: ['KPIDictionary', 'MetricBuilder', 'SLAConfiguration', 'AlertsManager', 'AccessControl']
    },
    {
      name: 'Workflow Automation',
      module: 'ASTRO-FLOW',
      status: 'complete',
      description: 'Automate business processes and workflows',
      components: ['RuleBuilder', 'WorkflowOverview', 'AIModelService', 'AlertSubscriptions']
    },
    {
      name: 'AI & Machine Learning',
      module: 'AI-ECOSYSTEM',
      status: 'complete',
      description: 'Advanced AI and ML capabilities',
      components: ['AIOrchestrator', 'PredictiveAnalyticsEngine', 'AdvancedMLPlatform', 'CognitiveAnalyticsPlatform']
    },
    {
      name: 'User Authentication',
      module: 'AUTH',
      status: 'complete',
      description: 'Secure user authentication and authorization',
      components: ['AuthGuard', 'UserMenu', 'AuthContext']
    },
    {
      name: 'Real-time Notifications',
      module: 'NOTIFICATIONS',
      status: 'complete',
      description: 'Real-time alerts and notification system',
      components: ['AlertPanel', 'Toast notifications', 'User notifications']
    },
    {
      name: 'Bed Management',
      module: 'HEALTHCARE',
      status: 'complete',
      description: 'Hospital bed tracking and management',
      components: ['BedManagementTable', 'RealTimeBedManagementTable', 'PatientFlow']
    },
    {
      name: 'Data Quality Monitoring',
      module: 'DATA-QUALITY',
      status: 'complete',
      description: 'Monitor and ensure data quality standards',
      components: ['DataQualityScoring', 'Quality metrics', 'Data validation']
    },
    {
      name: 'API Gateway',
      module: 'INTEGRATION',
      status: 'complete',
      description: 'Manage external API integrations',
      components: ['ApiGatewayTab', 'Integration management', 'Endpoint monitoring']
    },
    {
      name: 'Security & Compliance',
      module: 'SECURITY',
      status: 'complete',
      description: 'Security monitoring and compliance tracking',
      components: ['SecurityComplianceIntelligence', 'Audit logs', 'RLS policies']
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'partial': return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'missing': return <Circle className="h-5 w-5 text-gray-400" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete': return 'bg-green-500/20 text-green-700 border-green-500/20';
      case 'partial': return 'bg-yellow-500/20 text-yellow-700 border-yellow-500/20';
      case 'missing': return 'bg-gray-500/20 text-gray-700 border-gray-500/20';
      default: return 'bg-gray-500/20 text-gray-700 border-gray-500/20';
    }
  };

  const completionStats = {
    complete: features.filter(f => f.status === 'complete').length,
    partial: features.filter(f => f.status === 'partial').length,
    missing: features.filter(f => f.status === 'missing').length,
    total: features.length
  };

  const completionPercentage = Math.round((completionStats.complete / completionStats.total) * 100);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Feature Implementation Matrix</CardTitle>
          <div className="flex items-center gap-4 text-sm">
            <span>Completion: {completionPercentage}%</span>
            <span className="text-green-600">{completionStats.complete} Complete</span>
            <span className="text-yellow-600">{completionStats.partial} Partial</span>
            <span className="text-gray-600">{completionStats.missing} Missing</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {features.map((feature, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(feature.status)}
                    <div>
                      <h3 className="font-semibold">{feature.name}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{feature.module}</Badge>
                    <Badge className={getStatusColor(feature.status)}>
                      {feature.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {feature.components.map((component, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {component}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeatureMatrix;
