
import { Brain, Network, Target, Activity, CheckCircle } from 'lucide-react';
import { AutonomousWorkflow } from '@/hooks/useAutonomousWorkflows';

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
    case 'running':
    case 'completed':
    case 'complete':
       return 'bg-green-500/10 text-green-600 border-green-500/20';
    case 'learning':
    case 'queued':
      return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
    case 'optimizing':
      return 'bg-orange-500/10 text-orange-600 border-orange-500/20';
    case 'paused':
      return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
    default:
      return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
  }
};

export const getCategoryIcon = (category: AutonomousWorkflow['category']) => {
  switch (category) {
    case 'bed-management': return <Target className="h-4 w-4" />;
    case 'patient-flow': return <Activity className="h-4 w-4" />;
    case 'resource-allocation': return <Network className="h-4 w-4" />;
    case 'quality-assurance': return <CheckCircle className="h-4 w-4" />;
    default: return <Brain className="h-4 w-4" />;
  }
};
