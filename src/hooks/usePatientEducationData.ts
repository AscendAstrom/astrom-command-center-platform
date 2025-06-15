
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface PatientEducationData {
    materialsDelivered: number;
    engagementRate: number;
    topTopics: { topic: string; count: number }[];
}

const getPatientEducationData = async (): Promise<PatientEducationData> => {
    const { data: logData, error: logError, count } = await supabase
        .from('patient_education_log')
        .select(`
            id,
            completion_status,
            education_materials ( topic )
        `, { count: 'exact' });

    if (logError) throw logError;

    const materialsDelivered = count || 0;
    const completedOrViewed = logData?.filter(l => l.completion_status === 'Completed' || l.completion_status === 'Viewed').length || 0;
    const engagementRate = materialsDelivered > 0 ? (completedOrViewed / materialsDelivered) * 100 : 0;

    const topicCounts: { [key: string]: number } = {};
    logData?.forEach((log: any) => {
        const topic = log.education_materials.topic;
        topicCounts[topic] = (topicCounts[topic] || 0) + 1;
    });

    const topTopics = Object.entries(topicCounts)
        .map(([topic, count]) => ({ topic, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 3);

    return {
        materialsDelivered,
        engagementRate: parseFloat(engagementRate.toFixed(1)),
        topTopics,
    };
}

export const usePatientEducationData = () => {
    return useQuery({
        queryKey: ['patient-education-data'],
        queryFn: getPatientEducationData,
        refetchInterval: 30000
    });
};
