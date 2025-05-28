
import { supabase } from '@/integrations/supabase/client';
import { auditService } from './auditService';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

type DataSource = Tables<'data_sources'>;
type DataSourceInsert = TablesInsert<'data_sources'>;
type DataSourceUpdate = TablesUpdate<'data_sources'>;

export const dataSourceService = {
  async getAll() {
    const { data, error } = await supabase
      .from('data_sources')
      .select('*')
      .order('created_at', { ascending: false });

    return { data, error };
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('data_sources')
      .select('*')
      .eq('id', id)
      .single();

    return { data, error };
  },

  async create(dataSource: Omit<DataSourceInsert, 'id' | 'created_at' | 'updated_at'>) {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase
      .from('data_sources')
      .insert({
        ...dataSource,
        created_by: user?.id,
        status: 'PAUSED',
        health_score: 100,
        records_count: 0
      })
      .select()
      .single();

    if (!error && data) {
      await auditService.log({
        action: 'CREATE',
        resource_type: 'data_source',
        resource_id: data.id,
        details: { name: dataSource.name, type: dataSource.type },
      });
    }

    return { data, error };
  },

  async update(id: string, updates: DataSourceUpdate) {
    const { data, error } = await supabase
      .from('data_sources')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (!error && data) {
      await auditService.log({
        action: 'UPDATE',
        resource_type: 'data_source',
        resource_id: id,
        details: updates,
      });
    }

    return { data, error };
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('data_sources')
      .delete()
      .eq('id', id);

    if (!error) {
      await auditService.log({
        action: 'DELETE',
        resource_type: 'data_source',
        resource_id: id,
      });
    }

    return { error };
  },

  async testConnection(id: string) {
    // Simulate connection test
    const testResult = Math.random() > 0.2; // 80% success rate
    
    const updates = {
      last_health_check: new Date().toISOString(),
      health_score: testResult ? Math.floor(Math.random() * 20) + 80 : Math.floor(Math.random() * 30) + 20,
      status: testResult ? 'CONNECTED' : 'ERROR' as any,
      last_error: testResult ? null : 'Connection timeout - please check credentials'
    };

    return this.update(id, updates);
  },

  // Real-time subscription for data sources
  subscribeToChanges(callback: (payload: any) => void) {
    return supabase
      .channel('data_sources')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'data_sources' }, 
        callback
      )
      .subscribe();
  }
};
