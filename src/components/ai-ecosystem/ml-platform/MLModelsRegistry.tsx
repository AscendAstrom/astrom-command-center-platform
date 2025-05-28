
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  TrendingUp,
  GitBranch,
  Zap,
  Monitor,
  Cpu,
  Play,
  RotateCcw
} from 'lucide-react';
import { MLModel } from './types';

interface MLModelsRegistryProps {
  models: MLModel[];
}

const MLModelsRegistry = ({ models }: MLModelsRegistryProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'deployed': 
        return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'training': 
        return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'testing': 
        return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'updating': 
        return 'bg-red-500/10 text-red-600 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'prediction': return <TrendingUp className="h-4 w-4" />;
      case 'classification': return <GitBranch className="h-4 w-4" />;
      case 'optimization': return <Zap className="h-4 w-4" />;
      case 'nlp': return <Brain className="h-4 w-4" />;
      case 'vision': return <Monitor className="h-4 w-4" />;
      default: return <Cpu className="h-4 w-4" />;
    }
  };

  return (
    <Card className="bg-card/80 border-border backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-400" />
          ML Model Registry
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {models.map((model) => (
          <div key={model.id} className="p-3 bg-muted/50 rounded-lg border border-border/50">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {getTypeIcon(model.type)}
                <span className="font-medium text-sm text-foreground">{model.name}</span>
              </div>
              <Badge variant="outline" className={`text-xs ${getStatusColor(model.status)}`}>
                {model.status}
              </Badge>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground mb-2">
              <div>Accuracy: {model.accuracy}%</div>
              <div>Version: {model.version}</div>
              <div>Data: {(model.dataPoints / 1000000).toFixed(1)}M</div>
            </div>
            <div className="flex gap-1">
              <Button variant="outline" size="sm" className="flex-1 text-xs">
                <Play className="h-3 w-3 mr-1" />
                Deploy
              </Button>
              <Button variant="outline" size="sm" className="flex-1 text-xs">
                <RotateCcw className="h-3 w-3 mr-1" />
                Retrain
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default MLModelsRegistry;
