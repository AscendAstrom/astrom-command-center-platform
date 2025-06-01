
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, AlertTriangle, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

export const PharmacySuppliesTile = () => {
  const metrics = {
    lowStockItems: 8,
    criticalStockItems: 3,
    replenishmentETA: "2 hours",
    autoOrdersPlaced: 5
  };

  const inventoryData = [
    { category: 'Antibiotics', stock: 85, threshold: 90 },
    { category: 'Pain Meds', stock: 45, threshold: 70 },
    { category: 'Surgical', stock: 25, threshold: 50 },
    { category: 'Emergency', stock: 92, threshold: 80 }
  ];

  const getStockColor = (stock: number, threshold: number) => {
    const percentage = (stock / threshold) * 100;
    if (percentage >= 100) return '#22c55e';
    if (percentage >= 60) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-orange-500/10 rounded-lg">
              <Package className="h-5 w-5 text-orange-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Pharmacy & Supplies</CardTitle>
              <CardDescription>Inventory management</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50">
            <AlertTriangle className="h-3 w-3 mr-1" />
            {metrics.lowStockItems} Low
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-xl font-bold text-orange-600">{metrics.lowStockItems}</div>
            <div className="text-xs text-muted-foreground">Low Stock Items</div>
          </div>
          <div>
            <div className="text-xl font-bold text-red-600">{metrics.criticalStockItems}</div>
            <div className="text-xs text-muted-foreground">Critical</div>
          </div>
        </div>

        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={inventoryData}>
              <XAxis dataKey="category" fontSize={10} />
              <YAxis hide />
              <Tooltip />
              <Bar 
                dataKey="stock" 
                fill={(entry) => getStockColor(entry.stock, entry.threshold)}
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="bg-blue-50 p-2 rounded text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Clock className="h-3 w-3 text-blue-500" />
              <span className="text-xs font-medium">Next Delivery</span>
            </div>
            <div className="text-sm font-bold text-blue-600">{metrics.replenishmentETA}</div>
          </div>
          <div className="bg-green-50 p-2 rounded text-center">
            <div className="text-xs font-medium mb-1">Auto Orders</div>
            <div className="text-sm font-bold text-green-600">{metrics.autoOrdersPlaced}</div>
          </div>
        </div>

        <div className="text-xs text-muted-foreground bg-orange-50 p-2 rounded">
          <strong>Recovery Planner:</strong> Priority order placed for surgical supplies. ETA confirmed.
        </div>
      </CardContent>
    </Card>
  );
};
