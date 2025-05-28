
import {
  Sidebar,
  SidebarContent,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import { navigationItems, systemItems } from "./sidebar/navigationData";
import SidebarHeader from "./sidebar/SidebarHeader";
import SidebarFooter from "./sidebar/SidebarFooter";
import NavigationSection from "./sidebar/NavigationSection";
import SystemSection from "./sidebar/SystemSection";

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar 
      className="bg-background/95 backdrop-blur-xl border-r border-border/50 transition-all duration-300 min-h-screen"
      collapsible="icon"
    >
      <SidebarContent className="flex flex-col h-full overflow-y-auto">
        <SidebarHeader collapsed={collapsed} />
        
        <NavigationSection 
          items={navigationItems} 
          collapsed={collapsed} 
          title="PLATFORM MODULES" 
        />

        <SidebarSeparator className="bg-gradient-to-r from-transparent via-border/50 to-transparent my-4 mx-3" />

        <SystemSection items={systemItems} collapsed={collapsed} />

        <SidebarFooter collapsed={collapsed} />
      </SidebarContent>
    </Sidebar>
  );
}
