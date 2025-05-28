import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Database, Settings, Play, Pause, Trash2, Activity } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type SyncStatus = 'CONNECTED' | 'SYNCING' | 'ERROR' | 'PAUSED';

export const DataSourceList = () => {
  const [dataSources, setDataSources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDataSources();
  }, []);

  const fetchDataSources = async () => {
    try {
      const { data, error } = await supabase
        .from('data_sources')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDataSources(data || []);
    } catch (error) {
      console.error('Error fetching data sources:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateDataSourceStatus = async (id: string, status: SyncStatus) => {
    try {
      const { error } = await supabase
        .from('data_sources')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      
      toast.success(`Data source ${status.toLowerCase()}`);
      fetchDataSources();
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update data source status');
    }
  };

  const deleteDataSource = async (id: string) => {
    if (!confirm('Are you sure you want to delete this data source?')) return;

    try {
      const { error } = await supabase
        .from('data_sources')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Data source deleted');
      fetchDataSources();
    } catch (error) {
      console.error('Error deleting data source:', error);
      toast.error('Failed to delete data source');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONNECTED':
        return 'text-green-400 border-green-400';
      case 'SYNCING':
        return 'text-blue-400 border-blue-400';
      case 'ERROR':
        return 'text-red-400 border-red-400';
      case 'PAUSED':
        return 'text-yellow-400 border-yellow-400';
      default:
        return 'text-slate-400 border-slate-400';
    }
  };

  const getHealthColor = (health: number) => {
    if (health >= 95) return 'text-green-400';
    if (health >= 80) return 'text-yellow-400';
    return 'text-red-400';
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  if (loading) {
    return (
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Data Sources</CardTitle>
          <CardDescription>Loading data sources...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-slate-800/30 rounded-lg p-4 animate-pulse">
                <div className="h-4 bg-slate-700 rounded w-1/3 mb-2"></div>
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
        <CardTitle className="text-white">Data Sources</CardTitle>
        <CardDescription>Manage and monitor your configured data sources</CardDescription>
      </CardHeader>
      <CardContent>
        {dataSources.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            No data sources configured yet. Click "Add Data Source" to get started.
          </div>
        ) : (
          <div className="space-y-4">
            {dataSources.map((source) => (
              <div key={source.id} className="p-4 rounded-lg border border-slate-800 bg-slate-800/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                      <Database className="h-5 w-5 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{source.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {source.type}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {source.ingestion_mode}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getStatusColor(source.status)}`}
                        >
                          {source.status}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm text-slate-300">
                        {formatNumber(source.records_count || 0)} records
                      </p>
                      <p className="text-xs text-slate-400">
                        Last sync: {source.last_sync ? 
                          new Date(source.last_sync).toLocaleString() : 
                          'Never'
                        }
                      </p>
                    </div>

                    <div className="text-right">
                      <p className={`text-sm font-medium ${getHealthColor(source.health_score || 0)}`}>
                        {source.health_score || 0}% health
                      </p>
                      <Progress 
                        value={source.health_score || 0} 
                        className="w-20 h-2 mt-1"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      {source.status === 'PAUSED' ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateDataSourceStatus(source.id, 'CONNECTED')}
                          className="border-slate-700 text-green-400 hover:bg-green-900/20"
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateDataSourceStatus(source.id, 'PAUSED')}
                          className="border-slate-700 text-yellow-400 hover:bg-yellow-900/20"
                        >
                          <Pause className="h-4 w-4" />
                        </Button>
                      )}

                      <Button
                        variant="outline"
                        size="sm"
                        className="border-slate-700 text-slate-300 hover:bg-slate-800"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteDataSource(source.id)}
                        className="border-slate-700 text-red-400 hover:bg-red-900/20"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {source.last_error && (
                  <div className="mt-3 p-2 bg-red-900/20 border border-red-800 rounded text-sm text-red-300">
                    Last error: {source.last_error}
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
