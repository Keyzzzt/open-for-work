import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
    })
  }

  return NextResponse.json({ authenticated: !!session })
}
