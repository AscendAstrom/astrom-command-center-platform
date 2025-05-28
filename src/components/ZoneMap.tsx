
const zones = [
  { id: 'A', name: 'Triage', patients: 8, capacity: 12, status: 'normal' },
  { id: 'B', name: 'Fast Track', patients: 15, capacity: 18, status: 'busy' },
  { id: 'C', name: 'Acute Care', patients: 22, capacity: 24, status: 'critical' },
  { id: 'D', name: 'Observation', patients: 6, capacity: 10, status: 'normal' },
];

const ZoneMap = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'bg-green-500/20 border-green-500 text-green-400';
      case 'busy':
        return 'bg-yellow-500/20 border-yellow-500 text-yellow-400';
      case 'critical':
        return 'bg-red-500/20 border-red-500 text-red-400';
      default:
        return 'bg-slate-500/20 border-slate-500 text-slate-400';
    }
  };

  const getOccupancyPercentage = (patients: number, capacity: number) => {
    return Math.round((patients / capacity) * 100);
  };

  return (
    <div className="space-y-4">
      {zones.map((zone) => (
        <div
          key={zone.id}
          className={`p-4 rounded-lg border-2 transition-all hover:scale-105 cursor-pointer ${getStatusColor(zone.status)}`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg">Zone {zone.id}</span>
              <span className="text-sm opacity-75">{zone.name}</span>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">
                {zone.patients}/{zone.capacity}
              </div>
              <div className="text-xs opacity-75">
                {getOccupancyPercentage(zone.patients, zone.capacity)}%
              </div>
            </div>
          </div>
          
          <div className="w-full bg-slate-800 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                zone.status === 'normal' ? 'bg-green-500' :
                zone.status === 'busy' ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${getOccupancyPercentage(zone.patients, zone.capacity)}%` }}
            />
          </div>
          
          <div className="flex justify-between items-center mt-2 text-xs opacity-75">
            <span>Status: {zone.status.charAt(0).toUpperCase() + zone.status.slice(1)}</span>
            <span>Available: {zone.capacity - zone.patients}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ZoneMap;
