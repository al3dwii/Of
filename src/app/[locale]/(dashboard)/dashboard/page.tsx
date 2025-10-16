'use client'

import { useEffect, useState } from 'react'
import { apiClient } from '@/lib/api/client'
import {
  Presentation,
  Video,
  FileText,
  Globe,
  Languages,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  ArrowRight,
  Download,
  Share2,
  Edit,
  Trash2,
  MoreVertical,
  Sparkles,
  Zap,
  Calendar,
  Activity,
  BarChart3,
  Target,
  Award,
  Star,
  Eye,
  User,
  Settings
} from 'lucide-react'
import Link from 'next/link'

// Type definitions
type ProjectStatus = 'completed' | 'processing' | 'draft' | 'failed'

// Mock data for recent projects
const mockRecentProjects: Array<{
  id: number
  title: string
  type: string
  status: ProjectStatus
  createdAt: string
  slides?: number
  views?: number
  icon: any
  color: string
  duration?: string
  progress?: number
  pages?: number
  downloads?: number
  words?: number
  error?: string
}> = [
  {
    id: 1,
    title: 'Q4 Sales Report Presentation',
    type: 'slides',
    status: 'completed',
    createdAt: '2 hours ago',
    slides: 12,
    views: 45,
    icon: Presentation,
    color: 'blue'
  },
  {
    id: 2,
    title: 'Product Catalog Presentation',
    type: 'slides',
    status: 'processing',
    createdAt: '5 hours ago',
    slides: 15,
    progress: 67,
    icon: Presentation,
    color: 'purple'
  },
  {
    id: 3,
    title: 'Annual Report PDF',
    type: 'pdf',
    status: 'completed',
    createdAt: '1 day ago',
    pages: 24,
    downloads: 18,
    icon: FileText,
    color: 'red'
  },
  {
    id: 4,
    title: 'Training Materials Presentation',
    type: 'slides',
    status: 'completed',
    createdAt: '2 days ago',
    slides: 20,
    views: 34,
    icon: Presentation,
    color: 'green'
  },
  {
    id: 5,
    title: 'Product Demo Slides',
    type: 'slides',
    status: 'draft',
    createdAt: '3 days ago',
    slides: 8,
    views: 12,
    icon: Presentation,
    color: 'blue'
  },
  {
    id: 6,
    title: 'Training Manual Document',
    type: 'document',
    status: 'failed',
    createdAt: '3 days ago',
    error: 'File format not supported',
    icon: FileText,
    color: 'orange'
  }
]

// Mock activity data
const mockActivity = [
  { action: 'Created presentation', project: 'Q4 Sales Report', time: '2 hours ago', icon: Plus },
  { action: 'Converted document', project: 'Product Catalog', time: '4 hours ago', icon: FileText },
  { action: 'Downloaded presentation', project: 'Annual Report', time: '1 day ago', icon: Download },
  { action: 'Edited slides', project: 'Product Demo', time: '2 days ago', icon: Edit },
  { action: 'Generated presentation', project: 'Training Materials', time: '2 days ago', icon: CheckCircle }
]

// Mock usage data
const mockUsage = {
  aiCredits: 750,
  aiCreditsMax: 1000,
  storage: 3.2,
  storageMax: 10,
  projectsThisMonth: 24,
  projectsLimit: 100,
  apiCalls: 1248,
  apiCallsLimit: 5000
}

