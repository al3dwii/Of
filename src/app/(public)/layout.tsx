import { Sidebar } from '@/components/nav/sidebar'
import { Topbar } from '@/components/nav/topbar'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  )
}
