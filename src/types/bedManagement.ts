
export interface BedData {
  org: string;
  hospital: string;
  department: string;
  ward: string;
  totalBeds: number;
  plannedBeds: number;
  occupiedBeds: number;
  assignedBeds: number;
  dirtyBeds: number;
  confirmedDischarge: number;
  potentialDischarge: number;
  unassignedPatients: number;
  transferOrders: number;
  netAvailableBeds: number;
  occupancyRate: number;
  projectedRate: number;
  arabicName?: string;
  mohCompliance?: boolean;
  sehaCluster?: string;
}

export interface DataSource {
  id: string;
  name: string;
  hospital: string;
  type: 'HL7' | 'EMS' | 'HIS' | 'ETOC';
  status: 'active' | 'inactive' | 'error';
  lastSync: string;
  recordsPerHour: number;
}

export interface KPIMetric {
  id: string;
  name: string;
  value: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  hospital: string;
  department: string;
}
