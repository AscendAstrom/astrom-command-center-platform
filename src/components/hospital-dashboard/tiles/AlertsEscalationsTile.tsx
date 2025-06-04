
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Clock, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from '@/integrations/supabase/client';

export const AlertsEscalationsTile = () => {
  const [metrics, setMetrics] = useState({
    openAlerts: 0,
    resolvedToday: 0,
    avgResponseTime: 0,
    criticalAlerts: 0
  });
  const [recentAlerts, setRecentAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlertsData();
    
    // Subscribe to real-time updates
    const channel = supabase
      .channel('alerts-updates')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'alerts' },
        () => fetchAlertsData()
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const fetchAlertsData = async () => {
    try {
      setLoading(true);
      
      // Fetch active alerts
      const { data: activeAlerts, error: activeError } = await supabase
        .from('alerts')
        .select('*')
        .eq('status', 'ACTIVE')
        .order('created_at', { ascending: false });

      if (activeError) throw activeError;

      // Fetch resolved alerts from today
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const { data: resolvedAlerts, error: resolvedError } = await supabase
        .from('alerts')
        .select('*')
        .eq('status', 'RESOLVED')
        .gte('resolved_at', today.toISOString());

      if (resolvedError) throw resolvedError;

      const openAlerts = activeAlerts?.length || 0;
      const resolvedToday = resolvedAlerts?.length || 0;
      const criticalAlerts = activeAlerts?.filter(alert => alert.severity === 'HIGH').length || 0;

      // Calculate average response time from resolved alerts
      const avgResponseTime = resolvedAlerts?.length > 0 
        ? resolvedAlerts.reduce((sum, alert) => {
            if (alert.created_at && alert.resolved_at) {
              const created = new Date(alert.created_at);
              const resolved = new Date(alert.resolved_at);
              return sum + ((resolved.getTime() - created.getTime()) / (1000 * 60)); // minutes
            }
            return sum;
          }, 0) / resolvedAlerts.length
        : 0;

      // Format recent alerts for display
      const recentAlertsData = activeAlerts?.slice(0, 3).map(alert => {
        const timeAgo = new Date().getTime() - new Date(alert.created_at).getTime();
        const minutesAgo = Math.floor(timeAgo / (1000 * 60));
        
        let timeDisplay = `${minutesAgo}m ago`;
        if (minutesAgo > 60) {
          const hoursAgo = Math.floor(minutesAgo / 60);
          timeDisplay = `${hoursAgo}h ago`;
        }

        return {
          id: alert.id,
          type: alert.severity === 'HIGH' ? 'Critical' : alert.severity === 'MEDIUM' ? 'Warning' : 'Info',
          message: alert.message || alert.title,
          time: timeDisplay,
          priority: alert.severity === 'HIGH' ? 'high' : alert.severity === 'MEDIUM' ? 'medium' : 'low'
        };
      }) || [];

      setMetrics({
        openAlerts,
        resolvedToday,
        avgResponseTime: Math.round(avgResponseTime),
        criticalAlerts
      });
      setRecentAlerts(recentAlertsData);
    } catch (error) {
      console.error('Error fetching alerts data:', error);
      setMetrics({
        openAlerts: 0,
        resolvedToday: 0,
        avgResponseTime: 0,
        criticalAlerts: 0
      });
      setRecentAlerts([]);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'low': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

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
                <CardTitle className="text-lg">Alerts & Escalations</CardTitle>
                <CardDescription>Real-time alert monitoring</CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="animate-pulse space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="h-16 bg-gray-200 rounded"></div>
              <div className="h-16 bg-gray-200 rounded"></div>
              <div className="h-16 bg-gray-200 rounded"></div>
            </div>
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 bg-gray-200 rounded"></div>
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
              <CardTitle className="text-lg">Alerts & Escalations</CardTitle>
              <CardDescription>Real-time alert monitoring</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">
            <Zap className="h-3 w-3 mr-1" />
            {metrics.criticalAlerts} Critical
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-xl font-bold text-red-600">{metrics.openAlerts}</div>
            <div className="text-xs text-muted-foreground">Open</div>
          </div>
          <div>
            <div className="text-xl font-bold text-green-600">{metrics.resolvedToday}</div>
            <div className="text-xs text-muted-foreground">Resolved</div>
          </div>
          <div>
            <div className="text-xl font-bold text-blue-600">{metrics.avgResponseTime}m</div>
            <div className="text-xs text-muted-foreground">Avg Response</div>
          </div>
        </div>

        {recentAlerts.length > 0 ? (
          <div className="space-y-2">
            <div className="text-sm font-medium">Recent Alerts</div>
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="p-2 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className={`text-xs border ${getPriorityColor(alert.priority)}`}>
                        {alert.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{alert.time}</span>
                    </div>
                    <div className="text-sm">{alert.message}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            <div className="text-sm font-medium">Recent Alerts</div>
            <div className="text-center py-4 text-muted-foreground">
              No active alerts
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-1 p-2 bg-green-50 text-green-700 rounded-lg text-xs font-medium hover:bg-green-100">
            <CheckCircle className="h-3 w-3" />
            Resolve All
          </button>
          <button className="flex-1 flex items-center justify-center gap-1 p-2 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-100">
            <Clock className="h-3 w-3" />
            Escalate
          </button>
        </div>

        <div className="text-xs text-muted-foreground bg-red-50 p-2 rounded">
          <strong>Real-time Data:</strong> Connected to hospital alert management system for live monitoring.
        </div>
      </CardContent>
    </Card>
  );
};
