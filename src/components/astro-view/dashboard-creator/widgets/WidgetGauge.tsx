
import { DashboardWidget } from '../types';

interface WidgetGaugeProps {
  widget: DashboardWidget;
}

const WidgetGauge = ({ widget }: WidgetGaugeProps) => {
  const { value, max, label } = widget.data;
  const percentage = (value / max) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getColor = () => {
    if (percentage >= 80) return '#ef4444'; // red
    if (percentage >= 60) return '#f59e0b'; // yellow
    return '#10b981'; // green
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="relative w-32 h-32">
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#e5e7eb"
            strokeWidth="8"
            fill="transparent"
            className="opacity-20"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke={getColor()}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-300"
          />
        </svg>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">
              {Math.round(percentage)}%
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <div className="text-sm text-muted-foreground">{label}</div>
        <div className="text-xs text-muted-foreground mt-1">
          {value} / {max}
        </div>
      </div>
    </div>
  );
};

export default WidgetGauge;
