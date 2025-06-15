
import { useState, useEffect } from 'react';
import { UserRole } from '../types';
import { supabase } from '@/integrations/supabase/client';

export const useUserRole = () => {
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetches the user role from the database
    const fetchUserRole = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
          const { data, error } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', user.id)
            .limit(1)
            .maybeSingle();

          if (error) {
            console.error('Error fetching user role:', error);
            setUserRole('ANALYST'); // Default to ANALYST on error
          } else {
            // Default to ANALYST if no role is found in the database
            setUserRole((data?.role as UserRole) || 'ANALYST');
          }
        } else {
          setUserRole(null); // No user is logged in
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
        setUserRole('ANALYST'); // Default on any other exception
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  return { userRole, isLoading };
};
