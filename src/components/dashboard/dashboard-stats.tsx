import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3, FileText, Video, TrendingUp } from 'lucide-react'

const stats = [
  {
    title: 'Total Projects',
    value: '24',
    description: '+2 from last month',
    icon: FileText,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    title: 'Presentations Created',
    value: '18',
    description: '+5 from last month', 
    icon: BarChart3,
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    title: 'Videos Dubbed',
    value: '6',
    description: '+1 from last month',
    icon: Video,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    title: 'Success Rate',
    value: '98%',
    description: '+2% from last month',
    icon: TrendingUp,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  }
]

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <p className="text-xs text-gray-600 mt-1">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
