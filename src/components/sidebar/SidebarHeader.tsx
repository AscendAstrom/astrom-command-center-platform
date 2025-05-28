
import { useSidebar } from "@/components/ui/sidebar";
import LogoIcon from "@/components/ui/LogoIcon";

export function SidebarHeader() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  if (collapsed) {
    return (
      <div className="flex-shrink-0 p-2 mb-2 flex justify-center">
        <div className="w-10 h-10 bg-gradient-to-br from-background/50 to-background/80 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg border border-border/50 hover:scale-105 transition-transform duration-300">
          <LogoIcon size="sm" animate={true} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-shrink-0 p-4 mb-2">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 bg-gradient-to-br from-background/50 to-background/80 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0 border border-border/50 hover:scale-105 transition-transform duration-300">
          <LogoIcon size="md" animate={true} />
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            ASTROM
          </h1>
          <p className="text-sm text-muted-foreground font-medium">
            Intelligence Platform
          </p>
        </div>
      </div>
    </div>
  );
}
