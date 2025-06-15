
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// AI Pipeline Intelligence Engine
class AIPipelineIntelligence {
  static analyzePipelinePerformance(logs: any[]) {
    if (logs.length === 0) {
      return {
        health_score: 50,
        trend: 'unknown',
        recommendations: ['No historical data available for analysis']
      };
    }

    const recentLogs = logs.slice(0, 10); // Last 10 executions
    const successRate = (recentLogs.filter(log => log.status === 'success').length / recentLogs.length) * 100;
    
    const avgProcessingTime = recentLogs
      .filter(log => log.error_details?.performance_metrics?.processing_time_ms)
      .reduce((sum, log) => sum + log.error_details.performance_metrics.processing_time_ms, 0) / recentLogs.length || 0;

    const avgQualityScore = recentLogs
      .filter(log => log.error_details?.ai_quality_assessment?.overall_score)
      .reduce((sum, log) => sum + log.error_details.ai_quality_assessment.overall_score, 0) / recentLogs.length || 0;

    // Calculate overall health score
    const healthScore = (successRate * 0.4) + (avgQualityScore * 0.4) + ((avgProcessingTime < 3000 ? 100 : Math.max(0, 100 - (avgProcessingTime / 100))) * 0.2);

    // Determine trend
    let trend = 'stable';
    if (logs.length >= 3) {
      const recent = logs.slice(0, 3);
      const older = logs.slice(3, 6);
      
      const recentAvgQuality = recent.reduce((sum, log) => sum + (log.error_details?.ai_quality_assessment?.overall_score || 0), 0) / recent.length;
      const olderAvgQuality = older.reduce((sum, log) => sum + (log.error_details?.ai_quality_assessment?.overall_score || 0), 0) / older.length;
      
      if (recentAvgQuality > olderAvgQuality + 5) trend = 'improving';
      else if (recentAvgQuality < olderAvgQuality - 5) trend = 'declining';
    }

    // Generate recommendations
    const recommendations = [];
    if (successRate < 80) {
      recommendations.push('Pipeline reliability is below optimal. Review error patterns and implement fault tolerance.');
    }
    if (avgProcessingTime > 5000) {
      recommendations.push('Processing time is high. Consider data partitioning or resource scaling.');
    }
    if (avgQualityScore < 75) {
      recommendations.push('Data quality is declining. Implement enhanced validation and cleansing.');
    }
    if (trend === 'declining') {
      recommendations.push('Performance trend is declining. Immediate investigation recommended.');
    }

    return {
      health_score: Math.round(healthScore * 100) / 100,
      success_rate: Math.round(successRate * 100) / 100,
      avg_processing_time: Math.round(avgProcessingTime),
      avg_quality_score: Math.round(avgQualityScore * 100) / 100,
      trend,
      recommendations
    };
  }

  static generatePredictiveInsights(logs: any[], dataSources: any[]) {
    const insights = [];
    
    // Predict next failure
    const errorLogs = logs.filter(log => log.status === 'error');
    if (errorLogs.length > 0) {
      const avgTimeBetweenErrors = this.calculateAvgTimeBetweenEvents(errorLogs);
      if (avgTimeBetweenErrors > 0) {
        const lastError = new Date(errorLogs[0].started_at);
        const nextPredictedFailure = new Date(lastError.getTime() + avgTimeBetweenErrors);
        insights.push({
          type: 'failure_prediction',
          message: `Next potential failure predicted around ${nextPredictedFailure.toLocaleString()}`,
          confidence: 65,
          recommended_action: 'Schedule proactive maintenance'
        });
      }
    }

    // Capacity forecasting
    const processedRecords = logs
      .filter(log => log.records_processed > 0)
      .map(log => log.records_processed);
    
    if (processedRecords.length >= 3) {
      const avgRecords = processedRecords.reduce((sum, count) => sum + count, 0) / processedRecords.length;
      const trend = this.calculateTrend(processedRecords);
      
      insights.push({
        type: 'capacity_forecast',
        message: `Average processing volume: ${Math.round(avgRecords)} records. Trend: ${trend > 0 ? 'increasing' : trend < 0 ? 'decreasing' : 'stable'}`,
        confidence: 75,
        recommended_action: trend > 0 ? 'Consider scaling resources' : 'Current capacity adequate'
      });
    }

    // Quality degradation prediction
    const qualityScores = logs
      .filter(log => log.error_details?.ai_quality_assessment?.overall_score)
      .map(log => log.error_details.ai_quality_assessment.overall_score);
    
    if (qualityScores.length >= 3) {
      const qualityTrend = this.calculateTrend(qualityScores);
      if (qualityTrend < -2) {
        insights.push({
          type: 'quality_degradation',
          message: 'Data quality showing declining trend. Intervention recommended within 7 days.',
          confidence: 80,
          recommended_action: 'Implement enhanced data validation rules'
        });
      }
    }

    return insights;
  }

