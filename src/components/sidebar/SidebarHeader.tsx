
import { useSidebar } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { useClinical } from "@/contexts/ClinicalContext";
import { Heart, AlertTriangle } from "lucide-react";

export function SidebarHeader() {
  const { state } = useSidebar();
  const { metrics, alerts } = useClinical();
  const collapsed = state === "collapsed";
  const criticalAlerts = alerts.filter(a => a.type === 'critical' && !a.acknowledged).length;

  return (
    <div className={`p-4 border-b border-border/50 ${collapsed ? 'px-2' : ''}`}>
      <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-foreground text-lg leading-tight">AstroMed</span>
              <span className="text-xs text-muted-foreground font-medium">Hospital Platform</span>
            </div>
          </div>
        )}
        
        {collapsed && (
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-sm">A</span>
          </div>
        )}
      </div>
      
      {/* Clinical Status Indicators */}
      {!collapsed && (
        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Clinical Status</span>
            <div className="flex items-center gap-1">
              <Heart className="h-3 w-3 text-red-500" />
              <span className="font-medium">{metrics.activePatientsCount}</span>
            </div>
          </div>
          
          {criticalAlerts > 0 && (
            <Badge variant="destructive" className="w-full justify-center text-xs animate-pulse">
              <AlertTriangle className="h-3 w-3 mr-1" />
              {criticalAlerts} Critical Alert{criticalAlerts > 1 ? 's' : ''}
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
