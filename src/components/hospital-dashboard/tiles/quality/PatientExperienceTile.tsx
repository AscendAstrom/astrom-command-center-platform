
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";

export const PatientExperienceTile = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-pink-500/10 rounded-lg">
            <Heart className="h-5 w-5 text-pink-500" />
          </div>
          <div>
            <CardTitle className="text-lg">Patient Experience</CardTitle>
            <CardDescription>Experience metrics</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">Patient experience analytics coming soon</p>
        </div>
      </CardContent>
    </Card>
  );
};
