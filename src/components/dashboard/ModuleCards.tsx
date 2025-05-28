
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Database, 
  Target,
  Eye,
  Zap,
  Layers,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const ModuleCards = () => {
  const modules = [
    {
      title: "ASTRO-SCAN",
      description: "Data Ingestion & Source Management",
      icon: Database,
      link: "/astro-scan",
      color: "text-astrom-blue",
      iconBg: "bg-gradient-to-br from-astrom-blue to-astrom-blue-dark"
    },
    {
      title: "ASTRO-BRICKS",
      description: "Data Modeling & Transformation",
      icon: Layers,
      link: "/astro-bricks",
      color: "text-astrom-orange",
      iconBg: "bg-gradient-to-br from-astrom-purple to-astrom-pink"
    },
    {
      title: "ASTRO-METRICS",
      description: "KPI & Performance Analytics",
      icon: Target,
      link: "/astro-metrics",
      color: "text-astrom-green",
      iconBg: "bg-gradient-to-br from-astrom-green to-astrom-green-dark"
    },
    {
      title: "ASTRO-VIEW",
      description: "Data Visualization & Dashboards",
      icon: Eye,
      link: "/astro-view",
      color: "text-astrom-purple",
      iconBg: "bg-gradient-to-br from-astrom-purple to-astrom-purple-dark"
    },
    {
      title: "ASTRO-FLOW",
      description: "Automation & Workflow Management",
      icon: Zap,
      link: "/astro-flow",
      color: "text-astrom-pink",
      iconBg: "bg-gradient-to-br from-astrom-pink to-astrom-pink-dark"
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Platform Modules</h2>
        <Badge variant="outline" className="text-primary border-primary bg-primary/10 px-4 py-2">
          5 Available Modules
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {modules.map((module, index) => (
          <Card 
            key={module.title} 
            className="bg-card border-border hover:bg-card/80 transition-all duration-300 group cursor-pointer"
          >
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-xl ${module.iconBg} shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                  <module.icon className="h-6 w-6 text-white" />
                </div>
                <ArrowRight className={`h-5 w-5 ${module.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              </div>
              <div>
                <CardTitle className={`text-xl font-bold ${module.color}`}>
                  {module.title}
                </CardTitle>
                <CardDescription className="text-base mt-2 text-muted-foreground">
                  {module.description}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <Link to={module.link}>
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start ${module.color} hover:bg-muted font-semibold transition-colors duration-300`}
                >
                  Explore Module
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ModuleCards;
