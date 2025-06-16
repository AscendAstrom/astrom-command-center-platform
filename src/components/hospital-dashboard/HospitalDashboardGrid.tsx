
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Hospital, DollarSign, Shield, TrendingUp } from "lucide-react";

const HospitalDashboardGrid = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hospital className="h-6 w-6 text-blue-400" />
            Hospital Intelligence Dashboard
          </CardTitle>
          <CardDescription>
            Real-time operational insights and analytics across all hospital departments
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="operations" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="operations">Operations</TabsTrigger>
          <TabsTrigger value="clinical">Clinical</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="quality">Quality & Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="operations" className="space-y-6">
          <Card>
            <CardContent className="p-12">
              <div className="text-center space-y-4">
                <Hospital className="h-16 w-16 mx-auto text-muted-foreground/30" />
                <h3 className="text-lg font-semibold text-muted-foreground">No Operational Data</h3>
                <p className="text-muted-foreground/70">
                  Hospital operational data will appear here once the system is initialized.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clinical" className="space-y-6">
          <Card>
            <CardContent className="p-12">
              <div className="text-center space-y-4">
                <Shield className="h-16 w-16 mx-auto text-muted-foreground/30" />
                <h3 className="text-lg font-semibold text-muted-foreground">No Clinical Data</h3>
                <p className="text-muted-foreground/70">
                  Clinical analytics and insights will be displayed here once data is available.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <Card>
            <CardContent className="p-12">
              <div className="text-center space-y-4">
                <DollarSign className="h-16 w-16 mx-auto text-muted-foreground/30" />
                <h3 className="text-lg font-semibold text-muted-foreground">No Financial Data</h3>
                <p className="text-muted-foreground/70">
                  Financial analytics and revenue insights will appear here once data is populated.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quality" className="space-y-6">
          <Card>
            <CardContent className="p-12">
              <div className="text-center space-y-4">
                <TrendingUp className="h-16 w-16 mx-auto text-muted-foreground/30" />
                <h3 className="text-lg font-semibold text-muted-foreground">No Quality Data</h3>
                <p className="text-muted-foreground/70">
                  Quality metrics and performance indicators will be shown here once data is available.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HospitalDashboardGrid;
