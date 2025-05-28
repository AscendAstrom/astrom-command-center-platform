
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface RealtimeBarChartProps {
  data: any[];
  dataKeys: string[];
  colors: string[];
  height?: number;
  horizontal?: boolean;
}

const RealtimeBarChart = ({ 
  data, 
  dataKeys, 
  colors, 
  height = 200, 
  horizontal = false 
}: RealtimeBarChartProps) => {
  const chartConfig = dataKeys.reduce((config, key, index) => ({
    ...config,
    [key]: {
      label: key.charAt(0).toUpperCase() + key.slice(1),
      color: colors[index] || `hsl(${index * 60}, 70%, 50%)`
    }
  }), {});

  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <ResponsiveContainer width="100%" height={height}>
        <BarChart 
          data={data} 
          layout={horizontal ? "horizontal" : "vertical"}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" />
          <XAxis 
            type={horizontal ? "number" : "category"}
            dataKey={horizontal ? undefined : "category"}
            className="text-xs text-muted-foreground"
          />
          <YAxis 
            type={horizontal ? "category" : "number"}
            dataKey={horizontal ? "category" : undefined}
            className="text-xs text-muted-foreground"
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          {dataKeys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              fill={colors[index]}
              radius={2}
              animationDuration={300}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default RealtimeBarChart;
