
import { useState } from "react";
import StrategicKPICards from "./executive-command/StrategicKPICards";
import RiskManagementPanel from "./executive-command/RiskManagementPanel";
import AIStrategicInsights from "./executive-command/AIStrategicInsights";
import ExecutiveActions from "./executive-command/ExecutiveActions";

const ExecutiveCommandCenterNew = () => {
  const [strategicKPIs] = useState({
    marketPosition: { current: 87.3, target: 90.0, trend: 'up', change: 8.2 },
    innovationIndex: { current: 94.1, target: 95.0, trend: 'up', change: 12.7 },
    competitiveAdvantage: { current: 82.6, target: 85.0, trend: 'up', change: 5.8 },
    stakeholderValue: { current: 156.8, target: 150.0, trend: 'up', change: 15.3 }
  });

  const [riskAssessments] = useState([
    { category: 'Operational Risk', level: 'Low', score: 92, trend: 'improving' },
    { category: 'Financial Risk', level: 'Medium', score: 78, trend: 'stable' },
    { category: 'Regulatory Risk', level: 'Low', score: 89, trend: 'improving' },
    { category: 'Technology Risk', level: 'Low', score: 94, trend: 'improving' }
  ]);

  const [aiInsights] = useState([
    {
      type: 'strategic',
      priority: 'high',
      title: 'Market Expansion Opportunity',
      description: 'AI models identify 23% growth potential in emerging markets with minimal risk exposure.',
      confidence: 94,
      impact: 'High'
    },
    {
      type: 'operational',
      priority: 'medium',
      title: 'Process Optimization',
      description: 'Automated workflow analysis suggests 18% efficiency gains through strategic resource reallocation.',
      confidence: 87,
      impact: 'Medium'
    },
    {
      type: 'financial',
      priority: 'high',
      title: 'Cost Reduction Initiative',
      description: 'Predictive analytics recommend targeted cost optimization saving $2.3M annually.',
      confidence: 91,
      impact: 'High'
    }
  ]);

  return (
    <div className="space-y-6">
      {/* Strategic KPI Dashboard */}
      <StrategicKPICards strategicKPIs={strategicKPIs} />

      {/* Risk Management Intelligence */}
      <RiskManagementPanel riskAssessments={riskAssessments} />

      {/* AI Strategic Insights */}
      <AIStrategicInsights aiInsights={aiInsights} />

      {/* Executive Actions */}
      <ExecutiveActions />
    </div>
  );
};

export default ExecutiveCommandCenterNew;
