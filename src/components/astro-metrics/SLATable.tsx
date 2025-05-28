
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SLAConfiguration } from './types';
import SLATableRow from './SLATableRow';

interface SLATableProps {
  slaConfigs: SLAConfiguration[];
  canEdit: boolean;
  onToggleStatus: (slaId: string) => void;
}

const SLATable = ({ slaConfigs, canEdit, onToggleStatus }: SLATableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-border">
          <TableHead className="text-foreground">SLA Name</TableHead>
          <TableHead className="text-foreground">Zone</TableHead>
          <TableHead className="text-foreground">Metric</TableHead>
          <TableHead className="text-foreground">Threshold</TableHead>
          <TableHead className="text-foreground">Alerts</TableHead>
          <TableHead className="text-foreground">Status</TableHead>
          {canEdit && <TableHead className="text-foreground">Actions</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {slaConfigs.map((sla) => (
          <SLATableRow
            key={sla.id}
            sla={sla}
            canEdit={canEdit}
            onToggleStatus={onToggleStatus}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default SLATable;
