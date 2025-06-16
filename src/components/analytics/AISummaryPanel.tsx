
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain } from "lucide-react";

const AISummaryPanel = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-purple-500" />
          AI Insights & Recommendations
        </CardTitle>
        <CardDescription>
          Artificial intelligence powered insights and strategic recommendations
        </CardDescription>
      </CardHeader>
      <CardContent className="p-12">
        <div className="text-center space-y-4">
          <Brain className="h-16 w-16 mx-auto text-muted-foreground/30" />
          <h3 className="text-lg font-semibold text-muted-foreground">AI Insights Unavailable</h3>
          <p className="text-muted-foreground/70">
            AI-powered insights and recommendations will appear here once hospital data is available for analysis.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AISummaryPanel;
