
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  AlertTriangle, 
  Brain,
  Target,
  Zap,
  Activity,
  Users,
  Calendar,
  BarChart3
} from 'lucide-react';
import { ClinicalDataType } from '@/types/clinical';

interface PredictiveAnalyticsProps {
  data: Record<ClinicalDataType, any[]>;
  selectedPatientId?: string;
}

interface RiskPrediction {
  type: string;
  risk_score: number;
  confidence: number;
  factors: string[];
  recommendations: string[];
  timeline: string;
}

interface TrendAnalysis {
  metric: string;
  current_value: number;
  predicted_value: number;
  trend_direction: 'increasing' | 'decreasing' | 'stable';
  confidence: number;
  impact: 'high' | 'medium' | 'low';
}

const PredictiveAnalytics = ({ data, selectedPatientId }: PredictiveAnalyticsProps) => {
  const [riskPredictions, setRiskPredictions] = useState<RiskPrediction[]>([]);
  const [trendAnalysis, setTrendAnalysis] = useState<TrendAnalysis[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeModel, setActiveModel] = useState('comprehensive');

  useEffect(() => {
    generatePredictiveAnalytics();
  }, [data, selectedPatientId]);

  const generatePredictiveAnalytics = async () => {
    setIsAnalyzing(true);
    
    try {
      // Simulate ML model predictions
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockRiskPredictions: RiskPrediction[] = [
        {
          type: 'Readmission Risk',
          risk_score: 0.23,
          confidence: 0.87,
          factors: ['Previous readmissions', 'Chronic conditions', 'Age'],
          recommendations: ['Enhanced discharge planning', 'Follow-up within 48 hours'],
          timeline: '30 days'
        },
        {
          type: 'Medication Adherence',
          risk_score: 0.45,
          confidence: 0.92,
          factors: ['Complex regimen', 'Cost factors', 'Side effects'],
          recommendations: ['Medication review', 'Patient education', 'Adherence monitoring'],
          timeline: '90 days'
        },
        {
          type: 'Deterioration Risk',
          risk_score: 0.15,
          confidence: 0.78,
          factors: ['Vital signs trends', 'Lab values', 'Comorbidities'],
          recommendations: ['Increased monitoring', 'Early intervention protocols'],
          timeline: '24 hours'
        }
      ];

      const mockTrendAnalysis: TrendAnalysis[] = [
        {
          metric: 'Average Length of Stay',
          current_value: 4.2,
          predicted_value: 3.8,
          trend_direction: 'decreasing',
          confidence: 0.85,
          impact: 'high'
        },
        {
          metric: 'Patient Satisfaction',
          current_value: 8.7,
          predicted_value: 9.1,
          trend_direction: 'increasing',
          confidence: 0.79,
          impact: 'medium'
        },
        {
          metric: 'Complication Rate',
          current_value: 2.3,
          predicted_value: 2.1,
          trend_direction: 'decreasing',
          confidence: 0.91,
          impact: 'high'
        }
      ];

      setRiskPredictions(mockRiskPredictions);
      setTrendAnalysis(mockTrendAnalysis);
    } catch (error) {
      console.error('Failed to generate predictive analytics:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 0.7) return 'text-red-500';
    if (score >= 0.4) return 'text-orange-500';
    return 'text-green-500';
  };

  const getRiskLevel = (score: number) => {
    if (score >= 0.7) return 'High';
    if (score >= 0.4) return 'Medium';
    return 'Low';
  };

  const getTrendIcon = (direction: string) => {
    switch (direction) {
      case 'increasing':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'decreasing':
        return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Predictive Analytics
            {selectedPatientId && <Badge variant="outline">Patient Specific</Badge>}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Zap className="h-3 w-3" />
              AI-Powered
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={generatePredictiveAnalytics}
              disabled={isAnalyzing}
            >
              <Brain className="h-4 w-4 mr-2" />
              {isAnalyzing ? 'Analyzing...' : 'Refresh Analysis'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeModel} onValueChange={setActiveModel} className="space-y-4">
            <TabsList>
              <TabsTrigger value="comprehensive">Comprehensive</TabsTrigger>
              <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
              <TabsTrigger value="trends">Trend Analysis</TabsTrigger>
              <TabsTrigger value="outcomes">Outcome Prediction</TabsTrigger>
            </TabsList>

            <TabsContent value="comprehensive" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Risk Predictions */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Risk Predictions
                  </h3>
                  {isAnalyzing ? (
                    <div className="space-y-3">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-24 bg-muted animate-pulse rounded" />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {riskPredictions.map((prediction, index) => (
                        <Card key={index} className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-medium">{prediction.type}</h4>
                              <p className="text-sm text-muted-foreground">
                                Timeline: {prediction.timeline}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className={`text-lg font-bold ${getRiskColor(prediction.risk_score)}`}>
                                {(prediction.risk_score * 100).toFixed(0)}%
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {getRiskLevel(prediction.risk_score)} Risk
                              </Badge>
                            </div>
                          </div>
                          <Progress 
                            value={prediction.risk_score * 100} 
                            className="mb-3"
                          />
                          <div className="space-y-2">
                            <div>
                              <p className="text-xs font-medium mb-1">Key Factors:</p>
                              <div className="flex flex-wrap gap-1">
                                {prediction.factors.map((factor, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs">
                                    {factor}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <p className="text-xs font-medium mb-1">Recommendations:</p>
                              <ul className="text-xs text-muted-foreground">
                                {prediction.recommendations.map((rec, i) => (
                                  <li key={i} className="flex items-start gap-1">
                                    <span>•</span>
                                    <span>{rec}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Target className="h-3 w-3" />
                              Confidence: {(prediction.confidence * 100).toFixed(0)}%
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>

                {/* Trend Analysis */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Trend Analysis
                  </h3>
                  {isAnalyzing ? (
                    <div className="space-y-3">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-20 bg-muted animate-pulse rounded" />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {trendAnalysis.map((trend, index) => (
                        <Card key={index} className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{trend.metric}</h4>
                            <div className="flex items-center gap-2">
                              {getTrendIcon(trend.trend_direction)}
                              <Badge 
                                variant={trend.impact === 'high' ? 'destructive' : trend.impact === 'medium' ? 'default' : 'secondary'}
                                className="text-xs"
                              >
                                {trend.impact} impact
                              </Badge>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Current</p>
                              <p className="font-semibold">{trend.current_value}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Predicted</p>
                              <p className="font-semibold">{trend.predicted_value}</p>
                            </div>
                          </div>
                          <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                            <Target className="h-3 w-3" />
                            Confidence: {(trend.confidence * 100).toFixed(0)}%
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="risk" className="space-y-4">
              {/* Detailed risk assessment view */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-red-500">3</div>
                  <div className="text-sm text-muted-foreground">High Risk Patients</div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-500">12</div>
                  <div className="text-sm text-muted-foreground">Medium Risk Patients</div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-500">85</div>
                  <div className="text-sm text-muted-foreground">Low Risk Patients</div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="trends" className="space-y-4">
              {/* Detailed trend analysis */}
              <div className="text-center text-muted-foreground">
                Detailed trend analysis charts would be implemented here
              </div>
            </TabsContent>

            <TabsContent value="outcomes" className="space-y-4">
              {/* Outcome predictions */}
              <div className="text-center text-muted-foreground">
                Outcome prediction models would be implemented here
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictiveAnalytics;
