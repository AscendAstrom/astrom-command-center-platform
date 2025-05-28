
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, Languages, Cpu, Zap } from "lucide-react";

export const UniversalAITab = () => {
  const aiMetrics = {
    supportedLanguages: 67,
    activeModels: 234,
    translationAccuracy: 99.3,
    globalInferences: "47.2M"
  };

  const languageSupport = [
    { language: "English", coverage: 100, medicalTerms: 2.8, status: "optimal" },
    { language: "Mandarin", coverage: 98, medicalTerms: 2.1, status: "optimal" },
    { language: "Spanish", coverage: 97, medicalTerms: 1.9, status: "optimal" },
    { language: "Arabic", coverage: 95, medicalTerms: 1.7, status: "active" },
    { language: "French", coverage: 99, medicalTerms: 2.3, status: "optimal" },
    { language: "Hindi", coverage: 93, medicalTerms: 1.5, status: "improving" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'active': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'improving': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  return (
    <Card className="bg-card/80 border-border backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-400" />
          Universal Healthcare AI Intelligence
        </CardTitle>
        <CardDescription>
          Multi-language AI with global medical knowledge and cultural context awareness
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <div className="text-2xl font-bold text-purple-400">{aiMetrics.supportedLanguages}</div>
            <div className="text-xs text-muted-foreground">Supported Languages</div>
          </div>
          <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <div className="text-2xl font-bold text-blue-400">{aiMetrics.activeModels}</div>
            <div className="text-xs text-muted-foreground">Active AI Models</div>
          </div>
          <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
            <div className="text-2xl font-bold text-green-400">{aiMetrics.translationAccuracy}%</div>
            <div className="text-xs text-muted-foreground">Translation Accuracy</div>
          </div>
          <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
            <div className="text-2xl font-bold text-orange-400">{aiMetrics.globalInferences}</div>
            <div className="text-xs text-muted-foreground">Daily Inferences</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-foreground">Global Language Support</h4>
            <Button variant="outline" size="sm">
              <Languages className="h-4 w-4 mr-2" />
              Language Matrix
            </Button>
          </div>
          
          {languageSupport.map((lang, index) => (
            <div key={index} className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-purple-400" />
                  <span className="font-medium">{lang.language}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{lang.medicalTerms}M terms</span>
                  <Badge variant="outline" className={getStatusColor(lang.status)}>
                    {lang.status}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Medical Coverage</span>
                <span className="font-medium text-purple-400">{lang.coverage}%</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
          <h4 className="font-semibold text-foreground mb-2">Universal AI Capabilities</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-purple-400" />
              <span>Real-time medical translation</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-purple-400" />
              <span>Cultural context adaptation</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-purple-400" />
              <span>Global medical knowledge synthesis</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-purple-400" />
              <span>International standard compliance</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
