
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
  availableBeds?: number; // Calculated field
  occupancyRate: number;
  projectedRate: number;
  arabicName?: string;
  mohCompliance?: boolean;
  sehaCluster?: string;
  lastUpdated?: string; // For real-time simulation
  // New fields for Epic 3.1
  rooms?: RoomData[];
  patients?: PatientData[];
  beds?: BedDetail[];
  level: 'organization' | 'hospital' | 'department' | 'ward' | 'room';
  isExpanded?: boolean;
  hasChildren?: boolean;
  parentId?: string;
  id: string;
}

export interface RoomData {
  id: string;
  roomNumber: string;
  wardId: string;
  totalBeds: number;
  occupiedBeds: number;
  availableBeds: number;
  beds: BedDetail[];
}

export interface BedDetail {
  id: string;
  bedNumber: string;
  roomId: string;
  status: 'occupied' | 'available' | 'dirty' | 'evs-requested' | 'evs-accepted' | 'evs-assigned' | 'maintenance';
  patient?: PatientData;
  lastCleaned?: string;
  estimatedAvailable?: string;
}

export interface PatientData {
  id: string;
  nameAbbreviation: string;
  mrn: string;
  los: number; // Length of stay in days
  bedLocation: {
    department: string;
    ward: string;
    room: string;
    bedNumber: string;
  };
  estimatedDischargeDate?: string;
  actualDischargeDate?: string;
  admissionDate: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
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

export interface OccupancyThresholds {
  normal: number; // 0-75%
  warning: number; // 75-90%
  critical: number; // 90%+
}
