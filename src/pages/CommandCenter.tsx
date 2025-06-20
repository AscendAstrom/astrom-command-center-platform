
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Database, 
  Wrench, 
  BarChart3, 
  Eye, 
  Brain, 
  Settings,
  Activity,
  AlertTriangle,
  TrendingUp,
  Zap
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function CommandCenter() {
  const navigate = useNavigate();

  const handleAddDataSource = () => {
    toast.info("Navigating to data source configuration...");
    navigate("/astro-scan");
  };

  const handleViewSourceWizard = () => {
    toast.info("Opening source wizard...");
    navigate("/astro-scan");
  };

  const handleConfigureDataModels = () => {
    toast.info("Navigating to data modeling...");
    navigate("/astro-bricks");
  };

  const handleViewTransformationRules = () => {
    toast.info("Opening transformation rules...");
    navigate("/astro-bricks?tab=transformations");
  };

  const handleDefineNewKPI = () => {
    toast.info("Opening KPI builder...");
    navigate("/astro-metrics?tab=kpi-builder");
  };

  const handleConfigureSLARules = () => {
    toast.info("Navigating to SLA configuration...");
    navigate("/astro-metrics?tab=sla-config");
  };

  const handleQualityDashboard = () => {
    toast.info("Opening quality dashboard...");
    navigate("/astro-metrics");
  };

  const handleLaunchDashboardBuilder = () => {
    toast.info("Opening dashboard builder...");
    navigate("/astro-view");
  };

  const handleViewLiveDashboards = () => {
    toast.info("Viewing live dashboards...");
    navigate("/astro-view?tab=realtime");
  };

  const handleConfigureAITriggers = () => {
    toast.info("Configuring AI triggers...");
    navigate("/astro-flow?tab=rules");
  };

  const handleViewWorkflowRules = () => {
    toast.info("Opening workflow rules...");
    navigate("/astro-flow?tab=workflow");
  };

  const handleAIModelSpecs = () => {
    toast.info("Opening AI model specifications...");
    navigate("/ai-ecosystem");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            🛰️ Astrom Command Center
          </h1>
          <p className="text-muted-foreground mt-2">
            End-to-end workflow management and AI-powered automation control
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
            <Activity className="h-3 w-3 mr-1" />
            System Operational
          </Badge>
          <Button variant="outline" onClick={() => navigate("/settings")}>
            <Settings className="h-4 w-4 mr-2" />
            Global Settings
          </Button>
        </div>
      </div>

      {/* Main Workflow Tabs */}
      <Tabs defaultValue="ingestion" className="w-full">
        <TabsList className="grid w-full grid-cols-6 bg-muted/50">
          <TabsTrigger value="ingestion" className="data-[state=active]:bg-blue-500/20">
            <Database className="h-4 w-4 mr-2" />
            Data Collection
          </TabsTrigger>
          <TabsTrigger value="preparation" className="data-[state=active]:bg-orange-500/20">
            <Wrench className="h-4 w-4 mr-2" />
            Data Preparation
          </TabsTrigger>
          <TabsTrigger value="analysis" className="data-[state=active]:bg-green-500/20">
            <BarChart3 className="h-4 w-4 mr-2" />
            Data Analysis
          </TabsTrigger>
          <TabsTrigger value="visualization" className="data-[state=active]:bg-purple-500/20">
            <Eye className="h-4 w-4 mr-2" />
            Visualization
          </TabsTrigger>
          <TabsTrigger value="automation" className="data-[state=active]:bg-pink-500/20">
            <Brain className="h-4 w-4 mr-2" />
            AI Automation
          </TabsTrigger>
          <TabsTrigger value="aiRoles" className="data-[state=active]:bg-cyan-500/20">
            <Zap className="h-4 w-4 mr-2" />
            AI Roles
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ingestion" className="space-y-4">
          <Card className="bg-card/80 border-border backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Database className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Source Mapping + Ingestion Setup</h2>
                  <p className="text-muted-foreground">Map and configure EMS, ETOC, HL7, and triage data sources</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Configure data ingestion from multiple healthcare systems. Choose between real-time streaming 
                    and batch processing modes, preview schemas, and validate data quality.
                  </p>
                  
                  <div className="space-y-2">
                    <Button className="w-full" variant="default" onClick={handleAddDataSource}>
                      <Database className="h-4 w-4 mr-2" />
                      Add Data Source
                    </Button>
                    <Button className="w-full" variant="outline" onClick={handleViewSourceWizard}>
                      View Source Wizard
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">Active Sources</h3>
                  <div className="space-y-2">
                    {['EMS Feed', 'ETOC System', 'HL7 Gateway', 'Triage System'].map((source) => (
                      <div key={source} className="flex items-center justify-between p-2 border border-border rounded">
                        <span className="text-sm text-foreground">{source}</span>
                        <Badge className="bg-green-500/10 text-green-500">Active</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preparation" className="space-y-4">
          <Card className="bg-card/80 border-border backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <Wrench className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Normalization, Modeling & Transformation</h2>
                  <p className="text-muted-foreground">Clean and unify data formats for analysis</p>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-4">
                Clean and unify data formats. Define fact/dimension tables like <code className="bg-muted px-1 rounded">fact_ed_inbound</code>, 
                <code className="bg-muted px-1 rounded">dim_patient</code>, and apply KPI logic transformation rules.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Button variant="default" onClick={handleConfigureDataModels}>Configure Data Models</Button>
                <Button variant="outline" onClick={handleViewTransformationRules}>View Transformation Rules</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <Card className="bg-card/80 border-border backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Quality Checks & KPI Definition</h2>
                  <p className="text-muted-foreground">Validate SLA rules and configure performance metrics</p>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-4">
                Validate SLA rules, configure metrics like average wait time, breach count, and enforce governance rules 
                for data quality and compliance.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Button variant="default" onClick={handleDefineNewKPI}>Define New KPI</Button>
                <Button variant="outline" onClick={handleConfigureSLARules}>Configure SLA Rules</Button>
                <Button variant="outline" onClick={handleQualityDashboard}>Quality Dashboard</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visualization" className="space-y-4">
          <Card className="bg-card/80 border-border backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Eye className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Semantic Layer & Dashboard View</h2>
                  <p className="text-muted-foreground">Build interactive dashboards with real-time insights</p>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-4">
                Build dashboards with zone census, patient-level timers, and trend charts. Includes hover actions, 
                drilldowns, and custom widget configurations.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Button variant="default" onClick={handleLaunchDashboardBuilder}>Launch Dashboard Builder</Button>
                <Button variant="outline" onClick={handleViewLiveDashboards}>View Live Dashboards</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation" className="space-y-4">
          <Card className="bg-card/80 border-border backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">AI-Powered Monitoring & Automation</h2>
                  <p className="text-muted-foreground">Intelligent automation with predictive insights</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <ul className="list-disc pl-4 space-y-2 text-muted-foreground">
                  <li><strong className="text-foreground">Trigger Engine:</strong> Monitors for SLA breaches, ETA conflicts, census drops using AI models</li>
                  <li><strong className="text-foreground">Predictive Models:</strong> ETTB (ETA to Bay), SLA Risk Scorer, Surge Predictor (LSTM/Prophet)</li>
                  <li><strong className="text-foreground">Workflow Automation:</strong> Auto-alerts, staff assignments, dashboard updates</li>
                  <li><strong className="text-foreground">NLP Assistant:</strong> Natural language commands to trigger actions like "Show SLA breaches"</li>
                  <li><strong className="text-foreground">Insight Generator:</strong> Summarizes system performance for leadership via LLM</li>
                </ul>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <Button variant="default" onClick={handleConfigureAITriggers}>
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Configure AI Triggers
                  </Button>
                  <Button variant="outline" onClick={handleViewWorkflowRules}>
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Workflow Rules
                  </Button>
                  <Button variant="outline" onClick={handleAIModelSpecs}>
                    <Brain className="h-4 w-4 mr-2" />
                    AI Model Specs
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="aiRoles" className="space-y-4">
          <Card className="bg-card/80 border-border backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">AI Role Management Panel</h2>
                  <p className="text-muted-foreground">Configure and monitor AI agent roles and responsibilities</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {[
                  { role: "SLA Sentinel", desc: "Monitors SLA compliance and breach risks" },
                  { role: "Surge Forecaster", desc: "Predicts patient volume surges" },
                  { role: "Routing Strategist", desc: "Optimizes patient flow routing" },
                  { role: "Insight Generator", desc: "Creates executive summaries" },
                  { role: "Flow Optimizer", desc: "Manages workflow efficiency" },
                  { role: "Audit Trail Guardian", desc: "Ensures compliance tracking" }
                ].map((item) => (
                  <div key={item.role} className="border border-border p-4 rounded-xl bg-card/50">
                    <div className="flex items-center justify-between mb-2">
                      <Label className="font-medium text-foreground">{item.role}</Label>
                      <Switch defaultChecked />
                    </div>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-4">
                <Button className="flex-1" onClick={() => toast.success("AI roles configuration saved!")}>Save Configuration</Button>
                <Button variant="outline" onClick={() => toast.info("AI roles reset to defaults")}>Reset to Defaults</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
