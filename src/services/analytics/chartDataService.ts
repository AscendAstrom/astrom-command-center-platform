
import { AnalyticsData, ChartDataPoint } from './types';

export class ChartDataService {
  private chartHistory: any = {};

  initializeChartHistory() {
    const now = new Date();
    const points = 20;
    
    // Initialize wait times history
    this.chartHistory.waitTimes = Array.from({ length: points }, (_, i) => ({
      time: new Date(now.getTime() - (points - i) * 60000).toISOString(),
      waitTime: 25 + Math.random() * 10 - 5,
      targetTime: 30
    }));

    // Initialize patient flow history
    this.chartHistory.patientFlow = Array.from({ length: points }, (_, i) => ({
      time: new Date(now.getTime() - (points - i) * 60000).toISOString(),
      admissions: 5 + Math.floor(Math.random() * 5),
      discharges: 4 + Math.floor(Math.random() * 4)
    }));

    // Initialize processing throughput
    this.chartHistory.processingThroughput = Array.from({ length: points }, (_, i) => ({
      time: new Date(now.getTime() - (points - i) * 60000).toISOString(),
      throughput: 1100 + Math.random() * 200 - 100,
      target: 1200
    }));

    // Initialize data quality
    this.chartHistory.dataQuality = Array.from({ length: points }, (_, i) => ({
      time: new Date(now.getTime() - (points - i) * 60000).toISOString(),
      quality: 98 + Math.random() * 2 - 1,
      completeness: 97 + Math.random() * 3 - 1.5
    }));

    // Initialize revenue
    this.chartHistory.revenue = Array.from({ length: points }, (_, i) => ({
      time: new Date(now.getTime() - (points - i) * 3600000).toISOString(),
      revenue: 12000 + Math.random() * 2000 - 1000,
      target: 13000
    }));

    // Initialize system health
    this.chartHistory.systemHealth = Array.from({ length: points }, (_, i) => ({
      time: new Date(now.getTime() - (points - i) * 60000).toISOString(),
      cpu: 45 + Math.random() * 20 - 10,
      memory: 67 + Math.random() * 15 - 7,
      network: 15 + Math.random() * 10 - 5
    }));

    // Initialize model performance
    this.chartHistory.modelPerformance = Array.from({ length: points }, (_, i) => ({
      time: new Date(now.getTime() - (points - i) * 3600000).toISOString(),
      accuracy: 94 + Math.random() * 4 - 2,
      confidence: 87 + Math.random() * 10 - 5
    }));
  }

  updateChartHistory(newData: AnalyticsData) {
    const now = new Date().toISOString();
    const maxPoints = 20;

    // Update wait times
    this.chartHistory.waitTimes.push({
      time: now,
      waitTime: newData.emergencyDepartment.avgWaitTime,
      targetTime: 30
    });
    if (this.chartHistory.waitTimes.length > maxPoints) {
      this.chartHistory.waitTimes.shift();
    }

    // Update patient flow
    this.chartHistory.patientFlow.push({
      time: now,
      admissions: 5 + Math.floor(Math.random() * 5),
      discharges: 4 + Math.floor(Math.random() * 4)
    });
    if (this.chartHistory.patientFlow.length > maxPoints) {
      this.chartHistory.patientFlow.shift();
    }

    // Update processing throughput
    this.chartHistory.processingThroughput.push({
      time: now,
      throughput: newData.dataPipeline.processingSpeed,
      target: 1200
    });
    if (this.chartHistory.processingThroughput.length > maxPoints) {
      this.chartHistory.processingThroughput.shift();
    }

    // Update data quality
    this.chartHistory.dataQuality.push({
      time: now,
      quality: newData.dataPipeline.dataQuality,
      completeness: 97 + Math.random() * 3 - 1.5
    });
    if (this.chartHistory.dataQuality.length > maxPoints) {
      this.chartHistory.dataQuality.shift();
    }

    // Update revenue (hourly)
    if (this.chartHistory.revenue.length === 0 || 
        new Date().getHours() !== new Date(this.chartHistory.revenue[this.chartHistory.revenue.length - 1].time).getHours()) {
      this.chartHistory.revenue.push({
        time: now,
        revenue: newData.business.revenue,
        target: 13000
      });
      if (this.chartHistory.revenue.length > maxPoints) {
        this.chartHistory.revenue.shift();
      }
    }

    // Update system health
    this.chartHistory.systemHealth.push({
      time: now,
      cpu: newData.systemHealth.cpuUsage,
      memory: newData.systemHealth.memoryUsage,
      network: newData.systemHealth.networkLatency
    });
    if (this.chartHistory.systemHealth.length > maxPoints) {
      this.chartHistory.systemHealth.shift();
    }

    // Update model performance (hourly)
    if (this.chartHistory.modelPerformance.length === 0 || 
        new Date().getHours() !== new Date(this.chartHistory.modelPerformance[this.chartHistory.modelPerformance.length - 1].time).getHours()) {
      this.chartHistory.modelPerformance.push({
        time: now,
        accuracy: newData.aiMetrics.modelAccuracy,
        confidence: newData.aiMetrics.predictionConfidence
      });
      if (this.chartHistory.modelPerformance.length > maxPoints) {
        this.chartHistory.modelPerformance.shift();
      }
    }
  }

  getChartData() {
    return this.chartHistory;
  }
}
