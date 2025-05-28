
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Eye, 
  Layout, 
  BarChart3, 
  Play, 
  Users, 
  Layers,
  Hospital,
  Activity,
  TrendingUp,
  MapPin
} from "lucide-react";
import RealtimeDashboard from "@/components/astro-view/RealtimeDashboard";
import DashboardBuilder from "@/components/astro-view/DashboardBuilder";
import DashboardManager from "@/components/astro-view/DashboardManager";
import SemanticLayerBuilder from "@/components/astro-view/SemanticLayerBuilder";
import { useUserRole } from "@/components/astro-bricks/hooks/useUserRole";
import { ViewUserRole } from "@/components/astro-view/types";
import { UserRole } from "@/components/astro-bricks/types";
import BedManagementTable from "@/components/shared/BedManagementTable";
import { mockBedData } from "@/data/mockBedData";

// Helper function to map UserRole to ViewUserRole
const mapUserRoleToViewUserRole = (userRole: UserRole): ViewUserRole => {
  switch (userRole) {
    case 'ADMIN':
      return 'ADMIN';
    case 'DATA_ENGINEER':
      return 'ANALYST'; // Map DATA_ENGINEER to ANALYST as closest equivalent
    case 'ANALYST':
      return 'ANALYST';
    default:
      return 'VIEWER';
  }
};

