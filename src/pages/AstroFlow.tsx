
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Zap, 
  GitBranch, 
  BarChart3, 
  Bot, 
  Brain, 
  Workflow, 
  Target,
  Activity,
  TrendingUp,
  AlertTriangle,
  MessageSquare,
  FileText,
  Settings,
  Bell,
  Hospital,
  CheckCircle
} from "lucide-react";
import RuleBuilder from "@/components/astro-flow/RuleBuilder";
import RulesList from "@/components/astro-flow/RulesList";
import RuleExecutions from "@/components/astro-flow/RuleExecutions";
import SLABreachRadar from "@/components/astro-flow/SLABreachRadar";
import SurgePredictor from "@/components/astro-flow/SurgePredictor";
import NLPAssistant from "@/components/astro-flow/NLPAssistant";
import DailySummaries from "@/components/astro-flow/DailySummaries";
import AlertSubscriptions from "@/components/astro-flow/AlertSubscriptions";
import { useUserRole } from "@/components/astro-bricks/hooks/useUserRole";
import { UserRole } from "@/components/astro-bricks/types";
import { FlowUserRole } from "@/components/astro-flow/types";
import BedManagementTable from "@/components/shared/BedManagementTable";
import { mockBedData } from "@/data/mockBedData";

// Helper function to map UserRole to FlowUserRole
const mapUserRoleToFlowUserRole = (userRole: UserRole): FlowUserRole => {
  switch (userRole) {
    case 'ADMIN':
      return 'ADMIN';
    case 'DATA_ENGINEER':
      return 'OPS_MANAGER'; // Map DATA_ENGINEER to OPS_MANAGER as closest equivalent
    case 'ANALYST':
      return 'VIEWER'; // Map ANALYST to VIEWER as closest equivalent
    default:
      return 'VIEWER';
  }
};

