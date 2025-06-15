
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FlaskConical, Clock, AlertTriangle } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { useLabData } from "@/hooks/useLabData";
import { Skeleton } from "@/components/ui/skeleton";
import { format, parseISO } from "date-fns";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-background/80 backdrop-blur-sm border rounded-lg shadow-lg">
        <p className="label text-sm font-semibold">{`${format(parseISO(label), "HH:mm")}`}</p>
        <p className="intro text-xs text-muted-foreground">{`Tests: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

export const LabResultsTile = () => {
  const { data: labData, isLoading, error } = useLabData();

  if (isLoading) {
    return (
      <Card className="h-full">
        <CardHeader>
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
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          <div className="grid grid-cols-3 gap-4 text-center">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
        <Card className="h-full">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-red-500/10 rounded-lg">
                            <AlertTriangle className="h-5 w-5 text-red-500" />
                        </div>
                        <div>
                            <CardTitle className="text-lg">Lab Results</CardTitle>
                            <CardDescription className="text-red-500">Error loading data</CardDescription>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center h-full text-red-500 text-sm">
                    Could not fetch lab results.
                </div>
            </CardContent>
        </Card>
    )
  }

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
              <CardDescription>Last 24h diagnostic analytics</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
            <Clock className="h-3 w-3 mr-1" />
            {labData?.lastUpdated}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-0">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{labData?.totalTests ?? 0}</div>
            <div className="text-xs text-muted-foreground">Tests</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{labData?.avgTurnaround ?? 0}m</div>
            <div className="text-xs text-muted-foreground">Avg TAT</div>
          </div>
           <div>
            <div className="text-2xl font-bold text-orange-600">{labData?.criticalAlerts ?? 0}</div>
            <div className="text-xs text-muted-foreground">Critical</div>
          </div>
        </div>

        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={labData?.testVolumeHistory} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="labColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="time" 
                tickFormatter={(val) => format(parseISO(val), "HH:mm")}
                tick={{ fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="count" stroke="#3b82f6" fillOpacity={1} fill="url(#labColor)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground mb-2">Top Tests by Volume</div>
           {labData && labData.topTests.length > 0 ? (
            labData.topTests.map(test => (
                <div key={test.name} className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">{test.name}</span>
                    <Badge variant="secondary">{test.count}</Badge>
                </div>
            ))
           ) : (
             <div className="text-center py-4 text-muted-foreground text-sm">
                No test data for top tests.
             </div>
           )}
        </div>
      </CardContent>
    </Card>
  );
};
