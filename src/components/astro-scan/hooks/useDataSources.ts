
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { DataSource, SyncStatus } from "../types";

export const useDataSources = () => {
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDataSources();
  }, []);

  const fetchDataSources = async () => {
    try {
      const { data, error } = await supabase
        .from('data_sources')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDataSources(data || []);
    } catch (error) {
      console.error('Error fetching data sources:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateDataSourceStatus = async (id: string, status: SyncStatus) => {
    try {
      const { error } = await supabase
        .from('data_sources')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      
      toast.success(`Data source ${status.toLowerCase()}`);
      fetchDataSources();
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update data source status');
    }
  };

  const deleteDataSource = async (id: string) => {
    if (!confirm('Are you sure you want to delete this data source?')) return;

    try {
      const { error } = await supabase
        .from('data_sources')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Data source deleted');
      fetchDataSources();
    } catch (error) {
      console.error('Error deleting data source:', error);
      toast.error('Failed to delete data source');
    }
  };

  return {
    dataSources,
    loading,
    updateDataSourceStatus,
    deleteDataSource,
    refetch: fetchDataSources
  };
};
