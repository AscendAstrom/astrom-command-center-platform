
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Brain,
  BarChart3,
  Target
} from "lucide-react";

const ExecutiveActions = () => {
  return (
    <Card className="bg-card/80 border-border backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-foreground">Strategic Command Actions</h4>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Brain className="h-4 w-4 mr-2" />
              Strategic Analysis
            </Button>
            <Button variant="outline" size="sm">
              <BarChart3 className="h-4 w-4 mr-2" />
              Market Intelligence
            </Button>
            <Button variant="outline" size="sm">
              <Target className="h-4 w-4 mr-2" />
              Growth Planning
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExecutiveActions;
