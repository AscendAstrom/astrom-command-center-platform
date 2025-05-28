
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Hospital, Pause, Play, RotateCcw } from "lucide-react";
import EnhancedBedManagementTable from "@/components/shared/EnhancedBedManagementTable";
import RealTimeConfigPanel from "./RealTimeConfigPanel";
import { BedData } from "@/types/bedManagement";
import { realTimeDataService } from "@/services/realTimeDataService";
import { occupancyThresholds } from "@/data/mockHierarchicalBedData";

const RealTimeBedManagementTable = () => {
  const [bedData, setBedData] = useState<BedData[]>([]);
  const [isLive, setIsLive] = useState(true);
  const [expandedRows, setExpandedRows] = useState<string[]>(['org1', 'h1', 'd1', 'w1']);
  const [lastUpdateCount, setLastUpdateCount] = useState(0);

  useEffect(() => {
    let updateCount = 0;
    
    const unsubscribe = realTimeDataService.subscribe((data) => {
      setBedData(data);
      setLastUpdateCount(++updateCount);
    });

    if (isLive) {
      realTimeDataService.start();
    }

    return () => {
      unsubscribe();
      realTimeDataService.stop();
    };
  }, [isLive]);

  const handleRowExpand = (id: string) => {
    setExpandedRows(prev => 
      prev.includes(id) 
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    );
  };

  const handleToggleLive = () => {
    setIsLive(!isLive);
    if (!isLive) {
      realTimeDataService.start();
    } else {
      realTimeDataService.stop();
    }
  };

  const handleReset = () => {
    setExpandedRows(['org1', 'h1', 'd1', 'w1']);
    realTimeDataService.restart();
  };

  // Filter data to show only ward and room levels for better demo
  const displayData = bedData.filter(item => 
    ['ward', 'room'].includes(item.level)
  );

  return (
    <div className="space-y-6">
      {/* Real-time Configuration Panel */}
      <RealTimeConfigPanel />

      {/* Main Bed Management Table */}
      <Card className="surface-elevated border-border/50 glass-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-green-500/10">
                <Hospital className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <CardTitle className="text-foreground">Real-time Hierarchical Bed Management</CardTitle>
                <CardDescription>
                  Live demonstration of Epic 3.1 bed management with real-time data updates
                </CardDescription>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge 
                variant="outline" 
                className={`${isLive ? 'bg-green-500/10 text-green-600 border-green-500/20' : 'bg-gray-500/10 text-gray-600 border-gray-500/20'}`}
              >
                {isLive ? 'Live' : 'Paused'}
              </Badge>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleToggleLive}
                className="flex items-center gap-2"
              >
                {isLive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {isLive ? 'Pause' : 'Resume'}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Status Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-muted/30 rounded-lg">
            <div className="text-center">
              <div className="text-lg font-bold text-foreground">{displayData.length}</div>
              <div className="text-xs text-muted-foreground">Active Wards/Rooms</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">
                {displayData.reduce((sum, item) => sum + item.totalBeds, 0)}
              </div>
              <div className="text-xs text-muted-foreground">Total Beds</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">
                {displayData.reduce((sum, item) => sum + (item.availableBeds || 0), 0)}
              </div>
              <div className="text-xs text-muted-foreground">Available Beds</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-600">{lastUpdateCount}</div>
              <div className="text-xs text-muted-foreground">Updates Received</div>
            </div>
          </div>

          {/* Enhanced Table */}
          {bedData.length > 0 ? (
            <EnhancedBedManagementTable
              data={displayData}
              showCompliance={true}
              thresholds={occupancyThresholds}
              onRowExpand={handleRowExpand}
              expandedRows={expandedRows}
            />
          ) : (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-muted/50 flex items-center justify-center">
                <Hospital className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Loading Real-time Data</h3>
                <p className="text-muted-foreground">
                  Initializing real-time bed management data stream...
                </p>
              </div>
            </div>
          )}

          {/* Technical Details */}
          <div className="mt-6 p-4 bg-astrom-blue/5 border border-astrom-blue/20 rounded-lg">
            <h4 className="font-semibold text-foreground mb-2">Phase 2: Real-time Integration Features</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div>
                <div className="font-medium text-foreground mb-1">✅ Implemented Features:</div>
                <ul className="space-y-1 ml-4">
                  <li>• Configurable refresh intervals (5s - 5m)</li>
                  <li>• Realistic data variation simulation</li>
                  <li>• Connection status monitoring</li>
                  <li>• Data quality metrics tracking</li>
                  <li>• Live/pause toggle functionality</li>
                </ul>
              </div>
              <div>
                <div className="font-medium text-foreground mb-1">🔧 Technical Capabilities:</div>
                <ul className="space-y-1 ml-4">
                  <li>• Performance-optimized updates</li>
                  <li>• Memory-efficient state management</li>
                  <li>• Error handling and recovery</li>
                  <li>• Batch processing simulation</li>
                  <li>• Real-time quality validation</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RealTimeBedManagementTable;
