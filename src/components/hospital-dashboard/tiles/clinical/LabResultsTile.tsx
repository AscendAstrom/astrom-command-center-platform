
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FlaskConical, Clock } from "lucide-react";

export const LabResultsTile = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <FlaskConical className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Lab Results</CardTitle>
              <CardDescription>Diagnostic analytics</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
            <Clock className="h-3 w-3 mr-1" />
            Real-time
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <FlaskConical className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">Lab analytics coming soon</p>
        </div>
      </CardContent>
    </Card>
  );
};
