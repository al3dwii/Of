import { auth } from '@clerk/nextjs/server'
import { Logger } from './logger'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'https://presentation-api-production.up.railway.app'

export interface BackendError {
  message: string
  code?: string
  details?: any
}

class BackendClient {
  private baseUrl: string
  
  constructor(baseUrl: string = API_BASE) {
    this.baseUrl = baseUrl
  }
  
  private async getHeaders(): Promise<HeadersInit> {
    const { getToken } = auth()
    const token = await getToken()
    
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    }
  }
  
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    const headers = await this.getHeaders()
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...headers,
          ...options.headers
        }
      })
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      Logger.error(`Backend request failed: ${endpoint}`, error)
      throw error
    }
  }
  
  // Health check
  async healthCheck(): Promise<{ status: string }> {
    return this.request('/healthz')
  }
  
  // Presentations
  async createPresentation(data: {
    prompt: string
    slides_count: number
    language: string
  }): Promise<{ plan_id: string }> {
    return this.request('/v1/presentations', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }
  
  async getPresentation(planId: string): Promise<any> {
    return this.request(`/v1/presentations/${planId}`)
  }
  
  async editPresentation(planId: string, data: {
    instruction: string
  }): Promise<{ edit_id: string }> {
    return this.request(`/v1/presentations/${planId}/edits`, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }
  
  async getPresentationTrace(planId: string): Promise<any[]> {
    return this.request(`/v1/presentations/${planId}/trace`)
  }
  
  async getCitations(planId: string, slide?: number): Promise<any[]> {
    const params = slide ? `?slide=${slide}` : ''
    return this.request(`/v1/presentations/${planId}/citations${params}`)
  }
  
  // Dubbing
  async startDubbing(data: {
    source_url: string
    source_lang: string
    target_lang: string
    voice: string
    keep_bg_audio?: boolean
    burn_subtitles?: boolean
  }): Promise<{ job_id: string }> {
    return this.request('/v1/dubbing', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }
  
  async getDubbing(jobId: string): Promise<any> {
    return this.request(`/v1/dubbing/${jobId}`)
  }
  
  async getDubbingTrace(jobId: string): Promise<any[]> {
    return this.request(`/v1/dubbing/${jobId}/trace`)
  }
}

export const backend = new BackendClient()

// Helper functions
export function getArtifactUrl(path: string): string {
  const artifactsBase = process.env.NEXT_PUBLIC_ARTIFACTS_BASE || `${API_BASE}/artifacts`
  return `${artifactsBase}${path}`
}

export function getDeckUrl(planId: string): string {
  return getArtifactUrl(`/decks/${planId}/index.html`)
}

export function getExportUrl(planId: string, format: 'pptx' | 'pdf' | 'zip'): string {
  return getArtifactUrl(`/exports/${planId}/deck.${format}`)
}

export function getDubbingOutputUrl(jobId: string, filename: string): string {
  return getArtifactUrl(`/jobs/${jobId}/out/${filename}`)
}
