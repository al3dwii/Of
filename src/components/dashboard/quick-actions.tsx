'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Presentation, Video, Plus, ArrowRight } from 'lucide-react'

const quickActions = [
  {
    title: 'Create Presentation',
    description: 'Generate AI-powered slides from your ideas',
    icon: Presentation,
    href: '/dashboard/presentations/new',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    title: 'Dub Video',
    description: 'Translate and dub your videos with AI voices',
    icon: Video,
    href: '/dashboard/dubbing/new',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  }
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Quick Actions
        </CardTitle>
        <CardDescription>
          Start creating your next AI-powered content
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {quickActions.map((action) => (
          <Link key={action.title} href={action.href}>
            <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg ${action.bgColor}`}>
                  <action.icon className={`w-6 h-6 ${action.color}`} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{action.title}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
