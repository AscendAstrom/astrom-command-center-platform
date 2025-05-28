
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Shield, Edit, UserCheck, Crown, Eye } from "lucide-react";
import { DataAccessRule, MetricsUserRole } from './types';

interface AccessControlProps {
  userRole: MetricsUserRole | null;
}

const AccessControl = ({ userRole }: AccessControlProps) => {
  const [accessRules, setAccessRules] = useState<DataAccessRule[]>([
    {
      id: '1',
      roleType: 'admin',
      permissions: {
        canCreate: true,
        canEdit: true,
        canApprove: true,
        canDelete: true,
        canViewAll: true
      },
      restrictions: {
        allowedKPICategories: ['operational', 'clinical', 'financial', 'quality'],
        allowedZones: ['all'],
        dataRetentionDays: 365
      }
    },
    {
      id: '2',
      roleType: 'analyst',
      permissions: {
        canCreate: true,
        canEdit: true,
        canApprove: false,
        canDelete: false,
        canViewAll: true
      },
      restrictions: {
        allowedKPICategories: ['operational', 'clinical'],
        allowedZones: ['Emergency Department', 'ICU', 'Medical Ward'],
        dataRetentionDays: 90
      }
    },
    {
      id: '3',
      roleType: 'viewer',
      permissions: {
        canCreate: false,
        canEdit: false,
        canApprove: false,
        canDelete: false,
        canViewAll: false
      },
      restrictions: {
        allowedKPICategories: ['operational'],
        allowedZones: ['Emergency Department'],
        dataRetentionDays: 30
      }
    }
  ]);

  const canManage = userRole === 'ADMIN';

  const getRoleIcon = (roleType: string) => {
    switch (roleType) {
      case 'admin': return <Crown className="h-4 w-4" />;
      case 'analyst': return <UserCheck className="h-4 w-4" />;
      case 'viewer': return <Eye className="h-4 w-4" />;
      default: return <Users className="h-4 w-4" />;
    }
  };

  const getRoleColor = (roleType: string) => {
    switch (roleType) {
      case 'admin': return 'text-red-400';
      case 'analyst': return 'text-blue-400';
      case 'viewer': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const togglePermission = (ruleId: string, permission: keyof DataAccessRule['permissions']) => {
    if (!canManage) return;
    
    setAccessRules(accessRules.map(rule => 
      rule.id === ruleId 
        ? { 
            ...rule, 
            permissions: { 
              ...rule.permissions, 
              [permission]: !rule.permissions[permission] 
            } 
          }
        : rule
    ));
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="h-5 w-5 text-cyan-400" />
            Role-Based Access Control
          </CardTitle>
          <CardDescription>Configure data access permissions by user role</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-800">
                <TableHead className="text-slate-300">Role</TableHead>
                <TableHead className="text-slate-300">Create</TableHead>
                <TableHead className="text-slate-300">Edit</TableHead>
                <TableHead className="text-slate-300">Approve</TableHead>
                <TableHead className="text-slate-300">Delete</TableHead>
                <TableHead className="text-slate-300">View All</TableHead>
                <TableHead className="text-slate-300">Data Retention</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accessRules.map((rule) => (
                <TableRow key={rule.id} className="border-slate-800">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={getRoleColor(rule.roleType)}>
                        {getRoleIcon(rule.roleType)}
                      </div>
                      <span className="text-white font-medium capitalize">
                        {rule.roleType}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={rule.permissions.canCreate}
                      onCheckedChange={() => togglePermission(rule.id, 'canCreate')}
                      disabled={!canManage}
                    />
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={rule.permissions.canEdit}
                      onCheckedChange={() => togglePermission(rule.id, 'canEdit')}
                      disabled={!canManage}
                    />
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={rule.permissions.canApprove}
                      onCheckedChange={() => togglePermission(rule.id, 'canApprove')}
                      disabled={!canManage}
                    />
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={rule.permissions.canDelete}
                      onCheckedChange={() => togglePermission(rule.id, 'canDelete')}
                      disabled={!canManage}
                    />
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={rule.permissions.canViewAll}
                      onCheckedChange={() => togglePermission(rule.id, 'canViewAll')}
                      disabled={!canManage}
                    />
                  </TableCell>
                  <TableCell className="text-slate-300">
                    {rule.restrictions.dataRetentionDays} days
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">KPI Category Access</CardTitle>
            <CardDescription>Configure which KPI categories each role can access</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {accessRules.map((rule) => (
                <div key={rule.id} className="p-4 bg-slate-800 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <div className={getRoleColor(rule.roleType)}>
                      {getRoleIcon(rule.roleType)}
                    </div>
                    <span className="text-white font-medium capitalize">
                      {rule.roleType}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {rule.restrictions.allowedKPICategories.map((category) => (
                      <Badge key={category} variant="outline" className="text-cyan-400 border-cyan-400">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Zone Access Control</CardTitle>
            <CardDescription>Configure which zones each role can access</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {accessRules.map((rule) => (
                <div key={rule.id} className="p-4 bg-slate-800 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <div className={getRoleColor(rule.roleType)}>
                      {getRoleIcon(rule.roleType)}
                    </div>
                    <span className="text-white font-medium capitalize">
                      {rule.roleType}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {rule.restrictions.allowedZones.map((zone) => (
                      <Badge key={zone} variant="outline" className="text-green-400 border-green-400">
                        {zone === 'all' ? 'All Zones' : zone}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccessControl;
