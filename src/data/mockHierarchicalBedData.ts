
import { BedData, PatientData, BedDetail, RoomData } from "@/types/bedManagement";

// Mock patient data
const mockPatients: PatientData[] = [
  {
    id: "p1",
    nameAbbreviation: "A.M.",
    mrn: "MRN001234",
    los: 3,
    bedLocation: { department: "Emergency", ward: "ED-1", room: "101", bedNumber: "A" },
    estimatedDischargeDate: "2024-01-15T14:00:00Z",
    admissionDate: "2024-01-12T08:30:00Z",
    priority: "high"
  },
  {
    id: "p2",
    nameAbbreviation: "S.K.",
    mrn: "MRN005678",
    los: 1,
    bedLocation: { department: "Emergency", ward: "ED-1", room: "102", bedNumber: "B" },
    actualDischargeDate: "2024-01-15T10:30:00Z",
    admissionDate: "2024-01-14T16:45:00Z",
    priority: "medium"
  },
  {
    id: "p3",
    nameAbbreviation: "M.A.",
    mrn: "MRN009876",
    los: 7,
    bedLocation: { department: "Internal Medicine", ward: "IM-2", room: "201", bedNumber: "A" },
    estimatedDischargeDate: "2024-01-16T09:00:00Z",
    admissionDate: "2024-01-08T12:00:00Z",
    priority: "low"
  }
];

// Mock bed details
const mockBeds: BedDetail[] = [
  {
    id: "b1",
    bedNumber: "A",
    roomId: "r101",
    status: "occupied",
    patient: mockPatients[0],
    lastCleaned: "2024-01-12T06:00:00Z"
  },
  {
    id: "b2",
    bedNumber: "B",
    roomId: "r102",
    status: "dirty",
    lastCleaned: "2024-01-14T22:00:00Z",
    estimatedAvailable: "2024-01-15T12:00:00Z"
  },
  {
    id: "b3",
    bedNumber: "A",
    roomId: "r201",
    status: "occupied",
    patient: mockPatients[2],
    lastCleaned: "2024-01-08T10:00:00Z"
  },
  {
    id: "b4",
    bedNumber: "B",
    roomId: "r201",
    status: "evs-requested",
    lastCleaned: "2024-01-14T18:00:00Z"
  }
];

// Mock room data
const mockRooms: RoomData[] = [
  {
    id: "r101",
    roomNumber: "101",
    wardId: "w1",
    totalBeds: 2,
    occupiedBeds: 1,
    availableBeds: 1,
    beds: mockBeds.filter(b => b.roomId === "r101")
  },
  {
    id: "r102",
    roomNumber: "102",
    wardId: "w1",
    totalBeds: 2,
    occupiedBeds: 0,
    availableBeds: 1,
    beds: mockBeds.filter(b => b.roomId === "r102")
  },
  {
    id: "r201",
    roomNumber: "201",
    wardId: "w2",
    totalBeds: 2,
    occupiedBeds: 1,
    availableBeds: 0,
    beds: mockBeds.filter(b => b.roomId === "r201")
  }
];

const currentTimestamp = new Date().toISOString();

