import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prismaClient } from '@/prisma/prismaClient'

export async function getSession() {
  return await getServerSession(authOptions)
}

/**
 * Function checks whether the user is logged in.
 * Returns user information if the user is logged in, or null if not.
 */
export default async function getCurrentUser() {
  try {
    const session = await getSession()

    if (!session?.user?.email) {
      return null
    }

    const user = await prismaClient.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    })

    if (!user) {
      return null
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    }
  } catch (error: any) {
    return null
  }
}
