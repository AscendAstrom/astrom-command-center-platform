
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
  AlertCircle,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useClinicalIntelligenceData } from "@/hooks/useClinicalIntelligenceData";
import { Skeleton } from "@/components/ui/skeleton";

const ClinicalIntelligenceEngine = () => {
  const { data, isLoading, error } = useClinicalIntelligenceData();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-24 w-full" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="bg-destructive/10 border-destructive">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            Error Loading Clinical Intelligence Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">Could not fetch data for the Clinical Intelligence Engine.</p>
          <p className="text-xs text-muted-foreground mt-2">{error.message}</p>
        </CardContent>
      </Card>
    );
  }

  const { 
    protocolAdherence = {}, 
    medicationAlerts = [], 
    diagnosticSuggestions = [], 
    carePathways = [] 
  } = data || {};

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
