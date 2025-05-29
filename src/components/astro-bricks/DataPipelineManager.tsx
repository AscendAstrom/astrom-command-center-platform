
import React, { useState, useEffect } from 'react';
import { DataPipeline } from './types';
import { PipelineListCard } from './components/PipelineListCard';
import { PipelineDetailsCard } from './components/PipelineDetailsCard';
import { PipelineStepsCard } from './components/PipelineStepsCard';
import { VersionHistoryCard } from './components/VersionHistoryCard';
import { EmptyPipelineState } from './components/EmptyPipelineState';

interface DataPipelineManagerProps {
  readOnly?: boolean;
}

export const DataPipelineManager = ({ readOnly = false }: DataPipelineManagerProps) => {
  const [pipelines, setPipelines] = useState<DataPipeline[]>([
    {
      id: '1',
      name: 'ED Patient Intake Pipeline',
      description: 'Process emergency department patient admission data',
      version: 3,
      status: 'active',
      schedule: '*/15 * * * *',
      steps: [
        { id: 's1', type: 'extract', name: 'Extract HL7 Messages', config: {}, order: 1 },
        { id: 's2', type: 'transform', name: 'Clean Timestamps', config: {}, order: 2 },
        { id: 's3', type: 'transform', name: 'Map to Schema', config: {}, order: 3 },
        { id: 's4', type: 'load', name: 'Load to Warehouse', config: {}, order: 4 }
      ],
      createdAt: '2024-01-10',
      updatedAt: '2024-01-16',
      createdBy: 'john.doe@hospital.com'
    },
    {
      id: '2',
      name: 'Zone Capacity Monitoring',
      description: 'Track and analyze treatment zone capacity',
      version: 1,
      status: 'draft',
      steps: [
        { id: 's5', type: 'extract', name: 'Extract Zone Data', config: {}, order: 1 },
        { id: 's6', type: 'transform', name: 'Calculate Metrics', config: {}, order: 2 },
        { id: 's7', type: 'load', name: 'Update Dashboard', config: {}, order: 3 }
      ],
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15',
      createdBy: 'jane.smith@hospital.com'
    }
  ]);

  const [selectedPipeline, setSelectedPipeline] = useState<DataPipeline | null>(pipelines[0]);
  const [showVersionHistory, setShowVersionHistory] = useState(false);

  // Listen for create pipeline events from the header
  useEffect(() => {
    const handleCreatePipeline = () => {
      if (!readOnly) {
        createNewPipeline();
      }
    };

    window.addEventListener('createPipeline', handleCreatePipeline);
    return () => window.removeEventListener('createPipeline', handleCreatePipeline);
  }, [readOnly]);

  const createNewPipeline = () => {
    const newPipeline: DataPipeline = {
      id: Date.now().toString(),
      name: 'New Pipeline',
      description: 'Description for new pipeline',
      version: 1,
      status: 'draft',
      steps: [],
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      createdBy: 'current.user@hospital.com'
    };
    
    setPipelines(prev => [...prev, newPipeline]);
    setSelectedPipeline(newPipeline);
  };

  const handleCreatePipeline = () => {
    if (readOnly) return;
    createNewPipeline();
  };

  const handleTogglePipeline = (pipelineId: string) => {
    if (readOnly) return;
    
    setPipelines(prev => prev.map(pipeline => 
      pipeline.id === pipelineId 
        ? { 
            ...pipeline, 
            status: pipeline.status === 'active' ? 'draft' : 'active',
            updatedAt: new Date().toISOString().split('T')[0]
          }
        : pipeline
    ));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Pipeline List */}
      <PipelineListCard
        pipelines={pipelines}
        selectedPipeline={selectedPipeline}
        readOnly={readOnly}
        onCreatePipeline={handleCreatePipeline}
        onSelectPipeline={setSelectedPipeline}
        onTogglePipeline={handleTogglePipeline}
      />

      {/* Pipeline Details */}
      <div className="lg:col-span-2">
        {selectedPipeline ? (
          <div className="space-y-4">
            {/* Pipeline Header */}
            <PipelineDetailsCard
              pipeline={selectedPipeline}
              readOnly={readOnly}
              onToggleVersionHistory={() => setShowVersionHistory(!showVersionHistory)}
            />

            {/* Pipeline Steps */}
            <PipelineStepsCard pipeline={selectedPipeline} />

            {/* Version History */}
            {showVersionHistory && (
              <VersionHistoryCard pipeline={selectedPipeline} />
            )}
          </div>
        ) : (
          <EmptyPipelineState />
        )}
      </div>
    </div>
  );
};
