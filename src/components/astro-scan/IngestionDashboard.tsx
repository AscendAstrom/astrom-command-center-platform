
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Activity, AlertTriangle, CheckCircle, Clock, Brain, TrendingUp, Zap, Target, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const IngestionDashboard = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [intelligenceReport, setIntelligenceReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchLogs();
    fetchIntelligenceReport();
    
    // Set up real-time subscription for ingestion logs
    const channel = supabase
      .channel('ingestion_logs_changes')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'ingestion_logs' },
        () => {
          fetchLogs();
          fetchIntelligenceReport();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchLogs = async () => {
    try {
      const { data, error } = await supabase
        .from('ingestion_logs')
        .select(`
          *,
          data_sources (name, type)
        `)
        .order('started_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setLogs(data || []);
    } catch (error) {
      console.error('Error fetching logs:', error);
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchIntelligenceReport = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('ai-pipeline-intelligence');
      if (error) throw error;
      setIntelligenceReport(data);
    } catch (error) {
      console.error('Error fetching AI intelligence report:', error);
    }
  };

  const handleRefreshIntelligence = async () => {
    setRefreshing(true);
    try {
      await fetchIntelligenceReport();
      toast.success("AI intelligence report refreshed successfully!");
    } catch (error) {
      toast.error("Failed to refresh AI intelligence report");
    } finally {
      setRefreshing(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'success':
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-status-success" />;
      case 'error':
      case 'failed':
        return <AlertTriangle className="h-4 w-4 text-status-error" />;
      case 'running':
      case 'syncing':
        return <Activity className="h-4 w-4 text-astrom-blue animate-pulse" />;
      default:
        return <Clock className="h-4 w-4 text-status-warning" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'success':
      case 'completed':
        return 'text-status-success border-status-success bg-status-success/10';
      case 'error':
      case 'failed':
        return 'text-status-error border-status-error bg-status-error/10';
      case 'running':
      case 'syncing':
        return 'text-astrom-blue border-astrom-blue bg-astrom-blue/10';
      default:
        return 'text-status-warning border-status-warning bg-status-warning/10';
    }
  };

  const getQualityScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 75) return 'text-yellow-500';
    if (score >= 50) return 'text-orange-500';
    return 'text-red-500';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'declining':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Target className="h-4 w-4 text-blue-500" />;
    }
  };

  if (loading) {
    return (
      <Card className="surface-elevated border-border/50 glass-card animate-fade-in">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-400" />
            AI-Enhanced Ingestion Dashboard
          </CardTitle>
          <CardDescription>Loading AI-powered pipeline monitoring...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={`loading-${i}`} className="surface-elevated rounded-xl p-4 animate-pulse">
                <div className="h-4 bg-muted rounded-lg w-3/4 mb-2"></div>
                <div className="h-3 bg-muted rounded-lg w-1/2"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* AI Intelligence Summary */}
      {intelligenceReport && (
        <Card className="surface-elevated border-border/50 glass-card animate-fade-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-foreground flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-400" />
                AI Pipeline Intelligence
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefreshIntelligence}
                disabled={refreshing}
                className="hover:bg-purple-500/10 border-purple-500/20"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
            <CardDescription>Real-time AI analysis of pipeline performance and health</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 p-4 rounded-lg border border-purple-200/50 dark:border-purple-800/50">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="h-5 w-5 text-purple-500" />
                  <span className="font-semibold text-purple-600 dark:text-purple-400">Overall Health</span>
                </div>
                <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                  {intelligenceReport.system_health.overall_score.toFixed(1)}%
                </p>
                <div className="flex items-center gap-1 mt-1">
                  {getTrendIcon(intelligenceReport.system_health.trend)}
                  <span className="text-sm text-purple-600 dark:text-purple-400 capitalize">
                    {intelligenceReport.system_health.trend}
                  </span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 p-4 rounded-lg border border-green-200/50 dark:border-green-800/50">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="font-semibold text-green-600 dark:text-green-400">Success Rate</span>
                </div>
                <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                  {intelligenceReport.system_health.success_rate.toFixed(1)}%
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 p-4 rounded-lg border border-blue-200/50 dark:border-blue-800/50">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-5 w-5 text-blue-500" />
                  <span className="font-semibold text-blue-600 dark:text-blue-400">Data Quality</span>
                </div>
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                  {intelligenceReport.system_health.avg_quality_score.toFixed(1)}%
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 p-4 rounded-lg border border-orange-200/50 dark:border-orange-800/50">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="h-5 w-5 text-orange-500" />
                  <span className="font-semibold text-orange-600 dark:text-orange-400">Sources</span>
                </div>
                <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                  {intelligenceReport.data_sources_analyzed}
                </p>
              </div>
            </div>

            {/* AI Recommendations */}
            {intelligenceReport.recommendations && intelligenceReport.recommendations.length > 0 && (
              <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200/50 dark:border-yellow-800/50 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-2 flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  AI Recommendations
                </h4>
                <ul className="space-y-1">
                  {intelligenceReport.recommendations.map((rec: string, index: number) => (
                    <li key={index} className="text-sm text-yellow-600 dark:text-yellow-400">
                      • {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Predictive Insights */}
            {intelligenceReport.predictive_insights && intelligenceReport.predictive_insights.length > 0 && (
              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-800/50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Predictive Insights
                </h4>
                <div className="space-y-2">
                  {intelligenceReport.predictive_insights.map((insight: any, index: number) => (
                    <div key={index} className="text-sm">
                      <span className="font-medium text-blue-600 dark:text-blue-400">{insight.type}:</span>
                      <span className="text-blue-700 dark:text-blue-300 ml-2">{insight.message}</span>
                      <span className="text-xs text-blue-500 ml-2">({insight.confidence}% confidence)</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Enhanced Ingestion Logs */}
      <Card className="surface-elevated border-border/50 glass-card animate-fade-in hover-lift">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <div className="p-2 rounded-xl bg-astrom-blue/10">
              <Activity className="h-5 w-5 text-astrom-blue" />
            </div>
            AI-Enhanced Ingestion Activity
          </CardTitle>
          <CardDescription>Real-time monitoring with AI quality assessment and insights</CardDescription>
        </CardHeader>
        <CardContent>
          {logs.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-muted/50 flex items-center justify-center">
                <Brain className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">AI Monitoring Ready</h3>
                <p className="text-muted-foreground">No ingestion activity yet. AI monitoring is active and ready to analyze your data pipelines.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {logs.map((log, index) => (
                <div 
                  key={`log-${log.id}-${index}`} 
                  className="surface-elevated rounded-xl p-4 border border-border/30 hover-lift animate-slide-up transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(log.status)}
                      <div>
                        <div className="font-semibold text-foreground">
                          {log.data_sources?.name || 'System Monitor'}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {log.data_sources?.type || 'System'} • {new Date(log.started_at).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <Badge variant="outline" className={getStatusColor(log.status)}>
                        {log.status}
                      </Badge>
                      {log.error_details?.ai_quality_assessment?.overall_score && (
                        <div className="text-xs">
                          <span className="text-muted-foreground">Quality: </span>
                          <span className={`font-semibold ${getQualityScoreColor(log.error_details.ai_quality_assessment.overall_score)}`}>
                            {log.error_details.ai_quality_assessment.overall_score.toFixed(1)}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {log.message && (
                    <div className="text-sm text-foreground/80 mb-3 p-3 bg-muted/30 rounded-lg">
                      {log.message}
                    </div>
                  )}

                  {/* AI Quality Assessment Display */}
                  {log.error_details?.ai_quality_assessment && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                      <div className="bg-blue-50 dark:bg-blue-950/20 p-2 rounded text-center">
                        <div className="text-xs text-blue-600 dark:text-blue-400">Completeness</div>
                        <div className="font-semibold text-blue-700 dark:text-blue-300">
                          {log.error_details.ai_quality_assessment.completeness_score.toFixed(1)}%
                        </div>
                      </div>
                      <div className="bg-green-50 dark:bg-green-950/20 p-2 rounded text-center">
                        <div className="text-xs text-green-600 dark:text-green-400">Accuracy</div>
                        <div className="font-semibold text-green-700 dark:text-green-300">
                          {log.error_details.ai_quality_assessment.accuracy_score.toFixed(1)}%
                        </div>
                      </div>
                      <div className="bg-purple-50 dark:bg-purple-950/20 p-2 rounded text-center">
                        <div className="text-xs text-purple-600 dark:text-purple-400">Consistency</div>
                        <div className="font-semibold text-purple-700 dark:text-purple-300">
                          {log.error_details.ai_quality_assessment.consistency_score.toFixed(1)}%
                        </div>
                      </div>
                      <div className="bg-orange-50 dark:bg-orange-950/20 p-2 rounded text-center">
                        <div className="text-xs text-orange-600 dark:text-orange-400">Timeliness</div>
                        <div className="font-semibold text-orange-700 dark:text-orange-300">
                          {log.error_details.ai_quality_assessment.timeliness_score.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  )}

                  {/* AI Insights */}
                  {log.error_details?.ai_insights && log.error_details.ai_insights.length > 0 && (
                    <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200/50 dark:border-purple-800/50 rounded-lg p-3 mb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="h-4 w-4 text-purple-500" />
                        <span className="font-medium text-purple-700 dark:text-purple-300">AI Insights</span>
                      </div>
                      <ul className="space-y-1">
                        {log.error_details.ai_insights.map((insight: string, i: number) => (
                          <li key={i} className="text-sm text-purple-600 dark:text-purple-400">• {insight}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm">
                    <div className="text-muted-foreground">
                      Records: <span className="font-medium text-foreground">{log.records_processed || 0}</span>
                      {log.error_details?.performance_metrics?.processing_time_ms && (
                        <span className="ml-4">
                          Time: <span className="font-medium text-foreground">{log.error_details.performance_metrics.processing_time_ms}ms</span>
                        </span>
                      )}
                    </div>
                    {log.status === 'running' && (
                      <div className="flex items-center gap-2">
                        <Progress value={65} className="w-24 h-2" />
                        <span className="text-muted-foreground font-medium">Processing...</span>
                      </div>
                    )}
                  </div>

                  {log.error_details?.error_message && (
                    <div className="mt-3 p-3 bg-status-error/10 border border-status-error/20 rounded-lg text-sm text-status-error">
                      <div className="flex items-center gap-2 mb-1">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="font-medium">Error Details</span>
                      </div>
                      {log.error_details.error_message}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
