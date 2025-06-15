
import { supabase } from '@/integrations/supabase/client';
import { ClinicalDataType } from '@/types/clinical';

export class ClinicalDataService {
  // Subscribe to real-time updates for a specific clinical data type
  static subscribeToUpdates(
    type: ClinicalDataType,
    callback: (payload: any) => void
  ) {
    const channel = supabase
      .channel(`clinical-${type}-changes`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: type
        },
        callback
      )
      .subscribe();

    return channel;
  }

  // Subscribe to patient-specific updates
  static subscribeToPatientUpdates(
    patientId: string,
    callback: (payload: any) => void
  ) {
    const tables = ['allergies', 'careplans', 'conditions', 'devices', 'encounters'];
    const channels = tables.map(table => 
      supabase
        .channel(`patient-${patientId}-${table}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table,
            filter: `patient_id=eq.${patientId}`
          },
          callback
        )
        .subscribe()
    );

    return channels;
  }

  // Log clinical data access for audit purposes
  static async logDataAccess(
    dataType: ClinicalDataType,
    dataId: string,
    action: 'VIEW' | 'EXPORT' | 'MODIFY',
    userId?: string
  ) {
    try {
      await supabase.from('audit_logs').insert({
        action: `CLINICAL_DATA_${action}`,
        resource_type: dataType,
        resource_id: dataId,
        user_id: userId,
        details: {
          timestamp: new Date().toISOString(),
          data_type: dataType
        }
      });
    } catch (error) {
      console.error('Failed to log data access:', error);
    }
  }

  // Export clinical data to CSV
  static async exportToCsv(
    type: ClinicalDataType,
    data: any[],
    patientId?: string
  ): Promise<string> {
    if (!data || data.length === 0) {
      throw new Error('No data to export');
    }

    // Get column headers from the first item
    const headers = Object.keys(data[0]).filter(key => 
      !key.includes('patient') && !key.includes('encounter') && key !== 'id'
    );

    // Create CSV content
    const csvHeaders = headers.join(',');
    const csvRows = data.map(item => 
      headers.map(header => {
        const value = item[header];
        if (value === null || value === undefined) return '';
        if (typeof value === 'string' && value.includes(',')) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    ).join('\n');

    const csvContent = `${csvHeaders}\n${csvRows}`;

    // Log the export action
    await this.logDataAccess(type, patientId || 'all', 'EXPORT');

    return csvContent;
  }

  // Generate clinical data insights
  static generateInsights(data: any[], type: ClinicalDataType) {
    if (!data || data.length === 0) {
      return {
        totalRecords: 0,
        dateRange: null,
        insights: []
      };
    }

    const insights = {
      totalRecords: data.length,
      dateRange: {
        earliest: new Date(Math.min(...data.map(d => new Date(d.start_date).getTime()))),
        latest: new Date(Math.max(...data.map(d => new Date(d.start_date).getTime())))
      },
      insights: [] as string[]
    };

    // Generate type-specific insights
    switch (type) {
      case 'encounters':
        const encounterClasses = [...new Set(data.map(d => d.encounter_class).filter(Boolean))];
        const avgCost = data.reduce((sum, d) => sum + (d.total_claim_cost || 0), 0) / data.length;
        insights.insights.push(
          `${encounterClasses.length} different encounter types`,
          `Average cost: $${avgCost.toFixed(2)}`
        );
        break;
      
      case 'conditions':
        const activeConditions = data.filter(d => !d.stop_date).length;
        insights.insights.push(
          `${activeConditions} active conditions`,
          `${data.length - activeConditions} resolved conditions`
        );
        break;
      
      case 'allergies':
        const severityDistribution = data.reduce((acc, d) => {
          const severity = d.code?.toLowerCase().includes('severe') ? 'severe' : 'mild';
          acc[severity] = (acc[severity] || 0) + 1;
          return acc;
        }, {});
        insights.insights.push(
          `Severity distribution: ${Object.entries(severityDistribution).map(([k, v]) => `${k}: ${v}`).join(', ')}`
        );
        break;
      
      default:
        insights.insights.push(`${data.length} total records`);
    }

    return insights;
  }
}
