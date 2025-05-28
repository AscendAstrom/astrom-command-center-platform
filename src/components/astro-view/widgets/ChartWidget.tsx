
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChartType, ChartData } from '../types';
import { BarChart3, TrendingUp, Maximize2 } from 'lucide-react';

interface ChartWidgetProps {
  title: string;
  type: ChartType;
  data?: ChartData;
}

const ChartWidget = ({ title, type, data }: ChartWidgetProps) => {
  // Sample data - in real implementation this would come from props or API
  const sampleBarData = [
    { name: '6AM', value: 12 },
    { name: '9AM', value: 28 },
    { name: '12PM', value: 45 },
    { name: '3PM', value: 67 },
    { name: '6PM', value: 52 },
    { name: '9PM', value: 34 },
  ];

  const sampleLineData = [
    { name: 'Mon', admissions: 45, discharges: 38 },
    { name: 'Tue', admissions: 52, discharges: 47 },
    { name: 'Wed', admissions: 38, discharges: 41 },
    { name: 'Thu', admissions: 61, discharges: 55 },
    { name: 'Fri', admissions: 48, discharges: 52 },
    { name: 'Sat', admissions: 35, discharges: 38 },
    { name: 'Sun', admissions: 29, discharges: 32 },
  ];

  const samplePieData = [
    { name: 'Emergency', value: 35, color: '#ef4444' },
    { name: 'Elective', value: 45, color: '#3b82f6' },
    { name: 'Urgent', value: 20, color: '#f59e0b' },
  ];

  const chartConfig = {
    value: {
      label: "Value",
      color: "#06b6d4",
    },
    admissions: {
      label: "Admissions",
      color: "#06b6d4",
    },
    discharges: {
      label: "Discharges",
      color: "#10b981",
    },
  };

  const handleDrillDown = () => {
    console.log(`Drilling down into ${title} chart`);
    // Implementation for drill-down functionality
  };

  const renderChart = () => {
    switch (type) {
      case 'bar':
        return (
          <ChartContainer config={chartConfig}>
            <BarChart data={sampleBarData}>
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
            <LineChart data={sampleLineData}>
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
                data={samplePieData}
                cx="50%"
                cy="50%"
                innerRadius={type === 'donut' ? 40 : 0}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {samplePieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <BarChart3 className="h-12 w-12 mb-2" />
            <p>Chart type not supported</p>
          </div>
        );
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
            <div className="flex items-center gap-1 text-xs text-green-400">
              <TrendingUp className="h-3 w-3" />
              <span>+12%</span>
            </div>
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
        
        {type === 'pie' || type === 'donut' ? (
          <div className="flex justify-center gap-4 mt-4">
            {samplePieData.map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm text-foreground">{entry.name}</span>
              </div>
            ))}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default ChartWidget;
