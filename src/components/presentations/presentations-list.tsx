'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FileText, Download, Eye, MoreHorizontal, Calendar } from 'lucide-react'
import Link from 'next/link'

interface Presentation {
  id: string
  title: string
  description: string
  status: 'generating' | 'completed' | 'failed'
  createdAt: string
  slideCount: number
  language: string
}

// Mock data - in real app this would come from API
const mockPresentations: Presentation[] = [
  {
    id: '1',
    title: 'Q4 Sales Report',
    description: 'Annual sales report with market analysis',
    status: 'completed',
    createdAt: '2024-03-15T10:30:00Z',
    slideCount: 12,
    language: 'en'
  },
  {
    id: '2',
    title: 'Product Launch Strategy',
    description: 'Go-to-market strategy for new product line',
    status: 'completed',
    createdAt: '2024-03-14T14:20:00Z',
    slideCount: 15,
    language: 'en'
  },
  {
    id: '3',
    title: 'Company Overview',
    description: 'Corporate presentation for investors',
    status: 'generating',
    createdAt: '2024-03-13T09:15:00Z',
    slideCount: 8,
    language: 'en'
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800'
    case 'generating':
      return 'bg-yellow-100 text-yellow-800'
    case 'failed':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export function PresentationsList() {
  const [presentations, setPresentations] = useState<Presentation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPresentations(mockPresentations)
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {presentations.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No presentations yet</h3>
            <p className="text-gray-600 text-center mb-4">
              Create your first AI-powered presentation to get started
            </p>
            <Link href="/dashboard/presentations/new">
              <Button>Create Presentation</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {presentations.map((presentation) => (
            <Card key={presentation.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-2">
                      {presentation.title}
                    </CardTitle>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge className={`text-xs ${getStatusColor(presentation.status)}`}>
                        {presentation.status}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {presentation.slideCount} slides
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
                  {presentation.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {formatDate(presentation.createdAt)}
                  </div>
                  <span className="uppercase">{presentation.language}</span>
                </div>

                <div className="flex space-x-2">
                  {presentation.status === 'completed' ? (
                    <>
                      <Link href={`/dashboard/presentations/${presentation.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm">
                        <Download className="w-3 h-3" />
                      </Button>
                    </>
                  ) : presentation.status === 'generating' ? (
                    <Button variant="outline" size="sm" disabled className="w-full">
                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-600 mr-2"></div>
                      Generating...
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" className="w-full text-red-600">
                      Failed - Retry
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
