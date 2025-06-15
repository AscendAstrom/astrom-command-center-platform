
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, TrendingUp, AlertCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { useState, useEffect } from "react";
import { supabase } from '@/integrations/supabase/client';

export const ClinicalIndicatorsTile = () => {
  const [indicatorsData, setIndicatorsData] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [metrics, setMetrics] = useState({
    overallPerformance: 0,
    indicatorsMet: 0,
    totalIndicators: 0,
    trendsImproving: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClinicalData();
    
    // Subscribe to real-time updates
    const channel = supabase
      .channel('clinical-updates')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'quality_measurements' },
        () => fetchClinicalData()
      )
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'quality_indicators' },
        () => fetchClinicalData()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchClinicalData = async () => {
    try {
      setLoading(true);
      
      // Fetch quality indicators
      const { data: indicators, error: indicatorsError } = await supabase
        .from('quality_indicators')
        .select('*')
        .eq('is_active', true)
        .eq('category', 'clinical');

      if (indicatorsError) throw indicatorsError;

      // Fetch quality measurements
      const { data: measurements, error: measurementsError } = await supabase
        .from('quality_measurements')
        .select('*, quality_indicators(name)')
        .order('measurement_date', { ascending: false })
        .limit(100);

      if (measurementsError) throw measurementsError;

      // Process indicators data
      const indicatorsDataArray = indicators?.slice(0, 4).map((indicator) => {
        const relatedMeasurements = measurements?.filter(m => m.indicator_id === indicator.id) || [];
        const currentValue = relatedMeasurements.length > 0 
          ? relatedMeasurements[0].value 
          : 0;
        
        // Determine trend based on recent measurements
        let trend = 'stable';
        if (relatedMeasurements.length >= 2) {
          const recent = Number(relatedMeasurements[0].value);
          const previous = Number(relatedMeasurements[1].value);
          if (indicator.name.toLowerCase().includes('rate')) { // For rates, lower is better
            trend = recent < previous ? 'improving' : recent > previous ? 'declining' : 'stable';
          } else { // For compliance etc, higher is better
            trend = recent > previous ? 'improving' : recent < previous ? 'declining' : 'stable';
          }
        }
        
        return {
          indicator: indicator.name.replace(/\s\(.+\)/, '').split(' ').slice(0, 3).join(' '), // Shortened name
          value: Number(currentValue),
          target: indicator.target_value,
          unit: indicator.unit,
          trend
        };
      }) || [];

      // Generate alerts based on performance
      const alertsArray = indicatorsDataArray
        .filter(metric => {
            if (metric.indicator.toLowerCase().includes('rate')) {
                return metric.value > metric.target;
            }
            return metric.value < metric.target;
        })
        .map(metric => ({
          indicator: metric.indicator,
          status: metric.value < (metric.target * 0.9) ? 'Critically Low' : 'Below Target',
          severity: metric.value < (metric.target * 0.9) ? 'High' : 'Medium'
        }));

      const totalIndicators = indicators?.length || 0;
      const indicatorsMet = indicatorsDataArray.filter(ind => {
        if (ind.indicator.toLowerCase().includes('rate')) {
            return ind.value <= ind.target;
        }
        return ind.value >= ind.target
      }).length;

      const overallPerformance = indicatorsDataArray.length > 0 
        ? Math.round(indicatorsDataArray.reduce((sum, ind) => {
            const performanceRatio = ind.indicator.toLowerCase().includes('rate')
                ? (ind.target / (ind.value || 1)) * 100
                : (ind.value / ind.target) * 100;
            return sum + Math.min(performanceRatio, 120); // Cap at 120% to avoid extreme outliers skewing average
        }, 0) / indicatorsDataArray.length)
        : 0;
      const trendsImproving = indicatorsDataArray.filter(ind => ind.trend === 'improving').length;

      setIndicatorsData(indicatorsDataArray);
      setAlerts(alertsArray);
      setMetrics({
        overallPerformance,
        indicatorsMet,
        totalIndicators,
        trendsImproving
      });
    } catch (error) {
      console.error('Error fetching clinical data:', error);
      setIndicatorsData([]);
      setAlerts([]);
      setMetrics({
        overallPerformance: 0,
        indicatorsMet: 0,
        totalIndicators: 0,
        trendsImproving: 0
      });
    } finally {
      setLoading(false);
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="h-3 w-3 text-green-500" />;
      case 'declining': return <TrendingUp className="h-3 w-3 text-red-500 rotate-180" />;
      default: return <div className="h-3 w-3 rounded-full bg-gray-400" />;
    }
  };

  if (loading) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Activity className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <CardTitle className="text-lg">Clinical Indicators</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="animate-pulse space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="h-16 bg-gray-200 rounded"></div>
              <div className="h-16 bg-gray-200 rounded"></div>
            </div>
            <div className="h-24 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Activity className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Clinical Indicators</CardTitle>
              <CardDescription>Key performance indicators</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
            {metrics.indicatorsMet}/{metrics.totalIndicators} Met
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-xl font-bold text-blue-600">{metrics.overallPerformance}%</div>
            <div className="text-xs text-muted-foreground">Overall Performance</div>
          </div>
          <div>
            <div className="text-xl font-bold text-green-600">{metrics.trendsImproving}</div>
            <div className="text-xs text-muted-foreground">Improving Trends</div>
          </div>
        </div>

        {indicatorsData.length > 0 ? (
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={indicatorsData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                <XAxis dataKey="indicator" fontSize={8} interval={0} tick={{width: 60}}/>
                <YAxis hide />
                <Tooltip 
                  formatter={(value: number, name: string, props: any) => [`${value} ${props.payload.unit || ''}`, 'Value']}
                  labelStyle={{ display: 'none' }}
                  contentStyle={{
                    borderRadius: '0.5rem',
                    border: '1px solid hsl(var(--border))',
                    backgroundColor: 'hsl(var(--background))'
                  }}
                />
                <Bar dataKey="value" fill="#3b82f6" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-24 flex items-center justify-center bg-muted/20 rounded">
            <p className="text-muted-foreground text-sm">No clinical indicator data available</p>
          </div>
        )}

        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground mb-2">Key Indicators</div>
          {indicatorsData.slice(0, 3).map((indicator, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{indicator.indicator}</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">{indicator.value}{indicator.unit}</span>
                {getTrendIcon(indicator.trend)}
              </div>
            </div>
          ))}
        </div>

        {alerts.length > 0 ? (
          <div className="bg-orange-50 p-2 rounded text-xs">
            <div className="flex items-center gap-1 mb-1">
              <AlertCircle className="h-3 w-3 text-orange-500" />
              <span className="font-semibold text-orange-600">{alerts.length} Active Alerts</span>
            </div>
            <div className="text-muted-foreground truncate">
              {alerts[0].indicator}: Below Target
            </div>
          </div>
        ) : (
          <div className="bg-green-50 p-2 rounded text-xs text-center text-green-700">
            All clinical indicators on target
          </div>
        )}
      </CardContent>
    </Card>
  );
};
