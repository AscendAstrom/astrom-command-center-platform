
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain } from "lucide-react";

export const ClinicalDecisionSupportTile = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-pink-500/10 rounded-lg">
            <Brain className="h-5 w-5 text-pink-500" />
          </div>
          <div>
            <CardTitle className="text-lg">Clinical Decision Support</CardTitle>
            <CardDescription>AI-powered insights</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">AI decision support coming soon</p>
        </div>
      </CardContent>
    </Card>
  );
};
