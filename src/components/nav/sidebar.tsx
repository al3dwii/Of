'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Presentation, 
  Video, 
  Home, 
  Settings, 
  Menu,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { featureFlags } from '@/lib/featureFlags'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { 
    name: 'Presentations', 
    href: '/presentations', 
    icon: Presentation,
    enabled: featureFlags.presentations 
  },
  { 
    name: 'Dubbing', 
    href: '/dubbing', 
    icon: Video,
    enabled: featureFlags.dubbing 
  },
  { name: 'Settings', href: '/settings', icon: Settings },
].filter(item => item.enabled !== false)

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div className={cn(
      "flex flex-col bg-card border-r transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center justify-between p-4">
        {!isCollapsed && (
          <h1 className="text-xl font-bold">Agentic</h1>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </Button>
      </div>

      <nav className="flex-1 space-y-1 p-2">
        {navigation.map((item) => {
          const isActive = pathname.startsWith(item.href)
          const Icon = item.icon
          
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  isCollapsed && "justify-center px-2"
                )}
              >
                <Icon className={cn(
                  "h-4 w-4",
                  !isCollapsed && "mr-2"
                )} />
                {!isCollapsed && item.name}
              </Button>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
