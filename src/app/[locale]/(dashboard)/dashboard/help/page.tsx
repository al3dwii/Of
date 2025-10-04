export default function HelpPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Help & Support</h1>
        <p className="text-gray-600 mt-2">
          Get help with Agentic AI Content Platform
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Help */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Search Help Articles</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for help..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <span className="text-gray-400">🔍</span>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <details className="group">
                <summary className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  <h3 className="font-medium text-gray-900">How do I create a new presentation?</h3>
                  <span className="text-gray-500 group-open:rotate-180 transition-transform">↓</span>
                </summary>
                <div className="mt-4 p-4 text-sm text-gray-600 bg-gray-50 rounded-lg">
                  <p>To create a new presentation, click the "New Presentation" button in the dashboard or navigate to Presentations → New. Fill in the required details like title, topic, and desired number of slides, then click "Generate Presentation".</p>
                </div>
              </details>

              <details className="group">
                <summary className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  <h3 className="font-medium text-gray-900">What video formats are supported for dubbing?</h3>
                  <span className="text-gray-500 group-open:rotate-180 transition-transform">↓</span>
                </summary>
                <div className="mt-4 p-4 text-sm text-gray-600 bg-gray-50 rounded-lg">
                  <p>We support MP4, AVI, and MOV video formats up to 500MB in size. The video should have clear audio for best dubbing results.</p>
                </div>
              </details>

              <details className="group">
                <summary className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  <h3 className="font-medium text-gray-900">How long does it take to generate a presentation?</h3>
                  <span className="text-gray-500 group-open:rotate-180 transition-transform">↓</span>
                </summary>
                <div className="mt-4 p-4 text-sm text-gray-600 bg-gray-50 rounded-lg">
                  <p>Presentation generation typically takes 1-3 minutes depending on the number of slides and complexity. You'll receive a notification when it's ready.</p>
                </div>
              </details>

              <details className="group">
                <summary className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  <h3 className="font-medium text-gray-900">Can I edit generated presentations?</h3>
                  <span className="text-gray-500 group-open:rotate-180 transition-transform">↓</span>
                </summary>
                <div className="mt-4 p-4 text-sm text-gray-600 bg-gray-50 rounded-lg">
                  <p>Yes! Once generated, you can download the presentation and edit it in PowerPoint, Google Slides, or any compatible presentation software.</p>
                </div>
              </details>
            </div>
          </div>

          {/* Guides */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Getting Started Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a href="#" className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-2xl">📊</span>
                  <h3 className="font-medium text-gray-900">Creating Presentations</h3>
                </div>
                <p className="text-sm text-gray-600">Learn how to create compelling AI-generated presentations</p>
              </a>
              
              <a href="#" className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-2xl">🎥</span>
                  <h3 className="font-medium text-gray-900">Video Dubbing</h3>
                </div>
                <p className="text-sm text-gray-600">Upload and dub videos in multiple languages</p>
              </a>
              
              <a href="#" className="p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-2xl">🔧</span>
                  <h3 className="font-medium text-gray-900">API Integration</h3>
                </div>
                <p className="text-sm text-gray-600">Integrate Agentic with your existing workflow</p>
              </a>
              
              <a href="#" className="p-4 border border-gray-200 rounded-lg hover:border-yellow-300 hover:bg-yellow-50 transition-colors">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-2xl">⚡</span>
                  <h3 className="font-medium text-gray-900">Best Practices</h3>
                </div>
                <p className="text-sm text-gray-600">Tips for getting the best results from AI</p>
              </a>
            </div>
          </div>
        </div>

        {/* Support Sidebar */}
        <div className="space-y-6">
          {/* Contact Support */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Contact Support</h2>
            <div className="space-y-4">
              <a href="mailto:support@agentic.ai" className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <span className="text-blue-600">📧</span>
                <div>
                  <p className="text-sm font-medium text-blue-900">Email Support</p>
                  <p className="text-xs text-blue-700">support@agentic.ai</p>
                </div>
              </a>
              
              <a href="#" className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                <span className="text-green-600">💬</span>
                <div>
                  <p className="text-sm font-medium text-green-900">Live Chat</p>
                  <p className="text-xs text-green-700">Available 9 AM - 6 PM EST</p>
                </div>
              </a>
              
              <a href="#" className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                <span className="text-purple-600">📱</span>
                <div>
                  <p className="text-sm font-medium text-purple-900">Discord Community</p>
                  <p className="text-xs text-purple-700">Join our community</p>
                </div>
              </a>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">System Status</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">API Services</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-green-600">Operational</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">AI Generation</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-green-600">Operational</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">File Storage</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-xs text-yellow-600">Maintenance</span>
                </div>
              </div>
            </div>
            
            <a href="#" className="text-xs text-blue-600 hover:text-blue-700 mt-3 block">
              View full status page →
            </a>
          </div>

          {/* Resources */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Resources</h2>
            <div className="space-y-2">
              <a href="/dashboard/api-docs" className="block text-sm text-blue-600 hover:text-blue-700">
                📚 API Documentation
              </a>
              <a href="#" className="block text-sm text-blue-600 hover:text-blue-700">
                🎓 Video Tutorials
              </a>
              <a href="/dashboard/changelog" className="block text-sm text-blue-600 hover:text-blue-700">
                📝 Changelog
              </a>
              <a href="#" className="block text-sm text-blue-600 hover:text-blue-700">
                🎯 Feature Requests
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
