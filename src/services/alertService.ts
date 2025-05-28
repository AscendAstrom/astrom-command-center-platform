
import { supabase } from '@/integrations/supabase/client';
import { auditService } from './auditService';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

type Alert = Tables<'alerts'>;
type AlertInsert = TablesInsert<'alerts'>;
type AlertUpdate = TablesUpdate<'alerts'>;

export const alertService = {
  async getAll(limit = 50) {
    const { data, error } = await supabase
      .from('alerts')
      .select(`
        *,
        profiles!alerts_assigned_to_fkey(first_name, last_name, email)
      `)
      .order('created_at', { ascending: false })
      .limit(limit);

    return { data, error };
  },

  async getActive() {
    const { data, error } = await supabase
      .from('alerts')
      .select('*')
      .eq('status', 'ACTIVE')
      .order('severity', { ascending: false })
      .order('created_at', { ascending: false });

    return { data, error };
  },

  async create(alert: Omit<AlertInsert, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('alerts')
      .insert(alert)
      .select()
      .single();

    if (!error && data) {
      await auditService.log({
        action: 'CREATE',
        resource_type: 'alert',
        resource_id: data.id,
        details: { title: alert.title, severity: alert.severity },
      });
    }

    return { data, error };
  },

  async acknowledge(id: string) {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase
      .from('alerts')
      .update({
        status: 'ACKNOWLEDGED',
        assigned_to: user?.id,
        acknowledged_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (!error && data) {
      await auditService.log({
        action: 'ACKNOWLEDGE',
        resource_type: 'alert',
        resource_id: id,
      });
    }

    return { data, error };
  },

  async resolve(id: string) {
    const { data, error } = await supabase
      .from('alerts')
      .update({
        status: 'RESOLVED',
        resolved_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (!error && data) {
      await auditService.log({
        action: 'RESOLVE',
        resource_type: 'alert',
        resource_id: id,
      });
    }

    return { data, error };
  },

  // Real-time subscription for alerts
  subscribeToAlerts(callback: (payload: any) => void) {
    return supabase
      .channel('alerts')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'alerts' }, 
        callback
      )
      .subscribe();
  }
};
