
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { DashboardWidget } from '../types';

interface WidgetChartProps {
  widget: DashboardWidget;
}

const WidgetChart = ({ widget }: WidgetChartProps) => {
  const chartType = widget.config.chartType || 'bar';
  const colors = widget.config.colors || ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];
  
  const chartConfig = {
    value: { label: "Value", color: colors[0] },
    secondary: { label: "Secondary", color: colors[1] }
  };

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return (
          <ChartContainer config={chartConfig}>
            <BarChart data={widget.data}>
              {widget.config.showGrid && <CartesianGrid strokeDasharray="3 3" />}
              <XAxis dataKey="name" fontSize={12} />
              <YAxis fontSize={12} />
              <ChartTooltip content={<ChartTooltipContent />} />
              {widget.config.showLegend && <Legend />}
              <Bar dataKey="value" fill={colors[0]} />
              {widget.data[0]?.secondary !== undefined && (
                <Bar dataKey="secondary" fill={colors[1]} />
              )}
            </BarChart>
          </ChartContainer>
        );

      case 'line':
        return (
          <ChartContainer config={chartConfig}>
            <LineChart data={widget.data}>
              {widget.config.showGrid && <CartesianGrid strokeDasharray="3 3" />}
              <XAxis dataKey="name" fontSize={12} />
              <YAxis fontSize={12} />
              <ChartTooltip content={<ChartTooltipContent />} />
              {widget.config.showLegend && <Legend />}
              <Line type="monotone" dataKey="value" stroke={colors[0]} strokeWidth={2} />
              {widget.data[0]?.secondary !== undefined && (
                <Line type="monotone" dataKey="secondary" stroke={colors[1]} strokeWidth={2} />
              )}
            </LineChart>
          </ChartContainer>
        );

      case 'pie':
        return (
          <ChartContainer config={chartConfig}>
            <PieChart>
              <Pie
                data={widget.data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={60}
                paddingAngle={5}
              >
                {widget.data.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
              {widget.config.showLegend && <Legend />}
            </PieChart>
          </ChartContainer>
        );

      default:
        return <div className="text-muted-foreground text-center py-8">Chart type not supported</div>;
    }
  };

  return (
    <div className="h-full w-full">
      {renderChart()}
    </div>
  );
};

export default WidgetChart;
