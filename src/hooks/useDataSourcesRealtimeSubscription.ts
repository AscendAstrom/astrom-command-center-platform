
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

interface UseDataSourcesRealtimeSubscriptionProps {
  user: User | null;
  onDataChange: () => void;
}

export const useDataSourcesRealtimeSubscription = ({ 
  user, 
  onDataChange 
}: UseDataSourcesRealtimeSubscriptionProps) => {
  useEffect(() => {
    // Set up real-time subscription for data_sources table
    const channel = supabase
      .channel('data-sources-realtime')
      .on(
        'postgres_changes',
        { 
          event: '*', 
          schema: 'public', 
          table: 'data_sources' 
        },
        (payload) => {
          console.log('Data source change detected:', payload.eventType, payload);
          // Trigger data refresh when any change occurs
          onDataChange();
        }
      )
      .subscribe((status) => {
        console.log('Realtime subscription status:', status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, onDataChange]);
};
