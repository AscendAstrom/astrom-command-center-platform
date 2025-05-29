
import { Button } from "@/components/ui/button";
import { RefreshCw, Plus, Target, Database, Eye } from "lucide-react";
import LogoIcon from "@/components/ui/LogoIcon";
import { toast } from "sonner";

interface AstroViewHeaderProps {
  isRefreshing: boolean;
  onRefresh: () => void;
  onCreateDashboard: () => void;
  onOptimizeViews: () => void;
  onExportDashboard: () => void;
  onShareDashboard: () => void;
}

const AstroViewHeader = ({
  isRefreshing,
  onRefresh,
  onCreateDashboard,
  onOptimizeViews,
  onExportDashboard,
  onShareDashboard
}: AstroViewHeaderProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <LogoIcon size="sm" animate={true} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">ASTRO-VIEW</h1>
            <p className="text-purple-400 font-medium">Data Visualization & Dashboard Platform</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="hover:bg-purple-500/10 border-purple-500/20"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? "Refreshing..." : "Refresh Views"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onCreateDashboard}
            className="hover:bg-blue-500/10"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Dashboard
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onOptimizeViews}
            className="hover:bg-green-500/10"
          >
            <Target className="h-4 w-4 mr-2" />
            Optimize
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onExportDashboard}
            className="hover:bg-orange-500/10"
          >
            <Database className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onShareDashboard}
            className="hover:bg-pink-500/10"
          >
            <Eye className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>
      <p className="text-muted-foreground max-w-3xl mt-2">
        Advanced visualization platform for creating interactive dashboards, real-time analytics, 
        and comprehensive data storytelling with semantic layer integration.
      </p>
    </div>
  );
};

export default AstroViewHeader;
