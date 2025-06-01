
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GitBranch } from "lucide-react";

export const WorkflowAnalyticsTile = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-500/10 rounded-lg">
            <GitBranch className="h-5 w-5 text-indigo-500" />
          </div>
          <div>
            <CardTitle className="text-lg">Workflow Analytics</CardTitle>
            <CardDescription>Process flow</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <GitBranch className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">Workflow analytics coming soon</p>
        </div>
      </CardContent>
    </Card>
  );
};
