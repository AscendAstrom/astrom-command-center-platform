
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Database, RefreshCw, Sparkles } from "lucide-react";
import { useState } from "react";
import { dataPopulationService } from "@/services/dataPopulationService";
import { toast } from "sonner";

const EmptyStateMessage = () => {
  const [isInitializing, setIsInitializing] = useState(false);

  const handleInitializeData = async () => {
    setIsInitializing(true);
    try {
      await dataPopulationService.populateInitialData();
      toast.success("Hospital data initialized successfully!");
      // Trigger a page refresh to show the new data
      window.location.reload();
    } catch (error) {
      console.error('Failed to initialize data:', error);
      toast.error("Failed to initialize hospital data");
    } finally {
      setIsInitializing(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh] p-6">
      <Card className="max-w-2xl w-full bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-800">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
            <Database className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl text-foreground">Clean System State</CardTitle>
          <CardDescription className="text-lg">
            The hospital management system has been reset to a clean state
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 px-4 py-2">
              <Sparkles className="h-4 w-4 mr-2" />
              All Data Successfully Cleared
            </Badge>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">0</div>
                <div className="text-xs text-muted-foreground">Departments</div>
              </div>
              <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">0</div>
                <div className="text-xs text-muted-foreground">Beds</div>
              </div>
              <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">0</div>
                <div className="text-xs text-muted-foreground">Staff</div>
              </div>
              <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">0</div>
                <div className="text-xs text-muted-foreground">Equipment</div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Next Steps:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Initialize with sample hospital data to begin operations
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Configure departments, beds, and equipment inventory
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                Set up staff schedules and operational workflows
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                Begin monitoring and analytics collection
              </li>
            </ul>
          </div>

          <div className="flex justify-center pt-4">
            <Button 
              onClick={handleInitializeData}
              disabled={isInitializing}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3"
            >
              {isInitializing ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Initializing Hospital Data...
                </>
              ) : (
                <>
                  <Database className="h-4 w-4 mr-2" />
                  Initialize Hospital Data
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmptyStateMessage;
