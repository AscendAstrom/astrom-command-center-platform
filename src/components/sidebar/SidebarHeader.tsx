
import { LayoutDashboard } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

export function SidebarHeader() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  if (collapsed) {
    return (
      <div className="flex-shrink-0 p-4 mb-2 flex justify-center">
        <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
          <LayoutDashboard className="h-8 w-8 text-white" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-shrink-0 p-4 mb-2">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center animate-pulse-glow shadow-lg flex-shrink-0">
          <LayoutDashboard className="h-6 w-6 text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            ASTROM
          </h1>
          <p className="text-sm text-muted-foreground font-medium mt-1">
            Intelligence Platform
          </p>
        </div>
      </div>
    </div>
  );
}
