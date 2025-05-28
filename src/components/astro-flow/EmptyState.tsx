
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Plus } from 'lucide-react';
import { FlowUserRole } from './types';

interface EmptyStateProps {
  onCreateRule: () => void;
  userRole: FlowUserRole;
}

const EmptyState = ({ onCreateRule, userRole }: EmptyStateProps) => {
  const canEdit = userRole === 'ADMIN';

  return (
    <Card className="bg-slate-900/80 border-slate-800 backdrop-blur-sm">
      <CardContent className="flex items-center justify-center h-96">
        <div className="text-center">
          <Zap className="h-16 w-16 mx-auto mb-4 text-slate-600" />
          <p className="text-slate-400 mb-4 text-lg">Select a rule to configure automation</p>
          <p className="text-slate-500 mb-6 text-sm">Create intelligent if/then workflows to automate your operations</p>
          {canEdit && (
            <Button onClick={onCreateRule} className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 shadow-lg">
              <Plus className="h-4 w-4 mr-2" />
              Create New Rule
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptyState;
