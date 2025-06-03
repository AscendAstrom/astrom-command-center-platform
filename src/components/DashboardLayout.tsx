
import { useState, useEffect } from 'react';
import {
  Bell,
  Settings,
  CreditCard,
  Key,
  Lock,
  LogOut,
  Edit,
  User,
  Home,
  BarChart3,
  ClipboardCheck,
  Users,
  AlertTriangle,
  FileText,
  HelpCircle,
  Shield,
  Sun,
  Moon,
  ChevronRight,
  MoreVertical
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

import { notificationService } from '@/services/notifications/notificationService';
import type { Database } from '@/integrations/supabase/types';

type NotificationRow = Database['public']['Tables']['notifications']['Row'];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Tasks', href: '/tasks', icon: ClipboardCheck },
  { name: 'Users', href: '/users', icon: Users },
  { name: 'Alerts', href: '/alerts', icon: AlertTriangle },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'Support', href: '/support', icon: HelpCircle },
  { name: 'Security', href: '/security', icon: Shield },
];

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [notifications, setNotifications] = useState<NotificationRow[]>([]);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      const data = await notificationService.getNotifications(5);
      setNotifications(data);
      setNotificationCount(data.filter(n => !n.is_read).length);
    };

    fetchNotifications();

    // Subscribe to real-time notifications
    const channel = notificationService.subscribeToNotifications((newNotification) => {
      setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
      if (!newNotification.is_read) {
        setNotificationCount(prev => prev + 1);
      }
    });

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const handleMarkAsRead = async (id: string) => {
    const success = await notificationService.markAsRead(id);
    if (success) {
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === id 
            ? { ...notification, is_read: true, read_at: new Date().toISOString() }
            : notification
        )
      );
      setNotificationCount(prev => Math.max(0, prev - 1));
    }
  };

  const handleMarkAllAsRead = async () => {
    const success = await notificationService.markAllAsRead();
    if (success) {
      setNotifications(prev => 
        prev.map(notification => ({ ...notification, is_read: true, read_at: new Date().toISOString() }))
      );
      setNotificationCount(0);
    }
  };

  const handleDeleteNotification = async (id: string) => {
    const success = await notificationService.deleteNotification(id);
    if (success) {
      setNotifications(prev => prev.filter(notification => notification.id !== id));
      const deletedNotification = notifications.find(notification => notification.id === id);
      if (deletedNotification && !deletedNotification.is_read) {
        setNotificationCount(prev => Math.max(0, prev - 1));
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Left Sidebar */}
      <div className="w-64 flex-shrink-0 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="h-16 flex items-center justify-center border-b border-gray-200 dark:border-gray-700">
          <span className="text-lg font-semibold">AI Hospital</span>
        </div>
        <nav className="p-4">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <item.icon className="h-5 w-5 mr-2" />
              {item.name}
            </a>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="h-16 flex items-center justify-between bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold">Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            {/* Notifications Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full h-10 w-10">
                  <Bell className="h-5 w-5" />
                  {notificationCount > 0 && (
                    <Badge className="absolute top-1 right-1 rounded-full px-2 py-0.5 text-xs font-bold">{notificationCount}</Badge>
                  )}
                  <span className="sr-only">Notifications</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80 sm:w-96">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <ScrollArea className="max-h-80">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <DropdownMenuItem key={notification.id} className="flex items-start space-x-2">
                        <div className="flex-1">
                          <div className="font-semibold">{notification.title}</div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{notification.message}</p>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-xs text-gray-400 dark:text-gray-500">
                              {new Date(notification.created_at).toLocaleTimeString()}
                            </span>
                            {!notification.is_read && (
                              <Button variant="secondary" size="sm" onClick={() => handleMarkAsRead(notification.id)}>
                                Mark as Read
                              </Button>
                            )}
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteNotification(notification.id)}>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500 dark:text-gray-400">No notifications</div>
                  )}
                </ScrollArea>
                {notifications.length > 0 && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleMarkAllAsRead} className="justify-center">
                      Mark All as Read
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full h-10 w-10">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="Shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <span className="sr-only">User Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <User className="h-4 w-4 mr-2" />
                    <span>Profile</span>
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard className="h-4 w-4 mr-2" />
                    <span>Billing</span>
                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Key className="h-4 w-4 mr-2" />
                    <span>Security</span>
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  <span>Settings</span>
                  <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>Log out</span>
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
