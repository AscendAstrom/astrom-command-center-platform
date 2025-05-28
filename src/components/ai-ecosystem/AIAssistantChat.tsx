
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, Brain, User, Mic, Settings } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  context?: string;
}

const AIAssistantChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI Healthcare Operations Assistant. I can help you monitor systems, analyze KPIs, manage workflows, and coordinate between ASTRO modules. What would you like to know?',
      timestamp: new Date().toLocaleTimeString(),
      context: 'Welcome'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response based on input
    setTimeout(() => {
      const response = generateAIResponse(inputValue);
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content,
        timestamp: new Date().toLocaleTimeString(),
        context: response.context
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (input: string): { content: string; context: string } => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('sla') || lowerInput.includes('breach')) {
      return {
        content: 'I found 2 active SLA breaches: ED wait time exceeded 45 minutes (current: 52 min) and ICU discharge time exceeded threshold (current: 3.2 hours). ASTRO-FLOW has automatically triggered escalation protocols. Would you like me to show the detailed breach analysis?',
        context: 'SLA Monitoring'
      };
    }
    
    if (lowerInput.includes('bed') || lowerInput.includes('capacity')) {
      return {
        content: 'Current bed utilization is at 78% across all units. ASTRO-SCAN shows good data quality (94% accuracy). ASTRO-FLOW predicts a 15% surge in the next 4 hours. I recommend activating the surge protocol. Shall I coordinate with the bed management team?',
        context: 'Bed Management'
      };
    }
    
    if (lowerInput.includes('data') || lowerInput.includes('quality')) {
      return {
        content: 'ASTRO-SCAN reports overall data quality at 94%. The FHIR Mapper Agent detected some schema inconsistencies in the Epic feed. The Anomaly Guardian flagged 3 outliers in the last hour. All issues are being auto-corrected. Need more details on any specific data source?',
        context: 'Data Quality'
      };
    }
    
    if (lowerInput.includes('performance') || lowerInput.includes('agents')) {
      return {
        content: 'All 17 AI agents are performing well: ASTRO-SCAN (94%), ASTRO-FLOW (92%), ASTRO-METRICS (96%), ASTRO-VIEW (89%). The Surge Predictor has 98% accuracy over the last 30 days. Cross-module communication is optimal with 23 successful events in the last hour.',
        context: 'AI Performance'
      };
    }
    
    if (lowerInput.includes('alert') || lowerInput.includes('notification')) {
      return {
        content: 'You have 3 active alerts: 1 high-priority SLA breach, 1 medium-priority data anomaly, and 1 low-priority capacity warning. ASTRO-FLOW has auto-resolved 12 alerts in the last hour. Would you like me to configure custom alert rules or show the alert dashboard?',
        context: 'Alert Management'
      };
    }
    
    return {
      content: 'I understand you\'re asking about healthcare operations. I can help with: SLA monitoring, bed management, data quality, AI agent performance, alerts, KPI analysis, workflow automation, and cross-module coordination. Could you be more specific about what you\'d like to know?',
      context: 'General Assistance'
    };
  };

  const quickActions = [
    'Show SLA breaches',
    'Check bed capacity',
    'Data quality status',
    'AI agent performance',
    'Recent alerts'
  ];

  return (
    <Card className="h-[600px] flex flex-col bg-card/80 border-border backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-foreground flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-blue-400" />
          AI Healthcare Operations Assistant
        </CardTitle>
        <CardDescription>
          Natural language interface for system monitoring and management
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col space-y-4">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-2">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-2 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === 'user' ? 'bg-blue-500' : 'bg-purple-500'
                }`}>
                  {message.role === 'user' ? <User className="h-4 w-4 text-white" /> : <Brain className="h-4 w-4 text-white" />}
                </div>
                <div className={`p-3 rounded-lg ${
                  message.role === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-muted border border-border'
                }`}>
                  <div className="text-sm">{message.content}</div>
                  <div className="flex items-center justify-between mt-2">
                    <div className={`text-xs ${message.role === 'user' ? 'text-blue-100' : 'text-muted-foreground'}`}>
                      {message.timestamp}
                    </div>
                    {message.context && (
                      <Badge variant="secondary" className="text-xs ml-2">
                        {message.context}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                <Brain className="h-4 w-4 text-white" />
              </div>
              <div className="bg-muted border border-border p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => setInputValue(action)}
              className="text-xs"
            >
              {action}
            </Button>
          ))}
        </div>

        {/* Input Area */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about operations, KPIs, alerts, or system status..."
              className="pr-20"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Mic className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Settings className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <Button onClick={handleSendMessage} disabled={!inputValue.trim() || isTyping}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAssistantChat;
