
import { 
  Home, 
  Database, 
  BarChart3, 
  Eye, 
  Workflow, 
  Settings, 
  Brain,
  Shield,
  Users,
  Search,
  Building2,
  Activity,
  Stethoscope,
  FileText,
  Clock,
  AlertTriangle,
  TrendingUp,
  Layers,
  Zap,
  Globe,
  Lock,
  Target,
  Cpu,
  Network,
  GitBranch,
  Monitor,
  CheckCircle
} from 'lucide-react';

export interface NavigationItem {
  id: string;
  label: string;
  icon: any;
  href: string;
  badge?: string;
  description: string;
  category: 'core' | 'intelligence' | 'operations' | 'admin';
}

export const navigationItems: NavigationItem[] = [
  // Core Platform
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: Home,
    href: '/dashboard',
    description: 'Main platform overview and analytics',
    category: 'core'
  },
  {
    id: 'astro-scan',
    label: 'ASTRO-SCAN',
    icon: Search,
    href: '/astro-scan',
    description: 'Data ingestion and source management',
    category: 'core'
  },
  {
    id: 'astro-bricks',
    label: 'ASTRO-BRICKS',
    icon: Database,
    href: '/astro-bricks',
    description: 'Data modeling and transformation',
    category: 'core'
  },
  {
    id: 'astro-metrics',
    label: 'ASTRO-METRICS',
    icon: BarChart3,
    href: '/astro-metrics',
    description: 'KPI management and performance analytics',
    category: 'core'
  },
  {
    id: 'astro-view',
    label: 'ASTRO-VIEW',
    icon: Eye,
    href: '/astro-view',
    description: 'Data visualization and dashboards',
    category: 'core'
  },
  {
    id: 'astro-flow',
    label: 'ASTRO-FLOW',
    icon: Workflow,
    href: '/astro-flow',
    description: 'Workflow automation and process management',
    category: 'core'
  },

  // Intelligence & AI
  {
    id: 'ai-ecosystem',
    label: 'AI-ECOSYSTEM',
    icon: Brain,
    href: '/ai-ecosystem',
    badge: 'AI',
    description: 'Advanced AI and machine learning platform',
    category: 'intelligence'
  },
  {
    id: 'command-center',
    label: 'Command Center',
    icon: Monitor,
    href: '/command-center',
    description: 'Executive command and control center',
    category: 'intelligence'
  },

  // Operations
  {
    id: 'bed-management',
    label: 'Bed Management',
    icon: Building2,
    href: '/dashboard',
    description: 'Hospital bed tracking and allocation',
    category: 'operations'
  },
  {
    id: 'patient-flow',
    label: 'Patient Flow',
    icon: Activity,
    href: '/dashboard',
    description: 'Patient journey and flow optimization',
    category: 'operations'
  },
  {
    id: 'clinical-ops',
    label: 'Clinical Operations',
    icon: Stethoscope,
    href: '/dashboard',
    description: 'Clinical workflow management',
    category: 'operations'
  },

  // Administration
  {
    id: 'admin-panel',
    label: 'Admin Panel',
    icon: Users,
    href: '/admin',
    description: 'User and system administration',
    category: 'admin'
  },
  {
    id: 'production-audit',
    label: 'Production Audit',
    icon: CheckCircle,
    href: '/production-audit',
    badge: 'NEW',
    description: 'Pre-UAT system validation and readiness check',
    category: 'admin'
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    href: '/settings',
    description: 'Application configuration and preferences',
    category: 'admin'
  }
];

export const getNavigationByCategory = (category: NavigationItem['category']) => {
  return navigationItems.filter(item => item.category === category);
};

export const getCoreModules = () => getNavigationByCategory('core');
export const getIntelligenceModules = () => getNavigationByCategory('intelligence');
export const getOperationsModules = () => getNavigationByCategory('operations');
export const getAdminModules = () => getNavigationByCategory('admin');
