
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useDataSources } from "./hooks/useDataSources";
import { DataSourceItem } from "./components/DataSourceItem";
import { DataSourceLoadingSkeleton } from "./components/DataSourceLoadingSkeleton";
import { Database, Plus, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export const DataSourceList = () => {
  const { dataSources, loading, error, updateDataSourceStatus, deleteDataSource, refetch } = useDataSources();

  if (loading) {
    return (
      <Card className="surface-elevated border-border/50 glass-card animate-fade-in">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <div className="p-2 rounded-xl bg-astrom-blue/10">
              <Database className="h-5 w-5 text-astrom-blue" />
            </div>
            Data Sources
          </CardTitle>
          <CardDescription>Loading data sources...</CardDescription>
        </CardHeader>
        <CardContent>
          <DataSourceLoadingSkeleton />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="surface-elevated border-border/50 glass-card animate-fade-in">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <div className="p-2 rounded-xl bg-red-500/10">
              <Database className="h-5 w-5 text-red-500" />
            </div>
            Data Sources - Error
          </CardTitle>
          <CardDescription>Failed to load data sources</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              Error loading data sources: {error.message || 'Unknown error'}
            </p>
            <Button onClick={refetch} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
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
            <Database className="h-5 w-5 text-astrom-blue" />
          </div>
          Data Sources
          <span className="ml-auto text-sm font-normal text-muted-foreground">
            {dataSources.length} sources
          </span>
        </CardTitle>
        <CardDescription className="flex items-center justify-between">
          <span>Manage and monitor your configured data sources</span>
          <Button 
            onClick={refetch} 
            variant="ghost" 
            size="sm"
            className="h-auto p-1"
          >
            <RefreshCw className="h-3 w-3" />
          </Button>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {dataSources.length === 0 ? (
          <div className="text-center py-12 space-y-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-astrom-blue/20 to-astrom-purple/20 flex items-center justify-center">
              <Database className="h-10 w-10 text-astrom-blue" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-foreground">No Data Sources</h3>
              <p className="text-muted-foreground max-w-sm mx-auto">
                No data sources configured yet. Click "Add Data Source" to get started with your first integration.
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Plus className="h-4 w-4" />
              <span>Click the button above to add your first data source</span>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {dataSources.map((source, index) => (
              <div 
                key={`datasource-${source.id}`}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <DataSourceItem
                  source={source}
                  onUpdateStatus={updateDataSourceStatus}
                  onDelete={deleteDataSource}
                />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
