
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface FinancialData {
  totalRevenue: number;
  dailyRevenue: number;
  pendingBilling: number;
  insuranceClaims: number;
  costCenter: number;
  revenuePerPatient: number;
  monthlyGrowth: number;
  yearOverYear: number;
  revenueHistory: Array<{
    month: string;
    revenue: number;
  }>;
  departmentRevenue: Array<{
    department: string;
    revenue: number;
  }>;
}

const getFinancialData = async (): Promise<FinancialData> => {
  try {
    // Get current month's financial data
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const [transactionsResult, claimsResult, departmentsResult] = await Promise.all([
      supabase
        .from('billing_transactions')
        .select('amount, transaction_type, transaction_date, department_id:visit_id(department_id)')
        .gte('transaction_date', startOfMonth.toISOString()),
      
      supabase
        .from('insurance_claims')
        .select('total_amount, paid_amount, status')
        .gte('submission_date', startOfMonth.toISOString()),
      
      supabase
        .from('departments')
        .select('id, name')
        .eq('is_active', true)
    ]);

    const transactions = transactionsResult.data || [];
    const claims = claimsResult.data || [];
    const departments = departmentsResult.data || [];

    // Calculate revenue from transactions
    const totalRevenue = transactions
      .filter(t => t.transaction_type === 'PAYMENT')
      .reduce((sum, t) => sum + (t.amount || 0), 0);

    // Calculate daily average
    const daysInMonth = new Date().getDate();
    const dailyRevenue = totalRevenue / daysInMonth;

    // Pending billing (charges not yet paid)
    const pendingBilling = transactions
      .filter(t => t.transaction_type === 'CHARGE')
      .reduce((sum, t) => sum + (t.amount || 0), 0) - totalRevenue;

    // Insurance claims count
    const insuranceClaims = claims.length;

    // Cost center (expenses/adjustments)
    const costCenter = transactions
      .filter(t => t.transaction_type === 'ADJUSTMENT' || t.transaction_type === 'REFUND')
      .reduce((sum, t) => sum + Math.abs(t.amount || 0), 0);

    // Get patient count for revenue per patient
    const { data: visits } = await supabase
      .from('patient_visits')
      .select('id')
      .gte('admission_date', startOfMonth.toISOString());

    const patientCount = visits?.length || 1;
    const revenuePerPatient = totalRevenue / patientCount;

    // Generate revenue history for last 6 months
    const revenueHistory = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      const { data: monthTransactions } = await supabase
        .from('billing_transactions')
        .select('amount')
        .eq('transaction_type', 'PAYMENT')
        .gte('transaction_date', monthStart.toISOString())
        .lte('transaction_date', monthEnd.toISOString());

      const monthRevenue = monthTransactions?.reduce((sum, t) => sum + (t.amount || 0), 0) || 0;
      
      revenueHistory.push({
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        revenue: monthRevenue
      });
    }

    // Calculate department revenue
    const departmentRevenue = departments.map(dept => {
      const deptTransactions = transactions.filter(t => 
        t.transaction_type === 'PAYMENT' && 
        t.department_id === dept.id
      );
      const revenue = deptTransactions.reduce((sum, t) => sum + (t.amount || 0), 0);
      
      return {
        department: dept.name,
        revenue
      };
    }).sort((a, b) => b.revenue - a.revenue);

    // Calculate growth rates (simplified)
    const monthlyGrowth = revenueHistory.length >= 2 
      ? ((revenueHistory[5].revenue - revenueHistory[4].revenue) / (revenueHistory[4].revenue || 1)) * 100
      : 0;

    return {
      totalRevenue,
      dailyRevenue,
      pendingBilling: Math.max(0, pendingBilling),
      insuranceClaims,
      costCenter,
      revenuePerPatient,
      monthlyGrowth,
      yearOverYear: monthlyGrowth * 1.2, // Simplified calculation
      revenueHistory,
      departmentRevenue
    };
  } catch (error) {
    console.error('Error fetching financial data:', error);
    // Return minimal fallback data
    return {
      totalRevenue: 0,
      dailyRevenue: 0,
      pendingBilling: 0,
      insuranceClaims: 0,
      costCenter: 0,
      revenuePerPatient: 0,
      monthlyGrowth: 0,
      yearOverYear: 0,
      revenueHistory: [],
      departmentRevenue: []
    };
  }
};

export const useFinancialData = () => {
  return useQuery({
    queryKey: ["financial_data"],
    queryFn: getFinancialData,
    refetchInterval: 300000, // Refetch every 5 minutes
  });
};

export interface CostData {
  totalCosts: number;
  costTrendData: Array<{
    month: string;
    total: number;
    operational: number;
    equipment: number;
    staff: number;
  }>;
  departmentCosts: Array<{
    department: string;
    cost: number;
  }>;
}

const getCostData = async (): Promise<CostData> => {
  try {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    // Get cost transactions (adjustments, refunds)
    const { data: costTransactions } = await supabase
      .from('billing_transactions')
      .select('amount, transaction_type, transaction_date')
      .in('transaction_type', ['ADJUSTMENT', 'REFUND'])
      .gte('transaction_date', startOfMonth.toISOString());

    const totalCosts = costTransactions?.reduce((sum, t) => sum + Math.abs(t.amount || 0), 0) || 0;

    // Generate cost trend for last 6 months
    const costTrendData = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      const { data: monthCosts } = await supabase
        .from('billing_transactions')
        .select('amount')
        .in('transaction_type', ['ADJUSTMENT', 'REFUND'])
        .gte('transaction_date', monthStart.toISOString())
        .lte('transaction_date', monthEnd.toISOString());

      const monthTotal = monthCosts?.reduce((sum, t) => sum + Math.abs(t.amount || 0), 0) || 0;
      
      costTrendData.push({
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        total: monthTotal,
        operational: monthTotal * 0.4,
        equipment: monthTotal * 0.3,
        staff: monthTotal * 0.3
      });
    }

    // Get departments for cost allocation
    const { data: departments } = await supabase
      .from('departments')
      .select('id, name')
      .eq('is_active', true);

    const departmentCosts = departments?.map(dept => ({
      department: dept.name,
      cost: totalCosts / (departments.length || 1) // Evenly distribute for now
    })) || [];

    return {
      totalCosts,
      costTrendData,
      departmentCosts
    };
  } catch (error) {
    console.error('Error fetching cost data:', error);
    return {
      totalCosts: 0,
      costTrendData: [],
      departmentCosts: []
    };
  }
};

export const useCostData = () => {
  return useQuery({
    queryKey: ["cost_data"],
    queryFn: getCostData,
    refetchInterval: 300000,
  });
};
