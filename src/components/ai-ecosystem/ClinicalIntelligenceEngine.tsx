
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Activity, TrendingUp, Shield, Zap, CheckCircle, AlertTriangle } from "lucide-react";

const ClinicalIntelligenceEngine = () => {
  const [selectedModel, setSelectedModel] = useState("diagnostic-assistant");

  const models = [
    {
      id: "diagnostic-assistant",
      name: "Diagnostic Assistant",
      status: "active",
      accuracy: 94,
      predictions: 1247,
      category: "Clinical Decision Support"
    },
    {
      id: "outcome-predictor",
      name: "Outcome Predictor",
      status: "training",
      accuracy: 88,
      predictions: 892,
      category: "Predictive Analytics"
    },
    {
      id: "risk-assessment",
      name: "Risk Assessment",
      status: "active",
      accuracy: 91,
      predictions: 654,
      category: "Patient Safety"
    }
  ];

  const insights = [
    {
      type: "recommendation",
      title: "Clinical Protocol Optimization",
      description: "AI recommends updating sepsis detection protocols based on recent patterns",
      priority: "high",
      confidence: 92
    },
    {
      type: "alert",
      title: "Resource Allocation Alert",
      description: "Predicted surge in ICU admissions within next 6 hours",
      priority: "medium",
      confidence: 87
    },
    {
      type: "insight",
      title: "Treatment Effectiveness",
      description: "New antibiotic protocol showing 15% better outcomes",
      priority: "low",
      confidence: 78
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-blue-400" />
            Clinical Intelligence Engine
          </CardTitle>
          <CardDescription>
            AI-powered clinical decision support and predictive analytics
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="models" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="models">AI Models</TabsTrigger>
          <TabsTrigger value="insights">Clinical Insights</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="models" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {models.map((model) => (
              <Card key={model.id} className="bg-card border-border hover:bg-muted/50 cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{model.name}</CardTitle>
                    <Badge variant={model.status === 'active' ? 'default' : 'secondary'}>
                      {model.status}
                    </Badge>
                  </div>
                  <CardDescription>{model.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Accuracy</span>
                        <span>{model.accuracy}%</span>
                      </div>
                      <Progress value={model.accuracy} className="h-2" />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Predictions Today</span>
                      <span className="font-medium">{model.predictions}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <Card key={index} className="bg-card border-border">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      {insight.type === 'recommendation' && <CheckCircle className="h-5 w-5 text-green-500" />}
                      {insight.type === 'alert' && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                      {insight.type === 'insight' && <TrendingUp className="h-5 w-5 text-blue-500" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{insight.title}</h3>
                        <Badge variant="outline">{insight.confidence}% confidence</Badge>
                      </div>
                      <p className="text-muted-foreground text-sm mb-3">{insight.description}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant={insight.priority === 'high' ? 'destructive' : insight.priority === 'medium' ? 'secondary' : 'outline'}>
                          {insight.priority} priority
                        </Badge>
                        <Button size="sm" variant="outline">
                          Review
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Active Models</span>
                </div>
                <div className="text-2xl font-bold">3</div>
                <div className="text-xs text-muted-foreground">2 in production</div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">Predictions Today</span>
                </div>
                <div className="text-2xl font-bold">2,793</div>
                <div className="text-xs text-muted-foreground">+12% from yesterday</div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-purple-500" />
                  <span className="text-sm font-medium">Avg Accuracy</span>
                </div>
                <div className="text-2xl font-bold">91%</div>
                <div className="text-xs text-muted-foreground">Across all models</div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-medium">Response Time</span>
                </div>
                <div className="text-2xl font-bold">0.3s</div>
                <div className="text-xs text-muted-foreground">Average inference</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClinicalIntelligenceEngine;
