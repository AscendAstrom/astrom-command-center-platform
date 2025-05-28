
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import MetricCard from "@/components/MetricCard";
import AlertPanel from "@/components/AlertPanel";
import ZoneMap from "@/components/ZoneMap";
import PatientFlow from "@/components/PatientFlow";

const CommandCenter = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-6 space-y-6 bg-slate-950 min-h-full">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Patients"
          value="247"
          change="+12%"
          trend="up"
          icon="users"
        />
        <MetricCard
          title="Avg Wait Time"
          value="18 min"
          change="-5%"
          trend="down"
          icon="clock"
        />
        <MetricCard
          title="Bed Occupancy"
          value="87%"
          change="+3%"
          trend="up"
          icon="bed"
        />
        <MetricCard
          title="SLA Compliance"
          value="94.2%"
          change="+1.2%"
          trend="up"
          icon="target"
        />
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Flow Chart */}
        <div className="lg:col-span-2">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                Patient Flow - Real Time
                <Badge variant="outline" className="text-green-400 border-green-400">
                  Live
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PatientFlow />
            </CardContent>
          </Card>
        </div>

        {/* Zone Status */}
        <div>
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Zone Status</CardTitle>
            </CardHeader>
            <CardContent>
              <ZoneMap />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Performance */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Department Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { dept: "Emergency Dept", patients: 89, capacity: 120, efficiency: 74 },
              { dept: "ICU", patients: 24, capacity: 30, efficiency: 80 },
              { dept: "Operating Room", patients: 12, capacity: 15, efficiency: 80 },
              { dept: "Recovery", patients: 18, capacity: 25, efficiency: 72 }
            ].map((dept) => (
              <div key={dept.dept} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">{dept.dept}</span>
                  <span className="text-cyan-400">{dept.patients}/{dept.capacity}</span>
                </div>
                <Progress value={dept.efficiency} className="h-2" />
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Efficiency: {dept.efficiency}%</span>
                  <span className={dept.efficiency > 75 ? "text-green-400" : "text-yellow-400"}>
                    {dept.efficiency > 75 ? "Optimal" : "Monitor"}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Active Alerts */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Active Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <AlertPanel />
          </CardContent>
        </Card>
      </div>

      {/* Status Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <span className="text-slate-300">
              Last Updated: {currentTime.toLocaleTimeString()}
            </span>
            <span className="text-slate-300">
              Data Sources: <span className="text-green-400">7/7 Connected</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-green-400 border-green-400">
              All Systems Operational
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandCenter;
