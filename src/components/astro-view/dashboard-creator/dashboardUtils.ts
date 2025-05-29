
import { WidgetType, DashboardWidget } from './types';

export const generateSampleData = (type: WidgetType) => {
  switch (type) {
    case 'chart':
      return [
        { name: 'Jan', value: 400 },
        { name: 'Feb', value: 300 },
        { name: 'Mar', value: 600 },
        { name: 'Apr', value: 800 },
        { name: 'May', value: 700 }
      ];
    case 'metric':
      return { value: 1250, label: 'Total Users', change: '+12%', trend: 'up' };
    case 'table':
      return [
        { id: 1, patient: 'John Doe', status: 'Active', room: 'A-101', time: '10:30' },
        { id: 2, patient: 'Jane Smith', status: 'Waiting', room: 'B-205', time: '11:15' },
        { id: 3, patient: 'Bob Johnson', status: 'Complete', room: 'C-301', time: '12:00' }
      ];
    case 'gauge':
      return { value: 75, max: 100, label: 'Capacity' };
    case 'text':
      return { content: 'Add your text content here...' };
    default:
      return [];
  }
};

export const createNewWidget = (type: WidgetType, widgetCount: number): DashboardWidget => {
  return {
    id: `widget-${Date.now()}`,
    type,
    title: `New ${type}`,
    position: { x: 50 + widgetCount * 20, y: 50 + widgetCount * 20 },
    size: { width: 300, height: 200 },
    config: {
      refreshInterval: 30,
      showTitle: true,
      backgroundColor: '#ffffff',
      borderColor: '#e5e7eb'
    },
    data: generateSampleData(type)
  };
};
