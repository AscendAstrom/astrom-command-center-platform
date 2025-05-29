
export type WidgetType = 'chart' | 'metric' | 'table' | 'gauge' | 'map' | 'text';

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface WidgetConfig {
  refreshInterval?: number;
  showTitle?: boolean;
  backgroundColor?: string;
  borderColor?: string;
  chartType?: 'bar' | 'line' | 'pie' | 'area' | 'donut';
  dataSource?: string;
  filters?: Record<string, any>;
  columns?: string[];
  showLegend?: boolean;
  showGrid?: boolean;
  colors?: string[];
}

export interface DashboardWidget {
  id: string;
  type: WidgetType;
  title: string;
  position: Position;
  size: Size;
  config: WidgetConfig;
  data: any;
}

export interface DragItem {
  type: string;
  widgetType?: WidgetType;
  widget?: DashboardWidget;
}
