
import { useState, useCallback } from 'react';
import { useDrag } from 'react-dnd';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, GripVertical, Settings } from 'lucide-react';
import { DashboardWidget } from './types';
import WidgetChart from './widgets/WidgetChart';
import WidgetMetric from './widgets/WidgetMetric';
import WidgetTable from './widgets/WidgetTable';
import WidgetGauge from './widgets/WidgetGauge';
import WidgetText from './widgets/WidgetText';

interface DashboardWidgetComponentProps {
  widget: DashboardWidget;
  isSelected: boolean;
  onSelect: (widget: DashboardWidget | null) => void;
  onUpdate: (widget: DashboardWidget) => void;
  onDelete: (widgetId: string) => void;
  isPreviewMode: boolean;
}

const DashboardWidgetComponent = ({
  widget,
  isSelected,
  onSelect,
  onUpdate,
  onDelete,
  isPreviewMode
}: DashboardWidgetComponentProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const [{ }, drag] = useDrag(() => ({
    type: 'widget',
    item: { type: 'widget', widget },
    collect: (monitor) => {
      setIsDragging(monitor.isDragging());
    },
  }));

  const handlePositionChange = useCallback((newPosition: { x: number; y: number }) => {
    onUpdate({ ...widget, position: newPosition });
  }, [widget, onUpdate]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isPreviewMode) {
      onSelect(widget);
    }
  }, [widget, onSelect, isPreviewMode]);

  const renderWidget = () => {
    switch (widget.type) {
      case 'chart':
        return <WidgetChart widget={widget} />;
      case 'metric':
        return <WidgetMetric widget={widget} />;
      case 'table':
        return <WidgetTable widget={widget} />;
      case 'gauge':
        return <WidgetGauge widget={widget} />;
      case 'text':
        return <WidgetText widget={widget} />;
      default:
        return <div className="text-muted-foreground">Unknown widget type</div>;
    }
  };

  return (
    <div
      ref={!isPreviewMode ? drag : undefined}
      className={`absolute select-none ${isDragging ? 'opacity-50' : ''}`}
      style={{
        left: widget.position.x,
        top: widget.position.y,
        width: widget.size.width,
        height: widget.size.height,
        zIndex: isSelected ? 10 : 1
      }}
      onClick={handleClick}
    >
      <Card 
        className={`h-full transition-all duration-200 ${
          isSelected && !isPreviewMode 
            ? 'ring-2 ring-purple-400 shadow-lg' 
            : 'hover:shadow-md'
        } ${!isPreviewMode ? 'cursor-move' : ''}`}
        style={{
          backgroundColor: widget.config.backgroundColor,
          borderColor: widget.config.borderColor
        }}
      >
        {/* Widget Header */}
        {widget.config.showTitle && (
          <CardHeader className="pb-2 relative">
            <CardTitle className="text-sm font-medium text-foreground flex items-center justify-between">
              <span>{widget.title}</span>
              
              {!isPreviewMode && isSelected && (
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                  >
                    <Settings className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(widget.id);
                    }}
                    className="h-6 w-6 p-0 text-red-400 hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </CardTitle>
            
            {!isPreviewMode && isSelected && (
              <div className="absolute -top-2 -left-2">
                <div className="bg-purple-400 text-white px-1 py-0.5 rounded text-xs font-medium">
                  {widget.type}
                </div>
              </div>
            )}
          </CardHeader>
        )}

        {/* Widget Content */}
        <CardContent className="p-3 h-full">
          <div className="h-full w-full">
            {renderWidget()}
          </div>
        </CardContent>

        {/* Drag Handle */}
        {!isPreviewMode && isSelected && (
          <div className="absolute bottom-1 right-1 cursor-move text-muted-foreground">
            <GripVertical className="h-4 w-4" />
          </div>
        )}
      </Card>
    </div>
  );
};

export default DashboardWidgetComponent;
