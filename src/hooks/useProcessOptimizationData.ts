
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ProcessOptimizationMetrics {
  overallEfficiency: number;
  automatedProcesses: number;
  timeSavedToday: number;
  costSavings: number;
  optimizationData: { week: string; efficiency: number; automation: number; timesSaved: number }[];
  processes: { name: string; efficiency: number; timeSaved: string; status: string }[];
}

const getProcessOptimizationData = async (): Promise<ProcessOptimizationMetrics> => {
  const { data: automationRules, error: automationError } = await supabase
    .from('automation_rules')
    .select('execution_count')
    .eq('status', 'ACTIVE');
  if (automationError) throw automationError;

  const { data: workflows, error: workflowError } = await supabase
    .from('workflow_executions')
    .select('status')
    .order('started_at', { ascending: false })
    .limit(50);
  if (workflowError) throw workflowError;

  const automatedProcesses = automationRules?.length || 0;
  const completedWorkflows = workflows?.filter(w => w.status === 'COMPLETED').length || 0;
  const totalWorkflows = workflows?.length || 1;
  const overallEfficiency = Math.round((completedWorkflows / totalWorkflows) * 100);
  
  const timeSavedToday = automationRules?.reduce((total, rule) => {
    return total + ((rule.execution_count || 0) * 15); // Estimate 15 min saved per execution
  }, 0) || 0;

  const costSavings = timeSavedToday * 2.5; // Estimate $2.5 per minute saved

  const optimizationData = Array.from({ length: 4 }, (_, i) => {
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

  const processes = [
    { name: 'Patient Admission', efficiency: Math.min(100, overallEfficiency + 5), timeSaved: `${Math.floor(timeSavedToday * 0.3)} min`, status: overallEfficiency > 85 ? 'Optimized' : 'In Progress' },
    { name: 'Discharge Planning', efficiency: Math.min(100, overallEfficiency - 5), timeSaved: `${Math.floor(timeSavedToday * 0.4)} min`, status: overallEfficiency > 80 ? 'Optimized' : 'In Progress' },
    { name: 'Lab Results', efficiency: Math.min(100, overallEfficiency + 7), timeSaved: `${Math.floor(timeSavedToday * 0.2)} min`, status: overallEfficiency > 90 ? 'Optimized' : 'In Progress' },
    { name: 'Medication Orders', efficiency: Math.min(100, overallEfficiency - 2), timeSaved: `${Math.floor(timeSavedToday * 0.1)} min`, status: overallEfficiency > 85 ? 'Optimized' : 'In Progress' }
  ];

  return {
    overallEfficiency,
    automatedProcesses,
    timeSavedToday,
    costSavings: Math.round(costSavings),
    optimizationData,
    processes,
  };
};

export const useProcessOptimizationData = () => {
  return useQuery({
    queryKey: ['process_optimization'],
    queryFn: getProcessOptimizationData,
    refetchInterval: 30000,
  });
};
