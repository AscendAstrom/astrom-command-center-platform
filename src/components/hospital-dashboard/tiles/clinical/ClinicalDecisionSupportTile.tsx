
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Zap, TrendingUp, CheckCircle, AlertTriangle } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

export const ClinicalDecisionSupportTile = () => {
  const alertData = [
    { hour: '6AM', drugInteraction: 3, allergy: 1, dosing: 2, sepsis: 0 },
    { hour: '9AM', drugInteraction: 8, allergy: 3, dosing: 5, sepsis: 2 },
    { hour: '12PM', drugInteraction: 12, allergy: 4, dosing: 7, sepsis: 3 },
    { hour: '3PM', drugInteraction: 15, allergy: 6, dosing: 9, sepsis: 4 },
    { hour: '6PM', drugInteraction: 11, allergy: 4, dosing: 6, sepsis: 2 },
    { hour: '9PM', drugInteraction: 7, allergy: 2, dosing: 4, sepsis: 1 }
  ];

  const alertTypes = [
    { type: 'Drug Interactions', count: 156, accepted: 78, override: 68, accuracy: 85 },
    { type: 'Allergy Alerts', count: 89, accepted: 67, override: 22, accuracy: 92 },
    { type: 'Dosing Guidance', count: 134, accepted: 98, override: 36, accuracy: 88 },
    { type: 'Sepsis Risk', count: 45, accepted: 41, override: 4, accuracy: 96 },
    { type: 'Fall Risk', count: 67, accepted: 52, override: 15, accuracy: 83 }
  ];

  const outcomeMetrics = [
    { name: 'Alerts Accepted', value: 72, color: '#22c55e' },
    { name: 'Override Rate', value: 28, color: '#f59e0b' }
  ];

  const metrics = {
    totalAlerts: 491,
    acceptanceRate: 72.5,
    falsePositiveRate: 15.2,
    timeToDecision: 3.8,
    clinicalImpact: 84.2,
    userSatisfaction: 4.1
  };

  const recentAlerts = [
    { time: '14:52', type: 'Drug Interaction', patient: 'PT-8921', severity: 'High', action: 'Accepted' },
    { time: '14:48', type: 'Sepsis Risk', patient: 'PT-5634', severity: 'Critical', action: 'Accepted' },
    { time: '14:45', type: 'Allergy Alert', patient: 'PT-2945', severity: 'Medium', action: 'Override' }
  ];

  const aiModels = [
    { model: 'Sepsis Prediction', accuracy: 94.2, predictions: 1248, interventions: 156 },
    { model: 'Fall Risk Assessment', accuracy: 87.8, predictions: 2156, interventions: 234 },
    { model: 'Readmission Risk', accuracy: 91.5, predictions: 956, interventions: 112 }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'text-red-600 bg-red-50';
      case 'High': return 'text-orange-600 bg-orange-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-blue-600 bg-blue-50';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-pink-500/10 rounded-lg">
              <Brain className="h-5 w-5 text-pink-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Clinical Decision Support</CardTitle>
              <CardDescription>AI-powered insights</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-pink-600 border-pink-200 bg-pink-50">
            <Zap className="h-3 w-3 mr-1" />
            {metrics.acceptanceRate}% Accepted
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-pink-600">{metrics.totalAlerts}</div>
            <div className="text-xs text-muted-foreground">Alerts Today</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{metrics.timeToDecision}s</div>
            <div className="text-xs text-muted-foreground">Avg Response</div>
          </div>
        </div>

        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={alertData}>
              <XAxis dataKey="hour" fontSize={8} />
              <YAxis hide />
              <Tooltip formatter={(value) => [`${value}`, 'Alerts']} />
              <Area 
                type="monotone" 
                dataKey="drugInteraction" 
                stackId="1"
                stroke="#ec4899" 
                fill="#ec489920"
                name="Drug Interactions"
              />
              <Area 
                type="monotone" 
                dataKey="allergy" 
                stackId="1"
                stroke="#f59e0b" 
                fill="#f59e0b20"
                name="Allergies"
              />
              <Area 
                type="monotone" 
                dataKey="dosing" 
                stackId="1"
                stroke="#3b82f6" 
                fill="#3b82f620"
                name="Dosing"
              />
              <Area 
                type="monotone" 
                dataKey="sepsis" 
                stackId="1"
                stroke="#ef4444" 
                fill="#ef444420"
                name="Sepsis"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground mb-2">Alert Performance</div>
          {alertTypes.slice(0, 3).map((alert, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{alert.type}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs">{alert.count}</span>
                <div className="w-8 h-1.5 bg-gray-200 rounded">
                  <div 
                    className="h-full bg-pink-500 rounded" 
                    style={{ width: `${alert.accuracy}%` }}
                  />
                </div>
                <span className="font-medium">{alert.accuracy}%</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-green-50 p-2 rounded text-xs">
          <div className="flex items-center gap-1 mb-1">
            <CheckCircle className="h-3 w-3 text-green-500" />
            <span className="font-semibold text-green-600">AI Impact</span>
          </div>
          <div className="text-muted-foreground">
            {metrics.clinicalImpact}% of accepted alerts led to care improvements. User satisfaction: {metrics.userSatisfaction}/5.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
