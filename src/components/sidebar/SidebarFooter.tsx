
import { Sparkles } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

export function SidebarFooter() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  if (collapsed) {
    return (
      <div className="flex-shrink-0 mt-4 mx-1 mb-4 flex justify-center">
        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-sm">
          <Sparkles className="h-5 w-5 text-white animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-shrink-0 mt-4 mx-3 mb-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-2xl border border-green-200/50 dark:border-green-800/30">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
          <Sparkles className="h-6 w-6 text-white animate-pulse" />
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-sm font-semibold text-green-700 dark:text-green-300">AI Powered</span>
          <span className="text-xs text-green-600/80 dark:text-green-400/80 font-medium">Data Analytics</span>
        </div>
      </div>
    </div>
  );
}
