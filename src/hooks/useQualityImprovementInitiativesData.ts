
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Initiative {
  name: string;
  status: string;
  start_date: string;
  owner_name: string;
}

export interface QualityImprovementData {
  activeProjects: number;
  completedProjects: number;
  initiatives: Initiative[];
}

const getQualityImprovementData = async (): Promise<QualityImprovementData> => {
  const { data, error } = await supabase
    .from("quality_improvement_initiatives")
    .select("name, status, start_date, owner_name");

  if (error) throw new Error(error.message);
  
  const initiatives = data || [];
  const activeProjects = initiatives.filter(i => i.status === 'IN_PROGRESS').length;
  const completedProjects = initiatives.filter(i => i.status === 'COMPLETED').length;
  
  return { activeProjects, completedProjects, initiatives };
};

export const useQualityImprovementInitiativesData = () => {
  return useQuery({
    queryKey: ["quality_improvement_initiatives_data"],
    queryFn: getQualityImprovementData,
    refetchInterval: 60000,
  });
};
