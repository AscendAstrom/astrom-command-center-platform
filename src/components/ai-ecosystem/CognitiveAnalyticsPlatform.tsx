import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { 
  Brain, 
  Search, 
  Eye, 
  MessageSquare,
  Network,
  Zap,
  FileText,
  Image,
  Globe,
  TrendingUp
} from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';

interface NLPTask {
  id: string;
  type: 'clinical_notes' | 'discharge_summary' | 'lab_report' | 'imaging_report';
  status: 'processing' | 'completed' | 'queued';
  confidence: number;
  entities: number;
  processingTime: string;
}

interface VisionTask {
  id: string;
  type: 'bed_status' | 'equipment_detection' | 'patient_monitoring' | 'safety_compliance';
  status: 'analyzing' | 'completed' | 'failed';
  accuracy: number;
  objectsDetected: number;
  processingTime: string;
}

interface KnowledgeGraphNode {
  id: string;
  label: string;
  type: 'patient' | 'department' | 'equipment' | 'staff' | 'outcome';
  connections: number;
  relevanceScore: number;
}

const CognitiveAnalyticsPlatform = () => {
  const [nlpTasks, setNlpTasks] = useState<NLPTask[]>([]);
  const [visionTasks, setVisionTasks] = useState<VisionTask[]>([]);
  const [knowledgeGraph, setKnowledgeGraph] = useState<KnowledgeGraphNode[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const [platformMetrics, setPlatformMetrics] = useState({
    documentsProcessed: 0,
    imagesAnalyzed: 0,
    entitiesExtracted: 0,
    searchQueries: 0,
    avgProcessingTime: 0,
    accuracyScore: 0
  });
  const [loading, setLoading] = useState(true);

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'processing': case 'analyzing': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'queued': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'failed': return 'bg-red-500/10 text-red-600 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'clinical_notes': case 'discharge_summary': case 'lab_report': case 'imaging_report':
        return <FileText className="h-4 w-4" />;
      case 'bed_status': case 'equipment_detection': case 'patient_monitoring': case 'safety_compliance':
        return <Eye className="h-4 w-4" />;
      case 'patient': return <Brain className="h-4 w-4" />;
      case 'department': return <Globe className="h-4 w-4" />;
      case 'equipment': return <Zap className="h-4 w-4" />;
      case 'staff': return <MessageSquare className="h-4 w-4" />;
      case 'outcome': return <TrendingUp className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    
    const { data, error } = await supabase
      .from('medical_records')
      .select('id, title, record_type, created_at')
      .textSearch('title', searchQuery, { type: 'websearch' })
      .limit(5);

    if (data) {
      const results = data.map(item => ({
        title: item.title,
        type: item.record_type,
        relevance: 90 // Placeholder relevance
      }));
      setSearchResults(results);
    }
    setIsSearching(false);
  };

  useEffect(() => {
    const fetchPlatformData = async () => {
      setLoading(true);

      // Fetch metrics
      const { count: docCount } = await supabase.from('medical_records').select('*', { count: 'exact', head: true });
      // Other metrics are placeholders until their tables exist
      setPlatformMetrics({
        documentsProcessed: docCount || 0,
        imagesAnalyzed: 0,
        entitiesExtracted: 0,
        searchQueries: 0,
        avgProcessingTime: 0,
        accuracyScore: 0
      });

      // Fetch tasks - will be empty as tables don't exist
      const { data: nlpData } = await supabase.from('nlp_tasks').select('*').limit(3);
      if (nlpData) setNlpTasks(nlpData as NLPTask[]);

      const { data: visionData } = await supabase.from('vision_tasks').select('*').limit(2);
      if (visionData) setVisionTasks(visionData as VisionTask[]);
      
      const { data: graphData } = await supabase.from('knowledge_graph_nodes').select('*').limit(5);
      if (graphData) setKnowledgeGraph(graphData as KnowledgeGraphNode[]);

      setLoading(false);
    };

    fetchPlatformData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Platform Overview */}
      <Card className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-cyan-500/20">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Brain className="h-6 w-6 text-cyan-400" />
            Cognitive Analytics Platform
            <Badge className="bg-cyan-500/10 text-cyan-600 border-cyan-500/20">Phase 3B</Badge>
          </CardTitle>
          <CardDescription>
            Advanced NLP, computer vision, and knowledge graph for intelligent healthcare analytics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{loading ? <Skeleton className="h-8 w-20 mx-auto" /> : platformMetrics.documentsProcessed.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Documents</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{loading ? <Skeleton className="h-8 w-20 mx-auto" /> : platformMetrics.imagesAnalyzed.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Images</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{loading ? <Skeleton className="h-8 w-20 mx-auto" /> : `${(platformMetrics.entitiesExtracted / 1000).toFixed(0)}K`}</div>
              <div className="text-xs text-muted-foreground">Entities</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">{loading ? <Skeleton className="h-8 w-20 mx-auto" /> : platformMetrics.searchQueries}</div>
              <div className="text-xs text-muted-foreground">Searches</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">{loading ? <Skeleton className="h-8 w-20 mx-auto" /> : `${platformMetrics.avgProcessingTime}s`}</div>
              <div className="text-xs text-muted-foreground">Avg Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">{loading ? <Skeleton className="h-8 w-20 mx-auto" /> : `${platformMetrics.accuracyScore}%`}</div>
              <div className="text-xs text-muted-foreground">Accuracy</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="nlp" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-muted/50">
          <TabsTrigger value="nlp">
            <MessageSquare className="h-4 w-4 mr-2" />
            Clinical NLP
          </TabsTrigger>
          <TabsTrigger value="vision">
            <Eye className="h-4 w-4 mr-2" />
            Computer Vision
          </TabsTrigger>
          <TabsTrigger value="search">
            <Search className="h-4 w-4 mr-2" />
            Semantic Search
          </TabsTrigger>
          <TabsTrigger value="knowledge">
            <Network className="h-4 w-4 mr-2" />
            Knowledge Graph
          </TabsTrigger>
        </TabsList>

        <TabsContent value="nlp" className="space-y-4">
          <Card className="bg-card/80 border-border backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-400" />
                Natural Language Clinical Intelligence
              </CardTitle>
              <CardDescription>Process unstructured clinical data with advanced NLP</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-20 w-full" />)
              ) : nlpTasks.length > 0 ? (
                nlpTasks.map((task) => (
                  <div key={task.id} className="p-3 bg-muted/50 rounded-lg border border-border/50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(task.type)}
                        <span className="font-medium text-sm text-foreground capitalize">
                          {task.type.replace('_', ' ')}
                        </span>
                      </div>
                      <Badge variant="outline" className={`text-xs ${getTaskStatusColor(task.status)}`}>
                        {task.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground mb-2">
                      <div>Confidence: {task.confidence.toFixed(1)}%</div>
                      <div>Entities: {task.entities}</div>
                      <div>Time: {task.processingTime}</div>
                    </div>
                    {task.status === 'processing' && (
                      <Progress value={task.confidence} className="h-1" />
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-muted-foreground">No NLP tasks found.</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vision" className="space-y-4">
          <Card className="bg-card/80 border-border backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Image className="h-5 w-5 text-green-400" />
                Computer Vision Integration
              </CardTitle>
              <CardDescription>Medical imaging analysis and real-time visual monitoring</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {loading ? (
                Array.from({ length: 2 }).map((_, i) => <Skeleton key={i} className="h-20 w-full" />)
              ) : visionTasks.length > 0 ? (
                visionTasks.map((task) => (
                  <div key={task.id} className="p-3 bg-muted/50 rounded-lg border border-border/50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(task.type)}
                        <span className="font-medium text-sm text-foreground capitalize">
                          {task.type.replace('_', ' ')}
                        </span>
                      </div>
                      <Badge variant="outline" className={`text-xs ${getTaskStatusColor(task.status)}`}>
                        {task.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground mb-2">
                      <div>Accuracy: {task.accuracy.toFixed(1)}%</div>
                      <div>Objects: {task.objectsDetected}</div>
                      <div>Time: {task.processingTime}</div>
                    </div>
                    {task.status === 'analyzing' && (
                      <Progress value={task.accuracy} className="h-1" />
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-muted-foreground">No computer vision tasks found.</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="search" className="space-y-4">
          <Card className="bg-card/80 border-border backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Search className="h-5 w-5 text-purple-400" />
                Semantic Search Engine
              </CardTitle>
              <CardDescription>Intelligent search across all healthcare data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4">
                <Input
                  placeholder="Search medical records, protocols, analytics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  disabled={isSearching}
                />
                <Button onClick={handleSearch} className="bg-purple-500 hover:bg-purple-600" disabled={isSearching}>
                  {isSearching ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div> : <Search className="h-4 w-4" />}
                </Button>
              </div>
              
              {isSearching ? (
                <div className="space-y-2">
                   <Skeleton className="h-12 w-full" />
                   <Skeleton className="h-12 w-full" />
                </div>
              ) : searchResults.length > 0 ? (
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">Search Results</h4>
                  {searchResults.map((result, index) => (
                    <div key={index} className="p-3 border border-border rounded-lg hover:bg-muted/30 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-foreground">{result.title}</div>
                          <div className="text-sm text-muted-foreground">{result.type}</div>
                        </div>
                        <div className="text-xs text-purple-400">{result.relevance}% match</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                 <div className="text-center py-10 text-muted-foreground">
                    Enter a query to search.
                 </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="knowledge" className="space-y-4">
          <Card className="bg-card/80 border-border backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Network className="h-5 w-5 text-orange-400" />
                Knowledge Graph
              </CardTitle>
              <CardDescription>Dynamic relationships between patients, resources, and outcomes</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-20 w-full" />)}
                 </div>
              ) : knowledgeGraph.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {knowledgeGraph.map((node) => (
                    <div key={node.id} className="p-3 border border-border rounded-lg hover:bg-muted/30 cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(node.type)}
                          <span className="font-medium text-sm text-foreground">{node.label}</span>
                        </div>
                        <Badge variant="outline" className="text-xs capitalize">
                          {node.type}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground mb-1">
                        {node.connections} connections
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-orange-400">Relevance: {node.relevanceScore}%</span>
                        <Progress value={node.relevanceScore} className="h-1 w-16" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-muted-foreground">Knowledge graph is empty. Connect data to build it.</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CognitiveAnalyticsPlatform;
