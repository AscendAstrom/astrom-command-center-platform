
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Zap, Target, TrendingUp, CheckCircle, AlertCircle, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const AIPipelineGenerator = () => {
  const [generating, setGenerating] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  const handleGenerateAnalysis = async () => {
    setGenerating(true);
    try {
      // Fetch data sources for analysis
      const { data: dataSources, error } = await supabase
        .from('data_sources')
        .select('*');

      if (error) throw error;

      if (!dataSources || dataSources.length === 0) {
        toast.info("No data sources found. Add data sources to enable AI pipeline generation.");
        return;
      }

      // Analyze data sources and generate recommendations
      const aiAnalysis = {
        timestamp: new Date().toISOString(),
        sources_analyzed: dataSources.length,
        pipeline_recommendations: [],
        optimization_suggestions: [],
        auto_generation_candidates: []
      };

      // AI analysis logic
      dataSources.forEach(source => {
        const sourceAnalysis = {
          source_id: source.id,
          source_name: source.name,
          source_type: source.type,
          health_score: source.health_score || 0,
          recommendations: []
        };

        // Generate recommendations based on source configuration
        if (source.health_score < 80) {
          sourceAnalysis.recommendations.push("Configure data quality monitoring");
          aiAnalysis.optimization_suggestions.push({
            type: "quality_improvement",
            source: source.name,
            suggestion: "Implement enhanced validation rules to improve health score",
            impact: "high"
          });
        }

        if (!source.schedule_cron) {
          sourceAnalysis.recommendations.push("Enable automated scheduling");
          aiAnalysis.pipeline_recommendations.push({
            type: "scheduling",
            source: source.name,
            recommendation: "Configure automated data ingestion schedule",
            suggested_schedule: "0 */6 * * *" // Every 6 hours
          });
        }

        if (source.type === 'CSV' && source.records_count > 10000) {
          aiAnalysis.auto_generation_candidates.push({
            source: source.name,
            pipeline_type: "batch_processing",
            reason: "Large dataset suitable for optimized batch pipeline",
            estimated_improvement: "40% faster processing"
          });
        }
      });

      // Add general AI insights
      if (dataSources.length > 3) {
        aiAnalysis.optimization_suggestions.push({
          type: "federation",
          suggestion: "Consider implementing federated data processing for multiple sources",
          impact: "medium"
        });
      }

      setAnalysis(aiAnalysis);
      toast.success("AI pipeline analysis completed successfully!");

    } catch (error) {
      console.error('Error generating AI analysis:', error);
      toast.error("Failed to generate AI analysis");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <Card className="surface-elevated border-border/50 glass-card animate-fade-in">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-400" />
              AI Pipeline Generator
            </CardTitle>
            <CardDescription>
              Intelligent pipeline analysis and automated optimization recommendations
            </CardDescription>
          </div>
          <Button
            onClick={handleGenerateAnalysis}
            disabled={generating}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          >
            <Brain className={`h-4 w-4 mr-2 ${generating ? 'animate-spin' : ''}`} />
            {generating ? 'Analyzing...' : 'Generate AI Analysis'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {!analysis ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-950/20 dark:to-blue-950/20 flex items-center justify-center">
              <Brain className="h-8 w-8 text-purple-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">AI Pipeline Intelligence</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Click "Generate AI Analysis" to get intelligent recommendations for optimizing your data pipelines and automating workflows.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Analysis Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 p-4 rounded-lg border border-blue-200/50 dark:border-blue-800/50">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-5 w-5 text-blue-500" />
                  <span className="font-semibold text-blue-600 dark:text-blue-400">Sources Analyzed</span>
                </div>
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                  {analysis.sources_analyzed}
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 p-4 rounded-lg border border-green-200/50 dark:border-green-800/50">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-5 w-5 text-green-500" />
                  <span className="font-semibold text-green-600 dark:text-green-400">Recommendations</span>
                </div>
                <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                  {analysis.pipeline_recommendations.length + analysis.optimization_suggestions.length}
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 p-4 rounded-lg border border-purple-200/50 dark:border-purple-800/50">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-purple-500" />
                  <span className="font-semibold text-purple-600 dark:text-purple-400">Auto-Gen Ready</span>
                </div>
                <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                  {analysis.auto_generation_candidates.length}
                </p>
              </div>
            </div>

            {/* Pipeline Recommendations */}
            {analysis.pipeline_recommendations.length > 0 && (
              <div>
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Pipeline Recommendations
                </h4>
                <div className="space-y-3">
                  {analysis.pipeline_recommendations.map((rec: any, index: number) => (
                    <div key={index} className="surface-elevated rounded-lg p-4 border border-border/30">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-foreground">{rec.source}</div>
                        <Badge variant="outline" className="text-green-600 border-green-600 bg-green-50 dark:bg-green-950/20">
                          {rec.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{rec.recommendation}</p>
                      {rec.suggested_schedule && (
                        <div className="mt-2 text-xs text-blue-600 dark:text-blue-400">
                          Suggested Schedule: <code className="bg-blue-100 dark:bg-blue-950/30 px-2 py-1 rounded">{rec.suggested_schedule}</code>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Optimization Suggestions */}
            {analysis.optimization_suggestions.length > 0 && (
              <div>
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  Optimization Opportunities
                </h4>
                <div className="space-y-3">
                  {analysis.optimization_suggestions.map((opt: any, index: number) => (
                    <div key={index} className="surface-elevated rounded-lg p-4 border border-border/30">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-foreground">{opt.source || 'System-wide'}</div>
                        <Badge variant="outline" className={`
                          ${opt.impact === 'high' ? 'text-red-600 border-red-600 bg-red-50 dark:bg-red-950/20' : 
                            opt.impact === 'medium' ? 'text-yellow-600 border-yellow-600 bg-yellow-50 dark:bg-yellow-950/20' :
                            'text-blue-600 border-blue-600 bg-blue-50 dark:bg-blue-950/20'}
                        `}>
                          {opt.impact} impact
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{opt.suggestion}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Auto-Generation Candidates */}
            {analysis.auto_generation_candidates.length > 0 && (
              <div>
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Brain className="h-4 w-4 text-purple-500" />
                  Auto-Generation Candidates
                </h4>
                <div className="space-y-3">
                  {analysis.auto_generation_candidates.map((candidate: any, index: number) => (
                    <div key={index} className="surface-elevated rounded-lg p-4 border border-border/30 bg-gradient-to-r from-purple-50/50 to-blue-50/50 dark:from-purple-950/10 dark:to-blue-950/10">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-foreground">{candidate.source}</div>
                        <Badge variant="outline" className="text-purple-600 border-purple-600 bg-purple-50 dark:bg-purple-950/20">
                          {candidate.pipeline_type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{candidate.reason}</p>
                      <div className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                        Expected Improvement: {candidate.estimated_improvement}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Refresh Analysis */}
            <div className="flex justify-center pt-4">
              <Button
                variant="outline"
                onClick={handleGenerateAnalysis}
                disabled={generating}
                className="hover:bg-purple-500/10 border-purple-500/20"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${generating ? 'animate-spin' : ''}`} />
                Refresh Analysis
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
