
import { supabase } from '@/integrations/supabase/client';

interface AuditLogEntry {
  action: string;
  resource_type: string;
  resource_id?: string;
  details?: Record<string, any>;
}

export const auditService = {
  async log(entry: AuditLogEntry) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from('audit_logs')
        .insert({
          user_id: user?.id,
          action: entry.action,
          resource_type: entry.resource_type,
          resource_id: entry.resource_id,
          details: entry.details || {},
        });

      if (error) {
        console.error('Audit log error:', error);
      }
    } catch (error) {
      console.error('Failed to create audit log:', error);
    }
  },

  async getRecentActivity(limit = 10) {
    const { data, error } = await supabase
      .from('audit_logs')
      .select(`
        *,
        profiles(first_name, last_name, email)
      `)
      .order('created_at', { ascending: false })
      .limit(limit);

    return { data, error };
  }
};
