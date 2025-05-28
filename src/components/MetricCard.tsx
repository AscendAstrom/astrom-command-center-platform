
import { Card, CardContent } from "@/components/ui/card";
import { 
  Users, 
  Clock, 
  Target, 
  TrendingUp, 
  TrendingDown,
  Bed
} from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: "users" | "clock" | "target" | "bed";
}

const iconMap = {
  users: Users,
  clock: Clock,
  target: Target,
  bed: Bed,
};

const MetricCard = ({ title, value, change, trend, icon }: MetricCardProps) => {
  const Icon = iconMap[icon];
  const TrendIcon = trend === "up" ? TrendingUp : TrendingDown;
  const trendColor = trend === "up" ? "text-green-400" : "text-red-400";
  const bgGradient = trend === "up" ? "from-green-500/10 to-cyan-500/10" : "from-red-500/10 to-orange-500/10";

  return (
    <Card className={`bg-gradient-to-br ${bgGradient} border-slate-800 hover:border-slate-700 transition-all duration-300`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm font-medium">{title}</p>
            <p className="text-2xl font-bold text-white mt-1">{value}</p>
            <div className="flex items-center gap-1 mt-2">
              <TrendIcon className={`h-4 w-4 ${trendColor}`} />
              <span className={`text-sm font-medium ${trendColor}`}>{change}</span>
              <span className="text-slate-400 text-sm">vs last period</span>
            </div>
          </div>
          <div className="bg-slate-800 p-3 rounded-lg">
            <Icon className="h-6 w-6 text-cyan-400" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
