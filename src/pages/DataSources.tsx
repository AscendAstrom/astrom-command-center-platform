
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Database, Plus, Settings, Activity, AlertCircle } from "lucide-react";

const dataSources = [
  {
    id: 1,
    name: "Epic EMR",
    type: "HL7",
    status: "connected",
    lastSync: "2 min ago",
    records: "2.4M",
    health: 98,
  },
  {
    id: 2,
    name: "Cerner PowerChart",
    type: "FHIR",
    status: "connected",
    lastSync: "5 min ago",
    records: "1.8M",
    health: 95,
  },
  {
    id: 3,
    name: "Lab System LIMS",
    type: "API",
    status: "connected",
    lastSync: "1 min ago",
    records: "850K",
    health: 100,
  },
  {
    id: 4,
    name: "Radiology PACS",
    type: "DICOM",
    status: "syncing",
    lastSync: "syncing...",
    records: "420K",
    health: 87,
  },
  {
    id: 5,
    name: "EMS Dispatch",
    type: "CSV",
    status: "error",
    lastSync: "45 min ago",
    records: "12K",
    health: 0,
  },
];

const DataSources = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'text-green-400 border-green-400';
      case 'syncing':
        return 'text-yellow-400 border-yellow-400';
      case 'error':
        return 'text-red-400 border-red-400';
      default:
        return 'text-slate-400 border-slate-400';
    }
  };

  const getHealthColor = (health: number) => {
    if (health >= 95) return 'text-green-400';
    if (health >= 80) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="p-6 space-y-6 bg-slate-950 min-h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Data Sources</h1>
          <p className="text-slate-400">Manage your data connections and ingestion pipelines</p>
        </div>
        <Button className="bg-cyan-600 hover:bg-cyan-700 flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Data Source
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-cyan-400" />
              <div>
                <p className="text-sm text-slate-400">Total Sources</p>
                <p className="text-xl font-bold text-white">7</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-400" />
              <div>
                <p className="text-sm text-slate-400">Active</p>
                <p className="text-xl font-bold text-white">5</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <div>
                <p className="text-sm text-slate-400">Issues</p>
                <p className="text-xl font-bold text-white">1</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-purple-400" />
              <div>
                <p className="text-sm text-slate-400">Total Records</p>
                <p className="text-xl font-bold text-white">5.9M</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Sources List */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Connected Data Sources</CardTitle>
          <CardDescription>Monitor and manage your data ingestion pipelines</CardDescription>
        </CardHeader>
        <CardContent>
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
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getStatusColor(source.status)}`}
                        >
                          {source.status.charAt(0).toUpperCase() + source.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm text-slate-300">{source.records} records</p>
                      <p className="text-xs text-slate-400">Last sync: {source.lastSync}</p>
                    </div>

                    <div className="text-right">
                      <p className={`text-sm font-medium ${getHealthColor(source.health)}`}>
                        {source.health}% health
                      </p>
                      <Progress 
                        value={source.health} 
                        className="w-20 h-2 mt-1"
                      />
                    </div>

                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-slate-700 text-slate-300 hover:bg-slate-800"
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Connection Wizard */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Quick Setup</CardTitle>
          <CardDescription>Connect new data sources with our setup wizard</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { type: "HL7", description: "Connect to HL7 ADT feeds", icon: "📡" },
              { type: "FHIR", description: "Modern FHIR API integration", icon: "🔗" },
              { type: "CSV/File", description: "Upload batch files or FTP sync", icon: "📄" },
            ].map((option) => (
              <div key={option.type} className="p-4 rounded-lg border border-slate-800 bg-slate-800/20 hover:bg-slate-800/40 transition-colors cursor-pointer">
                <div className="text-2xl mb-2">{option.icon}</div>
                <h3 className="font-semibold text-white mb-1">{option.type}</h3>
                <p className="text-sm text-slate-400">{option.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataSources;
