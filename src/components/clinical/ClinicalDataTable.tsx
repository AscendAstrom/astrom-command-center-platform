
import { useState, useMemo } from 'react';
import { 
  Table, 
  TableBody, 
  TableHead, 
  TableHeader, 
  TableRow, 
  TableCell 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Calendar,
  User,
  FileText,
  Activity
} from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ClinicalDataType } from '@/types/clinical';
import { format } from 'date-fns';

interface ClinicalDataTableProps {
  data: any[];
  type: ClinicalDataType;
  onRowClick?: (item: any) => void;
  patients?: any[];
}

const ClinicalDataTable = ({ data, type, onRowClick, patients = [] }: ClinicalDataTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<string>('all');
  const [encounterClassFilter, setEncounterClassFilter] = useState<string>('all');

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = searchTerm === '' || 
        item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.reason_description?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesPatient = selectedPatient === 'all' || item.patient_id === selectedPatient;
      
      const matchesEncounterClass = encounterClassFilter === 'all' || 
        item.encounter_class === encounterClassFilter;

      return matchesSearch && matchesPatient && matchesEncounterClass;
    });
  }, [data, searchTerm, selectedPatient, encounterClassFilter]);

  const getTypeIcon = (type: ClinicalDataType) => {
    switch (type) {
      case 'allergies': return <Activity className="h-4 w-4 text-red-500" />;
      case 'careplans': return <FileText className="h-4 w-4 text-blue-500" />;
      case 'conditions': return <Activity className="h-4 w-4 text-orange-500" />;
      case 'devices': return <Activity className="h-4 w-4 text-purple-500" />;
      case 'encounters': return <Calendar className="h-4 w-4 text-green-500" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getColumns = () => {
    const baseColumns = [
      { key: 'start_date', label: 'Date', width: 'w-32' },
      { key: 'patient', label: 'Patient', width: 'w-48' },
      { key: 'description', label: 'Description', width: 'flex-1' },
    ];

    switch (type) {
      case 'encounters':
        return [
          ...baseColumns,
          { key: 'encounter_class', label: 'Class', width: 'w-32' },
          { key: 'total_claim_cost', label: 'Cost', width: 'w-24' },
          { key: 'actions', label: 'Actions', width: 'w-20' },
        ];
      case 'careplans':
        return [
          ...baseColumns,
          { key: 'stop_date', label: 'End Date', width: 'w-32' },
          { key: 'reason_description', label: 'Reason', width: 'w-48' },
          { key: 'actions', label: 'Actions', width: 'w-20' },
        ];
      case 'devices':
        return [
          ...baseColumns,
          { key: 'code', label: 'Code', width: 'w-32' },
          { key: 'udi', label: 'UDI', width: 'w-32' },
          { key: 'actions', label: 'Actions', width: 'w-20' },
        ];
      default:
        return [
          ...baseColumns,
          { key: 'code', label: 'Code', width: 'w-32' },
          { key: 'actions', label: 'Actions', width: 'w-20' },
        ];
    }
  };

  const renderCellContent = (item: any, column: any) => {
    switch (column.key) {
      case 'start_date':
        return (
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              {format(new Date(item.start_date), 'MMM dd, yyyy')}
            </span>
          </div>
        );
      
      case 'stop_date':
        return item.stop_date ? (
          <span className="text-sm">
            {format(new Date(item.stop_date), 'MMM dd, yyyy')}
          </span>
        ) : (
          <Badge variant="outline">Ongoing</Badge>
        );
      
      case 'patient':
        const patient = item.patient || { first_name: 'Unknown', last_name: 'Patient' };
        return (
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">
              {patient.first_name} {patient.last_name}
            </span>
          </div>
        );
      
      case 'description':
        return (
          <span className="text-sm">
            {item.description || 'No description'}
          </span>
        );
      
      case 'encounter_class':
        return item.encounter_class ? (
          <Badge variant="secondary">{item.encounter_class}</Badge>
        ) : null;
      
      case 'total_claim_cost':
        return item.total_claim_cost ? (
          <span className="text-sm font-mono">
            ${item.total_claim_cost.toFixed(2)}
          </span>
        ) : null;
      
      case 'code':
        return item.code ? (
          <Badge variant="outline">{item.code}</Badge>
        ) : null;
      
      case 'udi':
        return item.udi ? (
          <span className="text-xs font-mono bg-muted px-2 py-1 rounded">
            {item.udi}
          </span>
        ) : null;
      
      case 'reason_description':
        return (
          <span className="text-sm text-muted-foreground">
            {item.reason_description || 'No reason specified'}
          </span>
        );
      
      case 'actions':
        return (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRowClick?.(item)}
          >
            <Eye className="h-4 w-4" />
          </Button>
        );
      
      default:
        return item[column.key] || '';
    }
  };

  const columns = getColumns();
  const uniqueEncounterClasses = Array.from(
    new Set(data.map(item => item.encounter_class).filter(Boolean))
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getTypeIcon(type)}
            <CardTitle className="capitalize">
              {type} ({filteredData.length})
            </CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={`Search ${type}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedPatient} onValueChange={setSelectedPatient}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Patients" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Patients</SelectItem>
                {patients.map((patient) => (
                  <SelectItem key={patient.id} value={patient.id}>
                    {patient.first_name} {patient.last_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {type === 'encounters' && (
              <Select value={encounterClassFilter} onValueChange={setEncounterClassFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Classes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  {uniqueEncounterClasses.map((encounterClass) => (
                    <SelectItem key={encounterClass} value={encounterClass}>
                      {encounterClass}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead key={column.key} className={column.width}>
                    {column.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center py-8">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <Filter className="h-8 w-8" />
                      <p>No {type} found</p>
                      <p className="text-sm">Try adjusting your search or filters</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((item) => (
                  <TableRow 
                    key={item.id} 
                    className="hover:bg-muted/50 cursor-pointer"
                    onClick={() => onRowClick?.(item)}
                  >
                    {columns.map((column) => (
                      <TableCell key={column.key} className={column.width}>
                        {renderCellContent(item, column)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClinicalDataTable;
