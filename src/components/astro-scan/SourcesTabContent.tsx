
import React from 'react';
import { EnhancedDataSourceManager } from './EnhancedDataSourceManager';

interface SourcesTabContentProps {
  onAddSourceClick: () => void;
}

const SourcesTabContent = ({ onAddSourceClick }: SourcesTabContentProps) => {
  return <EnhancedDataSourceManager onAddSourceClick={onAddSourceClick} />;
};

export default SourcesTabContent;
