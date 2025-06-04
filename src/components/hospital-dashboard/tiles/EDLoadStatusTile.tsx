
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from '@/integrations/supabase/client';

export const EDLoadStatusTile = () => {
  const [metrics, setMetrics] = useState({
    queueCount: 0,
    avgWaitTime: 0,
    triageLevel: {
      level1: 0,
      level2: 0,
      level3: 0,
      level4: 0
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEDData();
    
    // Subscribe to real-time updates
    const channel = supabase
      .channel('ed-updates')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'wait_times' },
        () => fetchEDData()
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const fetchEDData = async () => {
    try {
      setLoading(true);
      
      const { data: waitTimes, error } = await supabase
        .from('wait_times')
        .select('total_wait_minutes, priority_level')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;

      const queueCount = waitTimes?.length || 0;
      const avgWaitTime = waitTimes?.length > 0 
        ? Math.round(waitTimes.reduce((sum, w) => sum + (w.total_wait_minutes || 0), 0) / waitTimes.length)
        : 0;

      // Group by triage levels
      const triageBreakdown = waitTimes?.reduce((acc: any, w) => {
        const level = w.priority_level || 4;
        if (level >= 1 && level <= 4) {
          acc[`level${level}`] = (acc[`level${level}`] || 0) + 1;
        }
        return acc;
      }, {
        level1: 0,
        level2: 0,
        level3: 0,
        level4: 0
      }) || {
        level1: 0,
        level2: 0,
        level3: 0,
        level4: 0
      };

      setMetrics({
        queueCount,
        avgWaitTime,
        triageLevel: triageBreakdown
      });
    } catch (error) {
      console.error('Error fetching ED data:', error);
      setMetrics({
        queueCount: 0,
        avgWaitTime: 0,
        triageLevel: {
          level1: 0,
          level2: 0,
          level3: 0,
          level4: 0
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusLevel = (waitTime: number) => {
    if (waitTime > 60) return { level: 'red', text: 'Critical', color: 'bg-red-100 text-red-700' };
    if (waitTime > 30) return { level: 'orange', text: 'Warning', color: 'bg-orange-100 text-orange-700' };
    return { level: 'green', text: 'Normal', color: 'bg-green-100 text-green-700' };
  };

  const status = getStatusLevel(metrics.avgWaitTime);

  if (loading) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <CardTitle className="text-lg">ED Load Status</CardTitle>
                <CardDescription>Emergency department monitoring</CardDescription>
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
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
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
            <div className="p-2 bg-red-500/10 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <CardTitle className="text-lg">ED Load Status</CardTitle>
              <CardDescription>Emergency department monitoring</CardDescription>
            </div>
          </div>
          <Badge className={status.color}>
            {status.text}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Users className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Queue Count</span>
            </div>
            <div className="text-3xl font-bold text-blue-600">{metrics.queueCount}</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Clock className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium">Avg Wait</span>
            </div>
            <div className="text-3xl font-bold text-orange-600">{metrics.avgWaitTime}m</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">Triage Breakdown</div>
          <div className="grid grid-cols-4 gap-2">
            <div className="text-center p-2 bg-red-50 rounded">
              <div className="text-lg font-bold text-red-600">{metrics.triageLevel.level1}</div>
              <div className="text-xs text-red-600">Critical</div>
            </div>
            <div className="text-center p-2 bg-orange-50 rounded">
              <div className="text-lg font-bold text-orange-600">{metrics.triageLevel.level2}</div>
              <div className="text-xs text-orange-600">Urgent</div>
            </div>
            <div className="text-center p-2 bg-yellow-50 rounded">
              <div className="text-lg font-bold text-yellow-600">{metrics.triageLevel.level3}</div>
              <div className="text-xs text-yellow-600">Less Urgent</div>
            </div>
            <div className="text-center p-2 bg-green-50 rounded">
              <div className="text-lg font-bold text-green-600">{metrics.triageLevel.level4}</div>
              <div className="text-xs text-green-600">Non-urgent</div>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Badge variant="outline" className={`flex-1 justify-center ${
            metrics.avgWaitTime > 60 ? 'border-red-200 text-red-600' : 
            metrics.avgWaitTime > 30 ? 'border-orange-200 text-orange-600' : 
            'border-green-200 text-green-600'
          }`}>
            {status.text} Load
          </Badge>
        </div>

        <div className="text-xs text-muted-foreground bg-orange-50 p-2 rounded">
          <strong>Real-time Data:</strong> Connected to hospital wait time tracking system.
        </div>
      </CardContent>
    </Card>
  );
};
