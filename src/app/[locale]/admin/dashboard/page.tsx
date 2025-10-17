'use client';

import { useEffect, useState } from 'react';
import { useAdminStore } from '@/stores/adminStore';
import { adminApi } from '@/lib/adminApi';
import MetricsCard from '@/components/admin/MetricsCard';
import {
  Cpu,
  HardDrive,
  Users,
  Activity,
  TrendingUp,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import type { AdminMetrics } from '@/types/admin';

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { metrics, setMetrics } = useAdminStore();

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await adminApi.getMetrics();
      setMetrics(data);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to load metrics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchMetrics, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading && !metrics) {
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
          <h3 className="text-sm font-medium text-red-800">Error loading metrics</h3>
          <p className="mt-1 text-sm text-red-700">{error}</p>
          <button
            onClick={fetchMetrics}
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
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            System overview and key metrics
          </p>
        </div>
        <button
          onClick={fetchMetrics}
          disabled={loading}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Metrics Grid */}
      {metrics && (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <MetricsCard
              title="CPU Usage"
              value={`${metrics.cpu_usage.toFixed(1)}%`}
              icon={Cpu}
              color={metrics.cpu_usage > 80 ? 'red' : metrics.cpu_usage > 60 ? 'yellow' : 'blue'}
              subtitle="Current load"
            />
            <MetricsCard
              title="Memory Usage"
              value={`${metrics.memory_usage.toFixed(1)}%`}
              icon={HardDrive}
              color={metrics.memory_usage > 80 ? 'red' : metrics.memory_usage > 60 ? 'yellow' : 'green'}
              subtitle="RAM utilization"
            />
            <MetricsCard
              title="Total Users"
              value={metrics.total_users}
              icon={Users}
              color="indigo"
              subtitle={`${metrics.active_users} active now`}
            />
            <MetricsCard
              title="Requests/min"
              value={metrics.requests_per_minute}
              icon={Activity}
              color="purple"
              subtitle={`${metrics.error_rate.toFixed(2)}% error rate`}
            />
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* System Health */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">System Health</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">CPU</span>
                    <span className="text-sm text-gray-500">{metrics.cpu_usage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        metrics.cpu_usage > 80
                          ? 'bg-red-500'
                          : metrics.cpu_usage > 60
                          ? 'bg-yellow-500'
                          : 'bg-blue-500'
                      }`}
                      style={{ width: `${metrics.cpu_usage}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Memory</span>
                    <span className="text-sm text-gray-500">{metrics.memory_usage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        metrics.memory_usage > 80
                          ? 'bg-red-500'
                          : metrics.memory_usage > 60
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                      }`}
                      style={{ width: `${metrics.memory_usage}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Disk</span>
                    <span className="text-sm text-gray-500">{metrics.disk_usage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-indigo-500"
                      style={{ width: `${metrics.disk_usage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Stats</h3>
              <dl className="space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm font-medium text-gray-500">Active Users</dt>
                  <dd className="text-sm font-semibold text-gray-900">{metrics.active_users}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm font-medium text-gray-500">Total Users</dt>
                  <dd className="text-sm font-semibold text-gray-900">{metrics.total_users}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm font-medium text-gray-500">Requests/min</dt>
                  <dd className="text-sm font-semibold text-gray-900">{metrics.requests_per_minute}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm font-medium text-gray-500">Error Rate</dt>
                  <dd className={`text-sm font-semibold ${
                    metrics.error_rate > 5 ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {metrics.error_rate.toFixed(2)}%
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
