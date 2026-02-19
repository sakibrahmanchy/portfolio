import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Get the database URL from environment
const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is not set')
}

// For Prisma 7, the client will pick up DATABASE_URL automatically
export const prisma = globalForPrisma.prisma ?? new PrismaClient({
    adapter: new PrismaPg({
        connectionString: databaseUrl
    })
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
