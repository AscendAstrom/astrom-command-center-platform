
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, TrendingUp, Settings } from 'lucide-react';
import { AIRole } from './ai-roles/types';
import AIRolesOverviewCards from './ai-roles/AIRolesOverviewCards';
import AIRolesTabContent from './ai-roles/AIRolesTabContent';
import AIRolesPerformanceTab from './ai-roles/AIRolesPerformanceTab';
import AIRolesConfigurationTab from './ai-roles/AIRolesConfigurationTab';
import { supabase } from '@/integrations/supabase/client';


const AIRolesManager = () => {
  const [roles, setRoles] = useState<AIRole[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchAIRoles = async () => {
          setLoading(true);
          // TODO: This table 'ai_roles' does not exist. This is a placeholder for when it's created.
          // const { data, error } = await supabase.from('ai_roles').select('*');
          // if (error) {
          //     console.error("Error fetching AI roles", error);
          // } else if (data) {
          //     setRoles(data as AIRole[]);
          // }
          setLoading(false);
      }
      fetchAIRoles();
  }, []);

  const toggleRole = (roleId: string) => {
    setRoles(roles.map(role => 
      role.id === roleId ? { ...role, isActive: !role.isActive } : role
    ));
    // TODO: Add supabase call to update role status in the database.
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