export const mockHierarchicalBedData: BedData[] = [
  // Organization Level
  {
    id: "org1",
    org: "Saudi Health Authority",
    hospital: "",
    department: "",
    ward: "",
    level: "organization",
    totalBeds: 1050,
    plannedBeds: 1000,
    occupiedBeds: 780,
    assignedBeds: 45,
    dirtyBeds: 32,
    confirmedDischarge: 15,
    potentialDischarge: 23,
    unassignedPatients: 8,
    transferOrders: 12,
    netAvailableBeds: 155,
    availableBeds: 188, // totalBeds - occupiedBeds - dirtyBeds
    occupancyRate: 78,
    projectedRate: 83,
    hasChildren: true,
    isExpanded: true,
    lastUpdated: currentTimestamp
  },
  // Hospital Level
  {
    id: "h1",
    org: "Saudi Health Authority",
    hospital: "King Abdulaziz Medical City",
    department: "",
    ward: "",
    level: "hospital",
    parentId: "org1",
    totalBeds: 450,
    plannedBeds: 420,
    occupiedBeds: 342,
    assignedBeds: 23,
    dirtyBeds: 15,
    confirmedDischarge: 8,
    potentialDischarge: 12,
    unassignedPatients: 4,
    transferOrders: 6,
    netAvailableBeds: 68,
    availableBeds: 93, // totalBeds - occupiedBeds - dirtyBeds
    occupancyRate: 81,
    projectedRate: 87,
    arabicName: "مدينة الملك عبدالعزيز الطبية",
    hasChildren: true,
    isExpanded: true,
    lastUpdated: currentTimestamp
  },
  {
    id: "h2",
    org: "Saudi Health Authority",
    hospital: "King Faisal Specialist Hospital",
    department: "",
    ward: "",
    level: "hospital",
    parentId: "org1",
    totalBeds: 320,
    plannedBeds: 300,
    occupiedBeds: 234,
    assignedBeds: 12,
    dirtyBeds: 8,
    confirmedDischarge: 4,
    potentialDischarge: 7,
    unassignedPatients: 2,
    transferOrders: 3,
    netAvailableBeds: 49,
    availableBeds: 78, // totalBeds - occupiedBeds - dirtyBeds
    occupancyRate: 78,
    projectedRate: 82,
    arabicName: "مستشفى الملك فيصل التخصصي",
    hasChildren: true,
    lastUpdated: currentTimestamp
  },
  // Department Level
  {
    id: "d1",
    org: "Saudi Health Authority",
    hospital: "King Abdulaziz Medical City",
    department: "Emergency Department",
    ward: "",
    level: "department",
    parentId: "h1",
    totalBeds: 85,
    plannedBeds: 80,
    occupiedBeds: 67,
    assignedBeds: 5,
    dirtyBeds: 3,
    confirmedDischarge: 2,
    potentialDischarge: 4,
    unassignedPatients: 1,
    transferOrders: 2,
    netAvailableBeds: 7,
    availableBeds: 15, // totalBeds - occupiedBeds - dirtyBeds
    occupancyRate: 84,
    projectedRate: 91,
    hasChildren: true,
    isExpanded: true,
    lastUpdated: currentTimestamp
  },
  {
    id: "d2",
    org: "Saudi Health Authority",
    hospital: "King Abdulaziz Medical City",
    department: "Internal Medicine",
    ward: "",
    level: "department",
    parentId: "h1",
    totalBeds: 120,
    plannedBeds: 115,
    occupiedBeds: 89,
    assignedBeds: 8,
    dirtyBeds: 4,
    confirmedDischarge: 3,
    potentialDischarge: 5,
    unassignedPatients: 2,
    transferOrders: 2,
    netAvailableBeds: 17,
    availableBeds: 27, // totalBeds - occupiedBeds - dirtyBeds
    occupancyRate: 77,
    projectedRate: 85,
    hasChildren: true,
    lastUpdated: currentTimestamp
  },
  // Ward Level
  {
    id: "w1",
    org: "Saudi Health Authority",
    hospital: "King Abdulaziz Medical City",
    department: "Emergency Department",
    ward: "ED-1 (Acute Care)",
    level: "ward",
    parentId: "d1",
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
    availableBeds: 4, // totalBeds - occupiedBeds - dirtyBeds
    occupancyRate: 83,
    projectedRate: 92,
    patients: mockPatients.filter(p => p.bedLocation.ward === "ED-1"),
    beds: mockBeds.filter(b => ["r101", "r102"].includes(b.roomId)),
    rooms: mockRooms.filter(r => r.wardId === "w1"),
    hasChildren: true,
    isExpanded: true,
    lastUpdated: currentTimestamp
  },
  {
    id: "w2",
    org: "Saudi Health Authority",
    hospital: "King Abdulaziz Medical City",
    department: "Internal Medicine",
    ward: "IM-2 (General Medicine)",
    level: "ward",
    parentId: "d2",
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
    availableBeds: 7, // totalBeds - occupiedBeds - dirtyBeds
    occupancyRate: 79,
    projectedRate: 89,
    patients: mockPatients.filter(p => p.bedLocation.ward === "IM-2"),
    beds: mockBeds.filter(b => b.roomId === "r201"),
    rooms: mockRooms.filter(r => r.wardId === "w2"),
    hasChildren: true,
    lastUpdated: currentTimestamp
  },
  // Room Level (NEW)
  {
    id: "room101",
    org: "Saudi Health Authority",
    hospital: "King Abdulaziz Medical City",
    department: "Emergency Department",
    ward: "ED-1 (Acute Care)",
    level: "room",
    parentId: "w1",
    totalBeds: 2,
    plannedBeds: 2,
    occupiedBeds: 1,
    assignedBeds: 1,
    dirtyBeds: 0,
    confirmedDischarge: 0,
    potentialDischarge: 1,
    unassignedPatients: 0,
    transferOrders: 0,
    netAvailableBeds: 1,
    availableBeds: 1, // totalBeds - occupiedBeds - dirtyBeds
    occupancyRate: 50,
    projectedRate: 50,
    beds: mockBeds.filter(b => b.roomId === "r101"),
    patients: mockPatients.filter(p => p.bedLocation.room === "101"),
    hasChildren: false,
    lastUpdated: currentTimestamp
  },
  {
    id: "room102",
    org: "Saudi Health Authority",
    hospital: "King Abdulaziz Medical City",
    department: "Emergency Department",
    ward: "ED-1 (Acute Care)",
    level: "room",
    parentId: "w1",
    totalBeds: 2,
    plannedBeds: 2,
    occupiedBeds: 0,
    assignedBeds: 0,
    dirtyBeds: 1,
    confirmedDischarge: 1,
    potentialDischarge: 0,
    unassignedPatients: 0,
    transferOrders: 0,
    netAvailableBeds: 1,
    availableBeds: 1, // totalBeds - occupiedBeds - dirtyBeds
    occupancyRate: 0,
    projectedRate: 0,
    beds: mockBeds.filter(b => b.roomId === "r102"),
    patients: mockPatients.filter(p => p.bedLocation.room === "102"),
    hasChildren: false,
    lastUpdated: currentTimestamp
  },
  {
    id: "room201",
    org: "Saudi Health Authority",
    hospital: "King Abdulaziz Medical City",
    department: "Internal Medicine",
    ward: "IM-2 (General Medicine)",
    level: "room",
    parentId: "w2",
    totalBeds: 2,
    plannedBeds: 2,
    occupiedBeds: 1,
    assignedBeds: 1,
    dirtyBeds: 1,
    confirmedDischarge: 0,
    potentialDischarge: 1,
    unassignedPatients: 0,
    transferOrders: 0,
    netAvailableBeds: 0,
    availableBeds: 0, // totalBeds - occupiedBeds - dirtyBeds
    occupancyRate: 50,
    projectedRate: 100,
    beds: mockBeds.filter(b => b.roomId === "r201"),
    patients: mockPatients.filter(p => p.bedLocation.room === "201"),
    hasChildren: false,
    lastUpdated: currentTimestamp
  }
];

export const occupancyThresholds = {
  normal: 75,
  warning: 90,
  critical: 95
};
