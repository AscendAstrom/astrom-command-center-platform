
import { ReactNode, useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/ThemeToggle";
import { UserMenu } from "@/components/UserMenu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bell, Search, AlertTriangle, CheckCircle, Clock, X } from "lucide-react";
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

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleNotificationsClick = () => {
    setShowNotifications(!showNotifications);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
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
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="pl-10 bg-background/50"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative hover:bg-accent hover:text-accent-foreground"
                  onClick={handleNotificationsClick}
                >
                  <Bell className="h-4 w-4" />
                  {unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full animate-pulse flex items-center justify-center">
                      <span className="text-xs text-white font-medium">{unreadCount}</span>
                    </div>
                  )}
                </Button>
                
                {showNotifications && (
                  <div className="absolute right-0 top-12 w-96 bg-background border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                    <div className="p-4 border-b border-border">
                      <h3 className="font-semibold text-foreground">Notifications</h3>
                      <p className="text-sm text-muted-foreground">{unreadCount} unread</p>
                    </div>
                    <div className="divide-y divide-border">
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
                                    className="h-6 text-xs"
                                    onClick={() => markAsRead(notification.id)}
                                  >
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
