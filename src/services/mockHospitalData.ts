
export interface MockHospitalMetrics {
  // Emergency Department
  emergencyDepartment: {
    currentPatients: number;
    waitTime: number;
    criticalCases: number;
    bedUtilization: number;
    triageQueue: number;
    avgTreatmentTime: number;
    dischargeRate: number;
    hourlyAdmissions: Array<{ hour: string; admissions: number }>;
  };

  // ICU Metrics
  icu: {
    totalBeds: number;
    occupiedBeds: number;
    availableBeds: number;
    criticalPatients: number;
    avgStayDuration: number;
    mortalityRate: number;
    ventilatorUtilization: number;
    nursePatientRatio: number;
  };

  // Surgery Department
  surgery: {
    totalORs: number;
    activeORs: number;
    scheduledSurgeries: number;
    completedSurgeries: number;
    avgSurgeryTime: number;
    utilizationRate: number;
    emergencySurgeries: number;
    complications: number;
  };

  // Laboratory
  laboratory: {
    pendingTests: number;
    completedTests: number;
    avgTurnaroundTime: number;
    criticalResults: number;
    qualityScore: number;
    equipmentUptime: number;
    workload: number;
    techniciansOnDuty: number;
  };

  // Radiology
  radiology: {
    pendingStudies: number;
    completedStudies: number;
    avgReportTime: number;
    criticalFindings: number;
    modalityUtilization: Array<{ modality: string; utilization: number }>;
    radiologistsOnDuty: number;
    equipmentStatus: string;
    backlogHours: number;
  };

  // Pharmacy
  pharmacy: {
    prescriptionsProcessed: number;
    pendingOrders: number;
    inventoryLevel: number;
    expiringMedications: number;
    medicationErrors: number;
    avgDispenseTime: number;
    narcoticsTracking: number;
    pharmacistsOnDuty: number;
  };

  // Staffing
  staffing: {
    totalStaff: number;
    onDutyStaff: number;
    nursingRatio: number;
    overtimeHours: number;
    absences: number;
    floatPool: number;
    agencyStaff: number;
    staffSatisfaction: number;
  };

  // Financial
  financial: {
    dailyRevenue: number;
    operatingCosts: number;
    profitMargin: number;
    accountsReceivable: number;
    denialRate: number;
    lengthOfStay: number;
    costPerDischarge: number;
    budgetVariance: number;
  };

  // Quality Metrics
  quality: {
    patientSatisfaction: number;
    readmissionRate: number;
    hospitalAcquiredInfections: number;
    fallIncidents: number;
    medicationErrors: number;
    mortalityIndex: number;
    safetyScore: number;
    accreditationStatus: string;
  };

  // Equipment & Infrastructure
  equipment: {
    totalEquipment: number;
    operationalEquipment: number;
    maintenanceRequired: number;
    criticalFailures: number;
    utilizationRate: number;
    warrantyExpirations: number;
    energyConsumption: number;
    systemUptime: number;
  };
}

