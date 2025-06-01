
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layers, Trophy, TrendingUp, Target } from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

export const BenchmarkingTile = () => {
  const benchmarkData = [
    { metric: 'Quality Score', ourHospital: 92, industry: 87, percentile: 85 },
    { metric: 'Patient Satisfaction', ourHospital: 4.6, industry: 4.2, percentile: 78 },
    { metric: 'Efficiency', ourHospital: 89, industry: 83, percentile: 72 },
    { metric: 'Safety Rating', ourHospital: 94, industry: 89, percentile: 88 },
    { metric: 'Financial Performance', ourHospital: 87, industry: 85, percentile: 65 },
    { metric: 'Staff Satisfaction', ourHospital: 4.3, industry: 4.1, percentile: 68 }
  ];

  const competitorAnalysis = [
    { hospital: 'Regional Medical Center', score: 4.2, rank: 1 },
    { hospital: 'Our Hospital', score: 4.6, rank: 2 },
    { hospital: 'City General Hospital', score: 4.1, rank: 3 },
    { hospital: 'University Medical', score: 3.9, rank: 4 }
  ];

  const metrics = {
    overallRank: 2,
    totalHospitals: 45,
    percentileRank: 75,
    improvementAreas: 3
  };

  const topPerformingAreas = [
    { area: 'Patient Safety', rank: 'Top 10%', score: 94 },
    { area: 'Quality Metrics', rank: 'Top 15%', score: 92 },
    { area: 'Clinical Excellence', rank: 'Top 20%', score: 89 }
  ];

  const improvementOpportunities = [
    { area: 'Cost Management', gap: '-8%', priority: 'High' },
    { area: 'Staff Retention', gap: '-5%', priority: 'Medium' },
    { area: 'Technology Adoption', gap: '-12%', priority: 'High' }
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-cyan-500/10 rounded-lg">
              <Layers className="h-5 w-5 text-cyan-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Benchmarking</CardTitle>
              <CardDescription>Industry comparison & ranking</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-gold-600 border-gold-200 bg-gold-50">
            <Trophy className="h-3 w-3 mr-1" />
            #{metrics.overallRank} of {metrics.totalHospitals}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-cyan-600">{metrics.percentileRank}th</div>
            <div className="text-xs text-muted-foreground">Percentile Rank</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">{metrics.improvementAreas}</div>
            <div className="text-xs text-muted-foreground">Improvement Areas</div>
          </div>
        </div>

        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={benchmarkData.slice(0, 4)}>
              <XAxis dataKey="metric" fontSize={8} />
              <YAxis hide />
              <Tooltip />
              <Bar dataKey="percentile" fill="#06b6d4" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground mb-2">Top Performing Areas</div>
          {topPerformingAreas.slice(0, 3).map((area, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{area.area}</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">{area.score}</span>
                <Badge variant="outline" className="text-green-600 bg-green-50 text-xs">
                  {area.rank}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-cyan-50 p-2 rounded text-xs">
          <div className="flex items-center gap-1 mb-1">
            <Target className="h-3 w-3 text-cyan-500" />
            <span className="font-semibold text-cyan-600">Benchmark Insights</span>
          </div>
          <div className="text-muted-foreground">
            Outperforming 75% of similar hospitals. Focus on cost management for top 10% ranking.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
