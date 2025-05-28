
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface RealtimeLineChartProps {
  data: any[];
  dataKeys: string[];
  colors: string[];
  height?: number;
  showGrid?: boolean;
}

const RealtimeLineChart = ({ 
  data, 
  dataKeys, 
  colors, 
  height = 200, 
  showGrid = true 
}: RealtimeLineChartProps) => {
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
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" />}
          <XAxis 
            dataKey="time" 
            className="text-xs text-muted-foreground"
            tickFormatter={(value) => new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          />
          <YAxis className="text-xs text-muted-foreground" />
          <ChartTooltip content={<ChartTooltipContent />} />
          {dataKeys.map((key, index) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={colors[index] || `hsl(${index * 60}, 70%, 50%)`}
              strokeWidth={2}
              dot={false}
              animationDuration={300}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default RealtimeLineChart;
