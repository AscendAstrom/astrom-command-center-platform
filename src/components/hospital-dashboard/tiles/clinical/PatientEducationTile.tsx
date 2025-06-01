
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, BookOpen, TrendingUp, Users, CheckCircle } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

export const PatientEducationTile = () => {
  const engagementData = [
    { week: 'W1', materials: 145, completion: 78, satisfaction: 4.2 },
    { week: 'W2', materials: 162, completion: 82, satisfaction: 4.3 },
    { week: 'W3', materials: 178, completion: 85, satisfaction: 4.4 },
    { week: 'W4', materials: 189, completion: 88, satisfaction: 4.5 }
  ];

  const educationTopics = [
    { topic: 'Diabetes Management', materials: 45, completion: 92, satisfaction: 4.6 },
    { topic: 'Heart Disease Prevention', materials: 38, completion: 87, satisfaction: 4.4 },
    { topic: 'Medication Adherence', materials: 52, completion: 89, satisfaction: 4.5 },
    { topic: 'Post-Surgical Care', materials: 34, completion: 94, satisfaction: 4.7 },
    { topic: 'Smoking Cessation', materials: 28, completion: 76, satisfaction: 4.1 }
  ];

  const deliveryMethods = [
    { name: 'Digital Materials', value: 45, color: '#3b82f6' },
    { name: 'Video Content', value: 28, color: '#8b5cf6' },
    { name: 'In-Person Sessions', value: 18, color: '#10b981' },
    { name: 'Print Materials', value: 9, color: '#f59e0b' }
  ];

  const metrics = {
    totalPatients: 1248,
    engagementRate: 88.3,
    completionRate: 84.5,
    satisfactionScore: 4.5,
    materialsDelivered: 574,
    avgTimeSpent: 18.5
  };

  const recentSessions = [
    { time: '14:30', patient: 'PT-8921', topic: 'Diabetes Care', method: 'Video', duration: 22 },
    { time: '14:15', patient: 'PT-5634', topic: 'Heart Health', method: 'Digital', duration: 15 },
    { time: '14:00', patient: 'PT-2945', topic: 'Medication Safety', method: 'In-Person', duration: 35 }
  ];

  const outcomeMetrics = [
    { outcome: 'Readmission Reduction', improvement: 15.2, patients: 234 },
    { outcome: 'Medication Adherence', improvement: 22.8, patients: 189 },
    { outcome: 'Self-Care Knowledge', improvement: 28.5, patients: 456 }
  ];

  const getCompletionColor = (completion: number) => {
    if (completion >= 90) return '#22c55e';
    if (completion >= 80) return '#3b82f6';
    if (completion >= 70) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-cyan-500/10 rounded-lg">
              <GraduationCap className="h-5 w-5 text-cyan-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Patient Education</CardTitle>
              <CardDescription>Education effectiveness</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-cyan-600 border-cyan-200 bg-cyan-50">
            <BookOpen className="h-3 w-3 mr-1" />
            {metrics.engagementRate}% Engaged
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-cyan-600">{metrics.totalPatients}</div>
            <div className="text-xs text-muted-foreground">Patients Educated</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{metrics.satisfactionScore}</div>
            <div className="text-xs text-muted-foreground">Satisfaction /5</div>
          </div>
        </div>

        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={engagementData}>
              <XAxis dataKey="week" fontSize={10} />
              <YAxis hide />
              <Tooltip formatter={(value) => [`${value}`, 'Materials']} />
              <Area 
                type="monotone" 
                dataKey="materials" 
                stroke="#06b6d4" 
                fill="#06b6d420"
                name="Materials Delivered"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground mb-2">Education Topics</div>
          {educationTopics.slice(0, 3).map((topic, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{topic.topic}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs">{topic.materials}</span>
                <div className="w-8 h-1.5 bg-gray-200 rounded">
                  <div 
                    className="h-full rounded" 
                    style={{ 
                      width: `${topic.completion}%`,
                      backgroundColor: getCompletionColor(topic.completion)
                    }}
                  />
                </div>
                <span className="font-medium">{topic.completion}%</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-green-50 p-2 rounded text-xs">
          <div className="flex items-center gap-1 mb-1">
            <TrendingUp className="h-3 w-3 text-green-500" />
            <span className="font-semibold text-green-600">Outcomes Impact</span>
          </div>
          <div className="text-muted-foreground">
            {outcomeMetrics[0].improvement}% readmission reduction. {metrics.avgTimeSpent}min avg engagement time.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
