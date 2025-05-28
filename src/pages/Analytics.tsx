
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Calendar, Filter, Download } from "lucide-react";

const performanceData = [
  { month: 'Jan', avgWait: 22, patients: 4200, satisfaction: 87 },
  { month: 'Feb', avgWait: 25, patients: 3800, satisfaction: 85 },
  { month: 'Mar', avgWait: 20, patients: 4600, satisfaction: 89 },
  { month: 'Apr', avgWait: 18, patients: 4100, satisfaction: 91 },
  { month: 'May', avgWait: 24, patients: 4400, satisfaction: 88 },
  { month: 'Jun', avgWait: 19, patients: 4800, satisfaction: 93 },
];

const departmentData = [
  { name: 'Emergency', value: 45, color: '#22D3EE' },
  { name: 'ICU', value: 25, color: '#10B981' },
  { name: 'OR', value: 20, color: '#F59E0B' },
  { name: 'Recovery', value: 10, color: '#8B5CF6' },
];

const kpiMetrics = [
  { name: 'Average Wait Time', value: '18 min', target: '15 min', performance: 88 },
  { name: 'Bed Turnover Rate', value: '2.4 hrs', target: '2.0 hrs', performance: 83 },
  { name: 'Patient Satisfaction', value: '92%', target: '90%', performance: 102 },
  { name: 'Door-to-Doc Time', value: '12 min', target: '10 min', performance: 83 },
];

const Analytics = () => {
  return (
    <div className="p-6 space-y-6 bg-slate-950 min-h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics Dashboard</h1>
          <p className="text-slate-400">Performance insights and trend analysis</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
          <Button className="bg-cyan-600 hover:bg-cyan-700">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiMetrics.map((metric) => (
          <Card key={metric.name} className="bg-slate-900 border-slate-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-slate-400">{metric.name}</h3>
                <TrendingUp className={`h-4 w-4 ${metric.performance >= 100 ? 'text-green-400' : 'text-yellow-400'}`} />
              </div>
              <div className="space-y-2">
                <p className="text-2xl font-bold text-white">{metric.value}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Target: {metric.target}</span>
                  <Badge 
                    variant={metric.performance >= 100 ? "default" : "secondary"}
                    className={metric.performance >= 100 ? "bg-green-600" : "bg-yellow-600"}
                  >
                    {metric.performance}%
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trends */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Performance Trends</CardTitle>
            <CardDescription>6-month historical analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#9CA3AF"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#9CA3AF"
                    fontSize={12}
                  />
                  <Bar 
                    dataKey="avgWait" 
                    fill="#22D3EE" 
                    radius={[4, 4, 0, 0]}
                    name="Avg Wait (min)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Department Distribution */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Department Load Distribution</CardTitle>
            <CardDescription>Current patient distribution by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {departmentData.map((dept) => (
                <div key={dept.name} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: dept.color }}
                  />
                  <span className="text-slate-300 text-sm">{dept.name}</span>
                  <span className="text-cyan-400 text-sm font-medium">{dept.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Detailed Performance Metrics</CardTitle>
          <CardDescription>Comprehensive view of all operational metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Metric</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Current</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Target</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Trend</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { metric: 'ED Length of Stay', current: '3.2 hrs', target: '3.0 hrs', trend: '+5%', status: 'warning' },
                  { metric: 'Left Without Being Seen', current: '2.1%', target: '2.0%', status: 'warning' },
                  { metric: 'Bed Occupancy Rate', current: '87%', target: '85%', trend: '+2%', status: 'critical' },
                  { metric: 'Staff Satisfaction', current: '8.4/10', target: '8.0/10', trend: '+3%', status: 'good' },
                  { metric: 'Readmission Rate', current: '5.2%', target: '6.0%', trend: '-8%', status: 'good' },
                ].map((row, index) => (
                  <tr key={index} className="border-b border-slate-800/50">
                    <td className="py-3 px-4 text-white">{row.metric}</td>
                    <td className="py-3 px-4 text-slate-300">{row.current}</td>
                    <td className="py-3 px-4 text-slate-400">{row.target}</td>
                    <td className="py-3 px-4">
                      {row.trend && (
                        <span className={row.trend.startsWith('+') ? 'text-yellow-400' : 'text-green-400'}>
                          {row.trend}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <Badge 
                        variant="outline"
                        className={
                          row.status === 'good' ? 'text-green-400 border-green-400' :
                          row.status === 'warning' ? 'text-yellow-400 border-yellow-400' :
                          'text-red-400 border-red-400'
                        }
                      >
                        {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
