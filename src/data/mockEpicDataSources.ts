
import { DataSource } from "@/components/astro-scan/types";

export const mockEpicDataSources: DataSource[] = [
  {
    id: "epic-main-campus",
    name: "Epic EMR - Main Campus",
    type: "EPIC",
    status: "CONNECTED",
    ingestion_mode: "STREAM",
    records_count: 125678,
    last_sync: "2024-05-28T10:30:00Z",
    health_score: 98,
    last_error: null
  },
  {
    id: "epic-pediatric-wing",
    name: "Epic EMR - Pediatric Wing",
    type: "EPIC",
    status: "SYNCING",
    ingestion_mode: "BATCH",
    records_count: 45329,
    last_sync: "2024-05-28T09:45:00Z",
    health_score: 95,
    last_error: null
  },
  {
    id: "epic-emergency-dept",
    name: "Epic EMR - Emergency Department",
    type: "EPIC",
    status: "CONNECTED",
    ingestion_mode: "STREAM",
    records_count: 89543,
    last_sync: "2024-05-28T10:32:00Z",
    health_score: 97,
    last_error: null
  },
  {
    id: "epic-outpatient-clinic",
    name: "Epic EMR - Outpatient Clinic",
    type: "EPIC",
    status: "ERROR",
    ingestion_mode: "BATCH",
    records_count: 32156,
    last_sync: "2024-05-28T08:15:00Z",
    health_score: 75,
    last_error: "Authentication token expired"
  },
  {
    id: "epic-surgical-unit",
    name: "Epic EMR - Surgical Unit",
    type: "EPIC",
    status: "PAUSED",
    ingestion_mode: "STREAM",
    records_count: 67890,
    last_sync: "2024-05-27T22:30:00Z",
    health_score: 88,
    last_error: null
  }
];
