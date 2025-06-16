
import { useState, useEffect } from 'react';
import { AutomationRule } from '../types';
import { sampleAutomationRules } from '../data/sampleAutomationRules';

export const useAutomationRules = () => {
  const [rules, setRules] = useState<AutomationRule[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const loadRules = async () => {
      setIsLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setRules(sampleAutomationRules);
      setIsLoading(false);
    };

    loadRules();
  }, []);

  const createRule = async (rule: Omit<AutomationRule, 'id' | 'executionCount' | 'created_at' | 'updated_at'>) => {
    const newRule: AutomationRule = {
      ...rule,
      id: `rule_${Date.now()}`,
      executionCount: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    setRules(prev => [...prev, newRule]);
    return newRule;
  };

  const updateRule = async (id: string, updates: Partial<AutomationRule>) => {
    setRules(prev => prev.map(rule => 
      rule.id === id 
        ? { ...rule, ...updates, updated_at: new Date().toISOString() }
        : rule
    ));
  };

  const deleteRule = async (id: string) => {
    setRules(prev => prev.filter(rule => rule.id !== id));
  };

  const executeRule = async (id: string) => {
    setRules(prev => prev.map(rule => 
      rule.id === id 
        ? { 
            ...rule, 
            executionCount: rule.executionCount + 1,
            last_executed: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        : rule
    ));
  };

  return {
    rules,
    isLoading,
    createRule,
    updateRule,
    deleteRule,
    executeRule
  };
};
