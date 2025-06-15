
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { SLAConfiguration as SLAConfig } from '@/components/astro-metrics/types';
import { toast } from "sonner";

const fromSnakeCase = (data: any): SLAConfig => ({
  id: data.id,
  name: data.name,
  description: data.description,
  zoneId: data.zone_id,
  zoneName: data.zone_name,
  metricType: data.metric_type,
  threshold: data.threshold,
  unit: data.unit,
  timeWindow: data.time_window,
  alertEnabled: data.alert_enabled,
  escalationRules: data.escalation_rules,
  status: data.status,
  createdAt: data.created_at,
  updatedAt: data.updated_at,
});

const toSnakeCase = (data: Partial<SLAConfig>) => {
  const snakeCaseData: any = {};
  if (data.name !== undefined) snakeCaseData.name = data.name;
  if (data.description !== undefined) snakeCaseData.description = data.description;
  if (data.zoneId !== undefined) snakeCaseData.zone_id = data.zoneId;
  if (data.zoneName !== undefined) snakeCaseData.zone_name = data.zoneName;
  if (data.metricType !== undefined) snakeCaseData.metric_type = data.metricType;
  if (data.threshold !== undefined) snakeCaseData.threshold = data.threshold;
  if (data.unit !== undefined) snakeCaseData.unit = data.unit;
  if (data.timeWindow !== undefined) snakeCaseData.time_window = data.timeWindow;
  if (data.alertEnabled !== undefined) snakeCaseData.alert_enabled = data.alertEnabled;
  if (data.escalationRules !== undefined) snakeCaseData.escalation_rules = data.escalationRules;
  if (data.status !== undefined) snakeCaseData.status = data.status;
  return snakeCaseData;
};

const fetchSLAConfigs = async (): Promise<SLAConfig[]> => {
    const { data, error } = await supabase.from('sla_configurations').select('*').order('created_at');
    if (error) throw new Error(error.message);
    return data.map(fromSnakeCase);
};

const createSLAConfig = async (newSla: SLAConfig): Promise<SLAConfig> => {
    const { id, createdAt, updatedAt, ...rest } = newSla;
    const payload = toSnakeCase(rest);

    const { data, error } = await supabase.from('sla_configurations').insert(payload).select().single();

    if (error) throw new Error(error.message);
    return fromSnakeCase(data);
};

const updateSLAStatus = async ({ slaId, status }: { slaId: string, status: 'active' | 'paused' }): Promise<SLAConfig> => {
    const { data, error } = await supabase
        .from('sla_configurations')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', slaId)
        .select()
        .single();
    if (error) throw new Error(error.message);
    return fromSnakeCase(data);
};


export const useSLAConfigs = () => {
    const queryClient = useQueryClient();
    const { data: slaConfigs, isLoading, error } = useQuery<SLAConfig[]>({
        queryKey: ['slaConfigs'],
        queryFn: fetchSLAConfigs,
    });

    const createSlaMutation = useMutation({
        mutationFn: createSLAConfig,
        onSuccess: () => {
            toast.success("SLA created successfully!");
            queryClient.invalidateQueries({ queryKey: ['slaConfigs'] });
        },
        onError: (err: Error) => {
            toast.error(`Failed to create SLA: ${err.message}`);
        },
    });

    const updateSlaStatusMutation = useMutation({
        mutationFn: updateSLAStatus,
        onSuccess: () => {
            toast.success("SLA status updated successfully!");
            queryClient.invalidateQueries({ queryKey: ['slaConfigs'] });
        },
        onError: (err: Error) => {
            toast.error(`Failed to update SLA status: ${err.message}`);
        },
    });

    return {
        slaConfigs: slaConfigs ?? [],
        isLoading,
        error,
        createSlaMutation,
        updateSlaStatusMutation
    };
};
