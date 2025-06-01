
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, TrendingUp, CheckCircle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

export const QualityImprovementTile = () => {
  const improvementData = [
    { month: 'Jan', score: 82, target: 85, initiatives: 5 },
    { month: 'Feb', score: 84, target: 85, initiatives: 7 },
    { month: 'Mar', score: 86, target: 85, initiatives: 8 },
    { month: 'Apr', score: 88, target: 85, initiatives: 9 },
    { month: 'May', score: 89, target: 85, initiatives: 10 },
    { month: 'Jun', score: 91, target: 85, initiatives: 12 }
  ];

  const activeInitiatives = [
    { name: 'Medication Safety Protocol', progress: 85, status: 'On Track' },
    { name: 'Patient Communication', progress: 92, status: 'Ahead' },
    { name: 'Infection Prevention', progress: 78, status: 'Behind' },
    { name: 'Discharge Planning', progress: 88, status: 'On Track' }
  ];

  const metrics = {
    overallImprovement: 11,
    completedInitiatives: 18,
    activeProjects: 12,
    targetsMet: 8
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ahead': return 'text-green-600 bg-green-50';
      case 'On Track': return 'text-blue-600 bg-blue-50';
      case 'Behind': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <Target className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Quality Improvement</CardTitle>
              <CardDescription>Continuous improvement tracking</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
            <TrendingUp className="h-3 w-3 mr-1" />
            +{metrics.overallImprovement}% Score
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-xl font-bold text-green-600">{metrics.completedInitiatives}</div>
            <div className="text-xs text-muted-foreground">Completed Projects</div>
          </div>
          <div>
            <div className="text-xl font-bold text-blue-600">{metrics.activeProjects}</div>
            <div className="text-xs text-muted-foreground">Active Initiatives</div>
          </div>
        </div>

        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={improvementData}>
              <XAxis dataKey="month" fontSize={10} />
              <YAxis hide />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#22c55e" 
                strokeWidth={2}
                name="Quality Score"
              />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="#94a3b8" 
                strokeWidth={1}
                strokeDasharray="3 3"
                name="Target"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground mb-2">Active Initiatives</div>
          {activeInitiatives.slice(0, 3).map((initiative, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground truncate">{initiative.name}</span>
                <Badge variant="outline" className={getStatusColor(initiative.status)}>
                  {initiative.progress}%
                </Badge>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div 
                  className="bg-green-500 h-1 rounded-full" 
                  style={{ width: `${initiative.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="text-xs text-muted-foreground bg-green-50 p-2 rounded">
          <strong>Achievement:</strong> {metrics.targetsMet}/{metrics.activeProjects} initiatives met targets this quarter.
        </div>
      </CardContent>
    </Card>
  );
};