const AstroView = () => {
  const { userRole, isLoading } = useUserRole();
  const [selectedDashboard, setSelectedDashboard] = useState(null);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-muted rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              <div className="h-12 bg-muted rounded"></div>
              <div className="h-96 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default to VIEWER if userRole is null, then map to ViewUserRole
  const effectiveUserRole = userRole || 'ANALYST';
  const viewUserRole = mapUserRoleToViewUserRole(effectiveUserRole);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center">
              <Eye className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">ASTRO-VIEW</h1>
            <span className="text-sm text-cyan-400 font-medium">Dashboard Builder & Real-time Visualization</span>
          </div>
          <p className="text-slate-400 max-w-2xl">
            Advanced dashboard creation platform with real-time data visualization, semantic layer management, and interactive analytics for healthcare operations.
          </p>
        </div>

        <Tabs defaultValue="realtime" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
            <TabsTrigger value="realtime" className="data-[state=active]:bg-cyan-500/20">
              <Play className="h-4 w-4 mr-2" />
              Real-time Dashboard
            </TabsTrigger>
            <TabsTrigger value="builder" className="data-[state=active]:bg-purple-500/20">
              <Layout className="h-4 w-4 mr-2" />
              Dashboard Builder
            </TabsTrigger>
            <TabsTrigger value="manager" className="data-[state=active]:bg-green-500/20">
              <Users className="h-4 w-4 mr-2" />
              Dashboard Manager
            </TabsTrigger>
            <TabsTrigger value="semantic" className="data-[state=active]:bg-orange-500/20">
              <Layers className="h-4 w-4 mr-2" />
              Semantic Layer
            </TabsTrigger>
          </TabsList>

          <TabsContent value="realtime" className="space-y-6">
            <Card className="bg-slate-800/80 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Play className="h-5 w-5 text-cyan-400" />
                  Real-time Operations Dashboard
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Live dashboard with real-time updates, customizable widgets, and interactive analytics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RealtimeDashboard userRole={viewUserRole} />

                {/* Bed Management Dashboard Example */}
                <div className="mt-8 p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
                  <div className="flex items-center gap-2 mb-4">
                    <Hospital className="h-5 w-5 text-green-400" />
                    <h3 className="text-lg font-semibold text-white">Bed Management Dashboard Example</h3>
                    <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Live Saudi Data</Badge>
                  </div>
                  <p className="text-slate-400 mb-6">
                    Real-time bed management dashboard for Saudi hospitals with cultural considerations and MOH compliance tracking.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
                    <div className="p-4 bg-slate-800/50 rounded-lg border border-cyan-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Activity className="h-4 w-4 text-cyan-400" />
                        <span className="text-white font-medium text-sm">Total Beds</span>
                      </div>
                      <div className="text-2xl font-bold text-cyan-400">
                        {mockBedData.reduce((sum, item) => sum + item.totalBeds, 0)}
                      </div>
                      <div className="text-xs text-slate-400">Across all facilities</div>
                    </div>

                    <div className="p-4 bg-slate-800/50 rounded-lg border border-green-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-green-400" />
                        <span className="text-white font-medium text-sm">Occupancy Rate</span>
                      </div>
                      <div className="text-2xl font-bold text-green-400">
                        {Math.round(
                          mockBedData.reduce((sum, item) => sum + item.occupancyRate, 0) / mockBedData.length
                        )}%
                      </div>
                      <div className="text-xs text-slate-400">Average across hospitals</div>
                    </div>

                    <div className="p-4 bg-slate-800/50 rounded-lg border border-orange-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-4 w-4 text-orange-400" />
                        <span className="text-white font-medium text-sm">Available Beds</span>
                      </div>
                      <div className="text-2xl font-bold text-orange-400">
                        {mockBedData.reduce((sum, item) => sum + item.netAvailableBeds, 0)}
                      </div>
                      <div className="text-xs text-slate-400">Ready for admission</div>
                    </div>

                    <div className="p-4 bg-slate-800/50 rounded-lg border border-purple-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Hospital className="h-4 w-4 text-purple-400" />
                        <span className="text-white font-medium text-sm">Pending Discharge</span>
                      </div>
                      <div className="text-2xl font-bold text-purple-400">
                        {mockBedData.reduce((sum, item) => sum + item.confirmedDischarge + item.potentialDischarge, 0)}
                      </div>
                      <div className="text-xs text-slate-400">Expected releases</div>
                    </div>
                  </div>

                  <BedManagementTable data={mockBedData} showArabicNames={true} showCompliance={true} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="builder" className="space-y-6">
            <Card className="bg-slate-800/80 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Layout className="h-5 w-5 text-purple-400" />
                  Dashboard Builder Studio
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Drag-and-drop dashboard builder with customizable widgets and layout management
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedDashboard ? (
                  <DashboardBuilder
                    dashboard={selectedDashboard}
                    onSave={() => setSelectedDashboard(null)}
                    onCancel={() => setSelectedDashboard(null)}
                    userRole={viewUserRole}
                  />
                ) : (
                  <div className="space-y-6">
                    <div className="text-center py-12">
                      <Layout className="h-16 w-16 mx-auto text-slate-600 mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-2">Create New Dashboard</h3>
                      <p className="text-slate-400 mb-6">
                        Build interactive dashboards with drag-and-drop widgets
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                        <Button 
                          onClick={() => setSelectedDashboard({ 
                            id: '', 
                            name: 'New Dashboard',
                            description: '',
                            targetAudience: 'ed_managers',
                            widgets: [],
                            autoRefresh: 30,
                            isPublic: false,
                            createdBy: '',
                            createdAt: '',
                            updatedAt: ''
                          })}
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          <Layout className="h-4 w-4 mr-2" />
                          ED Dashboard
                        </Button>
                        <Button 
                          onClick={() => setSelectedDashboard({ 
                            id: '', 
                            name: 'Operations Dashboard',
                            description: '',
                            targetAudience: 'ops_staff',
                            widgets: [],
                            autoRefresh: 60,
                            isPublic: false,
                            createdBy: '',
                            createdAt: '',
                            updatedAt: ''
                          })}
                          variant="outline" 
                          className="border-slate-600 text-slate-300"
                        >
                          <BarChart3 className="h-4 w-4 mr-2" />
                          Operations
                        </Button>
                        <Button 
                          onClick={() => setSelectedDashboard({ 
                            id: '', 
                            name: 'Executive Dashboard',
                            description: '',
                            targetAudience: 'executives',
                            widgets: [],
                            autoRefresh: 300,
                            isPublic: false,
                            createdBy: '',
                            createdAt: '',
                            updatedAt: ''
                          })}
                          variant="outline" 
                          className="border-slate-600 text-slate-300"
                        >
                          <Users className="h-4 w-4 mr-2" />
                          Executive
                        </Button>
                      </div>
                    </div>

                    {/* Bed Management Builder Example */}
                    <div className="p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
                      <div className="flex items-center gap-2 mb-4">
                        <Hospital className="h-5 w-5 text-green-400" />
                        <h3 className="text-lg font-semibold text-white">Bed Management Builder Example</h3>
                        <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Saudi Template</Badge>
                      </div>
                      <p className="text-slate-400 mb-4">
                        Pre-built dashboard templates for Saudi hospital bed management with MOH compliance widgets.
                      </p>

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="p-4 bg-slate-800/50 rounded-lg border border-border/50">
                          <h4 className="font-medium text-white mb-2">Zone Occupancy Widget</h4>
                          <p className="text-sm text-slate-400 mb-3">Real-time bed occupancy by hospital zone with gender segregation indicators</p>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700 w-full">
                            Add Widget
                          </Button>
                        </div>

                        <div className="p-4 bg-slate-800/50 rounded-lg border border-border/50">
                          <h4 className="font-medium text-white mb-2">MOH Compliance Tracker</h4>
                          <p className="text-sm text-slate-400 mb-3">Ministry of Health reporting compliance status and submission tracking</p>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 w-full">
                            Add Widget
                          </Button>
                        </div>

                        <div className="p-4 bg-slate-800/50 rounded-lg border border-border/50">
                          <h4 className="font-medium text-white mb-2">Hajj Surge Monitor</h4>
                          <p className="text-sm text-slate-400 mb-3">Special widget for Mecca hospitals during Hajj season patient surges</p>
                          <Button size="sm" className="bg-purple-600 hover:bg-purple-700 w-full">
                            Add Widget
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manager" className="space-y-6">
            <Card className="bg-slate-800/80 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-400" />
                  Dashboard Management
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Manage, organize, and share dashboards across teams with version control
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DashboardManager userRole={viewUserRole} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="semantic" className="space-y-6">
            <Card className="bg-slate-800/80 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Layers className="h-5 w-5 text-orange-400" />
                  Semantic Layer Builder
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Define business logic, relationships, and semantic terms for consistent analytics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SemanticLayerBuilder userRole={viewUserRole} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AstroView;
