
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Brain, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  Target,
  TrendingUp,
  Shield,
  Activity,
  FileText,
  Zap
} from 'lucide-react';

interface DecisionSupportRule {
  id: string;
  name: string;
  description: string;
  category: 'medication' | 'diagnosis' | 'procedure' | 'safety';
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  evidence: string[];
  recommendations: string[];
  triggered: boolean;
  lastTriggered?: string;
}

interface ClinicalAlert {
  id: string;
  type: 'drug_interaction' | 'allergy' | 'contraindication' | 'guideline';
  severity: 'info' | 'warning' | 'critical';
  message: string;
  details: string;
  actionRequired: boolean;
  acknowledgeable: boolean;
}

interface ClinicalDecisionSupportProps {
  patientId?: string;
  data: any;
}

const ClinicalDecisionSupport = ({ patientId, data }: ClinicalDecisionSupportProps) => {
  const [rules, setRules] = useState<DecisionSupportRule[]>([]);
  const [alerts, setAlerts] = useState<ClinicalAlert[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    generateDecisionSupport();
  }, [patientId, data]);

  const generateDecisionSupport = async () => {
    setIsAnalyzing(true);
    
    try {
      // Simulate clinical decision support analysis
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockRules: DecisionSupportRule[] = [
        {
          id: '1',
          name: 'Anticoagulation Monitoring',
          description: 'Patient on warfarin requires INR monitoring',
          category: 'medication',
          severity: 'high',
          confidence: 0.92,
          evidence: ['Current warfarin prescription', 'No recent INR result', 'Risk factors present'],
          recommendations: ['Order INR within 24 hours', 'Review bleeding risk', 'Consider dose adjustment'],
          triggered: true,
          lastTriggered: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Diabetes Care Protocol',
          description: 'HbA1c due for annual monitoring',
          category: 'diagnosis',
          severity: 'medium',
          confidence: 0.87,
          evidence: ['Diabetes diagnosis', 'Last HbA1c > 12 months ago'],
          recommendations: ['Order HbA1c', 'Review diabetic medications', 'Eye exam due'],
          triggered: true
        },
        {
          id: '3',
          name: 'Sepsis Early Warning',
          description: 'SIRS criteria met - consider sepsis workup',
          category: 'safety',
          severity: 'critical',
          confidence: 0.78,
          evidence: ['Elevated temperature', 'Tachycardia', 'Elevated WBC'],
          recommendations: ['Blood cultures x2', 'Lactate level', 'Consider antibiotics'],
          triggered: false
        }
      ];

      const mockAlerts: ClinicalAlert[] = [
        {
          id: '1',
          type: 'drug_interaction',
          severity: 'warning',
          message: 'Potential drug interaction detected',
          details: 'Warfarin + Aspirin may increase bleeding risk',
          actionRequired: true,
          acknowledgeable: true
        },
        {
          id: '2',
          type: 'allergy',
          severity: 'critical',
          message: 'Allergy alert',
          details: 'Patient allergic to penicillin - alternative antibiotics recommended',
          actionRequired: true,
          acknowledgeable: false
        }
      ];

      setRules(mockRules);
      setAlerts(mockAlerts);
    } catch (error) {
      console.error('Failed to generate decision support:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-500';
      case 'high': return 'text-orange-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'high': return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'medium': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'low': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'medication': return <Shield className="h-4 w-4" />;
      case 'diagnosis': return <Target className="h-4 w-4" />;
      case 'procedure': return <FileText className="h-4 w-4" />;
      case 'safety': return <AlertTriangle className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const acknowledgeAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  if (isAnalyzing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Clinical Decision Support
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <Zap className="h-8 w-8 mx-auto mb-2 animate-pulse" />
              <p>Analyzing clinical data...</p>
            </div>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-muted animate-pulse rounded" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Critical Alerts */}
      {alerts.length > 0 && (
        <div className="space-y-2">
          {alerts.map((alert) => (
            <Alert key={alert.id} className={`border-l-4 ${
              alert.severity === 'critical' ? 'border-red-500' : 
              alert.severity === 'warning' ? 'border-orange-500' : 'border-blue-500'
            }`}>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{alert.message}</div>
                  <div className="text-sm text-muted-foreground">{alert.details}</div>
                </div>
                {alert.acknowledgeable && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => acknowledgeAlert(alert.id)}
                  >
                    Acknowledge
                  </Button>
                )}
              </AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Clinical Decision Support
            {patientId && <Badge variant="outline">Patient Specific</Badge>}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="active">Active Rules</TabsTrigger>
              <TabsTrigger value="medication">Medication</TabsTrigger>
              <TabsTrigger value="safety">Safety</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-red-500">
                    {alerts.filter(a => a.severity === 'critical').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Critical Alerts</div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-500">
                    {rules.filter(r => r.triggered && r.severity === 'high').length}
                  </div>
                  <div className="text-sm text-muted-foreground">High Priority</div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-500">
                    {rules.filter(r => r.triggered).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Active Rules</div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-500">
                    {Math.round(rules.reduce((acc, r) => acc + r.confidence, 0) / rules.length * 100)}%
                  </div>
                  <div className="text-sm text-muted-foreground">Avg Confidence</div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="active" className="space-y-4">
              <div className="space-y-3">
                {rules.filter(rule => rule.triggered).map((rule) => (
                  <Card key={rule.id} className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(rule.category)}
                          {getSeverityIcon(rule.severity)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{rule.name}</h4>
                            <Badge variant="outline" className="text-xs capitalize">
                              {rule.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {rule.description}
                          </p>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs text-muted-foreground">Confidence:</span>
                            <Progress value={rule.confidence * 100} className="w-20 h-2" />
                            <span className="text-xs">{(rule.confidence * 100).toFixed(0)}%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-medium mb-1">Evidence:</p>
                        <div className="flex flex-wrap gap-1">
                          {rule.evidence.map((evidence, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {evidence}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-medium mb-1">Recommendations:</p>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          {rule.recommendations.map((rec, i) => (
                            <li key={i} className="flex items-start gap-1">
                              <span>•</span>
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="medication" className="space-y-4">
              <div className="space-y-3">
                {rules.filter(rule => rule.category === 'medication').map((rule) => (
                  <Card key={rule.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{rule.name}</h4>
                        <p className="text-sm text-muted-foreground">{rule.description}</p>
                      </div>
                      <Badge 
                        variant={rule.triggered ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {rule.triggered ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="safety" className="space-y-4">
              <div className="space-y-3">
                {rules.filter(rule => rule.category === 'safety').map((rule) => (
                  <Card key={rule.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{rule.name}</h4>
                        <p className="text-sm text-muted-foreground">{rule.description}</p>
                      </div>
                      <Badge 
                        variant={rule.triggered ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {rule.triggered ? 'Active' : 'Monitoring'}
                      </Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClinicalDecisionSupport;
