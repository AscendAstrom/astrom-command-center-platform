
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useClinical } from '@/contexts/ClinicalContext';
import { 
  AlertTriangle, 
  X, 
  CheckCircle,
  Bell,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export const GlobalClinicalAlerts = () => {
  const { alerts, acknowledgeAlert } = useClinical();
  const [isOpen, setIsOpen] = useState(false);
  
  const unacknowledgedAlerts = alerts.filter(alert => !alert.acknowledged);
  const criticalCount = unacknowledgedAlerts.filter(a => a.type === 'critical').length;

  if (unacknowledgedAlerts.length === 0) return null;

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default: return <Bell className="h-4 w-4 text-blue-500" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'border-red-500 bg-red-50';
      case 'warning': return 'border-yellow-500 bg-yellow-50';
      default: return 'border-blue-500 bg-blue-50';
    }
  };

  return (
    <div className="fixed top-20 right-4 z-50 w-80">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant="outline"
            className={`w-full justify-between ${
              criticalCount > 0 
                ? 'border-red-500 bg-red-50 hover:bg-red-100 animate-pulse' 
                : 'border-yellow-500 bg-yellow-50 hover:bg-yellow-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span>Clinical Alerts</span>
              <Badge variant={criticalCount > 0 ? 'destructive' : 'secondary'}>
                {unacknowledgedAlerts.length}
              </Badge>
            </div>
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <Card className="mt-2 max-h-96 overflow-y-auto">
            <CardContent className="p-3 space-y-2">
              {unacknowledgedAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3 rounded border-l-4 ${getAlertColor(alert.type)}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2 flex-1">
                      {getAlertIcon(alert.type)}
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{alert.message}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(alert.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => acknowledgeAlert(alert.id)}
                      className="h-6 w-6 p-0"
                    >
                      <CheckCircle className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
