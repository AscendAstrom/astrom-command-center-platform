
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Hospital, 
  Activity, 
  Users, 
  DollarSign, 
  Shield, 
  TrendingUp, 
  RefreshCw,
  Heart,
  Stethoscope,
  Scissors,
  TestTube,
  Pill,
  UserCheck
} from "lucide-react";
import { useHospitalDashboardData } from "@/hooks/useHospitalDashboardData";
import { Skeleton } from "@/components/ui/skeleton";

const HospitalDashboard = () => {
  const { hospitalData, isLoading, lastUpdated, refreshData } = useHospitalDashboardData();
  const [activeTab, setActiveTab] = useState("overview");

  if (isLoading || !hospitalData) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-2/3" />
          </CardHeader>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <Skeleton className="h-24 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Hospital className="h-6 w-6 text-blue-400" />
                Hospital Operations Dashboard
              </CardTitle>
              <CardDescription>
                Real-time monitoring and management across all departments
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-green-500/10 text-green-600">
                Live Data
              </Badge>
              <Button onClick={refreshData} size="sm" variant="outline">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="emergency">Emergency</TabsTrigger>
          <TabsTrigger value="clinical">Clinical</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="quality">Quality</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span className="text-sm font-medium">Emergency Dept</span>
                </div>
                <div className="text-2xl font-bold">{hospitalData.emergencyDepartment.currentPatients}</div>
                <div className="text-xs text-muted-foreground">Current Patients</div>
                <div className="text-xs text-orange-600 mt-1">
                  {hospitalData.emergencyDepartment.waitTime} min avg wait
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">ICU</span>
                </div>
                <div className="text-2xl font-bold">{hospitalData.icu.occupiedBeds}/{hospitalData.icu.totalBeds}</div>
                <div className="text-xs text-muted-foreground">Bed Occupancy</div>
                <div className="text-xs text-blue-600 mt-1">
                  {hospitalData.icu.criticalPatients} critical
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Scissors className="h-4 w-4 text-purple-500" />
                  <span className="text-sm font-medium">Surgery</span>
                </div>
                <div className="text-2xl font-bold">{hospitalData.surgery.activeORs}/{hospitalData.surgery.totalORs}</div>
                <div className="text-xs text-muted-foreground">Active ORs</div>
                <div className="text-xs text-purple-600 mt-1">
                  {hospitalData.surgery.scheduledSurgeries} scheduled
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <UserCheck className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Staffing</span>
                </div>
                <div className="text-2xl font-bold">{hospitalData.staffing.onDutyStaff}</div>
                <div className="text-xs text-muted-foreground">On Duty</div>
                <div className="text-xs text-green-600 mt-1">
                  {hospitalData.staffing.staffSatisfaction}% satisfaction
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Financial Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Daily Revenue</span>
                  <span className="font-bold text-green-600">
                    ${hospitalData.financial.dailyRevenue.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Operating Costs</span>
                  <span className="font-bold text-red-600">
                    ${hospitalData.financial.operatingCosts.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Profit Margin</span>
                  <span className="font-bold text-blue-600">
                    {hospitalData.financial.profitMargin}%
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quality Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Patient Satisfaction</span>
                  <Badge variant="secondary">
                    {hospitalData.quality.patientSatisfaction}/5.0
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Safety Score</span>
                  <Badge variant="secondary">
                    {hospitalData.quality.safetyScore}%
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Readmission Rate</span>
                  <Badge variant="outline">
                    {hospitalData.quality.readmissionRate}%
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="emergency" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Patient Flow
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600">
                    {hospitalData.emergencyDepartment.currentPatients}
                  </div>
                  <div className="text-sm text-muted-foreground">Current Patients</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Triage Queue</span>
                    <span className="font-medium">{hospitalData.emergencyDepartment.triageQueue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Critical Cases</span>
                    <span className="font-medium text-red-600">{hospitalData.emergencyDepartment.criticalCases}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Bed Utilization</span>
                    <span className="font-medium">{hospitalData.emergencyDepartment.bedUtilization}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Wait Times</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">
                    {hospitalData.emergencyDepartment.waitTime}
                  </div>
                  <div className="text-sm text-muted-foreground">Minutes Average</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Treatment Time</span>
                    <span className="font-medium">{hospitalData.emergencyDepartment.avgTreatmentTime} min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Discharge Rate</span>
                    <span className="font-medium">{hospitalData.emergencyDepartment.dischargeRate}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <div className="text-2xl font-bold text-green-600">85%</div>
                  <div className="text-sm text-muted-foreground">Overall Efficiency</div>
                </div>
                <Badge variant="secondary" className="w-full justify-center">
                  Target: 4 hrs or less
                </Badge>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="clinical" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TestTube className="h-5 w-5 text-blue-500" />
                  Laboratory
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center">
                  <div className="text-2xl font-bold">{hospitalData.laboratory.pendingTests}</div>
                  <div className="text-xs text-muted-foreground">Pending Tests</div>
                </div>
                <div className="text-xs space-y-1">
                  <div className="flex justify-between">
                    <span>Completed Today</span>
                    <span className="font-medium">{hospitalData.laboratory.completedTests}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg Turnaround</span>
                    <span className="font-medium">{hospitalData.laboratory.avgTurnaroundTime} min</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Critical Results</span>
                    <span className="font-medium text-red-600">{hospitalData.laboratory.criticalResults}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="h-5 w-5 text-purple-500" />
                  Radiology
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center">
                  <div className="text-2xl font-bold">{hospitalData.radiology.pendingStudies}</div>
                  <div className="text-xs text-muted-foreground">Pending Studies</div>
                </div>
                <div className="text-xs space-y-1">
                  <div className="flex justify-between">
                    <span>Completed Today</span>
                    <span className="font-medium">{hospitalData.radiology.completedStudies}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Report Time</span>
                    <span className="font-medium">{hospitalData.radiology.avgReportTime} min</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Critical Findings</span>
                    <span className="font-medium text-red-600">{hospitalData.radiology.criticalFindings}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Pill className="h-5 w-5 text-green-500" />
                  Pharmacy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center">
                  <div className="text-2xl font-bold">{hospitalData.pharmacy.pendingOrders}</div>
                  <div className="text-xs text-muted-foreground">Pending Orders</div>
                </div>
                <div className="text-xs space-y-1">
                  <div className="flex justify-between">
                    <span>Processed Today</span>
                    <span className="font-medium">{hospitalData.pharmacy.prescriptionsProcessed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Inventory Level</span>
                    <span className="font-medium">{hospitalData.pharmacy.inventoryLevel}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Medication Errors</span>
                    <span className="font-medium">{hospitalData.pharmacy.medicationErrors}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Scissors className="h-5 w-5 text-orange-500" />
                  Surgery
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center">
                  <div className="text-2xl font-bold">{hospitalData.surgery.activeORs}</div>
                  <div className="text-xs text-muted-foreground">Active ORs</div>
                </div>
                <div className="text-xs space-y-1">
                  <div className="flex justify-between">
                    <span>Scheduled Today</span>
                    <span className="font-medium">{hospitalData.surgery.scheduledSurgeries}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Completed</span>
                    <span className="font-medium">{hospitalData.surgery.completedSurgeries}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Utilization</span>
                    <span className="font-medium">{hospitalData.surgery.utilizationRate}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="operations" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Equipment Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Operational Equipment</span>
                  <span className="font-bold text-green-600">
                    {hospitalData.equipment.operationalEquipment}/{hospitalData.equipment.totalEquipment}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Maintenance Required</span>
                  <span className="font-bold text-yellow-600">
                    {hospitalData.equipment.maintenanceRequired}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Critical Failures</span>
                  <span className="font-bold text-red-600">
                    {hospitalData.equipment.criticalFailures}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">System Uptime</span>
                  <Badge variant="secondary">
                    {hospitalData.equipment.systemUptime}%
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Staffing Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">On Duty Staff</span>
                  <span className="font-bold">
                    {hospitalData.staffing.onDutyStaff}/{hospitalData.staffing.totalStaff}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Nursing Ratio</span>
                  <span className="font-bold">1:{hospitalData.staffing.nursingRatio}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Overtime Hours</span>
                  <span className="font-bold text-orange-600">
                    {hospitalData.staffing.overtimeHours}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Satisfaction</span>
                  <Badge variant="secondary">
                    {hospitalData.staffing.staffSatisfaction}%
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-500" />
                  Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    ${(hospitalData.financial.dailyRevenue / 1000).toFixed(0)}K
                  </div>
                  <div className="text-sm text-muted-foreground">Daily Revenue</div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Operating Costs</span>
                    <span className="font-medium text-red-600">
                      ${(hospitalData.financial.operatingCosts / 1000).toFixed(0)}K
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Profit Margin</span>
                    <span className="font-medium text-blue-600">
                      {hospitalData.financial.profitMargin}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Claims & Billing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Accounts Receivable</span>
                    <span className="font-medium">
                      ${(hospitalData.financial.accountsReceivable / 1000000).toFixed(1)}M
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Denial Rate</span>
                    <span className="font-medium text-red-600">
                      {hospitalData.financial.denialRate}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Cost per Discharge</span>
                    <span className="font-medium">
                      ${hospitalData.financial.costPerDischarge.toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Length of Stay</span>
                    <span className="font-medium">{hospitalData.financial.lengthOfStay} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Budget Variance</span>
                    <span className={`font-medium ${hospitalData.financial.budgetVariance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {hospitalData.financial.budgetVariance >= 0 ? '+' : ''}{hospitalData.financial.budgetVariance}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="quality" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-500" />
                  Patient Safety
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">
                      {hospitalData.quality.safetyScore}
                    </div>
                    <div className="text-sm text-muted-foreground">Safety Score</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">HAI Incidents</span>
                      <span className="font-medium">{hospitalData.quality.hospitalAcquiredInfections}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Fall Incidents</span>
                      <span className="font-medium">{hospitalData.quality.fallIncidents}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Medication Errors</span>
                      <span className="font-medium">{hospitalData.quality.medicationErrors}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Patient Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">
                      {hospitalData.quality.patientSatisfaction}
                    </div>
                    <div className="text-sm text-muted-foreground">Satisfaction Score</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Readmission Rate</span>
                      <span className="font-medium">{hospitalData.quality.readmissionRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Mortality Index</span>
                      <span className="font-medium">{hospitalData.quality.mortalityIndex}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Accreditation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-center">
                    <Badge variant={hospitalData.quality.accreditationStatus === 'Accredited' ? 'default' : 'secondary'}>
                      {hospitalData.quality.accreditationStatus}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground text-center">
                    Last updated: {lastUpdated.toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="text-xs text-muted-foreground text-center">
        Last updated: {lastUpdated.toLocaleTimeString()} | 
        Data refreshes automatically every 30 seconds
      </div>
    </div>
  );
};

export default HospitalDashboard;
