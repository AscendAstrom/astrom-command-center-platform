
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Bot, 
  Send, 
  Lightbulb,
  FileText,
  Activity,
  Users,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

interface AIMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestions?: string[];
  insights?: {
    type: 'recommendation' | 'alert' | 'insight';
    title: string;
    description: string;
  }[];
}

interface ClinicalAIAssistantProps {
  context?: string;
  patientId?: string;
}

const ClinicalAIAssistant = ({ context = 'general', patientId }: ClinicalAIAssistantProps) => {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m your clinical AI assistant. I can help you analyze patient data, identify patterns, suggest interventions, and provide evidence-based recommendations. What would you like to explore?',
      timestamp: new Date().toISOString(),
      suggestions: [
        'Analyze patient risk factors',
        'Review medication interactions',
        'Suggest care plan optimizations',
        'Identify clinical trends'
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: AIMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: generateAIResponse(inputMessage),
        timestamp: new Date().toISOString(),
        insights: generateInsights(inputMessage)
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const generateAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('risk') || lowerInput.includes('assessment')) {
      return 'Based on the current patient data, I\'ve identified several risk factors that require attention. The patient shows elevated risk for readmission due to multiple comorbidities and recent hospital visits. I recommend implementing enhanced discharge planning and scheduling a follow-up within 48 hours.';
    }
    
    if (lowerInput.includes('medication') || lowerInput.includes('drug')) {
      return 'I\'ve reviewed the current medication regimen and identified potential interactions between the prescribed ACE inhibitor and the recently added NSAID. Consider alternative pain management strategies or closer monitoring of renal function and blood pressure.';
    }
    
    if (lowerInput.includes('trend') || lowerInput.includes('pattern')) {
      return 'Analysis of the recent clinical data shows an improving trend in vital signs stability, with a 15% reduction in blood pressure variability over the past week. However, there\'s a concerning pattern of declining mobility scores that may indicate need for physical therapy intervention.';
    }
    
    return 'I understand you\'re looking for clinical insights. Could you be more specific about what aspect of patient care you\'d like me to analyze? I can help with risk assessment, medication reviews, care plan optimization, or clinical trend analysis.';
  };

  const generateInsights = (input: string) => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('risk')) {
      return [
        {
          type: 'alert' as const,
          title: 'High Readmission Risk',
          description: 'Patient shows 67% probability of 30-day readmission'
        },
        {
          type: 'recommendation' as const,
          title: 'Enhanced Monitoring',
          description: 'Recommend telemetry monitoring for next 24 hours'
        }
      ];
    }
    
    if (lowerInput.includes('medication')) {
      return [
        {
          type: 'alert' as const,
          title: 'Drug Interaction',
          description: 'Potential interaction detected between current medications'
        },
        {
          type: 'recommendation' as const,
          title: 'Dosage Adjustment',
          description: 'Consider reducing NSAID dosage or switching to alternative'
        }
      ];
    }
    
    return [
      {
        type: 'insight' as const,
        title: 'Clinical Pattern',
        description: 'Improving overall clinical stability noted in recent assessments'
      }
    ];
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'recommendation':
        return <Lightbulb className="h-4 w-4 text-blue-500" />;
      case 'insight':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          Clinical AI Assistant
          {patientId && <Badge variant="outline">Patient Context</Badge>}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden">
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                  
                  {message.suggestions && (
                    <div className="mt-3 space-y-1">
                      <p className="text-xs font-medium">Suggestions:</p>
                      <div className="flex flex-wrap gap-1">
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="ghost"
                            size="sm"
                            className="h-6 text-xs"
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {message.insights && (
                    <div className="mt-3 space-y-2">
                      <p className="text-xs font-medium">Clinical Insights:</p>
                      {message.insights.map((insight, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-2 p-2 bg-background/50 rounded text-xs"
                        >
                          {getInsightIcon(insight.type)}
                          <div>
                            <p className="font-medium">{insight.title}</p>
                            <p className="text-muted-foreground">{insight.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                  <div className="flex items-center gap-1">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-xs text-muted-foreground ml-2">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="flex-shrink-0 flex items-center gap-2">
          <Input
            placeholder="Ask about patient care, risk factors, medications..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1"
          />
          <Button onClick={sendMessage} disabled={!inputMessage.trim() || isTyping}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClinicalAIAssistant;
