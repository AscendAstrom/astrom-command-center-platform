
export const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-500/10 text-green-600 border-green-500/20';
    case 'maintenance': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
    case 'error': return 'bg-red-500/10 text-red-600 border-red-500/20';
    default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
  }
};
