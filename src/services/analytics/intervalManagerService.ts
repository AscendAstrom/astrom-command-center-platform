
export class IntervalManagerService {
  private intervalId: NodeJS.Timeout | null = null;
  private refreshInterval = 2000;

  start(callback: () => void): void {
    if (this.intervalId) return;
    
    this.intervalId = setInterval(callback, this.refreshInterval);
  }

  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  restart(callback: () => void): void {
    this.stop();
    this.start(callback);
  }

  setRefreshInterval(interval: number): void {
    this.refreshInterval = interval;
  }

  getRefreshInterval(): number {
    return this.refreshInterval;
  }

  isRunning(): boolean {
    return this.intervalId !== null;
  }
}

export const intervalManagerService = new IntervalManagerService();
