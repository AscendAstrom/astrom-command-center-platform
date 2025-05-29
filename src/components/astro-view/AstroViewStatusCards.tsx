
import { Eye, BarChart3, Layout, Database } from "lucide-react";

const AstroViewStatusCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-card rounded-lg p-4 border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Active Dashboards</p>
            <p className="text-2xl font-bold text-foreground">24</p>
          </div>
          <Layout className="h-8 w-8 text-purple-400" />
        </div>
      </div>
      <div className="bg-card rounded-lg p-4 border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Visualizations</p>
            <p className="text-2xl font-bold text-foreground">187</p>
          </div>
          <BarChart3 className="h-8 w-8 text-blue-400" />
        </div>
      </div>
      <div className="bg-card rounded-lg p-4 border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Active Users</p>
            <p className="text-2xl font-bold text-foreground">342</p>
          </div>
          <Eye className="h-8 w-8 text-green-400" />
        </div>
      </div>
      <div className="bg-card rounded-lg p-4 border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Data Sources</p>
            <p className="text-2xl font-bold text-foreground">56</p>
          </div>
          <Database className="h-8 w-8 text-orange-400" />
        </div>
      </div>
    </div>
  );
};

export default AstroViewStatusCards;
