import { PrismaClient } from '../generated/prisma'
import { PrismaPg } from '@prisma/adapter-pg';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Get the database URL from environment
const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is not set')
}

// For Prisma 7, we pass the database URL through environment variable
// The client will pick it up from DATABASE_URL automatically
export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  adapter: new PrismaPg({
    // pool: new pg.Pool({
      connectionString: databaseUrl
    // })
  })
})


if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma


