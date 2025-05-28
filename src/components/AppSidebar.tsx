
import { useSidebar } from "@/components/ui/sidebar";
import {
  Sidebar,
  SidebarContent,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { SidebarHeader } from "./sidebar/SidebarHeader";
import { SidebarFooter } from "./sidebar/SidebarFooter";
import { NavigationSection } from "./sidebar/NavigationSection";
import { SystemSection } from "./sidebar/SystemSection";
import { navigationItems, systemItems } from "./sidebar/navigationData";

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar 
      className={`bg-background/95 backdrop-blur-xl border-r border-border/50 transition-all duration-300 min-h-screen ${
        collapsed ? 'w-14' : 'w-64'
      }`}
      collapsible="icon"
    >
      <SidebarContent className="flex flex-col h-full overflow-y-auto">
        <SidebarHeader />

        <NavigationSection items={navigationItems} />

        <SidebarSeparator className="bg-gradient-to-r from-transparent via-border/50 to-transparent my-4 mx-3" />

        <SystemSection items={systemItems} />

        <SidebarFooter />
      </SidebarContent>
    </Sidebar>
  );
}
