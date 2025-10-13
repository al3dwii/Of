export default function ApiDocsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">API Documentation</h1>
        <p className="text-gray-600 mt-2">
          Complete reference for the Sharayeh API
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* API Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-4 sticky top-4">
            <h2 className="font-medium text-gray-900 mb-4">API Reference</h2>
            <nav className="space-y-2">
              <a href="#authentication" className="block text-sm text-blue-600 hover:text-blue-700">Authentication</a>
              <a href="#presentations" className="block text-sm text-gray-600 hover:text-gray-900">Presentations</a>
              <a href="#conversion" className="block text-sm text-gray-600 hover:text-gray-900">Document Conversion</a>
              <a href="#webhooks" className="block text-sm text-gray-600 hover:text-gray-900">Webhooks</a>
              <a href="#errors" className="block text-sm text-gray-600 hover:text-gray-900">Error Codes</a>
            </nav>
          </div>
        </div>

        {/* API Documentation Content */}
        <div className="lg:col-span-3 space-y-8">
          {/* Getting Started */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-medium text-gray-900 mb-4">Getting Started</h2>
            <p className="text-gray-600 mb-4">
              The Sharayeh API provides programmatic access to AI-powered presentation generation and document conversion features.
            </p>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Base URL</h3>
              <code className="text-sm text-gray-800">https://api.sharayeh.com/v1</code>
            </div>
          </div>

          {/* Authentication */}
          <div id="authentication" className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-medium text-gray-900 mb-4">Authentication</h2>
            <p className="text-gray-600 mb-4">
              All API requests require authentication using an API key in the Authorization header.
            </p>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Example Request</h3>
              <pre className="text-sm text-gray-800 overflow-x-auto">
{`curl -H "Authorization: Bearer YOUR_API_KEY" \\
     -H "Content-Type: application/json" \\
     https://api.sharayeh.com/v1/presentations`}
              </pre>
            </div>
          </div>

          {/* Presentations API */}
          <div id="presentations" className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-medium text-gray-900 mb-4">Presentations API</h2>
            
            <div className="space-y-6">
              {/* Create Presentation */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded font-medium">POST</span>
                  <code className="text-sm">/presentations</code>
                </div>
                <p className="text-sm text-gray-600 mb-3">Create a new AI-generated presentation</p>
                
                <h4 className="text-sm font-medium text-gray-900 mb-2">Request Body</h4>
                <div className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
                  <pre>{`{
  "title": "Q4 Sales Report",
  "description": "Quarterly sales analysis and projections",
  "topic": "Sales performance and market trends",
  "slides": 10,
  "language": "en"
}`}</pre>
                </div>
                
                <h4 className="text-sm font-medium text-gray-900 mb-2 mt-4">Response</h4>
                <div className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
                  <pre>{`{
  "id": "pres_abc123",
  "status": "generating",
  "title": "Q4 Sales Report",
  "estimated_completion": "2025-09-13T15:30:00Z"
}`}</pre>
                </div>
              </div>

              {/* Get Presentation */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-medium">GET</span>
                  <code className="text-sm">/presentations/{`{id}`}</code>
                </div>
                <p className="text-sm text-gray-600 mb-3">Retrieve a specific presentation</p>
                
                <h4 className="text-sm font-medium text-gray-900 mb-2">Response</h4>
                <div className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
                  <pre>{`{
  "id": "pres_abc123",
  "status": "completed",
  "title": "Q4 Sales Report",
  "slides": 10,
  "download_url": "https://api.sharayeh.com/files/pres_abc123.pptx",
  "created_at": "2025-09-13T15:00:00Z",
  "completed_at": "2025-09-13T15:03:00Z"
}`}</pre>
                </div>
              </div>
            </div>
          </div>

          {/* Document Conversion API */}
          <div id="conversion" className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-medium text-gray-900 mb-4">Document Conversion API</h2>
            
            <div className="space-y-6">
              {/* Convert Document */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded font-medium">POST</span>
                  <code className="text-sm">/convert</code>
                </div>
                <p className="text-sm text-gray-600 mb-3">Convert documents to PowerPoint presentations</p>
                
                <h4 className="text-sm font-medium text-gray-900 mb-2">Request (multipart/form-data)</h4>
                <div className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
                  <pre>{`title: "Product Catalog"
description: "Catalog presentation from PDF"
format: "pptx"
theme: "modern"
document: [binary file data - PDF, Word, or Excel]`}</pre>
                </div>
                
                <h4 className="text-sm font-medium text-gray-900 mb-2 mt-4">Response</h4>
                <div className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
                  <pre>{`{
  "id": "conv_xyz789",
  "status": "processing",
  "title": "Product Catalog",
  "format": "pptx",
  "source_type": "pdf",
  "estimated_completion": "2025-09-13T16:00:00Z"
}`}</pre>
                </div>
              </div>
            </div>
          </div>

          {/* Error Codes */}
          <div id="errors" className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-medium text-gray-900 mb-4">Error Codes</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 bg-red-50 rounded-lg">
                  <h3 className="text-sm font-medium text-red-900">400 Bad Request</h3>
                  <p className="text-xs text-red-700 mt-1">Invalid request parameters</p>
                </div>
                <div className="p-3 bg-red-50 rounded-lg">
                  <h3 className="text-sm font-medium text-red-900">401 Unauthorized</h3>
                  <p className="text-xs text-red-700 mt-1">Invalid or missing API key</p>
                </div>
                <div className="p-3 bg-red-50 rounded-lg">
                  <h3 className="text-sm font-medium text-red-900">403 Forbidden</h3>
                  <p className="text-xs text-red-700 mt-1">Insufficient permissions</p>
                </div>
                <div className="p-3 bg-red-50 rounded-lg">
                  <h3 className="text-sm font-medium text-red-900">404 Not Found</h3>
                  <p className="text-xs text-red-700 mt-1">Resource not found</p>
                </div>
                <div className="p-3 bg-red-50 rounded-lg">
                  <h3 className="text-sm font-medium text-red-900">429 Rate Limited</h3>
                  <p className="text-xs text-red-700 mt-1">Too many requests</p>
                </div>
                <div className="p-3 bg-red-50 rounded-lg">
                  <h3 className="text-sm font-medium text-red-900">500 Server Error</h3>
                  <p className="text-xs text-red-700 mt-1">Internal server error</p>
                </div>
              </div>
            </div>
          </div>

          {/* SDKs */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-medium text-gray-900 mb-4">SDKs & Libraries</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a href="#" className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🐍</span>
                  <div>
                    <h3 className="font-medium text-gray-900">Python SDK</h3>
                    <p className="text-sm text-gray-600">pip install sharayeh-python</p>
                  </div>
                </div>
              </a>
              
              <a href="#" className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📦</span>
                  <div>
                    <h3 className="font-medium text-gray-900">Node.js SDK</h3>
                    <p className="text-sm text-gray-600">npm install sharayeh-node</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
