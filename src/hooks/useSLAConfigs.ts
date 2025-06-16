
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { SLAConfiguration as SLAConfig } from '@/components/astro-metrics/types';
import { toast } from "sonner";
import { useState, useEffect } from 'react';

const fetchSLAConfigs = async (): Promise<SLAConfig[]> => {
    // Return empty SLA configs
    return [];
};

const createSLAConfig = async (newSla: SLAConfig): Promise<SLAConfig> => {
    throw new Error('No data sources configured');
};

const updateSLAStatus = async ({ slaId, status }: { slaId: string, status: string }): Promise<SLAConfig> => {
    throw new Error('No data sources configured');
};

export const useSLAConfigs = () => {
    const queryClient = useQueryClient();
    const { data: slaConfigsData, isLoading, error } = useQuery<SLAConfig[]>({
        queryKey: ['slaConfigs'],
        queryFn: fetchSLAConfigs,
    });

    const [slaConfigs, setSlaConfigs] = useState<SLAConfig[]>([]);

    useEffect(() => {
        // Always return empty configs
        setSlaConfigs([]);
    }, [slaConfigsData]);

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
        slaConfigs: [],
        isLoading: false,
        error: null,
        createSlaMutation,
        updateSlaStatusMutation
    };
};
