
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings, TrendingUp, Clock } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { useState, useEffect } from "react";
import { supabase } from '@/integrations/supabase/client';

export const ProcessOptimizationTile = () => {
  const [optimizationData, setOptimizationData] = useState<any[]>([]);
  const [processes, setProcesses] = useState<any[]>([]);
  const [metrics, setMetrics] = useState({
    overallEfficiency: 0,
    automatedProcesses: 0,
    timeSavedToday: 0,
    costSavings: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOptimizationData();
    
    // Subscribe to real-time updates
    const channel = supabase
      .channel('optimization-updates')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'automation_rules' },
        () => fetchOptimizationData()
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const fetchOptimizationData = async () => {
    try {
      setLoading(true);
      
      // Fetch automation rules for process optimization
      const { data: automationRules, error: automationError } = await supabase
        .from('automation_rules')
        .select('*')
        .eq('status', 'ACTIVE');

      if (automationError) throw automationError;

      // Fetch workflow executions for efficiency tracking
      const { data: workflows, error: workflowError } = await supabase
        .from('workflow_executions')
        .select('*')
        .order('started_at', { ascending: false })
        .limit(50);

      if (workflowError) throw workflowError;

      // Calculate process metrics
      const automatedProcesses = automationRules?.length || 0;
      const completedWorkflows = workflows?.filter(w => w.status === 'COMPLETED').length || 0;
      const totalWorkflows = workflows?.length || 1;
      
      const overallEfficiency = Math.round((completedWorkflows / totalWorkflows) * 100);
      
      // Calculate time saved based on automation execution
      const timeSavedToday = automationRules?.reduce((total, rule) => {
        return total + (rule.execution_count * 15); // Estimate 15 min saved per execution
      }, 0) || 0;

      const costSavings = timeSavedToday * 2.5; // Estimate $2.5 per minute saved

      // Generate optimization trend data (4 weeks)
      const optimizationDataArray = Array.from({ length: 4 }, (_, i) => {
        const weekEfficiency = Math.max(70, overallEfficiency - ((3 - i) * 3));
        const weekAutomation = Math.min(70, automatedProcesses * 2 + (i * 5));
        const weekTimeSaved = Math.max(2, timeSavedToday / 30 + i);
        
        return {
          week: `W${i + 1}`,
          efficiency: weekEfficiency,
          automation: Math.round(weekAutomation),
          timesSaved: Number(weekTimeSaved.toFixed(1))
        };
      });

      // Generate process status data
      const processesData = [
        { 
          name: 'Patient Admission', 
          efficiency: Math.min(100, overallEfficiency + 5), 
          timeSaved: `${Math.floor(timeSavedToday * 0.3)} min`, 
          status: overallEfficiency > 85 ? 'Optimized' : 'In Progress' 
        },
        { 
          name: 'Discharge Planning', 
          efficiency: Math.min(100, overallEfficiency - 5), 
          timeSaved: `${Math.floor(timeSavedToday * 0.4)} min`, 
          status: overallEfficiency > 80 ? 'Optimized' : 'In Progress' 
        },
        { 
          name: 'Lab Results', 
          efficiency: Math.min(100, overallEfficiency + 7), 
          timeSaved: `${Math.floor(timeSavedToday * 0.2)} min`, 
          status: overallEfficiency > 90 ? 'Optimized' : 'In Progress' 
        },
        { 
          name: 'Medication Orders', 
          efficiency: Math.min(100, overallEfficiency - 2), 
          timeSaved: `${Math.floor(timeSavedToday * 0.1)} min`, 
          status: overallEfficiency > 85 ? 'Optimized' : 'In Progress' 
        }
      ];

      setOptimizationData(optimizationDataArray);
      setProcesses(processesData);
      setMetrics({
        overallEfficiency,
        automatedProcesses,
        timeSavedToday,
        costSavings: Math.round(costSavings)
      });
    } catch (error) {
      console.error('Error fetching optimization data:', error);
      setOptimizationData([]);
      setProcesses([]);
      setMetrics({
        overallEfficiency: 0,
        automatedProcesses: 0,
        timeSavedToday: 0,
        costSavings: 0
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Optimized': return 'text-green-600 bg-green-50';
      case 'In Progress': return 'text-blue-600 bg-blue-50';
      case 'Needs Attention': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  if (loading) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Settings className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <CardTitle className="text-lg">Process Optimization</CardTitle>
                <CardDescription>Workflow efficiency tracking</CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="animate-pulse space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="h-16 bg-gray-200 rounded"></div>
              <div className="h-16 bg-gray-200 rounded"></div>
            </div>
            <div className="h-24 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Settings className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Process Optimization</CardTitle>
              <CardDescription>Workflow efficiency tracking</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
            <TrendingUp className="h-3 w-3 mr-1" />
            +{metrics.overallEfficiency - 78}% Efficiency
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-xl font-bold text-blue-600">{metrics.timeSavedToday}</div>
            <div className="text-xs text-muted-foreground">Minutes Saved Today</div>
          </div>
          <div>
            <div className="text-xl font-bold text-green-600">{metrics.automatedProcesses}</div>
            <div className="text-xs text-muted-foreground">Automated Processes</div>
          </div>
        </div>

        {optimizationData.length > 0 ? (
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={optimizationData}>
                <XAxis dataKey="week" fontSize={10} />
                <YAxis hide />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="efficiency" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Efficiency %"
                />
                <Line 
                  type="monotone" 
                  dataKey="automation" 
                  stroke="#22c55e" 
                  strokeWidth={2}
                  name="Automation %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-24 flex items-center justify-center bg-muted/20 rounded">
            <p className="text-muted-foreground text-sm">No optimization data available</p>
          </div>
        )}

        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground mb-2">Process Status</div>
          {processes.slice(0, 3).map((process, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground truncate">{process.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs">{process.timeSaved}</span>
                <Badge variant="outline" className={getStatusColor(process.status)}>
                  {process.efficiency}%
                </Badge>
              </div>
            </div>
          ))}
        </div>

        <div className="text-xs text-muted-foreground bg-blue-50 p-2 rounded">
          <strong>Savings:</strong> ${metrics.costSavings.toLocaleString()} saved this month through process optimization.
        </div>
      </CardContent>
    </Card>
  );
};
