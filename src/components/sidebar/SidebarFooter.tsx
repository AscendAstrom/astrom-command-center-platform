
import { Activity } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

export function SidebarFooter() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  if (collapsed) {
    return (
      <div className="flex-shrink-0 mt-4 mx-3 mb-4 flex justify-center">
        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-sm">
          <Activity className="h-6 w-6 text-white animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-shrink-0 mt-4 mx-3 mb-4 p-4 bg-green-50 dark:bg-green-950/30 rounded-2xl border border-green-200/50 dark:border-green-800/30">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
          <Activity className="h-6 w-6 text-white animate-pulse" />
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-sm font-semibold text-green-700 dark:text-green-300">AI Powered</span>
          <span className="text-xs text-green-600/80 dark:text-green-400/80 font-medium">Data Analytics</span>
        </div>
      </div>
    </div>
  );
}
