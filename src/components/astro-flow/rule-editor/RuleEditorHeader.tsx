
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save, AlertTriangle, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface RuleEditorHeaderProps {
  isCreating: boolean;
  canEdit: boolean;
  onSaveRule: () => void;
  onDeleteRule: () => void;
}

export const RuleEditorHeader = ({ isCreating, canEdit, onSaveRule, onDeleteRule }: RuleEditorHeaderProps) => {
  return (
    <CardHeader>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-orange-400" />
          <CardTitle className="text-foreground">
            {isCreating ? 'Create Automation Rule' : 'Edit Rule Configuration'}
          </CardTitle>
        </div>
        {canEdit && (
          <div className="flex items-center gap-2">
            {!isCreating && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete this automation rule.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onDeleteRule}>
                      Yes, delete rule
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
            <Button onClick={onSaveRule} size="sm" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg">
              <Save className="h-4 w-4 mr-1" />
              Save Rule
            </Button>
          </div>
        )}
      </div>
      <CardDescription>Configure conditions and actions for automated responses</CardDescription>
    </CardHeader>
  );
};
