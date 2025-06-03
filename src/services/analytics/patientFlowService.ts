
import { supabase } from '@/integrations/supabase/client';

export interface PatientFlowEvent {
  id: string;
  patient_id: string;
  event_type: 'arrival' | 'triage' | 'treatment' | 'discharge' | 'transfer';
  department_id: string;
  timestamp: string;
  details: any;
}

export interface FlowSummary {
  arrivals: number;
  completions: number;
  pending: number;
}

export class PatientFlowService {
  async getFlowSummary(hours = 24): Promise<FlowSummary[]> {
    try {
      const since = new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();

      const { data, error } = await supabase
        .from('patient_flow_events')
        .select('event_type, timestamp')
        .gte('timestamp', since)
        .order('timestamp', { ascending: true });

      if (error) {
        console.error('Error fetching patient flow:', error);
        return this.getDefaultFlowData();
      }

      // Group events by 4-hour intervals
      const intervals: FlowSummary[] = [];
      const intervalHours = 4;
      const numIntervals = hours / intervalHours;

      for (let i = 0; i < numIntervals; i++) {
        const intervalStart = new Date(Date.now() - (numIntervals - i) * intervalHours * 60 * 60 * 1000);
        const intervalEnd = new Date(intervalStart.getTime() + intervalHours * 60 * 60 * 1000);

        const intervalEvents = (data || []).filter(event => {
          const eventTime = new Date(event.timestamp);
          return eventTime >= intervalStart && eventTime < intervalEnd;
        });

        const arrivals = intervalEvents.filter(e => e.event_type === 'arrival').length;
        const completions = intervalEvents.filter(e => e.event_type === 'discharge').length;
        const treatments = intervalEvents.filter(e => e.event_type === 'treatment').length;

        intervals.push({
          arrivals,
          completions,
          pending: Math.max(0, arrivals - completions + treatments)
        });
      }

      return intervals;
    } catch (error) {
      console.error('Error fetching patient flow:', error);
      return this.getDefaultFlowData();
    }
  }

  private getDefaultFlowData(): FlowSummary[] {
    return [
      { arrivals: 0, completions: 0, pending: 0 },
      { arrivals: 0, completions: 0, pending: 0 },
      { arrivals: 0, completions: 0, pending: 0 },
      { arrivals: 0, completions: 0, pending: 0 },
      { arrivals: 0, completions: 0, pending: 0 },
      { arrivals: 0, completions: 0, pending: 0 },
    ];
  }

  async recordPatientEvent(
    patientId: string,
    eventType: PatientFlowEvent['event_type'],
    departmentId: string,
    details: any = {}
  ): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('patient_flow_events')
        .insert({
          patient_id: patientId,
          event_type: eventType,
          department_id: departmentId,
          details,
          timestamp: new Date().toISOString()
        });

      if (error) {
        console.error('Error recording patient event:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error recording patient event:', error);
      return false;
    }
  }
}

export const patientFlowService = new PatientFlowService();
