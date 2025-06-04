
import { supabase } from '@/integrations/supabase/client';

export interface Notification {
  id: string;
  recipient_id: string;
  title: string;
  message: string;
  type: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' | 'URGENT';
  is_read: boolean;
  read_at: string | null;
  related_entity_type: string | null;
  related_entity_id: string | null;
  created_at: string;
}

class NotificationService {
  async getNotifications(limit: number = 20): Promise<Notification[]> {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Error fetching notifications:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in getNotifications:', error);
      return [];
    }
  }

  async markAsRead(notificationId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ 
          is_read: true, 
          read_at: new Date().toISOString() 
        })
        .eq('id', notificationId);

      if (error) {
        console.error('Error marking notification as read:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in markAsRead:', error);
      return false;
    }
  }

  async markAllAsRead(): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ 
          is_read: true, 
          read_at: new Date().toISOString() 
        })
        .eq('is_read', false);

      if (error) {
        console.error('Error marking all notifications as read:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in markAllAsRead:', error);
      return false;
    }
  }

  async createNotification(notification: {
    recipient_id: string;
    title: string;
    message: string;
    type: string;
    priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' | 'URGENT';
    related_entity_type?: string;
    related_entity_id?: string;
  }): Promise<Notification | null> {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .insert({
          recipient_id: notification.recipient_id,
          title: notification.title,
          message: notification.message,
          type: notification.type,
          priority: notification.priority || 'MEDIUM',
          related_entity_type: notification.related_entity_type,
          related_entity_id: notification.related_entity_id,
          is_read: false
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating notification:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in createNotification:', error);
      return null;
    }
  }

  async deleteNotification(notificationId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', notificationId);

      if (error) {
        console.error('Error deleting notification:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in deleteNotification:', error);
      return false;
    }
  }

  subscribeToNotifications(callback: (notification: Notification) => void) {
    return supabase
      .channel('notifications-channel')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications'
      }, (payload) => {
        callback(payload.new as Notification);
      })
      .subscribe();
  }
}

export const notificationService = new NotificationService();
