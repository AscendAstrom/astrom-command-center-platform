
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User, AlertTriangle } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { emptyStateMessages } from "@/config/constants";

interface PatientTimer {
  id: string;
  patientName: string;
  waitTime: number;
  priority: 'high' | 'medium' | 'low';
  department: string;
  status: string;
}

const PatientTimerWidget = () => {
  const [patients, setPatients] = useState<PatientTimer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatientData();
  }, []);

  const fetchPatientData = async () => {
    try {
      setLoading(true);
      const { data: waitTimes, error } = await supabase
        .from('wait_times')
        .select(`
          id,
          arrival_time,
          priority_level,
          patients!inner(first_name, last_name),
          departments!inner(name)
        `)
        .is('discharge_time', null)
        .order('arrival_time', { ascending: true })
        .limit(10);

      if (error) {
        console.error('Error fetching patient wait times:', error);
        setPatients([]);
        return;
      }

      if (!waitTimes || waitTimes.length === 0) {
        setPatients([]);
        return;
      }

      const patientTimers: PatientTimer[] = waitTimes.map(wait => {
        const arrivalTime = new Date(wait.arrival_time);
        const now = new Date();
        const waitMinutes = Math.floor((now.getTime() - arrivalTime.getTime()) / (1000 * 60));
        
        let priority: 'high' | 'medium' | 'low' = 'medium';
        if (wait.priority_level <= 2) priority = 'high';
        else if (wait.priority_level >= 4) priority = 'low';

        const patient = Array.isArray(wait.patients) ? wait.patients[0] : wait.patients;
        const department = Array.isArray(wait.departments) ? wait.departments[0] : wait.departments;

        return {
          id: wait.id,
          patientName: `${patient?.first_name || 'Unknown'} ${patient?.last_name || 'Patient'}`,
          waitTime: waitMinutes,
          priority,
          department: department?.name || 'Unknown',
          status: 'waiting'
        };
      });

      setPatients(patientTimers);
    } catch (error) {
      console.error('Error fetching patient data:', error);
      setPatients([]);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/10 text-red-600 border-red-500/20';
      case 'medium': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      default: return 'bg-green-500/10 text-green-600 border-green-500/20';
    }
  };

  const formatWaitTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  if (loading) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Patient Wait Times
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-14 bg-muted rounded-lg"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (patients.length === 0) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Patient Wait Times
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <User className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
            <h4 className="font-semibold text-foreground mb-2">No Waiting Patients</h4>
            <p className="text-sm text-muted-foreground">
              {emptyStateMessages.readyForRealData}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Patient Wait Times
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {patients.map((patient) => (
          <div key={patient.id} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">{patient.patientName}</h4>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={getPriorityColor(patient.priority)}>
                  {patient.priority}
                </Badge>
                {patient.waitTime > 120 && (
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                )}
              </div>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{patient.department}</span>
              <span className="font-medium">{formatWaitTime(patient.waitTime)}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default PatientTimerWidget;
