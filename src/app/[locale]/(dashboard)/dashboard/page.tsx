'use client'

import { useEffect, useState } from 'react'
import {
  Presentation,
  FileText,
  TrendingUp,
  Clock,
  CheckCircle,
  Plus,
  ArrowRight,
  Download,
  Edit,
  Trash2,
  Sparkles,
  Zap,
  Calendar,
  Activity,
  BarChart3,
  Target,
  Eye,
  Settings,
  Loader2,
  AlertCircle,
  RefreshCw
} from 'lucide-react'
import Link from 'next/link'

interface DashboardStats {
  user_id: string
  user_email: string
  user_name?: string
  credits: number
  total_presentations: number
  completed_presentations: number
  draft_presentations: number
  presentations_this_month: number
  presentations_this_week: number
  total_views: number
  storage_used_mb: number
  is_active: boolean
  created_at: string
}

interface UserPresentation {
  id: string
  title: string
  description?: string
  html_url?: string
  created_at: string
  updated_at: string
}

interface ActivityItem {
  id: string
  action: string
  project: string
  time: string
  timestamp: string
  type: string
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [presentations, setPresentations] = useState<UserPresentation[]>([])
  const [activity, setActivity] = useState<ActivityItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'activity'>('overview')

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000'

  const loadDashboardData = async () => {
    setLoading(true)
    setError(null)

    try {
      // Load stats
      const statsResponse = await fetch(`${API_BASE}/api/dashboard/stats`)
      if (!statsResponse.ok) throw new Error('Failed to load dashboard stats')
      const statsData = await statsResponse.json()
      setStats(statsData)

      // Load presentations
      const presResponse = await fetch(`${API_BASE}/api/dashboard/presentations?limit=10`)
      if (!presResponse.ok) throw new Error('Failed to load presentations')
      const presData = await presResponse.json()
      setPresentations(presData.presentations || [])

      // Load activity
      const activityResponse = await fetch(`${API_BASE}/api/dashboard/activity?limit=10`)
      if (!activityResponse.ok) throw new Error('Failed to load activity')
      const activityData = await activityResponse.json()
      setActivity(activityData.activity || [])
    } catch (err: any) {
      console.error('Dashboard error:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDashboardData()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-900 text-center mb-2">Error Loading Dashboard</h3>
          <p className="text-red-700 text-center mb-4">{error}</p>
          <button
            onClick={loadDashboardData}
            className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (!stats) {
    return null
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back, {stats.user_name || stats.user_email}! Here's your overview.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/test-agentic"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
          >
            <Sparkles className="w-4 h-4" />
            New Presentation
          </Link>
          <Link href="/dashboard/settings" className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Presentations */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur">
              <Target className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-1 text-sm bg-white/20 px-2 py-1 rounded-full">
              <TrendingUp className="w-3 h-3" />
              <span>+{stats.presentations_this_week}</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold">{stats.total_presentations}</h3>
          <p className="text-blue-100 text-sm mt-1">Total Presentations</p>
        </div>

        {/* This Month */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
              <TrendingUp className="w-3 h-3" />
              <span>This Month</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats.presentations_this_month}</h3>
          <p className="text-gray-500 text-sm mt-1">Created This Month</p>
        </div>

        {/* This Week */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex items-center gap-1 text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
              <Clock className="w-3 h-3" />
              <span>7 Days</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats.presentations_this_week}</h3>
          <p className="text-gray-500 text-sm mt-1">Created This Week</p>
        </div>

        {/* AI Credits */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-xs text-gray-500">
              Available
            </div>
          </div>
          <div className="relative">
            <h3 className="text-2xl font-bold text-gray-900">{stats.credits.toLocaleString()}</h3>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-3">
              <div 
                className="bg-gradient-to-r from-orange-500 to-orange-600 h-1.5 rounded-full"
                style={{ width: `${Math.min((stats.credits / 1000) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-2">AI Credits</p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-1">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Overview
            </div>
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'projects'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <FileText className="w-4 h-4" />
              My Presentations
            </div>
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'activity'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Activity className="w-4 h-4" />
              Activity
            </div>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Create Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Create</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link
                  href="/test-agentic"
                  className="group p-4 rounded-lg border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Presentation className="w-5 h-5 text-blue-600" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">AI Presentation</h3>
                  <p className="text-sm text-gray-600">Generate slides with AI</p>
                </Link>

                <Link
                  href="/database"
                  className="group p-4 rounded-lg border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FileText className="w-5 h-5 text-purple-600" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Browse All</h3>
                  <p className="text-sm text-gray-600">View all your presentations</p>
                </Link>

                <Link
                  href="/editor"
                  className="group p-4 rounded-lg border-2 border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Edit className="w-5 h-5 text-green-600" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Editor</h3>
                  <p className="text-sm text-gray-600">Edit presentations</p>
                </Link>

                <Link
                  href="/credits"
                  className="group p-4 rounded-lg border-2 border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Zap className="w-5 h-5 text-orange-600" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-orange-600 transition-colors" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Get Credits</h3>
                  <p className="text-sm text-gray-600">Top up your credits</p>
                </Link>
              </div>
            </div>

            {/* Recent Presentations */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Recent Presentations</h2>
                <Link href="/database" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View All
                </Link>
              </div>
              {presentations.length === 0 ? (
                <div className="text-center py-12">
                  <Presentation className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 mb-4">No presentations yet</p>
                  <Link
                    href="/test-agentic"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4" />
                    Create Your First Presentation
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {presentations.slice(0, 5).map((pres) => (
                    <div key={pres.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Presentation className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">{pres.title}</h3>
                        <p className="text-xs text-gray-500">{formatDate(pres.created_at)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {pres.html_url && (
                          <Link
                            href={`/view/${pres.id}`}
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                        )}
                        <button
                          onClick={() => {
                            localStorage.setItem('editorJobId', pres.id)
                            window.location.href = '/editor'
                          }}
                          className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Account Info */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Account</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium text-gray-900">{stats.user_email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Member Since</p>
                  <p className="font-medium text-gray-900">{formatDate(stats.created_at)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    stats.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {stats.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h2>
              {activity.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">No recent activity</p>
              ) : (
                <div className="space-y-3">
                  {activity.slice(0, 5).map((item) => (
                    <div key={item.id} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{item.action}</p>
                        <p className="text-xs text-gray-500 truncate">{item.project}</p>
                        <p className="text-xs text-gray-400 mt-1">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'projects' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">All Presentations</h2>
            <Link
              href="/test-agentic"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              New Presentation
            </Link>
          </div>

          {presentations.length === 0 ? (
            <div className="text-center py-12">
              <Presentation className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No presentations yet</h3>
              <p className="text-gray-600 mb-6">Create your first AI-powered presentation</p>
              <Link
                href="/test-agentic"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Sparkles className="w-4 h-4" />
                Create Presentation
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {presentations.map((pres) => (
                <div key={pres.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Presentation className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                      <CheckCircle className="w-3 h-3 inline mr-1" />
                      Complete
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 truncate">{pres.title}</h3>
                  {pres.description && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{pres.description}</p>
                  )}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span>{formatDate(pres.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {pres.html_url && (
                      <Link
                        href={`/view/${pres.id}`}
                        className="flex-1 px-3 py-2 text-sm font-medium text-center text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
                      >
                        View
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        localStorage.setItem('editorJobId', pres.id)
                        window.location.href = '/editor'
                      }}
                      className="flex-1 px-3 py-2 text-sm font-medium text-center text-green-600 bg-green-50 rounded-lg hover:bg-green-100"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'activity' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Activity Timeline</h2>
          {activity.length === 0 ? (
            <div className="text-center py-12">
              <Activity className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No activity yet</p>
            </div>
          ) : (
            <div className="space-y-6">
              {activity.map((item) => (
                <div key={item.id} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1 pb-6 border-b border-gray-200 last:border-0">
                    <p className="font-medium text-gray-900">{item.action}</p>
                    <p className="text-sm text-gray-600 mt-1">{item.project}</p>
                    <p className="text-sm text-gray-400 mt-2">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