class MockHospitalDataService {
  private generateRandomValue(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private generateRandomFloat(min: number, max: number, decimals: number = 1): number {
    return Math.round((Math.random() * (max - min) + min) * Math.pow(10, decimals)) / Math.pow(10, decimals);
  }

  generateMockHospitalData(): MockHospitalMetrics {
    return {
      emergencyDepartment: {
        currentPatients: this.generateRandomValue(25, 65),
        waitTime: this.generateRandomValue(15, 120),
        criticalCases: this.generateRandomValue(2, 8),
        bedUtilization: this.generateRandomValue(70, 95),
        triageQueue: this.generateRandomValue(5, 20),
        avgTreatmentTime: this.generateRandomValue(30, 180),
        dischargeRate: this.generateRandomValue(65, 85),
        hourlyAdmissions: Array.from({ length: 24 }, (_, i) => ({
          hour: `${i}:00`,
          admissions: this.generateRandomValue(1, 8)
        }))
      },

      icu: {
        totalBeds: 40,
        occupiedBeds: this.generateRandomValue(28, 38),
        availableBeds: this.generateRandomValue(2, 12),
        criticalPatients: this.generateRandomValue(15, 25),
        avgStayDuration: this.generateRandomFloat(3.5, 7.2, 1),
        mortalityRate: this.generateRandomFloat(8.5, 15.2, 1),
        ventilatorUtilization: this.generateRandomValue(60, 85),
        nursePatientRatio: this.generateRandomFloat(1.8, 2.5, 1)
      },

      surgery: {
        totalORs: 18,
        activeORs: this.generateRandomValue(8, 16),
        scheduledSurgeries: this.generateRandomValue(24, 45),
        completedSurgeries: this.generateRandomValue(18, 35),
        avgSurgeryTime: this.generateRandomValue(90, 240),
        utilizationRate: this.generateRandomValue(75, 95),
        emergencySurgeries: this.generateRandomValue(3, 8),
        complications: this.generateRandomValue(0, 3)
      },

      laboratory: {
        pendingTests: this.generateRandomValue(45, 120),
        completedTests: this.generateRandomValue(280, 450),
        avgTurnaroundTime: this.generateRandomValue(25, 65),
        criticalResults: this.generateRandomValue(5, 15),
        qualityScore: this.generateRandomValue(92, 99),
        equipmentUptime: this.generateRandomValue(94, 99),
        workload: this.generateRandomValue(70, 95),
        techniciansOnDuty: this.generateRandomValue(8, 15)
      },

      radiology: {
        pendingStudies: this.generateRandomValue(15, 45),
        completedStudies: this.generateRandomValue(85, 150),
        avgReportTime: this.generateRandomValue(20, 90),
        criticalFindings: this.generateRandomValue(2, 8),
        modalityUtilization: [
          { modality: 'CT', utilization: this.generateRandomValue(70, 95) },
          { modality: 'MRI', utilization: this.generateRandomValue(60, 85) },
          { modality: 'X-Ray', utilization: this.generateRandomValue(80, 95) },
          { modality: 'Ultrasound', utilization: this.generateRandomValue(65, 90) }
        ],
        radiologistsOnDuty: this.generateRandomValue(4, 8),
        equipmentStatus: Math.random() > 0.2 ? 'Optimal' : 'Warning',
        backlogHours: this.generateRandomValue(2, 12)
      },

      pharmacy: {
        prescriptionsProcessed: this.generateRandomValue(180, 320),
        pendingOrders: this.generateRandomValue(25, 65),
        inventoryLevel: this.generateRandomValue(85, 98),
        expiringMedications: this.generateRandomValue(5, 20),
        medicationErrors: this.generateRandomValue(0, 3),
        avgDispenseTime: this.generateRandomValue(8, 25),
        narcoticsTracking: this.generateRandomValue(95, 100),
        pharmacistsOnDuty: this.generateRandomValue(5, 12)
      },

      staffing: {
        totalStaff: 1250,
        onDutyStaff: this.generateRandomValue(285, 420),
        nursingRatio: this.generateRandomFloat(4.2, 6.8, 1),
        overtimeHours: this.generateRandomValue(45, 120),
        absences: this.generateRandomValue(15, 35),
        floatPool: this.generateRandomValue(12, 25),
        agencyStaff: this.generateRandomValue(8, 18),
        staffSatisfaction: this.generateRandomValue(78, 92)
      },

      financial: {
        dailyRevenue: this.generateRandomValue(140000, 185000),
        operatingCosts: this.generateRandomValue(105000, 140000),
        profitMargin: this.generateRandomFloat(8.5, 18.2, 1),
        accountsReceivable: this.generateRandomValue(2800000, 3500000),
        denialRate: this.generateRandomFloat(4.2, 8.8, 1),
        lengthOfStay: this.generateRandomFloat(3.8, 5.2, 1),
        costPerDischarge: this.generateRandomValue(8500, 12500),
        budgetVariance: this.generateRandomFloat(-5.2, 8.5, 1)
      },

      quality: {
        patientSatisfaction: this.generateRandomFloat(4.1, 4.8, 1),
        readmissionRate: this.generateRandomFloat(8.2, 12.5, 1),
        hospitalAcquiredInfections: this.generateRandomValue(2, 8),
        fallIncidents: this.generateRandomValue(1, 5),
        medicationErrors: this.generateRandomValue(0, 4),
        mortalityIndex: this.generateRandomFloat(0.85, 1.15, 2),
        safetyScore: this.generateRandomValue(88, 96),
        accreditationStatus: Math.random() > 0.1 ? 'Accredited' : 'Under Review'
      },

      equipment: {
        totalEquipment: 850,
        operationalEquipment: this.generateRandomValue(720, 820),
        maintenanceRequired: this.generateRandomValue(15, 45),
        criticalFailures: this.generateRandomValue(0, 5),
        utilizationRate: this.generateRandomValue(78, 92),
        warrantyExpirations: this.generateRandomValue(8, 25),
        energyConsumption: this.generateRandomValue(85, 98),
        systemUptime: this.generateRandomFloat(98.2, 99.8, 1)
      }
    };
  }

  generateDepartmentSpecificData(department: string) {
    const baseData = this.generateMockHospitalData();
    
    switch (department.toLowerCase()) {
      case 'emergency':
        return {
          ...baseData.emergencyDepartment,
          departmentName: 'Emergency Department',
          alerts: this.generateRandomValue(1, 4),
          efficiency: this.generateRandomValue(82, 95)
        };
      
      case 'icu':
        return {
          ...baseData.icu,
          departmentName: 'Intensive Care Unit',
          alerts: this.generateRandomValue(0, 2),
          efficiency: this.generateRandomValue(88, 96)
        };
      
      case 'surgery':
        return {
          ...baseData.surgery,
          departmentName: 'Surgery Department',
          alerts: this.generateRandomValue(0, 3),
          efficiency: this.generateRandomValue(85, 94)
        };
      
      default:
        return baseData;
    }
  }
}

export const mockHospitalDataService = new MockHospitalDataService();
