
import { BedData, PatientData } from "@/types/bedManagement";
import { supabase } from "@/integrations/supabase/client";

export interface DataQualityMetrics {
  freshness: number;
  completeness: number;
  accuracy: number;
  lastUpdated: Date;
  staleDataCount: number;
  errorCount: number;
}

export interface ConnectionStatus {
  isConnected: boolean;
  latency: number;
  lastSync: Date;
  syncErrors: number;
  status: 'healthy' | 'warning' | 'error' | 'offline';
}

export interface RealTimeConfig {
  refreshInterval: number;
  enableVariations: boolean;
  variationIntensity: 'low' | 'medium' | 'high';
  simulateErrors: boolean;
  batchSize: number;
}

class RealTimeDataService {
  private config: RealTimeConfig = {
    refreshInterval: 30000,
    enableVariations: false,
    variationIntensity: 'low',
    simulateErrors: false,
    batchSize: 10
  };

  private subscribers: ((data: BedData[]) => void)[] = [];
  private qualitySubscribers: ((metrics: DataQualityMetrics) => void)[] = [];
  private connectionSubscribers: ((status: ConnectionStatus) => void)[] = [];
  
  private intervalId: NodeJS.Timeout | null = null;
  private connectionStatus: ConnectionStatus = {
    isConnected: true,
    latency: 0,
    lastSync: new Date(),
    syncErrors: 0,
    status: 'healthy'
  };

  private qualityMetrics: DataQualityMetrics = {
    freshness: 100,
    completeness: 100,
    accuracy: 100,
    lastUpdated: new Date(),
    staleDataCount: 0,
    errorCount: 0
  };

  updateConfig(newConfig: Partial<RealTimeConfig>) {
    this.config = { ...this.config, ...newConfig };
    this.restart();
  }

  getConfig() {
    return this.config;
  }

  getConnectionStatus() {
    return this.connectionStatus;
  }

  getQualityMetrics() {
    return this.qualityMetrics;
  }

  subscribe(callback: (data: BedData[]) => void) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  subscribeToQuality(callback: (metrics: DataQualityMetrics) => void) {
    this.qualitySubscribers.push(callback);
    return () => {
      this.qualitySubscribers = this.qualitySubscribers.filter(sub => sub !== callback);
    };
  }

  subscribeToConnection(callback: (status: ConnectionStatus) => void) {
    this.connectionSubscribers.push(callback);
    return () => {
      this.connectionSubscribers = this.connectionSubscribers.filter(sub => sub !== callback);
    };
  }