const AstroFlow = () => {
  const { userRole, isLoading } = useUserRole();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-muted rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              <div className="h-12 bg-muted rounded"></div>
              <div className="h-96 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default to ANALYST if userRole is null, then map to FlowUserRole
  const effectiveUserRole = userRole || 'ANALYST';
  const flowUserRole = mapUserRoleToFlowUserRole(effectiveUserRole);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">ASTRO-FLOW</h1>
            <span className="text-sm text-pink-400 font-medium">AI Automation & Workflow Intelligence</span>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Intelligent automation platform with AI-powered monitoring, predictive analytics, and workflow management for healthcare operations.
          </p>
        </div>

        <Tabs defaultValue="workflow" className="space-y-6">
          <TabsList className="grid w-full grid-cols-8 bg-muted/50">
            <TabsTrigger value="workflow" className="data-[state=active]:bg-pink-500/20">
              <Workflow className="h-4 w-4 mr-2" />
              AI Workflow
            </TabsTrigger>
            <TabsTrigger value="aiRoles" className="data-[state=active]:bg-cyan-500/20">
              <Bot className="h-4 w-4 mr-2" />
              AI Roles
            </TabsTrigger>
            <TabsTrigger value="rules">Rule Builder</TabsTrigger>
            <TabsTrigger value="monitoring">SLA Monitoring</TabsTrigger>
            <TabsTrigger value="predictions">Surge Prediction</TabsTrigger>
            <TabsTrigger value="nlp">NLP Assistant</TabsTrigger>
            <TabsTrigger value="alerts">Alert Manager</TabsTrigger>
          </TabsList>

          <TabsContent value="workflow" className="space-y-6">
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

                  {/* Bed Management Example Section */}
                  <div className="p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
                    <div className="flex items-center gap-2 mb-4">
                      <Hospital className="h-5 w-5 text-green-400" />
                      <h3 className="text-lg font-semibold text-foreground">Saudi Hospital Bed Management Example</h3>
                      <Badge className="bg-green-500/10 text-green-600 border-green-500/20">AI Automation Demo</Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Real-time AI workflow automation for Saudi healthcare facilities with cultural considerations and MOH compliance.
                    </p>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                      <div className="p-4 bg-muted/50 rounded-lg border border-pink-500/20">
                        <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-pink-400" />
                          Automated Triggers
                        </h4>
                        <ul className="text-muted-foreground text-sm space-y-1">
                          <li>• High occupancy alerts (&gt;90%)</li>
                          <li>• Discharge delay notifications</li>
                          <li>• Transfer bottleneck detection</li>
                          <li>• MOH compliance violations</li>
                        </ul>
                      </div>
                      
                      <div className="p-4 bg-muted/50 rounded-lg border border-blue-500/20">
                        <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                          <Bot className="h-4 w-4 text-blue-400" />
                          AI Workflow Actions
                        </h4>
                        <ul className="text-muted-foreground text-sm space-y-1">
                          <li>• Auto-assign incoming patients</li>
                          <li>• Optimize bed cleaning schedules</li>
                          <li>• Generate discharge summaries</li>
                          <li>• Update MOH dashboards</li>
                        </ul>
                      </div>
                      
                      <div className="p-4 bg-muted/50 rounded-lg border border-green-500/20">
                        <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          Cultural Automation
                        </h4>
                        <ul className="text-muted-foreground text-sm space-y-1">
                          <li>• Gender-separated ward assignments</li>
                          <li>• Family accommodation priority</li>
                          <li>• Prayer time scheduling</li>
                          <li>• Hajj season surge handling</li>
                        </ul>
                      </div>
                    </div>

                    <BedManagementTable data={mockBedData.slice(0, 2)} showArabicNames={true} showCompliance={true} />
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
          </TabsContent>

          <TabsContent value="aiRoles" className="space-y-6">
            <Card className="bg-card/80 border-border backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Bot className="h-5 w-5 text-cyan-400" />
                  AI Role Management Panel
                </CardTitle>
                <CardDescription>
                  Configure and monitor AI agent roles and responsibilities across the healthcare platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {[
                    { role: "SLA Sentinel", desc: "Monitors SLA compliance and breach risks in real-time", color: "border-red-500/20" },
                    { role: "Surge Forecaster", desc: "Predicts patient volume surges using ML models", color: "border-blue-500/20" },
                    { role: "Routing Strategist", desc: "Optimizes patient flow routing and bed assignments", color: "border-green-500/20" },
                    { role: "Insight Generator", desc: "Creates executive summaries and performance insights", color: "border-purple-500/20" },
                    { role: "Flow Optimizer", desc: "Manages workflow efficiency and resource utilization", color: "border-orange-500/20" },
                    { role: "Audit Trail Guardian", desc: "Ensures compliance tracking and audit requirements", color: "border-cyan-500/20" }
                  ].map((item) => (
                    <div key={item.role} className={`border p-4 rounded-xl bg-muted/50 ${item.color}`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Bot className="h-4 w-4 text-cyan-400" />
                          <Label className="font-medium text-foreground">{item.role}</Label>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                      <div className="mt-3 flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">Active</Badge>
                        <Badge variant="outline" className="text-xs bg-green-500/10 text-green-600 border-green-500/20">
                          Monitoring
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bed Management AI Roles Example */}
                <div className="p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20 mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Hospital className="h-5 w-5 text-green-400" />
                    <h3 className="text-lg font-semibold text-foreground">Bed Management AI Roles Example</h3>
                    <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Saudi Healthcare Demo</Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border p-4 rounded-xl bg-muted/50 border-orange-500/20">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Bot className="h-4 w-4 text-orange-400" />
                          <Label className="font-medium text-foreground">Bed Assignment Optimizer</Label>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">AI agent that optimizes bed assignments based on patient acuity, gender requirements, and cultural preferences in Saudi hospitals</p>
                      <div className="mt-3 flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">Active</Badge>
                        <Badge variant="outline" className="text-xs bg-green-500/10 text-green-600 border-green-500/20">
                          Learning
                        </Badge>
                      </div>
                    </div>

                    <div className="border p-4 rounded-xl bg-muted/50 border-purple-500/20">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Bot className="h-4 w-4 text-purple-400" />
                          <Label className="font-medium text-foreground">Hajj Surge Predictor</Label>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">Specialized AI for predicting patient surges during Hajj season in Mecca hospitals using LSTM models</p>
                      <div className="mt-3 flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">Active</Badge>
                        <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-600 border-blue-500/20">
                          Forecasting
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-blue-400" />
                      AI Coordination Hub
                    </h4>
                    <p className="text-muted-foreground text-sm mb-3">
                      Central coordination point where AI agents communicate, share insights, and collaborate on healthcare operations management.
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">8 Agents Active</Badge>
                      <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Real-time Sync</Badge>
                      <Badge className="bg-purple-500/10 text-purple-600 border-purple-500/20">Learning Mode</Badge>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <Button className="flex-1 bg-cyan-600 hover:bg-cyan-700">
                      <Bot className="h-4 w-4 mr-2" />
                      Save AI Configuration
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Reset to Defaults
                    </Button>
                    <Button variant="outline">
                      <Settings className="h-4 w-4 mr-2" />
                      Advanced Settings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rules" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-pink-400" />
                  Rule Builder
                </CardTitle>
                <CardDescription>
                  Create and manage automation rules for healthcare workflows
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RuleBuilder userRole={flowUserRole} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-pink-400" />
                  SLA Breach Radar
                </CardTitle>
                <CardDescription>
                  Real-time monitoring and prediction of SLA violations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SLABreachRadar userRole={flowUserRole} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="predictions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-pink-400" />
                  Surge Predictor
                </CardTitle>
                <CardDescription>
                  AI-powered patient volume and surge prediction models
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SurgePredictor userRole={flowUserRole} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nlp" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-pink-400" />
                  NLP Assistant
                </CardTitle>
                <CardDescription>
                  Natural language interface for healthcare operations management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <NLPAssistant userRole={flowUserRole} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-pink-400" />
                  Alert Management
                </CardTitle>
                <CardDescription>
                  Configure and manage automated alerts and notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AlertSubscriptions userRole={flowUserRole} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AstroFlow;
