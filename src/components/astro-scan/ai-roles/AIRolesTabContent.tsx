
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Bot, Shield } from 'lucide-react';
import { AIRole } from './types';

interface AIRolesTabContentProps {
  roles: AIRole[];
  toggleRole: (roleId: string) => void;
}

const AIRolesTabContent = ({ roles, toggleRole }: AIRolesTabContentProps) => {
  const categories = [...new Set(roles.map(role => role.category))];

  return (
    <div className="space-y-4">
      {categories.map(category => (
        <Card key={category} className="bg-card/80 border-border backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-400" />
              {category}
            </CardTitle>
            <CardDescription>
              AI agents for {category.toLowerCase()} operations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {roles.filter(role => role.category === category).map(role => (
                <div key={role.id} className="p-4 border border-border rounded-lg bg-muted/30">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Bot className="h-5 w-5 text-blue-400" />
                      <div>
                        <h4 className="font-semibold text-foreground">{role.name}</h4>
                        <p className="text-sm text-muted-foreground">{role.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge 
                        className={role.isActive 
                          ? "bg-green-500/10 text-green-600 border-green-500/20" 
                          : "bg-gray-500/10 text-gray-600 border-gray-500/20"
                        }
                      >
                        {role.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                      <Switch
                        checked={role.isActive}
                        onCheckedChange={() => toggleRole(role.id)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-sm font-medium text-foreground mb-2">Skills</h5>
                      <div className="flex flex-wrap gap-1">
                        {role.skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-medium text-foreground mb-2">Performance</h5>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="text-center">
                          <div className="font-semibold text-green-400">{role.performance.accuracy}%</div>
                          <div className="text-muted-foreground">Accuracy</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-blue-400">{role.performance.recommendations}</div>
                          <div className="text-muted-foreground">Suggestions</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-purple-400">{role.performance.successRate}%</div>
                          <div className="text-muted-foreground">Success</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AIRolesTabContent;
