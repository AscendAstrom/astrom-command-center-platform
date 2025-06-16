
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

export const usePatientExperienceData = () => {
  // Return mock data since patient_surveys table doesn't exist
  const mockData: PatientExperienceData = {
    satisfactionTrend: [
      { month: 'Jan', overall: 4.2, communication: 4.0 },
      { month: 'Feb', overall: 4.3, communication: 4.1 },
      { month: 'Mar', overall: 4.1, communication: 3.9 },
      { month: 'Apr', overall: 4.4, communication: 4.2 },
      { month: 'May', overall: 4.3, communication: 4.1 },
      { month: 'Jun', overall: 4.5, communication: 4.3 }
    ],
    metrics: {
      overallScore: 4.3,
      totalSurveys: 256,
      responseRate: 78
    },
    keyMetrics: [
      { metric: 'Care Quality', score: 4.4, target: 4.0 },
      { metric: 'Staff Responsiveness', score: 4.2, target: 4.0 },
      { metric: 'Facility Cleanliness', score: 4.5, target: 4.2 },
      { metric: 'Pain Management', score: 4.1, target: 4.0 }
    ],
    recentFeedback: [
      { comment: 'Excellent care and very professional staff', time: '2 hours ago' },
      { comment: 'Wait time was longer than expected', time: '4 hours ago' }
    ]
  };

  return {
    data: mockData,
    isLoading: false
  };
};
