
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, TrendingUp, AlertTriangle, Target, Activity, Clock } from 'lucide-react';

const PredictiveInsightsPanel = () => {
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const loadInsights = async () => {
    setLoading(true);
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
      setLastUpdated(new Date());
    }, 1000);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-500" />
            Predictive Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin h-6 w-6 border-2 border-purple-500 border-t-transparent rounded-full"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-500" />
              AI Predictive Intelligence
            </CardTitle>
            <CardDescription>
              Real-time predictions and optimization recommendations
            </CardDescription>
          </div>
          <div className="text-right">
            <Button variant="outline" size="sm" onClick={loadInsights}>
              Refresh
            </Button>
            <div className="text-xs text-muted-foreground mt-1">
              Updated: {lastUpdated.toLocaleTimeString()}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="surge" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="surge" className="text-xs">
              <TrendingUp className="h-3 w-3 mr-1" />
              Surge Predictions
            </TabsTrigger>
            <TabsTrigger value="capacity" className="text-xs">
              <Target className="h-3 w-3 mr-1" />
              Capacity Optimization
            </TabsTrigger>
            <TabsTrigger value="models" className="text-xs">
              <Brain className="h-3 w-3 mr-1" />
              Model Performance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="surge" className="space-y-3">
            <div className="text-center py-6 text-muted-foreground">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No surge predictions available</p>
              <p className="text-xs">Configure data sources to enable predictions</p>
            </div>
          </TabsContent>

          <TabsContent value="capacity" className="space-y-3">
            <div className="text-center py-6 text-muted-foreground">
              <Target className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No capacity data available</p>
              <p className="text-xs">Connect data sources for optimization insights</p>
            </div>
          </TabsContent>

          <TabsContent value="models" className="space-y-3">
            <div className="text-center py-6 text-muted-foreground">
              <Brain className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No ML models active</p>
              <p className="text-xs">Deploy models to see performance metrics</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PredictiveInsightsPanel;
