
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, Download, Share } from "lucide-react";
import { useState } from "react";

export const CopilotSummaryTile = () => {
  const [chatInput, setChatInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const recentSummary = {
    timeframe: "Last 6 hours",
    keyChanges: [
      "ICU occupancy increased by 15%",
      "3 new admissions to Emergency",
      "2 equipment maintenance alerts resolved",
      "Pharmacy restocked critical medications"
    ],
    recommendations: [
      "Consider ICU discharge planning for 2 stable patients",
      "Monitor Emergency wait times closely",
      "Schedule equipment preventive maintenance"
    ]
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    setIsLoading(true);
    // Simulate AI processing
    setTimeout(() => {
      setIsLoading(false);
      setChatInput("");
    }, 2000);
  };

  const handleExportPDF = () => {
    // Simulate PDF export
    console.log("Exporting summary to PDF...");
  };

  const handleSendSlack = () => {
    // Simulate Slack report
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
          <Badge variant="outline" className="text-purple-600 border-purple-200 bg-purple-50">
            <Bot className="h-3 w-3 mr-1" />
            Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="text-sm font-medium">Summary: {recentSummary.timeframe}</div>
          <div className="bg-gray-50 p-3 rounded-lg space-y-1">
            {recentSummary.keyChanges.map((change, index) => (
              <div key={index} className="text-xs text-gray-700">• {change}</div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">AI Recommendations</div>
          <div className="bg-blue-50 p-3 rounded-lg space-y-1">
            {recentSummary.recommendations.map((rec, index) => (
              <div key={index} className="text-xs text-blue-700">• {rec}</div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">Ask Copilot</div>
          <div className="flex gap-2">
            <Input
              placeholder="What changed in last 6 hours?"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="text-xs"
            />
            <Button 
              size="icon" 
              onClick={handleSendMessage}
              disabled={isLoading}
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
          <strong>NLP Copilot:</strong> Ready to answer questions about hospital operations and trends.
        </div>
      </CardContent>
    </Card>
  );
};
