
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

import { NavigationItem, SystemItem } from './types';

export const navigationItems: NavigationItem[] = [
  {
    title: 'Dashboard',
    subtitle: 'Platform Overview',
    url: '/dashboard',
    icon: Home,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    activeBg: 'bg-blue-100',
    iconBg: 'bg-gradient-to-br from-blue-500 to-blue-600'
  },
  {
    title: 'ASTRO-SCAN',
    subtitle: 'Data Ingestion',
    url: '/astro-scan',
    icon: Search,
    color: 'text-green-600',
    bg: 'bg-green-50',
    activeBg: 'bg-green-100',
    iconBg: 'bg-gradient-to-br from-green-500 to-green-600'
  },
  {
    title: 'ASTRO-BRICKS',
    subtitle: 'Data Modeling',
    url: '/astro-bricks',
    icon: Database,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    activeBg: 'bg-purple-100',
    iconBg: 'bg-gradient-to-br from-purple-500 to-purple-600'
  },
  {
    title: 'ASTRO-METRICS',
    subtitle: 'KPI Analytics',
    url: '/astro-metrics',
    icon: BarChart3,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    activeBg: 'bg-orange-100',
    iconBg: 'bg-gradient-to-br from-orange-500 to-orange-600'
  },
  {
    title: 'ASTRO-VIEW',
    subtitle: 'Visualization',
    url: '/astro-view',
    icon: Eye,
    color: 'text-cyan-600',
    bg: 'bg-cyan-50',
    activeBg: 'bg-cyan-100',
    iconBg: 'bg-gradient-to-br from-cyan-500 to-cyan-600'
  },
  {
    title: 'ASTRO-FLOW',
    subtitle: 'Automation',
    url: '/astro-flow',
    icon: Workflow,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    activeBg: 'bg-indigo-100',
    iconBg: 'bg-gradient-to-br from-indigo-500 to-indigo-600'
  },
  {
    title: 'AI-ECOSYSTEM',
    subtitle: 'Intelligence Platform',
    url: '/ai-ecosystem',
    icon: Brain,
    color: 'text-pink-600',
    bg: 'bg-pink-50',
    activeBg: 'bg-pink-100',
    iconBg: 'bg-gradient-to-br from-pink-500 to-pink-600'
  },
  {
    title: 'Command Center',
    subtitle: 'Executive Control',
    url: '/command-center',
    icon: Monitor,
    color: 'text-red-600',
    bg: 'bg-red-50',
    activeBg: 'bg-red-100',
    iconBg: 'bg-gradient-to-br from-red-500 to-red-600'
  }
];

export const systemItems: SystemItem[] = [
  {
    title: 'Admin Panel',
    url: '/admin',
    icon: Users,
    color: 'text-gray-600',
    bg: 'bg-gray-50',
    activeBg: 'bg-gray-100',
    iconBg: 'bg-gradient-to-br from-gray-500 to-gray-600'
  },
  {
    title: 'Production Audit',
    url: '/production-audit',
    icon: CheckCircle,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    activeBg: 'bg-emerald-100',
    iconBg: 'bg-gradient-to-br from-emerald-500 to-emerald-600'
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
    color: 'text-slate-600',
    bg: 'bg-slate-50',
    activeBg: 'bg-slate-100',
    iconBg: 'bg-gradient-to-br from-slate-500 to-slate-600'
  }
];

export const getNavigationByCategory = (category: string) => {
  return navigationItems;
};

export const getCoreModules = () => navigationItems.slice(0, 6);
export const getIntelligenceModules = () => navigationItems.slice(6, 8);
export const getAdminModules = () => systemItems;
