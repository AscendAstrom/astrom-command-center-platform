
import { LayoutDashboard } from "lucide-react";

const DashboardHeader = () => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
          <LayoutDashboard className="h-5 w-5 text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">ASTROM</h1>
        <span className="text-sm text-primary font-medium">Intelligence Platform Dashboard</span>
      </div>
      <p className="text-muted-foreground max-w-2xl">
        Comprehensive data intelligence platform providing end-to-end analytics, 
        from data ingestion to advanced visualizations and automated workflows.
      </p>
    </div>
  );
};

export default DashboardHeader;
