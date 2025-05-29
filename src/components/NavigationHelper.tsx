
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface NavigationHelperProps {
  to: string;
}

export const NavigationHelper = ({ to }: NavigationHelperProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(to);
  }, [navigate, to]);

  return null;
};
