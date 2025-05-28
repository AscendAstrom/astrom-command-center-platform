
import { useState, useEffect } from 'react';
import { UserRole } from '../types';

export const useUserRole = () => {
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user role - in real app this would come from Supabase
    const fetchUserRole = async () => {
      try {
        // For demo purposes, we'll simulate different roles
        // In production, this would check the actual user's role from the database
        const roles: UserRole[] = ['DATA_ENGINEER', 'ANALYST', 'ADMIN'];
        const randomRole = roles[Math.floor(Math.random() * roles.length)];
        
        setTimeout(() => {
          setUserRole(randomRole);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching user role:', error);
        setUserRole('ANALYST'); // Default to read-only
        setIsLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  return { userRole, isLoading };
};
