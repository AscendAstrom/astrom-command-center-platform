
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Activity,
  FileText,
  Calendar,
  Users,
  Search,
  User,
  ChevronRight,
  BarChart3,
  Download,
  Zap,
  Brain,
  Bot,
  Shield,
  Monitor,
  TrendingUp
} from 'lucide-react';
import { useClinicalData, usePatients } from '@/hooks/useClinicalData';
import { ClinicalDataType } from '@/types/clinical';
import ClinicalDataTable from '@/components/clinical/ClinicalDataTable';
import ClinicalDetailDrawer from '@/components/clinical/ClinicalDetailDrawer';
import PatientTimeline from '@/components/clinical/PatientTimeline';
import AdvancedSearch, { SearchFilter } from '@/components/clinical/AdvancedSearch';
import ClinicalInsights from '@/components/clinical/ClinicalInsights';
import PredictiveAnalytics from '@/components/clinical/PredictiveAnalytics';
import WorkflowAutomation from '@/components/clinical/WorkflowAutomation';
import ClinicalAIAssistant from '@/components/clinical/ClinicalAIAssistant';
import ClinicalDecisionSupport from '@/components/clinical/ClinicalDecisionSupport';
import RealTimeMonitoring from '@/components/clinical/RealTimeMonitoring';
import ClinicalReporting from '@/components/clinical/ClinicalReporting';
import { ClinicalDataService } from '@/services/clinicalDataService';
import { toast } from 'sonner';

