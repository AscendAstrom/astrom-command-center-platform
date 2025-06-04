
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, Download, Share } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from '@/integrations/supabase/client';

export const CopilotSummaryTile = () => {
  const [chatInput, setChatInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [recommendations, setRecommendations] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    fetchRealData();
  }, []);

  const fetchRealData = async () => {
    try {
      // Check if we have real data
      const [bedsResponse, patientsResponse, alertsResponse] = await Promise.all([
        supabase.from('beds').select('status').limit(1),
        supabase.from('patient_visits').select('status').eq('status', 'ACTIVE').limit(1),
        supabase.from('alerts').select('severity').eq('status', 'ACTIVE').limit(1)
      ]);

      const hasData = bedsResponse.data?.length || patientsResponse.data?.length || alertsResponse.data?.length;
      setIsConnected(!!hasData);

      if (hasData) {
        // Fetch real metrics for summary
        const { data: beds } = await supabase.from('beds').select('status');
        const { data: visits } = await supabase.from('patient_visits').select('*').eq('status', 'ACTIVE');
        const { data: alerts } = await supabase.from('alerts').select('*').eq('status', 'ACTIVE');
        const { data: staff } = await supabase.from('staff_schedules').select('*').gte('shift_end', new Date().toISOString());

        const totalBeds = beds?.length || 0;
        const occupiedBeds = beds?.filter(b => b.status === 'OCCUPIED').length || 0;
        const utilization = totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0;
        const activePatients = visits?.length || 0;
        const activeAlerts = alerts?.length || 0;
        const onDutyStaff = staff?.filter(s => s.status === 'ACTIVE').length || 0;

        setSummary(`Current Status: ${totalBeds} total beds, ${occupiedBeds} occupied (${utilization}% utilization). ${onDutyStaff} staff on duty. ${activePatients} active patients. ${activeAlerts} active alerts.`);

        // Generate recommendations based on real data
        const recs = [];
        if (utilization > 85) recs.push("High bed utilization detected - consider discharge planning.");
        if (activeAlerts > 5) recs.push("Multiple active alerts - review system status.");
        if (onDutyStaff < 10) recs.push("Low staffing levels - consider calling in additional staff.");
        if (recs.length === 0) recs.push("All systems operating within normal parameters.");
        
        setRecommendations(recs.join(" "));
      } else {
        setSummary("Waiting for hospital data connection...");
        setRecommendations("Connect data sources for AI recommendations.");
      }
    } catch (error) {
      console.error('Error fetching real data:', error);
      setSummary("Error connecting to hospital data.");
      setRecommendations("Check system connections and try again.");
      setIsConnected(false);
    }
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setChatInput("");
    }, 2000);
  };

  const handleExportPDF = () => {
    console.log("Exporting summary to PDF...");
  };

  const handleSendSlack = () => {
    console.log("Sending report to Slack...");
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Bot className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Copilot Summary Panel</CardTitle>
              <CardDescription>AI-powered insights & reporting</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className={isConnected ? "text-green-600 border-green-200 bg-green-50" : "text-purple-600 border-purple-200 bg-purple-50"}>
            <Bot className="h-3 w-3 mr-1" />
            {isConnected ? 'Connected' : 'Standby'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="text-sm font-medium">AI Summary</div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-xs text-gray-700">
              {summary}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">AI Recommendations</div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="text-xs text-blue-700">
              {recommendations}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">Ask Copilot</div>
          <div className="flex gap-2">
            <Input
              placeholder="Ask about your hospital data..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="text-xs"
            />
            <Button 
              size="icon" 
              onClick={handleSendMessage}
              disabled={isLoading || !chatInput.trim()}
              className="h-8 w-8"
            >
              <Send className="h-3 w-3" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs"
            onClick={handleExportPDF}
          >
            <Download className="h-3 w-3 mr-1" />
            Export PDF
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs"
            onClick={handleSendSlack}
          >
            <Share className="h-3 w-3 mr-1" />
            Send Slack
          </Button>
        </div>

        <div className="text-xs text-muted-foreground bg-purple-50 p-2 rounded">
          <strong>NLP Copilot:</strong> {isConnected ? 'Analyzing real hospital data for actionable insights.' : 'Ready to provide insights when connected to your hospital data.'}
        </div>
      </CardContent>
    </Card>
  );
};
