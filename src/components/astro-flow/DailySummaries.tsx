import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DailySummary, FlowUserRole } from './types';
import { TrendingUp, TrendingDown, Activity, Brain, Download, Calendar, ArrowRight } from 'lucide-react';

interface DailySummariesProps {
  userRole: FlowUserRole;
}

const DailySummaries = ({ userRole }: DailySummariesProps) => {
  const [summaries] = useState<DailySummary[]>([
    {
      id: '1',
      date: '2024-01-20',
      totalExecutions: 156,
      successfulExecutions: 152,
      failedExecutions: 4,
      topTriggeredRules: [
        { ruleId: '1', ruleName: 'SLA Breach Alert', executionCount: 47 },
        { ruleId: '2', ruleName: 'Surge Prediction Alert', executionCount: 23 },
        { ruleId: '3', ruleName: 'Data Anomaly Detection', executionCount: 18 }
      ],
      insights: [
        'Patient wait times exceeded SLA thresholds 47 times, primarily during 2-4 PM period',
        'Surge predictions achieved 94% accuracy with 2-hour lead time',
        'Data anomaly detection identified 3 critical system issues before impact'
      ],
      recommendations: [
        'Consider additional staffing during peak afternoon hours',
        'Implement proactive bed management based on surge predictions',
        'Review data quality checks for early anomaly detection'
      ],
      createdAt: '2024-01-21T06:00:00Z'
    },
    {
      id: '2',
      date: '2024-01-19',
      totalExecutions: 142,
      successfulExecutions: 139,
      failedExecutions: 3,
      topTriggeredRules: [
        { ruleId: '1', ruleName: 'SLA Breach Alert', executionCount: 52 },
        { ruleId: '4', ruleName: 'Critical Patient Alert', executionCount: 28 },
        { ruleId: '2', ruleName: 'Surge Prediction Alert', executionCount: 19 }
      ],
      insights: [
        'Higher than average SLA breaches due to emergency room influx',
        'Critical patient alerts showed 15% increase from previous day',
        'System maintained 97.9% success rate despite high volume'
      ],
      recommendations: [
        'Evaluate emergency response protocols',
        'Review critical patient triage processes',
        'Monitor capacity management during high-demand periods'
      ],
      createdAt: '2024-01-20T06:00:00Z'
    }
  ]);

  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');

  const canExport = userRole === 'ADMIN' || userRole === 'EXEC';

  const calculateSuccessRate = (successful: number, total: number) => {
    return total > 0 ? Math.round((successful / total) * 100) : 0;
  };

  const getSuccessRateColor = (rate: number) => {
    if (rate >= 95) return 'text-green-400';
    if (rate >= 90) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getSuccessRateBadgeColor = (rate: number) => {
    if (rate >= 95) return 'bg-green-600';
    if (rate >= 90) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const generateExecutiveSummary = (summary: DailySummary) => {
    const successRate = calculateSuccessRate(summary.successfulExecutions, summary.totalExecutions);
    
    return `On ${formatDate(summary.date)}, our automation system processed ${summary.totalExecutions} events with a ${successRate}% success rate. Key areas of focus include ${summary.topTriggeredRules[0].ruleName.toLowerCase()} (${summary.topTriggeredRules[0].executionCount} triggers) and operational efficiency improvements.`;
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">Daily Automation Summaries</CardTitle>
              <CardDescription>Executive insights and operational analytics</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                <SelectTrigger className="w-32 bg-slate-800 border-slate-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="14d">Last 14 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                </SelectContent>
              </Select>
              {canExport && (
                <Button variant="outline" size="sm" className="border-slate-600">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {summaries.map((summary) => {
              const successRate = calculateSuccessRate(summary.successfulExecutions, summary.totalExecutions);
              
              return (
                <div key={summary.id} className="border border-slate-700 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-cyan-400" />
                      <h3 className="text-xl font-semibold text-white">{formatDate(summary.date)}</h3>
                    </div>
                    <Badge className={getSuccessRateBadgeColor(successRate)}>
                      {successRate}% Success Rate
                    </Badge>
                  </div>

                  {/* Executive Summary for EXEC role */}
                  {userRole === 'EXEC' && summary.topTriggeredRules.length > 0 && (
                    <div className="mb-6 p-4 bg-slate-800 rounded-lg border-l-4 border-purple-400">
                      <h4 className="text-sm font-medium text-purple-400 mb-2">Executive Summary</h4>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {generateExecutiveSummary(summary)}
                      </p>
                    </div>
                  )}

                  {/* Key Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-slate-800 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Activity className="h-4 w-4 text-cyan-400" />
                        <span className="text-sm text-slate-400">Total Executions</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{summary.totalExecutions}</div>
                    </div>

                    <div className="bg-slate-800 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-green-400" />
                        <span className="text-sm text-slate-400">Successful</span>
                      </div>
                      <div className="text-2xl font-bold text-green-400">{summary.successfulExecutions}</div>
                    </div>

                    <div className="bg-slate-800 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingDown className="h-4 w-4 text-red-400" />
                        <span className="text-sm text-slate-400">Failed</span>
                      </div>
                      <div className="text-2xl font-bold text-red-400">{summary.failedExecutions}</div>
                    </div>

                    <div className="bg-slate-800 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="h-4 w-4 text-purple-400" />
                        <span className="text-sm text-slate-400">Success Rate</span>
                      </div>
                      <div className={`text-2xl font-bold ${getSuccessRateColor(successRate)}`}>
                        {successRate}%
                      </div>
                    </div>
                  </div>

                  {/* Top Triggered Rules */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-4">Most Triggered Rules</h4>
                    <div className="space-y-3">
                      {summary.topTriggeredRules.map((rule, index) => (
                        <div key={rule.ruleId} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center p-0">
                              {index + 1}
                            </Badge>
                            <span className="text-slate-300 font-medium">{rule.ruleName}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-400 text-sm">{rule.executionCount} executions</span>
                            <ArrowRight className="h-4 w-4 text-slate-500" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Insights and Recommendations */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">Key Insights</h4>
                      <div className="space-y-3">
                        {summary.insights.map((insight, index) => (
                          <div key={index} className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                            <div className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                              <p className="text-slate-300 text-sm">{insight}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">Recommendations</h4>
                      <div className="space-y-3">
                        {summary.recommendations.map((recommendation, index) => (
                          <div key={index} className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                            <div className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                              <p className="text-slate-300 text-sm">{recommendation}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white text-lg">Weekly Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Average Success Rate</span>
                <span className="text-green-400 font-bold">96.8%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Total Executions</span>
                <span className="text-white font-bold">1,247</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Most Active Rule</span>
                <span className="text-cyan-400 font-bold">SLA Breach Alert</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white text-lg">Trend Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-400" />
                <span className="text-slate-300 text-sm">15% improvement in response time</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-400" />
                <span className="text-slate-300 text-sm">8% reduction in false positives</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-red-400" />
                <span className="text-slate-300 text-sm">3% increase in execution volume</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white text-lg">System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Email Service</span>
                <Badge className="bg-green-600">Operational</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Slack Integration</span>
                <Badge className="bg-green-600">Operational</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">AI Predictor</span>
                <Badge className="bg-green-600">Operational</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DailySummaries;
