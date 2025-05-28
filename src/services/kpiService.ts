
import { supabase } from '@/integrations/supabase/client';
import { auditService } from './auditService';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

type KPI = Tables<'kpis'>;
type KPIInsert = TablesInsert<'kpis'>;
type KPIUpdate = TablesUpdate<'kpis'>;

export const kpiService = {
  async getAll() {
    const { data, error } = await supabase
      .from('kpis')
      .select('*')
      .order('created_at', { ascending: false });

    return { data, error };
  },

  async getByCategory(category: string) {
    const { data, error } = await supabase
      .from('kpis')
      .select('*')
      .eq('category', category)
      .order('name');

    return { data, error };
  },

  async create(kpi: Omit<KPIInsert, 'id' | 'created_at' | 'updated_at'>) {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase
      .from('kpis')
      .insert({
        name: kpi.name,
        description: kpi.description,
        category: kpi.category,
        unit: kpi.unit,
        formula: kpi.formula,
        target_value: kpi.target_value,
        warning_threshold: kpi.warning_threshold,
        critical_threshold: kpi.critical_threshold,
        data_source_id: kpi.data_source_id,
        created_by: user?.id,
      })
      .select()
      .single();

    if (!error && data) {
      await auditService.log({
        action: 'CREATE',
        resource_type: 'kpi',
        resource_id: data.id,
        details: { name: kpi.name, category: kpi.category },
      });
    }

    return { data, error };
  },

  async update(id: string, updates: KPIUpdate) {
    const { data, error } = await supabase
      .from('kpis')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (!error && data) {
      await auditService.log({
        action: 'UPDATE',
        resource_type: 'kpi',
        resource_id: id,
        details: updates,
      });
    }

    return { data, error };
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('kpis')
      .delete()
      .eq('id', id);

    if (!error) {
      await auditService.log({
        action: 'DELETE',
        resource_type: 'kpi',
        resource_id: id,
      });
    }

    return { error };
  }
};
