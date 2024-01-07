import getUser from '@/helpers/getUser'
import { prismaClient } from '@/prisma/prismaClient'
import { NextResponse } from 'next/server'
import { categorySchema } from '@/schemas'
import { validateBody } from '@/helpers/serverValidation'

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
    const errors = validateBody(body, categorySchema)
    if (errors) {
      return NextResponse.json(
        { errors },
        {
          status: 400,
        },
      )
    }

    const created = await prismaClient.category.create({
      data: { ...body },
    })

    return NextResponse.json(
      { success: true, data: created.id },
      {
        status: 200,
      },
    )
  } catch (error) {
    console.error(`/api/faq-categories POST ${error}`)
    return NextResponse.json({ errors: ['Server error!'] }, { status: 500 })
  }
}
