import { z } from 'zod'

// Presentation schemas
export const createPresentationSchema = z.object({
  prompt: z.string().min(10).max(2000),
  slides_count: z.number().min(1).max(30),
  language: z.enum(['en', 'ar', 'es'])
})

export const editPresentationSchema = z.object({
  instruction: z.string().min(5).max(1000)
})

// Dubbing schemas
export const createDubbingSchema = z.object({
  source_url: z.string().url(),
  source_lang: z.enum(['en', 'ar', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ko']),
  target_lang: z.enum(['en', 'ar', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ko']),
  voice: z.enum(['male', 'female', 'neutral']),
  keep_bg_audio: z.boolean().default(true),
  burn_subtitles: z.boolean().default(false)
})

// API Key schema
export const createApiKeySchema = z.object({
  name: z.string().min(1).max(100)
})

// User preferences schema
export const userPreferencesSchema = z.object({
  theme: z.enum(['light', 'dark']).default('light'),
  language: z.enum(['en', 'ar', 'es']).default('en'),
  notifications: z.boolean().default(true)
})

export type CreatePresentationInput = z.infer<typeof createPresentationSchema>
export type EditPresentationInput = z.infer<typeof editPresentationSchema>
export type CreateDubbingInput = z.infer<typeof createDubbingSchema>
export type CreateApiKeyInput = z.infer<typeof createApiKeySchema>
export type UserPreferences = z.infer<typeof userPreferencesSchema>
