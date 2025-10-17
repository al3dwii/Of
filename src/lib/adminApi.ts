// Admin API Client with Clerk Authentication
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import type {
  AdminMetrics,
  AdminAnalytics,
  SystemSettings,
  ActivityLogsResponse,
  BulkActionRequest,
  BulkActionResponse,
} from '@/types/admin';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://presentation-api-production.up.railway.app';

class AdminAPI {
  private client: AxiosInstance;
  private getTokenFn: (() => Promise<string | null>) | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add Clerk JWT token
    this.client.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        if (this.getTokenFn) {
          try {
            const token = await this.getTokenFn();
            if (token) {
              config.headers.Authorization = `Bearer ${token}`;
            }
          } catch (error) {
            console.error('Failed to get Clerk token:', error);
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor to handle errors
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Unauthorized - redirect to sign-in
          if (typeof window !== 'undefined') {
            window.location.href = '/sign-in?redirect_url=/en/admin';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  // Set the token getter function from Clerk's useAuth hook
  setTokenGetter(getToken: () => Promise<string | null>) {
    this.getTokenFn = getToken;
  }

  // Get system metrics
  async getMetrics(): Promise<AdminMetrics> {
    const response = await this.client.get<AdminMetrics>('/api/admin/metrics');
    return response.data;
  }

  // Get analytics data
  async getAnalytics(): Promise<AdminAnalytics> {
    const response = await this.client.get<AdminAnalytics>('/api/admin/analytics');
    return response.data;
  }

  // Get activity logs
  async getActivityLogs(page = 1, limit = 50): Promise<ActivityLogsResponse> {
    const response = await this.client.get<ActivityLogsResponse>(
      `/api/admin/activity-logs?page=${page}&limit=${limit}`
    );
    return response.data;
  }

  // Get system settings
  async getSettings(): Promise<SystemSettings> {
    const response = await this.client.get<SystemSettings>('/api/admin/settings');
    return response.data;
  }

  // Update system settings
  async updateSettings(settings: Partial<SystemSettings>): Promise<SystemSettings> {
    const response = await this.client.put<SystemSettings>('/api/admin/settings', settings);
    return response.data;
  }

  // List users with pagination and search
  async listUsers(page = 1, limit = 50, search?: string): Promise<any> {
    const params = new URLSearchParams({ page: page.toString(), limit: limit.toString() });
    if (search) {
      params.append('search', search);
    }
    const response = await this.client.get(`/api/admin/users?${params.toString()}`);
    return response.data;
  }

  // User action (suspend, activate, delete)
  async userAction(userId: string, action: 'suspend' | 'activate' | 'delete'): Promise<any> {
    const actionMap: Record<string, string> = {
      suspend: 'deactivate',
      activate: 'activate',
      delete: 'delete'
    };
    const response = await this.client.post(`/api/admin/users/${userId}/${actionMap[action]}`);
    return response.data;
  }

  // Bulk user action
  async bulkAction(request: BulkActionRequest): Promise<BulkActionResponse> {
    const response = await this.client.post<BulkActionResponse>('/api/admin/bulk-action', request);
    return response.data;
  }
}

// Singleton instance
export const adminApi = new AdminAPI();
export default adminApi;
