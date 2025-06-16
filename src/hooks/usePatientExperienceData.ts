
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface PatientExperienceData {
  satisfactionTrend: Array<{
    month: string;
    overall: number;
    communication: number;
  }>;
  metrics: {
    overallScore: number;
    totalSurveys: number;
    responseRate: number;
  };
  keyMetrics: Array<{
    metric: string;
    score: number;
    target: number;
  }>;
  recentFeedback: Array<{
    comment: string;
    time?: string;
  }>;
}

const getPatientExperienceData = async (): Promise<PatientExperienceData> => {
  try {
    // Get all patient surveys
    const { data: surveys } = await supabase
      .from('patient_surveys')
      .select('*')
      .order('submitted_at', { ascending: false });

    if (!surveys || surveys.length === 0) {
      // Return default structure if no surveys exist yet
      return {
        satisfactionTrend: [
          { month: 'Jan', overall: 0, communication: 0 },
          { month: 'Feb', overall: 0, communication: 0 },
          { month: 'Mar', overall: 0, communication: 0 },
          { month: 'Apr', overall: 0, communication: 0 },
          { month: 'May', overall: 0, communication: 0 },
          { month: 'Jun', overall: 0, communication: 0 }
        ],
        metrics: {
          overallScore: 0,
          totalSurveys: 0,
          responseRate: 0
        },
        keyMetrics: [
          { metric: 'Care Quality', score: 0, target: 4.0 },
          { metric: 'Staff Responsiveness', score: 0, target: 4.0 },
          { metric: 'Facility Cleanliness', score: 0, target: 4.2 },
          { metric: 'Pain Management', score: 0, target: 4.0 }
        ],
        recentFeedback: []
      };
    }

    // Calculate overall metrics
    const totalSurveys = surveys.length;
    const overallScore = surveys.reduce((sum, s) => sum + (s.overall_rating || 0), 0) / totalSurveys;
    
    // Get total visits for response rate calculation
    const { data: visits } = await supabase
      .from('patient_visits')
      .select('id')
      .eq('status', 'DISCHARGED');
    
    const totalVisits = visits?.length || 1;
    const responseRate = (totalSurveys / totalVisits) * 100;

    // Generate satisfaction trend for last 6 months
    const satisfactionTrend = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      const monthSurveys = surveys.filter(s => {
        const surveyDate = new Date(s.submitted_at);
        return surveyDate >= monthStart && surveyDate <= monthEnd;
      });

      const overallAvg = monthSurveys.length > 0
        ? monthSurveys.reduce((sum, s) => sum + (s.overall_rating || 0), 0) / monthSurveys.length
        : 0;
      
      const communicationAvg = monthSurveys.length > 0
        ? monthSurveys.reduce((sum, s) => sum + (s.communication_rating || 0), 0) / monthSurveys.length
        : 0;

      satisfactionTrend.push({
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        overall: Number(overallAvg.toFixed(1)),
        communication: Number(communicationAvg.toFixed(1))
      });
    }

    // Calculate key metrics
    const careQualityScore = surveys.reduce((sum, s) => sum + (s.care_quality_rating || 0), 0) / totalSurveys;
    const communicationScore = surveys.reduce((sum, s) => sum + (s.communication_rating || 0), 0) / totalSurveys;
    const facilityScore = surveys.reduce((sum, s) => sum + (s.facility_rating || 0), 0) / totalSurveys;
    const painManagementScore = surveys.reduce((sum, s) => sum + (s.pain_management_rating || 0), 0) / totalSurveys;

    const keyMetrics = [
      { metric: 'Care Quality', score: Number(careQualityScore.toFixed(1)), target: 4.0 },
      { metric: 'Staff Responsiveness', score: Number(communicationScore.toFixed(1)), target: 4.0 },
      { metric: 'Facility Cleanliness', score: Number(facilityScore.toFixed(1)), target: 4.2 },
      { metric: 'Pain Management', score: Number(painManagementScore.toFixed(1)), target: 4.0 }
    ];

    // Get recent feedback comments
    const recentFeedback = surveys
      .filter(s => s.comments && s.comments.trim().length > 0)
      .slice(0, 10)
      .map(s => ({
        comment: s.comments!,
        time: new Date(s.submitted_at).toLocaleString()
      }));

    return {
      satisfactionTrend,
      metrics: {
        overallScore: Number(overallScore.toFixed(1)),
        totalSurveys,
        responseRate: Number(responseRate.toFixed(1))
      },
      keyMetrics,
      recentFeedback
    };
  } catch (error) {
    console.error('Error fetching patient experience data:', error);
    // Return empty structure on error
    return {
      satisfactionTrend: [],
      metrics: { overallScore: 0, totalSurveys: 0, responseRate: 0 },
      keyMetrics: [],
      recentFeedback: []
    };
  }
};

export const usePatientExperienceData = () => {
  return useQuery({
    queryKey: ["patient_experience_data"],
    queryFn: getPatientExperienceData,
    refetchInterval: 300000, // Refetch every 5 minutes
  });
};
