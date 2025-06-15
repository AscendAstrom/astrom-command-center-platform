
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertSubscription, FlowUserRole, ActionType } from './types';
import { Bell, Mail, MessageSquare, Smartphone, Plus, Settings } from 'lucide-react';

interface AlertSubscriptionsProps {
  userRole: FlowUserRole;
}

const AlertSubscriptions = ({ userRole }: AlertSubscriptionsProps) => {
  const [subscriptions, setSubscriptions] = useState<AlertSubscription[]>([]);

  const canManageSubscriptions = userRole === 'ADMIN' || userRole === 'OPS_MANAGER';

  const availableRules: { id: string; name: string; category: string }[] = [];

  const availableChannels: Array<{ type: ActionType; label: string; icon: any }> = [
    { type: 'email_alert', label: 'Email', icon: Mail },
    { type: 'slack_notification', label: 'Slack', icon: MessageSquare },
    { type: 'sms_alert', label: 'SMS', icon: Smartphone },
    { type: 'dashboard_banner', label: 'Dashboard', icon: Bell }
  ];

  const handleToggleSubscription = (subscriptionId: string) => {
    setSubscriptions(subscriptions.map(sub => 
      sub.id === subscriptionId 
        ? { ...sub, is_active: !sub.is_active }
        : sub
    ));
  };

  const handleChannelToggle = (subscriptionId: string, channel: ActionType) => {
    setSubscriptions(subscriptions.map(sub => 
      sub.id === subscriptionId 
        ? {
            ...sub,
            channels: sub.channels.includes(channel)
              ? sub.channels.filter(c => c !== channel)
              : [...sub.channels, channel]
          }
        : sub
    ));
  };

  const getChannelIcon = (channel: ActionType) => {
    const channelConfig = availableChannels.find(c => c.type === channel);
    const Icon = channelConfig?.icon || Bell;
    return <Icon className="h-4 w-4" />;
  };

  const getRoleColor = (role: FlowUserRole) => {
    switch (role) {
      case 'ADMIN': return 'bg-purple-600';
      case 'OPS_MANAGER': return 'bg-blue-600';
      case 'EXEC': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-foreground">Alert Subscriptions</CardTitle>
              <CardDescription>Manage notification preferences for automation rules</CardDescription>
            </div>
            {canManageSubscriptions && (
              <Button className="bg-cyan-600 hover:bg-cyan-700">
                <Plus className="h-4 w-4 mr-2" />
                New Subscription
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {subscriptions.map((subscription) => (
              <div key={subscription.id} className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Badge className={getRoleColor(subscription.userRole)}>
                      {subscription.userRole.replace('_', ' ')}
                    </Badge>
                    <span className="text-foreground font-medium">User ID: {subscription.userId}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {subscription.is_active ? 'Active' : 'Inactive'}
                    </span>
                    {canManageSubscriptions && (
                      <Switch
                        checked={subscription.is_active}
                        onCheckedChange={() => handleToggleSubscription(subscription.id)}
                      />
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Subscribed Rules */}
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-3">Subscribed Rules</h4>
                    <div className="space-y-2">
                      {availableRules.map((rule) => (
                        <div key={rule.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`rule-${subscription.id}-${rule.id}`}
                            checked={subscription.ruleIds.includes(rule.id)}
                            onCheckedChange={(checked) => {
                              if (canManageSubscriptions) {
                                setSubscriptions(subscriptions.map(sub => 
                                  sub.id === subscription.id 
                                    ? {
                                        ...sub,
                                        ruleIds: checked
                                          ? [...sub.ruleIds, rule.id]
                                          : sub.ruleIds.filter(id => id !== rule.id)
                                      }
                                    : sub
                                ));
                              }
                            }}
                            disabled={!canManageSubscriptions}
                          />
                          <label
                            htmlFor={`rule-${subscription.id}-${rule.id}`}
                            className="text-sm text-foreground cursor-pointer"
                          >
                            {rule.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Notification Channels */}
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-3">Notification Channels</h4>
                    <div className="space-y-2">
                      {availableChannels.map((channel) => (
                        <div key={channel.type} className="flex items-center space-x-2">
                          <Checkbox
                            id={`channel-${subscription.id}-${channel.type}`}
                            checked={subscription.channels.includes(channel.type)}
                            onCheckedChange={() => {
                              if (canManageSubscriptions) {
                                handleChannelToggle(subscription.id, channel.type);
                              }
                            }}
                            disabled={!canManageSubscriptions}
                          />
                          <label
                            htmlFor={`channel-${subscription.id}-${channel.type}`}
                            className="text-sm text-foreground cursor-pointer flex items-center gap-2"
                          >
                            {getChannelIcon(channel.type)}
                            {channel.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Frequency Settings */}
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-3">Frequency</h4>
                    <Select
                      value={subscription.frequency}
                      onValueChange={(value: any) => {
                        if (canManageSubscriptions) {
                          setSubscriptions(subscriptions.map(sub => 
                            sub.id === subscription.id 
                              ? { ...sub, frequency: value }
                              : sub
                          ));
                        }
                      }}
                      disabled={!canManageSubscriptions}
                    >
                      <SelectTrigger className="bg-muted border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border">
                        <SelectItem value="immediate">Immediate</SelectItem>
                        <SelectItem value="hourly">Hourly Digest</SelectItem>
                        <SelectItem value="daily">Daily Summary</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="mt-4 p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Bell className="h-4 w-4 text-cyan-400" />
                        <span className="text-sm font-medium text-foreground">Active Channels</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {subscription.channels.map((channel) => (
                          <Badge key={channel} variant="outline" className="text-xs">
                            {availableChannels.find(c => c.type === channel)?.label}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Channel Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Mail className="h-5 w-5 text-cyan-400" />
              Email Configuration
            </CardTitle>
            <CardDescription>Configure email notification settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-muted rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-foreground font-medium">SMTP Server</div>
                  <div className="text-sm text-muted-foreground">smtp.hospital.com:587</div>
                </div>
                <Badge className="bg-green-600">Connected</Badge>
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-foreground font-medium">From Address</div>
                  <div className="text-sm text-muted-foreground">alerts@hospital.com</div>
                </div>
                <Button variant="ghost" size="sm" className="text-cyan-400">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-cyan-400" />
              Slack Integration
            </CardTitle>
            <CardDescription>Configure Slack notification settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-muted rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-foreground font-medium">Workspace</div>
                  <div className="text-sm text-muted-foreground">Hospital Operations</div>
                </div>
                <Badge className="bg-green-600">Connected</Badge>
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-foreground font-medium">Default Channel</div>
                  <div className="text-sm text-muted-foreground">#alerts</div>
                </div>
                <Button variant="ghost" size="sm" className="text-cyan-400">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AlertSubscriptions;
