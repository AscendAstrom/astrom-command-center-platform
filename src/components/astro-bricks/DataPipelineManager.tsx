
import React, { useState, useEffect } from 'react';
import { useDataPipelines } from '@/hooks/useDataPipelines';
import { PipelineListCard } from './components/PipelineListCard';
import { PipelineDetailsCard } from './components/PipelineDetailsCard';
import { PipelineStepsCard } from './components/PipelineStepsCard';
import { VersionHistoryCard } from './components/VersionHistoryCard';
import { EmptyPipelineState } from './components/EmptyPipelineState';

interface DataPipelineManagerProps {
  readOnly?: boolean;
}

export const DataPipelineManager = ({ readOnly = false }: DataPipelineManagerProps) => {
  const { pipelines, loading, createPipeline, updatePipeline, deletePipeline, executePipeline } = useDataPipelines();
  const [selectedPipeline, setSelectedPipeline] = useState<any>(null);
  const [showVersionHistory, setShowVersionHistory] = useState(false);

  // Select first pipeline when pipelines load
  useEffect(() => {
    if (pipelines.length > 0 && !selectedPipeline) {
      setSelectedPipeline(pipelines[0]);
    }
  }, [pipelines, selectedPipeline]);

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

  const createNewPipeline = async () => {
    try {
      const newPipeline = await createPipeline({
        name: 'New Pipeline',
        description: 'Description for new pipeline',
        target_schema: {},
        transformation_rules: {},
        status: 'DRAFT'
      });
      
      setSelectedPipeline(newPipeline);
    } catch (error) {
      console.error('Failed to create pipeline:', error);
    }
  };

  const handleCreatePipeline = () => {
    if (readOnly) return;
    createNewPipeline();
  };

  const handleTogglePipeline = async (pipelineId: string) => {
    if (readOnly) return;
    
    const pipeline = pipelines.find(p => p.id === pipelineId);
    if (!pipeline) return;

    const newStatus = pipeline.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';
    
    try {
      await updatePipeline(pipelineId, { status: newStatus });
    } catch (error) {
      console.error('Failed to toggle pipeline:', error);
    }
  };

  const handleExecutePipeline = async (pipelineId: string) => {
    try {
      await executePipeline(pipelineId);
    } catch (error) {
      console.error('Failed to execute pipeline:', error);
    }
  };

  const handleDeletePipeline = async (pipelineId: string) => {
    if (readOnly) return;
    
    try {
      await deletePipeline(pipelineId);
      if (selectedPipeline?.id === pipelineId) {
        setSelectedPipeline(pipelines.length > 1 ? pipelines.find(p => p.id !== pipelineId) : null);
      }
    } catch (error) {
      console.error('Failed to delete pipeline:', error);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="animate-pulse bg-gray-200 rounded-lg h-96"></div>
        <div className="lg:col-span-2 animate-pulse bg-gray-200 rounded-lg h-96"></div>
      </div>
    );
  }

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
        onDeletePipeline={handleDeletePipeline}
        onExecutePipeline={handleExecutePipeline}
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
              onUpdatePipeline={updatePipeline}
            />

            {/* Pipeline Steps */}
            <PipelineStepsCard 
              pipeline={selectedPipeline} 
              onUpdatePipeline={updatePipeline}
              readOnly={readOnly}
            />

            {/* Version History */}
            {showVersionHistory && (
              <VersionHistoryCard pipeline={selectedPipeline} />
            )}
          </div>
        ) : (
          <EmptyPipelineState onCreatePipeline={handleCreatePipeline} />
        )}
      </div>
    </div>
  );
};
