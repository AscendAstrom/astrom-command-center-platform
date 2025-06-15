
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { startOfMonth, endOfMonth, format } from "date-fns";

export interface BudgetVarianceData {
  varianceData: { category: string; budget: number; actual: number; variance: number; }[];
  totalBudget: number;
  totalActual: number;
  overallVariance: number;
}

const getBudgetVarianceData = async (): Promise<BudgetVarianceData> => {
  const now = new Date();
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);

  const { data: budgets, error: budgetsError } = await supabase
    .from('budget_allocations')
    .select('category, budget_amount')
    .gte('budget_period_start', format(monthStart, 'yyyy-MM-dd'))
    .lte('budget_period_end', format(monthEnd, 'yyyy-MM-dd'));
  
  if (budgetsError) throw new Error(budgetsError.message);

  const { data: expenses, error: expensesError } = await supabase
    .from('hospital_expenses')
    .select('category, amount')
    .gte('expense_date', format(monthStart, 'yyyy-MM-dd'))
    .lte('expense_date', format(monthEnd, 'yyyy-MM-dd'));

  if (expensesError) throw new Error(expensesError.message);
  
  const actualsMap: Record<string, number> = {};
  for (const expense of expenses) {
    actualsMap[expense.category] = (actualsMap[expense.category] || 0) + expense.amount;
  }

  const varianceData = budgets.map(budget => {
    const actual = actualsMap[budget.category] || 0;
    const variance = budget.budget_amount > 0 ? ((actual - budget.budget_amount) / budget.budget_amount) * 100 : 0;
    return {
      category: budget.category,
      budget: budget.budget_amount,
      actual: actual,
      variance: parseFloat(variance.toFixed(1))
    };
  });
  
  const totalBudget = budgets.reduce((sum, b) => sum + b.budget_amount, 0);
  const totalActual = Object.values(actualsMap).reduce((sum, a) => sum + a, 0);
  const overallVariance = totalBudget > 0 ? ((totalActual - totalBudget) / totalBudget) * 100 : 0;
  
  return {
    varianceData,
    totalBudget,
    totalActual,
    overallVariance: parseFloat(overallVariance.toFixed(1))
  };
};

export const useBudgetVarianceData = () => {
  return useQuery<BudgetVarianceData>({
    queryKey: ['budget_variance_data'],
    queryFn: getBudgetVarianceData,
  });
};
