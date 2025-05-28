
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RuleExecution, FlowUserRole } from './types';
import { CheckCircle, XCircle, Clock, Eye, RefreshCw } from 'lucide-react';

interface RuleExecutionsProps {
  userRole: FlowUserRole;
}

const RuleExecutions = ({ userRole }: RuleExecutionsProps) => {
  const [executions] = useState<RuleExecution[]>([
    {
      id: '1',
      ruleId: '1',
      ruleName: 'SLA Breach Alert',
      timestamp: '2024-01-20T14:30:00Z',
      status: 'success',
      triggerData: {
        wait_time_minutes: 52,
        patient_id: 'P12345',
        zone: 'Emergency'
      },
      actionsExecuted: ['Email sent to ed-manager@hospital.com', 'Slack notification posted']
    },
    {
      id: '2',
      ruleId: '2',
      ruleName: 'Surge Prediction Alert',
      timestamp: '2024-01-20T14:15:00Z',
      status: 'success',
      triggerData: {
        predicted_capacity: 95,
        current_capacity: 78,
        time_frame: '2h'
      },
      actionsExecuted: ['Dashboard banner displayed', 'API call to staffing system']
    },
    {
      id: '3',
      ruleId: '1',
      ruleName: 'SLA Breach Alert',
      timestamp: '2024-01-20T13:45:00Z',
      status: 'failed',
      triggerData: {
        wait_time_minutes: 48,
        patient_id: 'P12346',
        zone: 'Emergency'
      },
      actionsExecuted: [],
      errorMessage: 'Failed to send email: SMTP server unavailable'
    },
    {
      id: '4',
      ruleId: '3',
      ruleName: 'Data Anomaly Detection',
      timestamp: '2024-01-20T13:30:00Z',
      status: 'pending',
      triggerData: {
        metric: 'patient_arrivals_per_hour',
        expected_value: 15,
        actual_value: 35,
        deviation: 133
      },
      actionsExecuted: ['Investigation workflow started']
    }
  ]);

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [ruleFilter, setRuleFilter] = useState<string>('all');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-400" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-400" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-600';
      case 'failed':
        return 'bg-red-600';
      case 'pending':
        return 'bg-yellow-600';
      default:
        return 'bg-gray-600';
    }
  };

  const filteredExecutions = executions.filter(execution => {
    if (statusFilter !== 'all' && execution.status !== statusFilter) return false;
    if (ruleFilter !== 'all' && execution.ruleId !== ruleFilter) return false;
    return true;
  });

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const uniqueRules = Array.from(new Set(executions.map(e => e.ruleId)))
    .map(ruleId => ({
      id: ruleId,
      name: executions.find(e => e.ruleId === ruleId)?.ruleName || 'Unknown'
    }));

  return (
    <div className="space-y-6">
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">Rule Executions</CardTitle>
              <CardDescription>Monitor automation rule execution history and status</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="border-slate-600">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48 bg-slate-800 border-slate-700">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>

            <Select value={ruleFilter} onValueChange={setRuleFilter}>
              <SelectTrigger className="w-48 bg-slate-800 border-slate-700">
                <SelectValue placeholder="Filter by rule" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="all">All Rules</SelectItem>
                {uniqueRules.map((rule) => (
                  <SelectItem key={rule.id} value={rule.id}>
                    {rule.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="border-slate-800">
                <TableHead className="text-slate-300">Status</TableHead>
                <TableHead className="text-slate-300">Rule</TableHead>
                <TableHead className="text-slate-300">Timestamp</TableHead>
                <TableHead className="text-slate-300">Trigger Data</TableHead>
                <TableHead className="text-slate-300">Actions</TableHead>
                <TableHead className="text-slate-300">Result</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExecutions.map((execution) => (
                <TableRow key={execution.id} className="border-slate-800">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(execution.status)}
                      <Badge className={getStatusColor(execution.status)}>
                        {execution.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-300">
                    <div>
                      <div className="font-medium">{execution.ruleName}</div>
                      <div className="text-xs text-slate-400">ID: {execution.ruleId}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-300">
                    {formatTimestamp(execution.timestamp)}
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      {Object.entries(execution.triggerData).map(([key, value]) => (
                        <div key={key} className="text-xs text-slate-400">
                          <span className="font-medium">{key}:</span> {value}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      {execution.actionsExecuted.map((action, index) => (
                        <div key={index} className="text-xs text-slate-300 mb-1">
                          • {action}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {execution.errorMessage ? (
                        <div className="text-xs text-red-400">
                          {execution.errorMessage}
                        </div>
                      ) : execution.status === 'success' ? (
                        <div className="text-xs text-green-400">
                          {execution.actionsExecuted.length} actions completed
                        </div>
                      ) : execution.status === 'pending' ? (
                        <div className="text-xs text-yellow-400">
                          Processing...
                        </div>
                      ) : (
                        <div className="text-xs text-slate-400">
                          No result
                        </div>
                      )}
                      <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <div>
                <p className="text-sm text-slate-400">Successful</p>
                <p className="text-xl font-bold text-white">
                  {executions.filter(e => e.status === 'success').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-400" />
              <div>
                <p className="text-sm text-slate-400">Failed</p>
                <p className="text-xl font-bold text-white">
                  {executions.filter(e => e.status === 'failed').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-400" />
              <div>
                <p className="text-sm text-slate-400">Pending</p>
                <p className="text-xl font-bold text-white">
                  {executions.filter(e => e.status === 'pending').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-cyan-400" />
              <div>
                <p className="text-sm text-slate-400">Success Rate</p>
                <p className="text-xl font-bold text-white">
                  {executions.length > 0 
                    ? Math.round((executions.filter(e => e.status === 'success').length / executions.length) * 100)
                    : 0}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RuleExecutions;
