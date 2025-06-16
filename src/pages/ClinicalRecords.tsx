
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Activity, Heart, Stethoscope, Database } from 'lucide-react';

const ClinicalRecords = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Clinical Records</h1>
          <p className="text-muted-foreground">
            Clinical data management system (currently unavailable)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-blue-500" />
              Clinical Intelligence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">AI Recommendations</span>
                <Badge variant="secondary">Unavailable</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Clinical Protocols</span>
                <Badge variant="secondary">Unavailable</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-500" />
              Patient Monitoring
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Vital Signs Monitoring</span>
                <Badge variant="secondary">Unavailable</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Alert System</span>
                <Badge variant="secondary">Unavailable</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              Clinical Outcomes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Outcome Analytics</span>
                <Badge variant="secondary">Unavailable</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Quality Metrics</span>
                <Badge variant="secondary">Unavailable</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
            <Database className="h-5 w-5" />
            Clinical Data Not Available
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-yellow-700 dark:text-yellow-300">
            Clinical data tables have been removed from the system. This module is currently unavailable 
            until clinical data infrastructure is restored.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClinicalRecords;
