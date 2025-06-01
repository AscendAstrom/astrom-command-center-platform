
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Monitor, TrendingUp, TrendingDown } from "lucide-react";

export const EquipmentAvailabilityTile = () => {
  const equipment = [
    { name: 'Stretchers', available: 23, total: 30, trend: 'up', change: '+2' },
    { name: 'Ventilators', available: 8, total: 12, trend: 'down', change: '-1' },
    { name: 'IV Pumps', available: 45, total: 52, trend: 'up', change: '+3' },
    { name: 'Monitors', available: 18, total: 25, trend: 'stable', change: '0' }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-3 w-3 text-green-500" />;
      case 'down': return <TrendingDown className="h-3 w-3 text-red-500" />;
      default: return <div className="h-3 w-3 bg-gray-400 rounded-full" />;
    }
  };

  const getAvailabilityColor = (available: number, total: number) => {
    const percentage = (available / total) * 100;
    if (percentage >= 70) return 'text-green-600';
    if (percentage >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Monitor className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Equipment Availability</CardTitle>
              <CardDescription>Real-time equipment tracking</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
            72% Available
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {equipment.map((item) => (
            <div key={item.name} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{item.name}</span>
                {getTrendIcon(item.trend)}
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-lg font-bold ${getAvailabilityColor(item.available, item.total)}`}>
                  {item.available}/{item.total}
                </span>
                <Badge variant="outline" className={`text-xs ${
                  item.trend === 'up' ? 'text-green-600 border-green-200' :
                  item.trend === 'down' ? 'text-red-600 border-red-200' :
                  'text-gray-600 border-gray-200'
                }`}>
                  {item.change}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-green-50 p-2 rounded text-center">
            <div className="font-bold text-green-600">Available</div>
            <div className="text-green-600">94 units</div>
          </div>
          <div className="bg-red-50 p-2 rounded text-center">
            <div className="font-bold text-red-600">In Use</div>
            <div className="text-red-600">25 units</div>
          </div>
        </div>

        <div className="text-xs text-muted-foreground bg-blue-50 p-2 rounded">
          <strong>Utilization Forecaster:</strong> Ventilator shortage predicted in 2 hours. Consider backup options.
        </div>
      </CardContent>
    </Card>
  );
};
