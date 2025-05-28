
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, TrendingUp, Settings } from 'lucide-react';
import { AIRole } from './ai-roles/types';
import AIRolesOverviewCards from './ai-roles/AIRolesOverviewCards';
import AIRolesTabContent from './ai-roles/AIRolesTabContent';
import AIRolesPerformanceTab from './ai-roles/AIRolesPerformanceTab';
import AIRolesConfigurationTab from './ai-roles/AIRolesConfigurationTab';

const AIRolesManager = () => {
  const [roles, setRoles] = useState<AIRole[]>([
    {
      id: 'source-agent',
      name: 'Source Agent',
      description: 'Detects, validates, and recommends data sources (HL7, FHIR, CSV, APIs)',
      category: 'Data Ingestion',
      module: 'ASTRO-SCAN',
      isActive: true,
      skills: ['Schema parsing', 'Source health check', 'Data volume estimation'],
      performance: { accuracy: 94, recommendations: 127, successRate: 92 }
    },
    {
      id: 'data-drift-detector',
      name: 'Data Drift Detector',
      description: 'Monitors for structural data changes that could affect model accuracy',
      category: 'QA Agent',
      module: 'ASTRO-SCAN',
      isActive: true,
      skills: ['Schema comparison', 'Data versioning', 'Change detection'],
      performance: { accuracy: 96, recommendations: 45, successRate: 98 }
    },
    {
      id: 'anomaly-guardian',
      name: 'Anomaly Guardian',
      description: 'Detects unusual trends or outliers in data ingestion and KPI performance',
      category: 'QA/Monitoring',
      module: 'ASTRO-SCAN',
      isActive: true,
      skills: ['Isolation Forest', 'Z-score anomaly detection', 'Pattern recognition'],
      performance: { accuracy: 89, recommendations: 234, successRate: 85 }
    },
    {
      id: 'fhir-mapper',
      name: 'FHIR Mapper Agent',
      description: 'Auto-parses and maps external FHIR feeds into local schema and KPIs',
      category: 'Integration',
      module: 'ASTRO-SCAN',
      isActive: false,
      skills: ['FHIR spec parsing', 'Mapping tables', 'Schema translation'],
      performance: { accuracy: 91, recommendations: 67, successRate: 88 }
    }
  ]);

  const toggleRole = (roleId: string) => {
    setRoles(roles.map(role => 
      role.id === roleId ? { ...role, isActive: !role.isActive } : role
    ));
  };

  const activeRoles = roles.filter(role => role.isActive);

  return (
    <div className="space-y-6">
      <AIRolesOverviewCards roles={roles} activeRoles={activeRoles} />

      <Tabs defaultValue="roles" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 bg-muted/50">
          <TabsTrigger value="roles" className="data-[state=active]:bg-blue-500/20">
            <Brain className="h-4 w-4 mr-2" />
            AI Roles
          </TabsTrigger>
          <TabsTrigger value="performance" className="data-[state=active]:bg-green-500/20">
            <TrendingUp className="h-4 w-4 mr-2" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="configuration" className="data-[state=active]:bg-purple-500/20">
            <Settings className="h-4 w-4 mr-2" />
            Configuration
          </TabsTrigger>
        </TabsList>

        <TabsContent value="roles" className="space-y-4">
          <AIRolesTabContent roles={roles} toggleRole={toggleRole} />
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <AIRolesPerformanceTab activeRoles={activeRoles} />
        </TabsContent>

        <TabsContent value="configuration" className="space-y-4">
          <AIRolesConfigurationTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIRolesManager;
