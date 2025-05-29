
import { DashboardWidget } from '../types';

interface WidgetTextProps {
  widget: DashboardWidget;
}

const WidgetText = ({ widget }: WidgetTextProps) => {
  const content = widget.data.content || 'Add your text content here...';
  
  return (
    <div className="h-full p-4 overflow-auto">
      <div className="prose prose-sm dark:prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
};

export default WidgetText;
