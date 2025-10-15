const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'https://presentation-api-production.up.railway.app'

export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

export interface CreatePresentationRequest {
  title: string
  description: string
  topic: string
  slides: number
  language: string
}

export interface Presentation {
  id: string
  title: string
  description: string
  topic: string
  status: 'generating' | 'completed' | 'failed'
  slides: number
  language: string
  createdAt: string
  updatedAt: string
  downloadUrl?: string
}

export interface CreateDubbingRequest {
  title: string
  description: string
  sourceLanguage: string
  targetLanguages: string[]
  videoFile: File
}

export interface DubbingProject {
  id: string
  title: string
  description: string
  status: 'uploading' | 'processing' | 'completed' | 'failed'
  sourceLanguage: string
  targetLanguages: string[]
  progress: number
  createdAt: string
  updatedAt: string
  outputs?: DubbingOutput[]
}

export interface DubbingOutput {
  language: string
  status: 'processing' | 'completed' | 'failed'
  downloadUrl?: string
  subtitlesUrl?: string
}

class ApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE}${endpoint}`
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'API request failed')
      }

      return data
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Presentation APIs
  async createPresentation(data: CreatePresentationRequest): Promise<ApiResponse<Presentation>> {
    return this.request<Presentation>('/presentations', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async getPresentation(id: string): Promise<ApiResponse<Presentation>> {
    return this.request<Presentation>(`/presentations/${id}`)
  }

  async getPresentations(): Promise<ApiResponse<Presentation[]>> {
    return this.request<Presentation[]>('/presentations')
  }

  async deletePresentation(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/presentations/${id}`, {
      method: 'DELETE',
    })
  }

  // Dubbing APIs
  async createDubbingProject(data: CreateDubbingRequest): Promise<ApiResponse<DubbingProject>> {
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('sourceLanguage', data.sourceLanguage)
    formData.append('targetLanguages', JSON.stringify(data.targetLanguages))
    formData.append('video', data.videoFile)

    return this.request<DubbingProject>('/dubbing', {
      method: 'POST',
      headers: {}, // Let browser set Content-Type for FormData
      body: formData,
    })
  }

  async getDubbingProject(id: string): Promise<ApiResponse<DubbingProject>> {
    return this.request<DubbingProject>(`/dubbing/${id}`)
  }

  async getDubbingProjects(): Promise<ApiResponse<DubbingProject[]>> {
    return this.request<DubbingProject[]>('/dubbing')
  }

  async deleteDubbingProject(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/dubbing/${id}`, {
      method: 'DELETE',
    })
  }

  // Health check
  async healthCheck(): Promise<ApiResponse<{ status: string }>> {
    return this.request<{ status: string }>('/healthz')
  }
}

export const apiClient = new ApiClient()