  static calculateAvgTimeBetweenEvents(events: any[]) {
    if (events.length < 2) return 0;
    
    let totalTime = 0;
    for (let i = 0; i < events.length - 1; i++) {
      const time1 = new Date(events[i].started_at).getTime();
      const time2 = new Date(events[i + 1].started_at).getTime();
      totalTime += Math.abs(time1 - time2);
    }
    
    return totalTime / (events.length - 1);
  }

  static calculateTrend(values: number[]) {
    if (values.length < 2) return 0;
    
    const n = values.length;
    const sumX = (n * (n + 1)) / 2;
    const sumY = values.reduce((sum, val) => sum + val, 0);
    const sumXY = values.reduce((sum, val, index) => sum + val * (index + 1), 0);
    const sumX2 = (n * (n + 1) * (2 * n + 1)) / 6;
    
    return (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  }

  static generateOptimizationSuggestions(dataSources: any[], logs: any[]) {
    const suggestions = [];
    
    // Analyze data source configurations
    dataSources.forEach(source => {
      if (source.health_score < 80) {
        suggestions.push({
          source_id: source.id,
          source_name: source.name,
          type: 'configuration',
          suggestion: 'Health score below optimal. Review configuration and data quality rules.',
          impact: 'high'
        });
      }
      
      if (!source.schedule_cron) {
        suggestions.push({
          source_id: source.id,
          source_name: source.name,
          type: 'scheduling',
          suggestion: 'No scheduled processing configured. Consider automated scheduling for consistency.',
          impact: 'medium'
        });
      }
    });

    // Analyze processing patterns
    const sourcePerformance = new Map();
    logs.forEach(log => {
      if (log.data_source_id) {
        if (!sourcePerformance.has(log.data_source_id)) {
          sourcePerformance.set(log.data_source_id, []);
        }
        sourcePerformance.get(log.data_source_id).push(log);
      }
    });

    sourcePerformance.forEach((sourceLogs, sourceId) => {
      const source = dataSources.find(s => s.id === sourceId);
      if (!source) return;

      const avgProcessingTime = sourceLogs
        .filter(log => log.error_details?.performance_metrics?.processing_time_ms)
        .reduce((sum, log) => sum + log.error_details.performance_metrics.processing_time_ms, 0) / sourceLogs.length;

      if (avgProcessingTime > 5000) {
        suggestions.push({
          source_id: sourceId,
          source_name: source.name,
          type: 'performance',
          suggestion: `Average processing time (${Math.round(avgProcessingTime)}ms) is high. Consider data optimization.`,
          impact: 'high'
        });
      }
    });

    return suggestions;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    console.log("AI Pipeline Intelligence: Starting comprehensive analysis...");

    // Fetch recent ingestion logs
    const { data: logs, error: logsError } = await supabaseAdmin
      .from('ingestion_logs')
      .select('*')
      .order('started_at', { ascending: false })
      .limit(50);

    if (logsError) {
      throw new Error(`Failed to fetch ingestion logs: ${logsError.message}`);
    }

    // Fetch data sources
    const { data: dataSources, error: sourcesError } = await supabaseAdmin
      .from('data_sources')
      .select('*');

    if (sourcesError) {
      throw new Error(`Failed to fetch data sources: ${sourcesError.message}`);
    }

    // Perform AI analysis
    const performanceAnalysis = AIPipelineIntelligence.analyzePipelinePerformance(logs || []);
    const predictiveInsights = AIPipelineIntelligence.generatePredictiveInsights(logs || [], dataSources || []);
    const optimizationSuggestions = AIPipelineIntelligence.generateOptimizationSuggestions(dataSources || [], logs || []);

    // Generate comprehensive intelligence report
    const intelligenceReport = {
      analysis_timestamp: new Date().toISOString(),
      system_health: {
        overall_score: performanceAnalysis.health_score,
        trend: performanceAnalysis.trend,
        success_rate: performanceAnalysis.success_rate,
        avg_quality_score: performanceAnalysis.avg_quality_score
      },
      predictive_insights: predictiveInsights,
      optimization_suggestions: optimizationSuggestions,
      recommendations: performanceAnalysis.recommendations,
      data_sources_analyzed: dataSources?.length || 0,
      logs_analyzed: logs?.length || 0
    };

    console.log(`AI Pipeline Intelligence: Analysis complete. System health: ${performanceAnalysis.health_score}%`);

    return new Response(JSON.stringify(intelligenceReport), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error: any) {
    console.error('Error in AI Pipeline Intelligence function:', error.message);
    return new Response(JSON.stringify({ 
      error: error.message,
      ai_status: 'analysis_error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
