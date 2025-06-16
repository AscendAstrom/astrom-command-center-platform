
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AdmissionDischargeTile from "./tiles/AdmissionDischargeTile";
import { LiveBedOccupancyTile } from "./tiles/LiveBedOccupancyTile";
import { EDLoadStatusTile } from "./tiles/EDLoadStatusTile";
import { StaffingDemandTile } from "./tiles/StaffingDemandTile";
import { PatientSafetyTile } from "./tiles/PatientSafetyTile";
import { EquipmentAvailabilityTile } from "./tiles/EquipmentAvailabilityTile";
import { InfectionControlTile } from "./tiles/InfectionControlTile";
import { AlertsEscalationsTile } from "./tiles/AlertsEscalationsTile";
import { SLAComplianceTile } from "./tiles/SLAComplianceTile";
import { PatientTransferTile } from "./tiles/PatientTransferTile";
import { PharmacySuppliesTile } from "./tiles/PharmacySuppliesTile";
import CopilotSummaryTile from "./tiles/CopilotSummaryTile";
import ClinicalAnalyticsGrid from "./ClinicalAnalyticsGrid";
import FinancialAnalyticsGrid from "./FinancialAnalyticsGrid";
import QualityAnalyticsGrid from "./QualityAnalyticsGrid";
import PerformanceAnalyticsGrid from "./PerformanceAnalyticsGrid";
import { Hospital, DollarSign, Shield, TrendingUp } from "lucide-react";

const HospitalDashboardGrid = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hospital className="h-6 w-6 text-blue-400" />
            Hospital Intelligence Dashboard
          </CardTitle>
          <CardDescription>
            Real-time operational insights and analytics across all hospital departments
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="operations" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="operations">Operations</TabsTrigger>
          <TabsTrigger value="clinical">Clinical</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="quality">Quality & Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="operations" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <CopilotSummaryTile />
            <AdmissionDischargeTile />
            <LiveBedOccupancyTile />
            <EDLoadStatusTile />
            <StaffingDemandTile />
            <PatientSafetyTile />
            <EquipmentAvailabilityTile />
            <InfectionControlTile />
            <AlertsEscalationsTile />
            <SLAComplianceTile />
            <PatientTransferTile />
            <PharmacySuppliesTile />
          </div>
        </TabsContent>

        <TabsContent value="clinical" className="space-y-6">
          <ClinicalAnalyticsGrid />
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <FinancialAnalyticsGrid />
        </TabsContent>

        <TabsContent value="quality" className="space-y-6">
          <div className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-green-500/20 to-green-500/10">
                    <Shield className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <CardTitle className="text-foreground">Quality Analytics</CardTitle>
                    <CardDescription>Patient safety and care quality metrics</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <QualityAnalyticsGrid />
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-500/10">
                    <TrendingUp className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <CardTitle className="text-foreground">Performance Analytics</CardTitle>
                    <CardDescription>Operational efficiency and performance indicators</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <PerformanceAnalyticsGrid />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HospitalDashboardGrid;
