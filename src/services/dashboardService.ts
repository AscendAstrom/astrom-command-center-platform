
import { supabase } from '@/integrations/supabase/client';
import { auditService } from './auditService';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

type Dashboard = Tables<'dashboards'>;
type DashboardInsert = TablesInsert<'dashboards'>;
type DashboardUpdate = TablesUpdate<'dashboards'>;

export const dashboardService = {
  async getAll() {
    const { data, error } = await supabase
      .from('dashboards')
      .select(`
        *,
        profiles!dashboards_created_by_fkey(first_name, last_name, email)
      `)
      .order('created_at', { ascending: false });

    return { data, error };
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('dashboards')
      .select(`
        *,
        widgets(*)
      `)
      .eq('id', id)
      .single();

    return { data, error };
  },

  async create(dashboard: Omit<DashboardInsert, 'id' | 'created_at' | 'updated_at'>) {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase
      .from('dashboards')
      .insert({
        ...dashboard,
        created_by: user?.id,
      })
      .select()
      .single();

    if (!error && data) {
      await auditService.log({
        action: 'CREATE',
        resource_type: 'dashboard',
        resource_id: data.id,
        details: { name: dashboard.name, type: dashboard.type },
      });
    }

    return { data, error };
  },

  async update(id: string, updates: DashboardUpdate) {
    const { data, error } = await supabase
      .from('dashboards')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (!error && data) {
      await auditService.log({
        action: 'UPDATE',
        resource_type: 'dashboard',
        resource_id: id,
        details: updates,
      });
    }

    return { data, error };
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('dashboards')
      .delete()
      .eq('id', id);

    if (!error) {
      await auditService.log({
        action: 'DELETE',
        resource_type: 'dashboard',
        resource_id: id,
      });
    }

    return { error };
  }
};
