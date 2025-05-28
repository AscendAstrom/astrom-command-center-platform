import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PatientTimerData } from '../types';
import { Clock, User, AlertTriangle } from 'lucide-react';

const EntityTimerWidget = () => {
  const entityData: PatientTimerData[] = [
    {
      patientId: 'E001',
      zoneName: 'Processing Center A',
      arrivalTime: '2024-01-20T14:30:00Z',
      currentWaitTime: 45,
      priority: 'high',
      status: 'waiting'
    },
    {
      patientId: 'E002',
      zoneName: 'Processing Center A',
      arrivalTime: '2024-01-20T15:15:00Z',
      currentWaitTime: 23,
      priority: 'medium',
      status: 'in_progress'
    },
    {
      patientId: 'E003',
      zoneName: 'High Priority Zone',
      arrivalTime: '2024-01-20T13:45:00Z',
      currentWaitTime: 78,
      priority: 'critical',
      status: 'waiting'
    },
    {
      patientId: 'E004',
      zoneName: 'General Processing',
      arrivalTime: '2024-01-20T16:00:00Z',
      currentWaitTime: 12,
      priority: 'low',
      status: 'waiting'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-600';
      case 'high': return 'bg-orange-600';
      case 'medium': return 'bg-yellow-600';
      case 'low': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'waiting': return 'text-yellow-400';
      case 'in_progress': return 'text-blue-400';
      case 'completed': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getWaitTimeColor = (waitTime: number, priority: string) => {
    const thresholds = {
      critical: 15,
      high: 30,
      medium: 45,
      low: 60
    };
    
    const threshold = thresholds[priority as keyof typeof thresholds] || 60;
    
    if (waitTime > threshold * 1.5) return 'text-red-400';
    if (waitTime > threshold) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Clock className="h-5 w-5 text-cyan-400" />
          Entity Processing Times
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {entityData.map((entity) => (
            <div
              key={entity.patientId}
              className="p-3 bg-background rounded-lg border border-border hover:border-muted-foreground transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-foreground">{entity.patientId}</span>
                  </div>
                  
                  <Badge className={getPriorityColor(entity.priority)}>
                    {entity.priority}
                  </Badge>
                  
                  <span className={`text-sm capitalize ${getStatusColor(entity.status)}`}>
                    {entity.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className={`text-lg font-bold ${getWaitTimeColor(entity.currentWaitTime, entity.priority)}`}>
                      {entity.currentWaitTime}m
                    </div>
                    <div className="text-xs text-muted-foreground">wait time</div>
                  </div>
                  
                  {entity.currentWaitTime > 60 && (
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                  )}
                </div>
              </div>

              <div className="mt-2 text-sm text-muted-foreground">
                <span>{entity.zoneName}</span>
                <span className="mx-2">•</span>
                <span>Arrived: {new Date(entity.arrivalTime).toLocaleTimeString()}</span>
              </div>

              {/* Wait time progress bar */}
              <div className="mt-2">
                <div className="w-full bg-muted rounded-full h-1">
                  <div
                    className={`h-1 rounded-full transition-all duration-300 ${
                      entity.currentWaitTime > 60 ? 'bg-red-500' :
                      entity.currentWaitTime > 30 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ 
                      width: `${Math.min((entity.currentWaitTime / 90) * 100, 100)}%` 
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EntityTimerWidget;
