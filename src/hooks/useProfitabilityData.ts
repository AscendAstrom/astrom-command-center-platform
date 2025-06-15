
import { useQuery } from "@tanstack/react-query";
import { useFinancialData, useCostData } from "./useFinancialData";

export interface ProfitabilityData {
  netProfit: number;
  profitMargin: number;
  roi: number; // Mocked for now
  profitabilityHistory: { month: string; profit: number }[];
  departmentProfitability: { department: string; profit: number; margin: number; }[];
}

export const useProfitabilityData = () => {
  const { data: financialData, isLoading: isFinancialLoading } = useFinancialData();
  const { data: costData, isLoading: isCostLoading } = useCostData();

  return useQuery<ProfitabilityData>({
    queryKey: ['profitability_data', financialData, costData],
    queryFn: () => {
      if (!financialData || !costData || !costData.departmentCosts) {
        throw new Error('Financial or cost data not available for profitability calculation.');
      }

      const netProfit = financialData.totalRevenue - costData.totalCosts;
      const profitMargin = financialData.totalRevenue > 0 ? (netProfit / financialData.totalRevenue) * 100 : 0;
      
      const profitabilityHistory = financialData.revenueHistory.map((rev, index) => {
        const cost = costData.costTrendData[index];
        const monthProfit = (rev.revenue || 0) - (cost?.total || 0);
        return { month: rev.month, profit: monthProfit };
      });

      const departmentProfitability = financialData.departmentRevenue.map(deptRev => {
        const deptCost = costData.departmentCosts.find(dc => dc.department === deptRev.department);
        const profit = deptRev.revenue - (deptCost?.cost || 0);
        const margin = deptRev.revenue > 0 ? (profit / deptRev.revenue) * 100 : 0;
        return {
          department: deptRev.department,
          profit: profit,
          margin: parseFloat(margin.toFixed(1))
        };
      }).sort((a, b) => b.profit - a.profit);

      return {
        netProfit,
        profitMargin: parseFloat(profitMargin.toFixed(1)),
        roi: 12.8, // Mock data
        profitabilityHistory,
        departmentProfitability,
      };
    },
    enabled: !!financialData && !!costData && !!costData.departmentCosts,
  });
};
