
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RefreshCw } from 'lucide-react';
import { getStatusColor } from './utils.tsx';
import { AutonomousWorkflow, SystemMetrics, DecisionNode } from '@/hooks/useAutonomousWorkflows';
import { useMemo } from "react";

interface LearningStatusPanelProps {
  workflows: AutonomousWorkflow[];
  systemMetrics: SystemMetrics;
}

const LearningStatusPanel = ({ workflows, systemMetrics }: LearningStatusPanelProps) => {

  const activeLearningModels = useMemo(() => {
    return workflows
      .filter(wf => wf.status === 'learning' || wf.nodes.some(node => node.status === 'optimizing' || node.status === 'learning'))
      .map(wf => {
        const optimizingNode = wf.nodes.find(node => node.status === 'optimizing');
        const learningNode = wf.nodes.find(node => node.status === 'learning');
        const nodeForStatus = optimizingNode || learningNode;

        const progress = wf.nodes.length > 0
          ? wf.nodes.reduce((acc, node) => acc + (node.progress || 0), 0) / wf.nodes.length
          : 0;
        
        let status: AutonomousWorkflow['status'] | DecisionNode['status'] = wf.status;
        if (nodeForStatus) {
            status = nodeForStatus.status;
        }

        return {
          name: wf.name,
          progress: Math.round(progress),
          status: status.charAt(0).toUpperCase() + status.slice(1),
        };
      })
      .slice(0, 4); // Keep it to 4 models like in the original design
  }, [workflows]);


  const zeroTouchResolution = useMemo(() => {
    if (!systemMetrics.totalDecisions || systemMetrics.totalDecisions === 0) return 0;
    return (systemMetrics.autonomousResolutions / systemMetrics.totalDecisions * 100);
  }, [systemMetrics]);


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
              {activeLearningModels.length > 0 ? activeLearningModels.map((model, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{model.name}</span>
                    <Badge variant="outline" className={getStatusColor(model.status.toLowerCase())}>
                      {model.status}
                    </Badge>
                  </div>
                  <Progress value={model.progress} className="h-2" />
                </div>
              )) : (
                <div className="text-center text-sm text-muted-foreground py-4">
                  No active learning models.
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">System Intelligence Metrics</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-muted/30 rounded-lg text-center">
                <div className="text-lg font-bold text-green-400">{zeroTouchResolution.toFixed(1)}%</div>
                <div className="text-xs text-muted-foreground">Zero-Touch Resolution</div>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg text-center">
                <div className="text-lg font-bold text-blue-400">{systemMetrics.avgDecisionTime.toFixed(1)}s</div>
                <div className="text-xs text-muted-foreground">Avg Decision Time</div>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg text-center">
                <div className="text-lg font-bold text-purple-400">{systemMetrics.avgConfidence.toFixed(1)}%</div>
                <div className="text-xs text-muted-foreground">Model Accuracy</div>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg text-center">
                <div className="text-lg font-bold text-orange-400">{systemMetrics.performanceGain.toFixed(1)}%</div>
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
