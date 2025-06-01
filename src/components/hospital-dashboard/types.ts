
export interface HospitalMetrics {
  totalBeds: number;
  occupiedBeds: number;
  availableBeds: number;
  reservedBeds: number;
  todayAdmissions: number;
  scheduledDischarges: number;
  completedDischarges: number;
  transfersInProgress: number;
  delayedTransfers: number;
  autoRerouted: number;
  edQueueCount: number;
  avgWaitTime: number;
  slaCompliance: number;
  slaBreach: number;
  staffOnDuty: number;
  predictedShortfall: number;
  openAlerts: number;
  resolvedAlerts: number;
  avgResponseTime: number;
  isolationRoomsUsed: number;
  infectionRisk: number;
  equipmentAvailable: {
    stretchers: number;
    ventilators: number;
    pumps: number;
  };
  lowStockItems: number;
  replenishmentETA: string;
  todayIncidents: number;
  frequentIncidentType: string;
}

export interface BedUnit {
  id: string;
  name: string;
  total: number;
  occupied: number;
  available: number;
  reserved: number;
}

export interface EDStatus {
  level: 'green' | 'orange' | 'red';
  description: string;
}

export interface AIInsight {
  type: 'forecast' | 'recommendation' | 'alert' | 'optimization';
  message: string;
  confidence: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
}
