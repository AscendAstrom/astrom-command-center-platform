
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, MessageCircle, ClipboardList } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { usePatientExperienceData } from "@/hooks/usePatientExperienceData";
import { Skeleton } from "@/components/ui/skeleton";

export const PatientExperienceTile = () => {
  const { data, isLoading } = usePatientExperienceData();

  if (isLoading || !data) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-pink-500/10 rounded-lg">
                <Heart className="h-5 w-5 text-pink-500" />
              </div>
              <div>
                <CardTitle className="text-lg">Patient Experience</CardTitle>
                <CardDescription>Satisfaction & feedback analytics</CardDescription>
              </div>
            </div>
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
          <Skeleton className="h-24 w-full" />
          <div className="space-y-2 pt-2">
            <Skeleton className="h-4 w-1/3 mb-2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
          <Skeleton className="h-12 w-full" />
        </CardContent>
      </Card>
    );
  }

  const { satisfactionTrend, metrics, keyMetrics, recentFeedback } = data;

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-pink-500/10 rounded-lg">
              <Heart className="h-5 w-5 text-pink-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Patient Experience</CardTitle>
              <CardDescription>Satisfaction & feedback analytics</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
            <Star className="h-3 w-3 mr-1" />
            {metrics.overallScore}/5.0
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-pink-600">{metrics.totalSurveys}</div>
            <div className="text-xs text-muted-foreground">Surveys (6m)</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">{metrics.responseRate}%</div>
            <div className="text-xs text-muted-foreground">Response Rate (6m)</div>
          </div>
        </div>

        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={satisfactionTrend}>
              <XAxis dataKey="month" fontSize={10} axisLine={false} tickLine={false} />
              <YAxis hide domain={[1, 5]} />
              <Tooltip formatter={(value: number) => value > 0 ? value.toFixed(1) : 'N/A'} />
              <Line 
                type="monotone" 
                dataKey="overall" 
                stroke="#ec4899" 
                strokeWidth={2}
                name="Overall"
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="communication" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Communication"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-2">
            <ClipboardList className="h-3 w-3" />
            Key Metrics (6m)
          </div>
          {keyMetrics.map((metric, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground truncate">{metric.metric}</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">{metric.score > 0 ? metric.score : 'N/A'}</span>
                <div className={`w-2 h-2 rounded-full ${
                  metric.score === 0 ? 'bg-gray-400' : metric.score >= metric.target ? 'bg-green-500' : 'bg-orange-500'
                }`} />
              </div>
            </div>
          ))}
        </div>

        {recentFeedback.length > 0 ? (
          <div className="bg-pink-50 p-2 rounded text-xs">
            <div className="flex items-center gap-1 mb-1">
              <MessageCircle className="h-3 w-3 text-pink-500" />
              <span className="font-semibold text-pink-600">Recent Feedback</span>
            </div>
            <div className="text-muted-foreground truncate">
              "{recentFeedback[0].comment}"
              {recentFeedback[0].time && <span className="text-muted-foreground/70"> - {recentFeedback[0].time}</span>}
            </div>
          </div>
        ) : (
          <div className="text-center py-2 text-xs text-muted-foreground bg-muted/30 rounded">No recent feedback with comments.</div>
        )}
      </CardContent>
    </Card>
  );
};
