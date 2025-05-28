
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Database } from 'lucide-react';
import { TrainingJob } from './types';

interface TrainingJobsPanelProps {
  jobs: TrainingJob[];
}

const TrainingJobsPanel = ({ jobs }: TrainingJobsPanelProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': 
        return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'running': 
        return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'queued': 
        return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'failed': 
        return 'bg-red-500/10 text-red-600 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  return (
    <Card className="bg-card/80 border-border backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Database className="h-5 w-5 text-green-400" />
          Real-time Training Jobs
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="p-3 bg-muted/50 rounded-lg border border-border/50">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-sm text-foreground">{job.modelName}</span>
              <Badge variant="outline" className={`text-xs ${getStatusColor(job.status)}`}>
                {job.status}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium text-foreground">{job.progress}%</span>
              </div>
              <Progress value={job.progress} className="h-2" />
              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div>ETA: {job.estimatedTime}</div>
                <div>GPU: {job.gpuUtilization}%</div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TrainingJobsPanel;
