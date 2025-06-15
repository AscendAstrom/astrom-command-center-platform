
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ShieldCheck, 
  Pill, 
  Lightbulb, 
  GitMerge,
  AlertTriangle,
  Bot,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ClinicalIntelligenceEngine = () => {

  const protocolAdherence = {
    sepsis: 98,
    stroke: 95,
    mi: 97,
  };

  const medicationAlerts = [
    { id: 1, patient: 'John D.', alert: 'High Risk: Warfarin + Aspirin', action: 'Pharmacist review pending' },
    { id: 2, patient: 'Jane S.', alert: 'Allergy: Penicillin', action: 'Alternative prescribed' },
  ];

  const diagnosticSuggestions = [
    { id: 1, patient: 'Robert B.', condition: 'Possible Sepsis', confidence: 85, evidence: 'High lactate, fever' },
    { id: 2, patient: 'Emily W.', condition: 'Early-stage Pneumonia', confidence: 78, evidence: 'Chest X-ray anomalies' },
  ];

  const carePathways = [
    { id: 1, name: 'Knee Replacement', avgLOS: '3.2 days', compliance: 96, outcome: '99% positive' },
    { id: 2, name: 'COPD Management', avgLOS: '5.1 days', compliance: 92, outcome: '88% readmission reduction' },
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-card/80 border-border backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Bot className="h-5 w-5 text-green-400" />
            Clinical Intelligence Engine
          </CardTitle>
          <CardDescription>
            Real-time AI-powered decision support for enhanced clinical outcomes.
          </CardDescription>
        </CardHeader>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Protocol Adherence */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <ShieldCheck className="h-5 w-5 text-blue-500" />
              Clinical Protocol Adherence
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(protocolAdherence).map(([protocol, value]) => (
              <div key={protocol}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-muted-foreground capitalize">{protocol} Bundle</span>
                  <span className="text-sm font-bold text-foreground">{value}%</span>
                </div>
                <Progress value={value} />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Care Pathway Optimization */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <GitMerge className="h-5 w-5 text-purple-500" />
              Care Pathway Optimization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pathway</TableHead>
                  <TableHead>Compliance</TableHead>
                  <TableHead>Outcome</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {carePathways.map((pathway) => (
                  <TableRow key={pathway.id}>
                    <TableCell className="font-medium">{pathway.name}</TableCell>
                    <TableCell>{pathway.compliance}%</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{pathway.outcome}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Medication Safety */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Pill className="h-5 w-5 text-red-500" />
              Medication Safety Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
             <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Alert</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {medicationAlerts.map((alert) => (
                  <TableRow key={alert.id}>
                    <TableCell className="font-medium">{alert.patient}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-orange-400" />
                        <span className="text-sm">{alert.alert}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{alert.action}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Predictive Diagnostics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              Predictive Diagnostic Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Suggestion</TableHead>
                  <TableHead>Confidence</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {diagnosticSuggestions.map((suggestion) => (
                  <TableRow key={suggestion.id}>
                    <TableCell className="font-medium">{suggestion.patient}</TableCell>
                    <TableCell>{suggestion.condition}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{suggestion.confidence}%</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClinicalIntelligenceEngine;
