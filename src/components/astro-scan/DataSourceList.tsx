
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useDataSources } from "./hooks/useDataSources";
import { DataSourceItem } from "./components/DataSourceItem";
import { DataSourceLoadingSkeleton } from "./components/DataSourceLoadingSkeleton";

export const DataSourceList = () => {
  const { dataSources, loading, updateDataSourceStatus, deleteDataSource } = useDataSources();

  if (loading) {
    return (
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Data Sources</CardTitle>
          <CardDescription>Loading data sources...</CardDescription>
        </CardHeader>
        <CardContent>
          <DataSourceLoadingSkeleton />
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
              <DataSourceItem
                key={source.id}
                source={source}
                onUpdateStatus={updateDataSourceStatus}
                onDelete={deleteDataSource}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
