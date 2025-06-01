
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowRightLeft, Clock, CheckCircle, AlertTriangle, Zap } from "lucide-react";

export const PatientTransferTile = () => {
  const metrics = {
    inProgress: 7,
    delayed: 2,
    autoRerouted: 1,
    completed: 23
  };

  const transfers = [
    { id: 1, from: 'ER', to: 'ICU', status: 'in-progress', eta: '15 min', priority: 'high' },
    { id: 2, from: 'ICU', to: 'General', status: 'delayed', eta: '45 min', priority: 'medium' },
    { id: 3, from: 'General', to: 'Discharge', status: 'completed', eta: 'Done', priority: 'low' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in-progress': return <Clock className="h-3 w-3 text-blue-500" />;
      case 'delayed': return <AlertTriangle className="h-3 w-3 text-orange-500" />;
      case 'completed': return <CheckCircle className="h-3 w-3 text-green-500" />;
      default: return <Clock className="h-3 w-3" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress': return 'bg-blue-100 text-blue-700';
      case 'delayed': return 'bg-orange-100 text-orange-700';
      case 'completed': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <ArrowRightLeft className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Patient Transfer Monitor</CardTitle>
              <CardDescription>Active transfer tracking</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-purple-600 border-purple-200 bg-purple-50">
            <Zap className="h-3 w-3 mr-1" />
            AI Optimized
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-xl font-bold text-blue-600">{metrics.inProgress}</div>
            <div className="text-xs text-muted-foreground">In Progress</div>
          </div>
          <div>
            <div className="text-xl font-bold text-orange-600">{metrics.delayed}</div>
            <div className="text-xs text-muted-foreground">Delayed</div>
          </div>
          <div>
            <div className="text-xl font-bold text-green-600">{metrics.autoRerouted}</div>
            <div className="text-xs text-muted-foreground">Auto-rerouted</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">Active Transfers</div>
          {transfers.slice(0, 3).map((transfer) => (
            <div key={transfer.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                {getStatusIcon(transfer.status)}
                <span className="text-sm font-medium">{transfer.from} → {transfer.to}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={`text-xs ${getStatusColor(transfer.status)}`}>
                  {transfer.eta}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Transfer Efficiency</span>
            <span>87%</span>
          </div>
          <Progress value={87} className="h-2" />
        </div>

        <div className="text-xs text-muted-foreground bg-purple-50 p-2 rounded">
          <strong>Transfer Optimizer:</strong> Suggested route change for ICU transfer saves 12 minutes.
        </div>
      </CardContent>
    </Card>
  );
};
