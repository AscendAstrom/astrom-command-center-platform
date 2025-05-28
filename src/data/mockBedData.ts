
import { BedData, DataSource, KPIMetric } from '@/types/bedManagement';

export const mockBedData: BedData[] = [
  {
    org: "NGHA Riyadh",
    hospital: "King Abdulaziz Medical City",
    department: "ICU",
    ward: "Ward A",
    totalBeds: 40,
    plannedBeds: 36,
    occupiedBeds: 32,
    assignedBeds: 2,
    dirtyBeds: 1,
    confirmedDischarge: 3,
    potentialDischarge: 1,
    unassignedPatients: 1,
    transferOrders: 1,
    netAvailableBeds: 5,
    occupancyRate: 89,
    projectedRate: 94,
    arabicName: "مدينة الملك عبدالعزيز الطبية",
    mohCompliance: true,
    sehaCluster: "Riyadh Cluster"
  },
  {
    org: "NGHA Riyadh",
    hospital: "King Abdulaziz Medical City",
    department: "General Medicine",
    ward: "Ward B",
    totalBeds: 50,
    plannedBeds: 45,
    occupiedBeds: 41,
    assignedBeds: 2,
    dirtyBeds: 0,
    confirmedDischarge: 2,
    potentialDischarge: 2,
    unassignedPatients: 0,
    transferOrders: 0,
    netAvailableBeds: 4,
    occupancyRate: 91,
    projectedRate: 97,
    arabicName: "مدينة الملك عبدالعزيز الطبية",
    mohCompliance: true,
    sehaCluster: "Riyadh Cluster"
  },
  {
    org: "NGHA Jeddah",
    hospital: "King Faisal Specialist Hospital",
    department: "Cardiology",
    ward: "Ward C",
    totalBeds: 30,
    plannedBeds: 28,
    occupiedBeds: 25,
    assignedBeds: 1,
    dirtyBeds: 1,
    confirmedDischarge: 1,
    potentialDischarge: 1,
    unassignedPatients: 2,
    transferOrders: 1,
    netAvailableBeds: 3,
    occupancyRate: 89,
    projectedRate: 95,
    arabicName: "مستشفى الملك فيصل التخصصي",
    mohCompliance: true,
    sehaCluster: "Jeddah Cluster"
  },
  {
    org: "MOH Mecca",
    hospital: "Mecca General Hospital",
    department: "Emergency",
    ward: "ED Zone 1",
    totalBeds: 60,
    plannedBeds: 55,
    occupiedBeds: 52,
    assignedBeds: 3,
    dirtyBeds: 2,
    confirmedDischarge: 1,
    potentialDischarge: 3,
    unassignedPatients: 5,
    transferOrders: 2,
    netAvailableBeds: 8,
    occupancyRate: 95,
    projectedRate: 98,
    arabicName: "مستشفى مكة العام",
    mohCompliance: true,
    sehaCluster: "Mecca Cluster"
  }
];

export const mockDataSources: DataSource[] = [
  {
    id: "ds-001",
    name: "KAMC HL7 Gateway",
    hospital: "King Abdulaziz Medical City",
    type: "HL7",
    status: "active",
    lastSync: "2024-01-15T10:30:00Z",
    recordsPerHour: 1200
  },
  {
    id: "ds-002",
    name: "KFSH HIS System",
    hospital: "King Faisal Specialist Hospital",
    type: "HIS",
    status: "active",
    lastSync: "2024-01-15T10:28:00Z",
    recordsPerHour: 800
  },
  {
    id: "ds-003",
    name: "Mecca EMS Feed",
    hospital: "Mecca General Hospital",
    type: "EMS",
    status: "active",
    lastSync: "2024-01-15T10:32:00Z",
    recordsPerHour: 400
  }
];

export const mockKPIs: KPIMetric[] = [
  {
    id: "kpi-001",
    name: "Average Bed Turnover Time",
    value: 4.2,
    target: 4.0,
    unit: "hours",
    trend: "down",
    hospital: "King Abdulaziz Medical City",
    department: "ICU"
  },
  {
    id: "kpi-002",
    name: "Occupancy Rate",
    value: 89,
    target: 85,
    unit: "%",
    trend: "up",
    hospital: "King Abdulaziz Medical City",
    department: "ICU"
  },
  {
    id: "kpi-003",
    name: "Discharge Planning Efficiency",
    value: 92,
    target: 90,
    unit: "%",
    trend: "stable",
    hospital: "King Faisal Specialist Hospital",
    department: "Cardiology"
  }
];
