
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { supabase } from '@/integrations/supabase/client';

interface FlowDataPoint {
  time: string;
  arrivals: number;
  completions: number;
  pending: number;
}

const PatientFlow = () => {
  const [data, setData] = useState<FlowDataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlowData = async () => {
      setLoading(true);
      try {
        // Fetch real patient flow events from the database
        const { data: flowEvents, error } = await supabase
          .from('patient_flow_events')
          .select('*')
          .order('timestamp', { ascending: false })
          .limit(100);

        if (error) throw error;

        // Process the data into time-based aggregations
        const processedData = processFlowEvents(flowEvents || []);
        setData(processedData);
      } catch (error) {
        console.error('Error fetching patient flow data:', error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFlowData();

    // Refresh data every 5 minutes
    const interval = setInterval(fetchFlowData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const processFlowEvents = (events: any[]): FlowDataPoint[] => {
    if (!events || events.length === 0) {
      return [];
    }

    // Group events by hour for the last 24 hours
    const hourlyData = new Map<string, { arrivals: number; completions: number; pending: number }>();
    
    events.forEach(event => {
      const hour = new Date(event.timestamp).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      });
      
      if (!hourlyData.has(hour)) {
        hourlyData.set(hour, { arrivals: 0, completions: 0, pending: 0 });
      }
      
      const data = hourlyData.get(hour)!;
      if (event.event_type === 'ARRIVAL') data.arrivals++;
      if (event.event_type === 'DISCHARGE') data.completions++;
      if (event.event_type === 'PENDING') data.pending++;
    });

    return Array.from(hourlyData.entries()).map(([time, values]) => ({
      time,
      ...values
    }));
  };

  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="text-slate-400">Loading patient flow data...</div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="text-slate-400">No patient flow data available</div>
      </div>
    );
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="time" 
            stroke="#9CA3AF"
            fontSize={12}
          />
          <YAxis 
            stroke="#9CA3AF"
            fontSize={12}
          />
          <Line 
            type="monotone" 
            dataKey="arrivals" 
            stroke="#22D3EE" 
            strokeWidth={3}
            dot={{ fill: '#22D3EE', strokeWidth: 2, r: 4 }}
            name="New Arrivals"
          />
          <Line 
            type="monotone" 
            dataKey="completions" 
            stroke="#10B981" 
            strokeWidth={3}
            dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
            name="Completed"
          />
          <Line 
            type="monotone" 
            dataKey="pending" 
            stroke="#F59E0B" 
            strokeWidth={3}
            dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
            name="Pending"
          />
        </LineChart>
      </ResponsiveContainer>
      
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
          <span className="text-slate-300 text-sm">New Arrivals</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          <span className="text-slate-300 text-sm">Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          <span className="text-slate-300 text-sm">Pending</span>
        </div>
      </div>
    </div>
  );
};

export default PatientFlow;