  start() {
    if (this.intervalId) return;
    
    this.intervalId = setInterval(() => {
      this.fetchAndUpdateData();
    }, this.config.refreshInterval);

    this.fetchAndUpdateData();
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  restart() {
    this.stop();
    this.start();
  }

  private async fetchAndUpdateData() {
    const startTime = Date.now();
    
    try {
      const bedData = await this.fetchRealBedData();
      
      const latency = Date.now() - startTime;
      this.updateConnectionStatus(latency, true);
      this.updateQualityMetrics(bedData);
      
      this.subscribers.forEach(callback => callback(bedData));
      
    } catch (error) {
      console.error('Real data fetch error:', error);
      this.updateConnectionStatus(0, false);
      this.qualityMetrics.errorCount++;
      this.subscribers.forEach(callback => callback([]));
    }
  }

  private async fetchRealBedData(): Promise<BedData[]> {
    try {
      const { data: beds, error: bedsError } = await supabase
        .from('beds')
        .select(`
          *,
          departments!inner(id, name, code, type)
        `)
        .is('deleted_at', null);

      if (bedsError) throw bedsError;

      if (!beds || beds.length === 0) {
        console.log('No bed data found - using real empty state');
        return this.createEmptyRealStructure();
      }

      const transformedData = this.transformToHierarchicalData(beds);
      return transformedData;
    } catch (error) {
      console.error('Error fetching real bed data:', error);
      return this.createEmptyRealStructure();
    }
  }

  private transformToHierarchicalData(beds: any[]): BedData[] {
    const hierarchicalData: BedData[] = [];
    
    const orgData = {
      id: 'org1',
      org: "Healthcare System",
      hospital: "Main Campus",
      department: "All Departments",
      ward: "System Wide",
      level: 'organization' as const,
      hasChildren: true,
      totalBeds: beds.length,
      plannedBeds: beds.length,
      occupiedBeds: beds.filter(b => b.status === 'OCCUPIED').length,
      assignedBeds: beds.filter(b => b.status === 'RESERVED').length,
      dirtyBeds: beds.filter(b => b.status === 'MAINTENANCE').length,
      confirmedDischarge: 0,
      potentialDischarge: 0,
      unassignedPatients: 0,
      transferOrders: 0,
      netAvailableBeds: beds.filter(b => b.status === 'AVAILABLE').length,
      availableBeds: beds.filter(b => b.status === 'AVAILABLE').length,
      occupancyRate: beds.length > 0 ? Math.round((beds.filter(b => b.status === 'OCCUPIED').length / beds.length) * 100) : 0,
      projectedRate: beds.length > 0 ? Math.round((beds.filter(b => b.status === 'OCCUPIED' || b.status === 'RESERVED').length / beds.length) * 100) : 0,
      lastUpdated: new Date().toISOString(),
      beds: [],
      patients: []
    };

    hierarchicalData.push(orgData);

    const departmentMap = new Map();
    beds.forEach(bed => {
      const deptKey = bed.departments.id;
      if (!departmentMap.has(deptKey)) {
        departmentMap.set(deptKey, {
          department: bed.departments,
          beds: []
        });
      }
      departmentMap.get(deptKey).beds.push(bed);
    });

    Array.from(departmentMap.entries()).forEach(([deptId, deptInfo], deptIndex) => {
      const deptBeds = deptInfo.beds;

      const deptData: BedData = {
        id: `d${deptIndex + 1}`,
        org: orgData.org,
        hospital: "Main Campus",
        department: deptInfo.department.name,
        ward: "All Wards",
        level: 'department',
        hasChildren: true,
        parentId: 'h1',
        totalBeds: deptBeds.length,
        plannedBeds: deptBeds.length,
        occupiedBeds: deptBeds.filter((b: any) => b.status === 'OCCUPIED').length,
        assignedBeds: deptBeds.filter((b: any) => b.status === 'RESERVED').length,
        dirtyBeds: deptBeds.filter((b: any) => b.status === 'MAINTENANCE').length,
        confirmedDischarge: 0,
        potentialDischarge: 0,
        unassignedPatients: 0,
        transferOrders: 0,
        netAvailableBeds: deptBeds.filter((b: any) => b.status === 'AVAILABLE').length,
        availableBeds: deptBeds.filter((b: any) => b.status === 'AVAILABLE').length,
        occupancyRate: deptBeds.length > 0 ? Math.round((deptBeds.filter((b: any) => b.status === 'OCCUPIED').length / deptBeds.length) * 100) : 0,
        projectedRate: deptBeds.length > 0 ? Math.round((deptBeds.filter((b: any) => b.status === 'OCCUPIED' || b.status === 'RESERVED').length / deptBeds.length) * 100) : 0,
        lastUpdated: new Date().toISOString(),
        beds: [],
        patients: []
      };

      hierarchicalData.push(deptData);
    });

    return hierarchicalData;
  }

  private createEmptyRealStructure(): BedData[] {
    return [
      {
        id: 'org1',
        org: "Healthcare System",
        hospital: "Main Campus",
        department: "All Departments",
        ward: "System Wide",
        level: 'organization',
        hasChildren: false,
        totalBeds: 0,
        plannedBeds: 0,
        occupiedBeds: 0,
        assignedBeds: 0,
        dirtyBeds: 0,
        confirmedDischarge: 0,
        potentialDischarge: 0,
        unassignedPatients: 0,
        transferOrders: 0,
        netAvailableBeds: 0,
        availableBeds: 0,
        occupancyRate: 0,
        projectedRate: 0,
        lastUpdated: new Date().toISOString(),
        beds: [],
        patients: []
      }
    ];
  }

  private updateConnectionStatus(latency: number, success: boolean) {
    this.connectionStatus = {
      ...this.connectionStatus,
      latency,
      lastSync: new Date(),
      isConnected: success,
      syncErrors: success ? 0 : this.connectionStatus.syncErrors + 1,
      status: success 
        ? (latency > 2000 ? 'warning' : 'healthy')
        : 'error'
    };
    
    this.connectionSubscribers.forEach(callback => callback(this.connectionStatus));
  }

  private updateQualityMetrics(data: BedData[]) {
    const now = new Date();
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
    
    const staleData = data.filter(item => 
      item.lastUpdated && new Date(item.lastUpdated) < fiveMinutesAgo
    );

    this.qualityMetrics = {
      freshness: data.length === 0 ? 100 : Math.max(0, 100 - (staleData.length / data.length) * 100),
      completeness: data.length === 0 ? 100 : this.calculateRealCompleteness(data),
      accuracy: data.length === 0 ? 100 : this.calculateRealAccuracy(data),
      lastUpdated: now,
      staleDataCount: staleData.length,
      errorCount: this.connectionStatus.syncErrors
    };
    
    this.qualitySubscribers.forEach(callback => callback(this.qualityMetrics));
  }

  private calculateRealCompleteness(data: BedData[]): number {
    if (data.length === 0) return 100;
    
    let totalFields = 0;
    let completedFields = 0;
    
    data.forEach(item => {
      const requiredFields = ['org', 'hospital', 'department', 'ward', 'totalBeds', 'occupancyRate'];
      totalFields += requiredFields.length;
      
      requiredFields.forEach(field => {
        if (item[field as keyof BedData] !== null && item[field as keyof BedData] !== undefined) {
          completedFields++;
        }
      });
    });
    
    return totalFields > 0 ? Math.round((completedFields / totalFields) * 100) : 100;
  }

  private calculateRealAccuracy(data: BedData[]): number {
    if (data.length === 0) return 100;
    
    let accuracyScore = 100;
    
    data.forEach(item => {
      if (item.occupiedBeds > item.totalBeds) accuracyScore -= 5;
      if (item.availableBeds > item.totalBeds) accuracyScore -= 5;
      if (item.occupancyRate > 100) accuracyScore -= 10;
    });
    
    return Math.max(0, accuracyScore);
  }
}

export const realTimeDataService = new RealTimeDataService();
