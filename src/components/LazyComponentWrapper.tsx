
import { Suspense, ComponentType } from 'react';
import { LoadingSpinner } from '@/components/LoadingSpinner';

interface LazyComponentWrapperProps {
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export const LazyComponentWrapper = ({ 
  fallback = <LoadingSpinner size="lg" text="Loading component..." />, 
  children 
}: LazyComponentWrapperProps) => {
  return (
    <Suspense fallback={
      <div className="min-h-[400px] flex items-center justify-center">
        {fallback}
      </div>
    }>
      {children}
    </Suspense>
  );
};

export const withLazyLoading = <T extends object>(
  Component: ComponentType<T>,
  loadingText?: string
) => {
  return (props: T) => (
    <LazyComponentWrapper 
      fallback={<LoadingSpinner size="lg" text={loadingText} />}
    >
      <Component {...props} />
    </LazyComponentWrapper>
  );
};
