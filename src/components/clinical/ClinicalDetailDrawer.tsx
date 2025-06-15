
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar,
  User,
  FileText,
  Activity,
  ExternalLink,
  Clock
} from "lucide-react";
import { format } from 'date-fns';
import { ClinicalDataType } from '@/types/clinical';

interface ClinicalDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  type: ClinicalDataType;
  onNavigateToPatient?: (patientId: string) => void;
  onNavigateToEncounter?: (encounterId: string) => void;
}

const ClinicalDetailDrawer = ({ 
  isOpen, 
  onClose, 
  data, 
  type,
  onNavigateToPatient,
  onNavigateToEncounter 
}: ClinicalDetailDrawerProps) => {
  if (!data) return null;

  const getTypeIcon = () => {
    switch (type) {
      case 'allergies': return <Activity className="h-5 w-5 text-red-500" />;
      case 'careplans': return <FileText className="h-5 w-5 text-blue-500" />;
      case 'conditions': return <Activity className="h-5 w-5 text-orange-500" />;
      case 'devices': return <Activity className="h-5 w-5 text-purple-500" />;
      case 'encounters': return <Calendar className="h-5 w-5 text-green-500" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  const getTitle = () => {
    return data.description || `${type.charAt(0).toUpperCase() + type.slice(1)} Record`;
  };

  const renderPatientInfo = () => {
    const patient = data.patient;
    if (!patient) return null;

    return (
      <div className="space-y-3">
        <h4 className="font-semibold flex items-center gap-2">
          <User className="h-4 w-4" />
          Patient Information
        </h4>
        <div className="bg-muted/50 p-4 rounded-lg space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              {patient.first_name} {patient.last_name}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigateToPatient?.(patient.id)}
            >
              <ExternalLink className="h-3 w-3 mr-2" />
              View Patient
            </Button>
          </div>
          <div className="text-sm text-muted-foreground">
            <p>DOB: {format(new Date(patient.date_of_birth), 'MMM dd, yyyy')}</p>
            <p>Gender: {patient.gender}</p>
            <p>Patient ID: {patient.id}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderEncounterInfo = () => {
    const encounter = data.encounter;
    if (!encounter || type === 'encounters') return null;

    return (
      <div className="space-y-3">
        <h4 className="font-semibold flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Related Encounter
        </h4>
        <div className="bg-muted/50 p-4 rounded-lg space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              {encounter.description || 'Medical Encounter'}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigateToEncounter?.(encounter.id)}
            >
              <ExternalLink className="h-3 w-3 mr-2" />
              View Encounter
            </Button>
          </div>
          <div className="text-sm text-muted-foreground">
            <p>Date: {format(new Date(encounter.start_date), 'MMM dd, yyyy')}</p>
            {encounter.encounter_class && (
              <p>Class: <Badge variant="secondary">{encounter.encounter_class}</Badge></p>
            )}
            {encounter.total_claim_cost && (
              <p>Cost: ${encounter.total_claim_cost.toFixed(2)}</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderTypeSpecificFields = () => {
    switch (type) {
      case 'encounters':
        return (
          <div className="space-y-4">
            {data.encounter_class && (
              <div>
                <label className="text-sm font-medium">Encounter Class</label>
                <div className="mt-1">
                  <Badge variant="secondary">{data.encounter_class}</Badge>
                </div>
              </div>
            )}
            {data.total_claim_cost && (
              <div>
                <label className="text-sm font-medium">Total Claim Cost</label>
                <p className="text-lg font-mono mt-1">${data.total_claim_cost.toFixed(2)}</p>
              </div>
            )}
            {data.payer_coverage && (
              <div>
                <label className="text-sm font-medium">Payer Coverage</label>
                <p className="text-lg font-mono mt-1">${data.payer_coverage.toFixed(2)}</p>
              </div>
            )}
            {data.reason_description && (
              <div>
                <label className="text-sm font-medium">Reason</label>
                <p className="text-sm text-muted-foreground mt-1">{data.reason_description}</p>
              </div>
            )}
          </div>
        );

      case 'careplans':
        return (
          <div className="space-y-4">
            {data.stop_date && (
              <div>
                <label className="text-sm font-medium">End Date</label>
                <p className="text-sm mt-1">{format(new Date(data.stop_date), 'MMM dd, yyyy')}</p>
              </div>
            )}
            {data.reason_description && (
              <div>
                <label className="text-sm font-medium">Reason</label>
                <p className="text-sm text-muted-foreground mt-1">{data.reason_description}</p>
              </div>
            )}
          </div>
        );

      case 'devices':
        return (
          <div className="space-y-4">
            {data.udi && (
              <div>
                <label className="text-sm font-medium">UDI</label>
                <p className="text-sm font-mono bg-muted px-2 py-1 rounded mt-1">{data.udi}</p>
              </div>
            )}
          </div>
        );

      case 'conditions':
        return (
          <div className="space-y-4">
            {data.stop_date && (
              <div>
                <label className="text-sm font-medium">Resolution Date</label>
                <p className="text-sm mt-1">{format(new Date(data.stop_date), 'MMM dd, yyyy')}</p>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[500px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            {getTypeIcon()}
            {getTitle()}
          </SheetTitle>
          <SheetDescription>
            Detailed view of this {type.slice(0, -1)} record
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h4 className="font-semibold flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Basic Information
            </h4>
            
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium">Start Date</label>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{format(new Date(data.start_date), 'MMM dd, yyyy')}</span>
                </div>
              </div>

              {data.description && (
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <p className="text-sm text-muted-foreground mt-1">{data.description}</p>
                </div>
              )}

              {data.code && (
                <div>
                  <label className="text-sm font-medium">Code</label>
                  <div className="mt-1">
                    <Badge variant="outline">{data.code}</Badge>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Type-specific fields */}
          {renderTypeSpecificFields()}

          <Separator />

          {/* Patient Information */}
          {renderPatientInfo()}

          <Separator />

          {/* Encounter Information */}
          {renderEncounterInfo()}

          <Separator />

          {/* Metadata */}
          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Record Metadata
            </h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Created: {format(new Date(data.created_at), 'MMM dd, yyyy HH:mm')}</p>
              <p>Updated: {format(new Date(data.updated_at), 'MMM dd, yyyy HH:mm')}</p>
              <p>Record ID: {data.id}</p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ClinicalDetailDrawer;
