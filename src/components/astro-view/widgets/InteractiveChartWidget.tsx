
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend 
} from 'recharts';
import { 
  BarChart3, TrendingUp, Filter, Download, Maximize2, 
  RefreshCw, Settings, Eye 
} from 'lucide-react';

interface InteractiveChartWidgetProps {
  title: string;
  type: 'bar' | 'line' | 'pie' | 'area';
  data?: any[];
  timeRange?: '1h' | '6h' | '24h' | '7d' | '30d';
  onTimeRangeChange?: (range: string) => void;
  onFilterChange?: (filter: string) => void;
  onExport?: () => void;
  onDrillDown?: () => void;
}

const InteractiveChartWidget = ({ 
  title,
  type,
  data = [],
  timeRange = '24h',
  onTimeRangeChange,
  onFilterChange,
  onExport,
  onDrillDown
}: InteractiveChartWidgetProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState('all');

  // Sample data for different chart types
  const sampleData = {
    bar: [
      { name: '6AM', admissions: 12, discharges: 8, capacity: 85 },
      { name: '9AM', admissions: 28, discharges: 15, capacity: 92 },
      { name: '12PM', admissions: 45, discharges: 32, capacity: 98 },
      { name: '3PM', admissions: 67, discharges: 48, capacity: 95 },
      { name: '6PM', admissions: 52, discharges: 55, capacity: 88 },
      { name: '9PM', admissions: 34, discharges: 42, capacity: 78 },
    ],
    line: [
      { time: '00:00', patients: 45, wait_time: 23, staff: 12 },
      { time: '04:00', patients: 38, wait_time: 18, staff: 10 },
      { time: '08:00', patients: 62, wait_time: 35, staff: 15 },
      { time: '12:00', patients: 78, wait_time: 42, staff: 18 },
      { time: '16:00', patients: 85, wait_time: 38, staff: 20 },
      { time: '20:00', patients: 67, wait_time: 28, staff: 16 },
    ],
    pie: [
      { name: 'Emergency', value: 35, color: '#ef4444' },
      { name: 'Elective', value: 45, color: '#3b82f6' },
      { name: 'Urgent', value: 20, color: '#f59e0b' },
    ]
  };

  const chartData = data.length > 0 ? data : sampleData[type] || [];

  const chartConfig = {
    admissions: { label: "Admissions", color: "#06b6d4" },
    discharges: { label: "Discharges", color: "#10b981" },
    capacity: { label: "Capacity %", color: "#f59e0b" },
    patients: { label: "Patients", color: "#8b5cf6" },
    wait_time: { label: "Wait Time", color: "#ef4444" },
    staff: { label: "Staff", color: "#06b6d4" },
    Emergency: { label: "Emergency", color: "#ef4444" },
    Elective: { label: "Elective", color: "#3b82f6" },
    Urgent: { label: "Urgent", color: "#f59e0b" },
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const renderChart = () => {
    switch (type) {
      case 'bar':
        return (
          <ChartContainer config={chartConfig}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" />
              <XAxis dataKey="name" className="fill-muted-foreground text-xs" />
              <YAxis className="fill-muted-foreground text-xs" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="admissions" fill="var(--color-admissions)" />
              <Bar dataKey="discharges" fill="var(--color-discharges)" />
            </BarChart>
          </ChartContainer>
        );

      case 'line':
        return (
          <ChartContainer config={chartConfig}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" />
              <XAxis dataKey="time" className="fill-muted-foreground text-xs" />
              <YAxis className="fill-muted-foreground text-xs" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="patients" 
                stroke="var(--color-patients)" 
                strokeWidth={2}
                dot={{ fill: "var(--color-patients)" }}
              />
              <Line 
                type="monotone" 
                dataKey="wait_time" 
                stroke="var(--color-wait_time)" 
                strokeWidth={2}
                dot={{ fill: "var(--color-wait_time)" }}
              />
            </LineChart>
          </ChartContainer>
        );

      case 'pie':
        return (
          <ChartContainer config={chartConfig}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
            </PieChart>
          </ChartContainer>
        );

      default:
        return <div className="flex items-center justify-center h-full text-muted-foreground">Chart type not supported</div>;
    }
  };

  return (
    <Card className="bg-card border-border hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-cyan-400" />
            <CardTitle className="text-foreground text-lg">{title}</CardTitle>
            <Badge variant="outline" className="text-xs">{type.toUpperCase()}</Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-xs text-green-400">
              <TrendingUp className="h-3 w-3" />
              <span>+12%</span>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              disabled={isLoading}
              className="h-8 w-8 p-0"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onDrillDown}
              className="h-8 w-8 p-0"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Chart Controls */}
        <div className="flex items-center gap-2 mt-2">
          <Select value={timeRange} onValueChange={onTimeRangeChange}>
            <SelectTrigger className="w-24 h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">1H</SelectItem>
              <SelectItem value="6h">6H</SelectItem>
              <SelectItem value="24h">24H</SelectItem>
              <SelectItem value="7d">7D</SelectItem>
              <SelectItem value="30d">30D</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedMetric} onValueChange={setSelectedMetric}>
            <SelectTrigger className="w-32 h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Metrics</SelectItem>
              <SelectItem value="admissions">Admissions</SelectItem>
              <SelectItem value="capacity">Capacity</SelectItem>
              <SelectItem value="wait_time">Wait Times</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm" onClick={onExport} className="h-8 text-xs">
            <Download className="h-3 w-3 mr-1" />
            Export
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="h-80 w-full">
          {renderChart()}
        </div>
        
        {/* Chart Insights */}
        <div className="mt-4 p-3 bg-muted/20 rounded-lg">
          <div className="flex items-center gap-2 text-sm">
            <Eye className="h-4 w-4 text-blue-400" />
            <span className="font-medium text-foreground">Key Insights:</span>
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            Peak hours: 12PM-3PM • Average wait time: 32 min • Capacity utilization: 89%
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractiveChartWidget;
