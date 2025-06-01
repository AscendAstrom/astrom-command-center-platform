
import { RevenueAnalyticsTile } from "./tiles/financial/RevenueAnalyticsTile";
import { CostManagementTile } from "./tiles/financial/CostManagementTile";
import { BillingEfficiencyTile } from "./tiles/financial/BillingEfficiencyTile";
import { InsuranceClaimsTile } from "./tiles/financial/InsuranceClaimsTile";
import { ProfitabilityTile } from "./tiles/financial/ProfitabilityTile";
import { BudgetVarianceTile } from "./tiles/financial/BudgetVarianceTile";
import { PayerMixTile } from "./tiles/financial/PayerMixTile";
import { FinancialForecastTile } from "./tiles/financial/FinancialForecastTile";

const FinancialAnalyticsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <RevenueAnalyticsTile />
      <CostManagementTile />
      <BillingEfficiencyTile />
      <InsuranceClaimsTile />
      <ProfitabilityTile />
      <BudgetVarianceTile />
      <PayerMixTile />
      <FinancialForecastTile />
    </div>
  );
};

export default FinancialAnalyticsGrid;
