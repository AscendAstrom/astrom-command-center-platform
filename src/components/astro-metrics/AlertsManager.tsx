
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, CheckCircle, Clock, Bell, Mail, Webhook, Eye } from "lucide-react";
import { KPIBreach, MetricsUserRole } from './types';

interface AlertsManagerProps {
  userRole: MetricsUserRole | null;
}

const AlertsManager = ({ userRole }: AlertsManagerProps) => {
  const [alerts, setAlerts] = useState<KPIBreach[]>([
    {
      id: '1',
      kpiId: '1',
      kpiName: 'Average Wait Time',
      currentValue: 45,
      thresholdValue: 30,
      severity: 'critical',
      timestamp: '2024-01-20T14:30:00Z',
      acknowledged: false,
      resolved: false
    },
    {
      id: '2',
      kpiId: '2',
      kpiName: 'Bed Utilization',
      currentValue: 92,
      thresholdValue: 85,
      severity: 'warning',
      timestamp: '2024-01-20T13:45:00Z',
      acknowledged: true,
      acknowledgedBy: 'nurse_manager',
      acknowledgedAt: '2024-01-20T14:00:00Z',
      resolved: false
    },
    {
      id: '3',
      kpiId: '3',
      kpiName: 'SLA Breach Count',
      currentValue: 8,
      thresholdValue: 5,
      severity: 'warning',
      timestamp: '2024-01-20T12:15:00Z',
      acknowledged: true,
      acknowledgedBy: 'admin',
      acknowledgedAt: '2024-01-20T12:30:00Z',
      resolved: true,
      resolvedAt: '2024-01-20T13:00:00Z'
    }
  ]);

  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const canAcknowledge = userRole === 'ADMIN' || userRole === 'ANALYST';

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-600';
      case 'warning': return 'bg-yellow-600';
      case 'info': return 'bg-blue-600';
      default: return 'bg-gray-600';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertTriangle className="h-4 w-4" />;
      case 'warning': return <Clock className="h-4 w-4" />;
      case 'info': return <Bell className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const handleAcknowledge = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId 
        ? { 
            ...alert, 
            acknowledged: true, 
            acknowledgedBy: 'current_user',
            acknowledgedAt: new Date().toISOString()
          }
        : alert
    ));
  };

  const handleResolve = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId 
        ? { 
            ...alert, 
            resolved: true,
            resolvedAt: new Date().toISOString()
          }
        : alert
    ));
  };

  const filteredAlerts = alerts.filter(alert => {
    if (severityFilter !== 'all' && alert.severity !== severityFilter) return false;
    if (statusFilter === 'unresolved' && alert.resolved) return false;
    if (statusFilter === 'unacknowledged' && alert.acknowledged) return false;
    if (statusFilter === 'resolved' && !alert.resolved) return false;
    return true;
  });

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Alert Management</CardTitle>
          <CardDescription>Manage KPI breaches and SLA violations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-48 bg-slate-800 border-slate-700">
                <SelectValue placeholder="Filter by severity" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="info">Info</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48 bg-slate-800 border-slate-700">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="unacknowledged">Unacknowledged</SelectItem>
                <SelectItem value="unresolved">Unresolved</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="border-slate-800">
                <TableHead className="text-slate-300">Alert</TableHead>
                <TableHead className="text-slate-300">KPI</TableHead>
                <TableHead className="text-slate-300">Values</TableHead>
                <TableHead className="text-slate-300">Severity</TableHead>
                <TableHead className="text-slate-300">Timestamp</TableHead>
                <TableHead className="text-slate-300">Status</TableHead>
                {canAcknowledge && <TableHead className="text-slate-300">Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAlerts.map((alert) => (
                <TableRow key={alert.id} className="border-slate-800">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getSeverityIcon(alert.severity)}
                      <div>
                        <div className="font-medium text-white">KPI Breach</div>
                        <div className="text-sm text-slate-400">
                          {alert.acknowledged ? 'Acknowledged' : 'Needs Attention'}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-300">{alert.kpiName}</TableCell>
                  <TableCell>
                    <div className="text-slate-300">
                      <div>Current: <span className="font-medium">{alert.currentValue}</span></div>
                      <div>Threshold: <span className="text-slate-400">{alert.thresholdValue}</span></div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getSeverityColor(alert.severity)}>
                      {alert.severity}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-300">
                    {formatTimestamp(alert.timestamp)}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {alert.resolved ? (
                        <Badge className="bg-green-600">Resolved</Badge>
                      ) : alert.acknowledged ? (
                        <Badge className="bg-blue-600">Acknowledged</Badge>
                      ) : (
                        <Badge variant="destructive">Active</Badge>
                      )}
                    </div>
                  </TableCell>
                  {canAcknowledge && (
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {!alert.acknowledged && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleAcknowledge(alert.id)}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                        {alert.acknowledged && !alert.resolved && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleResolve(alert.id)}
                            className="text-green-400 hover:text-green-300"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Mail className="h-5 w-5 text-cyan-400" />
              Email Notifications
            </CardTitle>
            <CardDescription>Configure email alert recipients</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                <div>
                  <div className="text-white font-medium">ED Manager</div>
                  <div className="text-sm text-slate-400">ed-manager@hospital.com</div>
                </div>
                <Badge className="bg-green-600">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                <div>
                  <div className="text-white font-medium">Chief Medical Officer</div>
                  <div className="text-sm text-slate-400">cmo@hospital.com</div>
                </div>
                <Badge className="bg-green-600">Active</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Webhook className="h-5 w-5 text-cyan-400" />
              Webhook Integration
            </CardTitle>
            <CardDescription>External system notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                <div>
                  <div className="text-white font-medium">Slack Integration</div>
                  <div className="text-sm text-slate-400">https://hooks.slack.com/...</div>
                </div>
                <Badge className="bg-green-600">Connected</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                <div>
                  <div className="text-white font-medium">Teams Integration</div>
                  <div className="text-sm text-slate-400">https://hooks.teams.com/...</div>
                </div>
                <Badge variant="outline">Configured</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AlertsManager;
