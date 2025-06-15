import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, Languages, Cpu, Zap, Info } from "lucide-react";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface LanguageSupport {
  language: string;
  coverage: number;
  medicalTerms: number;
  status: 'optimal' | 'active' | 'improving';
}

interface AiMetrics {
  supportedLanguages: number;
  activeModels: number;
  translationAccuracy: number;
  globalInferences: string;
}

export const UniversalAITab = () => {
  const [aiMetrics, setAiMetrics] = useState<AiMetrics | null>(null);
  const [languageSupport, setLanguageSupport] = useState<LanguageSupport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real application, you would fetch this data from your backend or a service.
    // For now, we simulate a fetch that results in no data to remove placeholders.
    setLoading(true);
    setTimeout(() => {
      setAiMetrics({
        supportedLanguages: 0,
        activeModels: 0,
        translationAccuracy: 0,
        globalInferences: "0",
      });
      setLanguageSupport([]);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'bg-astrom-green/10 text-astrom-green border-astrom-green/20';
      case 'active': return 'bg-astrom-blue/10 text-astrom-blue border-astrom-blue/20';
      case 'improving': return 'bg-astrom-orange/10 text-astrom-orange border-astrom-orange/20';
      default: return 'bg-muted/50 text-muted-foreground border-border';
    }
  };

  return (
    <Card className="bg-card border-border backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-astrom-purple" />
          Universal Healthcare AI Intelligence
        </CardTitle>
        <CardDescription>
          Multi-language AI with global medical knowledge and cultural context awareness
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Skeleton className="h-24" />
              <Skeleton className="h-24" />
              <Skeleton className="h-24" />
              <Skeleton className="h-24" />
            </div>
            <Skeleton className="h-10 w-1/3" />
            <div className="space-y-4">
              <Skeleton className="h-20" />
              <Skeleton className="h-20" />
              <Skeleton className="h-20" />
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-astrom-purple/10 rounded-lg border border-astrom-purple/20">
                <div className="text-2xl font-bold text-astrom-purple">{aiMetrics?.supportedLanguages}</div>
                <div className="text-xs text-muted-foreground">Supported Languages</div>
              </div>
              <div className="p-4 bg-astrom-blue/10 rounded-lg border border-astrom-blue/20">
                <div className="text-2xl font-bold text-astrom-blue">{aiMetrics?.activeModels}</div>
                <div className="text-xs text-muted-foreground">Active AI Models</div>
              </div>
              <div className="p-4 bg-astrom-green/10 rounded-lg border border-astrom-green/20">
                <div className="text-2xl font-bold text-astrom-green">{aiMetrics?.translationAccuracy}%</div>
                <div className="text-xs text-muted-foreground">Translation Accuracy</div>
              </div>
              <div className="p-4 bg-astrom-orange/10 rounded-lg border border-astrom-orange/20">
                <div className="text-2xl font-bold text-astrom-orange">{aiMetrics?.globalInferences}</div>
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
              
              {languageSupport.length > 0 ? languageSupport.map((lang, index) => (
                <div key={index} className="p-4 border border-border rounded-lg bg-card/50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Cpu className="h-4 w-4 text-astrom-purple" />
                      <span className="font-medium text-foreground">{lang.language}</span>
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
                    <span className="font-medium text-astrom-purple">{lang.coverage}%</span>
                  </div>
                </div>
              )) : (
                <div className="text-center py-10 border border-dashed rounded-lg">
                  <Info className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <h4 className="text-foreground font-medium">No Language Data</h4>
                  <p className="text-muted-foreground text-sm">Language support metrics are not available.</p>
                </div>
              )}
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-astrom-purple/10 to-astrom-pink/10 rounded-lg border border-astrom-purple/20">
              <h4 className="font-semibold text-foreground mb-2">Universal AI Capabilities</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-astrom-purple" />
                  <span className="text-foreground">Real-time medical translation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-astrom-purple" />
                  <span className="text-foreground">Cultural context adaptation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-astrom-purple" />
                  <span className="text-foreground">Global medical knowledge synthesis</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-astrom-purple" />
                  <span className="text-foreground">International standard compliance</span>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
