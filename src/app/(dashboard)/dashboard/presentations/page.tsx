export default function PresentationsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Presentations</h1>
          <p className="text-gray-600 mt-2">
            Create and manage your AI-generated presentations
          </p>
        </div>
        <a href="/dashboard/presentations/new" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
          + New Presentation
        </a>
      </div>
      
      {/* Presentations List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Q4 Sales Report</h3>
          <p className="text-sm text-gray-600 mb-4">Annual sales report with market analysis</p>
          <div className="flex items-center justify-between">
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">completed</span>
            <span className="text-xs text-gray-500">12 slides</span>
          </div>
          <div className="mt-4 flex space-x-2">
            <button className="flex-1 bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-200">View</button>
            <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-200">Download</button>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Product Launch</h3>
          <p className="text-sm text-gray-600 mb-4">Go-to-market strategy presentation</p>
          <div className="flex items-center justify-between">
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">completed</span>
            <span className="text-xs text-gray-500">15 slides</span>
          </div>
          <div className="mt-4 flex space-x-2">
            <button className="flex-1 bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-200">View</button>
            <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-200">Download</button>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Company Overview</h3>
          <p className="text-sm text-gray-600 mb-4">Corporate presentation for investors</p>
          <div className="flex items-center justify-between">
            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">generating</span>
            <span className="text-xs text-gray-500">8 slides</span>
          </div>
          <div className="mt-4">
            <button disabled className="w-full bg-gray-100 text-gray-500 px-3 py-1 rounded text-sm cursor-not-allowed">
              Generating...
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
