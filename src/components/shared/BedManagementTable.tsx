
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { BedData } from "@/types/bedManagement";

interface BedManagementTableProps {
  data: BedData[];
  showArabicNames?: boolean;
  showCompliance?: boolean;
}

const BedManagementTable = ({ data, showArabicNames = false, showCompliance = false }: BedManagementTableProps) => {
  const getOccupancyColor = (rate: number) => {
    if (rate >= 95) return "text-red-600 bg-red-50";
    if (rate >= 90) return "text-orange-600 bg-orange-50";
    return "text-green-600 bg-green-50";
  };

  return (
    <TooltipProvider>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Hospital</TableHead>
            {showArabicNames && <TableHead>اسم المستشفى</TableHead>}
            <TableHead>Department</TableHead>
            <TableHead>Ward</TableHead>
            <TableHead>Planned</TableHead>
            <TableHead>Occupied</TableHead>
            <TableHead>Assigned</TableHead>
            <TableHead>Dirty</TableHead>
            <TableHead>Unassigned</TableHead>
            <TableHead>Confirmed DC</TableHead>
            <TableHead>Potential DC</TableHead>
            <TableHead>Transfer Orders</TableHead>
            <TableHead>Net Available</TableHead>
            <TableHead>Occupancy Rate</TableHead>
            <TableHead>Projected Rate</TableHead>
            {showCompliance && <TableHead>MOH Compliance</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, idx) => (
            <TableRow key={idx}>
              <TableCell className="font-medium">{item.hospital}</TableCell>
              {showArabicNames && <TableCell className="text-right font-arabic">{item.arabicName}</TableCell>}
              <TableCell>{item.department}</TableCell>
              <TableCell>{item.ward}</TableCell>
              <TableCell>{item.plannedBeds}</TableCell>
              <TableCell>
                <Tooltip>
                  <TooltipTrigger className="underline cursor-help">
                    {item.occupiedBeds}
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="space-y-1">
                      <p><strong>Occupied:</strong> {item.occupiedBeds} / {item.plannedBeds}</p>
                      <p><strong>Utilization:</strong> {item.occupancyRate}%</p>
                      <p><strong>Available:</strong> {item.netAvailableBeds}</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TableCell>
              <TableCell>{item.assignedBeds}</TableCell>
              <TableCell>{item.dirtyBeds}</TableCell>
              <TableCell>{item.unassignedPatients}</TableCell>
              <TableCell>{item.confirmedDischarge}</TableCell>
              <TableCell>{item.potentialDischarge}</TableCell>
              <TableCell>{item.transferOrders}</TableCell>
              <TableCell className="font-medium">{item.netAvailableBeds}</TableCell>
              <TableCell>
                <Badge variant="outline" className={getOccupancyColor(item.occupancyRate)}>
                  {item.occupancyRate}%
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={getOccupancyColor(item.projectedRate)}>
                  {item.projectedRate}%
                </Badge>
              </TableCell>
              {showCompliance && (
                <TableCell>
                  <Badge variant={item.mohCompliance ? "default" : "destructive"}>
                    {item.mohCompliance ? "Compliant" : "Non-Compliant"}
                  </Badge>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TooltipProvider>
  );
};

export default BedManagementTable;
