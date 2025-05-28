
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Shield } from "lucide-react";

interface RiskAssessment {
  category: string;
  level: string;
  score: number;
  trend: string;
}

interface RiskManagementPanelProps {
  riskAssessments: RiskAssessment[];
}

const RiskManagementPanel = ({ riskAssessments }: RiskManagementPanelProps) => {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Low': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'Medium': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'High': return 'bg-red-500/10 text-red-600 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  return (
    <Card className="bg-card/80 border-border backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-red-400" />
          Enterprise Risk Intelligence
        </CardTitle>
        <CardDescription>
          AI-powered risk assessment and predictive threat analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {riskAssessments.map((risk, index) => (
            <div key={index} className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="font-medium">{risk.category}</span>
                  <Badge variant="outline" className={getRiskColor(risk.level)}>
                    {risk.level}
                  </Badge>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-foreground">{risk.score}</span>
                  <div className="text-xs text-muted-foreground">Risk Score</div>
                </div>
              </div>
              <Progress value={risk.score} className="h-2 mb-2" />
              <div className="text-xs text-muted-foreground">
                Trend: {risk.trend}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskManagementPanel;
