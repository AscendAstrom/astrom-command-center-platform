
import { useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { DashboardWidget, DragItem, WidgetType } from './types';
import DashboardWidgetComponent from './DashboardWidgetComponent';

interface DashboardCanvasProps {
  widgets: DashboardWidget[];
  selectedWidget: DashboardWidget | null;
  onWidgetSelect: (widget: DashboardWidget | null) => void;
  onWidgetUpdate: (widget: DashboardWidget) => void;
  onWidgetDelete: (widgetId: string) => void;
  isPreviewMode: boolean;
}

const DashboardCanvas = ({
  widgets,
  selectedWidget,
  onWidgetSelect,
  onWidgetUpdate,
  onWidgetDelete,
  isPreviewMode
}: DashboardCanvasProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'widget',
    drop: (item: DragItem, monitor) => {
      const offset = monitor.getDropResult();
      const clientOffset = monitor.getClientOffset();
      
      if (item.widgetType && clientOffset) {
        // Handle new widget drop
        const canvasRect = (monitor.getDropTarget() as any)?._lastDropResult?.getBoundingClientRect();
        if (canvasRect) {
          const x = clientOffset.x - canvasRect.left;
          const y = clientOffset.y - canvasRect.top;
          
          const newWidget: DashboardWidget = {
            id: `widget-${Date.now()}`,
            type: item.widgetType,
            title: `New ${item.widgetType}`,
            position: { x: Math.max(0, x - 150), y: Math.max(0, y - 100) },
            size: { width: 300, height: 200 },
            config: {
              refreshInterval: 30,
              showTitle: true,
              backgroundColor: '#ffffff',
              borderColor: '#e5e7eb'
            },
            data: generateSampleData(item.widgetType)
          };
          
          onWidgetUpdate(newWidget);
        }
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const generateSampleData = (type: WidgetType) => {
    switch (type) {
      case 'chart':
        return [
          { name: 'Jan', value: 400, secondary: 240 },
          { name: 'Feb', value: 300, secondary: 139 },
          { name: 'Mar', value: 600, secondary: 980 },
          { name: 'Apr', value: 800, secondary: 390 },
          { name: 'May', value: 700, secondary: 480 }
        ];
      case 'metric':
        return { value: 1250, label: 'Total Patients', change: '+12%', trend: 'up' };
      case 'table':
        return [
          { id: 1, patient: 'John Doe', status: 'Active', room: 'A-101', time: '10:30' },
          { id: 2, patient: 'Jane Smith', status: 'Waiting', room: 'B-205', time: '11:15' },
          { id: 3, patient: 'Bob Johnson', status: 'Complete', room: 'C-301', time: '12:00' }
        ];
      case 'gauge':
        return { value: 75, max: 100, label: 'Capacity' };
      default:
        return [];
    }
  };

  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onWidgetSelect(null);
    }
  }, [onWidgetSelect]);

  return (
    <div
      ref={drop}
      className={`relative w-full h-full bg-gray-50 dark:bg-gray-900/20 overflow-auto ${
        isOver ? 'bg-purple-50 dark:bg-purple-900/10' : ''
      } ${!isPreviewMode ? 'cursor-crosshair' : ''}`}
      onClick={handleCanvasClick}
    >
      {/* Grid Pattern */}
      {!isPreviewMode && (
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        />
      )}

      {/* Drop Zone Indicator */}
      {isOver && !isPreviewMode && (
        <div className="absolute inset-0 border-2 border-dashed border-purple-400 bg-purple-50/50 dark:bg-purple-900/20 flex items-center justify-center">
          <div className="text-purple-600 font-medium">Drop widget here</div>
        </div>
      )}

      {/* Widgets */}
      {widgets.map((widget) => (
        <DashboardWidgetComponent
          key={widget.id}
          widget={widget}
          isSelected={selectedWidget?.id === widget.id}
          onSelect={onWidgetSelect}
          onUpdate={onWidgetUpdate}
          onDelete={onWidgetDelete}
          isPreviewMode={isPreviewMode}
        />
      ))}

      {/* Empty State */}
      {widgets.length === 0 && !isOver && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <div className="text-lg font-medium mb-2">Your dashboard canvas is empty</div>
            <div className="text-sm">Drag widgets from the palette or click to add them</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardCanvas;
