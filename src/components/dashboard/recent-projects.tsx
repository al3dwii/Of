import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, FileText, Video } from 'lucide-react'

const recentProjects = [
  {
    id: '1',
    title: 'Q4 Sales Presentation',
    type: 'presentation',
    status: 'completed',
    createdAt: '2 hours ago',
    description: 'Annual sales report with market analysis'
  },
  {
    id: '2', 
    title: 'Product Demo Video',
    type: 'video',
    status: 'processing',
    createdAt: '1 day ago',
    description: 'Multi-language product demonstration'
  },
  {
    id: '3',
    title: 'Company Overview',
    type: 'presentation', 
    status: 'completed',
    createdAt: '3 days ago',
    description: 'Corporate presentation for investors'
  },
  {
    id: '4',
    title: 'Training Materials',
    type: 'video',
    status: 'completed', 
    createdAt: '1 week ago',
    description: 'Employee onboarding video series'
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800'
    case 'processing':
      return 'bg-yellow-100 text-yellow-800'
    case 'failed':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getTypeIcon = (type: string) => {
  return type === 'video' ? Video : FileText
}

export function RecentProjects() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          Recent Projects
        </CardTitle>
        <CardDescription>
          Your latest AI content creation projects
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentProjects.map((project) => {
            const Icon = getTypeIcon(project.type)
            return (
              <div key={project.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Icon className="w-4 h-4 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {project.title}
                    </h4>
                    <Badge className={`text-xs ${getStatusColor(project.status)}`}>
                      {project.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                  <p className="text-xs text-gray-500 mt-2">{project.createdAt}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
