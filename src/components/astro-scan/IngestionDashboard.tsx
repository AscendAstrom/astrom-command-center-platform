
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Activity, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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
      setLogs(data || []);
    } catch (error) {
      console.error('Error fetching logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'success':
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'error':
      case 'failed':
        return <AlertTriangle className="h-4 w-4 text-red-400" />;
      case 'running':
      case 'syncing':
        return <Activity className="h-4 w-4 text-blue-400 animate-pulse" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'success':
      case 'completed':
        return 'text-green-400 border-green-400';
      case 'error':
      case 'failed':
        return 'text-red-400 border-red-400';
      case 'running':
      case 'syncing':
        return 'text-blue-400 border-blue-400';
      default:
        return 'text-yellow-400 border-yellow-400';
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
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Real-time Ingestion Dashboard</CardTitle>
          <CardDescription>Loading ingestion activity...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-slate-800/50 rounded-lg p-3 animate-pulse">
                <div className="h-4 bg-slate-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-slate-700 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Activity className="h-5 w-5 text-cyan-400" />
          Real-time Ingestion Dashboard
        </CardTitle>
        <CardDescription>Live monitoring of data ingestion activities and status</CardDescription>
      </CardHeader>
      <CardContent>
        {logs.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            No ingestion activity yet. Start by adding and testing a data source.
          </div>
        ) : (
          <div className="space-y-3">
            {logs.map((log) => (
              <div key={log.id} className="bg-slate-800/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(log.status)}
                    <div>
                      <div className="font-medium text-white">
                        {log.data_sources?.name || 'Unknown Source'}
                      </div>
                      <div className="text-sm text-slate-400">
                        {log.data_sources?.type} • Started: {formatTimestamp(log.started_at)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className={getStatusColor(log.status)}>
                      {log.status}
                    </Badge>
                    <div className="text-xs text-slate-400 mt-1">
                      Duration: {calculateDuration(log.started_at, log.completed_at)}
                    </div>
                  </div>
                </div>

                {log.message && (
                  <div className="text-sm text-slate-300 mb-2">
                    {log.message}
                  </div>
                )}

                <div className="flex items-center justify-between text-sm">
                  <div className="text-slate-400">
                    Records: {log.records_processed || 0}
                  </div>
                  {log.status === 'running' && (
                    <div className="flex items-center gap-2">
                      <Progress value={65} className="w-20 h-2" />
                      <span className="text-slate-400">65%</span>
                    </div>
                  )}
                </div>

                {log.error_details && (
                  <div className="mt-2 p-2 bg-red-900/20 border border-red-800 rounded text-sm text-red-300">
                    Error: {JSON.stringify(log.error_details)}
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
