
import React, { useEffect, useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { productionConfig, validateProductionConfig } from '@/config/production';
import { useProductionMonitoring } from '@/hooks/useProductionMonitoring';

interface ProductionGuardProps {
  children: React.ReactNode;
}

export const ProductionGuard: React.FC<ProductionGuardProps> = ({ children }) => {
  const [isConfigValid, setIsConfigValid] = useState<boolean | null>(null);
  const [configErrors, setConfigErrors] = useState<string[]>([]);
  
  // Initialize production monitoring
  useProductionMonitoring();

  useEffect(() => {
    try {
      validateProductionConfig();
      setIsConfigValid(true);
      setConfigErrors([]);
    } catch (error) {
      setIsConfigValid(false);
      setConfigErrors([error instanceof Error ? error.message : 'Configuration error']);
    }
  }, []);

  // Show loading state while validating
  if (isConfigValid === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Validating production configuration...</p>
        </div>
      </div>
    );
  }

  // Show configuration errors
  if (!isConfigValid) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-2xl mx-auto">
          <Alert className="border-red-500 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            <AlertDescription className="text-red-700">
              <strong>Production Configuration Error</strong>
              <ul className="mt-2 space-y-1">
                {configErrors.map((error, index) => (
                  <li key={index} className="text-sm">• {error}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  // Production environment indicator
  const ProductionIndicator = () => (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
        <CheckCircle className="h-3 w-3" />
        PRODUCTION
      </div>
    </div>
  );

  return (
    <>
      {productionConfig.environment === 'production' && <ProductionIndicator />}
      {children}
    </>
  );
};
