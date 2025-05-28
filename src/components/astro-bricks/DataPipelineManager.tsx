
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Pause, 
  Save, 
  Plus, 
  GitBranch,
  Clock,
  User,
  Settings,
  History,
  Eye
} from 'lucide-react';
import { DataPipeline, PipelineStep } from './types';

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

  const getStatusColor = (status: DataPipeline['status']) => {
    switch (status) {
      case 'active': return 'text-green-400 border-green-400';
      case 'draft': return 'text-yellow-400 border-yellow-400';
      case 'deprecated': return 'text-red-400 border-red-400';
      default: return 'text-slate-400 border-slate-400';
    }
  };

  const getStepTypeColor = (type: PipelineStep['type']) => {
    switch (type) {
      case 'extract': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'transform': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'load': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

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
      <Card className="bg-slate-800/30 border-slate-700">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-white text-lg">Data Pipelines</CardTitle>
            {!readOnly && (
              <Button size="sm" onClick={handleCreatePipeline}>
                <Plus className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {pipelines.map((pipeline) => (
            <div
              key={pipeline.id}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                selectedPipeline?.id === pipeline.id
                  ? 'bg-cyan-500/20 border-cyan-500/50'
                  : 'bg-slate-700/30 border-slate-600 hover:border-slate-500'
              }`}
              onClick={() => setSelectedPipeline(pipeline)}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium text-white text-sm">{pipeline.name}</span>
                <Badge variant="outline" className={`text-xs ${getStatusColor(pipeline.status)}`}>
                  {pipeline.status.toUpperCase()}
                </Badge>
              </div>
              
              <p className="text-xs text-slate-400 mb-2 line-clamp-2">
                {pipeline.description}
              </p>
              
              <div className="flex justify-between items-center text-xs text-slate-500">
                <div className="flex items-center gap-1">
                  <GitBranch className="h-3 w-3" />
                  <span>v{pipeline.version}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{pipeline.schedule || 'Manual'}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-slate-500">
                  {pipeline.steps.length} steps
                </span>
                {!readOnly && pipeline.status === 'active' && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTogglePipeline(pipeline.id);
                    }}
                  >
                    <Pause className="h-3 w-3" />
                  </Button>
                )}
                {!readOnly && pipeline.status !== 'active' && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0 text-green-400"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTogglePipeline(pipeline.id);
                    }}
                  >
                    <Play className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Pipeline Details */}
      <div className="lg:col-span-2">
        {selectedPipeline ? (
          <div className="space-y-4">
            {/* Pipeline Header */}
            <Card className="bg-slate-800/30 border-slate-700">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-white">{selectedPipeline.name}</CardTitle>
                    <p className="text-slate-400 mt-1">{selectedPipeline.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setShowVersionHistory(!showVersionHistory)}>
                      <History className="h-4 w-4 mr-2" />
                      History
                    </Button>
                    {!readOnly && (
                      <>
                        <Button size="sm" variant="outline">
                          <Settings className="h-4 w-4 mr-2" />
                          Configure
                        </Button>
                        <Button size="sm">
                          <Save className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                      </>
                    )}
                    {readOnly && (
                      <Badge variant="outline" className="text-amber-400 border-amber-400">
                        <Eye className="h-3 w-3 mr-1" />
                        View Only
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-slate-400">Status:</span>
                    <div className="mt-1">
                      <Badge variant="outline" className={getStatusColor(selectedPipeline.status)}>
                        {selectedPipeline.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400">Version:</span>
                    <div className="mt-1 text-white">v{selectedPipeline.version}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Schedule:</span>
                    <div className="mt-1 text-white font-mono text-xs">
                      {selectedPipeline.schedule || 'Manual execution'}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400">Created by:</span>
                    <div className="mt-1 text-white text-xs">{selectedPipeline.createdBy}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pipeline Steps */}
            <Card className="bg-slate-800/30 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Pipeline Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedPipeline.steps
                    .sort((a, b) => a.order - b.order)
                    .map((step, index) => (
                      <div key={step.id} className="flex items-center gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-sm font-medium text-white">
                            {index + 1}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className={`p-3 rounded-lg border ${getStepTypeColor(step.type)}`}>
                            <div className="flex justify-between items-center">
                              <span className="font-medium">{step.name}</span>
                              <Badge variant="outline" className="text-xs">
                                {step.type.toUpperCase()}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        {index < selectedPipeline.steps.length - 1 && (
                          <div className="flex-shrink-0 text-slate-600">
                            →
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Version History */}
            {showVersionHistory && (
              <Card className="bg-slate-800/30 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Version History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[...Array(selectedPipeline.version)].map((_, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                        <div>
                          <span className="font-medium text-white">Version {selectedPipeline.version - i}</span>
                          <p className="text-sm text-slate-400">
                            {i === 0 ? 'Current version' : 'Previous version'}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-500">
                            {new Date(Date.now() - i * 86400000).toISOString().split('T')[0]}
                          </span>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <Card className="bg-slate-800/30 border-slate-700">
            <CardContent className="flex items-center justify-center h-64">
              <div className="text-center">
                <GitBranch className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400">Select a pipeline to view details</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
