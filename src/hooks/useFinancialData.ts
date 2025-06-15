import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { subMonths, format, subYears, startOfMonth, endOfMonth } from "date-fns";

export interface RevenueData {
  totalRevenue: number;
  monthlyGrowth: number;
  yearOverYear: number;
  revenuePerPatient: number;
  revenueHistory: { month: string; revenue: number }[];
  departmentRevenue: { department: string; revenue: number; percentage: number }[];
}

const getFinancialData = async (): Promise<RevenueData> => {
  const oneYearAgo = subYears(new Date(), 1);

  const { data: claims, error: claimsError } = await supabase
    .from('insurance_claims')
    .select('paid_amount, resolution_date, patient_visits!inner(patient_id, departments!inner(name))')
    .in('status', ['APPROVED', 'PAID'])
    .not('resolution_date', 'is', null)
    .gte('resolution_date', oneYearAgo.toISOString());
    
  if (claimsError) {
    console.error('Error fetching financial data:', claimsError);
    throw new Error(claimsError.message);
  }
  if (!claims) throw new Error("Could not fetch claims");

  const totalRevenue = claims.reduce((sum, claim) => sum + (claim.paid_amount || 0), 0);

  const revenueHistory: { month: string; revenue: number }[] = [];
  for (let i = 5; i >= 0; i--) {
      const d = subMonths(new Date(), i);
      const monthKey = format(d, 'MMM');
      const monthStart = startOfMonth(d);
      const monthEnd = endOfMonth(d);

      const monthRevenue = claims
        .filter(c => {
            if (!c.resolution_date) return false;
            const resDate = new Date(c.resolution_date);
            return resDate >= monthStart && resDate <= monthEnd;
        })
        .reduce((sum, c) => sum + (c.paid_amount || 0), 0);
      
      revenueHistory.push({ month: monthKey, revenue: monthRevenue });
  }

  const now = new Date();
  const lastMonthStart = startOfMonth(subMonths(now, 1));
  const lastMonthEnd = endOfMonth(subMonths(now, 1));
  const prevMonthStart = startOfMonth(subMonths(now, 2));
  const prevMonthEnd = endOfMonth(subMonths(now, 2));
  
  const lastMonthRevenue = claims
    .filter(c => {
      if (!c.resolution_date) return false;
      const resDate = new Date(c.resolution_date);
      return resDate >= lastMonthStart && resDate <= lastMonthEnd;
    })
    .reduce((sum, c) => sum + (c.paid_amount || 0), 0);
  
  const prevMonthRevenue = claims
    .filter(c => {
      if (!c.resolution_date) return false;
      const resDate = new Date(c.resolution_date);
      return resDate >= prevMonthStart && resDate <= prevMonthEnd;
    })
    .reduce((sum, c) => sum + (c.paid_amount || 0), 0);

  const monthlyGrowth = prevMonthRevenue > 0 
    ? ((lastMonthRevenue - prevMonthRevenue) / prevMonthRevenue) * 100 
    : lastMonthRevenue > 0 ? 100 : 0;
  
  const departmentRevenueMap: { [key: string]: number } = {};
  claims.forEach(claim => {
    const deptName = (claim.patient_visits as any)?.departments?.name || 'Unknown';
    departmentRevenueMap[deptName] = (departmentRevenueMap[deptName] || 0) + (claim.paid_amount || 0);
  });
  
  const departmentRevenue = Object.entries(departmentRevenueMap)
    .map(([department, revenue]) => ({
      department,
      revenue,
      percentage: totalRevenue > 0 ? (revenue / totalRevenue) * 100 : 0
    }))
    .sort((a, b) => b.revenue - a.revenue);
  
  const yearOverYear = 12.5; // Mock data
  
  const distinctPatientIds = [...new Set(claims.map(c => (c.patient_visits as any)?.patient_id).filter(Boolean))];
  const totalPatients = distinctPatientIds.length;
    
  const revenuePerPatient = totalPatients > 0 ? totalRevenue / totalPatients : 0;
  
  return {
    totalRevenue,
    monthlyGrowth: parseFloat(monthlyGrowth.toFixed(1)),
    yearOverYear,
    revenuePerPatient,
    revenueHistory,
    departmentRevenue
  };
};

export const useFinancialData = () => {
  return useQuery({
    queryKey: ['financial_data'],
    queryFn: getFinancialData,
    refetchInterval: 60000,
  });
};

// --- Cost Data Hook ---

