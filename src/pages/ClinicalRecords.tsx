
import { useState } from 'react';
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
  ChevronRight
} from 'lucide-react';
import { useClinicalData, usePatients } from '@/hooks/useClinicalData';
import { ClinicalDataType } from '@/types/clinical';
import ClinicalDataTable from '@/components/clinical/ClinicalDataTable';
import ClinicalDetailDrawer from '@/components/clinical/ClinicalDetailDrawer';
import PatientTimeline from '@/components/clinical/PatientTimeline';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ClinicalRecords = () => {
  const [selectedTab, setSelectedTab] = useState<ClinicalDataType>('encounters');
  const [selectedDetail, setSelectedDetail] = useState<{ data: any; type: ClinicalDataType } | null>(null);
  const [selectedPatientId, setSelectedPatientId] = useState<string>('');
  const [showPatientTimeline, setShowPatientTimeline] = useState(false);
  const [patientSearchTerm, setPatientSearchTerm] = useState('');

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

  const currentData = clinicalData[selectedTab];
  const filteredPatients = patientsQuery.patients.filter(patient =>
    `${patient.first_name} ${patient.last_name}`.toLowerCase().includes(patientSearchTerm.toLowerCase())
  );

  const handleRowClick = (item: any, type?: ClinicalDataType) => {
    setSelectedDetail({ data: item, type: type || selectedTab });
  };

  const handleCloseDetail = () => {
    setSelectedDetail(null);
  };

  const handlePatientSelect = (patientId: string) => {
    setSelectedPatientId(patientId);
    setShowPatientTimeline(true);
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
    return Object.values(clinicalData).reduce((total, query) => total + query.data.length, 0);
  };

  if (showPatientTimeline && selectedPatientId) {
    const selectedPatient = patientsQuery.patients.find(p => p.id === selectedPatientId);
    
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Button
              variant="ghost"
              onClick={() => setShowPatientTimeline(false)}
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
            Manage patient clinical data including allergies, care plans, conditions, devices, and encounters
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Total Records</p>
                <p className="text-2xl font-bold">{getTotalRecords()}</p>
              </div>
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

      {/* Clinical Data Tabs */}
      <Tabs value={selectedTab} onValueChange={(value) => setSelectedTab(value as ClinicalDataType)}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="encounters" className="flex items-center gap-2">
            {getTabIcon('encounters')}
            Encounters ({encountersQuery.data.length})
          </TabsTrigger>
          <TabsTrigger value="conditions" className="flex items-center gap-2">
            {getTabIcon('conditions')}
            Conditions ({conditionsQuery.data.length})
          </TabsTrigger>
          <TabsTrigger value="allergies" className="flex items-center gap-2">
            {getTabIcon('allergies')}
            Allergies ({allergiesQuery.data.length})
          </TabsTrigger>
          <TabsTrigger value="careplans" className="flex items-center gap-2">
            {getTabIcon('careplans')}
            Care Plans ({carePlansQuery.data.length})
          </TabsTrigger>
          <TabsTrigger value="devices" className="flex items-center gap-2">
            {getTabIcon('devices')}
            Devices ({devicesQuery.data.length})
          </TabsTrigger>
        </TabsList>

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
                data={query.data}
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
            const encounter = encountersQuery.data.find(e => e.id === encounterId);
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
