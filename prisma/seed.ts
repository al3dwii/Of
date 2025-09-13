import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create a default org for testing
  const org = await prisma.org.upsert({
    where: { clerkOrgId: 'org_test_123' },
    update: {},
    create: {
      clerkOrgId: 'org_test_123',
      name: 'Demo Organization'
    }
  })

  // Create a default user profile
  const user = await prisma.userProfile.upsert({
    where: { userId: 'user_test_123' },
    update: {},
    create: {
      userId: 'user_test_123',
      email: 'demo@example.com',
      displayName: 'Demo User',
      preferences: {
        theme: 'light'
      }
    }
  })

  // Create org membership
  await prisma.orgMember.upsert({
    where: { 
      orgId_userId: {
        orgId: org.id,
        userId: user.userId
      }
    },
    update: {},
    create: {
      orgId: org.id,
      userId: user.userId,
      role: 'owner'
    }
  })

  console.log('✅ Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
