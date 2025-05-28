
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Bot, Activity, TrendingUp } from 'lucide-react';
import { AIRole } from './types';

interface AIRolesOverviewCardsProps {
  roles: AIRole[];
  activeRoles: AIRole[];
}

const AIRolesOverviewCards = ({ roles, activeRoles }: AIRolesOverviewCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-400" />
            <div>
              <div className="text-lg font-bold text-foreground">{roles.length}</div>
              <div className="text-sm text-muted-foreground">Total AI Roles</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-green-400" />
            <div>
              <div className="text-lg font-bold text-foreground">{activeRoles.length}</div>
              <div className="text-sm text-muted-foreground">Active Agents</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-purple-500/10 to-violet-500/10 border-purple-500/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-400" />
            <div>
              <div className="text-lg font-bold text-foreground">
                {Math.round(activeRoles.reduce((sum, role) => sum + role.performance.accuracy, 0) / activeRoles.length)}%
              </div>
              <div className="text-sm text-muted-foreground">Avg Accuracy</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-orange-400" />
            <div>
              <div className="text-lg font-bold text-foreground">
                {activeRoles.reduce((sum, role) => sum + role.performance.recommendations, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Recommendations Today</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIRolesOverviewCards;