export default function DashboardPage() {
  const [stats, setStats] = useState({
    presentations: 0,
    apiConnected: false
  })
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'activity'>('overview')

  // Helper functions
  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      case 'draft': return 'bg-gray-100 text-gray-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: ProjectStatus) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-3 h-3" />
      case 'processing': return <Clock className="w-3 h-3 animate-spin" />
      case 'draft': return <Edit className="w-3 h-3" />
      case 'failed': return <XCircle className="w-3 h-3" />
      default: return null
    }
  }

  useEffect(() => {
    // Test backend connection and load stats
    const loadDashboardData = async () => {
      try {
        // Try to check backend health
        const health = await apiClient.healthCheck()
        if (health.success) {
          setStats(prev => ({ ...prev, apiConnected: true }))
        }
        
        // Try to load presentations
        const presentations = await apiClient.getPresentations()
        if (presentations.success) {
          setStats(prev => ({ ...prev, presentations: presentations.data.length }))
        }
      } catch (error) {
        console.log('Backend not available, using mock data')
        // Use mock data when backend is not available
        setStats({
          presentations: 24,
          apiConnected: false
        })
      }
    }

    loadDashboardData()
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here's your content creation overview.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/en/slides"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
          >
            <Sparkles className="w-4 h-4" />
            New Project
          </Link>
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* API Status Banner
      {!stats.apiConnected && (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-medium text-yellow-900">Using Demo Mode</h3>
              <p className="text-sm text-yellow-700 mt-1">
                Backend API is not connected. All data shown is for demonstration purposes.
              </p>
            </div>
          </div>
        </div>
      )} */}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Projects */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur">
              <Target className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-1 text-sm bg-white/20 px-2 py-1 rounded-full">
              <TrendingUp className="w-3 h-3" />
              <span>+12%</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold">{stats.presentations}</h3>
          <p className="text-blue-100 text-sm mt-1">Total Projects</p>
        </div>

        {/* Presentations */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Presentation className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
              <TrendingUp className="w-3 h-3" />
              <span>+28%</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats.presentations}</h3>
          <p className="text-gray-500 text-sm mt-1">Presentations</p>
        </div>

        {/* Documents Converted */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex items-center gap-1 text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
              <TrendingUp className="w-3 h-3" />
              <span>+32%</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">156</h3>
          <p className="text-gray-500 text-sm mt-1">Documents Converted</p>
        </div>

        {/* AI Credits */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-xs text-gray-500">
              {mockUsage.aiCredits}/{mockUsage.aiCreditsMax}
            </div>
          </div>
          <div className="relative">
            <h3 className="text-2xl font-bold text-gray-900">{mockUsage.aiCredits}</h3>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-3">
              <div 
                className="bg-gradient-to-r from-orange-500 to-orange-600 h-1.5 rounded-full"
                style={{ width: `${(mockUsage.aiCredits / mockUsage.aiCreditsMax) * 100}%` }}
              ></div>
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-2">AI Credits Available</p>
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
              Projects
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
          {/* Quick Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Create Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Create</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link
                  href="/en/slides"
                  className="group p-4 rounded-lg border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Presentation className="w-5 h-5 text-blue-600" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">AI Presentation</h3>
                  <p className="text-sm text-gray-600">Generate slides from text</p>
                </Link>

                <Link
                  href="/en/slides"
                  className="group p-4 rounded-lg border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FileText className="w-5 h-5 text-purple-600" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Document to Slides</h3>
                  <p className="text-sm text-gray-600">Convert Word, PDF to presentations</p>
                </Link>

                <Link
                  href="/en/slides"
                  className="group p-4 rounded-lg border-2 border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Sparkles className="w-5 h-5 text-red-600" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-red-600 transition-colors" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">AI Designer</h3>
                  <p className="text-sm text-gray-600">Smart layout & themes</p>
                </Link>

                <Link
                  href="/en/slides"
                  className="group p-4 rounded-lg border-2 border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Globe className="w-5 h-5 text-green-600" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Templates</h3>
                  <p className="text-sm text-gray-600">Professional templates library</p>
                </Link>
              </div>
            </div>

            {/* Usage Overview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Usage This Month</h2>
                <Calendar className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                {/* Projects */}
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Projects</span>
                    <span className="font-medium text-gray-900">
                      {mockUsage.projectsThisMonth} / {mockUsage.projectsLimit}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                      style={{ width: `${(mockUsage.projectsThisMonth / mockUsage.projectsLimit) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Storage */}
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Storage</span>
                    <span className="font-medium text-gray-900">
                      {mockUsage.storage} GB / {mockUsage.storageMax} GB
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full"
                      style={{ width: `${(mockUsage.storage / mockUsage.storageMax) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* API Calls */}
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">API Calls</span>
                    <span className="font-medium text-gray-900">
                      {mockUsage.apiCalls.toLocaleString()} / {mockUsage.apiCallsLimit.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
                      style={{ width: `${(mockUsage.apiCalls / mockUsage.apiCallsLimit) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <button className="w-full mt-4 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                Upgrade Plan
              </button>
            </div>
          </div>

          {/* Recent Activity Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-3">
                {mockActivity.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{item.action}</p>
                        <p className="text-xs text-gray-500 truncate">{item.project}</p>
                        <p className="text-xs text-gray-400 mt-1">{item.time}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-yellow-600" />
                <h2 className="text-lg font-bold text-gray-900">Achievements</h2>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-yellow-600 fill-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Early Adopter</p>
                    <p className="text-xs text-gray-600">First 100 users</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Zap className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Power User</p>
                    <p className="text-xs text-gray-600">20+ projects created</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'projects' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Projects Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">All Projects</h2>
              <div className="flex items-center gap-2">
                <select className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>All Types</option>
                  <option>Presentations</option>
                  <option>Documents</option>
                  <option>Templates</option>
                </select>
                <select className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>All Status</option>
                  <option>Completed</option>
                  <option>Processing</option>
                  <option>Draft</option>
                  <option>Failed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Projects List */}
          <div className="divide-y divide-gray-200">
            {mockRecentProjects.map((project) => {
              const Icon = project.icon
              return (
                <div key={project.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div className={`w-12 h-12 bg-${project.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-6 h-6 text-${project.color}-600`} />
                    </div>

                    {/* Project Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900 truncate">{project.title}</h3>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                          {getStatusIcon(project.status)}
                          {project.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{project.createdAt}</span>
                        {project.slides && <span>• {project.slides} slides</span>}
                        {project.pages && <span>• {project.pages} pages</span>}
                        {project.duration && <span>• {project.duration}</span>}
                        {project.words && <span>• {project.words.toLocaleString()} words</span>}
                        {project.views && (
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {project.views}
                          </span>
                        )}
                        {project.downloads && (
                          <span className="flex items-center gap-1">
                            <Download className="w-3 h-3" />
                            {project.downloads}
                          </span>
                        )}
                      </div>
                      {project.status === 'processing' && project.progress && (
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div 
                              className="bg-blue-600 h-1.5 rounded-full transition-all"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{project.progress}% complete</p>
                        </div>
                      )}
                      {project.status === 'failed' && project.error && (
                        <p className="text-sm text-red-600 mt-1">{project.error}</p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      {project.status === 'completed' && (
                        <>
                          <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                            <Download className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                            <Share2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      {project.status === 'draft' && (
                        <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                      )}
                      <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Pagination */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">Showing 1-6 of 24 projects</p>
              <div className="flex items-center gap-2">
                <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-lg hover:bg-blue-700">
                  1
                </button>
                <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                  2
                </button>
                <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                  3
                </button>
                <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'activity' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Activity Timeline</h2>
          <div className="space-y-6">
            {mockActivity.concat(mockActivity).map((item, index) => {
              const Icon = item.icon
              return (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1 pb-6 border-b border-gray-200 last:border-0">
                    <p className="font-medium text-gray-900">{item.action}</p>
                    <p className="text-sm text-gray-600 mt-1">{item.project}</p>
                    <p className="text-sm text-gray-400 mt-2">{item.time}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
