
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, Network, Activity, Settings, Zap, AlertTriangle } from 'lucide-react';

interface AIModule {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'error';
  agentCount: number;
  lastActivity: string;
  performance: number;
}

interface CrossModuleEvent {
  id: string;
  sourceModule: string;
  targetModule: string;
  eventType: string;
  description: string;
  timestamp: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
}

const AIOrchestrator = () => {
  const [modules, setModules] = useState<AIModule[]>([
    {
      id: 'astro-scan',
      name: 'ASTRO-SCAN',
      status: 'active',
      agentCount: 4,
      lastActivity: '2 min ago',
      performance: 94
    },
    {
      id: 'astro-flow',
      name: 'ASTRO-FLOW',
      status: 'active',
      agentCount: 6,
      lastActivity: '1 min ago',
      performance: 92
    },
    {
      id: 'astro-metrics',
      name: 'ASTRO-METRICS',
      status: 'active',
      agentCount: 4,
      lastActivity: '30 sec ago',
      performance: 96
    },
    {
      id: 'astro-view',
      name: 'ASTRO-VIEW',
      status: 'active',
      agentCount: 3,
      lastActivity: '45 sec ago',
      performance: 89
    }
  ]);

  const [crossModuleEvents, setCrossModuleEvents] = useState<CrossModuleEvent[]>([
    {
      id: '1',
      sourceModule: 'ASTRO-SCAN',
      targetModule: 'ASTRO-FLOW',
      eventType: 'Data Quality Alert',
      description: 'Low data quality detected, triggering workflow adjustment',
      timestamp: '2 min ago',
      status: 'completed'
    },
    {
      id: '2',
      sourceModule: 'ASTRO-METRICS',
      targetModule: 'ASTRO-VIEW',
      eventType: 'KPI Breach',
      description: 'SLA threshold exceeded, updating dashboard alerts',
      timestamp: '5 min ago',
      status: 'processing'
    },
    {
      id: '3',
      sourceModule: 'ASTRO-FLOW',
      targetModule: 'ASTRO-SCAN',
      eventType: 'Surge Prediction',
      description: 'Patient surge predicted, requesting increased data frequency',
      timestamp: '8 min ago',
      status: 'completed'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getEventStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 border-green-400';
      case 'processing': return 'text-blue-400 border-blue-400';
      case 'pending': return 'text-yellow-400 border-yellow-400';
      case 'failed': return 'text-red-400 border-red-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const totalAgents = modules.reduce((sum, module) => sum + module.agentCount, 0);
  const avgPerformance = Math.round(modules.reduce((sum, module) => sum + module.performance, 0) / modules.length);

  return (
    <div className="space-y-6">
      {/* AI Ecosystem Overview */}
      <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-400" />
            AI Ecosystem Command Center
          </CardTitle>
          <CardDescription>
            Centralized orchestration and monitoring of all AI agents across modules
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{totalAgents}</div>
              <div className="text-sm text-muted-foreground">Total AI Agents</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{modules.filter(m => m.status === 'active').length}</div>
              <div className="text-sm text-muted-foreground">Active Modules</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{avgPerformance}%</div>
              <div className="text-sm text-muted-foreground">Avg Performance</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">{crossModuleEvents.length}</div>
              <div className="text-sm text-muted-foreground">Active Events</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Module Status Grid */}
        <Card className="bg-card/80 border-border backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Network className="h-5 w-5 text-blue-400" />
              Module Network Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {modules.map((module) => (
              <div key={module.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(module.status)}`} />
                  <div>
                    <div className="font-medium text-foreground">{module.name}</div>
                    <div className="text-sm text-muted-foreground">{module.agentCount} agents • {module.lastActivity}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">{module.performance}%</div>
                  <div className="text-xs text-muted-foreground">Performance</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Cross-Module Events */}
        <Card className="bg-card/80 border-border backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-400" />
              Cross-Module Communication
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {crossModuleEvents.map((event) => (
              <div key={event.id} className="p-3 bg-muted/50 rounded-lg border border-border/50">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">{event.sourceModule}</Badge>
                    <span className="text-muted-foreground">→</span>
                    <Badge variant="outline" className="text-xs">{event.targetModule}</Badge>
                  </div>
                  <Badge variant="outline" className={`text-xs ${getEventStatusColor(event.status)}`}>
                    {event.status}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-foreground">{event.eventType}</div>
                  <div className="text-xs text-muted-foreground">{event.description}</div>
                  <div className="text-xs text-muted-foreground">{event.timestamp}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* AI Command Controls */}
      <Card className="bg-card/80 border-border backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Settings className="h-5 w-5 text-orange-400" />
            AI Orchestration Controls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Zap className="h-4 w-4 mr-2" />
              Optimize All Agents
            </Button>
            <Button variant="outline">
              <Brain className="h-4 w-4 mr-2" />
              Run Diagnostics
            </Button>
            <Button variant="outline">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Emergency Override
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIOrchestrator;
