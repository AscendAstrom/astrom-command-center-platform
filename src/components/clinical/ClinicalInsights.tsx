import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  BarChart3,
  PieChart,
  Calendar,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download
} from 'lucide-react';
import { ClinicalDataService } from '@/services/clinicalDataService';
import { ClinicalDataType } from '@/types/clinical';

interface ClinicalInsightsProps {
  data: Record<ClinicalDataType, any[]>;
  selectedPatientId?: string;
}

interface Insight {
  title: string;
  value: string | number;
  change?: {
    value: number;
    direction: 'up' | 'down' | 'stable';
    period: string;
  };
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'orange' | 'red' | 'purple';
}

const ClinicalInsights = ({ data, selectedPatientId }: ClinicalInsightsProps) => {
  const [insights, setInsights] = useState<Record<ClinicalDataType, any>>({
    allergies: {},
    careplans: {},
    conditions: {},
    devices: {},
    encounters: {}
  });
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    generateInsights();
  }, [data]);

  const generateInsights = async () => {
    setIsGenerating(true);
    
    try {
      const generatedInsights: Record<string, any> = {};
      
      for (const [type, records] of Object.entries(data)) {
        generatedInsights[type] = ClinicalDataService.generateInsights(
          records, 
          type as ClinicalDataType
        );
      }
      
      setInsights(generatedInsights);
    } catch (error) {
      console.error('Failed to generate insights:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const getOverallMetrics = (): Insight[] => {
    const totalRecords = Object.values(data).reduce((sum, records) => sum + records.length, 0);
    const activeConditions = data.conditions?.filter(c => !c.stop_date).length || 0;
    const totalAllergies = data.allergies?.length || 0;
    const recentEncounters = data.encounters?.filter(e => {
      const encounterDate = new Date(e.start_date);
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      return encounterDate > thirtyDaysAgo;
    }).length || 0;

    return [
      {
        title: 'Total Records',
        value: totalRecords,
        icon: <Activity className="h-5 w-5" />,
        color: 'blue'
      },
      {
        title: 'Active Conditions',
        value: activeConditions,
        change: activeConditions > 0 ? { value: activeConditions, direction: 'up', period: 'current' } : undefined,
        icon: <AlertTriangle className="h-5 w-5" />,
        color: activeConditions > 0 ? 'orange' : 'green'
      },
      {
        title: 'Known Allergies',
        value: totalAllergies,
        icon: <AlertTriangle className="h-5 w-5" />,
        color: totalAllergies > 0 ? 'red' : 'green'
      },
      {
        title: 'Recent Encounters',
        value: recentEncounters,
        change: { value: recentEncounters, direction: 'up', period: '30 days' },
        icon: <Calendar className="h-5 w-5" />,
        color: 'purple'
      }
    ];
  };

  const getFinancialInsights = () => {
    const encounters = data.encounters || [];
    const totalCost = encounters.reduce((sum, e) => sum + (e.total_claim_cost || 0), 0);
    const avgCost = encounters.length > 0 ? totalCost / encounters.length : 0;
    const paidAmount = encounters.reduce((sum, e) => sum + (e.payer_coverage || 0), 0);
    const coverageRate = totalCost > 0 ? (paidAmount / totalCost) * 100 : 0;

    return {
      totalCost: totalCost.toFixed(2),
      avgCost: avgCost.toFixed(2),
      coverageRate: coverageRate.toFixed(1),
      encounterCount: encounters.length
    };
  };

  const getTimelineInsights = () => {
    const allRecords = Object.values(data).flat().filter(r => r.start_date);
    if (allRecords.length === 0) return null;

    const dates = allRecords.map(r => new Date(r.start_date));
    const earliest = new Date(Math.min(...dates.map(d => d.getTime())));
    const latest = new Date(Math.max(...dates.map(d => d.getTime())));
    const durationDays = Math.ceil((latest.getTime() - earliest.getTime()) / (1000 * 60 * 60 * 24));

    // Group by month for trend analysis
    const monthlyData = allRecords.reduce((acc, record) => {
      const month = new Date(record.start_date).toISOString().slice(0, 7);
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      earliest: earliest.toLocaleDateString(),
      latest: latest.toLocaleDateString(),
      durationDays,
      monthlyTrend: monthlyData
    };
  };

  const exportInsights = async () => {
    try {
      const insightsData = {
        generated_at: new Date().toISOString(),
        patient_id: selectedPatientId,
        overall_metrics: getOverallMetrics(),
        financial_insights: getFinancialInsights(),
        timeline_insights: getTimelineInsights(),
        detailed_insights: insights
      };

      const csvContent = `Clinical Insights Report\nGenerated: ${new Date().toLocaleString()}\n\n` +
        `Patient ID: ${selectedPatientId || 'All Patients'}\n\n` +
        `Overall Metrics:\n${getOverallMetrics().map(m => `${m.title}: ${m.value}`).join('\n')}\n\n` +
        `Financial Summary:\n${Object.entries(getFinancialInsights()).map(([k, v]) => `${k}: ${v}`).join('\n')}\n\n` +
        `Detailed Insights:\n${Object.entries(insights).map(([type, insight]) => 
          `${type.toUpperCase()}:\n${insight.insights?.join('\n') || 'No specific insights'}`
        ).join('\n\n')}`;

      const blob = new Blob([csvContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `clinical-insights-${selectedPatientId || 'all'}-${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export insights:', error);
    }
  };

  const overallMetrics = getOverallMetrics();
  const financialInsights = getFinancialInsights();
  const timelineInsights = getTimelineInsights();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Clinical Insights
            {selectedPatientId && <Badge variant="outline">Patient Specific</Badge>}
          </CardTitle>
          <Button variant="outline" size="sm" onClick={exportInsights}>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="detailed">Detailed</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {overallMetrics.map((metric, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className={`p-2 rounded-lg bg-${metric.color}-100 dark:bg-${metric.color}-900/20`}>
                          {metric.icon}
                        </div>
                        {metric.change && (
                          <div className={`flex items-center gap-1 text-sm ${
                            metric.change.direction === 'up' ? 'text-green-600' : 
                            metric.change.direction === 'down' ? 'text-red-600' : 'text-gray-600'
                          }`}>
                            {metric.change.direction === 'up' ? <TrendingUp className="h-3 w-3" /> : 
                             metric.change.direction === 'down' ? <TrendingDown className="h-3 w-3" /> : 
                             <Clock className="h-3 w-3" />}
                            <span>{metric.change.period}</span>
                          </div>
                        )}
                      </div>
                      <div className="mt-4">
                        <div className="text-2xl font-bold">{metric.value}</div>
                        <div className="text-sm text-muted-foreground">{metric.title}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="financial" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-2xl font-bold">${financialInsights.totalCost}</div>
                    <div className="text-sm text-muted-foreground">Total Healthcare Costs</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="text-2xl font-bold">${financialInsights.avgCost}</div>
                    <div className="text-sm text-muted-foreground">Average Cost per Encounter</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="text-2xl font-bold">{financialInsights.coverageRate}%</div>
                    <div className="text-sm text-muted-foreground">Insurance Coverage Rate</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="text-2xl font-bold">{financialInsights.encounterCount}</div>
                    <div className="text-sm text-muted-foreground">Total Encounters</div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="timeline" className="space-y-4">
              {timelineInsights ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-lg font-semibold">{timelineInsights.earliest}</div>
                      <div className="text-sm text-muted-foreground">First Record</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-lg font-semibold">{timelineInsights.latest}</div>
                      <div className="text-sm text-muted-foreground">Most Recent Record</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-lg font-semibold">{timelineInsights.durationDays} days</div>
                      <div className="text-sm text-muted-foreground">Care Duration</div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-muted-foreground">No timeline data available</div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="detailed" className="space-y-4">
              {isGenerating ? (
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-muted-foreground">Generating detailed insights...</div>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {Object.entries(insights).map(([type, insight]) => (
                    <Card key={type}>
                      <CardHeader>
                        <CardTitle className="capitalize">{type}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="text-2xl font-bold">{insight.totalRecords}</div>
                          <div className="text-sm text-muted-foreground">Total Records</div>
                          
                          {insight.dateRange && (
                            <div className="text-xs text-muted-foreground">
                              Range: {new Date(insight.dateRange.earliest).toLocaleDateString()} - {new Date(insight.dateRange.latest).toLocaleDateString()}
                            </div>
                          )}
                          
                          {insight.insights && insight.insights.length > 0 && (
                            <div className="mt-4 space-y-1">
                              {insight.insights.map((item: string, index: number) => (
                                <div key={index} className="text-sm flex items-center gap-2">
                                  <CheckCircle className="h-3 w-3 text-green-500" />
                                  {item}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClinicalInsights;
