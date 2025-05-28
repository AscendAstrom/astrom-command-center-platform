
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsCards from "@/components/dashboard/StatsCards";
import ModuleCards from "@/components/dashboard/ModuleCards";
import QuickActions from "@/components/dashboard/QuickActions";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader />
        <StatsCards />
        <ModuleCards />
        <QuickActions />
      </div>
    </div>
  );
};

export default Dashboard;
