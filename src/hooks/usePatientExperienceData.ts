
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { subMonths, format, differenceInHours } from 'date-fns';

export interface PatientExperienceData {
  satisfactionTrend: { month: string; overall: number; communication: number; cleanliness: number; }[];
  metrics: {
    overallScore: number;
    responseRate: number;
    totalSurveys: number;
  };
  keyMetrics: { metric: string; score: number; target: number; }[];
  recentFeedback: { comment: string | null; score: number | null; time: string }[];
}

const getPatientExperienceData = async (): Promise<PatientExperienceData> => {
    const sixMonthsAgo = subMonths(new Date(), 6);

    // Fetch surveys from the last 6 months
    const { data: surveys, error: surveysError } = await supabase
        .from('patient_surveys')
        .select('survey_date, overall_satisfaction, communication_rating, cleanliness_rating, wait_time_rating, comments, created_at')
        .gte('survey_date', format(sixMonthsAgo, 'yyyy-MM-dd'));

    if (surveysError) throw new Error(surveysError.message);
    if (!surveys) throw new Error("Could not fetch patient surveys");


    // Fetch total patient visits in the last 6 months to calculate response rate
    const { count: totalVisits, error: visitsError } = await supabase
        .from('patient_visits')
        .select('*', { count: 'exact', head: true })
        .gte('admission_date', sixMonthsAgo.toISOString());
    
    if(visitsError) throw new Error(visitsError.message);

    const totalSurveys = surveys.length;
    const responseRate = totalVisits && totalVisits > 0 ? (totalSurveys / totalVisits) * 100 : 0;
    
    const calculateAverage = (items: (number | null)[]) => {
        const filtered = items.filter(i => i !== null) as number[];
        if (filtered.length === 0) return 0;
        return filtered.reduce((a, b) => a + b, 0) / filtered.length;
    };
    
    // Calculate overall average scores from last 6 months data
    const overallScore = calculateAverage(surveys.map(s => s.overall_satisfaction));
    const communicationScore = calculateAverage(surveys.map(s => s.communication_rating));
    const cleanlinessScore = calculateAverage(surveys.map(s => s.cleanliness_rating));
    const waitTimeScore = calculateAverage(surveys.map(s => s.wait_time_rating));
    
    const keyMetrics = [
        { metric: 'Overall Satisfaction', score: Number(overallScore.toFixed(1)), target: 4.5 },
        { metric: 'Communication', score: Number(communicationScore.toFixed(1)), target: 4.3 },
        { metric: 'Cleanliness', score: Number(cleanlinessScore.toFixed(1)), target: 4.5 },
        { metric: 'Wait Time', score: Number(waitTimeScore.toFixed(1)), target: 4.2 },
    ];
    
    // Calculate monthly trends
    const monthlyData: { [key: string]: { overall: number[]; communication: number[]; cleanliness: number[] } } = {};

    for (let i = 5; i >= 0; i--) {
        const monthKey = format(subMonths(new Date(), i), 'MMM');
        monthlyData[monthKey] = { overall: [], communication: [], cleanliness: [] };
    }

    surveys.forEach(survey => {
        const monthKey = format(new Date(survey.survey_date), 'MMM');
        if (monthlyData[monthKey]) {
            if(survey.overall_satisfaction) monthlyData[monthKey].overall.push(survey.overall_satisfaction);
            if(survey.communication_rating) monthlyData[monthKey].communication.push(survey.communication_rating);
            if(survey.cleanliness_rating) monthlyData[monthKey].cleanliness.push(survey.cleanliness_rating);
        }
    });

    const satisfactionTrend = Object.keys(monthlyData).map(month => ({
        month,
        overall: calculateAverage(monthlyData[month].overall),
        communication: calculateAverage(monthlyData[month].communication),
        cleanliness: calculateAverage(monthlyData[month].cleanliness)
    }));
    
    // Get recent feedback
    const recentFeedback = surveys
        .filter(s => s.comments)
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 3)
        .map(s => ({
            comment: s.comments,
            score: s.overall_satisfaction,
            time: `${differenceInHours(new Date(), new Date(s.created_at))} hours ago`
        }));


    return {
        satisfactionTrend,
        metrics: {
            overallScore: Number(overallScore.toFixed(1)),
            responseRate: Number(responseRate.toFixed(0)),
            totalSurveys
        },
        keyMetrics,
        recentFeedback
    };
};


export const usePatientExperienceData = () => {
  return useQuery({
    queryKey: ["patient_experience_data"],
    queryFn: getPatientExperienceData,
    refetchInterval: 60000,
  });
};
