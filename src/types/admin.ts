// Admin Dashboard TypeScript Types

export interface AdminMetrics {
  cpu_usage: number;
  memory_usage: number;
  disk_usage: number;
  active_users: number;
  total_users: number;
  requests_per_minute: number;
  error_rate: number;
}

export interface UserGrowthData {
  date: string;
  count: number;
}

export interface AdminAnalytics extends AdminMetrics {
  user_growth: UserGrowthData[];
  revenue_data: any[];
}

export interface SystemSettings {
  maintenance_mode: boolean;
  registration_enabled: boolean;
  max_upload_size: number;
  default_credits: number;
  api_rate_limit: number;
}

export interface ActivityLog {
  id: string;
  user_id: string | null;
  admin_id: string | null;
  action: string;
  resource: string | null;
  resource_id: string | null;
  ip_address: string | null;
  user_agent: string | null;
  extra_data: Record<string, any>;
  timestamp: string;
}

export interface ActivityLogsResponse {
  logs: ActivityLog[];
  total: number;
  page: number;
  limit: number;
}

export interface User {
  id: string;
  email: string;
  username: string;
  full_name: string;
  credits: number;
  total_presentations: number;
  subscription_tier: string;
  is_active: boolean;
  email_verified: boolean;
  created_at: string;
  last_login: string;
  updated_at: string;
  metadata: Record<string, any>;
  is_admin: boolean;
  role: string;
}

export interface AdminState {
  isAuthenticated: boolean;
  adminEmail: string | null;
  metrics: AdminMetrics | null;
  analytics: AdminAnalytics | null;
  settings: SystemSettings | null;
  activityLogs: ActivityLog[];
  setAuth: (email: string) => void;
  logout: () => void;
  setMetrics: (metrics: AdminMetrics) => void;
  setAnalytics: (analytics: AdminAnalytics) => void;
  setSettings: (settings: SystemSettings) => void;
  setActivityLogs: (logs: ActivityLog[]) => void;
}

export interface BulkActionRequest {
  user_ids: string[];
  action: 'suspend' | 'activate' | 'delete';
}

export interface BulkActionResponse {
  success: boolean;
  processed: number;
  failed: number;
  results: Array<{
    user_id: string;
    success: boolean;
    message?: string;
  }>;
}
