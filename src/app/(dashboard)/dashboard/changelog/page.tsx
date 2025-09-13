export default function ChangelogPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">What's New</h1>
        <p className="text-gray-600 mt-2">
          Latest updates and improvements to Agentic AI Platform
        </p>
      </div>

      <div className="max-w-4xl space-y-8">
        {/* Latest Update */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">New</span>
            <h2 className="text-xl font-medium text-gray-900">Version 2.1.0</h2>
            <span className="text-sm text-gray-500">September 13, 2025</span>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">🎉 New Features</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-0.5">•</span>
                  <span><strong>Enhanced Navigation:</strong> Complete redesign of the dashboard navigation with improved user experience</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-0.5">•</span>
                  <span><strong>Real-time API Status:</strong> Live backend connection monitoring and graceful fallbacks</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-0.5">•</span>
                  <span><strong>Analytics Dashboard:</strong> New analytics page with detailed insights and performance metrics</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-0.5">•</span>
                  <span><strong>Advanced Settings:</strong> Comprehensive settings page with API configuration and preferences</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">⚡ Improvements</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start space-x-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Faster presentation generation with improved AI models</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Better error handling and user feedback throughout the application</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Responsive design improvements for mobile devices</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">🐛 Bug Fixes</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start space-x-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span>Fixed issue with presentation download links not working properly</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span>Resolved video upload progress indicator displaying incorrect percentages</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Previous Updates */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <h2 className="text-xl font-medium text-gray-900">Version 2.0.5</h2>
            <span className="text-sm text-gray-500">September 1, 2025</span>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">🎯 Features</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-0.5">•</span>
                  <span>Multi-language support for presentation generation (Spanish, French, German)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-0.5">•</span>
                  <span>Batch video processing for enterprise customers</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">⚡ Improvements</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start space-x-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Improved video dubbing quality with new voice models</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Enhanced security with API key rotation capabilities</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <h2 className="text-xl font-medium text-gray-900">Version 2.0.0</h2>
            <span className="text-sm text-gray-500">August 15, 2025</span>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">🚀 Major Release</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-0.5">•</span>
                  <span>Complete platform redesign with modern UI/UX</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-0.5">•</span>
                  <span>Agentic Kernel backend integration for improved performance</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-0.5">•</span>
                  <span>Real-time collaboration features for team projects</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-0.5">•</span>
                  <span>Advanced analytics and reporting capabilities</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <h2 className="text-xl font-medium text-gray-900">Version 1.8.3</h2>
            <span className="text-sm text-gray-500">July 28, 2025</span>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">🐛 Bug Fixes</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start space-x-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span>Fixed memory leak in video processing pipeline</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span>Resolved authentication token expiration issues</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span>Fixed presentation template loading errors</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Roadmap */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 p-6">
          <h2 className="text-xl font-medium text-gray-900 mb-4">🗺️ Coming Soon</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Advanced AI voice cloning for personalized dubbing</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Interactive presentation builder with drag-and-drop</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Integration with popular video conferencing platforms</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Mobile app for iOS and Android</span>
            </div>
          </div>
        </div>

        {/* Feedback */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">💬 Have Feedback?</h2>
          <p className="text-sm text-gray-600 mb-4">
            We'd love to hear your thoughts on these updates and suggestions for future improvements.
          </p>
          <div className="flex space-x-4">
            <a href="mailto:feedback@agentic.ai" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors">
              Send Feedback
            </a>
            <a href="#" className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-200 transition-colors">
              Join Discord
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
