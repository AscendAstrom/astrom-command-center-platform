
export type SyncStatus = 'CONNECTED' | 'SYNCING' | 'ERROR' | 'PAUSED';

export interface DataSource {
  id: string;
  name: string;
  type: string;
  status: SyncStatus;
  ingestion_mode: string;
  records_count: number;
  last_sync: string | null;
  health_score: number;
  last_error: string | null;
}
