
import { supabase } from '@/integrations/supabase/client';
import { auditService } from './auditService';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

type SLA = Tables<'slas'>;
type SLAInsert = TablesInsert<'slas'>;
type SLAUpdate = TablesUpdate<'slas'>;

export const slaService = {
  async getAll() {
    const { data, error } = await supabase
      .from('slas')
      .select(`
        *,
        kpis(name, unit, category)
      `)
      .order('created_at', { ascending: false });

    return { data, error };
  },

  async getActive() {
    const { data, error } = await supabase
      .from('slas')
      .select('*')
      .eq('is_active', true)
      .order('name');

    return { data, error };
  },

  async create(sla: Omit<SLAInsert, 'id' | 'created_at' | 'updated_at'>) {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase
      .from('slas')
      .insert({
        ...sla,
        created_by: user?.id,
      })
      .select()
      .single();

    if (!error && data) {
      await auditService.log({
        action: 'CREATE',
        resource_type: 'sla',
        resource_id: data.id,
        details: { name: sla.name, target_value: sla.target_value },
      });
    }

    return { data, error };
  },

  async update(id: string, updates: SLAUpdate) {
    const { data, error } = await supabase
      .from('slas')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (!error && data) {
      await auditService.log({
        action: 'UPDATE',
        resource_type: 'sla',
        resource_id: id,
        details: updates,
      });
    }

    return { data, error };
  },

  async toggleActive(id: string) {
    const { data: currentSLA } = await supabase
      .from('slas')
      .select('is_active')
      .eq('id', id)
      .single();

    if (currentSLA) {
      return this.update(id, { is_active: !currentSLA.is_active });
    }

    return { data: null, error: { message: 'SLA not found' } };
  }
};
