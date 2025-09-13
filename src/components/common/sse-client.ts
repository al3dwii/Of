'use client'

import { useEffect, useState } from 'react'
import { createSSEConnection } from '@/lib/sse'
import { Logger } from '@/lib/logger'

interface SSEClientProps {
  url: string
  onEvent?: (data: any) => void
  onError?: (error: Error) => void
  onConnected?: () => void
  onDisconnected?: () => void
  enabled?: boolean
}

export function SSEClient({ 
  url, 
  onEvent, 
  onError,
  onConnected,
  onDisconnected,
  enabled = true 
}: SSEClientProps) {
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    if (!enabled) return

    Logger.info(`Connecting to SSE: ${url}`)

    const connection = createSSEConnection(url, {
      onEvent: (data) => {
        Logger.debug('SSE Event received:', data)
        onEvent?.(data)
      },
      onError: (error) => {
        Logger.error('SSE Error:', error)
        setIsConnected(false)
        onError?.(error)
      },
      onOpen: () => {
        Logger.info('SSE Connected')
        setIsConnected(true)
        onConnected?.()
      },
      onClose: () => {
        Logger.info('SSE Disconnected')
        setIsConnected(false)
        onDisconnected?.()
      }
    })

    connection.connect()

    return () => {
      connection.disconnect()
    }
  }, [url, enabled, onEvent, onError, onConnected, onDisconnected])

  return null
}
