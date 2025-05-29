
import { useState } from "react";
import { useAstroViewActions } from "@/hooks/useAstroViewActions";
import AstroViewHeader from "@/components/astro-view/AstroViewHeader";
import AstroViewStatusCards from "@/components/astro-view/AstroViewStatusCards";
import AstroViewTabs from "@/components/astro-view/AstroViewTabs";

const AstroView = () => {
  const [activeTab, setActiveTab] = useState("executive"); // Changed from "dashboards" to "executive"
  const {
    isRefreshing,
    handleRefresh,
    handleCreateDashboard,
    handleOptimizeViews,
    handleExportDashboard,
    handleShareDashboard,
    handleTabChange
  } = useAstroViewActions();

  const onTabChange = (value: string) => {
    setActiveTab(value);
    handleTabChange(value);
  };

  const onCreateDashboard = () => {
    handleCreateDashboard(setActiveTab);
  };

  return (
    <div className="h-full bg-background">
      <div className="h-full max-w-7xl mx-auto p-6 overflow-y-auto">
        <AstroViewHeader
          isRefreshing={isRefreshing}
          onRefresh={handleRefresh}
          onCreateDashboard={onCreateDashboard}
          onOptimizeViews={handleOptimizeViews}
          onExportDashboard={handleExportDashboard}
          onShareDashboard={handleShareDashboard}
        />

        <AstroViewStatusCards />

        <AstroViewTabs
          activeTab={activeTab}
          onTabChange={onTabChange}
        />
      </div>
    </div>
  );
};

export default AstroView;
