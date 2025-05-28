
import { BedData } from "@/types/bedManagement";

export interface DataQualityMetrics {
  freshness: number; // percentage
  completeness: number; // percentage
  accuracy: number; // percentage
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
  refreshInterval: number; // in milliseconds
  enableVariations: boolean;
  variationIntensity: 'low' | 'medium' | 'high';
  simulateErrors: boolean;
  batchSize: number;
}

class RealTimeDataService {
  private config: RealTimeConfig = {
    refreshInterval: 30000, // 30 seconds default
    enableVariations: true,
    variationIntensity: 'medium',
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
    completeness: 98.7,
    accuracy: 99.2,
    lastUpdated: new Date(),
    staleDataCount: 0,
    errorCount: 0
  };

  updateConfig(newConfig: Partial<RealTimeConfig>) {
    this.config = { ...this.config, ...newConfig };
    this.restart();
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

    // Initial fetch
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
      // Simulate network latency
      await new Promise(resolve => setTimeout(resolve, Math.random() * 200 + 50));
      
      // Get updated data with variations
      const { mockHierarchicalBedData } = await import("@/data/mockHierarchicalBedData");
      const updatedData = this.applyDataVariations([...mockHierarchicalBedData]);
      
      // Update connection status
      const latency = Date.now() - startTime;
      this.updateConnectionStatus(latency, true);
      
      // Update quality metrics
      this.updateQualityMetrics(updatedData);
      
      // Notify subscribers
      this.subscribers.forEach(callback => callback(updatedData));
      
    } catch (error) {
      console.error('Data fetch error:', error);
      this.updateConnectionStatus(0, false);
      this.qualityMetrics.errorCount++;
    }
  }

  private applyDataVariations(data: BedData[]): BedData[] {
    if (!this.config.enableVariations) return data;

    const intensityMultiplier = {
      low: 0.02,
      medium: 0.05,
      high: 0.1
    }[this.config.variationIntensity];

    return data.map(item => {
      // Skip organization level for variations
      if (item.level === 'organization') return item;

      const variation = (Math.random() - 0.5) * intensityMultiplier;
      const occupancyChange = Math.round(item.totalBeds * variation);
      
      const newOccupied = Math.max(0, Math.min(
        item.totalBeds, 
        item.occupiedBeds + occupancyChange
      ));
      
      const newDirty = Math.max(0, Math.min(
        item.totalBeds - newOccupied,
        item.dirtyBeds + Math.round((Math.random() - 0.5) * 2)
      ));

      const newAvailable = item.totalBeds - newOccupied - newDirty;
      const newOccupancyRate = Math.round((newOccupied / item.totalBeds) * 100);
      const newProjectedRate = Math.min(100, newOccupancyRate + Math.round((Math.random() - 0.3) * 10));

      return {
        ...item,
        occupiedBeds: newOccupied,
        dirtyBeds: newDirty,
        availableBeds: newAvailable,
        occupancyRate: newOccupancyRate,
        projectedRate: newProjectedRate,
        lastUpdated: new Date().toISOString(),
        // Simulate potential discharge and assignment changes
        potentialDischarge: Math.max(0, item.potentialDischarge + Math.round((Math.random() - 0.5) * 2)),
        assignedBeds: Math.max(0, item.assignedBeds + Math.round((Math.random() - 0.5) * 1))
      };
    });
  }

  private updateConnectionStatus(latency: number, success: boolean) {
    this.connectionStatus = {
      ...this.connectionStatus,
      latency,
      lastSync: new Date(),
      isConnected: success,
      syncErrors: success ? 0 : this.connectionStatus.syncErrors + 1,
      status: success 
        ? (latency > 1000 ? 'warning' : 'healthy')
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
      freshness: Math.max(0, 100 - (staleData.length / data.length) * 100),
      completeness: 98.7 + (Math.random() - 0.5) * 2, // Simulate slight variations
      accuracy: 99.2 + (Math.random() - 0.5) * 1,
      lastUpdated: now,
      staleDataCount: staleData.length,
      errorCount: this.qualityMetrics.errorCount
    };
    
    this.qualitySubscribers.forEach(callback => callback(this.qualityMetrics));
  }

  getConnectionStatus(): ConnectionStatus {
    return this.connectionStatus;
  }

  getQualityMetrics(): DataQualityMetrics {
    return this.qualityMetrics;
  }

  getConfig(): RealTimeConfig {
    return this.config;
  }
}

export const realTimeDataService = new RealTimeDataService();
