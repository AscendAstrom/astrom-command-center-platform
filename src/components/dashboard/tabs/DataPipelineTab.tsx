
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnalyticsData } from '@/services/analyticsDataService';
import { Database, Zap, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';
import RealtimeLineChart from '../charts/RealtimeLineChart';
import RealtimeAreaChart from '../charts/RealtimeAreaChart';

interface DataPipelineTabProps {
  data: AnalyticsData;
  isLive: boolean;
}

const DataPipelineTab = ({ data, isLive }: DataPipelineTabProps) => {
  const { dataPipeline } = data;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-400 border-green-400';
      case 'warning': return 'text-yellow-400 border-yellow-400';
      case 'error': return 'text-red-400 border-red-400';
      default: return 'text-muted-foreground border-border';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Database className="h-5 w-5 text-purple-400" />
          Data Pipeline Health
          {isLive && (
            <Badge variant="outline" className="text-green-400 border-green-400 animate-pulse">
              Live
            </Badge>
          )}
        </h3>
        
        <Badge variant="outline" className={getStatusColor(dataPipeline.syncStatus)}>
          {dataPipeline.syncStatus === 'healthy' ? (
            <CheckCircle className="h-3 w-3 mr-1" />
          ) : (
            <AlertCircle className="h-3 w-3 mr-1" />
          )}
          Sync {dataPipeline.syncStatus}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card border-border hover:shadow-md transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30">
                <Database className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground animate-fade-in">
                  {dataPipeline.activeSources}
                </p>
                <p className="text-sm text-muted-foreground">Active Sources</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:shadow-md transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-green-50 dark:bg-green-950/30">
                <Zap className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground animate-fade-in">
                  {dataPipeline.processingSpeed}
                </p>
                <p className="text-sm text-muted-foreground">Records/sec</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:shadow-md transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/30">
                <AlertCircle className="h-6 w-6 text-red-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground animate-fade-in">
                  {dataPipeline.errorRate.toFixed(1)}%
                </p>
                <p className="text-sm text-muted-foreground">Error Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:shadow-md transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/30">
                <TrendingUp className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground animate-fade-in">
                  {dataPipeline.dataQuality.toFixed(1)}%
                </p>
                <p className="text-sm text-muted-foreground">Data Quality</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Zap className="h-5 w-5 text-green-400" />
              Processing Throughput
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RealtimeAreaChart
              data={data.chartData.processingThroughput}
              dataKeys={['throughput', 'target']}
              colors={['#10b981', '#6366f1']}
              height={200}
            />
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-400" />
              Data Quality Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RealtimeLineChart
              data={data.chartData.dataQuality}
              dataKeys={['quality', 'completeness']}
              colors={['#8b5cf6', '#06b6d4']}
              height={200}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DataPipelineTab;
