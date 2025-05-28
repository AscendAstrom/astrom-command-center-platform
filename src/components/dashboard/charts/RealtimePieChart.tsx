
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface RealtimePieChartProps {
  data: any[];
  dataKey: string;
  nameKey: string;
  colors: string[];
  height?: number;
  showLegend?: boolean;
}

const RealtimePieChart = ({ 
  data, 
  dataKey, 
  nameKey, 
  colors, 
  height = 200, 
  showLegend = true 
}: RealtimePieChartProps) => {
  const chartConfig = data.reduce((config, item, index) => ({
    ...config,
    [item[nameKey]]: {
      label: item[nameKey],
      color: colors[index % colors.length]
    }
  }), {});

  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={60}
            fill="#8884d8"
            dataKey={dataKey}
            nameKey={nameKey}
            animationDuration={300}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <ChartTooltip content={<ChartTooltipContent />} />
          {showLegend && <Legend />}
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default RealtimePieChart;
