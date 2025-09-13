'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { createPresentationSchema, type CreatePresentationInput } from '@/lib/zod-schemas'

interface PromptFormProps {
  onSubmit: (data: CreatePresentationInput) => Promise<void>
  isLoading?: boolean
}

export function PromptForm({ onSubmit, isLoading = false }: PromptFormProps) {
  const [tokenCount, setTokenCount] = useState(0)
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<CreatePresentationInput>({
    resolver: zodResolver(createPresentationSchema),
    defaultValues: {
      slides_count: 10,
      language: 'en'
    }
  })

  const prompt = watch('prompt')
  
  // Simple token estimation (rough)
  const estimateTokens = (text: string) => {
    return Math.ceil(text.length / 4)
  }

  const handlePromptChange = (value: string) => {
    setTokenCount(estimateTokens(value))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Presentation</CardTitle>
        <CardDescription>
          Describe what you want to present and we'll generate a professional slide deck.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="prompt">Presentation Topic</Label>
            <Textarea
              id="prompt"
              placeholder="e.g., Create a presentation about the future of artificial intelligence in healthcare, covering current applications, challenges, and future opportunities..."
              className="min-h-[120px]"
              {...register('prompt', {
                onChange: (e) => handlePromptChange(e.target.value)
              })}
            />
            {tokenCount > 0 && (
              <p className="text-sm text-muted-foreground">
                ~{tokenCount} tokens
              </p>
            )}
            {errors.prompt && (
              <p className="text-sm text-destructive">{errors.prompt.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="slides_count">Number of Slides</Label>
              <Input
                id="slides_count"
                type="number"
                min="1"
                max="30"
                {...register('slides_count', { valueAsNumber: true })}
              />
              {errors.slides_count && (
                <p className="text-sm text-destructive">{errors.slides_count.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <select
                id="language"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                {...register('language')}
              >
                <option value="en">English</option>
                <option value="ar">Arabic</option>
                <option value="es">Spanish</option>
              </select>
              {errors.language && (
                <p className="text-sm text-destructive">{errors.language.message}</p>
              )}
            </div>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? 'Creating Presentation...' : 'Create Presentation'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
