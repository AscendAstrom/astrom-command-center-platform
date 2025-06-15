import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { TableCell, TableRow } from "@/components/ui/table";
import { Clock, MapPin, AlertTriangle, Edit, Trash2 } from "lucide-react";
import { SLAConfiguration } from './types';

interface SLATableRowProps {
  sla: SLAConfiguration;
  canEdit: boolean;
  onToggleStatus: (slaId: string) => void;
}

const SLATableRow = ({ sla, canEdit, onToggleStatus }: SLATableRowProps) => {
  const getMetricTypeIcon = (type: string) => {
    switch (type) {
      case 'wait_time': return <Clock className="h-4 w-4" />;
      case 'utilization': return <MapPin className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600';
      case 'paused': return 'bg-yellow-600';
      case 'disabled': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  const isBreached = sla.currentValue !== undefined && sla.currentValue > sla.threshold;

  return (
    <TableRow className={`border-slate-800 transition-colors ${isBreached ? 'bg-red-900/50 hover:bg-red-900/60' : 'hover:bg-slate-800/50'}`}>
      <TableCell>
        <div>
          <div className="font-medium text-white">{sla.name}</div>
          <div className="text-sm text-slate-400">{sla.description}</div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-cyan-400" />
          <span className="text-slate-300">{sla.zoneName || 'All Zones'}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          {getMetricTypeIcon(sla.metricType)}
          <span className="text-slate-300 capitalize">
            {sla.metricType.replace('_', ' ')}
          </span>
        </div>
      </TableCell>
      <TableCell className="text-slate-300">
        {sla.threshold} {sla.unit}
      </TableCell>
      <TableCell>
        {sla.currentValue !== undefined ? (
          <div className="flex items-center gap-2">
            <span className={`font-bold ${isBreached ? 'text-red-400 animate-pulse' : 'text-green-400'}`}>
              {sla.currentValue} {sla.unit}
            </span>
            {isBreached && <AlertTriangle className="h-4 w-4 text-red-400" />}
          </div>
        ) : (
          <span className="text-slate-500">N/A</span>
        )}
      </TableCell>
      <TableCell>
        {sla.alertEnabled ? (
          <Badge className="bg-green-600">Enabled</Badge>
        ) : (
          <Badge variant="outline">Disabled</Badge>
        )}
      </TableCell>
      <TableCell>
        <Badge className={getStatusColor(sla.status)}>
          {sla.status}
        </Badge>
      </TableCell>
      {canEdit && (
        <TableCell>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300">
              <Edit className="h-4 w-4" />
            </Button>
            <Switch
              checked={sla.status === 'active'}
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
