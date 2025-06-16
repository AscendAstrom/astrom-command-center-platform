
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Database, Activity, AlertTriangle, CheckCircle, Plus, Settings, RefreshCw } from "lucide-react";
import { useDataSources } from "@/hooks/useDataSources";
import { DataSourceItem } from "./components/DataSourceItem";

interface DataSourceListProps {
  onAddDataSource?: () => void;
}

export const DataSourceList = ({ onAddDataSource }: DataSourceListProps) => {
  const { dataSources, loading, error, refetch, updateDataSourceStatus, deleteDataSource } = useDataSources();

  if (error) {
    return (
      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 mx-auto text-red-500 mb-4" />
            <p className="text-red-600 mb-4">Error loading data sources: {error}</p>
            <Button onClick={refetch} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Connected Data Sources</h3>
          <p className="text-sm text-muted-foreground">
            Manage and monitor your healthcare data integration points
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={refetch}
            disabled={loading}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button className="gap-2" onClick={onAddDataSource}>
            <Plus className="h-4 w-4" />
            Add Data Source
          </Button>
        </div>
      </div>

      {loading ? (
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-center">
              <RefreshCw className="h-6 w-6 animate-spin mr-2" />
              Loading data sources...
            </div>
          </CardContent>
        </Card>
      ) : dataSources.length === 0 ? (
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="text-center">
              <Database className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">No data sources configured yet</p>
              <Button onClick={onAddDataSource} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Your First Data Source
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {dataSources.map((source) => (
            <DataSourceItem
              key={source.id}
              source={source}
              onUpdateStatus={updateDataSourceStatus}
              onDelete={deleteDataSource}
            />
          ))}
        </div>
      )}
    </div>
  );
};
