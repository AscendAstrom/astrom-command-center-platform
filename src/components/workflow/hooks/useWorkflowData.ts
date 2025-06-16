
import { useState } from 'react';

export interface WorkflowStep {
  id: string;
  name: string;
  phase: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed' | 'optimizing';
  progress: number;
  aiInsights: string[];
  recommendations: string[];
  duration?: string;
  autoTrigger: boolean;
}

export interface AIWorkflowState {
  sourceId: string;
  sourceName: string;
  currentPhase: number;
  overallProgress: number;
  steps: WorkflowStep[];
  aiDecisions: number;
  automatedActions: number;
  confidenceScore: number;
}

export const useWorkflowData = () => {
  const [workflows] = useState<AIWorkflowState[]>([
    {
      sourceId: '1',
      sourceName: 'Saudi MOH FHIR Gateway',
      currentPhase: 4,
      overallProgress: 67,
      aiDecisions: 23,
      automatedActions: 15,
      confidenceScore: 94,
      steps: [
        {
          id: '1',
          name: 'Intelligent Data Discovery',
          phase: 'Phase 1: Onboarding',
          status: 'completed',
          progress: 100,
          aiInsights: ['Schema validated automatically', 'Data quality score: 96%'],
          recommendations: [],
          duration: '2m 15s',
          autoTrigger: true
        },
        {
          id: '2',
          name: 'Smart Field Mapping',
          phase: 'Phase 1: Onboarding',
          status: 'completed',
          progress: 100,
          aiInsights: ['87 fields mapped automatically', 'Confidence: 98%'],
          recommendations: [],
          duration: '45s',
          autoTrigger: true
        },
        {
          id: '3',
          name: 'Real-time Ingestion',
          phase: 'Phase 2: Ingestion',
          status: 'completed',
          progress: 100,
          aiInsights: ['2.4M records processed', 'Zero data loss'],
          recommendations: [],
          duration: '12m 30s',
          autoTrigger: true
        },
        {
          id: '4',
          name: 'Pipeline Optimization',
          phase: 'Phase 3: Processing',
          status: 'in_progress',
          progress: 78,
          aiInsights: ['Performance improved by 34%', 'Memory usage optimized'],
          recommendations: ['Consider horizontal scaling for peak hours'],
          autoTrigger: true
        },
        {
          id: '5',
          name: 'Clinical Intelligence',
          phase: 'Phase 4: Analysis',
          status: 'pending',
          progress: 0,
          aiInsights: [],
          recommendations: ['Ready for predictive analytics'],
          autoTrigger: true
        },
        {
          id: '6',
          name: 'Executive Insights',
          phase: 'Phase 5: Intelligence',
          status: 'pending',
          progress: 0,
          aiInsights: [],
          recommendations: [],
          autoTrigger: true
        },
        {
          id: '7',
          name: 'Autonomous Operations',
          phase: 'Phase 6: Operations',
          status: 'pending',
          progress: 0,
          aiInsights: [],
          recommendations: [],
          autoTrigger: true
        }
      ]
    }
  ]);

  return { workflows };
};
