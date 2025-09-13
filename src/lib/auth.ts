import { auth } from '@clerk/nextjs'

export function getAuth() {
  return auth()
}

export function requireAuth() {
  const { userId, orgId } = auth()
  
  if (!userId) {
    throw new Error('Unauthorized: No user ID')
  }
  
  return { userId, orgId }
}

export function requireOrg() {
  const { userId, orgId } = auth()
  
  if (!userId) {
    throw new Error('Unauthorized: No user ID')
  }
  
  if (!orgId) {
    throw new Error('Unauthorized: No organization selected')
  }
  
  return { userId, orgId }
}
