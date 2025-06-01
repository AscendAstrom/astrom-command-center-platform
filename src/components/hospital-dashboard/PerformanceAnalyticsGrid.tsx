
import { ThroughputAnalyticsTile } from "./tiles/performance/ThroughputAnalyticsTile";
import { EfficiencyMetricsTile } from "./tiles/performance/EfficiencyMetricsTile";
import { ResourceUtilizationTile } from "./tiles/performance/ResourceUtilizationTile";
import { ServiceLevelsTile } from "./tiles/performance/ServiceLevelsTile";
import { ProcessOptimizationTile } from "./tiles/performance/ProcessOptimizationTile";
import { CapacityPlanningTile } from "./tiles/performance/CapacityPlanningTile";
import { WorkflowAnalyticsTile } from "./tiles/performance/WorkflowAnalyticsTile";
import { ProductivityTile } from "./tiles/performance/ProductivityTile";
import { BenchmarkingTile } from "./tiles/performance/BenchmarkingTile";

const PerformanceAnalyticsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <ThroughputAnalyticsTile />
      <EfficiencyMetricsTile />
      <ResourceUtilizationTile />
      <ServiceLevelsTile />
      <ProcessOptimizationTile />
      <CapacityPlanningTile />
      <WorkflowAnalyticsTile />
      <ProductivityTile />
      <BenchmarkingTile />
    </div>
  );
};

export default PerformanceAnalyticsGrid;
