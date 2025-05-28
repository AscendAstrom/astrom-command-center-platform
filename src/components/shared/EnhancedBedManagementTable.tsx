
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BedData, PatientData, BedDetail, OccupancyThresholds } from "@/types/bedManagement";
import { 
  ChevronRight, 
  ChevronDown, 
  Users, 
  Bed, 
  AlertTriangle, 
  Clock,
  CheckCircle,
  Trash2,
  UserCheck,
  ArrowRightLeft
} from "lucide-react";

interface EnhancedBedManagementTableProps {
  data: BedData[];
  showArabicNames?: boolean;
  showCompliance?: boolean;
  thresholds?: OccupancyThresholds;
  onRowExpand?: (id: string) => void;
  expandedRows?: string[];
}

const EnhancedBedManagementTable = ({ 
  data, 
  showArabicNames = false, 
  showCompliance = false,
  thresholds = { normal: 75, warning: 90, critical: 95 },
  onRowExpand,
  expandedRows = []
}: EnhancedBedManagementTableProps) => {
  const [localExpandedRows, setLocalExpandedRows] = useState<string[]>(
    data.filter(item => item.isExpanded).map(item => item.id)
  );

  const expandedRowsToUse = expandedRows.length > 0 ? expandedRows : localExpandedRows;

  const handleRowExpand = (id: string) => {
    if (onRowExpand) {
      onRowExpand(id);
    } else {
      setLocalExpandedRows(prev => 
        prev.includes(id) 
          ? prev.filter(rowId => rowId !== id)
          : [...prev, id]
      );
    }
  };

  const getOccupancyColor = (rate: number) => {
    if (rate >= thresholds.critical) return "text-red-600 bg-red-50 border-red-200";
    if (rate >= thresholds.warning) return "text-orange-600 bg-orange-50 border-orange-200";
    return "text-green-600 bg-green-50 border-green-200";
  };

  const getOccupancyIcon = (rate: number) => {
    if (rate >= thresholds.critical) return <AlertTriangle className="h-3 w-3" />;
    if (rate >= thresholds.warning) return <Clock className="h-3 w-3" />;
    return <CheckCircle className="h-3 w-3" />;
  };

  const getLevelIndentation = (level: string) => {
    const indentMap = {
      organization: 0,
      hospital: 16,
      department: 32,
      ward: 48,
      room: 64
    };
    return indentMap[level as keyof typeof indentMap] || 0;
  };

  const getBedStatusIcon = (status: string) => {
    switch (status) {
      case 'dirty': return <Trash2 className="h-3 w-3 text-red-500" />;
      case 'evs-requested': return <Clock className="h-3 w-3 text-orange-500" />;
      case 'evs-accepted': return <UserCheck className="h-3 w-3 text-blue-500" />;
      case 'evs-assigned': return <ArrowRightLeft className="h-3 w-3 text-purple-500" />;
      default: return null;
    }
  };

  const renderPatientTooltip = (patients: PatientData[], type: 'occupied' | 'assigned' | 'potential' | 'confirmed') => (
    <div className="space-y-2 max-w-xs">
      <div className="font-semibold text-sm border-b pb-1">
        {type === 'occupied' && 'Occupied Beds'}
        {type === 'assigned' && 'Assigned Beds'}
        {type === 'potential' && 'Potential Discharge'}
        {type === 'confirmed' && 'Confirmed Discharge'}
      </div>
      {patients.slice(0, 5).map((patient, idx) => (
        <div key={idx} className="text-xs space-y-1">
          <div className="flex justify-between">
            <span className="font-medium">{patient.nameAbbreviation}</span>
            <span className="text-muted-foreground">{patient.mrn}</span>
          </div>
          <div className="text-muted-foreground">
            LOS: {patient.los} days • {patient.bedLocation.department}
          </div>
          <div className="text-muted-foreground">
            {patient.bedLocation.ward} → {patient.bedLocation.room}-{patient.bedLocation.bedNumber}
          </div>
          {type === 'potential' && patient.estimatedDischargeDate && (
            <div className="text-blue-600 text-xs">
              EDD: {new Date(patient.estimatedDischargeDate).toLocaleDateString()}
            </div>
          )}
          {type === 'confirmed' && patient.actualDischargeDate && (
            <div className="text-green-600 text-xs">
              DC: {new Date(patient.actualDischargeDate).toLocaleDateString()}
            </div>
          )}
        </div>
      ))}
      {patients.length > 5 && (
        <div className="text-xs text-muted-foreground">
          +{patients.length - 5} more patients...
        </div>
      )}
    </div>
  );

  const renderBedTooltip = (beds: BedDetail[], type: 'dirty' | 'assigned') => (
    <div className="space-y-2 max-w-xs">
      <div className="font-semibold text-sm border-b pb-1">
        {type === 'dirty' ? 'Dirty Beds' : 'Assigned Beds'}
      </div>
      {beds.slice(0, 5).map((bed, idx) => (
        <div key={idx} className="text-xs space-y-1">
          <div className="flex justify-between items-center">
            <span className="font-medium">Bed {bed.bedNumber}</span>
            {getBedStatusIcon(bed.status)}
          </div>
          <div className="text-muted-foreground">
            Room {bed.roomId} • Status: {bed.status}
          </div>
          {bed.patient && (
            <div className="text-blue-600">
              Patient: {bed.patient.nameAbbreviation} ({bed.patient.mrn})
            </div>
          )}
          {bed.lastCleaned && (
            <div className="text-muted-foreground">
              Last cleaned: {new Date(bed.lastCleaned).toLocaleString()}
            </div>
          )}
        </div>
      ))}
      {beds.length > 5 && (
        <div className="text-xs text-muted-foreground">
          +{beds.length - 5} more beds...
        </div>
      )}
    </div>
  );

  const visibleData = data.filter(item => {
    if (!item.parentId) return true;
    return expandedRowsToUse.includes(item.parentId);
  });

  return (
    <TooltipProvider>
      <div className="space-y-4">
        {/* Legend */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3 text-green-600" />
            <span>Normal (&lt;{thresholds.normal}%)</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-orange-600" />
            <span>Warning ({thresholds.normal}-{thresholds.warning}%)</span>
          </div>
          <div className="flex items-center gap-1">
            <AlertTriangle className="h-3 w-3 text-red-600" />
            <span>Critical (&gt;{thresholds.warning}%)</span>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-80">Organization / Hospital / Department / Ward</TableHead>
              {showArabicNames && <TableHead className="text-right">Arabic Name</TableHead>}
              <TableHead className="text-center">Planned</TableHead>
              <TableHead className="text-center">Occupied</TableHead>
              <TableHead className="text-center">Assigned</TableHead>
              <TableHead className="text-center">Dirty</TableHead>
              <TableHead className="text-center">Unassigned</TableHead>
              <TableHead className="text-center">Confirmed DC</TableHead>
              <TableHead className="text-center">Potential DC</TableHead>
              <TableHead className="text-center">Transfer Orders</TableHead>
              <TableHead className="text-center">Net Available</TableHead>
              <TableHead className="text-center">Occupancy Rate</TableHead>
              <TableHead className="text-center">Projected Rate</TableHead>
              {showCompliance && <TableHead className="text-center">MOH Compliance</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {visibleData.map((item) => (
              <TableRow key={item.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">
                  <div 
                    className="flex items-center"
                    style={{ paddingLeft: `${getLevelIndentation(item.level)}px` }}
                  >
                    {item.hasChildren && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-0 h-4 w-4 mr-2"
                        onClick={() => handleRowExpand(item.id)}
                      >
                        {expandedRowsToUse.includes(item.id) ? 
                          <ChevronDown className="h-3 w-3" /> : 
                          <ChevronRight className="h-3 w-3" />
                        }
                      </Button>
                    )}
                    <div className="flex-1">
                      <div className="font-medium">
                        {item.level === 'organization' && item.org}
                        {item.level === 'hospital' && item.hospital}
                        {item.level === 'department' && item.department}
                        {item.level === 'ward' && item.ward}
                      </div>
                      <div className="text-xs text-muted-foreground capitalize">
                        {item.level}
                      </div>
                    </div>
                  </div>
                </TableCell>
                
                {showArabicNames && (
                  <TableCell className="text-right font-arabic">
                    {item.arabicName}
                  </TableCell>
                )}
                
                <TableCell className="text-center">{item.plannedBeds}</TableCell>
                
                <TableCell className="text-center">
                  {item.patients && item.patients.length > 0 ? (
                    <Tooltip>
                      <TooltipTrigger className="underline cursor-help hover:text-blue-600">
                        {item.occupiedBeds}
                      </TooltipTrigger>
                      <TooltipContent>
                        {renderPatientTooltip(item.patients, 'occupied')}
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    item.occupiedBeds
                  )}
                </TableCell>
                
                <TableCell className="text-center">
                  {item.beds && item.beds.filter(b => b.status === 'occupied' && b.patient).length > 0 ? (
                    <Tooltip>
                      <TooltipTrigger className="underline cursor-help hover:text-blue-600">
                        {item.assignedBeds}
                      </TooltipTrigger>
                      <TooltipContent>
                        {renderBedTooltip(item.beds.filter(b => b.status === 'occupied'), 'assigned')}
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    item.assignedBeds
                  )}
                </TableCell>
                
                <TableCell className="text-center">
                  {item.beds && item.beds.filter(b => b.status === 'dirty').length > 0 ? (
                    <Tooltip>
                      <TooltipTrigger className="underline cursor-help hover:text-orange-600">
                        {item.dirtyBeds}
                      </TooltipTrigger>
                      <TooltipContent>
                        {renderBedTooltip(item.beds.filter(b => b.status === 'dirty'), 'dirty')}
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    item.dirtyBeds
                  )}
                </TableCell>
                
                <TableCell className="text-center">{item.unassignedPatients}</TableCell>
                
                <TableCell className="text-center">
                  {item.patients && item.patients.filter(p => p.actualDischargeDate).length > 0 ? (
                    <Tooltip>
                      <TooltipTrigger className="underline cursor-help hover:text-green-600">
                        {item.confirmedDischarge}
                      </TooltipTrigger>
                      <TooltipContent>
                        {renderPatientTooltip(item.patients.filter(p => p.actualDischargeDate), 'confirmed')}
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    item.confirmedDischarge
                  )}
                </TableCell>
                
                <TableCell className="text-center">
                  {item.patients && item.patients.filter(p => p.estimatedDischargeDate && !p.actualDischargeDate).length > 0 ? (
                    <Tooltip>
                      <TooltipTrigger className="underline cursor-help hover:text-blue-600">
                        {item.potentialDischarge}
                      </TooltipTrigger>
                      <TooltipContent>
                        {renderPatientTooltip(item.patients.filter(p => p.estimatedDischargeDate && !p.actualDischargeDate), 'potential')}
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    item.potentialDischarge
                  )}
                </TableCell>
                
                <TableCell className="text-center">{item.transferOrders}</TableCell>
                <TableCell className="text-center font-medium">{item.netAvailableBeds}</TableCell>
                
                <TableCell className="text-center">
                  <Badge variant="outline" className={`${getOccupancyColor(item.occupancyRate)} flex items-center gap-1`}>
                    {getOccupancyIcon(item.occupancyRate)}
                    {item.occupancyRate}%
                  </Badge>
                </TableCell>
                
                <TableCell className="text-center">
                  <Badge variant="outline" className={`${getOccupancyColor(item.projectedRate)} flex items-center gap-1`}>
                    {getOccupancyIcon(item.projectedRate)}
                    {item.projectedRate}%
                  </Badge>
                </TableCell>
                
                {showCompliance && (
                  <TableCell className="text-center">
                    <Badge variant={item.mohCompliance ? "default" : "destructive"}>
                      {item.mohCompliance ? "Compliant" : "Non-Compliant"}
                    </Badge>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Infinite scroll indicator */}
        <div className="flex justify-center py-4">
          <div className="text-sm text-muted-foreground">
            Showing {visibleData.length} of {data.length} records
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default EnhancedBedManagementTable;
