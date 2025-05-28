
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { SurgeModelPrediction, FlowUserRole } from './types';
import { Brain, TrendingUp, AlertTriangle, CheckCircle, RefreshCw, Settings } from 'lucide-react';

interface SurgePredictorProps {
  userRole: FlowUserRole;
}

const SurgePredictor = ({ userRole }: SurgePredictorProps) => {
  const [isAIEnabled, setIsAIEnabled] = useState(true);
  const [predictions] = useState<SurgeModelPrediction[]>([
    {
      id: '1',
      timestamp: '2024-01-20T15:00:00Z',
      predictedCapacity: 94,
      currentCapacity: 78,
      confidenceScore: 87,
      timeFrame: '2h',
      factors: ['Historical patterns', 'Weather conditions', 'Local events'],
      recommendations: ['Prepare overflow unit', 'Alert additional staff', 'Review discharge queue']
    },
    {
      id: '2',
      timestamp: '2024-01-20T14:30:00Z',
      predictedCapacity: 82,
      currentCapacity: 78,
      confidenceScore: 92,
      timeFrame: '1h',
      factors: ['Current trends', 'Admission patterns'],
      recommendations: ['Monitor closely', 'Optimize bed turnover']
    }
  ]);

  const canConfigureAI = userRole === 'ADMIN';

  const getCapacityColor = (capacity: number) => {
    if (capacity >= 90) return 'text-red-400';
    if (capacity >= 80) return 'text-yellow-400';
    if (capacity >= 70) return 'text-orange-400';
    return 'text-green-400';
  };

  const getCapacityBadgeColor = (capacity: number) => {
    if (capacity >= 90) return 'bg-red-600';
    if (capacity >= 80) return 'bg-yellow-600';
    if (capacity >= 70) return 'bg-orange-600';
    return 'bg-green-600';
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 85) return 'text-green-400';
    if (confidence >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const formatTimeFrame = (timeFrame: string) => {
    const timeFrameMap: Record<string, string> = {
      '1h': '1 Hour',
      '2h': '2 Hours',
      '4h': '4 Hours',
      '6h': '6 Hours',
      '12h': '12 Hours'
    };
    return timeFrameMap[timeFrame] || timeFrame;
  };

  const currentPrediction = predictions[0];

  return (
    <div className="space-y-6">
      {/* AI Toggle and Status */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-400" />
                AI Surge Prediction Model
              </CardTitle>
              <CardDescription>Predictive analytics for capacity management</CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">AI Predictions</span>
                {canConfigureAI && (
                  <Switch
                    checked={isAIEnabled}
                    onCheckedChange={setIsAIEnabled}
                  />
                )}
              </div>
              <Badge className={isAIEnabled ? 'bg-green-600' : 'bg-gray-600'}>
                {isAIEnabled ? 'Active' : 'Disabled'}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isAIEnabled ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <div>
                  <p className="text-sm text-muted-foreground">Model Status</p>
                  <p className="text-foreground font-medium">Online</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-cyan-400" />
                <div>
                  <p className="text-sm text-muted-foreground">Accuracy</p>
                  <p className="text-foreground font-medium">91.3%</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5 text-blue-400" />
                <div>
                  <p className="text-sm text-muted-foreground">Last Update</p>
                  <p className="text-foreground font-medium">2 min ago</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-400" />
                <div>
                  <p className="text-sm text-muted-foreground">Predictions</p>
                  <p className="text-foreground font-medium">847 today</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">AI Surge Prediction is currently disabled</p>
              {canConfigureAI && (
                <p className="text-sm text-muted-foreground mt-2">Enable to start receiving predictions</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {isAIEnabled && (
        <>
          {/* Current Prediction */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Current Surge Prediction</CardTitle>
              <CardDescription>Real-time capacity forecasting for the next {formatTimeFrame(currentPrediction.timeFrame)}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                  {/* Capacity Prediction */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-foreground">Predicted Capacity</h3>
                      <Badge className={getCapacityBadgeColor(currentPrediction.predictedCapacity)}>
                        {currentPrediction.predictedCapacity >= 90 ? 'Critical' : 
                         currentPrediction.predictedCapacity >= 80 ? 'High' : 
                         currentPrediction.predictedCapacity >= 70 ? 'Medium' : 'Normal'}
                      </Badge>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Current</span>
                        <span className={`font-bold ${getCapacityColor(currentPrediction.currentCapacity)}`}>
                          {currentPrediction.currentCapacity}%
                        </span>
                      </div>
                      <Progress value={currentPrediction.currentCapacity} className="h-2" />
                      
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Predicted ({formatTimeFrame(currentPrediction.timeFrame)})</span>
                        <span className={`font-bold ${getCapacityColor(currentPrediction.predictedCapacity)}`}>
                          {currentPrediction.predictedCapacity}%
                        </span>
                      </div>
                      <Progress value={currentPrediction.predictedCapacity} className="h-2" />
                    </div>
                  </div>

                  {/* Confidence Score */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-foreground">Confidence Score</h3>
                      <span className={`font-bold ${getConfidenceColor(currentPrediction.confidenceScore)}`}>
                        {currentPrediction.confidenceScore}%
                      </span>
                    </div>
                    <Progress value={currentPrediction.confidenceScore} className="h-2" />
                    <p className="text-sm text-muted-foreground mt-2">
                      {currentPrediction.confidenceScore >= 85 ? 'High confidence prediction' :
                       currentPrediction.confidenceScore >= 70 ? 'Moderate confidence prediction' :
                       'Low confidence prediction'}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Influencing Factors */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Influencing Factors</h3>
                    <div className="space-y-2">
                      {currentPrediction.factors.map((factor, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                          <span className="text-foreground">{factor}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">AI Recommendations</h3>
                    <div className="space-y-3">
                      {currentPrediction.recommendations.map((recommendation, index) => (
                        <div key={index} className="p-3 bg-muted rounded-lg border-l-4 border-cyan-400">
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                            <span className="text-foreground text-sm">{recommendation}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prediction History */}
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-foreground">Prediction History</CardTitle>
                  <CardDescription>Recent surge predictions and accuracy tracking</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="border-border">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {predictions.map((prediction) => (
                  <div key={prediction.id} className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="text-foreground font-medium">
                            {formatTimeFrame(prediction.timeFrame)} Prediction
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(prediction.timestamp).toLocaleString()}
                          </div>
                        </div>
                        <Badge className={getCapacityBadgeColor(prediction.predictedCapacity)}>
                          {prediction.predictedCapacity}% capacity
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className={`font-medium ${getConfidenceColor(prediction.confidenceScore)}`}>
                          {prediction.confidenceScore}% confidence
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Current: {prediction.currentCapacity}%
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-foreground mb-2">Factors</h4>
                        <div className="flex flex-wrap gap-2">
                          {prediction.factors.map((factor, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {factor}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-foreground mb-2">Recommendations</h4>
                        <div className="text-sm text-muted-foreground">
                          {prediction.recommendations.length} action items generated
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Model Configuration */}
          {canConfigureAI && (
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Settings className="h-5 w-5 text-cyan-400" />
                  Model Configuration
                </CardTitle>
                <CardDescription>Configure AI model parameters and data sources</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-medium text-foreground mb-2">Data Sources</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Patient admissions</span>
                        <Badge className="bg-green-600">Connected</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Historical patterns</span>
                        <Badge className="bg-green-600">Connected</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">External events</span>
                        <Badge className="bg-green-600">Connected</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-medium text-foreground mb-2">Model Parameters</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Prediction window</span>
                        <span className="text-foreground">2-12 hours</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Update frequency</span>
                        <span className="text-foreground">Every 15 min</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Confidence threshold</span>
                        <span className="text-foreground">70%</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-medium text-foreground mb-2">Performance Metrics</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">30-day accuracy</span>
                        <span className="text-green-400">91.3%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Predictions made</span>
                        <span className="text-foreground">2,847</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Model version</span>
                        <span className="text-foreground">v2.1.4</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default SurgePredictor;
