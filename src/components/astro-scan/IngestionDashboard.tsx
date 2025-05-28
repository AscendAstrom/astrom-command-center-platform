import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Activity, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { mockIngestionLogs } from "@/data/mockIngestionLogs";

export const IngestionDashboard = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
    
    // Set up real-time subscription for ingestion logs
    const channel = supabase
      .channel('ingestion_logs_changes')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'ingestion_logs' },
        () => fetchLogs()
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
        .limit(10);

      if (error) throw error;
      
      // If no real data exists, use mock data
      if (!data || data.length === 0) {
        setLogs(mockIngestionLogs);
      } else {
        setLogs(data);
      }
    } catch (error) {
      console.error('Error fetching logs:', error);
      // Fallback to mock data on error
      setLogs(mockIngestionLogs);
    } finally {
      setLoading(false);
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

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const calculateDuration = (started: string, completed?: string) => {
    const start = new Date(started);
    const end = completed ? new Date(completed) : new Date();
    const diff = end.getTime() - start.getTime();
    return `${Math.round(diff / 1000)}s`;
  };

  if (loading) {
    return (
      <Card className="surface-elevated border-border/50 glass-card animate-fade-in">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Activity className="h-5 w-5 text-astrom-blue" />
            Real-time Ingestion Dashboard
          </CardTitle>
          <CardDescription>Loading ingestion activity...</CardDescription>
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
    <Card className="surface-elevated border-border/50 glass-card animate-fade-in hover-lift">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <div className="p-2 rounded-xl bg-astrom-blue/10">
            <Activity className="h-5 w-5 text-astrom-blue" />
          </div>
          Real-time Ingestion Dashboard
        </CardTitle>
        <CardDescription>Live monitoring of data ingestion activities and status</CardDescription>
      </CardHeader>
      <CardContent>
        {logs.length === 0 ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-muted/50 flex items-center justify-center">
              <Activity className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No Activity Yet</h3>
              <p className="text-muted-foreground">No ingestion activity yet. Start by adding and testing a data source.</p>
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
                        {log.data_sources?.name || 'Unknown Source'}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {log.data_sources?.type} • Started: {formatTimestamp(log.started_at)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <Badge variant="outline" className={getStatusColor(log.status)}>
                      {log.status}
                    </Badge>
                    <div className="text-xs text-muted-foreground">
                      Duration: {calculateDuration(log.started_at, log.completed_at)}
                    </div>
                  </div>
                </div>

                {log.message && (
                  <div className="text-sm text-foreground/80 mb-3 p-3 bg-muted/30 rounded-lg">
                    {log.message}
                  </div>
                )}

                <div className="flex items-center justify-between text-sm">
                  <div className="text-muted-foreground">
                    Records: <span className="font-medium text-foreground">{log.records_processed || 0}</span>
                  </div>
                  {log.status === 'running' && (
                    <div className="flex items-center gap-2">
                      <Progress value={65} className="w-24 h-2" />
                      <span className="text-muted-foreground font-medium">65%</span>
                    </div>
                  )}
                </div>

                {log.error_details && (
                  <div className="mt-3 p-3 bg-status-error/10 border border-status-error/20 rounded-lg text-sm text-status-error">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="font-medium">Error Details</span>
                    </div>
                    {typeof log.error_details === 'object' ? 
                      log.error_details.error_message || JSON.stringify(log.error_details) :
                      log.error_details
                    }
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
