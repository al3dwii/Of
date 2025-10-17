'use client';

import { useEffect, useState } from 'react';
import { useAdminStore } from '@/stores/adminStore';
import { adminApi } from '@/lib/adminApi';
import MetricsCard from '@/components/admin/MetricsCard';
import {
  BarChart3,
  Users,
  TrendingUp,
  Activity,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { analytics, setAnalytics } = useAdminStore();

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await adminApi.getAnalytics();
      setAnalytics(data);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
    
    // Auto-refresh every 60 seconds
    const interval = setInterval(fetchAnalytics, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading && !analytics) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
        <AlertCircle className="h-5 w-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="text-sm font-medium text-red-800">Error loading analytics</h3>
          <p className="mt-1 text-sm text-red-700">{error}</p>
          <button
            onClick={fetchAnalytics}
            className="mt-3 text-sm font-medium text-red-600 hover:text-red-500"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="mt-1 text-sm text-gray-500">
            Detailed insights and performance metrics
          </p>
        </div>
        <button
          onClick={fetchAnalytics}
          disabled={loading}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Metrics Overview */}
      {analytics && (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <MetricsCard
              title="Total Users"
              value={analytics.total_users}
              icon={Users}
              color="indigo"
              subtitle={`${analytics.active_users} active`}
            />
            <MetricsCard
              title="CPU Usage"
              value={`${analytics.cpu_usage.toFixed(1)}%`}
              icon={Activity}
              color={analytics.cpu_usage > 80 ? 'red' : 'blue'}
              subtitle="Current load"
            />
            <MetricsCard
              title="Memory"
              value={`${analytics.memory_usage.toFixed(1)}%`}
              icon={TrendingUp}
              color={analytics.memory_usage > 80 ? 'red' : 'green'}
              subtitle="RAM usage"
            />
            <MetricsCard
              title="Requests/min"
              value={analytics.requests_per_minute}
              icon={BarChart3}
              color="purple"
              subtitle={`${analytics.error_rate.toFixed(2)}% errors`}
            />
          </div>

          {/* User Growth Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900">User Growth</h3>
              <p className="mt-1 text-sm text-gray-500">
                New user registrations over time
              </p>
            </div>
            
            {analytics.user_growth && analytics.user_growth.length > 0 ? (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={analytics.user_growth}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        return `${date.getMonth() + 1}/${date.getDate()}`;
                      }}
                    />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.5rem',
                      }}
                      labelFormatter={(value) => {
                        const date = new Date(value);
                        return date.toLocaleDateString();
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="#6366f1"
                      strokeWidth={2}
                      dot={{ fill: '#6366f1', r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-80 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p>No user growth data available</p>
                </div>
              </div>
            )}
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* System Performance */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">System Performance</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Error Rate</span>
                    <span className={`text-sm font-semibold ${
                      analytics.error_rate > 5 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {analytics.error_rate.toFixed(2)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        analytics.error_rate > 5 ? 'bg-red-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(analytics.error_rate * 10, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Disk Usage</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {analytics.disk_usage.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-indigo-500"
                      style={{ width: `${analytics.disk_usage}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">API Throughput</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {analytics.requests_per_minute} req/min
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-purple-500"
                      style={{ width: `${Math.min((analytics.requests_per_minute / 100) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* User Statistics */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">User Statistics</h3>
              <dl className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <dt className="text-sm font-medium text-gray-500">Total Users</dt>
                  <dd className="text-sm font-semibold text-gray-900">{analytics.total_users}</dd>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <dt className="text-sm font-medium text-gray-500">Active Users</dt>
                  <dd className="text-sm font-semibold text-gray-900">{analytics.active_users}</dd>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <dt className="text-sm font-medium text-gray-500">Activity Rate</dt>
                  <dd className="text-sm font-semibold text-gray-900">
                    {analytics.total_users > 0
                      ? ((analytics.active_users / analytics.total_users) * 100).toFixed(1)
                      : 0}%
                  </dd>
                </div>
                <div className="flex items-center justify-between py-3">
                  <dt className="text-sm font-medium text-gray-500">New Users (Last 7 days)</dt>
                  <dd className="text-sm font-semibold text-gray-900">
                    {analytics.user_growth?.reduce((sum, item) => sum + item.count, 0) || 0}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
