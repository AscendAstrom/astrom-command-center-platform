
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/ThemeToggle";
import { UserMenu } from "@/components/UserMenu";
import SearchBar from "./SearchBar";
import NotificationsPanel from "./NotificationsPanel";

const DashboardHeader = () => {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 px-4 border-b border-border relative">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4 flex-1 max-w-md">
          <SearchBar />
        </div>
        <div className="flex items-center gap-4">
          <NotificationsPanel />
          <ThemeToggle />
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
