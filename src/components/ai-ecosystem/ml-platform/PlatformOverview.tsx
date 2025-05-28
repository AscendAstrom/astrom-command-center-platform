
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cpu } from 'lucide-react';
import { PlatformMetrics } from './types';

interface PlatformOverviewProps {
  metrics: PlatformMetrics;
}

const PlatformOverview = ({ metrics }: PlatformOverviewProps) => {
  return (
    <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/20">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Cpu className="h-6 w-6 text-blue-400" />
          Advanced ML Platform
          <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">Phase 3A</Badge>
        </CardTitle>
        <CardDescription>
          Real-time model training, federated learning, and automated deployment pipeline
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{metrics.totalModels}</div>
            <div className="text-xs text-muted-foreground">Total Models</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{metrics.deployedModels}</div>
            <div className="text-xs text-muted-foreground">Deployed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400">{metrics.activeTraining}</div>
            <div className="text-xs text-muted-foreground">Training</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">{metrics.avgAccuracy.toFixed(1)}%</div>
            <div className="text-xs text-muted-foreground">Avg Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-400">{metrics.computeUtilization}%</div>
            <div className="text-xs text-muted-foreground">GPU Usage</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">{metrics.dataVolume}TB</div>
            <div className="text-xs text-muted-foreground">Data Volume</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlatformOverview;
