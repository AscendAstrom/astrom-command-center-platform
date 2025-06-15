
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { 
  Allergy, 
  CarePlan, 
  Condition, 
  Device, 
  Encounter, 
  Patient,
  ClinicalDataType 
} from '@/types/clinical';
import { toast } from 'sonner';

// Fetch functions
const fetchAllergies = async (): Promise<Allergy[]> => {
  const { data, error } = await supabase
    .from('allergies')
    .select(`
      *,
      patient:patients(*),
      encounter:encounters(*)
    `)
    .order('start_date', { ascending: false });
  
  if (error) throw new Error(error.message);
  return data || [];
};

const fetchCarePlans = async (): Promise<CarePlan[]> => {
  const { data, error } = await supabase
    .from('careplans')
    .select(`
      *,
      patient:patients(*),
      encounter:encounters(*)
    `)
    .order('start_date', { ascending: false });
  
  if (error) throw new Error(error.message);
  return data || [];
};

const fetchConditions = async (): Promise<Condition[]> => {
  const { data, error } = await supabase
    .from('conditions')
    .select(`
      *,
      patient:patients(*),
      encounter:encounters(*)
    `)
    .order('start_date', { ascending: false });
  
  if (error) throw new Error(error.message);
  return data || [];
};

const fetchDevices = async (): Promise<Device[]> => {
  const { data, error } = await supabase
    .from('devices')
    .select(`
      *,
      patient:patients(*),
      encounter:encounters(*)
    `)
    .order('start_date', { ascending: false });
  
  if (error) throw new Error(error.message);
  return data || [];
};

const fetchEncounters = async (): Promise<Encounter[]> => {
  const { data, error } = await supabase
    .from('encounters')
    .select(`
      *,
      patient:patients(*)
    `)
    .order('start_date', { ascending: false });
  
  if (error) throw new Error(error.message);
  return data || [];
};

const fetchPatients = async (): Promise<Patient[]> => {
  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .order('last_name', { ascending: true });
  
  if (error) throw new Error(error.message);
  return data || [];
};

// Hook for clinical data
export const useClinicalData = (type: ClinicalDataType) => {
  const queryClient = useQueryClient();

  const queryKey = [type];
  let queryFn;

  switch (type) {
    case 'allergies':
      queryFn = fetchAllergies;
      break;
    case 'careplans':
      queryFn = fetchCarePlans;
      break;
    case 'conditions':
      queryFn = fetchConditions;
      break;
    case 'devices':
      queryFn = fetchDevices;
      break;
    case 'encounters':
      queryFn = fetchEncounters;
      break;
    default:
      throw new Error(`Unknown clinical data type: ${type}`);
  }

  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn,
  });

  return {
    data: data || [],
    isLoading,
    error,
  };
};

// Hook for patients
export const usePatients = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['patients'],
    queryFn: fetchPatients,
  });

  return {
    patients: data || [],
    isLoading,
    error,
  };
};

// Hook for patient timeline (all clinical data for a specific patient)
export const usePatientTimeline = (patientId: string) => {
  const allergiesQuery = useQuery({
    queryKey: ['patient-allergies', patientId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('allergies')
        .select(`*, encounter:encounters(*)`)
        .eq('patient_id', patientId)
        .order('start_date', { ascending: false });
      
      if (error) throw new Error(error.message);
      return data || [];
    },
    enabled: !!patientId,
  });

  const carePlansQuery = useQuery({
    queryKey: ['patient-careplans', patientId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('careplans')
        .select(`*, encounter:encounters(*)`)
        .eq('patient_id', patientId)
        .order('start_date', { ascending: false });
      
      if (error) throw new Error(error.message);
      return data || [];
    },
    enabled: !!patientId,
  });

  const conditionsQuery = useQuery({
    queryKey: ['patient-conditions', patientId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('conditions')
        .select(`*, encounter:encounters(*)`)
        .eq('patient_id', patientId)
        .order('start_date', { ascending: false });
      
      if (error) throw new Error(error.message);
      return data || [];
    },
    enabled: !!patientId,
  });

  const devicesQuery = useQuery({
    queryKey: ['patient-devices', patientId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('devices')
        .select(`*, encounter:encounters(*)`)
        .eq('patient_id', patientId)
        .order('start_date', { ascending: false });
      
      if (error) throw new Error(error.message);
      return data || [];
    },
    enabled: !!patientId,
  });

  const encountersQuery = useQuery({
    queryKey: ['patient-encounters', patientId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('encounters')
        .select('*')
        .eq('patient_id', patientId)
        .order('start_date', { ascending: false });
      
      if (error) throw new Error(error.message);
      return data || [];
    },
    enabled: !!patientId,
  });

  return {
    allergies: allergiesQuery.data || [],
    carePlans: carePlansQuery.data || [],
    conditions: conditionsQuery.data || [],
    devices: devicesQuery.data || [],
    encounters: encountersQuery.data || [],
    isLoading: allergiesQuery.isLoading || carePlansQuery.isLoading || 
               conditionsQuery.isLoading || devicesQuery.isLoading || 
               encountersQuery.isLoading,
    error: allergiesQuery.error || carePlansQuery.error || 
           conditionsQuery.error || devicesQuery.error || 
           encountersQuery.error,
  };
};
