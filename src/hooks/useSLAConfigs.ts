import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { SLAConfiguration as SLAConfig } from '@/components/astro-metrics/types';
import { toast } from "sonner";
import { useState, useEffect } from 'react';

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

const updateSLAStatus = async ({ slaId, status }: { slaId: string, status: string }): Promise<SLAConfig> => {
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
    const { data: slaConfigsData, isLoading, error } = useQuery<SLAConfig[]>({
        queryKey: ['slaConfigs'],
        queryFn: fetchSLAConfigs,
    });

    const [slaConfigs, setSlaConfigs] = useState<SLAConfig[]>([]);

    useEffect(() => {
        if (slaConfigsData) {
            const initialConfigs = slaConfigsData.map(c => {
                const baseValue = c.threshold * 0.8; // Start below threshold
                const initialFluctuation = (Math.random() - 0.5) * (c.threshold * 0.2);
                return {
                    ...c, 
                    currentValue: Math.max(0, parseFloat((baseValue + initialFluctuation).toFixed(2)))
                };
            });
            setSlaConfigs(initialConfigs);
        }
    }, [slaConfigsData]);


    useEffect(() => {
        if (slaConfigs.length === 0) return;

        const interval = setInterval(() => {
            setSlaConfigs(prevConfigs => 
                prevConfigs.map(config => {
                    if (config.status !== 'active') return config;
                    
                    const fluctuation = (Math.random() - 0.49) * (config.threshold * 0.1); // Tend to increase slightly
                    const newValue = (config.currentValue ?? config.threshold * 0.8) + fluctuation;
                    
                    return { ...config, currentValue: Math.max(0, parseFloat(newValue.toFixed(2))) };
                })
            );
        }, 2000); // Update every 2 seconds

        return () => clearInterval(interval);
    }, [slaConfigs.length]);

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
        slaConfigs: slaConfigs,
        isLoading: isLoading && slaConfigs.length === 0,
        error,
        createSlaMutation,
        updateSlaStatusMutation
    };
};
