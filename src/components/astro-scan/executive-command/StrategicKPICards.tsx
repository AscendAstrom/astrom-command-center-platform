
import { Card } from "@/components/ui/card";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Brain,
  Target,
  Globe
} from "lucide-react";

interface KPIData {
  current: number;
  target: number;
  trend: string;
  change: number;
}

interface StrategicKPIs {
  marketPosition: KPIData;
  innovationIndex: KPIData;
  competitiveAdvantage: KPIData;
  stakeholderValue: KPIData;
}

interface StrategicKPICardsProps {
  strategicKPIs: StrategicKPIs;
}

const StrategicKPICards = ({ strategicKPIs }: StrategicKPICardsProps) => {
  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? <TrendingUp className="h-4 w-4 text-green-400" /> : 
           <TrendingDown className="h-4 w-4 text-red-400" />;
  };

  const formatChange = (change: number) => {
    return `${change >= 0 ? '+' : ''}${change.toFixed(1)}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-400" />
            <span className="font-medium text-sm">Market Position</span>
          </div>
          {getTrendIcon(strategicKPIs.marketPosition.trend)}
        </div>
        <div className="space-y-1">
          <div className="text-2xl font-bold text-blue-400">{strategicKPIs.marketPosition.current}%</div>
          <div className="text-xs text-muted-foreground">
            Target: {strategicKPIs.marketPosition.target}% ({formatChange(strategicKPIs.marketPosition.change)}%)
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-400" />
            <span className="font-medium text-sm">Innovation Index</span>
          </div>
          {getTrendIcon(strategicKPIs.innovationIndex.trend)}
        </div>
        <div className="space-y-1">
          <div className="text-2xl font-bold text-purple-400">{strategicKPIs.innovationIndex.current}</div>
          <div className="text-xs text-muted-foreground">
            Target: {strategicKPIs.innovationIndex.target} ({formatChange(strategicKPIs.innovationIndex.change)})
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-green-400" />
            <span className="font-medium text-sm">Competitive Edge</span>
          </div>
          {getTrendIcon(strategicKPIs.competitiveAdvantage.trend)}
        </div>
        <div className="space-y-1">
          <div className="text-2xl font-bold text-green-400">{strategicKPIs.competitiveAdvantage.current}s</div>
          <div className="text-xs text-muted-foreground">
            Target: {strategicKPIs.competitiveAdvantage.target.toFixed(1)}s ({formatChange(strategicKPIs.competitiveAdvantage.change)}s)
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-orange-400" />
            <span className="font-medium text-sm">Stakeholder Value</span>
          </div>
          {getTrendIcon(strategicKPIs.stakeholderValue.trend)}
        </div>
        <div className="space-y-1">
          <div className="text-2xl font-bold text-orange-400">${strategicKPIs.stakeholderValue.current}M</div>
          <div className="text-xs text-muted-foreground">
            Target: ${strategicKPIs.stakeholderValue.target}M ({formatChange(strategicKPIs.stakeholderValue.change)}M)
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StrategicKPICards;
