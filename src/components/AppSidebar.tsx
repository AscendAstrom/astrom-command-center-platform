
import {
  Sidebar,
  SidebarContent,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { NavigationSection } from "./sidebar/NavigationSection";
import { SystemSection } from "./sidebar/SystemSection";
import { SidebarHeader } from "./sidebar/SidebarHeader";
import { SidebarFooter } from "./sidebar/SidebarFooter";
import { navigationItems, systemItems } from "./sidebar/navigationData";

export function AppSidebar() {
  return (
    <Sidebar 
      className="bg-background/95 backdrop-blur-xl border-r border-border/50 transition-all duration-300 min-h-screen w-80 group-data-[collapsible=icon]:w-20"
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
