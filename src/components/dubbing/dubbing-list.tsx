'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Video, Download, Eye, MoreHorizontal, Calendar, Globe } from 'lucide-react'
import Link from 'next/link'

interface DubbingProject {
  id: string
  title: string
  description: string
  status: 'uploading' | 'processing' | 'completed' | 'failed'
  sourceLanguage: string
  targetLanguages: string[]
  progress: number
  createdAt: string
  outputs?: Array<{
    language: string
    status: 'processing' | 'completed' | 'failed'
    downloadUrl?: string
  }>
}

// Mock data
const mockProjects: DubbingProject[] = [
  {
    id: '1',
    title: 'Product Demo Video',
    description: 'Multilingual product demonstration',
    status: 'completed',
    sourceLanguage: 'en',
    targetLanguages: ['es', 'fr', 'de'],
    progress: 100,
    createdAt: '2024-03-15T10:30:00Z',
    outputs: [
      { language: 'es', status: 'completed', downloadUrl: '/download/1/es' },
      { language: 'fr', status: 'completed', downloadUrl: '/download/1/fr' },
      { language: 'de', status: 'completed', downloadUrl: '/download/1/de' }
    ]
  },
  {
    id: '2',
    title: 'Training Materials',
    description: 'Employee onboarding video series',
    status: 'processing',
    sourceLanguage: 'en',
    targetLanguages: ['es', 'pt'],
    progress: 65,
    createdAt: '2024-03-14T14:20:00Z',
    outputs: [
      { language: 'es', status: 'completed', downloadUrl: '/download/2/es' },
      { language: 'pt', status: 'processing' }
    ]
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800'
    case 'processing':
      return 'bg-blue-100 text-blue-800'
    case 'uploading':
      return 'bg-yellow-100 text-yellow-800'
    case 'failed':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getLanguageName = (code: string) => {
  const languages: { [key: string]: string } = {
    'en': 'English',
    'es': 'Spanish',
    'fr': 'French',
    'de': 'German',
    'pt': 'Portuguese',
    'it': 'Italian'
  }
  return languages[code] || code.toUpperCase()
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export function DubbingList() {
  const [projects, setProjects] = useState<DubbingProject[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProjects(mockProjects)
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-2 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {projects.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Video className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No dubbing projects yet</h3>
            <p className="text-gray-600 text-center mb-4">
              Upload your first video to start creating multilingual content
            </p>
            <Link href="/dashboard/dubbing/new">
              <Button>Create Dubbing Project</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-2">
                      {project.title}
                    </CardTitle>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge className={`text-xs ${getStatusColor(project.status)}`}>
                        {project.status}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {getLanguageName(project.sourceLanguage)} → {project.targetLanguages.length} languages
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                  {project.description}
                </p>

                {project.status === 'processing' && (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                )}

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(project.createdAt)}
                    </div>
                    <div className="flex items-center">
                      <Globe className="w-3 h-3 mr-1" />
                      {project.targetLanguages.length} outputs
                    </div>
                  </div>

                  {project.outputs && project.outputs.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-medium text-gray-700">Outputs:</h4>
                      {project.outputs.map((output) => (
                        <div key={output.language} className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">
                            {getLanguageName(output.language)}
                          </span>
                          <div className="flex items-center space-x-2">
                            <Badge className={`text-xs ${getStatusColor(output.status)}`}>
                              {output.status}
                            </Badge>
                            {output.downloadUrl && (
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <Download className="w-3 h-3" />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex space-x-2">
                  <Link href={`/dashboard/dubbing/${project.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      <Eye className="w-3 h-3 mr-1" />
                      View Details
                    </Button>
                  </Link>
                  {project.status === 'completed' && (
                    <Button variant="outline" size="sm">
                      <Download className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
