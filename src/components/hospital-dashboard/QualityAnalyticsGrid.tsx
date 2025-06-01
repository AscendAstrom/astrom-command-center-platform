
import { QualityMetricsTile } from "./tiles/quality/QualityMetricsTile";
import { ComplianceTrackingTile } from "./tiles/quality/ComplianceTrackingTile";
import { RiskManagementTile } from "./tiles/quality/RiskManagementTile";
import { AccreditationTile } from "./tiles/quality/AccreditationTile";
import { QualityImprovementTile } from "./tiles/quality/QualityImprovementTile";
import { ClinicalIndicatorsTile } from "./tiles/quality/ClinicalIndicatorsTile";
import { PatientExperienceTile } from "./tiles/quality/PatientExperienceTile";

const QualityAnalyticsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <QualityMetricsTile />
      <ComplianceTrackingTile />
      <RiskManagementTile />
      <AccreditationTile />
      <QualityImprovementTile />
      <ClinicalIndicatorsTile />
      <PatientExperienceTile />
    </div>
  );
};

export default QualityAnalyticsGrid;