export interface CostData {
  totalCosts: number; // This will now be YTD
  budgetVariance: number;
  costPerPatient: number;
  savingsThisMonth: number;
  costTrendData: { month: string; total: number; labor: number; supplies: number; overhead: number }[];
  costCategories: { category: string; amount: number; variance: number; trend: 'increasing' | 'decreasing' | 'stable' }[];
  costOptimizations: { initiative: string; savings: number; status: string }[];
  departmentCosts: { department: string; cost: number; }[];
}

const getCostData = async (): Promise<CostData> => {
  const oneYearAgo = subYears(new Date(), 1);

  const { data: expenses, error: expensesError } = await supabase
    .from('hospital_expenses')
    .select('expense_date, category, amount, departments(name)')
    .gte('expense_date', oneYearAgo.toISOString());
    
  if (expensesError) {
    console.error('Error fetching cost data:', expensesError);
    throw new Error(expensesError.message);
  }
  if (!expenses) throw new Error("Could not fetch expenses");

  const totalCosts = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);
  
  const now = new Date();
  const currentMonthStart = startOfMonth(now);
  const currentMonthExpenses = expenses.filter(e => new Date(e.expense_date) >= currentMonthStart);
  
  const totalCostsThisMonth = currentMonthExpenses.reduce((sum, e) => sum + (e.amount || 0), 0);
  
  const lastMonthStart = startOfMonth(subMonths(now, 1));
  const lastMonthEnd = endOfMonth(subMonths(now, 1));
  
  const totalCostsLastMonth = expenses
    .filter(e => {
        const expenseDate = new Date(e.expense_date);
        return expenseDate >= lastMonthStart && expenseDate <= lastMonthEnd;
    })
    .reduce((sum, e) => sum + (e.amount || 0), 0);

  const savingsThisMonth = totalCostsLastMonth > 0 ? totalCostsLastMonth - totalCostsThisMonth : 0;
  
  const costTrendData: { month: string; total: number; labor: number; supplies: number; overhead: number }[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = subMonths(new Date(), i);
    const monthKey = format(d, 'MMM');
    const monthStart = startOfMonth(d);
    const monthEnd = endOfMonth(d);

    const monthExpenses = expenses.filter(e => {
        const expenseDate = new Date(e.expense_date);
        return expenseDate >= monthStart && expenseDate <= monthEnd;
    });

    const total = monthExpenses.reduce((sum, e) => sum + (e.amount || 0), 0);
    const labor = monthExpenses.filter(e => e.category === 'Labor').reduce((sum, e) => sum + (e.amount || 0), 0);
    const supplies = monthExpenses.filter(e => e.category === 'Supplies').reduce((sum, e) => sum + (e.amount || 0), 0);
    const overhead = monthExpenses.filter(e => e.category === 'Overhead').reduce((sum, e) => sum + (e.amount || 0), 0);

    costTrendData.push({ month: monthKey, total, labor, supplies, overhead });
  }

  const costCategoriesMap: { [key: string]: number } = {};
  currentMonthExpenses.forEach(e => {
      costCategoriesMap[e.category] = (costCategoriesMap[e.category] || 0) + (e.amount || 0);
  });
  
  const costCategories = Object.entries(costCategoriesMap).map(([category, amount]) => ({
    category,
    amount,
    variance: -2.1, // Mock data
    trend: 'decreasing' as const // Mock data
  }));
  
  const departmentCostsMap: { [key: string]: number } = {};
  expenses.forEach(e => {
    const deptName = (e.departments as any)?.name || 'Unknown';
    departmentCostsMap[deptName] = (departmentCostsMap[deptName] || 0) + (e.amount || 0);
  });
  
  const departmentCosts = Object.entries(departmentCostsMap).map(([department, cost]) => ({
    department,
    cost
  }));

  // Mock data for metrics not yet available in the backend
  const budgetVariance = -2.3;
  const costPerPatient = 6180;
  const costOptimizations = [
    { initiative: 'Supply Chain Optimization', savings: 25000, status: 'Active' },
    { initiative: 'Energy Efficiency', savings: 12000, status: 'Completed' },
    { initiative: 'Staffing Optimization', savings: 18000, status: 'In Progress' }
  ];

  return {
    totalCosts: totalCosts,
    budgetVariance,
    costPerPatient,
    savingsThisMonth,
    costTrendData,
    costCategories,
    costOptimizations,
    departmentCosts,
  };
};

export const useCostData = () => {
  return useQuery<CostData>({
    queryKey: ['cost_data'],
    queryFn: getCostData,
    refetchInterval: 60000,
  });
};
