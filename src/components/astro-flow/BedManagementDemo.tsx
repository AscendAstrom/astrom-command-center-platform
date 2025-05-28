
import { Badge } from "@/components/ui/badge";
import { Hospital, AlertTriangle, Bot, CheckCircle } from "lucide-react";
import BedManagementTable from "@/components/shared/BedManagementTable";
import { mockBedData } from "@/data/mockBedData";

const BedManagementDemo = () => {
  return (
    <div className="p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
      <div className="flex items-center gap-2 mb-4">
        <Hospital className="h-5 w-5 text-green-400" />
        <h3 className="text-lg font-semibold text-foreground">Saudi Hospital Bed Management Example</h3>
        <Badge className="bg-green-500/10 text-green-600 border-green-500/20">AI Automation Demo</Badge>
      </div>
      <p className="text-muted-foreground mb-4">
        Real-time AI workflow automation for Saudi healthcare facilities with cultural considerations and MOH compliance.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="p-4 bg-muted/50 rounded-lg border border-pink-500/20">
          <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-pink-400" />
            Automated Triggers
          </h4>
          <ul className="text-muted-foreground text-sm space-y-1">
            <li>• High occupancy alerts (&gt;90%)</li>
            <li>• Discharge delay notifications</li>
            <li>• Transfer bottleneck detection</li>
            <li>• MOH compliance violations</li>
          </ul>
        </div>
        
        <div className="p-4 bg-muted/50 rounded-lg border border-blue-500/20">
          <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
            <Bot className="h-4 w-4 text-blue-400" />
            AI Workflow Actions
          </h4>
          <ul className="text-muted-foreground text-sm space-y-1">
            <li>• Auto-assign incoming patients</li>
            <li>• Optimize bed cleaning schedules</li>
            <li>• Generate discharge summaries</li>
            <li>• Update MOH dashboards</li>
          </ul>
        </div>
        
        <div className="p-4 bg-muted/50 rounded-lg border border-green-500/20">
          <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-400" />
            Cultural Automation
          </h4>
          <ul className="text-muted-foreground text-sm space-y-1">
            <li>• Gender-separated ward assignments</li>
            <li>• Family accommodation priority</li>
            <li>• Prayer time scheduling</li>
            <li>• Hajj season surge handling</li>
          </ul>
        </div>
      </div>

      <BedManagementTable data={mockBedData.slice(0, 2)} showArabicNames={true} showCompliance={true} />
    </div>
  );
};

export default BedManagementDemo;
