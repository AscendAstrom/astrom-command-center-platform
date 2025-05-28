
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, Users, Heart } from "lucide-react";

const alerts = [
  {
    id: 1,
    type: 'critical',
    title: 'Zone C Over Capacity',
    message: 'Acute care zone has exceeded safe capacity limits',
    time: '2 min ago',
    icon: AlertTriangle,
  },
  {
    id: 2,
    type: 'warning',
    title: 'Extended Wait Time',
    message: '3 patients waiting over 45 minutes in Zone B',
    time: '5 min ago',
    icon: Clock,
  },
  {
    id: 3,
    type: 'info',
    title: 'Staff Allocation',
    message: 'Consider reallocating nursing staff to Zone A',
    time: '12 min ago',
    icon: Users,
  },
  {
    id: 4,
    type: 'critical',
    title: 'Patient Priority Alert',
    message: 'High priority patient arrival - Room 3 needed',
    time: '15 min ago',
    icon: Heart,
  },
];

const AlertPanel = () => {
  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical':
        return 'border-l-red-500 bg-red-500/10';
      case 'warning':
        return 'border-l-yellow-500 bg-yellow-500/10';
      case 'info':
        return 'border-l-blue-500 bg-blue-500/10';
      default:
        return 'border-l-slate-500 bg-slate-500/10';
    }
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'critical':
        return 'destructive';
      case 'warning':
        return 'secondary';
      case 'info':
        return 'outline';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-3 max-h-80 overflow-y-auto">
      {alerts.map((alert) => {
        const Icon = alert.icon;
        return (
          <div
            key={alert.id}
            className={`p-3 rounded-lg border-l-4 ${getAlertColor(alert.type)} hover:bg-opacity-20 transition-all cursor-pointer`}
          >
            <div className="flex items-start gap-3">
              <Icon className="h-5 w-5 mt-0.5 text-slate-300" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-semibold text-white truncate">
                    {alert.title}
                  </h4>
                  <Badge variant={getBadgeVariant(alert.type)} className="text-xs">
                    {alert.type.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-xs text-slate-400 mb-2">{alert.message}</p>
                <span className="text-xs text-slate-500">{alert.time}</span>
              </div>
            </div>
          </div>
        );
      })}
      
      <div className="text-center pt-2">
        <button className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
          View All Alerts ({alerts.length + 5} more)
        </button>
      </div>
    </div>
  );
};

export default AlertPanel;
