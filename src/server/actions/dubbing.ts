'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation' 
import { auth } from '@clerk/nextjs'
import { prisma } from '@/lib/prisma'
import { backend } from '@/lib/backend'
import { createDubbingSchema } from '@/lib/zod-schemas'
import { Logger } from '@/lib/logger'

export async function startDubbingAction(formData: FormData) {
  const { userId, orgId } = auth()
  
  if (!userId || !orgId) {
    throw new Error('Unauthorized')
  }

  const data = {
    source_url: formData.get('source_url') as string,
    source_lang: formData.get('source_lang') as string,
    target_lang: formData.get('target_lang') as string,
    voice: formData.get('voice') as string,
    keep_bg_audio: formData.get('keep_bg_audio') === 'true',
    burn_subtitles: formData.get('burn_subtitles') === 'true'
  }

  const validatedData = createDubbingSchema.parse(data)

  try {
    // Call backend API
    const result = await backend.startDubbing(validatedData)
    
    // Create mirror in frontend database
    await prisma.dubbingMirror.create({
      data: {
        jobId: result.job_id,
        orgId,
        sourceUrl: validatedData.source_url,
        sourceLang: validatedData.source_lang,
        targetLang: validatedData.target_lang,
        voice: validatedData.voice,
        status: 'queued'
      }
    })

    // Log the action
    await prisma.auditLog.create({
      data: {
        orgId,
        userId,
        action: 'start_dubbing',
        meta: {
          jobId: result.job_id,
          source_lang: validatedData.source_lang,
          target_lang: validatedData.target_lang,
          voice: validatedData.voice
        }
      }
    })

    Logger.info(`Dubbing job started: ${result.job_id}`)
    
    revalidatePath('/dubbing')
    redirect(`/dubbing/${result.job_id}`)
  } catch (error) {
    Logger.error('Failed to start dubbing', error)
    throw new Error('Failed to start dubbing job')
  }
}

export async function syncDubbingAction(jobId: string) {
  const { orgId } = auth()
  
  if (!orgId) {
    throw new Error('Unauthorized')
  }

  try {
    // Fetch latest data from backend
    const backendData = await backend.getDubbing(jobId)
    
    // Update mirror
    await prisma.dubbingMirror.update({
      where: { jobId },
      data: {
        status: backendData.status,
        lastEventAt: new Date(),
        artifacts: backendData.artifacts || null
      }
    })

    revalidatePath(`/dubbing/${jobId}`)
  } catch (error) {
    Logger.error('Failed to sync dubbing job', error)
    throw new Error('Failed to sync dubbing job')
  }
}
