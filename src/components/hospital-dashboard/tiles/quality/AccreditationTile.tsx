
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award } from "lucide-react";

export const AccreditationTile = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-yellow-500/10 rounded-lg">
            <Award className="h-5 w-5 text-yellow-500" />
          </div>
          <div>
            <CardTitle className="text-lg">Accreditation</CardTitle>
            <CardDescription>Standards compliance</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">Accreditation analytics coming soon</p>
        </div>
      </CardContent>
    </Card>
  );
};
