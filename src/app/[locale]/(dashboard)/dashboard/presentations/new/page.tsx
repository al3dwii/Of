'use client'

import { useState } from 'react'

export default function NewPresentationPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    topic: '',
    slides: 10,
    language: 'en'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)
    
    try {
      // Call backend API
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/presentations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        const result = await response.json()
        alert('Presentation created successfully!')
        window.location.href = `/dashboard/presentations`
      } else {
        console.error('Failed to create presentation')
        alert('Failed to create presentation. Backend may not be available.')
      }
    } catch (error) {
      console.error('Error creating presentation:', error)
      alert('Error: Backend API not available. This would work when connected to the Agentic Kernel backend.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <a href="/dashboard/presentations" className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-200">
          ← Back
        </a>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create New Presentation</h1>
          <p className="text-gray-600 mt-2">
            Generate AI-powered slides from your ideas
          </p>
        </div>
      </div>

      <div className="max-w-2xl">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-medium text-gray-900 mb-4">Presentation Details</h2>
          <p className="text-gray-600 mb-6">Provide details about your presentation and let AI create it for you</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                id="title"
                type="text"
                placeholder="e.g., Q4 Sales Report"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">Topic/Theme</label>
              <input
                id="topic"
                type="text"
                placeholder="e.g., Financial performance and market analysis"
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                id="description"
                placeholder="Describe what you want to include in your presentation..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="slides" className="block text-sm font-medium text-gray-700 mb-2">Number of Slides</label>
                <input
                  id="slides"
                  type="number"
                  min="3"
                  max="50"
                  value={formData.slides}
                  onChange={(e) => setFormData({ ...formData, slides: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                <select
                  id="language"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.language}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="it">Italian</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isGenerating ? (
                <>
                  <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generating Presentation...
                </>
              ) : (
                'Generate Presentation'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
