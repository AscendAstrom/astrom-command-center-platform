
import { useState, useEffect, useCallback } from 'react';
import { toast } from "sonner";
import { crossModuleIntegrationService } from '@/services/crossModuleIntegration';

export interface ModuleConnection {
  moduleId: string;
  moduleName: string;
  status: 'connected' | 'disconnected' | 'error';
  lastSync: Date | null;
  dataFlow: 'bidirectional' | 'inbound' | 'outbound';
  healthScore: number;
}

export interface CrossModuleData {
  workflows: any[];
  automationRules: any[];
  dashboards: any[];
  pipelines: any[];
  metrics: {
    totalConnections: number;
    activeDataFlows: number;
    syncAccuracy: number;
    latency: number;
  };
}

export const useCrossModuleIntegration = () => {
  const [connections, setConnections] = useState<ModuleConnection[]>([]);
  const [crossModuleData, setCrossModuleData] = useState<CrossModuleData | null>(null);
  const [isIntegrating, setIsIntegrating] = useState(false);
  const [integrationHealth, setIntegrationHealth] = useState(95);

  // Initialize module connections
  useEffect(() => {
    const initializeConnections = async () => {
      const initialConnections: ModuleConnection[] = [
        {
          moduleId: 'astro-flow',
          moduleName: 'AstroFlow Automation',
          status: 'connected',
          lastSync: new Date(),
          dataFlow: 'bidirectional',
          healthScore: 98
        },
        {
          moduleId: 'astro-view',
          moduleName: 'AstroView Dashboards',
          status: 'connected',
          lastSync: new Date(),
          dataFlow: 'outbound',
          healthScore: 94
        },
        {
          moduleId: 'astro-bricks',
          moduleName: 'AstroBricks Pipelines',
          status: 'connected',
          lastSync: new Date(),
          dataFlow: 'inbound',
          healthScore: 92
        },
        {
          moduleId: 'astro-metrics',
          moduleName: 'AstroMetrics Analytics',
          status: 'connected',
          lastSync: new Date(),
          dataFlow: 'bidirectional',
          healthScore: 96
        }
      ];

      setConnections(initialConnections);
    };

    initializeConnections();
  }, []);

  // Sync cross-module data
  const syncCrossModuleData = useCallback(async () => {
    setIsIntegrating(true);
    try {
      const data = await crossModuleIntegrationService.getCrossModuleData();
      setCrossModuleData(data);
      
      // Update connection status
      setConnections(prev => prev.map(conn => ({
        ...conn,
        lastSync: new Date(),
        status: 'connected'
      })));

      toast.success("Cross-module data synchronized successfully");
    } catch (error) {
      console.error('Cross-module sync failed:', error);
      toast.error("Failed to sync cross-module data");
    } finally {
      setIsIntegrating(false);
    }
  }, []);

  // Trigger workflow automation integration
  const triggerWorkflowAutomation = useCallback(async (workflowId: string, automationRuleId: string) => {
    try {
      // Simulate integration trigger
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(`Workflow ${workflowId} integrated with automation rule ${automationRuleId}`);
      return true;
    } catch (error) {
      console.error('Workflow automation integration failed:', error);
      toast.error("Failed to integrate workflow with automation");
      return false;
    }
  }, []);

  // Connect pipeline to workflow
  const connectPipelineToWorkflow = useCallback(async (pipelineId: string, workflowId: string) => {
    try {
      // Simulate pipeline connection
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast.success(`Pipeline ${pipelineId} connected to workflow ${workflowId}`);
      return true;
    } catch (error) {
      console.error('Pipeline workflow connection failed:', error);
      toast.error("Failed to connect pipeline to workflow");
      return false;
    }
  }, []);

  // Stream data to dashboard
  const streamToDashboard = useCallback(async (workflowId: string, dashboardId: string) => {
    try {
      // Simulate data streaming
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast.success(`Workflow ${workflowId} now streaming to dashboard ${dashboardId}`);
      return true;
    } catch (error) {
      console.error('Dashboard streaming failed:', error);
      toast.error("Failed to stream workflow data to dashboard");
      return false;
    }
  }, []);

  // Auto-sync every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      syncCrossModuleData();
    }, 30000);

    return () => clearInterval(interval);
  }, [syncCrossModuleData]);

  return {
    connections,
    crossModuleData,
    isIntegrating,
    integrationHealth,
    syncCrossModuleData,
    triggerWorkflowAutomation,
    connectPipelineToWorkflow,
    streamToDashboard
  };
};
