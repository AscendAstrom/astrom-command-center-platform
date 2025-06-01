
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, AlertCircle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, AreaChart, Area } from "recharts";

export const FinancialForecastTile = () => {
  const forecastData = [
    { month: 'Jul', actual: 3200000, forecast: 3250000, confidence: 95 },
    { month: 'Aug', actual: null, forecast: 3400000, confidence: 92 },
    { month: 'Sep', actual: null, forecast: 3350000, confidence: 88 },
    { month: 'Oct', actual: null, forecast: 3500000, confidence: 85 },
    { month: 'Nov', actual: null, forecast: 3450000, confidence: 82 },
    { month: 'Dec', actual: null, forecast: 3600000, confidence: 78 }
  ];

  const scenarioAnalysis = [
    { scenario: 'Optimistic', value: 42500000, probability: 25 },
    { scenario: 'Most Likely', value: 39800000, probability: 50 },
    { scenario: 'Conservative', value: 37200000, probability: 25 }
  ];

  const metrics = {
    forecastAccuracy: 94.2,
    projectedGrowth: 8.5,
    confidenceLevel: 87,
    yearEndTarget: 42000000
  };

  const keyDrivers = [
    { driver: 'Patient Volume', impact: '+$450K', confidence: 92 },
    { driver: 'Service Expansion', impact: '+$320K', confidence: 85 },
    { driver: 'Cost Optimization', impact: '+$180K', confidence: 88 },
    { driver: 'Market Changes', impact: '-$125K', confidence: 75 }
  ];

  const getScenarioColor = (scenario: string) => {
    switch (scenario) {
      case 'Optimistic': return 'text-green-600 bg-green-50';
      case 'Most Likely': return 'text-blue-600 bg-blue-50';
      case 'Conservative': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-cyan-500/10 rounded-lg">
              <TrendingUp className="h-5 w-5 text-cyan-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Financial Forecast</CardTitle>
              <CardDescription>Predictive analytics & scenarios</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-cyan-600 border-cyan-200 bg-cyan-50">
            <Target className="h-3 w-3 mr-1" />
            {metrics.confidenceLevel}% Confidence
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-cyan-600">+{metrics.projectedGrowth}%</div>
            <div className="text-xs text-muted-foreground">Projected Growth</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">${(metrics.yearEndTarget / 1000000).toFixed(1)}M</div>
            <div className="text-xs text-muted-foreground">Year-End Target</div>
          </div>
        </div>

        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={forecastData}>
              <XAxis dataKey="month" fontSize={10} />
              <YAxis hide />
              <Tooltip formatter={(value) => [`$${typeof value === 'number' ? (value / 1000000).toFixed(1) : 0}M`, 'Revenue']} />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="#22c55e" 
                strokeWidth={2}
                name="Actual"
                connectNulls={false}
              />
              <Line 
                type="monotone" 
                dataKey="forecast" 
                stroke="#06b6d4" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Forecast"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground mb-2">Scenario Analysis</div>
          {scenarioAnalysis.map((scenario, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <Badge variant="outline" className={getScenarioColor(scenario.scenario)}>
                {scenario.scenario}
              </Badge>
              <div className="flex items-center gap-2">
                <span className="text-xs">{scenario.probability}%</span>
                <span className="font-medium">${(scenario.value / 1000000).toFixed(1)}M</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-xs text-muted-foreground bg-cyan-50 p-2 rounded">
          <strong>Forecast AI:</strong> {metrics.forecastAccuracy}% accuracy rate. Key driver: Patient volume increase expected.
        </div>
      </CardContent>
    </Card>
  );
};
