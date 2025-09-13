export interface SSEOptions {
  onEvent?: (data: any) => void
  onError?: (error: Error) => void
  onOpen?: () => void
  onClose?: () => void
  reconnect?: boolean
  maxRetries?: number
}

export class SSEClient {
  private eventSource: EventSource | null = null
  private reconnectTimer: NodeJS.Timeout | null = null
  private retryCount = 0
  private maxRetries: number
  private reconnectDelay = 1000
  private maxReconnectDelay = 30000
  
  constructor(
    private url: string,
    private options: SSEOptions = {}
  ) {
    this.maxRetries = options.maxRetries || 10
  }
  
  connect(): void {
    try {
      this.eventSource = new EventSource(this.url)
      
      this.eventSource.onopen = () => {
        this.retryCount = 0
        this.reconnectDelay = 1000
        this.options.onOpen?.()
      }
      
      this.eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          this.options.onEvent?.(data)
        } catch (error) {
          console.error('Failed to parse SSE message:', error)
        }
      }
      
      this.eventSource.onerror = (error) => {
        this.eventSource?.close()
        
        if (this.options.reconnect !== false && this.retryCount < this.maxRetries) {
          this.scheduleReconnect()
        } else {
          this.options.onError?.(new Error('SSE connection failed'))
        }
      }
    } catch (error) {
      this.options.onError?.(error as Error)
    }
  }
  
  private scheduleReconnect(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer)
    }
    
    this.retryCount++
    const delay = Math.min(
      this.reconnectDelay * Math.pow(2, this.retryCount - 1),
      this.maxReconnectDelay
    )
    
    this.reconnectTimer = setTimeout(() => {
      this.connect()
    }, delay)
  }
  
  disconnect(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer)
      this.reconnectTimer = null
    }
    
    if (this.eventSource) {
      this.eventSource.close()
      this.eventSource = null
    }
    
    this.options.onClose?.()
  }
}

export function createSSEConnection(url: string, options: SSEOptions): SSEClient {
  return new SSEClient(url, options)
}
