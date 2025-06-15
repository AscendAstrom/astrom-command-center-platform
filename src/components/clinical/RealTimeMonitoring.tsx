import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  Heart, 
  Thermometer,
  Droplets,
  Wind,
  Zap,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface VitalSign {
  id: string;
  name: string;
  value: number;
  unit: string;
  normal_range: { min: number; max: number };
  trend: 'up' | 'down' | 'stable';
  last_updated: string;
  icon: any;
  color: string;
}

interface PatientAlert {
  id: string;
  patient_id: string;
  type: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: string;
  acknowledged: boolean;
}

interface RealTimeMonitoringProps {
  patientId?: string;
  department?: string;
}

const RealTimeMonitoring = ({ patientId, department }: RealTimeMonitoringProps) => {
  const [vitalSigns, setVitalSigns] = useState<VitalSign[]>([]);
  const [alerts, setAlerts] = useState<PatientAlert[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    initializeMonitoring();
    const interval = setInterval(updateVitalSigns, 5000); // Update every 5 seconds
    
    return () => clearInterval(interval);
  }, [patientId]);

  const initializeMonitoring = () => {
    setIsConnected(true);
    
    const mockVitalSigns: VitalSign[] = [
      {
        id: '1',
        name: 'Heart Rate',
        value: 78,
        unit: 'bpm',
        normal_range: { min: 60, max: 100 },
        trend: 'stable',
        last_updated: new Date().toISOString(),
        icon: Heart,
        color: 'text-red-500'
      },
      {
        id: '2',
        name: 'Blood Pressure',
        value: 120,
        unit: 'mmHg',
        normal_range: { min: 90, max: 140 },
        trend: 'up',
        last_updated: new Date().toISOString(),
        icon: Activity,
        color: 'text-blue-500'
      },
      {
        id: '3',
        name: 'Temperature',
        value: 98.6,
        unit: '°F',
        normal_range: { min: 97, max: 99 },
        trend: 'stable',
        last_updated: new Date().toISOString(),
        icon: Thermometer,
        color: 'text-orange-500'
      },
      {
        id: '4',
        name: 'Oxygen Saturation',
        value: 98,
        unit: '%',
        normal_range: { min: 95, max: 100 },
        trend: 'down',
        last_updated: new Date().toISOString(),
        icon: Wind,
        color: 'text-green-500'
      },
      {
        id: '5',
        name: 'Respiratory Rate',
        value: 16,
        unit: '/min',
        normal_range: { min: 12, max: 20 },
        trend: 'stable',
        last_updated: new Date().toISOString(),
        icon: Droplets,
        color: 'text-cyan-500'
      }
    ];

    setVitalSigns(mockVitalSigns);
    generateChartData();
  };

  const updateVitalSigns = () => {
    setVitalSigns(prev => prev.map(vital => {
      // Simulate realistic vital sign changes
      const variance = Math.random() * 4 - 2; // -2 to +2 range
      let newValue = vital.value + variance;
      
      // Keep within reasonable bounds
      if (vital.name === 'Heart Rate') {
        newValue = Math.max(50, Math.min(150, newValue));
      } else if (vital.name === 'Blood Pressure') {
        newValue = Math.max(80, Math.min(180, newValue));
      } else if (vital.name === 'Temperature') {
        newValue = Math.max(96, Math.min(102, newValue));
      } else if (vital.name === 'Oxygen Saturation') {
        newValue = Math.max(85, Math.min(100, newValue));
      } else if (vital.name === 'Respiratory Rate') {
        newValue = Math.max(8, Math.min(30, newValue));
      }

      // Determine trend
      let trend: 'up' | 'down' | 'stable' = 'stable';
      const difference = newValue - vital.value;
      if (Math.abs(difference) > 1) {
        trend = difference > 0 ? 'up' : 'down';
      }

      return {
        ...vital,
        value: Math.round(newValue * 10) / 10,
        trend,
        last_updated: new Date().toISOString()
      };
    }));

    setLastUpdate(new Date());
    
    // Check for critical values and generate alerts
    checkForAlerts();
  };

  const generateChartData = () => {
    const now = new Date();
    const data = [];
    
    for (let i = 23; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 60000); // Every minute for last 24 minutes
      data.push({
        time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        heartRate: 75 + Math.random() * 10 - 5,
        bloodPressure: 120 + Math.random() * 20 - 10,
        temperature: 98.6 + Math.random() * 2 - 1,
        oxygenSat: 97 + Math.random() * 3
      });
    }
    
    setChartData(data);
  };

  const checkForAlerts = () => {
    // Simulate alert generation based on vital signs
    const criticalThresholds = {
      'Heart Rate': { min: 50, max: 120 },
      'Blood Pressure': { min: 90, max: 160 },
      'Temperature': { min: 97, max: 101 },
      'Oxygen Saturation': { min: 90, max: 100 }
    };

    vitalSigns.forEach(vital => {
      const threshold = criticalThresholds[vital.name as keyof typeof criticalThresholds];
      if (threshold && (vital.value < threshold.min || vital.value > threshold.max)) {
        const newAlert: PatientAlert = {
          id: Date.now().toString() + vital.id,
          patient_id: patientId || 'unknown',
          type: 'critical',
          message: `${vital.name} is ${vital.value < threshold.min ? 'below' : 'above'} normal range: ${vital.value} ${vital.unit}`,
          timestamp: new Date().toISOString(),
          acknowledged: false
        };

        setAlerts(prev => {
          // Avoid duplicate alerts
          const exists = prev.some(alert => 
            alert.message === newAlert.message && 
            new Date(alert.timestamp).getTime() > Date.now() - 60000
          );
          return exists ? prev : [newAlert, ...prev.slice(0, 4)]; // Keep only last 5 alerts
        });
      }
    });
  };

  const getVitalStatus = (vital: VitalSign) => {
    const { value, normal_range } = vital;
    if (value < normal_range.min || value > normal_range.max) {
      return 'critical';
    }
    return 'normal';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-3 w-3 text-green-500" />;
      case 'down': return <TrendingDown className="h-3 w-3 text-red-500" />;
      default: return <Minus className="h-3 w-3 text-gray-500" />;
    }
  };

  const acknowledgeAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
  };

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Real-Time Monitoring
              {patientId && <Badge variant="outline">Patient {patientId}</Badge>}
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
              <span className="text-sm text-muted-foreground">
                {isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </p>
        </CardContent>
      </Card>

      {/* Active Alerts */}
      {alerts.filter(alert => !alert.acknowledged).length > 0 && (
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Active Alerts ({alerts.filter(alert => !alert.acknowledged).length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {alerts.filter(alert => !alert.acknowledged).map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-2 bg-red-50 rounded border-l-4 border-red-500">
                  <div>
                    <p className="font-medium text-red-800">{alert.message}</p>
                    <p className="text-xs text-red-600">
                      {new Date(alert.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => acknowledgeAlert(alert.id)}
                  >
                    Acknowledge
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Vital Signs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vitalSigns.map((vital) => {
          const IconComponent = vital.icon;
          const status = getVitalStatus(vital);
          
          return (
            <Card key={vital.id} className={`${status === 'critical' ? 'border-red-200 bg-red-50' : ''}`}>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <IconComponent className={`h-4 w-4 ${vital.color}`} />
                    {vital.name}
                  </div>
                  {getTrendIcon(vital.trend)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-baseline gap-1">
                    <span className={`text-2xl font-bold ${status === 'critical' ? 'text-red-600' : 'text-foreground'}`}>
                      {vital.value}
                    </span>
                    <span className="text-sm text-muted-foreground">{vital.unit}</span>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Normal: {vital.normal_range.min}-{vital.normal_range.max}</span>
                      <Badge variant={status === 'critical' ? 'destructive' : 'secondary'} className="text-xs">
                        {status === 'critical' ? 'Critical' : 'Normal'}
                      </Badge>
                    </div>
                    
                    <Progress 
                      value={((vital.value - vital.normal_range.min) / (vital.normal_range.max - vital.normal_range.min)) * 100}
                      className="h-2"
                    />
                  </div>
                  
                  <p className="text-xs text-muted-foreground">
                    Updated: {new Date(vital.last_updated).toLocaleTimeString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Trends Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Vital Signs Trends (Last 24 minutes)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="heartRate" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  dot={false}
                  name="Heart Rate"
                />
                <Line 
                  type="monotone" 
                  dataKey="bloodPressure" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={false}
                  name="Blood Pressure"
                />
                <Line 
                  type="monotone" 
                  dataKey="oxygenSat" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={false}
                  name="Oxygen Sat"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RealTimeMonitoring;
