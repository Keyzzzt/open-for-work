import getUser from '@/helpers/getUser'
import { prismaClient } from '@/prisma/prismaClient'
import { NextResponse } from 'next/server'
import { validateBody } from '@/helpers/serverValidation'
import { configurationSchema } from '@/schemas'

// Update configuration
export async function POST(req: Request) {
  try {
    // Check user
    const user = await getUser()
    if (!user) {
      return NextResponse.json(
        { errors: ['Unauthorized!'] },
        {
          status: 401,
        },
      )
    }

    // Check body
    const body = await req.json()
    const errors = validateBody(body, configurationSchema)
    if (errors) {
      return NextResponse.json(
        { errors },
        {
          status: 400,
        },
      )
    }

    // Check if config exists
    const config = await prismaClient.config.findFirst({})
    if (!config) {
      return NextResponse.json(
        { errors: ['Config not found!'] },
        {
          status: 404,
        },
      )
    }

    await prismaClient.config.updateMany({
      data: {
        taxRate: Number(body.taxRate),
      },
    })

    return NextResponse.json(
      { success: true },
      {
        status: 200,
      },
    )
  } catch (error) {
    console.error(`/api/config POST ${error}`)
    return NextResponse.json({ errors: ['Server error'] }, { status: 500 })
  }
}
