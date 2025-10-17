'use client';

import { useEffect, useState } from 'react';
import { useAdminStore } from '@/stores/adminStore';
import { adminApi } from '@/lib/adminApi';
import { Settings as SettingsIcon, Save, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';
import type { SystemSettings } from '@/types/admin';

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { settings, setSettings } = useAdminStore();
  
  const [formData, setFormData] = useState<SystemSettings>({
    maintenance_mode: false,
    registration_enabled: true,
    max_upload_size: 500,
    default_credits: 100,
    api_rate_limit: 60,
  });

  const fetchSettings = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await adminApi.getSettings();
      setSettings(data);
      setFormData(data);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const updated = await adminApi.updateSettings(formData);
      setSettings(updated);
      setFormData(updated);
      setSuccess('Settings updated successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = (field: keyof SystemSettings) => {
    setFormData((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleNumberChange = (field: keyof SystemSettings, value: string) => {
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue)) {
      setFormData((prev) => ({
        ...prev,
        [field]: numValue,
      }));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
          <p className="mt-1 text-sm text-gray-500">
            Configure system-wide settings and preferences
          </p>
        </div>
        <button
          onClick={fetchSettings}
          disabled={loading}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Alert Messages */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
          <AlertCircle className="h-5 w-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-red-800">Error</h3>
            <p className="mt-1 text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
          <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-green-800">Success</h3>
            <p className="mt-1 text-sm text-green-700">{success}</p>
          </div>
        </div>
      )}

      {/* Settings Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Maintenance Mode */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">General Settings</h3>
            <p className="mt-1 text-sm text-gray-500">
              Configure basic system settings
            </p>
          </div>
          <div className="px-6 py-5 space-y-6">
            {/* Maintenance Mode Toggle */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-900">
                  Maintenance Mode
                </label>
                <p className="text-sm text-gray-500 mt-1">
                  Enable maintenance mode to prevent users from accessing the system
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle('maintenance_mode')}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ${
                  formData.maintenance_mode ? 'bg-indigo-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    formData.maintenance_mode ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Registration Enabled Toggle */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-900">
                  Registration Enabled
                </label>
                <p className="text-sm text-gray-500 mt-1">
                  Allow new users to register accounts
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle('registration_enabled')}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ${
                  formData.registration_enabled ? 'bg-indigo-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    formData.registration_enabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Limits & Quotas */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Limits & Quotas</h3>
            <p className="mt-1 text-sm text-gray-500">
              Configure system limits and default quotas
            </p>
          </div>
          <div className="px-6 py-5 space-y-6">
            {/* Max Upload Size */}
            <div>
              <label htmlFor="max_upload_size" className="block text-sm font-medium text-gray-900">
                Max Upload Size (MB)
              </label>
              <p className="text-sm text-gray-500 mt-1 mb-2">
                Maximum file size for uploads
              </p>
              <input
                type="number"
                id="max_upload_size"
                value={formData.max_upload_size}
                onChange={(e) => handleNumberChange('max_upload_size', e.target.value)}
                min="1"
                max="10000"
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Default Credits */}
            <div>
              <label htmlFor="default_credits" className="block text-sm font-medium text-gray-900">
                Default Credits
              </label>
              <p className="text-sm text-gray-500 mt-1 mb-2">
                Default number of credits for new users
              </p>
              <input
                type="number"
                id="default_credits"
                value={formData.default_credits}
                onChange={(e) => handleNumberChange('default_credits', e.target.value)}
                min="0"
                max="100000"
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* API Rate Limit */}
            <div>
              <label htmlFor="api_rate_limit" className="block text-sm font-medium text-gray-900">
                API Rate Limit (requests/minute)
              </label>
              <p className="text-sm text-gray-500 mt-1 mb-2">
                Maximum API requests per user per minute
              </p>
              <input
                type="number"
                id="api_rate_limit"
                value={formData.api_rate_limit}
                onChange={(e) => handleNumberChange('api_rate_limit', e.target.value)}
                min="1"
                max="1000"
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="h-5 w-5 mr-2" />
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
