import React, { useState } from 'react';
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
  const [pipelines, setPipelines] = useState<DataPipeline[]>([]);
  const [selectedPipeline, setSelectedPipeline] = useState<DataPipeline | null>(null);
  const [showVersionHistory, setShowVersionHistory] = useState(false);

  const handleCreatePipeline = () => {
    if (readOnly) return;
    
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
