
import { BarChart3 } from "lucide-react";

const AstroMetricsHeader = () => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
          <BarChart3 className="h-5 w-5 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">ASTRO-METRICS</h1>
        <span className="text-sm text-orange-400 font-medium">KPI Definition & Quality Management</span>
      </div>
      <p className="text-muted-foreground max-w-2xl">
        Comprehensive metrics platform for defining KPIs, managing SLAs, and ensuring data quality across healthcare operations with automated alerting and compliance tracking.
      </p>
    </div>
  );
};

export default AstroMetricsHeader;
