
import { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, Users, Heart, Bell } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';

interface Alert {
  id: string;
  title: string;
  message: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'ACTIVE' | 'ACKNOWLEDGED' | 'RESOLVED';
  source_type: string;
  created_at: string;
  metadata?: any;
}

const AlertPanel = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('alerts')
          .select('*')
          .eq('status', 'ACTIVE')
          .order('created_at', { ascending: false })
          .limit(10);

        if (error) throw error;
        setAlerts(data || []);
      } catch (error) {
        console.error('Error fetching alerts:', error);
        setAlerts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();

    // Subscribe to real-time alert updates
    const channel = supabase
      .channel('alerts-updates')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'alerts' },
        (payload) => {
          const newAlert = payload.new as Alert;
          if (newAlert.status === 'ACTIVE') {
            setAlerts(prev => [newAlert, ...prev.slice(0, 9)]); // Keep only 10 alerts
          }
        }
      )
      .on('postgres_changes', 
        { event: 'UPDATE', schema: 'public', table: 'alerts' },
        (payload) => {
          const updatedAlert = payload.new as Alert;
          setAlerts(prev => prev.map(alert => 
            alert.id === updatedAlert.id ? updatedAlert : alert
          ).filter(alert => alert.status === 'ACTIVE'));
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return 'border-l-red-500 bg-red-500/10';
      case 'HIGH':
        return 'border-l-orange-500 bg-orange-500/10';
      case 'MEDIUM':
        return 'border-l-yellow-500 bg-yellow-500/10';
      case 'LOW':
        return 'border-l-blue-500 bg-blue-500/10';
      default:
        return 'border-l-slate-500 bg-slate-500/10';
    }
  };

  const getBadgeVariant = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return 'destructive';
      case 'HIGH':
        return 'destructive';
      case 'MEDIUM':
        return 'secondary';
      case 'LOW':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getAlertIcon = (sourceType: string, severity: string) => {
    if (severity === 'CRITICAL') return Heart;
    
    switch (sourceType.toLowerCase()) {
      case 'capacity':
      case 'bed':
        return AlertTriangle;
      case 'wait_time':
        return Clock;
      case 'staff':
        return Users;
      default:
        return Bell;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMins / 60);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-20 bg-slate-500/20 rounded-lg border-l-4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (alerts.length === 0) {
    return (
      <div className="space-y-3 max-h-80 overflow-y-auto">
        <div className="p-6 text-center">
          <Bell className="h-12 w-12 mx-auto text-slate-400 mb-3" />
          <h3 className="text-lg font-semibold text-slate-300 mb-2">No Active Alerts</h3>
          <p className="text-sm text-slate-400">
            All systems are operating normally.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 max-h-80 overflow-y-auto">
      {alerts.map((alert) => {
        const Icon = getAlertIcon(alert.source_type, alert.severity);
        return (
          <div
            key={alert.id}
            className={`p-3 rounded-lg border-l-4 ${getAlertColor(alert.severity)} hover:bg-opacity-20 transition-all cursor-pointer`}
          >
            <div className="flex items-start gap-3">
              <Icon className="h-5 w-5 mt-0.5 text-slate-300" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-semibold text-white truncate">
                    {alert.title}
                  </h4>
                  <Badge variant={getBadgeVariant(alert.severity)} className="text-xs">
                    {alert.severity}
                  </Badge>
                </div>
                <p className="text-xs text-slate-400 mb-2">{alert.message}</p>
                <span className="text-xs text-slate-500">{formatTimestamp(alert.created_at)}</span>
              </div>
            </div>
          </div>
        );
      })}
      
      {alerts.length >= 10 && (
        <div className="text-center pt-2">
          <button className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
            View All Alerts
          </button>
        </div>
      )}
    </div>
  );
};

export default AlertPanel;
