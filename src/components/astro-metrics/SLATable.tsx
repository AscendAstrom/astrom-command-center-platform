
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
        <TableRow className="border-slate-800">
          <TableHead className="text-slate-300">SLA Name</TableHead>
          <TableHead className="text-slate-300">Zone</TableHead>
          <TableHead className="text-slate-300">Metric</TableHead>
          <TableHead className="text-slate-300">Threshold</TableHead>
          <TableHead className="text-slate-300">Alerts</TableHead>
          <TableHead className="text-slate-300">Status</TableHead>
          {canEdit && <TableHead className="text-slate-300">Actions</TableHead>}
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
