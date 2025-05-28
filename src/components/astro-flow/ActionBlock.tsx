
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { RuleAction, ActionType } from './types';
import { Mail, MessageSquare, Monitor, Globe, Smartphone, Webhook, Trash2 } from 'lucide-react';

interface ActionBlockProps {
  action: RuleAction;
  onUpdate: (action: RuleAction) => void;
  onDelete: () => void;
  canEdit: boolean;
}

const ActionBlock = ({ action, onUpdate, onDelete, canEdit }: ActionBlockProps) => {
  const getActionIcon = (type: ActionType) => {
    switch (type) {
      case 'email_alert': return <Mail className="h-4 w-4 text-blue-400" />;
      case 'slack_notification': return <MessageSquare className="h-4 w-4 text-green-400" />;
      case 'dashboard_banner': return <Monitor className="h-4 w-4 text-purple-400" />;
      case 'api_call': return <Globe className="h-4 w-4 text-orange-400" />;
      case 'sms_alert': return <Smartphone className="h-4 w-4 text-pink-400" />;
      case 'webhook': return <Webhook className="h-4 w-4 text-cyan-400" />;
      default: return <Globe className="h-4 w-4 text-gray-400" />;
    }
  };

  const actionTypes: Array<{ value: ActionType; label: string; color: string }> = [
    { value: 'email_alert', label: 'Email Alert', color: 'bg-blue-600' },
    { value: 'slack_notification', label: 'Slack Notification', color: 'bg-green-600' },
    { value: 'dashboard_banner', label: 'Dashboard Banner', color: 'bg-purple-600' },
    { value: 'api_call', label: 'API Call', color: 'bg-orange-600' },
    { value: 'sms_alert', label: 'SMS Alert', color: 'bg-pink-600' },
    { value: 'webhook', label: 'Webhook', color: 'bg-cyan-600' }
  ];

  const currentActionType = actionTypes.find(at => at.value === action.type);

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardContent className="p-4 space-y-4">
        {/* Action Type Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getActionIcon(action.type)}
            <Select
              value={action.type}
              onValueChange={(value: ActionType) => onUpdate({ ...action, type: value })}
              disabled={!canEdit}
            >
              <SelectTrigger className="w-48 bg-slate-900/50 border-slate-600 text-white">
                <SelectValue>
                  <div className="flex items-center gap-2">
                    {getActionIcon(action.type)}
                    <span>{currentActionType?.label}</span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                {actionTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex items-center gap-2">
                      {getActionIcon(type.value)}
                      <span>{type.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Badge className={`${currentActionType?.color} text-white`}>
              {currentActionType?.label}
            </Badge>
          </div>
          {canEdit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onDelete}
              className="text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-full h-8 w-8 p-0"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Action Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Recipients/Channel/URL */}
          {(action.type === 'email_alert' || action.type === 'sms_alert') && (
            <div className="md:col-span-2">
              <label className="text-sm text-slate-400 mb-1 block">Recipients (comma-separated)</label>
              <Input
                value={action.config.recipients?.join(', ') || ''}
                onChange={(e) => onUpdate({
                  ...action,
                  config: { ...action.config, recipients: e.target.value.split(',').map(r => r.trim()) }
                })}
                placeholder="user@example.com, admin@example.com"
                className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-400"
                disabled={!canEdit}
              />
            </div>
          )}

          {action.type === 'slack_notification' && (
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Slack Channel</label>
              <Input
                value={action.config.channel || ''}
                onChange={(e) => onUpdate({
                  ...action,
                  config: { ...action.config, channel: e.target.value }
                })}
                placeholder="#alerts or @username"
                className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-400"
                disabled={!canEdit}
              />
            </div>
          )}

          {(action.type === 'api_call' || action.type === 'webhook') && (
            <div>
              <label className="text-sm text-slate-400 mb-1 block">URL Endpoint</label>
              <Input
                value={action.config.url || ''}
                onChange={(e) => onUpdate({
                  ...action,
                  config: { ...action.config, url: e.target.value }
                })}
                placeholder="https://api.example.com/webhook"
                className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-400"
                disabled={!canEdit}
              />
            </div>
          )}

          {action.type === 'dashboard_banner' && (
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Banner Severity</label>
              <Select
                value={action.config.severity || 'info'}
                onValueChange={(value) => onUpdate({
                  ...action,
                  config: { ...action.config, severity: value }
                })}
                disabled={!canEdit}
              >
                <SelectTrigger className="bg-slate-900/50 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Message Template */}
          <div className="md:col-span-2">
            <label className="text-sm text-slate-400 mb-1 block">Message Template</label>
            <Textarea
              value={action.config.message || ''}
              onChange={(e) => onUpdate({
                ...action,
                config: { ...action.config, message: e.target.value }
              })}
              placeholder="Alert: {{condition}} detected in {{zone}} at {{timestamp}}"
              className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-400"
              rows={3}
              disabled={!canEdit}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActionBlock;
