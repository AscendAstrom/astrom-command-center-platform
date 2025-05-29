
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Brain,
  BarChart3,
  Target
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ExecutiveActions = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGeneratingIntelligence, setIsGeneratingIntelligence] = useState(false);
  const [isPlanning, setIsPlanning] = useState(false);

  const handleStrategicAnalysis = () => {
    setIsAnalyzing(true);
    toast.info("Initiating strategic analysis...");
    
    setTimeout(() => {
      setIsAnalyzing(false);
      toast.success("Strategic analysis completed successfully!");
    }, 3000);
  };

  const handleMarketIntelligence = () => {
    setIsGeneratingIntelligence(true);
    toast.info("Generating market intelligence report...");
    
    setTimeout(() => {
      setIsGeneratingIntelligence(false);
      toast.success("Market intelligence report generated!");
    }, 2500);
  };

  const handleGrowthPlanning = () => {
    setIsPlanning(true);
    toast.info("Analyzing growth opportunities...");
    
    setTimeout(() => {
      setIsPlanning(false);
      toast.success("Growth planning analysis completed!");
    }, 2000);
  };

  return (
    <Card className="bg-card/80 border-border backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-foreground">Strategic Command Actions</h4>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleStrategicAnalysis}
              disabled={isAnalyzing}
              showToast={true}
              toastMessage={isAnalyzing ? "Analysis in progress..." : "Strategic analysis initiated"}
            >
              <Brain className={`h-4 w-4 mr-2 ${isAnalyzing ? 'animate-pulse' : ''}`} />
              {isAnalyzing ? "Analyzing..." : "Strategic Analysis"}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleMarketIntelligence}
              disabled={isGeneratingIntelligence}
              showToast={true}
              toastMessage={isGeneratingIntelligence ? "Generating intelligence..." : "Market intelligence started"}
            >
              <BarChart3 className={`h-4 w-4 mr-2 ${isGeneratingIntelligence ? 'animate-pulse' : ''}`} />
              {isGeneratingIntelligence ? "Generating..." : "Market Intelligence"}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleGrowthPlanning}
              disabled={isPlanning}
              showToast={true}
              toastMessage={isPlanning ? "Planning in progress..." : "Growth planning initiated"}
            >
              <Target className={`h-4 w-4 mr-2 ${isPlanning ? 'animate-pulse' : ''}`} />
              {isPlanning ? "Planning..." : "Growth Planning"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExecutiveActions;
