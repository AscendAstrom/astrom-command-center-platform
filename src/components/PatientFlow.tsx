
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { patientFlowService, FlowSummary } from '@/services/analytics/patientFlowService';

interface FlowDataPoint extends FlowSummary {
  time: string;
}

const PatientFlow = () => {
  const [data, setData] = useState<FlowDataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlowData = async () => {
      setLoading(true);
      try {
        const flowSummary = await patientFlowService.getFlowSummary(24);
        
        // Create time labels for the last 24 hours in 4-hour intervals
        const timeLabels = [];
        for (let i = 5; i >= 0; i--) {
          const time = new Date(Date.now() - i * 4 * 60 * 60 * 1000);
          timeLabels.push(time.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
          }));
        }

        const chartData: FlowDataPoint[] = flowSummary.map((summary, index) => ({
          ...summary,
          time: timeLabels[index] || `${index * 4}:00`
        }));

        setData(chartData);
      } catch (error) {
        console.error('Error fetching patient flow data:', error);
        // Fallback to empty data
        setData([
          { time: '00:00', arrivals: 0, completions: 0, pending: 0 },
          { time: '04:00', arrivals: 0, completions: 0, pending: 0 },
          { time: '08:00', arrivals: 0, completions: 0, pending: 0 },
          { time: '12:00', arrivals: 0, completions: 0, pending: 0 },
          { time: '16:00', arrivals: 0, completions: 0, pending: 0 },
          { time: '20:00', arrivals: 0, completions: 0, pending: 0 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchFlowData();

    // Refresh data every 5 minutes
    const interval = setInterval(fetchFlowData, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="text-slate-400">Loading patient flow data...</div>
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
