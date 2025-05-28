
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Database, 
  Target,
  Eye,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";

const QuickActions = () => {
  return (
    <Card className="bg-card border-border mt-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-astrom-purple to-astrom-purple-dark rounded-xl flex items-center justify-center">
            <Zap className="h-5 w-5 text-white" />
          </div>
          Quick Actions
        </CardTitle>
        <CardDescription className="text-base text-muted-foreground">
          Common tasks and shortcuts to get you started quickly
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/astro-scan">
            <Button variant="outline" className="w-full h-16 text-left justify-start border-border hover:bg-muted">
              <Database className="h-5 w-5 mr-3 text-astrom-blue" />
              <div>
                <div className="font-semibold text-foreground">Add Data Source</div>
                <div className="text-sm text-muted-foreground">Connect new data</div>
              </div>
            </Button>
          </Link>
          <Link to="/astro-view">
            <Button variant="outline" className="w-full h-16 text-left justify-start border-border hover:bg-muted">
              <Eye className="h-5 w-5 mr-3 text-astrom-purple" />
              <div>
                <div className="font-semibold text-foreground">Create Dashboard</div>
                <div className="text-sm text-muted-foreground">Build visualizations</div>
              </div>
            </Button>
          </Link>
          <Link to="/astro-metrics">
            <Button variant="outline" className="w-full h-16 text-left justify-start border-border hover:bg-muted">
              <Target className="h-5 w-5 mr-3 text-astrom-green" />
              <div>
                <div className="font-semibold text-foreground">Monitor KPIs</div>
                <div className="text-sm text-muted-foreground">Track performance</div>
              </div>
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
