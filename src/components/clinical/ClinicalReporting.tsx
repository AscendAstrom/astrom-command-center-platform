
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePickerWithRange } from '@/components/ui/calendar';
import { 
  FileText, 
  Download, 
  Calendar,
  BarChart3,
  TrendingUp,
  Users,
  Activity,
  Clock,
  Target,
  AlertTriangle
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface Report {
  id: string;
  name: string;
  description: string;
  type: 'quality' | 'safety' | 'compliance' | 'operational';
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  last_generated: string;
  status: 'generating' | 'ready' | 'failed';
  data_points: number;
}

interface QualityMetric {
  name: string;
  value: number;
  target: number;
  trend: 'up' | 'down' | 'stable';
  status: 'good' | 'warning' | 'critical';
}

const ClinicalReporting = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<string>('');
  const [dateRange, setDateRange] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [qualityMetrics, setQualityMetrics] = useState<QualityMetric[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    loadReports();
    loadQualityMetrics();
    generateChartData();
  }, []);

  const loadReports = () => {
    const mockReports: Report[] = [
      {
        id: '1',
        name: 'Quality Indicators Dashboard',
        description: 'Core quality metrics including readmission rates, mortality, and patient satisfaction',
        type: 'quality',
        frequency: 'monthly',
        last_generated: '2024-06-14T10:00:00Z',
        status: 'ready',
        data_points: 12850
      },
      {
        id: '2',
        name: 'Patient Safety Report',
        description: 'Adverse events, medication errors, and safety incidents',
        type: 'safety',
        frequency: 'weekly',
        last_generated: '2024-06-13T15:30:00Z',
        status: 'ready',
        data_points: 3421
      },
      {
        id: '3',
        name: 'Regulatory Compliance Summary',
        description: 'CMS, Joint Commission, and state regulatory compliance metrics',
        type: 'compliance',
        frequency: 'quarterly',
        last_generated: '2024-06-01T09:00:00Z',
        status: 'generating',
        data_points: 8765
      },
      {
        id: '4',
        name: 'Operational Performance',
        description: 'Bed utilization, throughput times, and resource efficiency',
        type: 'operational',
        frequency: 'daily',
        last_generated: '2024-06-15T06:00:00Z',
        status: 'ready',
        data_points: 15432
      }
    ];

    setReports(mockReports);
  };

  const loadQualityMetrics = () => {
    const mockMetrics: QualityMetric[] = [
      {
        name: 'Readmission Rate (30-day)',
        value: 8.2,
        target: 10.0,
        trend: 'down',
        status: 'good'
      },
      {
        name: 'Mortality Rate',
        value: 2.1,
        target: 2.5,
        trend: 'stable',
        status: 'good'
      },
      {
        name: 'Patient Satisfaction',
        value: 87.5,
        target: 90.0,
        trend: 'up',
        status: 'warning'
      },
      {
        name: 'Infection Rate',
        value: 1.8,
        target: 1.5,
        trend: 'up',
        status: 'critical'
      },
      {
        name: 'Average Length of Stay',
        value: 4.2,
        target: 4.0,
        trend: 'down',
        status: 'warning'
      },
      {
        name: 'Medication Error Rate',
        value: 0.3,
        target: 0.5,
        trend: 'stable',
        status: 'good'
      }
    ];

    setQualityMetrics(mockMetrics);
  };

  const generateChartData = () => {
    // Mock data for charts
    const monthlyData = [
      { month: 'Jan', readmissions: 8.5, mortality: 2.2, satisfaction: 85 },
      { month: 'Feb', readmissions: 8.8, mortality: 2.4, satisfaction: 86 },
      { month: 'Mar', readmissions: 8.3, mortality: 2.1, satisfaction: 87 },
      { month: 'Apr', readmissions: 8.1, mortality: 2.0, satisfaction: 88 },
      { month: 'May', readmissions: 8.2, mortality: 2.1, satisfaction: 87.5 },
      { month: 'Jun', readmissions: 8.0, mortality: 2.1, satisfaction: 87.5 }
    ];

    setChartData(monthlyData);
  };

  const generateReport = async (reportId: string) => {
    setIsGenerating(true);
    setSelectedReport(reportId);

    try {
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setReports(prev => prev.map(report => 
        report.id === reportId 
          ? { ...report, status: 'ready', last_generated: new Date().toISOString() }
          : report
      ));
    } catch (error) {
      console.error('Failed to generate report:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const exportReport = (reportId: string, format: 'pdf' | 'excel' | 'csv') => {
    // Simulate export
    console.log(`Exporting report ${reportId} as ${format}`);
    alert(`Report exported as ${format.toUpperCase()}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      case 'critical': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'quality': return <Target className="h-4 w-4" />;
      case 'safety': return <AlertTriangle className="h-4 w-4" />;
      case 'compliance': return <FileText className="h-4 w-4" />;
      case 'operational': return <Activity className="h-4 w-4" />;
      default: return <BarChart3 className="h-4 w-4" />;
    }
  };

  const pieData = [
    { name: 'Good', value: qualityMetrics.filter(m => m.status === 'good').length, color: '#10b981' },
    { name: 'Warning', value: qualityMetrics.filter(m => m.status === 'warning').length, color: '#f59e0b' },
    { name: 'Critical', value: qualityMetrics.filter(m => m.status === 'critical').length, color: '#ef4444' }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Clinical Reporting & Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="quality">Quality Metrics</TabsTrigger>
              <TabsTrigger value="reports">Report Center</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-500">
                    {qualityMetrics.filter(m => m.status === 'good').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Metrics on Target</div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-500">
                    {qualityMetrics.filter(m => m.status === 'warning').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Needs Attention</div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-red-500">
                    {qualityMetrics.filter(m => m.status === 'critical').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Critical Issues</div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-500">
                    {reports.filter(r => r.status === 'ready').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Reports Ready</div>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quality Metrics Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            dataKey="value"
                            label={({ name, value }) => `${name}: ${value}`}
                          >
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Key Performance Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="readmissions" fill="#3b82f6" name="Readmissions %" />
                          <Bar dataKey="satisfaction" fill="#10b981" name="Satisfaction" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="quality" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {qualityMetrics.map((metric, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center justify-between">
                        {metric.name}
                        <Badge 
                          variant={metric.status === 'good' ? 'default' : metric.status === 'warning' ? 'secondary' : 'destructive'}
                          className="text-xs"
                        >
                          {metric.status}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-baseline gap-2">
                          <span className={`text-2xl font-bold ${getStatusColor(metric.status)}`}>
                            {metric.value}{metric.name.includes('Rate') || metric.name.includes('Stay') ? '%' : metric.name.includes('Satisfaction') ? '%' : ''}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            Target: {metric.target}{metric.name.includes('Rate') || metric.name.includes('Stay') ? '%' : metric.name.includes('Satisfaction') ? '%' : ''}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          {metric.trend === 'up' ? (
                            <TrendingUp className="h-3 w-3 text-green-500" />
                          ) : metric.trend === 'down' ? (
                            <TrendingUp className="h-3 w-3 text-red-500 rotate-180" />
                          ) : (
                            <div className="h-3 w-3" />
                          )}
                          <span className="text-muted-foreground">
                            {metric.trend === 'up' ? 'Improving' : metric.trend === 'down' ? 'Declining' : 'Stable'}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reports" className="space-y-4">
              <div className="flex items-center gap-4 mb-4">
                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="quality">Quality</SelectItem>
                    <SelectItem value="safety">Safety</SelectItem>
                    <SelectItem value="compliance">Compliance</SelectItem>
                    <SelectItem value="operational">Operational</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Date Range
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {reports.map((report) => (
                  <Card key={report.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(report.type)}
                          <span className="text-lg">{report.name}</span>
                        </div>
                        <Badge variant="outline" className="capitalize">
                          {report.type}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {report.description}
                      </p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span>Last Generated:</span>
                          <span>{new Date(report.last_generated).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Frequency:</span>
                          <span className="capitalize">{report.frequency}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Data Points:</span>
                          <span>{report.data_points.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Status:</span>
                          <Badge 
                            variant={report.status === 'ready' ? 'default' : report.status === 'generating' ? 'secondary' : 'destructive'}
                            className="text-xs"
                          >
                            {report.status === 'generating' && isGenerating && selectedReport === report.id ? 'Generating...' : report.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          onClick={() => generateReport(report.id)}
                          disabled={isGenerating || report.status === 'generating'}
                        >
                          {isGenerating && selectedReport === report.id ? 'Generating...' : 'Generate'}
                        </Button>
                        
                        {report.status === 'ready' && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => exportReport(report.id, 'pdf')}
                            >
                              <Download className="h-3 w-3 mr-1" />
                              PDF
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => exportReport(report.id, 'excel')}
                            >
                              <Download className="h-3 w-3 mr-1" />
                              Excel
                            </Button>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Performance Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="readmissions" fill="#ef4444" name="30-day Readmissions %" />
                        <Bar dataKey="mortality" fill="#f59e0b" name="Mortality Rate %" />
                        <Bar dataKey="satisfaction" fill="#10b981" name="Patient Satisfaction %" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClinicalReporting;
