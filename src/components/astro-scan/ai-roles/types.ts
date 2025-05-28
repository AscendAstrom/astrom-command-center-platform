
export interface AIRole {
  id: string;
  name: string;
  description: string;
  category: string;
  module: string;
  isActive: boolean;
  skills: string[];
  performance: {
    accuracy: number;
    recommendations: number;
    successRate: number;
  };
}
