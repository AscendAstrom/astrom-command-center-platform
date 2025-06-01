
import { PatientOutcomesTile } from "./tiles/clinical/PatientOutcomesTile";
import { MedicationAdherenceTile } from "./tiles/clinical/MedicationAdherenceTile";
import { VitalSignsTrendsTile } from "./tiles/clinical/VitalSignsTrendsTile";
import { LabResultsTile } from "./tiles/clinical/LabResultsTile";
import { SurgicalOutcomesTile } from "./tiles/clinical/SurgicalOutcomesTile";
import { ReadmissionRatesTile } from "./tiles/clinical/ReadmissionRatesTile";
import { ClinicalProtocolsTile } from "./tiles/clinical/ClinicalProtocolsTile";
import { DiagnosticImagingTile } from "./tiles/clinical/DiagnosticImagingTile";
import { ClinicalDecisionSupportTile } from "./tiles/clinical/ClinicalDecisionSupportTile";
import { PatientEducationTile } from "./tiles/clinical/PatientEducationTile";

const ClinicalAnalyticsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <PatientOutcomesTile />
      <MedicationAdherenceTile />
      <VitalSignsTrendsTile />
      <LabResultsTile />
      <SurgicalOutcomesTile />
      <ReadmissionRatesTile />
      <ClinicalProtocolsTile />
      <DiagnosticImagingTile />
      <ClinicalDecisionSupportTile />
      <PatientEducationTile />
    </div>
  );
};

export default ClinicalAnalyticsGrid;
