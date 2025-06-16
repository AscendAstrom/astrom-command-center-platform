
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { SLAConfiguration as SLAConfig } from '@/components/astro-metrics/types';
import { toast } from "sonner";
import { useState, useEffect } from 'react';

const fetchSLAConfigs = async (): Promise<SLAConfig[]> => {
    // Return mock SLA configurations
    return [
        {
            id: 'sla-1',
            name: 'Emergency Department Response Time',
            description: 'Maximum time from triage to provider assessment',
            metricType: 'response_time',
            threshold: 30,
            unit: 'minutes',
            timeWindow: '1h',
            status: 'active',
            alertEnabled: true,
            escalationRules: [
                { level: 1, delay: 15, action: 'email_supervisor' },
                { level: 2, delay: 30, action: 'page_manager' }
            ],
            zoneName: 'Emergency Department',
            createdAt: new Date('2024-01-15'),
            updatedAt: new Date('2024-06-01'),
            lastBreach: new Date(Date.now() - 7200000), // 2 hours ago
            breachCount: 3,
            complianceRate: 87.5
        },
        {
            id: 'sla-2',
            name: 'ICU Bed Availability',
            description: 'Minimum available ICU beds at any time',
            metricType: 'bed_availability',
            threshold: 5,
            unit: 'beds',
            timeWindow: '24h',
            status: 'active',
            alertEnabled: true,
            escalationRules: [
                { level: 1, delay: 5, action: 'immediate_alert' },
                { level: 2, delay: 15, action: 'executive_notification' }
            ],
            zoneName: 'Intensive Care Unit',
            createdAt: new Date('2024-01-20'),
            updatedAt: new Date('2024-05-28'),
            lastBreach: new Date(Date.now() - 21600000), // 6 hours ago
            breachCount: 1,
            complianceRate: 95.2
        },
        {
            id: 'sla-3',
            name: 'Lab Result Turnaround',
            description: 'Maximum time for routine lab results',
            metricType: 'turnaround_time',
            threshold: 45,
            unit: 'minutes',
            timeWindow: '4h',
            status: 'active',
            alertEnabled: true,
            escalationRules: [
                { level: 1, delay: 10, action: 'lab_supervisor_alert' },
                { level: 2, delay: 25, action: 'department_head_notification' }
            ],
            zoneName: 'Laboratory',
            createdAt: new Date('2024-02-01'),
            updatedAt: new Date('2024-06-10'),
            lastBreach: null,
            breachCount: 0,
            complianceRate: 98.7
        },
        {
            id: 'sla-4',
            name: 'Surgery Scheduling',
            description: 'Maximum delay for non-emergency surgical procedures',
            metricType: 'scheduling_delay',
            threshold: 72,
            unit: 'hours',
            timeWindow: '7d',
            status: 'warning',
            alertEnabled: true,
            escalationRules: [
                { level: 1, delay: 30, action: 'scheduling_coordinator' },
                { level: 2, delay: 60, action: 'surgery_director' }
            ],
            zoneName: 'Operating Rooms',
            createdAt: new Date('2024-02-15'),
            updatedAt: new Date('2024-06-15'),
            lastBreach: new Date(Date.now() - 43200000), // 12 hours ago
            breachCount: 2,
            complianceRate: 92.1
        },
        {
            id: 'sla-5',
            name: 'Pharmacy Order Processing',
            description: 'Maximum time for medication order verification',
            metricType: 'order_processing',
            threshold: 20,
            unit: 'minutes',
            timeWindow: '2h',
            status: 'active',
            alertEnabled: false,
            escalationRules: [
                { level: 1, delay: 15, action: 'pharmacist_alert' }
            ],
            zoneName: 'Pharmacy',
            createdAt: new Date('2024-03-01'),
            updatedAt: new Date('2024-06-12'),
            lastBreach: new Date(Date.now() - 172800000), // 2 days ago
            breachCount: 5,
            complianceRate: 89.8
        }
    ];
};

const createSLAConfig = async (newSla: SLAConfig): Promise<SLAConfig> => {
    // Simulate creating SLA
    console.log('Creating SLA configuration:', newSla);
    return {
        ...newSla,
        id: `sla-${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date(),
        breachCount: 0,
        complianceRate: 100,
        lastBreach: null
    };
};

const updateSLAStatus = async ({ slaId, status }: { slaId: string, status: string }): Promise<SLAConfig> => {
    // Simulate updating SLA status
    console.log('Updating SLA status:', slaId, status);
    
    // This would normally update the database and return the updated SLA
    const mockUpdatedSla: SLAConfig = {
        id: slaId,
        name: 'Updated SLA',
        description: 'Updated description',
        metricType: 'response_time',
        threshold: 30,
        unit: 'minutes',
        timeWindow: '1h',
        status: status as 'active' | 'inactive' | 'warning',
        alertEnabled: true,
        escalationRules: [],
        zoneName: 'Updated Zone',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date(),
        breachCount: 0,
        complianceRate: 100,
        lastBreach: null
    };
    
    return mockUpdatedSla;
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
            setSlaConfigs(slaConfigsData);
        }
    }, [slaConfigsData]);

    const createSlaMutation = useMutation({
        mutationFn: createSLAConfig,
        onSuccess: (newSla) => {
            toast.success("SLA created successfully!");
            setSlaConfigs(prev => [...prev, newSla]);
            queryClient.invalidateQueries({ queryKey: ['slaConfigs'] });
        },
        onError: (err: Error) => {
            toast.error(`Failed to create SLA: ${err.message}`);
        },
    });

    const updateSlaStatusMutation = useMutation({
        mutationFn: updateSLAStatus,
        onSuccess: (updatedSla) => {
            toast.success("SLA status updated successfully!");
            setSlaConfigs(prev => prev.map(sla => 
                sla.id === updatedSla.id ? updatedSla : sla
            ));
            queryClient.invalidateQueries({ queryKey: ['slaConfigs'] });
        },
        onError: (err: Error) => {
            toast.error(`Failed to update SLA status: ${err.message}`);
        },
    });

    return {
        slaConfigs,
        isLoading,
        error,
        createSlaMutation,
        updateSlaStatusMutation
    };
};
