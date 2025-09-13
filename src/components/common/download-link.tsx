'use client'

import { Download, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface DownloadLinkProps {
  href: string
  filename: string
  children?: React.ReactNode
  external?: boolean
  onDownload?: () => void
}

export function DownloadLink({ 
  href, 
  filename, 
  children, 
  external = false,
  onDownload 
}: DownloadLinkProps) {
  const handleClick = () => {
    onDownload?.()
    
    if (external) {
      window.open(href, '_blank', 'noopener,noreferrer')
    } else {
      // Create temporary download link
      const link = document.createElement('a')
      link.href = href
      link.download = filename
      link.rel = 'noopener'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleClick}
      className="gap-2"
    >
      {external ? (
        <ExternalLink className="h-4 w-4" />
      ) : (
        <Download className="h-4 w-4" />
      )}
      {children || filename}
    </Button>
  )
}
