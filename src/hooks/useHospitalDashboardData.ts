
import { useState, useEffect } from 'react';
import { mockHospitalDataService, MockHospitalMetrics } from '@/services/mockHospitalData';

export const useHospitalDashboardData = () => {
  const [hospitalData, setHospitalData] = useState<MockHospitalMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    const fetchData = () => {
      setIsLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        const data = mockHospitalDataService.generateMockHospitalData();
        setHospitalData(data);
        setLastUpdated(new Date());
        setIsLoading(false);
      }, 500);
    };

    // Initial fetch
    fetchData();

    // Set up interval for live updates (every 30 seconds)
    const interval = setInterval(fetchData, 30000);

    return () => clearInterval(interval);
  }, []);

  const refreshData = () => {
    const data = mockHospitalDataService.generateMockHospitalData();
    setHospitalData(data);
    setLastUpdated(new Date());
  };

  return {
    hospitalData,
    isLoading,
    lastUpdated,
    refreshData
  };
};
