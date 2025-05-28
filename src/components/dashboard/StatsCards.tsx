
import { Card, CardContent } from "@/components/ui/card";
import { 
  Users, 
  TrendingUp, 
  Activity, 
  Database, 
  CheckCircle,
  Layers
} from "lucide-react";

const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Active Sources</p>
              <p className="text-3xl font-bold text-foreground">24</p>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-astrom-green" />
                <p className="text-sm text-astrom-green font-semibold">+8% this week</p>
              </div>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-astrom-blue to-astrom-blue-dark rounded-2xl flex items-center justify-center shadow-lg">
              <Database className="h-7 w-7 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Data Models</p>
              <p className="text-3xl font-bold text-foreground">156</p>
              <p className="text-sm text-astrom-orange font-semibold">12 active pipelines</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-astrom-purple to-astrom-pink rounded-2xl flex items-center justify-center shadow-lg">
              <Layers className="h-7 w-7 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Active Users</p>
              <p className="text-3xl font-bold text-foreground">342</p>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-astrom-green" />
                <p className="text-sm text-astrom-green font-semibold">89 online now</p>
              </div>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-astrom-green to-astrom-green-dark rounded-2xl flex items-center justify-center shadow-lg">
              <Users className="h-7 w-7 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">System Health</p>
              <p className="text-3xl font-bold text-foreground">99.8%</p>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-astrom-green" />
                <p className="text-sm text-astrom-green font-semibold">All systems operational</p>
              </div>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-astrom-green to-astrom-green-dark rounded-2xl flex items-center justify-center shadow-lg">
              <Activity className="h-7 w-7 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
