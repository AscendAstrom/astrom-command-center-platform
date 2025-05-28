
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface RealtimeAreaChartProps {
  data: any[];
  dataKeys: string[];
  colors: string[];
  height?: number;
  stacked?: boolean;
}

const RealtimeAreaChart = ({ 
  data, 
  dataKeys, 
  colors, 
  height = 200, 
  stacked = false 
}: RealtimeAreaChartProps) => {
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
        <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <defs>
            {dataKeys.map((key, index) => (
              <linearGradient key={key} id={`color${key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors[index]} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={colors[index]} stopOpacity={0.1}/>
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" />
          <XAxis 
            dataKey="time" 
            className="text-xs text-muted-foreground"
            tickFormatter={(value) => new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          />
          <YAxis className="text-xs text-muted-foreground" />
          <ChartTooltip content={<ChartTooltipContent />} />
          {dataKeys.map((key, index) => (
            <Area
              key={key}
              type="monotone"
              dataKey={key}
              stackId={stacked ? "1" : undefined}
              stroke={colors[index]}
              fill={`url(#color${key})`}
              animationDuration={300}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default RealtimeAreaChart;
