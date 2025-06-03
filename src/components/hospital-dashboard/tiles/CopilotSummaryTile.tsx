
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, Download, Share } from "lucide-react";
import { useState } from "react";
import { emptyStateMessages } from "@/config/constants";

export const CopilotSummaryTile = () => {
  const [chatInput, setChatInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
          <Badge variant="outline" className="text-purple-600 border-purple-200 bg-purple-50">
            <Bot className="h-3 w-3 mr-1" />
            Ready
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="text-sm font-medium">AI Summary</div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-xs text-gray-700 text-center py-4">
              {emptyStateMessages.readyForRealData}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">AI Recommendations</div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="text-xs text-blue-700 text-center py-4">
              AI recommendations will appear when data is available
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
          <strong>NLP Copilot:</strong> Ready to provide insights when connected to your hospital data.
        </div>
      </CardContent>
    </Card>
  );
};
