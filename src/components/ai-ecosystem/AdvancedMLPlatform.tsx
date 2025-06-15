
import PlatformOverview from './ml-platform/PlatformOverview';
import MLModelsRegistry from './ml-platform/MLModelsRegistry';
import TrainingJobsPanel from './ml-platform/TrainingJobsPanel';
import FederatedLearningNetwork from './ml-platform/FederatedLearningNetwork';
import { Skeleton } from '@/components/ui/skeleton';
import { useMLPlatformData } from '@/hooks/useMLPlatformData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

const AdvancedMLPlatform = () => {
  const { data, isLoading, error } = useMLPlatformData();

  if (isLoading) {
      return (
          <div className="space-y-6">
              <Skeleton className="h-40 w-full" />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Skeleton className="h-80 w-full" />
                  <Skeleton className="h-80 w-full" />
              </div>
              <Skeleton className="h-60 w-full" />
          </div>
      )
  }

  if (error) {
    return (
      <Card className="bg-destructive/10 border-destructive">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            Error Loading ML Platform Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">There was an error fetching the Machine Learning Platform data.</p>
          <p className="text-xs text-muted-foreground mt-2">{error.message}</p>
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-40 w-full" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-80 w-full" />
          <Skeleton className="h-80 w-full" />
        </div>
        <Skeleton className="h-60 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PlatformOverview metrics={data.platformMetrics} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MLModelsRegistry models={data.models} />
        <TrainingJobsPanel jobs={data.trainingJobs} />
      </div>

      <FederatedLearningNetwork sites={data.federatedSites} />
    </div>
  );
};

export default AdvancedMLPlatform;
