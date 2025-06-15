
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { subHours, startOfHour, formatISO } from "date-fns";

export interface LabData {
  totalTests: number;
  avgTurnaround: number;
  criticalAlerts: number;
  testVolumeHistory: { time: string; count: number }[];
  topTests: { name: string; count: number }[];
  lastUpdated: string;
}

const getLabData = async (): Promise<LabData> => {
  const now = new Date();
  const twentyFourHoursAgo = subHours(now, 24);

  const { data: tests, error } = await supabase
    .from("lab_tests")
    .select(`
        created_at,
        turnaround_time_minutes,
        is_critical,
        lab_test_types ( name )
    `)
    .gte("created_at", twentyFourHoursAgo.toISOString());

  if (error) throw error;
  if (!tests) throw new Error("No lab data found");

  const completedTestsToday = tests.filter(t => t.turnaround_time_minutes !== null);
  
  const totalTests = tests.length;
  
  const avgTurnaround = completedTestsToday.length > 0
    ? Math.round(completedTestsToday.reduce((acc, t) => acc + (t.turnaround_time_minutes || 0), 0) / completedTestsToday.length)
    : 0;

  const criticalAlerts = tests.filter(t => t.is_critical).length;
  
  // Group tests by hour for the chart
  const testVolumeHistory = Array.from({ length: 24 }, (_, i) => {
    const hour = startOfHour(subHours(now, i));
    return { time: formatISO(hour), count: 0 };
  }).reverse();

  for (const test of tests) {
    const testHour = startOfHour(new Date(test.created_at));
    const hourBin = testVolumeHistory.find(h => h.time === formatISO(testHour));
    if (hourBin) {
      hourBin.count++;
    }
  }

  // Top tests by volume
  const testCounts: { [key: string]: number } = {};
  for (const test of tests) {
    const testName = (test.lab_test_types as any)?.name;
    if (testName) {
      testCounts[testName] = (testCounts[testName] || 0) + 1;
    }
  }
  const topTests = Object.entries(testCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);
  
  return {
    totalTests,
    avgTurnaround,
    criticalAlerts,
    testVolumeHistory,
    topTests,
    lastUpdated: new Date().toLocaleTimeString(),
  };
};

export const useLabData = () => {
  return useQuery({
    queryKey: ["lab_data"],
    queryFn: getLabData,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};
