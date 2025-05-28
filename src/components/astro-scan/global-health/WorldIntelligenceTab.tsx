
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Languages, BarChart, TrendingUp, Eye } from "lucide-react";

export const WorldIntelligenceTab = () => {
  const intelligenceMetrics = {
    globalInsights: 3247,
    researchProjects: 156,
    collaborations: 89,
    healthIndicators: 2847
  };

  const researchCollaborations = [
    { project: "Global Cancer Research Initiative", countries: 23, status: "active", impact: "high" },
    { project: "Infectious Disease Monitoring", countries: 31, status: "expanding", impact: "critical" },
    { project: "Mental Health Global Study", countries: 18, status: "recruiting", impact: "medium" },
    { project: "Cardiovascular Prevention Network", countries: 15, status: "active", impact: "high" },
    { project: "Pediatric Care Optimization", countries: 12, status: "planning", impact: "medium" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'expanding': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'recruiting': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'planning': return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'critical': return 'bg-red-500/10 text-red-600 border-red-500/20';
      case 'high': return 'bg-orange-500/10 text-orange-600 border-orange-500/20';
      case 'medium': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  return (
    <Card className="bg-card/80 border-border backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Languages className="h-5 w-5 text-blue-400" />
          World Health Intelligence Portal
        </CardTitle>
        <CardDescription>
          Global healthcare insights, research collaboration, and population health monitoring
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <div className="text-2xl font-bold text-blue-400">{intelligenceMetrics.globalInsights}</div>
            <div className="text-xs text-muted-foreground">Global Insights</div>
          </div>
          <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <div className="text-2xl font-bold text-purple-400">{intelligenceMetrics.researchProjects}</div>
            <div className="text-xs text-muted-foreground">Research Projects</div>
          </div>
          <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
            <div className="text-2xl font-bold text-green-400">{intelligenceMetrics.collaborations}</div>
            <div className="text-xs text-muted-foreground">Active Collaborations</div>
          </div>
          <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
            <div className="text-2xl font-bold text-orange-400">{intelligenceMetrics.healthIndicators}</div>
            <div className="text-xs text-muted-foreground">Health Indicators</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-foreground">Global Research Collaborations</h4>
            <Button variant="outline" size="sm">
              <BarChart className="h-4 w-4 mr-2" />
              Analytics Dashboard
            </Button>
          </div>
          
          {researchCollaborations.map((project, index) => (
            <div key={index} className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-blue-400" />
                  <span className="font-medium">{project.project}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={getImpactColor(project.impact)}>
                    {project.impact} impact
                  </Badge>
                  <Badge variant="outline" className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Participating Countries</div>
                <div className="font-medium">{project.countries}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
          <h4 className="font-semibold text-foreground mb-2">World Intelligence Features</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-400" />
              <span>Global population health trends</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-400" />
              <span>International research coordination</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-400" />
              <span>Cross-border clinical trials</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-400" />
              <span>Global health breakthrough tracking</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
