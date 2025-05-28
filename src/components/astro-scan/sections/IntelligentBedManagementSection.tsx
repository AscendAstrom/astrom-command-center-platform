
import { Badge } from "@/components/ui/badge";
import { Hospital } from "lucide-react";
import RealTimeBedManagementTable from "@/components/astro-scan/RealTimeBedManagementTable";

const IntelligentBedManagementSection = () => {
  return (
    <div className="p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
      <div className="flex items-center gap-2 mb-4">
        <Hospital className="h-5 w-5 text-green-400" />
        <h3 className="text-lg font-semibold text-foreground">Epic 3.2: Intelligent Bed Management</h3>
        <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Phase 3 Enhanced</Badge>
      </div>
      <p className="text-muted-foreground mb-6">
        AI-powered bed management with predictive occupancy forecasting, automated capacity planning,
        and intelligent resource allocation algorithms.
      </p>

      <RealTimeBedManagementTable />
    </div>
  );
};

export default IntelligentBedManagementSection;
