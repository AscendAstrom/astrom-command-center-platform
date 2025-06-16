
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnalyticsData } from "@/services/analytics/types";

interface OperationsTabProps {
  analyticsData: AnalyticsData | null;
}

export const OperationsTab = ({ analyticsData }: OperationsTabProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg">Emergency Department</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm">Current Patients</span>
              <span className="font-medium">{analyticsData?.emergencyDepartment?.totalPatients || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Triage Queue</span>
              <span className="font-medium">{analyticsData?.emergencyDepartment?.triageQueue || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Critical Patients</span>
              <span className="font-medium text-red-600">{analyticsData?.emergencyDepartment?.criticalPatients || 0}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg">Clinical Operations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm">Active Cases</span>
              <span className="font-medium">{analyticsData?.clinicalOperations?.activeCases || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Lab Results</span>
              <span className="font-medium">{analyticsData?.clinicalOperations?.labResults || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Imaging Studies</span>
              <span className="font-medium">{analyticsData?.clinicalOperations?.imagingStudies || 0}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
