
// Production environment configuration
export const productionConfig = {
  // Environment settings
  environment: 'production',
  apiVersion: 'v1',
  
  // Performance settings
  performance: {
    cacheTimeout: 300000, // 5 minutes
    maxRetries: 3,
    requestTimeout: 30000, // 30 seconds
    batchSize: 100,
    refreshInterval: 30000, // 30 seconds for real-time data
  },

  // Security settings
  security: {
    maxLoginAttempts: 5,
    lockoutDuration: 900000, // 15 minutes
    sessionTimeout: 3600000, // 1 hour
    requireMFA: false, // Set to true for enhanced security
    passwordMinLength: 8,
    requireStrongPassword: true,
  },

  // Monitoring and logging
  monitoring: {
    enableErrorTracking: true,
    enablePerformanceTracking: true,
    enableUserAnalytics: false, // HIPAA compliance
    logLevel: 'error', // Only log errors in production
    enableRealTimeMonitoring: true,
  },

  // Data processing
  dataProcessing: {
    maxFileSize: 10485760, // 10MB
    allowedFileTypes: ['.csv', '.txt', '.json', '.xml'],
    processingTimeout: 300000, // 5 minutes
    maxRecordsPerBatch: 1000,
  },

  // API rate limiting
  rateLimiting: {
    enabled: true,
    windowMs: 900000, // 15 minutes
    maxRequests: 1000, // per window
    skipSuccessfulRequests: false,
  },

  // Feature flags
  features: {
    enableAdvancedAnalytics: true,
    enablePredictiveModels: true,
    enableRealTimeAlerts: true,
    enableAuditLogging: true,
    enableDataValidation: true,
  }
};

// Production validation
export const validateProductionConfig = () => {
  const requiredEnvVars = [
    'SUPABASE_URL',
    'SUPABASE_ANON_KEY'
  ];

  const missing = requiredEnvVars.filter(envVar => !process.env[envVar]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  return true;
};
