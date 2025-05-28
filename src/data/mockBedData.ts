
import { BedData } from "@/types/bedManagement";

export const mockBedData: BedData[] = [
  {
    id: "bed1",
    org: "Saudi Health Authority",
    hospital: "King Abdulaziz Medical City",
    department: "Emergency Department",
    ward: "ED-1 (Acute Care)",
    level: "ward",
    totalBeds: 25,
    plannedBeds: 24,
    occupiedBeds: 20,
    assignedBeds: 2,
    dirtyBeds: 1,
    confirmedDischarge: 1,
    potentialDischarge: 2,
    unassignedPatients: 0,
    transferOrders: 1,
    netAvailableBeds: 3,
    occupancyRate: 83,
    projectedRate: 92,
    arabicName: "قسم الطوارئ - الرعاية الحادة",
    mohCompliance: true,
    sehaCluster: "Central Riyadh"
  },
  {
    id: "bed2",
    org: "Saudi Health Authority",
    hospital: "King Abdulaziz Medical City",
    department: "Emergency Department",
    ward: "ED-2 (Trauma)",
    level: "ward",
    totalBeds: 18,
    plannedBeds: 18,
    occupiedBeds: 16,
    assignedBeds: 1,
    dirtyBeds: 0,
    confirmedDischarge: 0,
    potentialDischarge: 1,
    unassignedPatients: 1,
    transferOrders: 0,
    netAvailableBeds: 1,
    occupancyRate: 89,
    projectedRate: 95,
    arabicName: "قسم الطوارئ - الصدمات",
    mohCompliance: true,
    sehaCluster: "Central Riyadh"
  },
  {
    id: "bed3",
    org: "Saudi Health Authority",
    hospital: "King Abdulaziz Medical City",
    department: "Internal Medicine",
    ward: "IM-1 (General Medicine)",
    level: "ward",
    totalBeds: 30,
    plannedBeds: 28,
    occupiedBeds: 22,
    assignedBeds: 3,
    dirtyBeds: 1,
    confirmedDischarge: 1,
    potentialDischarge: 2,
    unassignedPatients: 1,
    transferOrders: 1,
    netAvailableBeds: 4,
    occupancyRate: 79,
    projectedRate: 89,
    arabicName: "الطب الباطني - عام",
    mohCompliance: true,
    sehaCluster: "Central Riyadh"
  },
  {
    id: "bed4",
    org: "Saudi Health Authority",
    hospital: "King Faisal Specialist Hospital",
    department: "Intensive Care",
    ward: "ICU-1 (General ICU)",
    level: "ward",
    totalBeds: 12,
    plannedBeds: 12,
    occupiedBeds: 11,
    assignedBeds: 1,
    dirtyBeds: 0,
    confirmedDischarge: 0,
    potentialDischarge: 1,
    unassignedPatients: 0,
    transferOrders: 0,
    netAvailableBeds: 1,
    occupancyRate: 92,
    projectedRate: 100,
    arabicName: "العناية المركزة - عام",
    mohCompliance: true,
    sehaCluster: "North Riyadh"
  }
];

export const occupancyThresholds = {
  normal: 75,
  warning: 90,
  critical: 95
};

export const mockKPIs = [
  {
    id: "kpi1",
    name: "Bed Occupancy Rate",
    value: 83,
    target: 85,
    unit: "%",
    trend: "up",
    hospital: "King Abdulaziz Medical City"
  },
  {
    id: "kpi2",
    name: "Average Length of Stay",
    value: 4.2,
    target: 4.0,
    unit: "days",
    trend: "stable",
    hospital: "King Abdulaziz Medical City"
  },
  {
    id: "kpi3",
    name: "Discharge Efficiency",
    value: 92,
    target: 90,
    unit: "%",
    trend: "up",
    hospital: "King Faisal Specialist Hospital"
  }
];
