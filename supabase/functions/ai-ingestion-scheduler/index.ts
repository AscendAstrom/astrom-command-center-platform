
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// AI Data Quality Assessment Engine
class AIDataQualityEngine {
  static assessDataQuality(fileContent: string, config: any) {
    const lines = fileContent.split('\n').filter(line => line.trim() !== '');
    const hasHeader = config?.hasHeader === undefined ? true : config.hasHeader;
    const dataLines = hasHeader ? lines.slice(1) : lines;
    
    if (dataLines.length === 0) {
      return {
        completeness_score: 0,
        accuracy_score: 0,
        consistency_score: 0,
        timeliness_score: 50,
        overall_score: 12.5,
        issues: ['No data rows found'],
        recommendations: ['Check file format and content', 'Verify data source connectivity']
      };
    }

    const delimiter = config?.delimiter || ',';
    const expectedColumns = hasHeader ? lines[0].split(delimiter).length : dataLines[0].split(delimiter).length;
    
    // Completeness Assessment
    let emptyFields = 0;
    let totalFields = 0;
    let inconsistentRows = 0;
    
    dataLines.forEach(line => {
      const fields = line.split(delimiter);
      totalFields += fields.length;
      
      if (fields.length !== expectedColumns) {
        inconsistentRows++;
      }
      
      fields.forEach(field => {
        if (!field.trim() || field.trim().toLowerCase() === 'null' || field.trim() === '') {
          emptyFields++;
        }
      });
    });

    const completeness_score = Math.max(0, Math.min(100, ((totalFields - emptyFields) / totalFields) * 100));
    const consistency_score = Math.max(0, Math.min(100, ((dataLines.length - inconsistentRows) / dataLines.length) * 100));
    
    // Accuracy Assessment (basic pattern validation)
    let validDataPoints = 0;
    dataLines.forEach(line => {
      const fields = line.split(delimiter);
      fields.forEach(field => {
        const trimmedField = field.trim();
        // Basic validation: not empty, reasonable length, no obvious corruption
        if (trimmedField && trimmedField.length > 0 && trimmedField.length < 1000 && !trimmedField.includes('ERROR')) {
          validDataPoints++;
        }
      });
    });
    
    const accuracy_score = Math.max(0, Math.min(100, (validDataPoints / totalFields) * 100));
    const timeliness_score = 85; // Assume good timeliness for now
    const overall_score = (completeness_score + accuracy_score + consistency_score + timeliness_score) / 4;

    // Generate AI insights and recommendations
    const issues = [];
    const recommendations = [];
    
    if (completeness_score < 80) {
      issues.push(`${emptyFields} empty fields detected (${((emptyFields/totalFields)*100).toFixed(1)}%)`);
      recommendations.push('Review data extraction process to reduce missing values');
    }
    
    if (consistency_score < 90) {
      issues.push(`${inconsistentRows} rows with inconsistent column count`);
      recommendations.push('Standardize data format and validate schema consistency');
    }
    
    if (accuracy_score < 85) {
      issues.push('Potential data quality issues detected');
      recommendations.push('Implement data validation rules and cleansing procedures');
    }

    return {
      completeness_score: Math.round(completeness_score * 100) / 100,
      accuracy_score: Math.round(accuracy_score * 100) / 100,
      consistency_score: Math.round(consistency_score * 100) / 100,
      timeliness_score: Math.round(timeliness_score * 100) / 100,
      overall_score: Math.round(overall_score * 100) / 100,
      issues,
      recommendations,
      metrics: {
        total_fields: totalFields,
        empty_fields: emptyFields,
        inconsistent_rows: inconsistentRows,
        data_rows: dataLines.length,
        expected_columns: expectedColumns
      }
    };
  }

