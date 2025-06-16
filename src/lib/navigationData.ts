
export interface NavigationItem {
  name: string;
  href: string;
  icon: string;
  description: string;
  category: string;
  capabilities: string[];
  status: 'active' | 'beta' | 'coming-soon';
}

export const navigationData: NavigationItem[] = [
  {
    name: "AstroScan",
    href: "/astro-scan",
    icon: "Radar",
    description: "Real-time hospital monitoring with AI-powered insights",
    category: "Intelligence",
    capabilities: ["Real-time monitoring", "Predictive analytics", "Resource optimization"],
    status: "active"
  },
  {
    name: "AstroBricks",
    href: "/astro-bricks",
    icon: "Blocks",
    description: "Modular AI ecosystem for healthcare automation",
    category: "Intelligence",
    capabilities: ["ML model training", "Vision processing", "NLP analysis"],
    status: "active"
  },
  {
    name: "AstroMetrics",
    href: "/astro-metrics",
    icon: "BarChart3",
    description: "Advanced analytics and performance insights",
    category: "Analytics",
    capabilities: ["Performance tracking", "Quality metrics", "Compliance monitoring"],
    status: "active"
  },
  {
    name: "AstroFlow",
    href: "/astro-flow",
    icon: "Workflow",
    description: "Intelligent workflow automation and optimization",
    category: "Automation",
    capabilities: ["Process automation", "Resource allocation", "Smart scheduling"],
    status: "active"
  },
  {
    name: "AstroView",
    href: "/astro-view",
    icon: "Eye",
    description: "Comprehensive hospital dashboard and visualization",
    category: "Operations",
    capabilities: ["Real-time dashboards", "Operational insights", "Multi-system integration"],
    status: "active"
  }
];

export const getNavigationByCategory = () => {
  return navigationData.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, NavigationItem[]>);
};
