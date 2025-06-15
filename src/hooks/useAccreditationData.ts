
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Accreditation {
  name: string;
  accrediting_body: string;
  status: 'ACCREDITED' | 'PENDING' | 'EXPIRED' | 'REVOKED';
  expiry_date: string;
  next_review_date: string;
}

const getAccreditationData = async (): Promise<Accreditation[]> => {
  const { data, error } = await supabase
    .from("accreditations")
    .select("name, accrediting_body, status, expiry_date, next_review_date")
    .order("expiry_date", { ascending: true });

  if (error) throw new Error(error.message);
  return data || [];
};

export const useAccreditationData = () => {
  return useQuery({
    queryKey: ["accreditation_data"],
    queryFn: getAccreditationData,
    refetchInterval: 60000,
  });
};
