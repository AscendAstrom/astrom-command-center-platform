
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const data = [
  { time: '00:00', arrivals: 12, completions: 8, pending: 4 },
  { time: '04:00', arrivals: 8, completions: 6, pending: 2 },
  { time: '08:00', arrivals: 24, completions: 18, pending: 8 },
  { time: '12:00', arrivals: 32, completions: 28, pending: 12 },
  { time: '16:00', arrivals: 28, completions: 24, pending: 9 },
  { time: '20:00', arrivals: 18, completions: 15, pending: 6 },
];

const EntityFlow = () => {
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
            name="New Entries"
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
          <span className="text-slate-300 text-sm">New Entries</span>
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

export default EntityFlow;
