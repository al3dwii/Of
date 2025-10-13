'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Plus, Eye, Download, Share2, MoreVertical, Clock, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function PresentationsPage() {
  const params = useParams()
  const locale = params.locale as string

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Presentations</h1>
          <p className="text-gray-600 mt-2">
            Create and manage your AI-generated presentations
          </p>
        </div>
        <Link href={`/${locale}/slides`}>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all">
            <Plus className="w-4 h-4 mr-2" />
            New Presentation
          </Button>
        </Link>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Total</span>
            <Sparkles className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-2">18</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">This Month</span>
            <Clock className="w-4 h-4 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-2">6</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Total Views</span>
            <Eye className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-2">1,234</p>
        </div>
      </div>
      
      {/* Presentations List */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">All Presentations</h2>
            <div className="flex items-center gap-2">
              <select className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>All Status</option>
                <option>Completed</option>
                <option>Processing</option>
                <option>Draft</option>
              </select>
              <select className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Most Recent</option>
                <option>Most Viewed</option>
                <option>Alphabetical</option>
              </select>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {/* Presentation 1 */}
          <div className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">Q4 Sales Report</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Completed
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Annual sales report with market analysis</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    45 views
                  </span>
                  <span>• 12 slides</span>
                  <span>• Created 2 hours ago</span>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Presentation 2 */}
          <div className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">Product Launch Strategy</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Completed
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Go-to-market strategy presentation</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    32 views
                  </span>
                  <span>• 15 slides</span>
                  <span>• Created 1 day ago</span>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Presentation 3 - Processing */}
          <div className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">Company Overview</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Processing
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Corporate presentation for investors</p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span>• 8 slides</span>
                  <span>• Created 5 hours ago</span>
                </div>
                <div className="w-full max-w-xs">
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                    <span>Generating slides...</span>
                    <span>67%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-blue-600 h-1.5 rounded-full transition-all" style={{ width: '67%' }}></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Button variant="outline" size="sm" disabled>
                  <Clock className="w-4 h-4 mr-2 animate-spin" />
                  Processing
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">Showing 1-3 of 18 presentations</p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">Previous</Button>
              <Button variant="outline" size="sm" className="bg-blue-600 text-white hover:bg-blue-700">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