  static generateAIInsights(qualityAssessment: any, recordsCount: number, processingTime: number) {
    const insights = [];
    const { overall_score, completeness_score, accuracy_score, consistency_score } = qualityAssessment;
    
    // Performance insights
    if (processingTime > 5000) {
      insights.push(`Processing time (${processingTime}ms) is above optimal threshold. Consider data partitioning.`);
    } else if (processingTime < 1000) {
      insights.push(`Excellent processing performance (${processingTime}ms) for ${recordsCount} records.`);
    }
    
    // Quality insights
    if (overall_score >= 90) {
      insights.push('Excellent data quality detected. Pipeline is performing optimally.');
    } else if (overall_score >= 75) {
      insights.push('Good data quality with minor issues. Consider implementing quality monitoring.');
    } else if (overall_score >= 50) {
      insights.push('Moderate data quality issues detected. Immediate attention recommended.');
    } else {
      insights.push('Critical data quality issues detected. Pipeline requires immediate intervention.');
    }
    
    // Specific quality insights
    if (completeness_score < 70) {
      insights.push('High rate of missing data detected. Review source data extraction process.');
    }
    
    if (accuracy_score < 80) {
      insights.push('Data accuracy concerns identified. Implement validation rules.');
    }
    
    if (consistency_score < 85) {
      insights.push('Schema consistency issues detected. Standardize data formats.');
    }
    
    return insights;
  }

  static detectAnomalies(recordsCount: number, processingTime: number, qualityScore: number) {
    const anomalies = [];
    
    // Volume anomalies
    if (recordsCount === 0) {
      anomalies.push({ type: 'NO_DATA', severity: 'HIGH', message: 'No data records processed' });
    } else if (recordsCount > 100000) {
      anomalies.push({ type: 'HIGH_VOLUME', severity: 'MEDIUM', message: `Unusually high record count: ${recordsCount}` });
    }
    
    // Performance anomalies
    if (processingTime > 10000) {
      anomalies.push({ type: 'SLOW_PROCESSING', severity: 'HIGH', message: `Processing time exceeded 10 seconds: ${processingTime}ms` });
    }
    
    // Quality anomalies
    if (qualityScore < 50) {
      anomalies.push({ type: 'POOR_QUALITY', severity: 'HIGH', message: `Data quality score below threshold: ${qualityScore}%` });
    }
    
    return anomalies;
  }
}

