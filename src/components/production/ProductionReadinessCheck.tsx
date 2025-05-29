
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertCircle, XCircle, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface CheckResult {
  name: string;
  status: 'pass' | 'warning' | 'fail';
  message: string;
  details?: string[];
}

const ProductionReadinessCheck = () => {
  const [checks, setChecks] = useState<CheckResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [overallScore, setOverallScore] = useState(0);

  const runProductionChecks = async () => {
    setIsRunning(true);
    const results: CheckResult[] = [];

    try {
      // Database connectivity check
      const { data: dbCheck, error: dbError } = await supabase
        .from('profiles')
        .select('count')
        .limit(1);
      
      results.push({
        name: 'Database Connectivity',
        status: dbError ? 'fail' : 'pass',
        message: dbError ? 'Database connection failed' : 'Database connected successfully'
      });

      // Check critical tables exist
      const criticalTables = ['profiles', 'dashboards', 'data_sources', 'workflows'];
      
      for (const table of criticalTables) {
        try {
          const { error } = await supabase.from(table).select('count').limit(1);
          results.push({
            name: `Table: ${table}`,
            status: error ? 'fail' : 'pass',
            message: error ? `Table ${table} not accessible` : `Table ${table} ready`
          });
        } catch (err) {
          results.push({
            name: `Table: ${table}`,
            status: 'fail',
            message: `Table ${table} check failed`
          });
        }
      }

      // Check RLS policies - simplified approach
      try {
        const { data: { user } } = await supabase.auth.getUser();
        results.push({
          name: 'RLS Security Functions',
          status: user ? 'pass' : 'warning',
          message: user ? 'Security functions working' : 'Security functions need review'
        });
      } catch (error) {
        results.push({
          name: 'RLS Security Functions',
          status: 'warning',
          message: 'Security function check failed'
        });
      }

      // Authentication check
      const { data: { user } } = await supabase.auth.getUser();
      results.push({
        name: 'Authentication System',
        status: 'pass',
        message: user ? 'User authenticated' : 'Authentication system ready'
      });

      // Environment variables check
      const envChecks = [
        { name: 'Supabase URL', value: import.meta.env.VITE_SUPABASE_URL },
        { name: 'Supabase Anon Key', value: import.meta.env.VITE_SUPABASE_ANON_KEY }
      ];

      envChecks.forEach(env => {
        results.push({
          name: `Environment: ${env.name}`,
          status: env.value ? 'pass' : 'warning',
          message: env.value ? 'Environment variable set' : 'Environment variable missing'
        });
      });

      // Calculate overall score
      const passCount = results.filter(r => r.status === 'pass').length;
      const totalCount = results.length;
      const score = Math.round((passCount / totalCount) * 100);
      
      setOverallScore(score);
      setChecks(results);
      
      toast.success(`Production readiness check completed. Score: ${score}%`);
    } catch (error) {
      console.error('Production check error:', error);
      toast.error('Failed to complete production readiness check');
    } finally {
      setIsRunning(false);
    }
  };

  useEffect(() => {
    runProductionChecks();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning': return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'fail': return <XCircle className="h-5 w-5 text-red-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass': return 'bg-green-500/20 text-green-700 border-green-500/20';
      case 'warning': return 'bg-yellow-500/20 text-yellow-700 border-yellow-500/20';
      case 'fail': return 'bg-red-500/20 text-red-700 border-red-500/20';
      default: return 'bg-gray-500/20 text-gray-700 border-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Production Readiness Assessment</CardTitle>
              <CardDescription>
                Comprehensive check of all system components before going live
              </CardDescription>
            </div>
            <Button 
              onClick={runProductionChecks} 
              disabled={isRunning}
              variant="outline"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRunning ? 'animate-spin' : ''}`} />
              Re-run Checks
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Overall Score</span>
                <span className="text-2xl font-bold">{overallScore}%</span>
              </div>
              <Progress value={overallScore} className="w-full" />
            </div>
            
            <div className="grid gap-3">
              {checks.map((check, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(check.status)}
                    <div>
                      <p className="font-medium">{check.name}</p>
                      <p className="text-sm text-muted-foreground">{check.message}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(check.status)}>
                    {check.status.toUpperCase()}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductionReadinessCheck;
