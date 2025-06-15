
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useClinical } from "@/contexts/ClinicalContext";
import { 
  Heart, 
  Activity, 
  Users, 
  Database,
  Stethoscope,
  FileText
} from "lucide-react";

export const ClinicalDataSources = () => {
  const { metrics, isLoading } = useClinical();

  const clinicalSources = [
    {
      id: 'ehr-main',
      name: 'Electronic Health Records',
      type: 'EHR',
      status: 'CONNECTED',
      lastSync: '2 minutes ago',
      recordsCount: 45230,
      icon: FileText,
      color: 'text-blue-500'
    },
    {
      id: 'patient-monitoring',
      name: 'Patient Monitoring Systems',
      type: 'MONITORING',
      status: 'CONNECTED',
      lastSync: '30 seconds ago',
      recordsCount: 1250,
      icon: Heart,
      color: 'text-red-500'
    },
    {
      id: 'lab-systems',
      name: 'Laboratory Information System',
      type: 'LAB',
      status: 'CONNECTED',
      lastSync: '5 minutes ago',
      recordsCount: 8750,
      icon: Activity,
      color: 'text-green-500'
    },
    {
      id: 'nursing-docs',
      name: 'Nursing Documentation',
      type: 'NURSING',
      status: 'SYNCING',
      lastSync: '1 minute ago',
      recordsCount: 12400,
      icon: Stethoscope,
      color: 'text-purple-500'
    }
  ];

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Clinical Data Sources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-16 bg-muted animate-pulse rounded" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-blue-500" />
            Clinical Data Sources
          </div>
          <Badge variant="outline">
            <Users className="h-3 w-3 mr-1" />
            {metrics.activePatientsCount} Active Patients
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {clinicalSources.map((source) => {
            const IconComponent = source.icon;
            return (
              <div key={source.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-muted`}>
                    <IconComponent className={`h-5 w-5 ${source.color}`} />
                  </div>
                  <div>
                    <div className="font-medium">{source.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {source.recordsCount.toLocaleString()} records • Last sync: {source.lastSync}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={source.status === 'CONNECTED' ? 'default' : 'secondary'}
                    className={source.status === 'SYNCING' ? 'animate-pulse' : ''}
                  >
                    {source.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
