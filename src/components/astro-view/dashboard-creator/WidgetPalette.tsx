
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Activity, Grid2X2, Gauge, Map, Type } from 'lucide-react';
import { WidgetType } from './types';

interface WidgetPaletteProps {
  onAddWidget: (type: WidgetType) => void;
}

interface WidgetPaletteItemProps {
  type: WidgetType;
  icon: React.ReactNode;
  label: string;
  description: string;
  onAdd: () => void;
}

const WidgetPaletteItem = ({ icon, label, description, onAdd }: WidgetPaletteItemProps) => {
  return (
    <div
      className="p-3 border border-border rounded-lg cursor-pointer transition-all hover:shadow-md hover:border-purple-400"
      onClick={onAdd}
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
          {icon}
        </div>
        <div className="flex-1">
          <div className="font-medium text-foreground text-sm">{label}</div>
          <div className="text-xs text-muted-foreground">{description}</div>
        </div>
      </div>
    </div>
  );
};

const WidgetPalette = ({ onAddWidget }: WidgetPaletteProps) => {
  const widgets = [
    {
      type: 'chart' as WidgetType,
      icon: <BarChart3 className="h-4 w-4 text-purple-600" />,
      label: 'Chart',
      description: 'Bar, line, pie charts'
    },
    {
      type: 'metric' as WidgetType,
      icon: <Activity className="h-4 w-4 text-green-600" />,
      label: 'Metric Card',
      description: 'KPI and metric display'
    },
    {
      type: 'table' as WidgetType,
      icon: <Grid2X2 className="h-4 w-4 text-blue-600" />,
      label: 'Data Table',
      description: 'Tabular data view'
    },
    {
      type: 'gauge' as WidgetType,
      icon: <Gauge className="h-4 w-4 text-orange-600" />,
      label: 'Gauge',
      description: 'Progress indicators'
    },
    {
      type: 'map' as WidgetType,
      icon: <Map className="h-4 w-4 text-cyan-600" />,
      label: 'Map',
      description: 'Geographic visualization'
    },
    {
      type: 'text' as WidgetType,
      icon: <Type className="h-4 w-4 text-gray-600" />,
      label: 'Text',
      description: 'Rich text content'
    }
  ];

  return (
    <Card className="h-full bg-card border-0 rounded-none">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-foreground">Widget Library</CardTitle>
        <p className="text-sm text-muted-foreground">Click widgets to add them to canvas</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {widgets.map((widget) => (
          <WidgetPaletteItem
            key={widget.type}
            type={widget.type}
            icon={widget.icon}
            label={widget.label}
            description={widget.description}
            onAdd={() => onAddWidget(widget.type)}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default WidgetPalette;
