import { describe, it, expect } from 'vitest'
import { createPresentationSchema, createDubbingSchema } from '@/lib/zod-schemas'

describe('Zod Schemas', () => {
  describe('createPresentationSchema', () => {
    it('should validate valid presentation data', () => {
      const validData = {
        prompt: 'Create a presentation about AI in healthcare',
        slides_count: 10,
        language: 'en' as const
      }
      
      const result = createPresentationSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should reject prompt that is too short', () => {
      const invalidData = {
        prompt: 'Short',
        slides_count: 10,
        language: 'en' as const
      }
      
      const result = createPresentationSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should reject invalid slide count', () => {
      const invalidData = {
        prompt: 'Create a presentation about AI in healthcare',
        slides_count: 0,
        language: 'en' as const
      }
      
      const result = createPresentationSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should reject invalid language', () => {
      const invalidData = {
        prompt: 'Create a presentation about AI in healthcare',
        slides_count: 10,
        language: 'invalid'
      }
      
      const result = createPresentationSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })

  describe('createDubbingSchema', () => {
    it('should validate valid dubbing data', () => {
      const validData = {
        source_url: 'https://example.com/video.mp4',
        source_lang: 'en' as const,
        target_lang: 'es' as const,
        voice: 'female' as const,
        keep_bg_audio: true,
        burn_subtitles: false
      }
      
      const result = createDubbingSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should reject invalid URL', () => {
      const invalidData = {
        source_url: 'not-a-url',
        source_lang: 'en' as const,
        target_lang: 'es' as const,
        voice: 'female' as const
      }
      
      const result = createDubbingSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should apply default values', () => {
      const dataWithoutDefaults = {
        source_url: 'https://example.com/video.mp4',
        source_lang: 'en' as const,
        target_lang: 'es' as const,
        voice: 'female' as const
      }
      
      const result = createDubbingSchema.parse(dataWithoutDefaults)
      expect(result.keep_bg_audio).toBe(true)
      expect(result.burn_subtitles).toBe(false)
    })
  })
})
