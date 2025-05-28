
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnalyticsData } from '@/services/analytics';
import { Brain, Zap, Target, Activity, TrendingUp, CheckCircle } from 'lucide-react';
import RealtimeLineChart from '../charts/RealtimeLineChart';
import RealtimeAreaChart from '../charts/RealtimeAreaChart';

interface AIMetricsTabProps {
  data: AnalyticsData;
  isLive: boolean;
}

const AIMetricsTab = ({ data, isLive }: AIMetricsTabProps) => {
  const { aiMetrics } = data;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Brain className="h-5 w-5 text-pink-400" />
          AI & ML Performance
          {isLive && (
            <Badge variant="outline" className="text-green-400 border-green-400 animate-pulse">
              Live
            </Badge>
          )}
        </h3>
        
        <Badge variant="outline" className="text-pink-400 border-pink-400">
          <CheckCircle className="h-3 w-3 mr-1" />
          {aiMetrics.mlModelsActive} Models Active
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-card border-border hover:shadow-md transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-pink-50 dark:bg-pink-950/30">
                <Target className="h-6 w-6 text-pink-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground animate-fade-in">
                  {aiMetrics.modelAccuracy.toFixed(1)}%
                </p>
                <p className="text-sm text-muted-foreground">Model Accuracy</p>
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
                  {aiMetrics.automationSuccess}%
                </p>
                <p className="text-sm text-muted-foreground">Automation Success</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:shadow-md transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30">
                <Activity className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground animate-fade-in">
                  {aiMetrics.decisionsSupported}
                </p>
                <p className="text-sm text-muted-foreground">Decisions Supported</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:shadow-md transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/30">
                <Brain className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground animate-fade-in">
                  {aiMetrics.mlModelsActive}
                </p>
                <p className="text-sm text-muted-foreground">Active Models</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:shadow-md transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-orange-50 dark:bg-orange-950/30">
                <TrendingUp className="h-6 w-6 text-orange-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground animate-fade-in">
                  {aiMetrics.predictionConfidence}%
                </p>
                <p className="text-sm text-muted-foreground">Prediction Confidence</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Brain className="h-5 w-5 text-pink-400" />
              Model Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RealtimeLineChart
              data={data.chartData.modelPerformance}
              dataKeys={['accuracy', 'confidence']}
              colors={['#ec4899', '#f59e0b']}
              height={200}
            />
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Zap className="h-5 w-5 text-green-400" />
              Automation Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RealtimeAreaChart
              data={data.chartData.modelPerformance}
              dataKeys={['accuracy']}
              colors={['#10b981']}
              height={200}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIMetricsTab;