const ClinicalRecords = () => {
  const [selectedTab, setSelectedTab] = useState<ClinicalDataType>('encounters');
  const [selectedDetail, setSelectedDetail] = useState<{ data: any; type: ClinicalDataType } | null>(null);
  const [selectedPatientId, setSelectedPatientId] = useState<string>('');
  const [showPatientTimeline, setShowPatientTimeline] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const [showPredictiveAnalytics, setShowPredictiveAnalytics] = useState(false);
  const [showWorkflowAutomation, setShowWorkflowAutomation] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [showDecisionSupport, setShowDecisionSupport] = useState(false);
  const [showRealTimeMonitoring, setShowRealTimeMonitoring] = useState(false);
  const [showReporting, setShowReporting] = useState(false);
  const [patientSearchTerm, setPatientSearchTerm] = useState('');
  const [searchFilters, setSearchFilters] = useState<SearchFilter[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [realtimeChannels, setRealtimeChannels] = useState<any[]>([]);

  // Fetch data for all clinical types
  const allergiesQuery = useClinicalData('allergies');
  const carePlansQuery = useClinicalData('careplans');
  const conditionsQuery = useClinicalData('conditions');
  const devicesQuery = useClinicalData('devices');
  const encountersQuery = useClinicalData('encounters');
  const patientsQuery = usePatients();

  const clinicalData = {
    allergies: allergiesQuery,
    careplans: carePlansQuery,
    conditions: conditionsQuery,
    devices: devicesQuery,
    encounters: encountersQuery,
  };

  // Setup real-time subscriptions
  useEffect(() => {
    const channels = Object.keys(clinicalData).map(type => 
      ClinicalDataService.subscribeToUpdates(
        type as ClinicalDataType,
        (payload) => {
          console.log(`Real-time update for ${type}:`, payload);
          toast.info(`${type} data updated in real-time`);
        }
      )
    );

    setRealtimeChannels(channels);

    return () => {
      channels.forEach(channel => channel.unsubscribe());
    };
  }, []);

  // Filter data based on search and filters
  const getFilteredData = (data: any[]) => {
    let filtered = [...data];

    // Apply text search
    if (searchQuery.trim()) {
      filtered = filtered.filter(item =>
        item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.reason_description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply advanced filters
    searchFilters.forEach(filter => {
      filtered = filtered.filter(item => {
        const fieldValue = item[filter.field];
        
        switch (filter.operator) {
          case 'equals':
            return fieldValue === filter.value;
          case 'contains':
            return fieldValue?.toLowerCase().includes((filter.value as string).toLowerCase());
          case 'starts_with':
            return fieldValue?.toLowerCase().startsWith((filter.value as string).toLowerCase());
          case 'greater_than':
            return Number(fieldValue) > Number(filter.value);
          case 'less_than':
            return Number(fieldValue) < Number(filter.value);
          case 'date_range':
            if (typeof filter.value === 'object' && 'start' in filter.value) {
              const itemDate = new Date(fieldValue);
              const startDate = new Date(filter.value.start);
              const endDate = new Date(filter.value.end);
              return itemDate >= startDate && itemDate <= endDate;
            }
            return true;
          default:
            return true;
        }
      });
    });

    return filtered;
  };

  const currentData = clinicalData[selectedTab];
  const filteredData = getFilteredData(currentData.data || []);
  
  const filteredPatients = patientsQuery.patients.filter(patient =>
    `${patient.first_name} ${patient.last_name}`.toLowerCase().includes(patientSearchTerm.toLowerCase())
  );

  const handleRowClick = (item: any, type?: ClinicalDataType) => {
    const recordType = type || selectedTab;
    setSelectedDetail({ data: item, type: recordType });
    
    ClinicalDataService.logDataAccess(recordType, item.id, 'VIEW');
  };

  const handleCloseDetail = () => {
    setSelectedDetail(null);
  };

  const handlePatientSelect = (patientId: string) => {
    setSelectedPatientId(patientId);
    setShowPatientTimeline(true);
  };

  const handleSearch = (query: string, filters: SearchFilter[]) => {
    setSearchQuery(query);
    setSearchFilters(filters);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchFilters([]);
  };

  const handleExportData = async () => {
    try {
      const csvContent = await ClinicalDataService.exportToCsv(
        selectedTab,
        filteredData,
        selectedPatientId
      );
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${selectedTab}-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success(`${selectedTab} data exported successfully`);
    } catch (error) {
      toast.error('Failed to export data');
      console.error('Export error:', error);
    }
  };

  const getTabIcon = (type: ClinicalDataType) => {
    switch (type) {
      case 'allergies': return <Activity className="h-4 w-4" />;
      case 'careplans': return <FileText className="h-4 w-4" />;
      case 'conditions': return <Activity className="h-4 w-4" />;
      case 'devices': return <Activity className="h-4 w-4" />;
      case 'encounters': return <Calendar className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getTotalRecords = () => {
    return Object.values(clinicalData).reduce((total, query) => total + (query.data?.length || 0), 0);
  };

  const getAllClinicalData = () => {
    return {
      allergies: allergiesQuery.data || [],
      careplans: carePlansQuery.data || [],
      conditions: conditionsQuery.data || [],
      devices: devicesQuery.data || [],
      encounters: encountersQuery.data || []
    };
  };

  // Navigation handlers
  const resetToMain = () => {
    setShowInsights(false);
    setShowPatientTimeline(false);
    setShowPredictiveAnalytics(false);
    setShowWorkflowAutomation(false);
    setShowAIAssistant(false);
    setShowDecisionSupport(false);
    setShowRealTimeMonitoring(false);
    setShowReporting(false);
  };

  if (showReporting) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Button
              variant="ghost"
              onClick={resetToMain}
              className="mb-4"
            >
              ← Back to Clinical Records
            </Button>
            <h1 className="text-3xl font-bold">Clinical Reporting & Analytics</h1>
            <p className="text-muted-foreground">
              Comprehensive reporting and quality metrics dashboard
            </p>
          </div>
        </div>

        <ClinicalReporting />
      </div>
    );
  }

  if (showRealTimeMonitoring) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Button
              variant="ghost"
              onClick={resetToMain}
              className="mb-4"
            >
              ← Back to Clinical Records
            </Button>
            <h1 className="text-3xl font-bold">Real-Time Patient Monitoring</h1>
            <p className="text-muted-foreground">
              Live vital signs and patient status monitoring
            </p>
          </div>
        </div>

        <RealTimeMonitoring 
          patientId={selectedPatientId}
          department="ICU"
        />
      </div>
    );
  }

  if (showDecisionSupport) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Button
              variant="ghost"
              onClick={resetToMain}
              className="mb-4"
            >
              ← Back to Clinical Records
            </Button>
            <h1 className="text-3xl font-bold">Clinical Decision Support</h1>
            <p className="text-muted-foreground">
              AI-powered clinical decision support and safety alerts
            </p>
          </div>
        </div>

        <ClinicalDecisionSupport 
          patientId={selectedPatientId}
          data={getAllClinicalData()}
        />
      </div>
    );
  }

  if (showAIAssistant) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Button
              variant="ghost"
              onClick={resetToMain}
              className="mb-4"
            >
              ← Back to Clinical Records
            </Button>
            <h1 className="text-3xl font-bold">Clinical AI Assistant</h1>
            <p className="text-muted-foreground">
              AI-powered clinical decision support and insights
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ClinicalAIAssistant 
              context="clinical_records"
              patientId={selectedPatientId}
            />
          </div>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => setShowPredictiveAnalytics(true)}
                >
                  <Brain className="h-4 w-4 mr-2" />
                  Predictive Analytics
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => setShowDecisionSupport(true)}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Decision Support
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => setShowRealTimeMonitoring(true)}
                >
                  <Monitor className="h-4 w-4 mr-2" />
                  Real-Time Monitoring
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => setShowReporting(true)}
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Reporting & Analytics
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (showWorkflowAutomation) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Button
              variant="ghost"
              onClick={resetToMain}
              className="mb-4"
            >
              ← Back to Clinical Records
            </Button>
            <h1 className="text-3xl font-bold">Workflow Automation</h1>
            <p className="text-muted-foreground">
              Intelligent automation for clinical workflows
            </p>
          </div>
        </div>

        <WorkflowAutomation />
      </div>
    );
  }

  if (showPredictiveAnalytics) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Button
              variant="ghost"
              onClick={resetToMain}
              className="mb-4"
            >
              ← Back to Clinical Records
            </Button>
            <h1 className="text-3xl font-bold">Predictive Analytics</h1>
            <p className="text-muted-foreground">
              AI-powered predictions and risk assessment
            </p>
          </div>
        </div>

        <PredictiveAnalytics 
          data={getAllClinicalData()}
          selectedPatientId={selectedPatientId}
        />
      </div>
    );
  }

  if (showInsights) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Button
              variant="ghost"
              onClick={resetToMain}
              className="mb-4"
            >
              ← Back to Clinical Records
            </Button>
            <h1 className="text-3xl font-bold">Clinical Data Insights</h1>
            <p className="text-muted-foreground">
              Comprehensive analytics and insights from clinical data
            </p>
          </div>
        </div>

        <ClinicalInsights 
          data={getAllClinicalData()}
          selectedPatientId={selectedPatientId}
        />
      </div>
    );
  }

  if (showPatientTimeline && selectedPatientId) {
    const selectedPatient = patientsQuery.patients.find(p => p.id === selectedPatientId);
    
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Button
              variant="ghost"
              onClick={resetToMain}
              className="mb-4"
            >
              ← Back to Clinical Records
            </Button>
            <h1 className="text-3xl font-bold">Patient Timeline</h1>
            {selectedPatient && (
              <p className="text-muted-foreground">
                {selectedPatient.first_name} {selectedPatient.last_name}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setShowInsights(true)}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              View Insights
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowAIAssistant(true)}
            >
              <Bot className="h-4 w-4 mr-2" />
              AI Assistant
            </Button>
          </div>
        </div>

        <PatientTimeline 
          patientId={selectedPatientId}
          onItemClick={(item, type) => handleRowClick(item, type as ClinicalDataType)}
        />

        {selectedDetail && (
          <ClinicalDetailDrawer
            isOpen={!!selectedDetail}
            onClose={handleCloseDetail}
            data={selectedDetail.data}
            type={selectedDetail.type}
          />
        )}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Clinical Records</h1>
          <p className="text-muted-foreground">
            Advanced clinical data management with AI-powered insights
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => setShowAIAssistant(true)}
          >
            <Bot className="h-4 w-4 mr-2" />
            AI Assistant
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowDecisionSupport(true)}
          >
            <Shield className="h-4 w-4 mr-2" />
            Decision Support
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowRealTimeMonitoring(true)}
          >
            <Monitor className="h-4 w-4 mr-2" />
            Live Monitoring
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowReporting(true)}
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Reporting
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowPredictiveAnalytics(true)}
          >
            <Brain className="h-4 w-4 mr-2" />
            Predictive Analytics
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowWorkflowAutomation(true)}
          >
            <Zap className="h-4 w-4 mr-2" />
            Automation
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowInsights(true)}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Insights
          </Button>
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Total Records</p>
                <p className="text-2xl font-bold">{getTotalRecords()}</p>
              </div>
              <Badge variant="secondary" className="ml-2">
                <Zap className="h-3 w-3 mr-1" />
                Live
              </Badge>
            </div>
          </Card>
        </div>
      </div>

      {/* Patient Search and Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Patient Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients..."
                value={patientSearchTerm}
                onChange={(e) => setPatientSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              {filteredPatients.slice(0, 5).map((patient) => (
                <Button
                  key={patient.id}
                  variant="outline"
                  onClick={() => handlePatientSelect(patient.id)}
                  className="flex items-center gap-2"
                >
                  <User className="h-3 w-3" />
                  {patient.first_name} {patient.last_name}
                  <ChevronRight className="h-3 w-3" />
                </Button>
              ))}
              {filteredPatients.length > 5 && (
                <Badge variant="secondary">+{filteredPatients.length - 5} more</Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Search */}
      <AdvancedSearch
        dataType={selectedTab}
        onSearch={handleSearch}
        onClear={handleClearSearch}
        isLoading={currentData.isLoading}
      />

      {/* Clinical Data Tabs */}
      <Tabs value={selectedTab} onValueChange={(value) => setSelectedTab(value as ClinicalDataType)}>
        <div className="flex items-center justify-between">
          <TabsList className="grid w-full grid-cols-5 max-w-2xl">
            <TabsTrigger value="encounters" className="flex items-center gap-2">
              {getTabIcon('encounters')}
              Encounters ({encountersQuery.data?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="conditions" className="flex items-center gap-2">
              {getTabIcon('conditions')}
              Conditions ({conditionsQuery.data?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="allergies" className="flex items-center gap-2">
              {getTabIcon('allergies')}
              Allergies ({allergiesQuery.data?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="careplans" className="flex items-center gap-2">
              {getTabIcon('careplans')}
              Care Plans ({carePlansQuery.data?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="devices" className="flex items-center gap-2">
              {getTabIcon('devices')}
              Devices ({devicesQuery.data?.length || 0})
            </TabsTrigger>
          </TabsList>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportData}
            disabled={filteredData.length === 0}
          >
            <Download className="h-4 w-4 mr-2" />
            Export ({filteredData.length})
          </Button>
        </div>

        {Object.entries(clinicalData).map(([type, query]) => (
          <TabsContent key={type} value={type}>
            {query.isLoading ? (
              <Card>
                <CardContent className="p-8">
                  <div className="text-center">Loading {type}...</div>
                </CardContent>
              </Card>
            ) : query.error ? (
              <Card>
                <CardContent className="p-8">
                  <div className="text-center text-destructive">
                    Failed to load {type}: {query.error.message}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <ClinicalDataTable
                data={filteredData}
                type={type as ClinicalDataType}
                onRowClick={handleRowClick}
                patients={patientsQuery.patients}
              />
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Detail Drawer */}
      {selectedDetail && (
        <ClinicalDetailDrawer
          isOpen={!!selectedDetail}
          onClose={handleCloseDetail}
          data={selectedDetail.data}
          type={selectedDetail.type}
          onNavigateToPatient={handlePatientSelect}
          onNavigateToEncounter={(encounterId) => {
            const encounter = encountersQuery.data?.find((e: any) => e.id === encounterId);
            if (encounter) {
              handleRowClick(encounter, 'encounters');
            }
          }}
        />
      )}
    </div>
  );
};

export default ClinicalRecords;
