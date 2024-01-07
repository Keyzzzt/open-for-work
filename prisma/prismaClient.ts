import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

export const prismaClient =
  globalThis.prisma ||
  new PrismaClient({
    // This will log to console every query. Remove if unwanted.
    // log: ['query'],
  })
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prismaClient
}
