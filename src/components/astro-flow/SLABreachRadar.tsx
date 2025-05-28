
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, Users, TrendingUp } from 'lucide-react';

interface ZoneAlert {
  zoneId: string;
  zoneName: string;
  riskLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  currentWaitTime: number;
  slaThreshold: number;
  patientsAtRisk: number;
  estimatedBreachTime: number;
  aiConfidence: number;
}

interface SLABreachRadarProps {
  userRole: string;
}

const SLABreachRadar = ({ userRole }: SLABreachRadarProps) => {
  const [zoneAlerts, setZoneAlerts] = useState<ZoneAlert[]>([
    {
      zoneId: 'zone-a',
      zoneName: 'Zone A - Triage',
      riskLevel: 'LOW',
      currentWaitTime: 15,
      slaThreshold: 45,
      patientsAtRisk: 0,
      estimatedBreachTime: 30,
      aiConfidence: 92
    },
    {
      zoneId: 'zone-b',
      zoneName: 'Zone B - Treatment',
      riskLevel: 'MEDIUM',
      currentWaitTime: 38,
      slaThreshold: 45,
      patientsAtRisk: 2,
      estimatedBreachTime: 7,
      aiConfidence: 87
    },
    {
      zoneId: 'zone-c',
      zoneName: 'Zone C - Critical',
      riskLevel: 'HIGH',
      currentWaitTime: 52,
      slaThreshold: 45,
      patientsAtRisk: 4,
      estimatedBreachTime: -7,
      aiConfidence: 94
    }
  ]);

  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const hasHighRisk = zoneAlerts.some(zone => zone.riskLevel === 'HIGH');
    if (hasHighRisk) {
      const interval = setInterval(() => {
        setIsBlinking(prev => !prev);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [zoneAlerts]);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'HIGH': return 'bg-red-600 border-red-500';
      case 'MEDIUM': return 'bg-yellow-600 border-yellow-500';
      case 'LOW': return 'bg-green-600 border-green-500';
      default: return 'bg-gray-600 border-gray-500';
    }
  };

  const getRiskTextColor = (risk: string) => {
    switch (risk) {
      case 'HIGH': return 'text-red-400';
      case 'MEDIUM': return 'text-yellow-400';
      case 'LOW': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const formatTime = (minutes: number) => {
    if (minutes < 0) return `${Math.abs(minutes)}m OVERDUE`;
    return `${minutes}m remaining`;
  };

  return (
    <Card className="bg-card/80 border-border backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <AlertTriangle className={`h-5 w-5 text-red-500 ${isBlinking ? 'animate-pulse' : ''}`} />
          SLA Breach Radar
          {zoneAlerts.some(z => z.riskLevel === 'HIGH') && (
            <Badge className="bg-red-600 animate-pulse ml-2">ALERT</Badge>
          )}
        </CardTitle>
        <CardDescription>AI-powered real-time SLA breach prediction and monitoring</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {zoneAlerts.map((zone) => (
            <div
              key={zone.zoneId}
              className={`p-4 rounded-lg border-2 transition-all duration-500 ${
                getRiskColor(zone.riskLevel)
              } ${zone.riskLevel === 'HIGH' && isBlinking ? 'shadow-lg shadow-red-500/50' : ''}`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-white">{zone.zoneName}</h3>
                <Badge className={`${getRiskColor(zone.riskLevel)} text-white`}>
                  {zone.riskLevel}
                </Badge>
              </div>

              <div className="space-y-3 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">Current Wait</span>
                  </div>
                  <span className="font-bold">{zone.currentWaitTime}min</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">At Risk</span>
                  </div>
                  <span className="font-bold">{zone.patientsAtRisk} patients</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm">AI Confidence</span>
                  </div>
                  <span className="font-bold">{zone.aiConfidence}%</span>
                </div>

                <div className="pt-2 border-t border-white/20">
                  <div className="text-center">
                    <div className="text-xs opacity-80">Time to Breach</div>
                    <div className={`font-bold ${zone.estimatedBreachTime < 0 ? 'text-red-200' : 'text-white'}`}>
                      {formatTime(zone.estimatedBreachTime)}
                    </div>
                  </div>
                </div>
              </div>

              {zone.riskLevel === 'HIGH' && (
                <div className="mt-3 p-2 bg-black/30 rounded text-center">
                  <span className="text-xs text-red-200 font-medium animate-pulse">
                    ⚠️ IMMEDIATE ACTION REQUIRED
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-red-500">
                {zoneAlerts.filter(z => z.riskLevel === 'HIGH').length}
              </div>
              <div className="text-sm text-muted-foreground">High Risk Zones</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-500">
                {zoneAlerts.filter(z => z.riskLevel === 'MEDIUM').length}
              </div>
              <div className="text-sm text-muted-foreground">Medium Risk Zones</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">
                {zoneAlerts.reduce((sum, zone) => sum + zone.patientsAtRisk, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Patients at Risk</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-cyan-500">
                {Math.round(zoneAlerts.reduce((sum, zone) => sum + zone.aiConfidence, 0) / zoneAlerts.length)}%
              </div>
              <div className="text-sm text-muted-foreground">Avg AI Confidence</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SLABreachRadar;
