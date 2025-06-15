
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
  status: 'processing' | 'completed' | 'queued' | null;
  confidence: number | null;
  entities: number | null;
  processingTime: string | null;
}

interface VisionTask {
  id: string;
  type: 'bed_status' | 'equipment_detection' | 'patient_monitoring' | 'safety_compliance';
  status: 'analyzing' | 'completed' | 'failed' | null;
  accuracy: number | null;
  objectsDetected: number | null;
  processingTime: string | null;
}

interface KnowledgeGraphNode {
  id: string;
  label: string;
  type: 'patient' | 'department' | 'equipment' | 'staff' | 'outcome' | null;
  connections: number | null;
  relevanceScore: number | null;
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

  const getTaskStatusColor = (status: string | null) => {
    switch (status) {
      case 'completed': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'processing': case 'analyzing': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'queued': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'failed': return 'bg-red-500/10 text-red-600 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  const getTypeIcon = (type: string | null) => {
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

      // Fetch all data concurrently
      const [
        { count: docCount },
        { data: nlpData, error: nlpError },
        { data: visionData, error: visionError },
        { data: graphData, error: graphError }
      ] = await Promise.all([
        supabase.from('medical_records').select('*', { count: 'exact', head: true }),
        supabase.from('nlp_tasks').select('*'),
        supabase.from('vision_tasks').select('*'),
        supabase.from('knowledge_graph_nodes').select('*').limit(5)
      ]);
      
      // Process NLP tasks
      let formattedNlpTasks: NLPTask[] = [];
      let totalEntities = 0;
      let totalNlpTime = 0;
      let nlpTimeCount = 0;

      if (nlpData) {
        formattedNlpTasks = nlpData.map(task => {
          if (task.entities) totalEntities += task.entities;
          if (task.processing_time) {
            const time = parseFloat(task.processing_time);
            if (!isNaN(time)) {
              totalNlpTime += time;
              nlpTimeCount++;
            }
          }
          return {
            id: task.id,
            type: task.type as NLPTask['type'],
            status: task.status as NLPTask['status'],
            confidence: task.confidence,
            entities: task.entities,
            processingTime: task.processing_time,
          };
        });
        setNlpTasks(formattedNlpTasks.slice(0, 3)); // Show top 3 tasks
      } else {
        if (nlpError) console.error("Error fetching nlp_tasks:", nlpError);
        setNlpTasks([]);
      }

      // Process Vision tasks
      let formattedVisionTasks: VisionTask[] = [];
      let totalVisionAccuracy = 0;
      let visionAccuracyCount = 0;
      let totalVisionTime = 0;
      let visionTimeCount = 0;

      if (visionData) {
        formattedVisionTasks = visionData.map(task => {
          if (task.accuracy) {
            totalVisionAccuracy += task.accuracy;
            visionAccuracyCount++;
          }
          if (task.processing_time) {
            const time = parseFloat(task.processing_time);
            if (!isNaN(time)) {
              totalVisionTime += time;
              visionTimeCount++;
            }
          }
          return {
            id: task.id,
            type: task.type as VisionTask['type'],
            status: task.status as VisionTask['status'],
            accuracy: task.accuracy,
            objectsDetected: task.objects_detected,
            processingTime: task.processing_time,
          };
        });
        setVisionTasks(formattedVisionTasks.slice(0, 2)); // Show top 2 tasks
      } else {
        if (visionError) console.error("Error fetching vision_tasks:", visionError);
        setVisionTasks([]);
      }
      
      // Process Knowledge Graph
      if (graphData) {
        const formattedNodes = graphData.map(node => ({
          id: node.id,
          label: node.label,
          type: node.type as KnowledgeGraphNode['type'],
          connections: node.connections,
          relevanceScore: node.relevance_score,
        }));
        setKnowledgeGraph(formattedNodes);
      } else {
        if (graphError) console.error("Error fetching knowledge_graph_nodes:", graphError);
        setKnowledgeGraph([]);
      }
      
      // Calculate aggregated metrics
      const totalProcessingTime = totalNlpTime + totalVisionTime;
      const totalTimeCount = nlpTimeCount + visionTimeCount;
      const avgProcessingTime = totalTimeCount > 0 ? parseFloat((totalProcessingTime / totalTimeCount).toFixed(1)) : 0;
      const avgAccuracyScore = visionAccuracyCount > 0 ? parseFloat((totalVisionAccuracy / visionAccuracyCount).toFixed(1)) : 0;

      // Set platform metrics
      setPlatformMetrics({
        documentsProcessed: docCount || 0,
        imagesAnalyzed: visionData?.length || 0,
        entitiesExtracted: totalEntities,
        searchQueries: 0, // Placeholder
        avgProcessingTime: avgProcessingTime,
        accuracyScore: avgAccuracyScore
      });

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
                      <div>Confidence: {task.confidence ? `${task.confidence.toFixed(1)}%` : 'N/A'}</div>
                      <div>Entities: {task.entities ?? 'N/A'}</div>
                      <div>Time: {task.processingTime ?? 'N/A'}</div>
                    </div>
                    {task.status === 'processing' && (
                      <Progress value={task.confidence ?? 0} className="h-1" />
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
                      <div>Accuracy: {task.accuracy ? `${task.accuracy.toFixed(1)}%` : 'N/A'}</div>
                      <div>Objects: {task.objectsDetected ?? 'N/A'}</div>
                      <div>Time: {task.processingTime ?? 'N/A'}</div>
                    </div>
                    {task.status === 'analyzing' && (
                      <Progress value={task.accuracy ?? 0} className="h-1" />
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
                        {node.connections ?? 0} connections
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-orange-400">Relevance: {node.relevanceScore ?? 0}%</span>
                        <Progress value={node.relevanceScore ?? 0} className="h-1 w-16" />
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
