
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Workflow, MessageSquare, Zap, Brain, Play, Pause, Settings, Plus, RefreshCw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const NextGenWorkflowsTab = () => {
  const [workflowMetrics, setWorkflowMetrics] = useState({
    naturalLanguageWorkflows: 156,
    autoGeneratedProcesses: 89,
    workflowIntelligence: 95.3,
    adaptationRate: 87.2
  });

  const [newWorkflowInput, setNewWorkflowInput] = useState("");
  const [isCreatingWorkflow, setIsCreatingWorkflow] = useState(false);

  const [nlWorkflows, setNlWorkflows] = useState([
    { 
      id: 1, 
      name: "Patient discharge process when bed availability drops below 80%", 
      confidence: 94, 
      status: "active" 
    },
    { 
      id: 2, 
      name: "Emergency alert routing based on severity and staff availability", 
      confidence: 89, 
      status: "optimizing" 
    },
    { 
      id: 3, 
      name: "Lab result distribution prioritizing critical values", 
      confidence: 97, 
      status: "active" 
    },
    { 
      id: 4, 
      name: "Insurance verification workflow with automated follow-up", 
      confidence: 92, 
      status: "learning" 
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'optimizing': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'learning': return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
      case 'paused': return 'bg-orange-500/10 text-orange-600 border-orange-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  const handleCreateWorkflow = () => {
    if (!newWorkflowInput.trim()) {
      toast.error("Please describe your workflow first");
      return;
    }

    setIsCreatingWorkflow(true);
    
    // Simulate workflow creation
    setTimeout(() => {
      const newWorkflow = {
        id: nlWorkflows.length + 1,
        name: newWorkflowInput,
        confidence: Math.floor(Math.random() * 20) + 80, // Random confidence 80-100
        status: "learning"
      };
      
      setNlWorkflows(prev => [...prev, newWorkflow]);
      setWorkflowMetrics(prev => ({
        ...prev,
        naturalLanguageWorkflows: prev.naturalLanguageWorkflows + 1,
        autoGeneratedProcesses: prev.autoGeneratedProcesses + 1
      }));
      
      setNewWorkflowInput("");
      setIsCreatingWorkflow(false);
      toast.success("Workflow created successfully!");
    }, 2000);
  };

  const toggleWorkflowStatus = (id: number) => {
    setNlWorkflows(prev => 
      prev.map(workflow => 
        workflow.id === id 
          ? { 
              ...workflow, 
              status: workflow.status === 'active' ? 'paused' : 'active' 
            }
          : workflow
      )
    );
    toast.success("Workflow status updated");
  };

  const optimizeWorkflow = (id: number) => {
    setNlWorkflows(prev => 
      prev.map(workflow => 
        workflow.id === id 
          ? { ...workflow, status: 'optimizing' }
          : workflow
      )
    );
    
    // Simulate optimization
    setTimeout(() => {
      setNlWorkflows(prev => 
        prev.map(workflow => 
          workflow.id === id 
            ? { 
                ...workflow, 
                status: 'active',
                confidence: Math.min(100, workflow.confidence + Math.floor(Math.random() * 5) + 1)
              }
            : workflow
        )
      );
      toast.success("Workflow optimization completed");
    }, 3000);
  };

  const refreshMetrics = () => {
    setWorkflowMetrics(prev => ({
      naturalLanguageWorkflows: prev.naturalLanguageWorkflows + Math.floor(Math.random() * 5),
      autoGeneratedProcesses: prev.autoGeneratedProcesses + Math.floor(Math.random() * 3),
      workflowIntelligence: Math.min(100, prev.workflowIntelligence + Math.random() * 2),
      adaptationRate: Math.min(100, prev.adaptationRate + Math.random() * 3)
    }));
    toast.success("Metrics refreshed");
  };

  return (
    <Card className="bg-card/80 border-border backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Workflow className="h-5 w-5 text-purple-400" />
              Next-Generation Workflow Intelligence
            </CardTitle>
            <CardDescription>
              Natural language workflow creation with AI-powered optimization and adaptation
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={refreshMetrics}
            className="hover:bg-purple-500/10"
            showToast={true}
            toastMessage="Metrics refreshed successfully"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20 hover:bg-purple-500/15 transition-colors">
            <div className="text-2xl font-bold text-purple-400">{workflowMetrics.naturalLanguageWorkflows}</div>
            <div className="text-xs text-muted-foreground">NL Workflows</div>
          </div>
          <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20 hover:bg-blue-500/15 transition-colors">
            <div className="text-2xl font-bold text-blue-400">{workflowMetrics.autoGeneratedProcesses}</div>
            <div className="text-xs text-muted-foreground">Auto-Generated</div>
          </div>
          <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20 hover:bg-green-500/15 transition-colors">
            <div className="text-2xl font-bold text-green-400">{workflowMetrics.workflowIntelligence.toFixed(1)}%</div>
            <div className="text-xs text-muted-foreground">Intelligence Score</div>
          </div>
          <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/20 hover:bg-orange-500/15 transition-colors">
            <div className="text-2xl font-bold text-orange-400">{workflowMetrics.adaptationRate.toFixed(1)}%</div>
            <div className="text-xs text-muted-foreground">Adaptation Rate</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-foreground">Natural Language Workflows</h4>
          </div>

          {/* Workflow Creation Form */}
          <div className="p-4 border border-border rounded-lg bg-muted/20">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="h-4 w-4 text-purple-400" />
              <span className="font-medium">Create New Workflow</span>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Describe your workflow in natural language..."
                value={newWorkflowInput}
                onChange={(e) => setNewWorkflowInput(e.target.value)}
                className="flex-1"
                disabled={isCreatingWorkflow}
              />
              <Button 
                onClick={handleCreateWorkflow}
                disabled={isCreatingWorkflow || !newWorkflowInput.trim()}
                className="bg-purple-600 hover:bg-purple-700"
                showToast={true}
                toastMessage={isCreatingWorkflow ? "Creating workflow..." : "Workflow creation started"}
              >
                {isCreatingWorkflow ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Plus className="h-4 w-4 mr-2" />
                )}
                {isCreatingWorkflow ? "Creating..." : "Create"}
              </Button>
            </div>
          </div>
          
          {nlWorkflows.map((workflow) => (
            <div key={workflow.id} className="p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4 text-purple-400" />
                  <span className="font-medium text-sm">{workflow.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={getStatusColor(workflow.status)}>
                    {workflow.status}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleWorkflowStatus(workflow.id)}
                    className="h-6 w-6 p-0"
                    showToast={true}
                    toastMessage={`Workflow ${workflow.status === 'active' ? 'paused' : 'activated'}`}
                  >
                    {workflow.status === 'active' ? 
                      <Pause className="h-3 w-3" /> : 
                      <Play className="h-3 w-3" />
                    }
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => optimizeWorkflow(workflow.id)}
                    className="h-6 w-6 p-0"
                    disabled={workflow.status === 'optimizing'}
                    showToast={true}
                    toastMessage="Workflow optimization started"
                  >
                    <Settings className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Confidence Level</span>
                <span className="font-medium">{workflow.confidence}%</span>
              </div>
              <Progress value={workflow.confidence} className="h-2" />
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
          <h4 className="font-semibold text-foreground mb-2">Next-Gen Workflow Features</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-purple-400" />
              <span>Natural language workflow creation</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-purple-400" />
              <span>Intelligent process optimization</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-purple-400" />
              <span>Adaptive workflow evolution</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-purple-400" />
              <span>Context-aware automation</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
