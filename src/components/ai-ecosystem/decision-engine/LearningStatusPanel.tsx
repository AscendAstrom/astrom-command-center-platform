
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RefreshCw } from 'lucide-react';
import { getStatusColor } from './utils';

const LearningStatusPanel = () => {
  return (
    <Card className="bg-card/80 border-border backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <RefreshCw className="h-5 w-5 text-cyan-400" />
          Self-Learning & Optimization Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Active Learning Models</h4>
            <div className="space-y-3">
              {[
                { name: 'Bed Demand Predictor', progress: 89, status: 'Training' },
                { name: 'Flow Optimization Engine', progress: 94, status: 'Active' },
                { name: 'Resource Allocation AI', progress: 76, status: 'Learning' },
                { name: 'Quality Assurance Bot', progress: 82, status: 'Optimizing' }
              ].map((model, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{model.name}</span>
                    <Badge variant="outline" className={getStatusColor(model.status.toLowerCase())}>
                      {model.status}
                    </Badge>
                  </div>
                  <Progress value={model.progress} className="h-2" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">System Intelligence Metrics</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-muted/30 rounded-lg text-center">
                <div className="text-lg font-bold text-green-400">84.7%</div>
                <div className="text-xs text-muted-foreground">Zero-Touch Resolution</div>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg text-center">
                <div className="text-lg font-bold text-blue-400">2.3s</div>
                <div className="text-xs text-muted-foreground">Avg Decision Time</div>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg text-center">
                <div className="text-lg font-bold text-purple-400">97.2%</div>
                <div className="text-xs text-muted-foreground">Model Accuracy</div>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg text-center">
                <div className="text-lg font-bold text-orange-400">15.6%</div>
                <div className="text-xs text-muted-foreground">Performance Gain</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LearningStatusPanel;
