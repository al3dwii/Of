'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { backend } from '@/lib/backend'
import { createPresentationSchema, editPresentationSchema } from '@/lib/zod-schemas'
import { Logger } from '@/lib/logger'

export async function createPresentationAction(formData: FormData) {
  const { userId, orgId } = auth()
  
  if (!userId || !orgId) {
    throw new Error('Unauthorized')
  }

  const data = {
    prompt: formData.get('prompt') as string,
    slides_count: parseInt(formData.get('slides_count') as string),
    language: formData.get('language') as string
  }

  const validatedData = createPresentationSchema.parse(data)

  try {
    // Call backend API
    const result = await backend.createPresentation(validatedData)
    
    // Create mirror in frontend database
    await prisma.presentationMirror.create({
      data: {
        planId: result.plan_id,
        orgId,
        title: `Presentation (${validatedData.language})`,
        language: validatedData.language,
        slidesCount: validatedData.slides_count,
        status: 'queued'
      }
    })

    // Log the action
    await prisma.auditLog.create({
      data: {
        orgId,
        userId,
        action: 'create_presentation',
        meta: {
          planId: result.plan_id,
          prompt: validatedData.prompt.substring(0, 100) + '...',
          slides_count: validatedData.slides_count,
          language: validatedData.language
        }
      }
    })

    Logger.info(`Presentation created: ${result.plan_id}`)
    
    revalidatePath('/presentations')
    redirect(`/presentations/${result.plan_id}`)
  } catch (error) {
    Logger.error('Failed to create presentation', error)
    throw new Error('Failed to create presentation')
  }
}

export async function editPresentationAction(planId: string, formData: FormData) {
  const { userId, orgId } = auth()
  
  if (!userId || !orgId) {
    throw new Error('Unauthorized')
  }

  const data = {
    instruction: formData.get('instruction') as string
  }

  const validatedData = editPresentationSchema.parse(data)

  try {
    // Verify ownership
    const presentation = await prisma.presentationMirror.findFirst({
      where: { planId, orgId }
    })

    if (!presentation) {
      throw new Error('Presentation not found')
    }

    // Call backend API
    await backend.editPresentation(planId, validatedData)
    
    // Update status
    await prisma.presentationMirror.update({
      where: { planId },
      data: { 
        status: 'running',
        lastEventAt: new Date()
      }
    })

    // Log the action
    await prisma.auditLog.create({
      data: {
        orgId,
        userId,
        action: 'edit_presentation',
        meta: {
          planId,
          instruction: validatedData.instruction
        }
      }
    })

    Logger.info(`Presentation edited: ${planId}`)
    
    revalidatePath(`/presentations/${planId}`)
  } catch (error) {
    Logger.error('Failed to edit presentation', error)
    throw new Error('Failed to edit presentation')
  }
}

export async function syncPresentationAction(planId: string) {
  const { orgId } = auth()
  
  if (!orgId) {
    throw new Error('Unauthorized')
  }

  try {
    // Fetch latest data from backend
    const backendData = await backend.getPresentation(planId)
    
    // Update mirror
    await prisma.presentationMirror.update({
      where: { planId },
      data: {
        status: backendData.status,
        lastEventAt: new Date(),
        artifacts: backendData.artifacts || null
      }
    })

    revalidatePath(`/presentations/${planId}`)
  } catch (error) {
    Logger.error('Failed to sync presentation', error)
    throw new Error('Failed to sync presentation')
  }
}
