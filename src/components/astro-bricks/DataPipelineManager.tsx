
import React, { useState } from 'react';
import { DataPipeline } from './types';
import { PipelineListCard } from './components/PipelineListCard';
import { PipelineDetailsCard } from './components/PipelineDetailsCard';
import { PipelineStepsCard } from './components/PipelineStepsCard';
import { VersionHistoryCard } from './components/VersionHistoryCard';
import { EmptyPipelineState } from './components/EmptyPipelineState';
import { useDataPipelines } from './hooks/useDataPipelines';
import { toast } from 'sonner';

interface DataPipelineManagerProps {
  readOnly?: boolean;
}

export const DataPipelineManager = ({ readOnly = false }: DataPipelineManagerProps) => {
  const { pipelines, createPipeline, updatePipeline, isLoading } = useDataPipelines();
  const [selectedPipeline, setSelectedPipeline] = useState<DataPipeline | null>(null);
  const [showVersionHistory, setShowVersionHistory] = useState(false);

  const handleCreatePipeline = async () => {
    if (readOnly) return;
    
    const newPipeline: Partial<DataPipeline> = {
      name: 'New Pipeline',
      description: 'Description for new pipeline',
      status: 'DRAFT',
      steps: [],
      createdBy: 'current.user@hospital.com'
    };
    
    try {
      const created = await createPipeline(newPipeline);
      setSelectedPipeline(created);
      toast.success("Pipeline created.");
    } catch(e) {
      toast.error("Failed to create pipeline.");
    }
  };

  const handleTogglePipeline = async (pipelineId: string) => {
    if (readOnly) return;
    
    const pipeline = pipelines.find(p => p.id === pipelineId);
    if (pipeline) {
      try {
        await updatePipeline({
          ...pipeline,
          status: pipeline.status === 'active' ? 'draft' : 'active',
        });
        toast.success("Pipeline status updated.");
        if(selectedPipeline?.id === pipelineId) {
          setSelectedPipeline({
            ...selectedPipeline,
            status: pipeline.status === 'active' ? 'draft' : 'active',
          });
        }
      } catch (e) {
        toast.error("Failed to update pipeline status.");
      }
    }
  };
  
  if (isLoading) {
    return <div>Loading pipelines...</div>;
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
