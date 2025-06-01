
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileCheck } from "lucide-react";

export const InsuranceClaimsTile = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-green-500/10 rounded-lg">
            <FileCheck className="h-5 w-5 text-green-500" />
          </div>
          <div>
            <CardTitle className="text-lg">Insurance Claims</CardTitle>
            <CardDescription>Claims processing</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <FileCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">Claims analytics coming soon</p>
        </div>
      </CardContent>
    </Card>
  );
};
