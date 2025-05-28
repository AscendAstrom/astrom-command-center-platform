
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { alertService } from '@/services/alertService';
import { toast } from 'sonner';
import { Bell, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import type { Tables } from '@/integrations/supabase/types';

type Alert = Tables<'alerts'>;

export const RealTimeNotifications = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    // Subscribe to real-time alert updates
    const channel = alertService.subscribeToAlerts((payload) => {
      const { eventType, new: newAlert, old: oldAlert } = payload;
      
      if (eventType === 'INSERT' && newAlert) {
        setAlerts(prev => [newAlert, ...prev]);
        
        // Show toast notification for new alerts
        const icon = getSeverityIcon(newAlert.severity);
        toast(newAlert.title, {
          description: newAlert.message,
          icon,
          duration: 5000,
        });
      } else if (eventType === 'UPDATE' && newAlert) {
        setAlerts(prev => prev.map(alert => 
          alert.id === newAlert.id ? newAlert : alert
        ));
      } else if (eventType === 'DELETE' && oldAlert) {
        setAlerts(prev => prev.filter(alert => alert.id !== oldAlert.id));
      }
    });

    // Load initial alerts
    const loadAlerts = async () => {
      const { data } = await alertService.getActive();
      if (data) {
        setAlerts(data);
      }
    };

    loadAlerts();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'HIGH':
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'MEDIUM':
        return <Info className="h-4 w-4 text-yellow-500" />;
      case 'LOW':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  return null; // This component only handles notifications, no UI
};
