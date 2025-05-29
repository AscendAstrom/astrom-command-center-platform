
import React from 'react';
import { DataSourceManager } from './DataSourceManager';

interface SourcesTabContentProps {
  onAddSourceClick: () => void;
}

const SourcesTabContent = ({ onAddSourceClick }: SourcesTabContentProps) => {
  return <DataSourceManager />;
};

export default SourcesTabContent;
