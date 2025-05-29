
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

// Browser-safe environment variable access
const getEnvVar = (key: string): string | undefined => {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined') {
    // For production builds, these should be injected at build time
    // or configured through the deployment environment
    const envVars: Record<string, string> = {
      'SUPABASE_URL': 'https://emlsdrnbnyfhenniqxuk.supabase.co',
      'SUPABASE_ANON_KEY': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtbHNkcm5ibnlmaGVubmlxeHVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MzU1MzksImV4cCI6MjA2NDAxMTUzOX0.X7cYZvtx2d5zM3AUmddtIxkbEkZOhLHEbxsE_oX4pvM'
    };
    return envVars[key];
  }
  
  // For Node.js environments (SSR, build time)
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key];
  }
  
  return undefined;
};

// Production validation
export const validateProductionConfig = () => {
  const requiredEnvVars = [
    'SUPABASE_URL',
    'SUPABASE_ANON_KEY'
  ];

  const missing = requiredEnvVars.filter(envVar => !getEnvVar(envVar));
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  return true;
};

// Export environment variables for use in the app
export const env = {
  SUPABASE_URL: getEnvVar('SUPABASE_URL') || 'https://emlsdrnbnyfhenniqxuk.supabase.co',
  SUPABASE_ANON_KEY: getEnvVar('SUPABASE_ANON_KEY') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtbHNkcm5ibnlmaGVubmlxeHVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MzU1MzksImV4cCI6MjA2NDAxMTUzOX0.X7cYZvtx2d5zM3AUmddtIxkbEkZOhLHEbxsE_oX4pvM'
};
