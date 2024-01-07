import { prismaClient } from '@/prisma/prismaClient'
import { NextResponse } from 'next/server'

/**
 * Checks if there is already registered user.
 * Returns count of registered users.
 */
export const getUserCount = async () => {
  try {
    return await prismaClient.user.count()
  } catch (error: any) {
    return new NextResponse('Internal error', { status: 500 })
  }
}
