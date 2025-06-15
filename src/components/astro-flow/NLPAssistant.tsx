
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, Brain, Lightbulb, AlertCircle, BarChart3 } from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: string;
  intent?: 'query' | 'command' | 'explanation' | 'summary';
  confidence?: number;
}

interface NLPAssistantProps {
  userRole: string;
}

const NLPAssistant = ({ userRole }: NLPAssistantProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hello! I'm your ASTRO-FLOW AI assistant. Connect me to your data to query insights, set alerts, and generate reports.",
      timestamp: new Date().toISOString(),
      intent: 'explanation',
      confidence: 100
    }
  ]);

  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // sampleQueries array removed

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);

    // Simulate AI processing - replaced mock response generator
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "AI response generation is not implemented. This is a placeholder response.",
        timestamp: new Date().toISOString(),
        intent: detectIntent(input),
        confidence: 0
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsProcessing(false);
    }, 1500);
  };

  const detectIntent = (query: string): 'query' | 'command' | 'explanation' | 'summary' => {
    const lowerQuery = query.toLowerCase();
    if (lowerQuery.includes('set') || lowerQuery.includes('alert') || lowerQuery.includes('configure')) {
      return 'command';
    }
    if (lowerQuery.includes('why') || lowerQuery.includes('explain') || lowerQuery.includes('how')) {
      return 'explanation';
    }
    if (lowerQuery.includes('report') || lowerQuery.includes('summary') || lowerQuery.includes('generate')) {
      return 'summary';
    }
    return 'query';
  };

  // generateResponse function removed

  const getIntentIcon = (intent?: string) => {
    switch (intent) {
      case 'query': return BarChart3;
      case 'command': return AlertCircle;
      case 'explanation': return Lightbulb;
      case 'summary': return MessageSquare;
      default: return Brain;
    }
  };

  const getIntentColor = (intent?: string) => {
    switch (intent) {
      case 'query': return 'text-blue-400';
      case 'command': return 'text-orange-400';
      case 'explanation': return 'text-yellow-400';
      case 'summary': return 'text-green-400';
      default: return 'text-purple-400';
    }
  };

  return (
    <Card className="bg-card/80 border-border backdrop-blur-sm h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-blue-500" />
          ASTRO-FLOW AI Assistant
        </CardTitle>
        <CardDescription>
          Natural language interface for querying, commanding, and analyzing your ED operations
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col">
        {/* Sample Queries removed */}
        <div className="mb-4">
          <div className="text-sm font-medium text-foreground mb-2">You can ask things like:</div>
          <p className="text-xs text-muted-foreground italic">
            "Which zones are currently over SLA?" or "Generate daily report for ops meeting"
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((message) => {
            const IconComponent = getIntentIcon(message.intent);
            return (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-muted border border-border'
                  }`}
                >
                  {message.type === 'assistant' && (
                    <div className="flex items-center gap-2 mb-2">
                      <IconComponent className={`h-4 w-4 ${getIntentColor(message.intent)}`} />
                      <span className="text-xs text-muted-foreground capitalize">
                        {message.intent}
                      </span>
                      {message.confidence && message.confidence > 0 ? (
                        <Badge variant="outline" className="text-xs">
                          {message.confidence}% confidence
                        </Badge>
                      ) : message.type === 'assistant' && (
                        <Badge variant="outline" className="text-xs border-dashed">
                          Not connected
                        </Badge>
                      )}
                    </div>
                  )}
                  
                  <div className={`text-sm ${message.type === 'user' ? 'text-white' : 'text-foreground'}`}>
                    {message.content}
                  </div>
                  
                  <div className={`text-xs mt-2 ${
                    message.type === 'user' ? 'text-blue-200' : 'text-muted-foreground'
                  }`}>
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            );
          })}
          
          {isProcessing && (
            <div className="flex justify-start">
              <div className="bg-muted border border-border p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4 text-purple-400 animate-pulse" />
                  <span className="text-sm text-muted-foreground">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about SLA breaches, surge predictions, or request reports..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
            disabled={isProcessing}
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!input.trim() || isProcessing}
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NLPAssistant;
