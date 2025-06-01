
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bed, TrendingUp } from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { useState } from "react";

const COLORS = ['#ef4444', '#22c55e', '#f59e0b', '#3b82f6'];

export const LiveBedOccupancyTile = () => {
  const [selectedUnit, setSelectedUnit] = useState("all");

  const bedData = {
    total: 245,
    occupied: 198,
    available: 32,
    reserved: 15
  };

  const pieData = [
    { name: 'Occupied', value: bedData.occupied, color: COLORS[0] },
    { name: 'Available', value: bedData.available, color: COLORS[1] },
    { name: 'Reserved', value: bedData.reserved, color: COLORS[3] }
  ];

  const unitData = [
    { unit: 'ICU', total: 45, occupied: 42, available: 2, reserved: 1 },
    { unit: 'ER', total: 30, occupied: 28, available: 1, reserved: 1 },
    { unit: 'General', total: 170, occupied: 128, available: 29, reserved: 13 }
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Bed className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Live Bed Occupancy</CardTitle>
              <CardDescription>Real-time bed status monitoring</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
            <TrendingUp className="h-3 w-3 mr-1" />
            80.8%
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="grid grid-cols-4 gap-2 text-sm">
            <div className="text-center">
              <div className="font-bold text-lg">{bedData.total}</div>
              <div className="text-muted-foreground">Total</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-lg text-red-500">{bedData.occupied}</div>
              <div className="text-muted-foreground">Occupied</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-lg text-green-500">{bedData.available}</div>
              <div className="text-muted-foreground">Available</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-lg text-blue-500">{bedData.reserved}</div>
              <div className="text-muted-foreground">Reserved</div>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <ResponsiveContainer width="100%" height={120}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={50}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1">
            <Select value={selectedUnit} onValueChange={setSelectedUnit}>
              <SelectTrigger className="mb-2">
                <SelectValue placeholder="Filter by unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Units</SelectItem>
                <SelectItem value="icu">ICU</SelectItem>
                <SelectItem value="er">Emergency</SelectItem>
                <SelectItem value="general">General</SelectItem>
              </SelectContent>
            </Select>
            <ResponsiveContainer width="100%" height={80}>
              <BarChart data={unitData}>
                <XAxis dataKey="unit" hide />
                <YAxis hide />
                <Tooltip />
                <Bar dataKey="occupied" fill="#ef4444" />
                <Bar dataKey="available" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="text-xs text-muted-foreground bg-blue-50 p-2 rounded">
          <strong>AI Insight:</strong> ICU approaching capacity. Consider optimizing discharge flow for 3 stabilized patients.
        </div>
      </CardContent>
    </Card>
  );
};
