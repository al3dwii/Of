'use client'

import { useState } from 'react'
import { RefreshCw, ExternalLink, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { featureFlags } from '@/lib/featureFlags'

interface ArtifactViewerProps {
  src: string
  title: string
  description?: string
  allowFullscreen?: boolean
}

export function ArtifactViewer({ 
  src, 
  title, 
  description,
  allowFullscreen = true 
}: ArtifactViewerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [key, setKey] = useState(0)

  if (!featureFlags.artifactViewer) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-muted-foreground">Artifact viewer is disabled</p>
        </CardContent>
      </Card>
    )
  }

  const handleReload = () => {
    setIsLoading(true)
    setHasError(false)
    setKey(prev => prev + 1)
  }

  const handleOpenExternal = () => {
    window.open(src, '_blank', 'noopener,noreferrer')
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            {description && (
              <CardDescription>{description}</CardDescription>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReload}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
            {allowFullscreen && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleOpenExternal}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {hasError ? (
            <div className="flex flex-col items-center justify-center h-96 bg-muted rounded-lg">
              <AlertTriangle className="h-8 w-8 mb-2 text-muted-foreground" />
              <p className="text-muted-foreground mb-4">Failed to load artifact</p>
              <Button onClick={handleReload}>Try Again</Button>
            </div>
          ) : (
            <iframe
              key={key}
              src={src}
              className="w-full h-96 border rounded-lg"
              sandbox="allow-scripts allow-same-origin"
              allow="clipboard-read clipboard-write"
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false)
                setHasError(true)
              }}
            />
          )}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-lg">
              <div className="text-center">
                <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Loading...</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
