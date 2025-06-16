
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, TrendingUp, AlertTriangle, Target, Activity, Clock, Zap, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const AISummaryPanel = () => {
  const [aiData, setAiData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    const loadAIData = () => {
      setIsLoading(true);
      setTimeout(() => {
        const mockAIData = generateMockAIData();
        setAiData(mockAIData);
        setLastUpdated(new Date());
        setIsLoading(false);
      }, 1000);
    };

    loadAIData();
    const interval = setInterval(loadAIData, 120000); // Update every 2 minutes

    return () => clearInterval(interval);
  }, []);

  const generateMockAIData = () => {
    return {
      insights: [
        {
          id: 1,
          type: 'SURGE_PREDICTION',
          title: 'Emergency Department Surge Expected',
          description: 'AI models predict a 35% increase in ED volume between 2:00 PM - 6:00 PM today',
          confidence: 87.5,
          priority: 'HIGH',
          actionItems: [
            'Activate overflow protocols',
            'Call in additional nursing staff',
            'Prepare fast-track unit'
          ],
          timeframe: 'Next 4 hours'
        },
        {
          id: 2,
          type: 'RESOURCE_OPTIMIZATION',
          title: 'Bed Allocation Optimization',
          description: 'Optimal bed reallocation could improve efficiency by 18% and reduce wait times',
          confidence: 92.1,
          priority: 'MEDIUM',
          actionItems: [
            'Move 3 ICU beds to step-down',
            'Reassign nursing coverage',
            'Update bed management system'
          ],
          timeframe: 'Immediate'
        },
        {
          id: 3,
          type: 'QUALITY_PREDICTION',
          title: 'Patient Safety Alert',
          description: 'Increased risk of medication errors detected in current staffing pattern',
          confidence: 78.9,
          priority: 'CRITICAL',
          actionItems: [
            'Review medication protocols',
            'Additional pharmacist coverage',
            'Implement double-check system'
          ],
          timeframe: 'Within 2 hours'
        }
      ],
      predictions: Array.from({ length: 24 }, (_, i) => ({
        hour: `${i}:00`,
        predicted: Math.floor(Math.random() * 20) + 30,
        actual: i < 12 ? Math.floor(Math.random() * 20) + 25 : null,
        confidence: 85 + Math.random() * 10
      })),
      mlModels: [
        { name: 'ED Surge Predictor', status: 'ACTIVE', accuracy: 94.2, confidence: 91.8 },
        { name: 'Bed Demand Optimizer', status: 'ACTIVE', accuracy: 88.7, confidence: 89.3 },
        { name: 'Risk Stratification', status: 'TRAINING', accuracy: 92.1, confidence: 87.5 },
        { name: 'Resource Optimizer', status: 'ACTIVE', accuracy: 85.4, confidence: 83.1 }
      ],
      automation: {
        tasksAutomated: 247,
        timeSaved: 18.5,
        errorReduction: 23.4,
        efficiency: 91.2
      },
      recommendations: [
        {
          category: 'OPERATIONAL',
          title: 'Optimize OR Scheduling',
          impact: 'HIGH',
          description: 'Adjust surgical scheduling to reduce turnaround time by 15 minutes'
        },
        {
          category: 'FINANCIAL',
          title: 'Cost Reduction Opportunity',
          impact: 'MEDIUM',
          description: 'Inventory optimization could reduce costs by $45,000 monthly'
        },
        {
          category: 'QUALITY',
          title: 'Patient Flow Enhancement',
          impact: 'HIGH',
          description: 'Implement AI-guided triage to improve patient satisfaction by 12%'
        }
      ]
    };
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'CRITICAL': return 'bg-red-500/10 text-red-600 border-red-500/20';
      case 'HIGH': return 'bg-orange-500/10 text-orange-600 border-orange-500/20';
      case 'MEDIUM': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      default: return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-purple-500" />
            AI Insights & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin h-6 w-6 border-2 border-purple-500 border-t-transparent rounded-full"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-6 w-6 text-purple-400" />
                AI Insights & Recommendations
              </CardTitle>
              <CardDescription>
                Artificial intelligence powered insights and strategic recommendations
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-purple-500/10 text-purple-600">
                AI Active
              </Badge>
              <Button size="sm" variant="outline">
                <Zap className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="insights" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="insights">Smart Insights</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="models">ML Models</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
        </TabsList>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {aiData?.insights.map((insight) => (
              <Card key={insight.id} className="border-l-4 border-l-purple-500">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-purple-500/10">
                        <Brain className="h-5 w-5 text-purple-500" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{insight.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className={getPriorityColor(insight.priority)}>
                            {insight.priority}
                          </Badge>
                          <Badge variant="secondary">
                            {insight.confidence}% confidence
                          </Badge>
                          <Badge variant="outline">
                            {insight.timeframe}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{insight.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-medium">Recommended Actions:</h4>
                    <ul className="space-y-1">
                      {insight.actionItems.map((action, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                Patient Volume Predictions - Next 24 Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={aiData?.predictions}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="predicted" stroke="#8b5cf6" strokeWidth={2} name="Predicted" />
                  <Line type="monotone" dataKey="actual" stroke="#10b981" strokeWidth={2} name="Actual" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="models" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aiData?.mlModels.map((model, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{model.name}</CardTitle>
                    <Badge variant={model.status === 'ACTIVE' ? 'default' : 'secondary'}>
                      {model.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Accuracy</span>
                      <span className="font-medium">{model.accuracy}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Confidence</span>
                      <span className="font-medium">{model.confidence}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full" 
                        style={{ width: `${model.accuracy}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="automation" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Tasks Automated</span>
                </div>
                <div className="text-2xl font-bold">{aiData?.automation.tasksAutomated}</div>
                <div className="text-xs text-green-600">Today</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">Time Saved</span>
                </div>
                <div className="text-2xl font-bold">{aiData?.automation.timeSaved}h</div>
                <div className="text-xs text-blue-600">This week</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-medium">Error Reduction</span>
                </div>
                <div className="text-2xl font-bold">{aiData?.automation.errorReduction}%</div>
                <div className="text-xs text-orange-600">vs manual</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="h-4 w-4 text-purple-500" />
                  <span className="text-sm font-medium">Efficiency</span>
                </div>
                <div className="text-2xl font-bold">{aiData?.automation.efficiency}%</div>
                <div className="text-xs text-purple-600">Overall</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Strategic Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiData?.recommendations.map((rec, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{rec.title}</h4>
                      <Badge variant={rec.impact === 'HIGH' ? 'default' : 'secondary'}>
                        {rec.impact} Impact
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{rec.description}</p>
                    <Badge variant="outline" className="mt-2">
                      {rec.category}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="text-xs text-muted-foreground text-center">
        Last updated: {lastUpdated.toLocaleTimeString()} | 
        AI analysis updates every 2 minutes
      </div>
    </div>
  );
};

export default AISummaryPanel;
