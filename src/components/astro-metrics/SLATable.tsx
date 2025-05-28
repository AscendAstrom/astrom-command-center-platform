
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import SLATableRow from './SLATableRow';
import type { Tables } from '@/integrations/supabase/types';

type SLA = Tables<'slas'>;

interface SLATableProps {
  slaConfigs: SLA[];
  canEdit: boolean;
  onToggleStatus: (slaId: string) => void;
  loading?: boolean;
}

const SLATable = ({ slaConfigs, canEdit, onToggleStatus, loading }: SLATableProps) => {
  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 rounded-lg border border-border animate-pulse">
            <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-muted rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-border">
          <TableHead className="text-foreground">SLA Name</TableHead>
          <TableHead className="text-foreground">Description</TableHead>
          <TableHead className="text-foreground">Target Value</TableHead>
          <TableHead className="text-foreground">Period</TableHead>
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
