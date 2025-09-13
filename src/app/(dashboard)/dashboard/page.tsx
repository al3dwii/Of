'use client'

import { useEffect, useState } from 'react'
import { apiClient } from '../../../lib/api/client'

export default function DashboardPage() {
  const [stats, setStats] = useState({
    presentations: 0,
    dubbing: 0,
    apiConnected: false
  })

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
        
        // Try to load dubbing projects
        const dubbing = await apiClient.getDubbingProjects()
        if (dubbing.success) {
          setStats(prev => ({ ...prev, dubbing: dubbing.data.length }))
        }
      } catch (error) {
        console.log('Backend not available, using mock data')
        // Use mock data when backend is not available
        setStats({
          presentations: 18,
          dubbing: 6,
          apiConnected: false
        })
      }
    }

    loadDashboardData()
  }, [])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back! Here's what's happening with your AI content creation.
        </p>
      </div>

      {/* API Status */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${stats.apiConnected ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
          <span className="text-sm text-gray-600">
            Backend API: {stats.apiConnected ? 'Connected' : 'Using mock data'}
          </span>
        </div>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Total Projects</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">{stats.presentations + stats.dubbing}</p>
          <p className="text-sm text-gray-600 mt-1">+2 from last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Presentations</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">{stats.presentations}</p>
          <p className="text-sm text-gray-600 mt-1">+5 from last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Videos Dubbed</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">{stats.dubbing}</p>
          <p className="text-sm text-gray-600 mt-1">+1 from last month</p>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <a href="/dashboard/presentations/new" className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
              <div>
                <h3 className="font-medium text-gray-900">Create Presentation</h3>
                <p className="text-sm text-gray-600">Generate AI-powered slides</p>
              </div>
              <span className="text-blue-600">→</span>
            </a>
            <a href="/dashboard/dubbing" className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors">
              <div>
                <h3 className="font-medium text-gray-900">Dub Video</h3>
                <p className="text-sm text-gray-600">Translate with AI voices</p>
              </div>
              <span className="text-purple-600">→</span>
            </a>
          </div>
        </div>
        
        {/* Recent Projects */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Projects</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-sm">📊</span>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900">Q4 Sales Report</h4>
                <p className="text-xs text-gray-600">2 hours ago</p>
              </div>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">completed</span>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 text-sm">🎥</span>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900">Product Demo</h4>
                <p className="text-xs text-gray-600">1 day ago</p>
              </div>
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">processing</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
