
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Database, Zap, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

export const IngestionDashboard = () => {
  const mockIngestionData = {
    activeSources: 7,
    processingRate: "2.4K",
    qualityScore: 94.2,
    recordsToday: 45600,
    pipelines: [
      {
        id: '1',
        name: 'Saudi MOH FHIR Pipeline',
        status: 'RUNNING',
        throughput: '1.2K/min',
        latency: '45ms',
        errorRate: '0.02%'
      },
      {
        id: '2',
        name: 'Hospital EHR Batch',
        status: 'RUNNING',
        throughput: '800/min',
        latency: '120ms',
        errorRate: '0.01%'
      },
      {
        id: '3',
        name: 'Lab Results Stream',
        status: 'RUNNING',
        throughput: '400/min',
        latency: '25ms',
        errorRate: '0.03%'
      },
      {
        id: '4',
        name: 'Emergency Data Feed',
        status: 'WARNING',
        throughput: '150/min',
        latency: '350ms',
        errorRate: '0.15%'
      }
    ],
    qualityMetrics: [
      { metric: 'Data Completeness', value: 96.8, target: 95 },
      { metric: 'Schema Validation', value: 98.2, target: 98 },
      { metric: 'Duplicate Detection', value: 99.1, target: 99 },
      { metric: 'Format Consistency', value: 94.5, target: 95 }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'RUNNING': return 'text-green-400 border-green-400';
      case 'WARNING': return 'text-yellow-400 border-yellow-400';
      case 'ERROR': return 'text-red-400 border-red-400';
      default: return 'text-muted-foreground border-border';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'RUNNING': return <CheckCircle className="h-3 w-3" />;
      case 'WARNING': return <AlertTriangle className="h-3 w-3" />;
      case 'ERROR': return <AlertTriangle className="h-3 w-3" />;
      default: return <Activity className="h-3 w-3" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30">
                <Database className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{mockIngestionData.activeSources}</p>
                <p className="text-sm text-muted-foreground">Active Sources</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-green-50 dark:bg-green-950/30">
                <Zap className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{mockIngestionData.processingRate}</p>
                <p className="text-sm text-muted-foreground">Records/min</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/30">
                <TrendingUp className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{mockIngestionData.qualityScore}%</p>
                <p className="text-sm text-muted-foreground">Quality Score</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-orange-50 dark:bg-orange-950/30">
                <Activity className="h-6 w-6 text-orange-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{mockIngestionData.recordsToday.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Records Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-400" />
              Active Ingestion Pipelines
            </CardTitle>
            <CardDescription>
              Real-time status of data ingestion pipelines
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockIngestionData.pipelines.map((pipeline) => (
                <div key={pipeline.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className={getStatusColor(pipeline.status)}>
                      {getStatusIcon(pipeline.status)}
                      {pipeline.status}
                    </Badge>
                    <div>
                      <div className="font-medium text-foreground">{pipeline.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {pipeline.throughput} • Latency: {pipeline.latency}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-foreground">Error Rate</div>
                    <div className="text-sm text-muted-foreground">{pipeline.errorRate}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-400" />
              Data Quality Metrics
            </CardTitle>
            <CardDescription>
              Real-time data quality monitoring and validation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockIngestionData.qualityMetrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground">{metric.metric}</span>
                    <span className="text-foreground font-medium">{metric.value}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        metric.value >= metric.target ? 'bg-green-500' : 'bg-yellow-500'
                      }`}
                      style={{ width: `${metric.value}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Target: {metric.target}% • 
                    {metric.value >= metric.target ? (
                      <span className="text-green-600 ml-1">✓ Meeting target</span>
                    ) : (
                      <span className="text-yellow-600 ml-1">⚠ Below target</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
