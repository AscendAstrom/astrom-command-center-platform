
export const mockIngestionLogs = [
  {
    id: "log-001",
    data_source_id: "epic-main-campus",
    status: "success",
    started_at: "2024-05-28T10:25:00Z",
    completed_at: "2024-05-28T10:30:00Z",
    records_processed: 1250,
    message: "Successfully processed patient admission records from Epic EMR",
    error_details: null,
    data_sources: {
      name: "Epic EMR - Main Campus",
      type: "EPIC"
    }
  },
  {
    id: "log-002",
    data_source_id: "epic-pediatric-wing",
    status: "running",
    started_at: "2024-05-28T10:28:00Z",
    completed_at: null,
    records_processed: 890,
    message: "Processing pediatric patient data batch",
    error_details: null,
    data_sources: {
      name: "Epic EMR - Pediatric Wing",
      type: "EPIC"
    }
  },
  {
    id: "log-003",
    data_source_id: "epic-emergency-dept",
    status: "success",
    started_at: "2024-05-28T10:20:00Z",
    completed_at: "2024-05-28T10:22:00Z",
    records_processed: 456,
    message: "Emergency department vitals and triage data synchronized",
    error_details: null,
    data_sources: {
      name: "Epic EMR - Emergency Department",
      type: "EPIC"
    }
  },
  {
    id: "log-004",
    data_source_id: "epic-outpatient-clinic",
    status: "error",
    started_at: "2024-05-28T10:15:00Z",
    completed_at: "2024-05-28T10:16:00Z",
    records_processed: 0,
    message: "Authentication failed during data retrieval",
    error_details: {
      error_code: "AUTH_TOKEN_EXPIRED",
      error_message: "Authentication token has expired",
      retry_count: 3,
      last_retry: "2024-05-28T10:16:00Z"
    },
    data_sources: {
      name: "Epic EMR - Outpatient Clinic",
      type: "EPIC"
    }
  },
  {
    id: "log-005",
    data_source_id: "epic-surgical-unit",
    status: "success",
    started_at: "2024-05-28T10:10:00Z",
    completed_at: "2024-05-28T10:14:00Z",
    records_processed: 324,
    message: "Surgical procedures and post-op data ingested successfully",
    error_details: null,
    data_sources: {
      name: "Epic EMR - Surgical Unit",
      type: "EPIC"
    }
  },
  {
    id: "log-006",
    data_source_id: "epic-main-campus",
    status: "success",
    started_at: "2024-05-28T10:05:00Z",
    completed_at: "2024-05-28T10:08:00Z",
    records_processed: 2100,
    message: "Lab results and diagnostic imaging metadata synchronized",
    error_details: null,
    data_sources: {
      name: "Epic EMR - Main Campus",
      type: "EPIC"
    }
  },
  {
    id: "log-007",
    data_source_id: "epic-pediatric-wing",
    status: "success",
    started_at: "2024-05-28T10:00:00Z",
    completed_at: "2024-05-28T10:03:00Z",
    records_processed: 567,
    message: "Pediatric immunization records updated",
    error_details: null,
    data_sources: {
      name: "Epic EMR - Pediatric Wing",
      type: "EPIC"
    }
  },
  {
    id: "log-008",
    data_source_id: "epic-emergency-dept",
    status: "completed",
    started_at: "2024-05-28T09:55:00Z",
    completed_at: "2024-05-28T09:58:00Z",
    records_processed: 789,
    message: "Emergency department discharge summaries processed",
    error_details: null,
    data_sources: {
      name: "Epic EMR - Emergency Department",
      type: "EPIC"
    }
  }
];
