
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
      .update(updates)
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
    // This would implement actual connection testing
    // For now, we'll simulate it
    const result = Math.random() > 0.2; // 80% success rate for demo
    
    await this.update(id, {
      last_health_check: new Date().toISOString(),
      health_score: result ? 100 : 0,
      status: result ? 'CONNECTED' : 'ERROR',
      last_error: result ? null : 'Connection test failed',
    });

    return { success: result };
  },

  async syncData(id: string) {
    const { data: dataSource } = await this.getById(id);
    if (!dataSource) return { error: 'Data source not found' };

    // Update sync status
    await this.update(id, {
      status: 'SYNCING',
      last_sync: new Date().toISOString(),
    });

    // Simulate sync process
    setTimeout(async () => {
      const success = Math.random() > 0.1; // 90% success rate
      await this.update(id, {
        status: success ? 'CONNECTED' : 'ERROR',
        last_error: success ? null : 'Sync failed',
        records_count: success ? (dataSource.records_count || 0) + Math.floor(Math.random() * 100) : dataSource.records_count,
      });
    }, 2000);

    return { success: true };
  }
};
