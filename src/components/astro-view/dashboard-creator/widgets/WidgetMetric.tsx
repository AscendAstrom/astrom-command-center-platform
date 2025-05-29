
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { DashboardWidget } from '../types';

interface WidgetMetricProps {
  widget: DashboardWidget;
}

const WidgetMetric = ({ widget }: WidgetMetricProps) => {
  const { value, label, change, trend } = widget.data;
  
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-500';
      case 'down':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="h-full flex flex-col justify-center items-center text-center p-4">
      <div className="text-3xl font-bold text-foreground mb-2">
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
      
      <div className="text-sm text-muted-foreground mb-2">
        {label}
      </div>
      
      {change && (
        <div className={`flex items-center gap-1 text-sm font-medium ${getTrendColor()}`}>
          {getTrendIcon()}
          <span>{change}</span>
        </div>
      )}
    </div>
  );
};

export default WidgetMetric;
