
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardWidgetProps {
  title: string;
  value: string;
  trend?: 'up' | 'down' | 'stable';
  change?: string;
  subtitle?: string;
}

const MetricCardWidget = ({ 
  title, 
  value, 
  trend = 'stable', 
  change, 
  subtitle 
}: MetricCardWidgetProps) => {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-400" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-400" />;
      case 'stable': return <Minus className="h-4 w-4 text-slate-400" />;
      default: return null;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-green-400';
      case 'down': return 'text-red-400';
      case 'stable': return 'text-slate-400';
      default: return 'text-slate-400';
    }
  };

  const handleClick = () => {
    console.log(`Drilling down into ${title} metric`);
    // Implementation for drill-down functionality
  };

  return (
    <Card 
      className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
      onClick={handleClick}
    >
      <CardContent className="p-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-slate-400">{title}</h3>
            {getTrendIcon()}
          </div>
          
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-white">{value}</span>
            {change && (
              <span className={`text-sm ${getTrendColor()}`}>
                {change}
              </span>
            )}
          </div>
          
          {subtitle && (
            <p className="text-xs text-slate-500">{subtitle}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCardWidget;
