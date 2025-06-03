import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Play, Pause, Heart, Stethoscope, Database, TrendingUp, Shield, Server, Brain, Zap, BarChart3 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { analyticsService, AnalyticsData } from '@/services/analytics';
import EmergencyDepartmentTab from './tabs/EmergencyDepartmentTab';
import ClinicalOperationsTab from './tabs/ClinicalOperationsTab';
import DataPipelineTab from './tabs/DataPipelineTab';
import BusinessAnalyticsTab from './tabs/BusinessAnalyticsTab';
import SystemHealthTab from './tabs/SystemHealthTab';
import AIMetricsTab from './tabs/AIMetricsTab';

const DashboardAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [isLive, setIsLive] = useState(true);
  const [activeCategory, setActiveCategory] = useState('operations');
  const [stopRealTimeUpdates, setStopRealTimeUpdates] = useState<(() => void) | null>(null);

  useEffect(() => {
    const unsubscribe = analyticsService.subscribe(setAnalyticsData);
    
    if (isLive) {
      const stopUpdates = analyticsService.startRealTimeUpdates();
      setStopRealTimeUpdates(() => stopUpdates);
    } else {
      if (stopRealTimeUpdates) {
        stopRealTimeUpdates();
        setStopRealTimeUpdates(null);
      }
    }

    return () => {
      unsubscribe();
      if (stopRealTimeUpdates) {
        stopRealTimeUpdates();
      }
    };
  }, [isLive]);

  const toggleLiveUpdates = () => {
    setIsLive(!isLive);
  };

  const tabCategories = [
    {
      id: 'operations',
      name: 'Real-Time Operations',
      icon: Activity,
      color: 'text-blue-400',
      tabs: [
        { id: 'emergency', name: 'Emergency Dept', icon: Heart, component: EmergencyDepartmentTab },
        { id: 'clinical', name: 'Clinical Ops', icon: Stethoscope, component: ClinicalOperationsTab }
      ]
    },
    {
      id: 'intelligence',
      name: 'Data Intelligence',
      icon: Database,
      color: 'text-purple-400',
      tabs: [
        { id: 'pipeline', name: 'Data Pipeline', icon: Database, component: DataPipelineTab }
      ]
    },
    {
      id: 'business',
      name: 'Business Analytics',
      icon: TrendingUp,
      color: 'text-green-400',
      tabs: [
        { id: 'financial', name: 'Financial', icon: BarChart3, component: BusinessAnalyticsTab }
      ]
    },
    {
      id: 'system',
      name: 'System Health',
      icon: Shield,
      color: 'text-orange-400',
      tabs: [
        { id: 'infrastructure', name: 'Infrastructure', icon: Server, component: SystemHealthTab }
      ]
    },
    {
      id: 'ai',
      name: 'AI & Automation',
      icon: Brain,
      color: 'text-pink-400',
      tabs: [
        { id: 'ml', name: 'ML Performance', icon: Zap, component: AIMetricsTab }
      ]
    }
  ];

  const activeTabCategory = tabCategories.find(cat => cat.id === activeCategory);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Analytics Dashboard</h2>
          <p className="text-muted-foreground">Real-time insights across all platform modules</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
            <span className="text-sm text-foreground">
              {isLive ? 'Live Updates' : 'Paused'}
            </span>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLiveUpdates}
            className="border-border text-foreground"
          >
            {isLive ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
            {isLive ? 'Pause' : 'Resume'}
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {/* Category Selection */}
        <div className="flex flex-wrap gap-2">
          {tabCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-accent text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
              }`}
            >
              <category.icon className={`h-4 w-4 ${category.color}`} />
              <span className="font-medium">{category.name}</span>
              <Badge variant="outline" className="text-xs">
                {category.tabs.length}
              </Badge>
            </button>
          ))}
        </div>

        {/* Active Category Tabs */}
        {activeTabCategory && (
          <Card className="bg-card border-border">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-gradient-to-br from-current/20 to-current/10 ${activeTabCategory.color}`}>
                  <activeTabCategory.icon className={`h-5 w-5 ${activeTabCategory.color}`} />
                </div>
                <div>
                  <CardTitle className="text-foreground">{activeTabCategory.name}</CardTitle>
                  <CardDescription>
                    Last updated: {new Date().toLocaleTimeString()}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <Tabs defaultValue={activeTabCategory.tabs[0]?.id} className="w-full">
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
                  {activeTabCategory.tabs.map((tab) => (
                    <TabsTrigger 
                      key={tab.id} 
                      value={tab.id}
                      className="flex items-center gap-2"
                    >
                      <tab.icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{tab.name}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {activeTabCategory.tabs.map((tab) => (
                  <TabsContent key={tab.id} value={tab.id} className="mt-6">
                    {analyticsData && (
                      <tab.component 
                        data={analyticsData} 
                        isLive={isLive}
                      />
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DashboardAnalytics;
