
import { LiveBedOccupancyTile } from "./tiles/LiveBedOccupancyTile";
import { AdmissionDischargeTile } from "./tiles/AdmissionDischargeTile";
import { PatientTransferTile } from "./tiles/PatientTransferTile";
import { EDLoadStatusTile } from "./tiles/EDLoadStatusTile";
import { SLAComplianceTile } from "./tiles/SLAComplianceTile";
import { StaffingDemandTile } from "./tiles/StaffingDemandTile";
import { AlertsEscalationsTile } from "./tiles/AlertsEscalationsTile";
import { InfectionControlTile } from "./tiles/InfectionControlTile";
import { EquipmentAvailabilityTile } from "./tiles/EquipmentAvailabilityTile";
import { PharmacySuppliesTile } from "./tiles/PharmacySuppliesTile";
import { PatientSafetyTile } from "./tiles/PatientSafetyTile";
import { CopilotSummaryTile } from "./tiles/CopilotSummaryTile";

const HospitalDashboardGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <LiveBedOccupancyTile />
      <AdmissionDischargeTile />
      <PatientTransferTile />
      <EDLoadStatusTile />
      <SLAComplianceTile />
      <StaffingDemandTile />
      <AlertsEscalationsTile />
      <InfectionControlTile />
      <EquipmentAvailabilityTile />
      <PharmacySuppliesTile />
      <PatientSafetyTile />
      <CopilotSummaryTile />
    </div>
  );
};

export default HospitalDashboardGrid;
