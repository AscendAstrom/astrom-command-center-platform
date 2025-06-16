
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Brain, Database, BarChart3, Workflow, Eye } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const modules = [
    {
      name: "AstroScan",
      description: "Real-time hospital monitoring with AI-powered insights",
      icon: Brain,
      path: "/astro-scan",
      status: "Active"
    },
    {
      name: "AstroBricks",
      description: "Modular AI ecosystem for healthcare automation",
      icon: Database,
      path: "/astro-bricks",
      status: "Active"
    },
    {
      name: "AstroMetrics",
      description: "Advanced analytics and performance insights",
      icon: BarChart3,
      path: "/astro-metrics",
      status: "Active"
    },
    {
      name: "AstroFlow",
      description: "Intelligent workflow automation and optimization",
      icon: Workflow,
      path: "/astro-flow",
      status: "Active"
    },
    {
      name: "AstroView",
      description: "Comprehensive hospital dashboard and visualization",
      icon: Eye,
      path: "/astro-view",
      status: "Active"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">
            Welcome to Hospital Intelligence Platform
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Advanced AI-powered healthcare management platform for real-time monitoring, 
            predictive analytics, and intelligent automation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {modules.map((module) => {
            const IconComponent = module.icon;
            return (
              <Card key={module.name} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <IconComponent className="h-8 w-8 text-blue-400" />
                    <Badge variant="secondary" className="bg-green-500/10 text-green-400 border-green-500/20">
                      {module.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-white">{module.name}</CardTitle>
                  <CardDescription className="text-slate-300">
                    {module.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => navigate(module.path)}
                    className="w-full"
                    variant="outline"
                  >
                    Launch Module
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button 
            onClick={() => navigate("/dashboard")}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700"
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
