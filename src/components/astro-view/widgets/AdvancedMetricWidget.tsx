
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Minus, AlertTriangle, Info, Maximize2 } from 'lucide-react';

interface AdvancedMetricWidgetProps {
  title: string;
  value: string | number;
  previousValue?: string | number;
  target?: string | number;
  trend?: 'up' | 'down' | 'stable';
  trendPercentage?: number;
  status?: 'normal' | 'warning' | 'critical';
  unit?: string;
  subtitle?: string;
  showProgress?: boolean;
  progressValue?: number;
  onDrillDown?: () => void;
}

const AdvancedMetricWidget = ({ 
  title, 
  value, 
  previousValue,
  target,
  trend = 'stable', 
  trendPercentage,
  status = 'normal',
  unit = '',
  subtitle,
  showProgress = false,
  progressValue = 0,
  onDrillDown
}: AdvancedMetricWidgetProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-400" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-400" />;
      case 'stable': return <Minus className="h-4 w-4 text-muted-foreground" />;
      default: return null;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'warning': return 'border-l-yellow-500 bg-yellow-500/5';
      case 'critical': return 'border-l-red-500 bg-red-500/5';
      default: return 'border-l-green-500 bg-green-500/5';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Info className="h-4 w-4 text-green-500" />;
    }
  };

  const formatValue = (val: string | number) => {
    if (typeof val === 'number') {
      return val.toLocaleString();
    }
    return val;
  };

  return (
    <Card 
      className={`bg-card border-border border-l-4 transition-all duration-300 hover:shadow-lg cursor-pointer ${getStatusColor()}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onDrillDown}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
            {getStatusIcon()}
          </div>
          <div className="flex items-center gap-2">
            {getTrendIcon()}
            {isHovered && onDrillDown && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 w-6 p-0 opacity-70 hover:opacity-100"
              >
                <Maximize2 className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="flex items-end gap-3">
          <span className="text-3xl font-bold text-foreground">
            {formatValue(value)}{unit}
          </span>
          
          {trendPercentage && (
            <div className={`flex items-center gap-1 text-sm ${
              trend === 'up' ? 'text-green-400' : 
              trend === 'down' ? 'text-red-400' : 
              'text-muted-foreground'
            }`}>
              <span>{trendPercentage > 0 ? '+' : ''}{trendPercentage}%</span>
            </div>
          )}
        </div>

        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}

        {previousValue && (
          <div className="text-xs text-muted-foreground">
            Previous: {formatValue(previousValue)}{unit}
          </div>
        )}

        {target && (
          <div className="text-xs text-muted-foreground">
            Target: {formatValue(target)}{unit}
          </div>
        )}

        {showProgress && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="text-foreground font-medium">{progressValue}%</span>
            </div>
            <Progress value={progressValue} className="h-2" />
          </div>
        )}

        <div className="flex justify-between items-center">
          <Badge variant="outline" className={
            status === 'critical' ? 'border-red-400 text-red-400' :
            status === 'warning' ? 'border-yellow-400 text-yellow-400' :
            'border-green-400 text-green-400'
          }>
            {status.toUpperCase()}
          </Badge>
          
          <span className="text-xs text-muted-foreground">
            Updated: {new Date().toLocaleTimeString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedMetricWidget;
