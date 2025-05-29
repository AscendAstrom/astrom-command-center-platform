
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DashboardWidget } from '../types';

interface WidgetTableProps {
  widget: DashboardWidget;
}

const WidgetTable = ({ widget }: WidgetTableProps) => {
  const data = widget.data || [];
  
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        No data available
      </div>
    );
  }

  const columns = Object.keys(data[0]);
  
  const getStatusBadge = (status: string) => {
    const statusColors: { [key: string]: string } = {
      'Active': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'Waiting': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      'Complete': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'Inactive': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    };
    
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="h-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column} className="text-xs font-medium">
                {column.charAt(0).toUpperCase() + column.slice(1)}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column} className="text-xs">
                  {column === 'status' ? (
                    <Badge className={getStatusBadge(row[column])}>
                      {row[column]}
                    </Badge>
                  ) : (
                    row[column]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default WidgetTable;
