
export const getStatusColor = (status: string) => {
  switch (status) {
    case 'CONNECTED':
      return 'text-status-success border-status-success bg-status-success/10';
    case 'SYNCING':
      return 'text-astrom-blue border-astrom-blue bg-astrom-blue/10';
    case 'ERROR':
      return 'text-status-error border-status-error bg-status-error/10';
    case 'PAUSED':
      return 'text-status-warning border-status-warning bg-status-warning/10';
    default:
      return 'text-muted-foreground border-border bg-muted/10';
  }
};

export const getHealthColor = (health: number) => {
  if (health >= 95) return 'text-status-success';
  if (health >= 80) return 'text-status-warning';
  return 'text-status-error';
};

export const formatNumber = (num: number) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};
