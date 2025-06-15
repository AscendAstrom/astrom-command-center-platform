import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layers, Trophy, Target } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { useState, useEffect } from "react";

export const BenchmarkingTile = () => {
  const [metrics, setMetrics] = useState({
    overallRank: 0,
    totalHospitals: 0,
    percentileRank: 0,
    improvementAreas: 0,
  });
  const [benchmarkData, setBenchmarkData] = useState<any[]>([]);
  const [topPerformingAreas, setTopPerformingAreas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Implement data fetching from a benchmarking table when available.
    setLoading(false);
  }, []);

  if (loading) {
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
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="animate-pulse space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="h-16 bg-gray-200 rounded"></div>
                        <div className="h-16 bg-gray-200 rounded"></div>
                    </div>
                    <div className="h-24 bg-gray-200 rounded"></div>
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
  }

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

        {benchmarkData.length > 0 ? (
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
        ) : (
             <div className="h-24 flex items-center justify-center bg-muted/20 rounded">
                <p className="text-muted-foreground text-sm">No benchmarking data available</p>
            </div>
        )}

        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground mb-2">Top Performing Areas</div>
          {topPerformingAreas.length > 0 ? topPerformingAreas.slice(0, 3).map((area, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{area.area}</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">{area.score}</span>
                <Badge variant="outline" className="text-green-600 bg-green-50 text-xs">
                  {area.rank}
                </Badge>
              </div>
            </div>
          )) : (
            <div className="text-center py-2 text-xs text-muted-foreground">No performance data</div>
          )}
        </div>

        <div className="bg-cyan-50 p-2 rounded text-xs">
          <div className="flex items-center gap-1 mb-1">
            <Target className="h-3 w-3 text-cyan-500" />
            <span className="font-semibold text-cyan-600">Benchmark Insights</span>
          </div>
          <div className="text-muted-foreground">
            Connect to industry data sources for benchmarking.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
