
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { TableCell, TableRow } from "@/components/ui/table";
import { Edit, Trash2, Target } from "lucide-react";
import type { Tables } from '@/integrations/supabase/types';

type SLA = Tables<'slas'>;

interface SLATableRowProps {
  sla: SLA;
  canEdit: boolean;
  onToggleStatus: (slaId: string) => void;
}

const SLATableRow = ({ sla, canEdit, onToggleStatus }: SLATableRowProps) => {
  return (
    <TableRow className="border-border">
      <TableCell>
        <div>
          <div className="font-medium text-foreground">{sla.name}</div>
        </div>
      </TableCell>
      <TableCell>
        <span className="text-muted-foreground">{sla.description || 'No description'}</span>
      </TableCell>
      <TableCell className="text-foreground">
        {sla.target_value}
      </TableCell>
      <TableCell>
        <span className="text-muted-foreground">{sla.measurement_period}</span>
      </TableCell>
      <TableCell>
        <Badge className={sla.is_active ? 'bg-green-600' : 'bg-gray-600'}>
          {sla.is_active ? 'Active' : 'Inactive'}
        </Badge>
      </TableCell>
      {canEdit && (
        <TableCell>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300">
              <Edit className="h-4 w-4" />
            </Button>
            <Switch
              checked={sla.is_active}
              onCheckedChange={() => onToggleStatus(sla.id)}
            />
            <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </TableCell>
      )}
    </TableRow>
  );
};

export default SLATableRow;
