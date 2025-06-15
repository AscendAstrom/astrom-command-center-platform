
import { useState, useEffect } from "react";
import StrategicKPICards from "./executive-command/StrategicKPICards";
import RiskManagementPanel from "./executive-command/RiskManagementPanel";
import AIStrategicInsights from "./executive-command/AIStrategicInsights";
import ExecutiveActions from "./executive-command/ExecutiveActions";
import { useAutonomousWorkflows } from '@/hooks/useAutonomousWorkflows';
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from 'lucide-react';

const ExecutiveCommandCenterNew = () => {
  const [strategicKPIs, setStrategicKPIs] = useState({
    marketPosition: { current: 0, target: 95, trend: 'neutral', change: 0 },
    innovationIndex: { current: 0, target: 20, trend: 'neutral', change: 0 },
    competitiveAdvantage: { current: 0, target: 1.0, trend: 'neutral', change: 0 },
    stakeholderValue: { current: 0, target: 20, trend: 'neutral', change: 0 }
  });
  const [riskAssessments, setRiskAssessments] = useState<any[]>([]);
  const { systemMetrics, isLoading, error } = useAutonomousWorkflows();

  useEffect(() => {
    if (systemMetrics) {
      const stakeholderValueCurrent = systemMetrics.autonomousResolutions / 10000;
      const stakeholderValueTarget = (systemMetrics.totalDecisions * 0.9) / 10000;
      const stakeholderValueChange = stakeholderValueCurrent - ((systemMetrics.totalDecisions * 0.85) / 10000);

      const updatedKPIs = {
        marketPosition: {
          current: parseFloat(systemMetrics.avgConfidence.toFixed(1)),
          target: 95,
          trend: systemMetrics.avgConfidence > 90 ? 'up' : 'down',
          change: parseFloat((systemMetrics.avgConfidence - 90).toFixed(1)),
        },
        innovationIndex: {
          current: parseFloat(systemMetrics.performanceGain.toFixed(1)),
          target: 20,
          trend: systemMetrics.performanceGain > 15 ? 'up' : 'down',
          change: parseFloat((systemMetrics.performanceGain - 15).toFixed(1)),
        },
        competitiveAdvantage: {
          current: parseFloat(systemMetrics.avgDecisionTime.toFixed(1)),
          target: 1.0,
          trend: systemMetrics.avgDecisionTime < 1.2 ? 'up' : 'down',
          change: parseFloat((1.2 - systemMetrics.avgDecisionTime).toFixed(1)),
        },
        stakeholderValue: {
          current: parseFloat(stakeholderValueCurrent.toFixed(1)),
          target: parseFloat(stakeholderValueTarget.toFixed(1)),
          trend: (systemMetrics.autonomousResolutions / (systemMetrics.totalDecisions || 1)) > 0.9 ? 'up' : 'down',
          change: parseFloat(stakeholderValueChange.toFixed(1)),
        },
      };

      setStrategicKPIs(updatedKPIs);
    }
  }, [systemMetrics]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="bg-destructive/10 border-destructive">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            Error Loading Executive Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">Could not fetch executive command center data.</p>
          <p className="text-xs text-muted-foreground mt-2">{error instanceof Error ? error.message : 'An unknown error occurred'}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <StrategicKPICards strategicKPIs={strategicKPIs} />
      <RiskManagementPanel riskAssessments={riskAssessments} />
      <AIStrategicInsights />
      <ExecutiveActions />
    </div>
  );
};

export default ExecutiveCommandCenterNew;
