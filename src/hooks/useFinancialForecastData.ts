
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from 'date-fns';

export interface ForecastData {
    month: string;
    actual: number | null;
    forecast: number;
}

export interface FinancialForecastData {
  forecastData: ForecastData[];
  projectedGrowth: number;
  confidenceLevel: number;
  yearEndTarget: number;
}

const getFinancialForecastData = async (): Promise<FinancialForecastData> => {
  const { data, error } = await supabase.from('financial_forecasts').select('*').order('forecast_date', { ascending: true });
  if (error) throw new Error(error.message);

  const forecastData: ForecastData[] = data.map(d => ({
    month: format(new Date(d.forecast_date), 'MMM'),
    actual: null, // This could be joined with actuals later
    forecast: d.forecasted_value,
  }));
  
  // These would be calculated from a more complex model, mocking for now.
  return {
    forecastData,
    projectedGrowth: 8.5,
    confidenceLevel: data.length > 0 ? Math.round(data[0].confidence_level * 100) : 87,
    yearEndTarget: 42000000,
  };
};

export const useFinancialForecastData = () => {
  return useQuery<FinancialForecastData>({
    queryKey: ['financial_forecast_data'],
    queryFn: getFinancialForecastData,
  });
};
