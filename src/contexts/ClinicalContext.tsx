
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ClinicalAlert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  message: string;
  patientId?: string;
  timestamp: string;
  acknowledged: boolean;
}

interface PatientSummary {
  id: string;
  name: string;
  status: 'stable' | 'critical' | 'warning';
  admittedAt: string;
  department: string;
}

interface ClinicalMetrics {
  activePatientsCount: number;
  criticalAlertsCount: number;
  avgLengthOfStay: number;
  occupancyRate: number;
  qualityScore: number;
}

interface ClinicalContextType {
  alerts: ClinicalAlert[];
  patients: PatientSummary[];
  metrics: ClinicalMetrics;
  activePatient: PatientSummary | null;
  setActivePatient: (patient: PatientSummary | null) => void;
  acknowledgeAlert: (alertId: string) => void;
  refreshData: () => void;
  isLoading: boolean;
}

const ClinicalContext = createContext<ClinicalContextType | undefined>(undefined);

export const useClinical = () => {
  const context = useContext(ClinicalContext);
  if (!context) {
    throw new Error('useClinical must be used within a ClinicalProvider');
  }
  return context;
};

interface ClinicalProviderProps {
  children: ReactNode;
}

export const ClinicalProvider = ({ children }: ClinicalProviderProps) => {
  const [alerts, setAlerts] = useState<ClinicalAlert[]>([]);
  const [patients, setPatients] = useState<PatientSummary[]>([]);
  const [metrics, setMetrics] = useState<ClinicalMetrics>({
    activePatientsCount: 0,
    criticalAlertsCount: 0,
    avgLengthOfStay: 0,
    occupancyRate: 0,
    qualityScore: 0
  });
  const [activePatient, setActivePatient] = useState<PatientSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadClinicalData = async () => {
    try {
      setIsLoading(true);
      
      // Load alerts
      const mockAlerts: ClinicalAlert[] = [
        {
          id: '1',
          type: 'critical',
          message: 'Patient vitals critical in ICU Room 301',
          patientId: 'pat-001',
          timestamp: new Date().toISOString(),
          acknowledged: false
        },
        {
          id: '2',
          type: 'warning',
          message: 'Medication due for Patient in Room 205',
          patientId: 'pat-002',
          timestamp: new Date(Date.now() - 300000).toISOString(),
          acknowledged: false
        }
      ];

      // Load patient summaries
      const mockPatients: PatientSummary[] = [
        {
          id: 'pat-001',
          name: 'John Doe',
          status: 'critical',
          admittedAt: new Date(Date.now() - 86400000).toISOString(),
          department: 'ICU'
        },
        {
          id: 'pat-002',
          name: 'Jane Smith',
          status: 'stable',
          admittedAt: new Date(Date.now() - 172800000).toISOString(),
          department: 'General Medicine'
        }
      ];

      // Load metrics
      const mockMetrics: ClinicalMetrics = {
        activePatientsCount: 156,
        criticalAlertsCount: mockAlerts.filter(a => a.type === 'critical' && !a.acknowledged).length,
        avgLengthOfStay: 4.2,
        occupancyRate: 87,
        qualityScore: 94
      };

      setAlerts(mockAlerts);
      setPatients(mockPatients);
      setMetrics(mockMetrics);
    } catch (error) {
      console.error('Failed to load clinical data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const acknowledgeAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
    setMetrics(prev => ({
      ...prev,
      criticalAlertsCount: prev.criticalAlertsCount - 1
    }));
  };

  const refreshData = () => {
    loadClinicalData();
  };

  useEffect(() => {
    loadClinicalData();
    
    // Set up real-time updates
    const interval = setInterval(loadClinicalData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ClinicalContext.Provider value={{
      alerts,
      patients,
      metrics,
      activePatient,
      setActivePatient,
      acknowledgeAlert,
      refreshData,
      isLoading
    }}>
      {children}
    </ClinicalContext.Provider>
  );
};
