
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, PieChart } from 'lucide-react';
import { emptyStateMessages } from "@/config/constants";

interface ChartWidgetProps {
  title: string;
  type: 'bar' | 'line' | 'pie';
  data?: any[];
  loading?: boolean;
}

const ChartWidget = ({ title, type, data = [], loading = false }: ChartWidgetProps) => {
  const getChartIcon = () => {
    switch (type) {
      case 'bar': return <BarChart3 className="h-5 w-5" />;
      case 'line': return <TrendingUp className="h-5 w-5" />;
      case 'pie': return <PieChart className="h-5 w-5" />;
      default: return <BarChart3 className="h-5 w-5" />;
    }
  };

  if (loading) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {getChartIcon()}
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse">
            <div className="h-48 bg-muted rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (data.length === 0) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {getChartIcon()}
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-48">
            <div className="text-center">
              {getChartIcon()}
              <p className="text-sm text-muted-foreground mt-2">
                {emptyStateMessages.noChartData}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getChartIcon()}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-48 flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded">
          <p className="text-sm text-muted-foreground">Chart visualization would render here</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartWidget;
