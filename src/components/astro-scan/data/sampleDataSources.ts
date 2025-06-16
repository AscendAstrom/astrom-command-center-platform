
export const sampleDataSources = [
  {
    id: '1',
    name: 'Saudi MOH FHIR Gateway',
    type: 'FHIR_R4',
    status: 'ACTIVE',
    description: 'Ministry of Health FHIR R4 compliant data gateway for national health records',
    health_score: 96,
    records_count: 2500000,
    last_sync: new Date(Date.now() - 120000), // 2 minutes ago
    metadata: {
      endpoint: 'https://fhir.moh.gov.sa/api/v1',
      version: '4.0.1',
      authentication: 'OAuth2',
      rate_limit: '1000/hour'
    },
    tags: ['government', 'fhir', 'national']
  },
  {
    id: '2',
    name: 'Riyadh General Hospital EHR',
    type: 'HL7_V2',
    status: 'ACTIVE',
    description: 'Main hospital electronic health record system with comprehensive patient data',
    health_score: 94,
    records_count: 890000,
    last_sync: new Date(Date.now() - 300000), // 5 minutes ago
    metadata: {
      endpoint: 'hl7://rgh.local:6661',
      version: '2.5.1',
      authentication: 'Certificate',
      messages_per_day: 15000
    },
    tags: ['ehr', 'hl7', 'primary']
  },
  {
    id: '3',
    name: 'King Fahd Hospital Labs',
    type: 'LIS',
    status: 'ACTIVE',
    description: 'Laboratory Information System providing real-time test results and analytics',
    health_score: 98,
    records_count: 450000,
    last_sync: new Date(Date.now() - 60000), // 1 minute ago
    metadata: {
      endpoint: 'https://lis.kfh.sa/api',
      version: '3.2.1',
      authentication: 'API_Key',
      test_types: 245
    },
    tags: ['laboratory', 'tests', 'realtime']
  },
  {
    id: '4',
    name: 'PACS Imaging Network',
    type: 'DICOM',
    status: 'WARNING',
    description: 'Picture Archiving and Communication System for medical imaging',
    health_score: 87,
    records_count: 125000,
    last_sync: new Date(Date.now() - 2700000), // 45 minutes ago
    metadata: {
      endpoint: 'dicom://pacs.hospital.local:11112',
      version: '3.0',
      authentication: 'AE_Title',
      storage_size: '12.5TB'
    },
    tags: ['imaging', 'dicom', 'radiology']
  },
  {
    id: '5',
    name: 'Pharmacy Management System',
    type: 'CUSTOM_API',
    status: 'ACTIVE',
    description: 'Medication dispensing and inventory management system',
    health_score: 91,
    records_count: 67000,
    last_sync: new Date(Date.now() - 480000), // 8 minutes ago
    metadata: {
      endpoint: 'https://pharmacy.local/api/v2',
      version: '2.1.0',
      authentication: 'Bearer_Token',
      medication_database: 'Saudi_FDA'
    },
    tags: ['pharmacy', 'medications', 'inventory']
  },
  {
    id: '6',
    name: 'Emergency Services Network',
    type: 'REAL_TIME_STREAM',
    status: 'ACTIVE',
    description: 'Real-time data stream from emergency department monitoring systems',
    health_score: 95,
    records_count: 234000,
    last_sync: new Date(Date.now() - 180000), // 3 minutes ago
    metadata: {
      endpoint: 'wss://emergency.local/stream',
      version: '1.0',
      authentication: 'WebSocket_Token',
      stream_rate: '50/second'
    },
    tags: ['emergency', 'realtime', 'monitoring']
  },
  {
    id: '7',
    name: 'Insurance Claims Portal',
    type: 'SOAP_API',
    status: 'PAUSED',
    description: 'Insurance claims processing and reimbursement data',
    health_score: 75,
    records_count: 156000,
    last_sync: new Date(Date.now() - 7200000), // 2 hours ago
    metadata: {
      endpoint: 'https://claims.insurance.sa/soap/v1',
      version: '1.2',
      authentication: 'SOAP_Header',
      claim_types: 15
    },
    tags: ['insurance', 'claims', 'billing']
  },
  {
    id: '8',
    name: 'Bed Management System',
    type: 'REST_API',
    status: 'ACTIVE',
    description: 'Real-time bed occupancy and management data',
    health_score: 99,
    records_count: 45000,
    last_sync: new Date(Date.now() - 30000), // 30 seconds ago
    metadata: {
      endpoint: 'https://beds.local/api/v1',
      version: '1.5.2',
      authentication: 'OAuth2',
      update_frequency: 'real-time'
    },
    tags: ['beds', 'occupancy', 'management']
  }
];
