
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Calendar,
  Activity,
  FileText,
  User,
  Clock,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { format } from 'date-fns';
import { usePatientTimeline } from '@/hooks/useClinicalData';

interface PatientTimelineProps {
  patientId: string;
  onItemClick?: (item: any, type: string) => void;
}

const PatientTimeline = ({ patientId, onItemClick }: PatientTimelineProps) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    encounters: true,
    conditions: true,
    allergies: true,
    careplans: true,
    devices: true,
  });

  const { 
    allergies, 
    carePlans, 
    conditions, 
    devices, 
    encounters, 
    isLoading, 
    error 
  } = usePatientTimeline(patientId);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Combine all data with type information and sort by date
  const timelineData = [
    ...encounters.map(item => ({ ...item, type: 'encounters', icon: Calendar, color: 'text-green-500' })),
    ...conditions.map(item => ({ ...item, type: 'conditions', icon: Activity, color: 'text-orange-500' })),
    ...allergies.map(item => ({ ...item, type: 'allergies', icon: Activity, color: 'text-red-500' })),
    ...carePlans.map(item => ({ ...item, type: 'careplans', icon: FileText, color: 'text-blue-500' })),
    ...devices.map(item => ({ ...item, type: 'devices', icon: Activity, color: 'text-purple-500' })),
  ].sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime());

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Patient Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-muted animate-pulse rounded" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Patient Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">Failed to load patient timeline</p>
        </CardContent>
      </Card>
    );
  }

  const renderSection = (title: string, data: any[], type: string, icon: any, color: string) => {
    const Icon = icon;
    const isExpanded = expandedSections[type];

    return (
      <div className="space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-between p-3 h-auto"
          onClick={() => toggleSection(type)}
        >
          <div className="flex items-center gap-3">
            <Icon className={`h-4 w-4 ${color}`} />
            <span className="font-medium">{title}</span>
            <Badge variant="secondary">{data.length}</Badge>
          </div>
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>

        {isExpanded && (
          <div className="space-y-2 ml-4">
            {data.length === 0 ? (
              <p className="text-sm text-muted-foreground py-2">No {type} found</p>
            ) : (
              data.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-lg p-3 hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => onItemClick?.(item, type)}
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1 flex-1">
                      <p className="text-sm font-medium">
                        {item.description || `${type.slice(0, -1)} record`}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{format(new Date(item.start_date), 'MMM dd, yyyy')}</span>
                        {item.code && <Badge variant="outline" className="h-5">{item.code}</Badge>}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Patient Timeline ({timelineData.length} records)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {renderSection('Encounters', encounters, 'encounters', Calendar, 'text-green-500')}
          <Separator />
          {renderSection('Conditions', conditions, 'conditions', Activity, 'text-orange-500')}
          <Separator />
          {renderSection('Allergies', allergies, 'allergies', Activity, 'text-red-500')}
          <Separator />
          {renderSection('Care Plans', carePlans, 'careplans', FileText, 'text-blue-500')}
          <Separator />
          {renderSection('Devices', devices, 'devices', Activity, 'text-purple-500')}
        </CardContent>
      </Card>

      {/* Chronological Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Chronological Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          {timelineData.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No clinical data found</p>
          ) : (
            <div className="space-y-4">
              {timelineData.slice(0, 10).map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={`${item.type}-${item.id}`}
                    className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => onItemClick?.(item, item.type)}
                  >
                    <Icon className={`h-4 w-4 mt-1 ${item.color}`} />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">
                          {item.description || `${item.type.slice(0, -1)} record`}
                        </p>
                        <Badge variant="outline" className="text-xs">
                          {item.type}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{format(new Date(item.start_date), 'MMM dd, yyyy')}</span>
                        {item.code && <Badge variant="outline" className="h-5">{item.code}</Badge>}
                      </div>
                    </div>
                  </div>
                );
              })}
              {timelineData.length > 10 && (
                <p className="text-center text-sm text-muted-foreground">
                  And {timelineData.length - 10} more records...
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientTimeline;
