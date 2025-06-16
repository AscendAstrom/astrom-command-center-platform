
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Database, 
  Workflow, 
  Eye, 
  Brain,
  Zap,
  Crown,
  Activity,
  TrendingUp,
  Shield,
  Target
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Astro<span className="text-purple-400">Vision</span>
          </h1>
          <p className="text-xl text-purple-200 mb-6">
            Next-Generation Healthcare Data Intelligence Platform
          </p>
          <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/50">
            AI-Powered Healthcare Analytics
          </Badge>
        </div>

        {/* Platform Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* AstroScan */}
          <Card className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-all duration-300 group">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Database className="h-6 w-6 text-blue-400 group-hover:text-blue-300" />
                AstroScan
              </CardTitle>
              <CardDescription className="text-purple-200">
                Intelligent data ingestion, processing, and quality monitoring
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-blue-300 border-blue-400/50">Data Sources</Badge>
                <Badge variant="outline" className="text-green-300 border-green-400/50">Real-time</Badge>
                <Badge variant="outline" className="text-purple-300 border-purple-400/50">AI Quality</Badge>
              </div>
              <Link to="/astro-scan">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Launch AstroScan
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* AstroWorkflow */}
          <Card className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-all duration-300 group">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Brain className="h-6 w-6 text-purple-400 group-hover:text-purple-300" />
                AstroWorkflow
                <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/50 text-xs">NEW</Badge>
              </CardTitle>
              <CardDescription className="text-purple-200">
                End-to-end AI-driven workflow automation and intelligence
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-purple-300 border-purple-400/50">AI Orchestration</Badge>
                <Badge variant="outline" className="text-blue-300 border-blue-400/50">Intelligence</Badge>
                <Badge variant="outline" className="text-gold-300 border-gold-400/50">Executive</Badge>
              </div>
              <Link to="/astro-workflow">
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  Launch AstroWorkflow
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* AstroFlow */}
          <Card className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-all duration-300 group">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-6 w-6 text-yellow-400 group-hover:text-yellow-300" />
                AstroFlow
              </CardTitle>
              <CardDescription className="text-purple-200">
                Advanced automation rules and intelligent workflow management
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-yellow-300 border-yellow-400/50">Automation</Badge>
                <Badge variant="outline" className="text-pink-300 border-pink-400/50">Workflows</Badge>
                <Badge variant="outline" className="text-cyan-300 border-cyan-400/50">AI Roles</Badge>
              </div>
              <Link to="/astro-flow">
                <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white">
                  Launch AstroFlow
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* AstroView */}
          <Card className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-all duration-300 group md:col-span-2 lg:col-span-3">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Eye className="h-6 w-6 text-green-400 group-hover:text-green-300" />
                AstroView
              </CardTitle>
              <CardDescription className="text-purple-200">
                Comprehensive visualization and monitoring dashboards
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-green-300 border-green-400/50">Dashboards</Badge>
                <Badge variant="outline" className="text-blue-300 border-blue-400/50">Analytics</Badge>
                <Badge variant="outline" className="text-orange-300 border-orange-400/50">Monitoring</Badge>
              </div>
              <Link to="/astro-view">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  Launch AstroView
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-slate-800/30 rounded-lg border border-slate-700">
            <Activity className="h-8 w-8 text-blue-400 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">Real-time Processing</h3>
            <p className="text-purple-200 text-sm">Live data ingestion and processing</p>
          </div>
          
          <div className="text-center p-6 bg-slate-800/30 rounded-lg border border-slate-700">
            <Brain className="h-8 w-8 text-purple-400 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">AI Intelligence</h3>
            <p className="text-purple-200 text-sm">Smart automation and insights</p>
          </div>
          
          <div className="text-center p-6 bg-slate-800/30 rounded-lg border border-slate-700">
            <Shield className="h-8 w-8 text-green-400 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">Enterprise Security</h3>
            <p className="text-purple-200 text-sm">HIPAA compliant and secure</p>
          </div>
          
          <div className="text-center p-6 bg-slate-800/30 rounded-lg border border-slate-700">
            <Target className="h-8 w-8 text-orange-400 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">Clinical Excellence</h3>
            <p className="text-purple-200 text-sm">Optimized for healthcare workflows</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
