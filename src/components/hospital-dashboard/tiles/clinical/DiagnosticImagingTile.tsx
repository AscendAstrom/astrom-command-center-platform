
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Clock, TrendingUp, AlertTriangle } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

export const DiagnosticImagingTile = () => {
  const imagingVolume = [
    { hour: '6AM', xray: 12, ct: 3, mri: 1, ultrasound: 8 },
    { hour: '9AM', xray: 28, ct: 8, mri: 4, ultrasound: 15 },
    { hour: '12PM', xray: 35, ct: 12, mri: 6, ultrasound: 22 },
    { hour: '3PM', xray: 42, ct: 15, mri: 8, ultrasound: 28 },
    { hour: '6PM', xray: 38, ct: 11, mri: 5, ultrasound: 24 },
    { hour: '9PM', xray: 22, ct: 6, mri: 2, ultrasound: 16 }
  ];

  const modalityStats = [
    { modality: 'X-Ray', count: 485, turnaround: 18, utilization: 78 },
    { modality: 'CT Scan', count: 156, turnaround: 45, utilization: 92 },
    { modality: 'MRI', count: 89, turnaround: 65, utilization: 85 },
    { modality: 'Ultrasound', count: 234, turnaround: 22, utilization: 71 },
    { modality: 'Mammography', count: 67, turnaround: 35, utilization: 68 }
  ];

  const qualityMetrics = [
    { name: 'Diagnostic Quality', value: 96.2, color: '#22c55e' },
    { name: 'Retakes Required', value: 3.8, color: '#ef4444' }
  ];

  const metrics = {
    totalExams: 1031,
    avgTurnaround: 32,
    criticalFindings: 18,
    radiologistWorkload: 94,
    equipmentUptime: 98.5,
    patientSatisfaction: 4.7
  };

  const criticalFindings = [
    { time: '14:45', study: 'CT Chest', finding: 'Pulmonary Embolism', patient: 'PT-8921' },
    { time: '13:32', study: 'X-Ray Chest', finding: 'Pneumothorax', patient: 'PT-5634' },
    { time: '12:18', study: 'CT Head', finding: 'Acute Stroke', patient: 'PT-2945' }
  ];

  const reportingTimes = [
    { urgency: 'STAT', target: 30, actual: 25, count: 45 },
    { urgency: 'Urgent', target: 120, actual: 108, count: 156 },
    { urgency: 'Routine', target: 1440, actual: 1238, count: 830 }
  ];

  const getStatusColor = (actual: number, target: number) => {
    const ratio = actual / target;
    if (ratio <= 0.8) return '#22c55e';
    if (ratio <= 1.0) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-500/10 rounded-lg">
              <Camera className="h-5 w-5 text-indigo-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Diagnostic Imaging</CardTitle>
              <CardDescription>Radiology metrics</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-indigo-600 border-indigo-200 bg-indigo-50">
            <TrendingUp className="h-3 w-3 mr-1" />
            {metrics.equipmentUptime}% Uptime
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-indigo-600">{metrics.totalExams}</div>
            <div className="text-xs text-muted-foreground">Exams Today</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{metrics.avgTurnaround}m</div>
            <div className="text-xs text-muted-foreground">Avg TAT</div>
          </div>
        </div>

        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={imagingVolume}>
              <XAxis dataKey="hour" fontSize={8} />
              <YAxis hide />
              <Tooltip formatter={(value) => [`${value}`, 'Exams']} />
              <Area 
                type="monotone" 
                dataKey="xray" 
                stackId="1"
                stroke="#6366f1" 
                fill="#6366f120"
                name="X-Ray"
              />
              <Area 
                type="monotone" 
                dataKey="ct" 
                stackId="1"
                stroke="#8b5cf6" 
                fill="#8b5cf620"
                name="CT"
              />
              <Area 
                type="monotone" 
                dataKey="mri" 
                stackId="1"
                stroke="#06b6d4" 
                fill="#06b6d420"
                name="MRI"
              />
              <Area 
                type="monotone" 
                dataKey="ultrasound" 
                stackId="1"
                stroke="#10b981" 
                fill="#10b98120"
                name="Ultrasound"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground mb-2">Modality Performance</div>
          {modalityStats.slice(0, 3).map((modality, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{modality.modality}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs">{modality.count}</span>
                <div className="w-8 h-1.5 bg-gray-200 rounded">
                  <div 
                    className="h-full bg-indigo-500 rounded" 
                    style={{ width: `${modality.utilization}%` }}
                  />
                </div>
                <span className="font-medium">{modality.turnaround}m</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-red-50 p-2 rounded text-xs">
          <div className="flex items-center gap-1 mb-1">
            <AlertTriangle className="h-3 w-3 text-red-500" />
            <span className="font-semibold text-red-600">Critical Findings ({metrics.criticalFindings})</span>
          </div>
          <div className="text-muted-foreground">
            Latest: {criticalFindings[0].finding} - {criticalFindings[0].study} ({criticalFindings[0].time})
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
