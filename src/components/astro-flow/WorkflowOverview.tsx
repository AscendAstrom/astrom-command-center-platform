
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  Activity,
} from "lucide-react";

const WorkflowOverview = () => {
  return (
    <Card className="bg-card/80 border-border backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Brain className="h-5 w-5 text-pink-400" />
          AI-Powered Monitoring & Automation Workflow
        </CardTitle>
        <CardDescription>
          Intelligent automation with predictive insights, trigger engines, and workflow management
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">AI Trigger Engine</h3>
              <ul className="list-disc pl-4 space-y-2 text-muted-foreground">
                <li><strong className="text-foreground">SLA Breach Detection:</strong> Real-time monitoring for service level violations using AI models</li>
                <li><strong className="text-foreground">ETA Conflict Analysis:</strong> Predict and prevent estimated time conflicts</li>
                <li><strong className="text-foreground">Census Drop Alerts:</strong> Early warning system for capacity changes</li>
                <li><strong className="text-foreground">Pattern Recognition:</strong> Machine learning-based anomaly detection</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Predictive Models</h3>
              <div className="space-y-3">
                <div className="p-3 bg-muted/50 rounded-lg border border-pink-500/20">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="h-4 w-4 text-pink-400" />
                    <span className="text-foreground font-medium">ETTB (ETA to Bay)</span>
                  </div>
                  <p className="text-muted-foreground text-sm">Predict patient arrival to bay assignment times</p>
                </div>
                
                <div className="p-3 bg-muted/50 rounded-lg border border-red-500/20">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                    <span className="text-foreground font-medium">SLA Risk Scorer</span>
                  </div>
                  <p className="text-muted-foreground text-sm">Risk assessment for SLA violations</p>
                </div>
                
                <div className="p-3 bg-muted/50 rounded-lg border border-blue-500/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Activity className="h-4 w-4 text-blue-400" />
                    <span className="text-foreground font-medium">Surge Predictor</span>
                  </div>
                  <p className="text-muted-foreground text-sm">LSTM/Prophet models for demand forecasting</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Workflow Automation</h3>
              <ul className="list-disc pl-4 space-y-2 text-muted-foreground">
                <li><strong className="text-foreground">Auto-alerts:</strong> Intelligent notification system</li>
                <li><strong className="text-foreground">Staff Assignments:</strong> AI-driven resource allocation</li>
                <li><strong className="text-foreground">Dashboard Updates:</strong> Real-time visual updates</li>
                <li><strong className="text-foreground">Escalation Protocols:</strong> Automated escalation workflows</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">AI Intelligence Features</h3>
              <ul className="list-disc pl-4 space-y-2 text-muted-foreground">
                <li><strong className="text-foreground">NLP Assistant:</strong> Natural language commands like "Show SLA breaches"</li>
                <li><strong className="text-foreground">Insight Generator:</strong> LLM-powered performance summaries for leadership</li>
                <li><strong className="text-foreground">Contextual Analysis:</strong> AI-driven root cause analysis</li>
                <li><strong className="text-foreground">Adaptive Learning:</strong> Self-improving algorithms</li>
              </ul>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Button className="bg-pink-600 hover:bg-pink-700">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Configure AI Triggers
            </Button>
            <Button variant="outline">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Workflow Rules
            </Button>
            <Button variant="outline">
              <Brain className="h-4 w-4 mr-2" />
              AI Model Specs
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkflowOverview;
