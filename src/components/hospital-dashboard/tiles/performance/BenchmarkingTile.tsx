
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Layers } from "lucide-react";

export const BenchmarkingTile = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-cyan-500/10 rounded-lg">
            <Layers className="h-5 w-5 text-cyan-500" />
          </div>
          <div>
            <CardTitle className="text-lg">Benchmarking</CardTitle>
            <CardDescription>Industry comparison</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <Layers className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">Benchmarking analytics coming soon</p>
        </div>
      </CardContent>
    </Card>
  );
};
