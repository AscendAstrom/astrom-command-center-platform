
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, TrendingUp, MessageCircle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, BarChart, Bar } from "recharts";

export const PatientExperienceTile = () => {
  const satisfactionData = [
    { month: 'Jan', overall: 4.2, communication: 4.1, staff: 4.3, cleanliness: 4.0 },
    { month: 'Feb', overall: 4.3, communication: 4.2, staff: 4.4, cleanliness: 4.1 },
    { month: 'Mar', overall: 4.4, communication: 4.3, staff: 4.5, cleanliness: 4.2 },
    { month: 'Apr', overall: 4.5, communication: 4.4, staff: 4.6, cleanliness: 4.3 },
    { month: 'May', overall: 4.6, communication: 4.5, staff: 4.7, cleanliness: 4.4 },
    { month: 'Jun', overall: 4.7, communication: 4.6, staff: 4.8, cleanliness: 4.5 }
  ];

  const experienceMetrics = [
    { metric: 'Overall Satisfaction', score: 4.7, target: 4.5, responses: 1250 },
    { metric: 'Would Recommend', score: 4.6, target: 4.3, responses: 1180 },
    { metric: 'Staff Courtesy', score: 4.8, target: 4.5, responses: 1320 },
    { metric: 'Pain Management', score: 4.4, target: 4.2, responses: 890 }
  ];

  const feedbackCategories = [
    { category: 'Nursing Care', positive: 89, negative: 11, total: 456 },
    { category: 'Physician Care', positive: 92, negative: 8, total: 523 },
    { category: 'Facility', positive: 85, negative: 15, total: 334 },
    { category: 'Discharge Process', positive: 87, negative: 13, total: 298 }
  ];

  const metrics = {
    overallScore: 4.7,
    responseRate: 78,
    npsScore: 72,
    improvementAreas: 2
  };

  const recentFeedback = [
    { comment: "Excellent nursing staff, very attentive", sentiment: 'positive', time: '2 hours ago' },
    { comment: "Wait time was longer than expected", sentiment: 'negative', time: '4 hours ago' },
    { comment: "Clean facilities and friendly staff", sentiment: 'positive', time: '6 hours ago' }
  ];

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
            <div className="text-2xl font-bold text-pink-600">{metrics.npsScore}</div>
            <div className="text-xs text-muted-foreground">NPS Score</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">{metrics.responseRate}%</div>
            <div className="text-xs text-muted-foreground">Response Rate</div>
          </div>
        </div>

        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={satisfactionData}>
              <XAxis dataKey="month" fontSize={10} />
              <YAxis hide />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="overall" 
                stroke="#ec4899" 
                strokeWidth={2}
                name="Overall Score"
              />
              <Line 
                type="monotone" 
                dataKey="staff" 
                stroke="#22c55e" 
                strokeWidth={2}
                name="Staff Rating"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground mb-2">Key Metrics</div>
          {experienceMetrics.slice(0, 3).map((metric, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground truncate">{metric.metric}</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">{metric.score}</span>
                <div className={`w-2 h-2 rounded-full ${
                  metric.score >= metric.target ? 'bg-green-500' : 'bg-orange-500'
                }`} />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-pink-50 p-2 rounded text-xs">
          <div className="flex items-center gap-1 mb-1">
            <MessageCircle className="h-3 w-3 text-pink-500" />
            <span className="font-semibold text-pink-600">Recent Feedback</span>
          </div>
          <div className="text-muted-foreground">
            "{recentFeedback[0].comment}" - {recentFeedback[0].time}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
