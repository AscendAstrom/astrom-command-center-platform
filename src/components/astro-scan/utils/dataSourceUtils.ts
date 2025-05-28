
export const getStatusColor = (status: string) => {
  switch (status) {
    case 'CONNECTED':
      return 'text-green-400 border-green-400';
    case 'SYNCING':
      return 'text-blue-400 border-blue-400';
    case 'ERROR':
      return 'text-red-400 border-red-400';
    case 'PAUSED':
      return 'text-yellow-400 border-yellow-400';
    default:
      return 'text-slate-400 border-slate-400';
  }
};

export const getHealthColor = (health: number) => {
  if (health >= 95) return 'text-green-400';
  if (health >= 80) return 'text-yellow-400';
  return 'text-red-400';
};

export const formatNumber = (num: number) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};
