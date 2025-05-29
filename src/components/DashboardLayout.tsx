
import { ReactNode, useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/ThemeToggle";
import { UserMenu } from "@/components/UserMenu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bell, Search, AlertTriangle, CheckCircle, Clock, X, Settings } from "lucide-react";
import { toast } from "sonner";

interface DashboardLayoutProps {
  children: ReactNode;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'alert' | 'success' | 'info';
  timestamp: string;
  isRead: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'High Patient Volume Alert',
    message: 'Emergency department is at 95% capacity. Consider activating surge protocols.',
    type: 'alert',
    timestamp: '2 minutes ago',
    isRead: false
  },
  {
    id: '2',
    title: 'Data Sync Complete',
    message: 'Epic EHR data synchronization completed successfully. 1,247 records updated.',
    type: 'success',
    timestamp: '15 minutes ago',
    isRead: false
  },
  {
    id: '3',
    title: 'Scheduled Maintenance',
    message: 'System maintenance window scheduled for tonight at 2:00 AM EST.',
    type: 'info',
    timestamp: '1 hour ago',
    isRead: true
  },
  {
    id: '4',
    title: 'Bed Availability Updated',
    message: '3 new ICU beds became available in the North Wing.',
    type: 'success',
    timestamp: '2 hours ago',
    isRead: false
  }
];

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleNotificationsClick = () => {
    setShowNotifications(!showNotifications);
    toast.info("Notifications panel toggled");
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
    toast.success("Notification marked as read");
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
    toast.success("All notifications marked as read");
    setShowNotifications(false);
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    toast.success("Notification dismissed");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.info(`Searching for: ${searchQuery}`);
      // Implement search functionality here
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'alert': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'info': return <Clock className="h-4 w-4 text-blue-500" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <AppSidebar />
      <SidebarInset className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="flex h-16 shrink-0 items-center gap-2 px-4 border-b border-border relative">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4 flex-1 max-w-md">
              <form onSubmit={handleSearch} className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search patients, rooms, data..."
                  className="pl-10 bg-background/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button 
                  type="submit" 
                  size="sm" 
                  variant="ghost" 
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                  showToast={true}
                  toastMessage={`Searching for: ${searchQuery}`}
                >
                  <Search className="h-3 w-3" />
                </Button>
              </form>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative hover:bg-accent hover:text-accent-foreground transition-all duration-200"
                  onClick={handleNotificationsClick}
                  showToast={true}
                  toastMessage="Notifications panel toggled"
                >
                  <Bell className="h-4 w-4" />
                  {unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full animate-pulse flex items-center justify-center">
                      <span className="text-xs text-white font-medium">{unreadCount}</span>
                    </div>
                  )}
                </Button>
                
                {showNotifications && (
                  <div className="absolute right-0 top-12 w-96 bg-background border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-hidden">
                    <div className="p-4 border-b border-border">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground">Notifications</h3>
                          <p className="text-sm text-muted-foreground">{unreadCount} unread</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {unreadCount > 0 && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={markAllAsRead}
                              className="text-xs"
                              showToast={true}
                              toastMessage="All notifications marked as read"
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Mark all read
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowNotifications(false)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="divide-y divide-border overflow-y-auto max-h-80">
                      {notifications.map((notification) => (
                        <div 
                          key={notification.id} 
                          className={`p-4 hover:bg-muted/50 transition-colors ${!notification.isRead ? 'bg-muted/20' : ''}`}
                        >
                          <div className="flex items-start gap-3">
                            {getNotificationIcon(notification.type)}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-medium text-foreground truncate">
                                  {notification.title}
                                </h4>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 opacity-60 hover:opacity-100"
                                  onClick={() => dismissNotification(notification.id)}
                                  showToast={true}
                                  toastMessage="Notification dismissed"
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                {notification.message}
                              </p>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs text-muted-foreground">
                                  {notification.timestamp}
                                </span>
                                {!notification.isRead && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 text-xs hover:bg-blue-500/10"
                                    onClick={() => markAsRead(notification.id)}
                                    showToast={true}
                                    toastMessage="Notification marked as read"
                                  >
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Mark as read
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <ThemeToggle />
              <UserMenu />
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto">
          <div className="h-full">
            {children}
          </div>
        </main>
      </SidebarInset>
    </div>
  );
};

export default DashboardLayout;
