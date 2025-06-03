
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChartType, ChartData } from '../types';
import { BarChart3, TrendingUp, Maximize2 } from 'lucide-react';
import { chartConfigurations, emptyStateMessages } from '@/config/constants';

interface ChartWidgetProps {
  title: string;
  type: ChartType;
  data?: ChartData;
}

const ChartWidget = ({ title, type, data }: ChartWidgetProps) => {
  const chartConfig = {
    value: {
      label: "Value",
      color: chartConfigurations.defaultColors.primary,
    },
    admissions: {
      label: "Admissions",
      color: chartConfigurations.defaultColors.primary,
    },
    discharges: {
      label: "Discharges",
      color: chartConfigurations.defaultColors.secondary,
    },
  };

  const handleDrillDown = () => {
    console.log(`Drilling down into ${title} chart`);
  };

  // Handle empty data states
  const hasData = data && Array.isArray(data) && data.length > 0;

  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
      <BarChart3 className="h-12 w-12 mb-4" />
      <p className="text-sm text-center">{emptyStateMessages.noChartData}</p>
      <p className="text-xs text-center mt-2">Configure data sources to populate this chart</p>
    </div>
  );

  const renderChart = () => {
    if (!hasData) {
      return renderEmptyState();
    }

    switch (type) {
      case 'bar':
        return (
          <ChartContainer config={chartConfig}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="name" className="fill-muted-foreground" />
              <YAxis className="fill-muted-foreground" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="value" fill="var(--color-value)" />
            </BarChart>
          </ChartContainer>
        );

      case 'line':
        return (
          <ChartContainer config={chartConfig}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="name" className="fill-muted-foreground" />
              <YAxis className="fill-muted-foreground" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line 
                type="monotone" 
                dataKey="admissions" 
                stroke="var(--color-admissions)" 
                strokeWidth={2}
                dot={{ fill: "var(--color-admissions)" }}
              />
              <Line 
                type="monotone" 
                dataKey="discharges" 
                stroke="var(--color-discharges)" 
                strokeWidth={2}
                dot={{ fill: "var(--color-discharges)" }}
              />
            </LineChart>
          </ChartContainer>
        );

      case 'pie':
      case 'donut':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={type === 'donut' ? 40 : 0}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.color || chartConfigurations.defaultColors.primary} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return renderEmptyState();
    }
  };

  return (
    <Card className="bg-card border-border hover:border-muted-foreground transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-foreground text-lg flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-cyan-400" />
            {title}
          </CardTitle>
          <div className="flex items-center gap-2">
            {hasData && (
              <div className="flex items-center gap-1 text-xs text-green-400">
                <TrendingUp className="h-3 w-3" />
                <span>Live</span>
              </div>
            )}
            <button
              onClick={handleDrillDown}
              className="p-1 hover:bg-muted rounded transition-colors"
              title="Drill down for details"
            >
              <Maximize2 className="h-4 w-4 text-muted-foreground hover:text-cyan-400" />
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-64 w-full">
          {renderChart()}
        </div>
        
        {hasData && (type === 'pie' || type === 'donut') && (
          <div className="flex justify-center gap-4 mt-4 flex-wrap">
            {data.map((entry: any, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry.color || chartConfigurations.defaultColors.primary }}
                />
                <span className="text-sm text-foreground">{entry.name}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ChartWidget;
