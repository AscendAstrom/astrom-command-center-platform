
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useDataSources } from '@/hooks/useDataSources';
import { 
  Database, 
  Activity, 
  AlertCircle, 
  CheckCircle, 
  Play, 
  Pause, 
  RefreshCw,
  Search,
  Plus,
  Settings,
  Trash2
} from 'lucide-react';
import { toast } from 'sonner';

export const DataSourceManager = () => {
  const { dataSources, loading, testConnection, triggerSync, deleteDataSource } = useDataSources();
  const [searchTerm, setSearchTerm] = useState('');
  const [testingConnections, setTestingConnections] = useState<Set<string>>(new Set());
  const [syncingIds, setSyncingIds] = useState<Set<string>>(new Set());

  const filteredSources = dataSources.filter(source =>
    source.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    source.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'CONNECTED':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'SYNCING':
        return <Activity className="h-4 w-4 text-blue-500 animate-pulse" />;
      case 'ERROR':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'PAUSED':
        return <Pause className="h-4 w-4 text-yellow-500" />;
      default:
        return <Database className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONNECTED':
        return 'bg-green-500/10 text-green-700 border-green-500/20';
      case 'SYNCING':
        return 'bg-blue-500/10 text-blue-700 border-blue-500/20';
      case 'ERROR':
        return 'bg-red-500/10 text-red-700 border-red-500/20';
      case 'PAUSED':
        return 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20';
      default:
        return 'bg-gray-500/10 text-gray-700 border-gray-500/20';
    }
  };

  const handleTestConnection = async (id: string) => {
    setTestingConnections(prev => new Set(prev).add(id));
    try {
      await testConnection(id);
    } finally {
      setTestingConnections(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const handleTriggerSync = async (id: string) => {
    setSyncingIds(prev => new Set(prev).add(id));
    try {
      await triggerSync(id);
    } finally {
      setTimeout(() => {
        setSyncingIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      }, 3000);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      await deleteDataSource(id);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Data Sources</h2>
          <p className="text-muted-foreground">Manage your connected data sources and monitor their health</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Source
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search data sources..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Data Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSources.map((source) => (
          <Card key={source.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {getStatusIcon(source.status)}
                  <CardTitle className="text-lg">{source.name}</CardTitle>
                </div>
                <Badge variant="outline" className={getStatusColor(source.status)}>
                  {source.status}
                </Badge>
              </div>
              <CardDescription>{source.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Type and Mode */}
              <div className="flex gap-2">
                <Badge variant="secondary">{source.type}</Badge>
                <Badge variant="outline">{source.ingestion_mode}</Badge>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Records</p>
                  <p className="font-medium">{source.records_count.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Health Score</p>
                  <p className="font-medium">{source.health_score}%</p>
                </div>
              </div>

              {/* Last Sync */}
              {source.last_sync && (
                <div className="text-sm">
                  <p className="text-muted-foreground">Last Sync</p>
                  <p className="font-medium">
                    {new Date(source.last_sync).toLocaleDateString()} at{' '}
                    {new Date(source.last_sync).toLocaleTimeString()}
                  </p>
                </div>
              )}

              {/* Error Message */}
              {source.last_error && (
                <div className="text-sm p-2 bg-red-50 border border-red-200 rounded">
                  <p className="text-red-700">{source.last_error}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleTestConnection(source.id)}
                  disabled={testingConnections.has(source.id)}
                >
                  {testingConnections.has(source.id) ? (
                    <RefreshCw className="h-3 w-3 animate-spin" />
                  ) : (
                    <Settings className="h-3 w-3" />
                  )}
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleTriggerSync(source.id)}
                  disabled={syncingIds.has(source.id) || source.status === 'SYNCING'}
                >
                  {syncingIds.has(source.id) || source.status === 'SYNCING' ? (
                    <RefreshCw className="h-3 w-3 animate-spin" />
                  ) : (
                    <Play className="h-3 w-3" />
                  )}
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(source.id, source.name)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredSources.length === 0 && !loading && (
        <Card className="p-8 text-center">
          <Database className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Data Sources Found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm ? 'No sources match your search criteria.' : 'Get started by adding your first data source.'}
          </p>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Data Source
          </Button>
        </Card>
      )}
    </div>
  );
};
