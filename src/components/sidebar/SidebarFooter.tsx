
import { useSidebar } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import UserProfile from "@/components/UserProfile";

export function SidebarFooter() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  if (collapsed) {
    return (
      <div className="flex flex-col items-center gap-2 p-2">
        <UserProfile />
        <ThemeToggle />
      </div>
    );
  }

  return (
    <div className="p-4 border-t border-border/50">
      <div className="flex items-center justify-between">
        <UserProfile />
        <ThemeToggle />
      </div>
    </div>
  );
}
