
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Activity, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Database,
  TrendingUp,
  Zap
} from 'lucide-react';
import { toast } from 'sonner';

interface PipelineExecution {
  id: string;
  pipelineId: string;
  pipelineName: string;
  status: 'running' | 'completed' | 'failed' | 'queued';
  startTime: Date;
  endTime?: Date;
  progress: number;
  recordsProcessed: number;
  totalRecords: number;
  errors: string[];
  metrics: {
    throughput: number;
    avgProcessingTime: number;
    errorRate: number;
  };
}

interface PipelineMonitoringDashboardProps {
  executions: PipelineExecution[];
  onStartPipeline: (pipelineId: string) => void;
  onStopPipeline: (executionId: string) => void;
  onRetryPipeline: (executionId: string) => void;
}

export const PipelineMonitoringDashboard = ({
  executions,
  onStartPipeline,
  onStopPipeline,
  onRetryPipeline
}: PipelineMonitoringDashboardProps) => {
  const [selectedExecution, setSelectedExecution] = useState<PipelineExecution | null>(null);
  const [realTimeMetrics, setRealTimeMetrics] = useState({
    activePipelines: 0,
    totalThroughput: 0,
    errorRate: 0,
    avgLatency: 0
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const running = executions.filter(e => e.status === 'running');
      setRealTimeMetrics({
        activePipelines: running.length,
        totalThroughput: running.reduce((sum, e) => sum + e.metrics.throughput, 0),
        errorRate: running.reduce((sum, e) => sum + e.metrics.errorRate, 0) / (running.length || 1),
        avgLatency: running.reduce((sum, e) => sum + e.metrics.avgProcessingTime, 0) / (running.length || 1)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [executions]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'text-blue-500 border-blue-500 bg-blue-50';
      case 'completed': return 'text-green-500 border-green-500 bg-green-50';
      case 'failed': return 'text-red-500 border-red-500 bg-red-50';
      case 'queued': return 'text-yellow-500 border-yellow-500 bg-yellow-50';
      default: return 'text-gray-500 border-gray-500 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <Activity className="h-4 w-4 animate-pulse" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'failed': return <AlertTriangle className="h-4 w-4" />;
      case 'queued': return <Clock className="h-4 w-4" />;
      default: return <Database className="h-4 w-4" />;
    }
  };

  const formatDuration = (start: Date, end?: Date) => {
    const endTime = end || new Date();
    const duration = Math.floor((endTime.getTime() - start.getTime()) / 1000);
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Pipelines</p>
                <p className="text-2xl font-bold text-blue-600">{realTimeMetrics.activePipelines}</p>
              </div>
              <Activity className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Throughput</p>
                <p className="text-2xl font-bold text-green-600">
                  {realTimeMetrics.totalThroughput.toFixed(0)}/s
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Error Rate</p>
                <p className="text-2xl font-bold text-red-600">
                  {realTimeMetrics.errorRate.toFixed(1)}%
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Latency</p>
                <p className="text-2xl font-bold text-purple-600">
                  {realTimeMetrics.avgLatency.toFixed(0)}ms
                </p>
              </div>
              <Zap className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline Executions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Pipeline Executions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {executions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No pipeline executions</p>
              </div>
            ) : (
              executions.map((execution) => (
                <div
                  key={execution.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedExecution?.id === execution.id 
                      ? 'bg-blue-50 border-blue-200' 
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedExecution(execution)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(execution.status)}
                      <span className="font-medium">{execution.pipelineName}</span>
                    </div>
                    <Badge className={getStatusColor(execution.status)}>
                      {execution.status.toUpperCase()}
                    </Badge>
                  </div>

                  {execution.status === 'running' && (
                    <div className="mb-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{execution.progress}%</span>
                      </div>
                      <Progress value={execution.progress} className="h-2" />
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div>
                      <span>Records: </span>
                      <span className="font-medium">
                        {execution.recordsProcessed.toLocaleString()} / {execution.totalRecords.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span>Duration: </span>
                      <span className="font-medium">{formatDuration(execution.startTime, execution.endTime)}</span>
                    </div>
                  </div>

                  <div className="flex gap-1 mt-2">
                    {execution.status === 'running' && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={(e) => { e.stopPropagation(); onStopPipeline(execution.id); }}
                      >
                        <Pause className="h-3 w-3" />
                      </Button>
                    )}
                    {execution.status === 'failed' && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={(e) => { e.stopPropagation(); onRetryPipeline(execution.id); }}
                      >
                        <RotateCcw className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Execution Details */}
        <Card>
          <CardHeader>
            <CardTitle>Execution Details</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedExecution ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Pipeline</label>
                    <p className="font-medium">{selectedExecution.pipelineName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Status</label>
                    <div>
                      <Badge className={getStatusColor(selectedExecution.status)}>
                        {selectedExecution.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <label className="text-muted-foreground">Throughput</label>
                    <p className="font-medium">{selectedExecution.metrics.throughput.toFixed(1)}/s</p>
                  </div>
                  <div>
                    <label className="text-muted-foreground">Avg Time</label>
                    <p className="font-medium">{selectedExecution.metrics.avgProcessingTime.toFixed(0)}ms</p>
                  </div>
                  <div>
                    <label className="text-muted-foreground">Error Rate</label>
                    <p className="font-medium">{selectedExecution.metrics.errorRate.toFixed(1)}%</p>
                  </div>
                </div>

                {selectedExecution.errors.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Errors</label>
                    <div className="mt-1 space-y-1">
                      {selectedExecution.errors.map((error, index) => (
                        <div key={index} className="text-sm text-red-600 bg-red-50 p-2 rounded">
                          {error}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-2 border-t">
                  <div className="flex gap-2">
                    {selectedExecution.status === 'running' && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => onStopPipeline(selectedExecution.id)}
                      >
                        <Pause className="h-4 w-4 mr-2" />
                        Stop
                      </Button>
                    )}
                    {selectedExecution.status === 'failed' && (
                      <Button 
                        size="sm" 
                        onClick={() => onRetryPipeline(selectedExecution.id)}
                      >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Retry
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Select a pipeline execution to view details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
