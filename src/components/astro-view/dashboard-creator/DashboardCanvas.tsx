
import { useCallback } from 'react';
import { DashboardWidget, WidgetType } from './types';
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
  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onWidgetSelect(null);
    }
  }, [onWidgetSelect]);

  return (
    <div
      className="relative w-full h-full bg-gray-50 dark:bg-gray-900/20 overflow-auto cursor-default"
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
      {widgets.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <div className="text-lg font-medium mb-2">Your dashboard canvas is empty</div>
            <div className="text-sm">Click widgets in the palette to add them</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardCanvas;
