export default function DubbingPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Video Dubbing</h1>
          <p className="text-gray-600 mt-2">
            Upload videos and generate AI-powered multilingual dubbing
          </p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
          + Upload Video
        </button>
      </div>
      
      {/* Upload Zone */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <div className="mx-auto max-w-sm">
          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Upload a video</h3>
          <p className="mt-1 text-sm text-gray-500">
            Drag and drop your video file here, or click to browse
          </p>
          <div className="mt-6">
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200">
              Select File
            </button>
          </div>
        </div>
      </div>
      
      {/* Dubbing Projects List */}
      <div>
        <h2 className="text-xl font-medium text-gray-900 mb-4">Recent Dubbing Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Product Demo Video</h3>
                <p className="text-sm text-gray-600">2 minutes, 34 seconds</p>
              </div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">completed</span>
              <span className="text-xs text-gray-500">3 languages</span>
            </div>
            <div className="flex space-x-2">
              <button className="flex-1 bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-200">Preview</button>
              <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-200">Download</button>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Training Video</h3>
                <p className="text-sm text-gray-600">5 minutes, 12 seconds</p>
              </div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">completed</span>
              <span className="text-xs text-gray-500">5 languages</span>
            </div>
            <div className="flex space-x-2">
              <button className="flex-1 bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-200">Preview</button>
              <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-200">Download</button>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Marketing Video</h3>
                <p className="text-sm text-gray-600">3 minutes, 45 seconds</p>
              </div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">processing</span>
              <span className="text-xs text-gray-500">2 languages</span>
            </div>
            <div>
              <button disabled className="w-full bg-gray-100 text-gray-500 px-3 py-1 rounded text-sm cursor-not-allowed">
                Processing...
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
