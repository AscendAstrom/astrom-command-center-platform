
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Database, RefreshCw, Activity, AlertTriangle, CheckCircle } from "lucide-react";

interface BedData {
  total: number;
  occupied: number;
  available: number;
  maintenance: number;
  utilization: number;
}

interface BedManagementStatusCardProps {
  bedData: BedData;
  loading: boolean;
  lastUpdate: Date;
  onRefresh: () => void;
}

export const BedManagementStatusCard = ({ 
  bedData, 
  loading, 
  lastUpdate, 
  onRefresh 
}: BedManagementStatusCardProps) => {
  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 90) return 'text-red-600 border-red-200 bg-red-50';
    if (utilization >= 75) return 'text-orange-600 border-orange-200 bg-orange-50';
    return 'text-green-600 border-green-200 bg-green-50';
  };

  const getUtilizationIcon = (utilization: number) => {
    if (utilization >= 90) return <AlertTriangle className="h-4 w-4" />;
    if (utilization >= 75) return <Activity className="h-4 w-4" />;
    return <CheckCircle className="h-4 w-4" />;
  };

  return (
    <Card className="bg-gradient-to-r from-blue-500/10 to-green-500/10 border-blue-500/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <Database className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <CardTitle className="text-foreground">Connected Bed Management System</CardTitle>
              <CardDescription>Real-time bed occupancy and status monitoring</CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              Live Connected
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={onRefresh}
              disabled={loading}
              className="gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{loading ? '...' : bedData.total}</div>
            <div className="text-sm text-muted-foreground">Total Beds</div>
          </div>
          <div className="text-center p-4 bg-red-50 dark:bg-red-950/20 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{loading ? '...' : bedData.occupied}</div>
            <div className="text-sm text-muted-foreground">Occupied</div>
          </div>
          <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{loading ? '...' : bedData.available}</div>
            <div className="text-sm text-muted-foreground">Available</div>
          </div>
          <div className="text-center p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{loading ? '...' : bedData.maintenance}</div>
            <div className="text-sm text-muted-foreground">Maintenance</div>
          </div>
          <div className="text-center p-4 rounded-lg">
            <Badge variant="outline" className={getUtilizationColor(bedData.utilization)}>
              {getUtilizationIcon(bedData.utilization)}
              <span className="ml-1">{loading ? '...' : bedData.utilization}% Occupied</span>
            </Badge>
            <div className="text-sm text-muted-foreground mt-1">Utilization</div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-muted/30 rounded-lg">
          <div className="text-sm text-muted-foreground">
            <strong>System Status:</strong> Connected to live bed management database • 
            Last updated: {lastUpdate.toLocaleTimeString()} • 
            Real-time sync enabled
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