serve(async (_req) => {
  if (_req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    console.log("AI Ingestion Scheduler: Waking up with enhanced AI monitoring...");

    // Fetch BATCH sources that are CONNECTED and have file content to process
    const { data: dataSources, error: fetchError } = await supabaseAdmin
      .from('data_sources')
      .select('*')
      .eq('ingestion_mode', 'BATCH')
      .eq('status', 'CONNECTED')
      .not('file_content', 'is', null);
      
    if (fetchError) {
      throw new Error(`Failed to fetch data sources: ${fetchError.message}`);
    }

    if (!dataSources || dataSources.length === 0) {
      console.log("AI Ingestion Scheduler: No data sources with file content to process.");
      
      // Create a monitoring log entry even when no sources are processed
      await supabaseAdmin
        .from('ingestion_logs')
        .insert({
          data_source_id: null,
          status: 'completed',
          message: 'AI Scheduler monitoring cycle completed - no active sources found',
          records_processed: 0,
          started_at: new Date().toISOString(),
          completed_at: new Date().toISOString(),
          error_details: {
            insights: ['No active data sources with content to process'],
            recommendations: ['Add data sources and configure them for batch processing'],
            ai_assessment: 'System monitoring active but no workload detected'
          }
        });
      
      return new Response(JSON.stringify({ 
        message: 'No BATCH data sources with file content to process.',
        ai_status: 'monitoring_active'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    }

    console.log(`AI Ingestion Scheduler: Found ${dataSources.length} data source(s) to process with AI enhancement.`);

    const processingPromises = dataSources.map(async (source) => {
      const startTime = Date.now();
      console.log(`[${source.name}] Starting AI-enhanced ingestion process for source ID: ${source.id}`);

      // Create initial ingestion log
      const { data: logEntry, error: logError } = await supabaseAdmin
        .from('ingestion_logs')
        .insert({
          data_source_id: source.id,
          status: 'running',
          message: `AI-enhanced processing started for ${source.name}`,
          records_processed: 0,
          started_at: new Date().toISOString()
        })
        .select()
        .single();

      if (logError) {
        console.error(`Failed to create initial log entry: ${logError.message}`);
      }

      try {
        // Set status to SYNCING to provide visual feedback
        await supabaseAdmin
          .from('data_sources')
          .update({ status: 'SYNCING' })
          .eq('id', source.id);

        console.log(`[${source.name}] Processing file content with AI quality assessment...`);
        
        const fileContent = source.file_content || '';
        const lines = fileContent.split('\n').filter(line => line.trim() !== '');
        
        // Check if there's a header row to exclude from count
        const hasHeader = source.config?.hasHeader === undefined ? true : source.config.hasHeader;
        const newRecordsCount = hasHeader ? Math.max(0, lines.length - 1) : lines.length;

        // AI Data Quality Assessment
        const qualityAssessment = AIDataQualityEngine.assessDataQuality(fileContent, source.config);
        
        // Simulate processing time based on data size
        const processingTime = Math.min(2000 + (newRecordsCount * 0.1), 5000);
        await new Promise(resolve => setTimeout(resolve, processingTime));

        const actualProcessingTime = Date.now() - startTime;
        
        // Generate AI insights
        const aiInsights = AIDataQualityEngine.generateAIInsights(
          qualityAssessment, 
          newRecordsCount, 
          actualProcessingTime
        );
        
        // Detect anomalies
        const anomalies = AIDataQualityEngine.detectAnomalies(
          newRecordsCount, 
          actualProcessingTime, 
          qualityAssessment.overall_score
        );

        // Update data source with enhanced information
        const { error: updateSuccessError } = await supabaseAdmin
          .from('data_sources')
          .update({ 
            status: 'CONNECTED',
            last_sync: new Date().toISOString(),
            records_count: newRecordsCount,
            file_content: null, // Clear file content to prevent reprocessing
            last_error: null,
            health_score: Math.round(qualityAssessment.overall_score)
          })
          .eq('id', source.id);
        
        if (updateSuccessError) {
            throw new Error(`Failed to update source to CONNECTED state: ${updateSuccessError.message}`);
        }

        // Update ingestion log with AI-enhanced completion data
        if (logEntry) {
          await supabaseAdmin
            .from('ingestion_logs')
            .update({
              status: 'success',
              message: `AI-enhanced processing completed successfully. Quality Score: ${qualityAssessment.overall_score.toFixed(1)}%`,
              records_processed: newRecordsCount,
              completed_at: new Date().toISOString(),
              error_details: {
                ai_quality_assessment: qualityAssessment,
                ai_insights: aiInsights,
                anomalies: anomalies,
                performance_metrics: {
                  processing_time_ms: actualProcessingTime,
                  records_per_second: actualProcessingTime > 0 ? Math.round((newRecordsCount / actualProcessingTime) * 1000) : 0,
                  data_size_bytes: fileContent.length
                },
                recommendations: qualityAssessment.recommendations
              }
            })
            .eq('id', logEntry.id);
        }
        
        console.log(`[${source.name}] AI-enhanced ingestion successful. ${newRecordsCount} records processed with ${qualityAssessment.overall_score.toFixed(1)}% quality score.`);
        
      } catch (ingestionError: any) {
        console.error(`[${source.name}] AI-enhanced ingestion failed:`, ingestionError.message);
        
        // Update data source with error status
        await supabaseAdmin
          .from('data_sources')
          .update({ 
            status: 'ERROR',
            last_error: `AI-enhanced ingestion failed at ${new Date().toISOString()}: ${ingestionError.message}`
          })
          .eq('id', source.id);

        // Update ingestion log with error details
        if (logEntry) {
          await supabaseAdmin
            .from('ingestion_logs')
            .update({
              status: 'error',
              message: `AI-enhanced processing failed: ${ingestionError.message}`,
              completed_at: new Date().toISOString(),
              error_details: {
                error_message: ingestionError.message,
                error_type: 'PROCESSING_ERROR',
                ai_diagnosis: 'Failed during data processing phase',
                recommendations: [
                  'Check data source connectivity and format',
                  'Verify file content and structure',
                  'Review processing logs for detailed error information'
                ]
              }
            })
            .eq('id', logEntry.id);
        }
      }
    });

    await Promise.all(processingPromises);
    
    console.log("AI Ingestion Scheduler: All AI-enhanced ingestion tasks completed.");

    return new Response(JSON.stringify({ 
      message: `AI-enhanced processing completed for ${dataSources.length} sources.`,
      ai_features: 'enabled',
      processing_mode: 'ai_enhanced'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error: any) {
    console.error('Error in AI-enhanced Ingestion Scheduler function:', error.message);
    return new Response(JSON.stringify({ 
      error: error.message,
      ai_status: 'error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
